// Creates the Dataverse side of this site: the solution, its OWN table, the connection references, the
// working views and the main form. The two cloud flows are deployed afterwards by tools/deploy-intake.ps1 and
// tools/deploy-automation.ps1, which need the objects created here.
//
// The table is separate from every other site's table on purpose: separate data, separate switches, and a
// problem or abuse on one site never touches another.
//
// This script only ever ADDS. It never deletes or overwrites a table, a flow, a record or a form that someone has
// changed (the generated form of a table it creates itself is replaced), and it skips what already exists. The
// default is a DRY RUN that prints the plan and writes nothing; --apply writes.
//
// Usage (needs an active `az login` against the tenant that owns the environment in _data/profile.json):
//   node tools/bootstrap-solution.mjs                             # dry run: show what would be created
//   node tools/bootstrap-solution.mjs --bind-from <prefix>        # dry run incl. connection bindings
//   node tools/bootstrap-solution.mjs --bind-from <prefix> --apply
//
// Options:
//   --apply                write. Without it nothing is changed
//   --bind-from <prefix>   bind the new connection references to the connections that the connection references
//                          with this logical-name prefix already use (e.g. the other site's prefix). Otherwise
//                          they are created unbound and have to be bound by hand
//   --publisher <name>     unique name of the publisher (default: the publisher whose prefix matches the table)
//   --skip-views           do not create the four working views
//   --skip-form            do not touch the main form
//   --replace-form         also replace the main form of a table that already existed with a different layout
//                          (default: leave it and warn)
//
// Everything below the two exported builders is a thin, injectable layer over the Dataverse Web API, so the logic
// can be tested offline against a simulated Dataverse (tools/bootstrap.test.mjs). It has not been run against a
// real tenant: read the dry run before using --apply.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { approval, config, connectionReferences, kind, primaryKey, processing, profile, tableDefinition } from './automation.mjs';

const TABLE = config.table;
const SOLUTION = config.solution;
const PREFIX = TABLE.split('_')[0];
const SYSTEM_ATTRIBUTES = new Set(['statecode', 'createdon', 'modifiedon']);
const attributes = Object.fromEntries(tableDefinition.Attributes.map(attribute => [attribute.SchemaName.toLowerCase(), attribute]));
const labelOf = (attribute) => attribute.DisplayName.LocalizedLabels[0].Label;
const xml = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Stable identifiers for form parts, so a re-run produces the same form.
const guid = (seed) => {
  const hash = createHash('sha1').update(`${TABLE}:${seed}`).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-5${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
};

function assertAttribute(name) {
  if (!attributes[name] && !SYSTEM_ATTRIBUTES.has(name) && name !== primaryKey) throw new Error(`Unknown column ${name} for table ${TABLE}`);
}

// ---------------------------------------------------------------- builders (pure)

export function solutionPayload(publisherId) {
  return {
    uniquename: SOLUTION,
    friendlyname: profile.site.name,
    description: `Curation pipeline of ${profile.site.name}: source table, connection references, views, form and the two cloud flows.`,
    version: '1.0.0.0',
    'publisherid@odata.bind': `/publishers(${publisherId})`,
  };
}

const REFERENCE_TITLES = { dataverse: 'Dataverse', rss: 'RSS', conversion: 'Content Conversion', foundry: 'Azure AI Foundry', github: 'GitHub' };

export function referenceDefinitions() {
  return Object.entries(connectionReferences({})).map(([key, reference]) => ({
    key,
    logicalName: reference.connectionReferenceLogicalName,
    displayName: `${profile.site.name} - ${REFERENCE_TITLES[key]}`,
    connectorId: reference.id,
  }));
}

export function referencePayload(reference, connectionId) {
  return {
    connectionreferencelogicalname: reference.logicalName,
    connectionreferencedisplayname: reference.displayName,
    connectorid: reference.connectorId,
    ...(connectionId ? { connectionid: connectionId } : {}),
  };
}

const condition = (attribute, operator, value) => ({ attribute, operator, value });
const conditionIn = (attribute, values) => ({ attribute, operator: 'in', values });
const COLUMN_WIDTH = { new_name: 220, new_contenturl: 320, new_lastmessage: 340, createdon: 130, modifiedon: 130 };

function conditionXml(entry) {
  assertAttribute(entry.attribute);
  if (entry.operator === 'in') return `<condition attribute="${entry.attribute}" operator="in">${entry.values.map(value => `<value>${value}</value>`).join('')}</condition>`;
  return `<condition attribute="${entry.attribute}" operator="${entry.operator}" value="${entry.value}" />`;
}

export function viewDefinitions(objectTypeCode) {
  const define = (title, columns, conditions, order) => {
    for (const column of [...columns, order.attribute]) assertAttribute(column);
    const fetchxml = `<fetch version="1.0" mapping="logical" distinct="false"><entity name="${TABLE}">`
      + [...columns, primaryKey].map(column => `<attribute name="${column}" />`).join('')
      + `<order attribute="${order.attribute}" descending="${order.descending}" />`
      + `<filter type="and">${[condition('statecode', 'eq', 0), ...conditions].map(conditionXml).join('')}</filter></entity></fetch>`;
    const layoutxml = `<grid name="resultset" object="${objectTypeCode}" jump="new_name" select="1" icon="1" preview="1"><row name="result" id="${primaryKey}">`
      + columns.map(column => `<cell name="${column}" width="${COLUMN_WIDTH[column] ?? 140}" />`).join('')
      + '</row></grid>';
    return { name: `${profile.dataverse.viewPrefix} - ${title}`, fetchxml, layoutxml };
  };
  return [
    define('Awaiting approval', ['new_name', 'new_contenturl', 'new_kind', 'new_processing', 'createdon', 'new_lastmessage'],
      [condition('new_approval', 'eq', approval.pending)], { attribute: 'createdon', descending: true }),
    define('Active RSS feeds', ['new_name', 'new_contenturl', 'new_processing', 'new_lastchecked', 'new_lastpublished', 'new_failures'],
      [condition('new_kind', 'eq', kind.rss), condition('new_approval', 'eq', approval.approved), condition('new_enabled', 'eq', 1)], { attribute: 'new_name', descending: false }),
    define('Individual articles', ['new_name', 'new_contenturl', 'new_kind', 'new_approval', 'new_processing', 'new_lastpublished'],
      [condition('new_kind', 'ne', kind.rss)], { attribute: 'createdon', descending: true }),
    define('Needs attention', ['new_name', 'new_contenturl', 'new_processing', 'new_failures', 'new_lastchecked', 'new_lastmessage'],
      [conditionIn('new_processing', [processing.review, processing.error, processing.queued])], { attribute: 'modifiedon', descending: true }),
  ];
}

// Control class IDs of the model-driven form designer, by column type.
const CONTROL = {
  'Microsoft.Dynamics.CRM.StringAttributeMetadata': '{4273EDBD-AC1D-40d3-9FB2-095C621B552D}',
  'Microsoft.Dynamics.CRM.PicklistAttributeMetadata': '{3EF39988-22BB-4f0b-BBBE-64B5A3748AEE}',
  'Microsoft.Dynamics.CRM.BooleanAttributeMetadata': '{67FAC785-CD58-4f9f-ABB3-4B7DDC6ED5ED}',
  'Microsoft.Dynamics.CRM.DateTimeAttributeMetadata': '{5B773807-9FB2-42db-97C3-7A91EFF8ADFF}',
  'Microsoft.Dynamics.CRM.IntegerAttributeMetadata': '{C6D124CA-7EDA-4a60-AEA9-7FB8D318B68F}',
  'Microsoft.Dynamics.CRM.MemoAttributeMetadata': '{E0DECE4B-6FC8-4a8f-A065-082708572369}',
};

// The capture fields plus read-only operating information. The two internal feed-ID fields (up to 1 MB each)
// are deliberately not on the form.
export const formSections = [
  { name: 'source', title: 'Source', readOnly: false, fields: ['new_name', 'new_contenturl', 'new_kind', 'new_approval', 'new_enabled', 'new_processing', 'new_feedfrom'] },
  { name: 'contributor', title: 'Contributor', readOnly: false, fields: ['new_submittername', 'new_submitterlinkedin', 'new_publishcredit'] },
  { name: 'operations', title: 'Operations (read-only)', readOnly: true, fields: ['new_lastchecked', 'new_lastpublished', 'new_failures', 'new_githubpath', 'new_requestid', 'new_watermark', 'new_pendingwatermark', 'new_lastmessage'] },
];

export function formXml() {
  const cell = (field, readOnly) => {
    const attribute = attributes[field];
    if (!attribute) throw new Error(`Unknown column ${field} for table ${TABLE}`);
    return `<row><cell id="{${guid(`cell:${field}`)}}" showlabel="true" locklevel="0"><labels><label description="${xml(labelOf(attribute))}" languagecode="1033" /></labels>`
      + `<control id="${field}" classid="${CONTROL[attribute['@odata.type']]}" datafieldname="${field}" disabled="${readOnly ? 'true' : 'false'}" /></cell></row>`;
  };
  const sections = formSections.map(section => `<section name="${section.name}" id="{${guid(`section:${section.name}`)}}" showlabel="true" showbar="false" columns="1" IsUserDefined="1">`
    + `<labels><label description="${xml(section.title)}" languagecode="1033" /></labels><rows>${section.fields.map(field => cell(field, section.readOnly)).join('')}</rows></section>`).join('');
  return `<form><tabs><tab name="general" id="{${guid('tab:general')}}" verticallayout="true" expanded="true" IsUserDefined="1" showlabel="false">`
    + `<labels><label description="General" languagecode="1033" /></labels><columns><column width="100%"><sections>${sections}</sections></column></columns></tab></tabs></form>`;
}

// ---------------------------------------------------------------- runner (logic over an injectable API)

async function resolvePublisher(api, options) {
  const filter = options.publisher ? { uniquename: options.publisher } : { customizationprefix: PREFIX };
  const publishers = await api.list('publishers', { select: ['publisherid', 'uniquename', 'customizationprefix'], filter });
  if (publishers.length !== 1) {
    throw new Error(options.publisher
      ? `Publisher "${options.publisher}" not found.`
      : `Expected exactly one publisher with the prefix "${PREFIX}" (table ${TABLE}), found ${publishers.length}. Pass --publisher <uniquename>.`);
  }
  if (publishers[0].customizationprefix !== PREFIX) throw new Error(`Publisher ${publishers[0].uniquename} has the prefix "${publishers[0].customizationprefix}", but the table ${TABLE} needs "${PREFIX}".`);
  return publishers[0];
}

async function verifyTable(api) {
  const shape = await api.getTableShape(TABLE);
  const missing = Object.keys(attributes).filter(name => !shape.columns.has(name));
  if (missing.length) throw new Error(`Table ${TABLE} exists but lacks the columns ${missing.join(', ')}. Nothing was changed; repair or rename it first.`);
  for (const [name, attribute] of Object.entries(attributes)) {
    if (attribute['@odata.type'] !== 'Microsoft.Dynamics.CRM.PicklistAttributeMetadata') continue;
    const expected = Object.fromEntries(attribute.OptionSet.Options.map(option => [option.Value, option.Label.LocalizedLabels[0].Label]));
    const actual = shape.choices[name] ?? {};
    // The flows compare against fixed numeric values, so a different value would silently break them.
    for (const [value, label] of Object.entries(expected)) {
      if (actual[value] !== label) throw new Error(`Choice ${name}: expected ${value} = "${label}", found ${JSON.stringify(actual[value] ?? null)}. The flows depend on these exact values.`);
    }
  }
}

async function loadBindings(api, prefix) {
  const rows = await api.list('connectionreferences', { select: ['connectionreferencelogicalname', 'connectionid'], startswith: ['connectionreferencelogicalname', prefix] });
  if (rows.length === 0) throw new Error(`No connection references with the prefix "${prefix}" found; nothing to bind from.`);
  return Object.fromEntries(rows.filter(row => row.connectionid).map(row => [row.connectionreferencelogicalname.slice(prefix.length), row.connectionid]));
}

export async function run({ api, options = {}, log = console.log }) {
  const apply = options.apply === true;
  const summary = { applied: apply, created: [], existing: [], warnings: [] };
  const say = (text) => log(`${apply ? '[apply]' : '[dry-run]'} ${text}`);
  const warn = (text) => { summary.warnings.push(text); log(`[warning] ${text}`); };
  const willCreate = (text, label) => { say(text); summary.created.push(label); };
  const alreadyThere = (text, label) => { say(text); summary.existing.push(label); };

  // Phase 1 reads only. Everything that can fail because of what is already in the tenant (wrong publisher,
  // a table with missing columns or different choice values, nothing to bind from) stops the run here,
  // before the first write.
  const who = await api.whoAmI();
  log(`Connected to organization ${who.OrganizationId} as user ${who.UserId}.`);
  const solution = (await api.list('solutions', { select: ['solutionid', 'uniquename'], filter: { uniquename: SOLUTION } }))[0];
  const publisher = solution ? undefined : await resolvePublisher(api, options);
  let table = await api.getTable(TABLE);
  const tableExisted = Boolean(table);
  if (table) await verifyTable(api);
  const bindings = options.bindFrom ? await loadBindings(api, options.bindFrom) : {};

  // Phase 2 writes (only with --apply) and reports.
  if (solution) alreadyThere(`solution ${SOLUTION} already exists`, `solution ${SOLUTION}`);
  else {
    willCreate(`create solution ${SOLUTION} (publisher ${publisher.uniquename}, prefix ${publisher.customizationprefix})`, `solution ${SOLUTION}`);
    if (apply) await api.create('solutions', solutionPayload(publisher.publisherid));
  }

  if (table) alreadyThere(`table ${TABLE} already exists: all columns present, choice values match the flows`, `table ${TABLE}`);
  else {
    willCreate(`create table ${TABLE} (${tableDefinition.Attributes.length} columns) in solution ${SOLUTION}`, `table ${TABLE}`);
    if (apply) {
      await api.createTable(tableDefinition, SOLUTION);
      await api.publish([TABLE]);
      table = await api.getTable(TABLE);
      await verifyTable(api);
    }
  }

  for (const reference of referenceDefinitions()) {
    const bound = bindings[reference.key];
    const found = (await api.list('connectionreferences', { select: ['connectionreferenceid', 'connectionreferencelogicalname', 'connectionid'], filter: { connectionreferencelogicalname: reference.logicalName } }))[0];
    if (!found) {
      willCreate(`create connection reference ${reference.logicalName}${bound ? ` bound to ${bound}` : ' (unbound)'}`, `connection reference ${reference.logicalName}`);
      if (apply) await api.create('connectionreferences', referencePayload(reference, bound), { solution: SOLUTION });
      if (!bound) warn(`${reference.logicalName} has no connection yet. Bind it in Power Automate or run again with --bind-from <prefix>.`);
    } else if (!found.connectionid && bound) {
      willCreate(`bind connection reference ${reference.logicalName} to ${bound}`, `binding ${reference.logicalName}`);
      if (apply) await api.update('connectionreferences', found.connectionreferenceid, { connectionid: bound });
    } else {
      alreadyThere(`connection reference ${reference.logicalName} already exists`, `connection reference ${reference.logicalName}`);
      if (!found.connectionid) warn(`${reference.logicalName} exists but has no connection. Bind it in Power Automate or run again with --bind-from <prefix>.`);
    }
  }

  // Views and form are a convenience for the operator: a failure here is a warning, not an error.
  let changedLayout = false;
  if (!options.skipViews) {
    for (const view of viewDefinitions(table?.ObjectTypeCode ?? 0)) {
      const found = table ? (await api.list('savedqueries', { select: ['savedqueryid', 'name'], filter: { name: view.name, returnedtypecode: TABLE } }))[0] : undefined;
      if (found) { alreadyThere(`view "${view.name}" already exists`, `view ${view.name}`); continue; }
      willCreate(`create view "${view.name}"`, `view ${view.name}`);
      try {
        if (apply) {
          await api.create('savedqueries', { name: view.name, returnedtypecode: TABLE, querytype: 0, isdefault: false, fetchxml: view.fetchxml, layoutxml: view.layoutxml }, { solution: SOLUTION });
          changedLayout = true;
        }
      } catch (error) {
        summary.created.pop();
        warn(`view "${view.name}" could not be created (${error.message.slice(0, 200)}). Create it in the maker portal.`);
      }
    }
  }
  if (!options.skipForm) {
    try {
      const forms = table ? await api.list('systemforms', { select: ['formid', 'name', 'formxml'], filter: { objecttypecode: TABLE, type: 2 } }) : [];
      const marker = `name="${formSections[0].name}" id="{${guid(`section:${formSections[0].name}`)}}"`;
      if (forms.some(form => (form.formxml ?? '').includes(marker))) alreadyThere('main form already uses this layout', `main form ${TABLE}`);
      else if (forms.length && tableExisted && !options.replaceForm) {
        // The table was there before this run, so its form may have been changed by someone: do not overwrite it.
        alreadyThere(`main form "${forms[0].name}" has a different layout and is left unchanged`, `main form ${TABLE}`);
        warn(`The main form of the existing table ${TABLE} was left unchanged. Run again with --replace-form to replace it with the ${profile.site.name} layout.`);
      } else {
        willCreate(forms.length ? `replace the generated main form "${forms[0].name}" with the ${profile.site.name} layout` : 'create the main form', `main form ${TABLE}`);
        if (apply) {
          if (forms.length) await api.update('systemforms', forms[0].formid, { formxml: formXml() }, { solution: SOLUTION });
          else await api.create('systemforms', { name: profile.dataverse.displayName, objecttypecode: TABLE, type: 2, formxml: formXml() }, { solution: SOLUTION });
          changedLayout = true;
        }
      }
    } catch (error) {
      summary.created = summary.created.filter(label => label !== `main form ${TABLE}`);
      warn(`The main form could not be configured (${error.message.slice(0, 200)}). Add the fields in the maker portal.`);
    }
  }
  if (apply && changedLayout) await api.publish([TABLE]);

  log(`\n${apply ? 'Applied' : 'Dry run'}: ${summary.created.length} to create or change, ${summary.existing.length} already present, ${summary.warnings.length} warning(s).`);
  if (!apply) log('Nothing was written. Run again with --apply to create what is missing.');
  log('Next: pwsh -File tools/deploy-intake.ps1, then pwsh -File tools/deploy-automation.ps1 (both leave the flows switched off).');
  return summary;
}

// ---------------------------------------------------------------- Dataverse Web API adapter

export function createApi(token) {
  const base = `${config.organization}/api/data/v9.2`;
  const odata = (filter = {}) => Object.entries(filter).map(([key, value]) => (typeof value === 'number' ? `${key} eq ${value}` : `${key} eq '${String(value).replaceAll("'", "''")}'`));
  async function call(method, path, body, extraHeaders = {}) {
    const response = await fetch(`${base}/${path}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json', 'OData-MaxVersion': '4.0', 'OData-Version': '4.0', ...extraHeaders },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (response.status === 404 && method === 'GET') return null;
    if (!response.ok) throw new Error(`${method} ${path} failed: ${response.status} ${(await response.text()).slice(0, 600)}`);
    if (response.status === 204) return { id: /\(([^)]+)\)$/.exec(response.headers.get('OData-EntityId') ?? '')?.[1] };
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }
  const inSolution = (solution) => (solution ? { 'MSCRM.SolutionUniqueName': solution } : {});
  return {
    whoAmI: () => call('GET', 'WhoAmI'),
    async list(set, { select, filter, startswith } = {}) {
      const parts = odata(filter);
      if (startswith) parts.push(`startswith(${startswith[0]},'${String(startswith[1]).replaceAll("'", "''")}')`);
      const query = [select ? `$select=${select.join(',')}` : '', parts.length ? `$filter=${encodeURIComponent(parts.join(' and '))}` : ''].filter(Boolean).join('&');
      return (await call('GET', `${set}${query ? `?${query}` : ''}`))?.value ?? [];
    },
    create: (set, body, { solution } = {}) => call('POST', set, body, inSolution(solution)),
    update: (set, id, body, { solution } = {}) => call('PATCH', `${set}(${id})`, body, inSolution(solution)),
    async getTable(logicalName) {
      try {
        return await call('GET', `EntityDefinitions(LogicalName='${logicalName}')?$select=MetadataId,ObjectTypeCode`);
      } catch (error) {
        if (/0x80060888|Could not find an entity/i.test(error.message)) return null;
        throw error;
      }
    },
    createTable: (definition, solution) => call('POST', 'EntityDefinitions', definition, inSolution(solution)),
    async getTableShape(logicalName) {
      const columns = await call('GET', `EntityDefinitions(LogicalName='${logicalName}')/Attributes?$select=LogicalName`);
      const picklists = await call('GET', `EntityDefinitions(LogicalName='${logicalName}')/Attributes/Microsoft.Dynamics.CRM.PicklistAttributeMetadata?$select=LogicalName&$expand=OptionSet($select=Options)`);
      return {
        columns: new Set((columns?.value ?? []).map(column => column.LogicalName)),
        choices: Object.fromEntries((picklists?.value ?? []).map(column => [column.LogicalName, Object.fromEntries((column.OptionSet?.Options ?? []).map(option => [option.Value, option.Label?.UserLocalizedLabel?.Label ?? option.Label?.LocalizedLabels?.[0]?.Label]))])),
      };
    },
    publish: (logicalNames) => call('POST', 'PublishXml', { ParameterXml: `<importexportxml><entities>${logicalNames.map(name => `<entity>${name}</entity>`).join('')}</entities></importexportxml>` }),
  };
}

export function parseOptions(argv) {
  const value = (flag) => {
    const index = argv.indexOf(flag);
    if (index < 0) return undefined;
    const next = argv[index + 1];
    if (!next || next.startsWith('--')) throw new Error(`${flag} needs a value`);
    return next;
  };
  return {
    apply: argv.includes('--apply'),
    bindFrom: value('--bind-from'),
    publisher: value('--publisher'),
    skipViews: argv.includes('--skip-views'),
    skipForm: argv.includes('--skip-form'),
    replaceForm: argv.includes('--replace-form'),
  };
}

function getToken() {
  const hint = `Could not acquire a Dataverse token. Install the Azure CLI and run \`az login --tenant ${config.tenant}\` first.`;
  let token = '';
  try {
    token = execFileSync('az', ['account', 'get-access-token', '--resource', config.organization, '--tenant', config.tenant, '--query', 'accessToken', '-o', 'tsv'], { shell: true, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
  } catch {
    throw new Error(hint);
  }
  if (!token) throw new Error(hint);
  return token;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  run({ api: createApi(getToken()), options: parseOptions(process.argv.slice(2)) }).catch(error => {
    console.error(`\nStopped: ${error.message}`);
    process.exitCode = 1;
  });
}

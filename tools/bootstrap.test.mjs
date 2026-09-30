import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { approval, config, kind, primaryKey, processing, profile, tableDefinition } from './automation.mjs';
import { createApi, formSections, formXml, parseOptions, referenceDefinitions, referencePayload, run, solutionPayload, viewDefinitions } from './bootstrap-solution.mjs';

const TABLE = config.table;
const quiet = () => {};
const typeOf = (attribute) => attribute['@odata.type'].replace('Microsoft.Dynamics.CRM.', '').replace('AttributeMetadata', '');
const columnsOf = (definition) => new Set(definition.Attributes.map(attribute => attribute.SchemaName.toLowerCase()));
const choicesOf = (definition) => Object.fromEntries(definition.Attributes.filter(attribute => typeOf(attribute) === 'Picklist')
  .map(attribute => [attribute.SchemaName.toLowerCase(), Object.fromEntries(attribute.OptionSet.Options.map(option => [option.Value, option.Label.LocalizedLabels[0].Label]))]));
const existingTable = () => ({ ObjectTypeCode: 10042, columns: columnsOf(tableDefinition), choices: choicesOf(tableDefinition) });
// Connection references of another solution, used as the source of the bindings.
const otherReferences = ['dataverse', 'rss', 'conversion', 'foundry', 'github'].map((key, index) => ({
  connectionreferenceid: `other-${index}`, connectionreferencelogicalname: `new_other_${key}`, connectionid: `connection-${key}`,
}));

function assertWellFormed(text, label) {
  const stack = [];
  for (const [, closing, name, , selfClosing] of text.matchAll(/<(\/?)([A-Za-z][\w-]*)([^<>]*?)(\/?)>/g)) {
    if (selfClosing) continue;
    if (closing) assert.equal(stack.pop(), name, `${label}: mismatched </${name}>`);
    else stack.push(name);
  }
  assert.deepEqual(stack, [], `${label}: unclosed tags`);
  assert.doesNotMatch(text.replace(/&(amp|lt|gt|quot|apos);/g, ''), /&/, `${label}: unescaped ampersand`);
}

// A small simulated Dataverse: just the parts the bootstrap talks to, with the same answers the real API gives.
function createFake({ publishers, solutions = [], references = [], table = null, failOn = [] } = {}) {
  const idField = { solutions: 'solutionid', connectionreferences: 'connectionreferenceid', savedqueries: 'savedqueryid', systemforms: 'formid' };
  const state = {
    publishers: publishers ?? [{ publisherid: 'pub-1', uniquename: 'defaultpublisher', customizationprefix: 'new' }],
    solutions: [...solutions], connectionreferences: references.map(row => ({ ...row })), savedqueries: [], systemforms: [], table, writes: [], published: [],
  };
  if (table) state.systemforms.push({ formid: 'form-generated', name: 'Information', objecttypecode: TABLE, type: 2, formxml: '<form><tabs/></form>' });
  let counter = 0;
  const fail = (set) => { if (failOn.includes(set)) throw new Error(`simulated failure on ${set}`); };
  const matches = (row, filter = {}, startswith) => Object.entries(filter).every(([key, value]) => row[key] === value)
    && (!startswith || String(row[startswith[0]] ?? '').startsWith(startswith[1]));
  const api = {
    async whoAmI() { return { OrganizationId: 'org-1', UserId: 'user-1' }; },
    async list(set, { filter, startswith } = {}) { return state[set].filter(row => matches(row, filter, startswith)).map(row => ({ ...row })); },
    async create(set, body, options = {}) {
      fail(set);
      const row = { ...body, [idField[set]]: `${set}-${++counter}` };
      state[set].push(row);
      state.writes.push({ kind: 'create', set, body, solution: options.solution });
      return { id: row[idField[set]] };
    },
    async update(set, id, body, options = {}) {
      fail(set);
      Object.assign(state[set].find(row => row[idField[set]] === id), body);
      state.writes.push({ kind: 'update', set, id, body, solution: options.solution });
      return {};
    },
    async getTable(name) { return name === TABLE && state.table ? { MetadataId: 'meta-1', ObjectTypeCode: state.table.ObjectTypeCode } : null; },
    async createTable(definition, solution) {
      state.writes.push({ kind: 'createTable', solution });
      state.table = { ObjectTypeCode: 10042, columns: columnsOf(definition), choices: choicesOf(definition) };
      state.systemforms.push({ formid: 'form-generated', name: 'Information', objecttypecode: TABLE, type: 2, formxml: '<form><tabs/></form>' });
      return {};
    },
    async getTableShape() { return { columns: state.table.columns, choices: state.table.choices }; },
    async publish(names) { state.published.push(names); },
  };
  return { state, api };
}

test('builders follow the profile: solution, references and payloads', () => {
  const solution = solutionPayload('pub-1');
  assert.equal(solution.uniquename, config.solution);
  assert.equal(solution.friendlyname, profile.site.name);
  assert.equal(solution['publisherid@odata.bind'], '/publishers(pub-1)');
  const references = referenceDefinitions();
  assert.deepEqual(references.map(reference => reference.key), ['dataverse', 'rss', 'conversion', 'foundry', 'github']);
  for (const reference of references) {
    assert.ok(reference.logicalName.startsWith(config.connectionReferencePrefix));
    assert.ok(reference.displayName.startsWith(profile.site.name));
    assert.match(reference.connectorId, /^\/providers\/Microsoft\.PowerApps\/apis\/shared_/);
  }
  assert.equal('connectionid' in referencePayload(references[0]), false);
  assert.equal(referencePayload(references[0], 'connection-1').connectionid, 'connection-1');
});

test('views use real columns, the numeric values the flows use, and well-formed XML', () => {
  const known = new Set([...columnsOf(tableDefinition), 'statecode', 'createdon', 'modifiedon', primaryKey]);
  const allowed = { ...Object.fromEntries(Object.entries(choicesOf(tableDefinition)).map(([name, options]) => [name, new Set(Object.keys(options))])), new_enabled: new Set(['0', '1']), statecode: new Set(['0', '1']) };
  const views = viewDefinitions(10042);
  assert.deepEqual(views.map(view => view.name), ['Awaiting approval', 'Active RSS feeds', 'Individual articles', 'Needs attention'].map(title => `${profile.dataverse.viewPrefix} - ${title}`));
  for (const view of views) {
    assertWellFormed(view.fetchxml, `${view.name} fetch`);
    assertWellFormed(view.layoutxml, `${view.name} layout`);
    const fetched = [...view.fetchxml.matchAll(/<attribute name="(\w+)" \/>/g)].map(match => match[1]);
    for (const name of fetched) assert.ok(known.has(name), `${view.name}: unknown column ${name}`);
    for (const [, name] of view.layoutxml.matchAll(/<cell name="(\w+)"/g)) assert.ok(fetched.includes(name), `${view.name}: ${name} is shown but not fetched`);
    assert.match(view.layoutxml, /object="10042"/);
    assert.ok(view.layoutxml.includes(`id="${primaryKey}"`));
    assert.ok(view.fetchxml.includes(`<entity name="${TABLE}">`), `${view.name}: must query ${TABLE}`);
    assert.match(view.fetchxml, /<condition attribute="statecode" operator="eq" value="0" \/>/, `${view.name}: only active records`);
    for (const [, name, single] of view.fetchxml.matchAll(/<condition attribute="(\w+)" operator="\w+" value="([^"]*)"/g)) {
      assert.ok(allowed[name]?.has(single), `${view.name}: ${name} = ${single} is not a value of the table`);
    }
    for (const [, name, inner] of view.fetchxml.matchAll(/<condition attribute="(\w+)" operator="in">(.*?)<\/condition>/g)) {
      for (const [, value] of inner.matchAll(/<value>(\d+)<\/value>/g)) assert.ok(allowed[name]?.has(value), `${view.name}: ${name} in (${value}) is not a value of the table`);
    }
  }
  const byTitle = Object.fromEntries(views.map(view => [view.name.split(' - ')[1], view.fetchxml]));
  assert.ok(byTitle['Awaiting approval'].includes(`value="${approval.pending}"`));
  assert.ok(byTitle['Active RSS feeds'].includes(`attribute="new_kind" operator="eq" value="${kind.rss}"`));
  assert.ok(byTitle['Active RSS feeds'].includes('attribute="new_enabled" operator="eq" value="1"'));
  assert.ok(byTitle['Individual articles'].includes(`attribute="new_kind" operator="ne" value="${kind.rss}"`));
  for (const status of [processing.review, processing.error, processing.queued]) assert.ok(byTitle['Needs attention'].includes(`<value>${status}</value>`));
});

test('the form shows the capture fields and operating information but not the internal feed-ID fields', () => {
  const form = formXml();
  assertWellFormed(form, 'form');
  const controls = [...form.matchAll(/<control id="(\w+)" classid="(\{[^}]+\})" datafieldname="(\w+)" disabled="(true|false)" \/>/g)]
    .map(([, id, classid, field, disabled]) => ({ id, classid, field, disabled: disabled === 'true' }));
  const classes = {
    String: '{4273EDBD-AC1D-40d3-9FB2-095C621B552D}', Picklist: '{3EF39988-22BB-4f0b-BBBE-64B5A3748AEE}', Boolean: '{67FAC785-CD58-4f9f-ABB3-4B7DDC6ED5ED}',
    DateTime: '{5B773807-9FB2-42db-97C3-7A91EFF8ADFF}', Integer: '{C6D124CA-7EDA-4a60-AEA9-7FB8D318B68F}', Memo: '{E0DECE4B-6FC8-4a8f-A065-082708572369}',
  };
  const attributes = Object.fromEntries(tableDefinition.Attributes.map(attribute => [attribute.SchemaName.toLowerCase(), attribute]));
  assert.equal(controls.length, formSections.flatMap(section => section.fields).length);
  for (const control of controls) {
    assert.equal(control.id, control.field);
    assert.ok(attributes[control.field], `unknown column ${control.field}`);
    assert.equal(control.classid, classes[typeOf(attributes[control.field])], `${control.field}: wrong control type`);
  }
  for (const field of ['new_name', 'new_contenturl', 'new_kind', 'new_approval', 'new_enabled', 'new_processing', 'new_submittername', 'new_submitterlinkedin', 'new_publishcredit']) {
    assert.equal(controls.find(control => control.field === field)?.disabled, false, `${field} must be editable`);
  }
  assert.equal(controls.find(control => control.field === 'new_lastmessage').disabled, true);
  assert.equal(controls.some(control => ['new_seenids', 'new_pendingseenids'].includes(control.field)), false);
  assert.equal(new Set(form.match(/id="\{[0-9a-f-]{36}\}"/g)).size, form.match(/id="\{[0-9a-f-]{36}\}"/g).length, 'form part IDs must be unique');
  assert.equal(formXml(), form, 'the form must be stable between runs');
});

test('a dry run plans every object and writes nothing', async () => {
  const { state, api } = createFake();
  const lines = [];
  const summary = await run({ api, options: {}, log: line => lines.push(line) });
  assert.equal(state.writes.length, 0);
  assert.equal(summary.applied, false);
  assert.deepEqual(summary.created, [
    `solution ${config.solution}`, `table ${TABLE}`,
    ...referenceDefinitions().map(reference => `connection reference ${reference.logicalName}`),
    ...viewDefinitions(0).map(view => `view ${view.name}`), `main form ${TABLE}`,
  ]);
  assert.ok(lines.some(line => line.includes('Nothing was written')));
  assert.ok(lines.every(line => !line.startsWith('[apply]')));
});

test('apply creates everything in the solution with the right bindings, and a second run changes nothing', async () => {
  const { state, api } = createFake({ references: otherReferences });
  const options = { apply: true, bindFrom: 'new_other_' };
  const summary = await run({ api, options, log: quiet });
  assert.equal(summary.warnings.length, 0);
  assert.equal(state.solutions.length, 1);
  assert.equal(state.solutions[0].uniquename, config.solution);
  assert.equal(state.solutions[0]['publisherid@odata.bind'], '/publishers(pub-1)');
  assert.ok(state.table);
  const ours = state.connectionreferences.filter(row => row.connectionreferencelogicalname.startsWith(config.connectionReferencePrefix));
  assert.equal(ours.length, 5);
  for (const row of ours) assert.equal(row.connectionid, `connection-${row.connectionreferencelogicalname.slice(config.connectionReferencePrefix.length)}`);
  assert.equal(state.savedqueries.length, 4);
  assert.ok(state.savedqueries.every(view => view.returnedtypecode === TABLE && view.fetchxml.includes(TABLE) && view.layoutxml.includes('object="10042"')));
  assert.ok(state.systemforms[0].formxml.includes('name="source"'));
  const objectWrites = state.writes.filter(write => write.set !== 'solutions');
  assert.ok(objectWrites.length >= 1 + 5 + 4 + 1, 'table, references, views and form were written');
  assert.ok(objectWrites.every(write => write.solution === config.solution), 'every object is created inside the solution');
  assert.ok(state.published.length >= 2, 'customizations are published after the table and after views/form');

  const writesBefore = state.writes.length;
  const second = await run({ api, options, log: quiet });
  assert.equal(state.writes.length, writesBefore, 'nothing is written on the second run');
  assert.deepEqual(second.created, []);
});

test('an unbound connection is bound afterwards and never duplicated', async () => {
  const unbound = { connectionreferenceid: 'mine-1', connectionreferencelogicalname: `${config.connectionReferencePrefix}dataverse`, connectionid: null };
  const { state, api } = createFake({ references: [...otherReferences, unbound], table: existingTable(), solutions: [{ solutionid: 's-1', uniquename: config.solution }] });
  await run({ api, options: { apply: true, bindFrom: 'new_other_' }, log: quiet });
  const ours = state.connectionreferences.filter(row => row.connectionreferencelogicalname.startsWith(config.connectionReferencePrefix));
  assert.equal(ours.length, 5);
  assert.equal(ours.find(row => row.connectionreferenceid === 'mine-1').connectionid, 'connection-dataverse');
  assert.ok(state.writes.some(write => write.kind === 'update' && write.id === 'mine-1'));
});

test('without a binding source the references are created unbound and reported', async () => {
  const { state, api } = createFake();
  const summary = await run({ api, options: { apply: true }, log: quiet });
  assert.equal(summary.warnings.filter(warning => /no connection yet/.test(warning)).length, 5);
  const created = state.writes.filter(write => write.set === 'connectionreferences');
  assert.equal(created.length, 5);
  assert.ok(created.every(write => !('connectionid' in write.body)));
});

test('an existing table with a different choice value stops the run before anything is written', async () => {
  const table = existingTable();
  table.choices.new_kind = { ...table.choices.new_kind, [kind.article]: 'Something else' };
  const { state, api } = createFake({ table });
  await assert.rejects(run({ api, options: { apply: true }, log: quiet }), /Choice new_kind/);
  assert.equal(state.writes.length, 0);
});

test('an existing table that lacks columns stops the run before anything is written', async () => {
  const table = existingTable();
  table.columns.delete('new_seenids');
  const { state, api } = createFake({ table });
  await assert.rejects(run({ api, options: { apply: true }, log: quiet }), /lacks the columns new_seenids/);
  assert.equal(state.writes.length, 0);
});

test('the publisher must be unambiguous and must carry the prefix of the table', async () => {
  const two = [
    { publisherid: 'p-1', uniquename: 'first', customizationprefix: 'new' },
    { publisherid: 'p-2', uniquename: 'second', customizationprefix: 'new' },
  ];
  const ambiguous = createFake({ publishers: two });
  await assert.rejects(run({ api: ambiguous.api, options: { apply: true }, log: quiet }), /exactly one publisher/);
  assert.equal(ambiguous.state.writes.length, 0);
  const chosen = createFake({ publishers: two });
  await run({ api: chosen.api, options: { apply: true, publisher: 'second' }, log: quiet });
  assert.equal(chosen.state.solutions[0]['publisherid@odata.bind'], '/publishers(p-2)');
  const wrong = createFake({ publishers: [{ publisherid: 'p-3', uniquename: 'other', customizationprefix: 'abc' }] });
  await assert.rejects(run({ api: wrong.api, options: { apply: true, publisher: 'other' }, log: quiet }), /needs "new"/);
});

test('asking to bind from a prefix that does not exist is an error and writes nothing', async () => {
  const { state, api } = createFake({ references: otherReferences });
  await assert.rejects(run({ api, options: { apply: true, bindFrom: 'new_missing_' }, log: quiet }), /nothing to bind from/);
  assert.equal(state.writes.length, 0);
});

test('a failing view or form only warns; solution, table and references stay in place', async () => {
  const { state, api } = createFake({ references: otherReferences, failOn: ['savedqueries', 'systemforms'] });
  const summary = await run({ api, options: { apply: true, bindFrom: 'new_other_' }, log: quiet });
  assert.equal(summary.warnings.filter(warning => /could not be created/.test(warning)).length, 4);
  assert.equal(summary.warnings.filter(warning => /main form could not be configured/.test(warning)).length, 1);
  assert.ok(state.solutions.length === 1 && state.table);
  assert.equal(state.connectionreferences.filter(row => row.connectionreferencelogicalname.startsWith(config.connectionReferencePrefix)).length, 5);
  assert.equal(summary.created.some(label => label.startsWith('view ') || label.startsWith('main form')), false, 'failed layout objects are not reported as created');
});

test('the form of a table that already existed is left alone unless --replace-form is given', async () => {
  const custom = { formid: 'form-custom', name: 'Information', objecttypecode: TABLE, type: 2, formxml: '<form><tabs><tab name="mine"/></tabs></form>' };
  const prepare = () => {
    const fake = createFake({ table: existingTable(), solutions: [{ solutionid: 's-1', uniquename: config.solution }] });
    fake.state.systemforms = [{ ...custom }];
    return fake;
  };
  const kept = prepare();
  const summary = await run({ api: kept.api, options: { apply: true, skipViews: true }, log: quiet });
  assert.equal(kept.state.systemforms[0].formxml, custom.formxml);
  assert.ok(summary.warnings.some(warning => /--replace-form/.test(warning)));
  assert.ok(!kept.state.writes.some(write => write.set === 'systemforms'));

  const replaced = prepare();
  await run({ api: replaced.api, options: { apply: true, skipViews: true, replaceForm: true }, log: quiet });
  assert.ok(replaced.state.systemforms[0].formxml.includes('name="source"'));
});

test('views and form can be skipped', async () => {
  const { state, api } = createFake();
  await run({ api, options: { apply: true, skipViews: true, skipForm: true }, log: quiet });
  assert.equal(state.savedqueries.length, 0);
  assert.equal(state.systemforms.every(form => form.formxml === '<form><tabs/></form>'), true);
});

test('the script can only add: the adapter has no delete or remove operation', () => {
  const api = createApi('token');
  assert.deepEqual(Object.keys(api).filter(name => /delete|remove|drop/i.test(name)), []);
  const source = readFileSync(new URL('./bootstrap-solution.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /'DELETE'|"DELETE"|method:\s*'DELETE'/);
});

test('the Web API adapter builds safe requests', async () => {
  const calls = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url).includes('EntityDefinitions(LogicalName=\'missing_one\')')) return { status: 400, ok: false, headers: { get: () => null }, text: async () => '{"error":{"code":"0x80060888","message":"Could not find an entity with LogicalName"}}' };
    if (String(url).includes('notfound')) return { status: 404, ok: false, headers: { get: () => null }, text: async () => '' };
    if (init.method === 'POST') return { status: 204, ok: true, headers: { get: name => (name === 'OData-EntityId' ? 'https://example.org/api/data/v9.2/solutions(11111111-2222-3333-4444-555555555555)' : null) }, text: async () => '' };
    return { status: 200, ok: true, headers: { get: () => null }, text: async () => '{"value":[{"a":1}]}' };
  };
  try {
    const api = createApi('secret-token');
    assert.deepEqual(await api.list('solutions', { select: ['solutionid'], filter: { uniquename: "O'Brien", type: 2 } }), [{ a: 1 }]);
    assert.ok(calls[0].url.includes('$select=solutionid'));
    assert.ok(decodeURIComponent(calls[0].url).includes("uniquename eq 'O''Brien' and type eq 2"));
    assert.equal(calls[0].init.headers.Authorization, 'Bearer secret-token');
    await api.list('connectionreferences', { startswith: ['connectionreferencelogicalname', 'new_x_'] });
    assert.ok(decodeURIComponent(calls[1].url).includes("startswith(connectionreferencelogicalname,'new_x_')"));
    const created = await api.create('connectionreferences', { a: 1 }, { solution: config.solution });
    assert.equal(calls[2].init.headers['MSCRM.SolutionUniqueName'], config.solution);
    assert.equal(calls[2].init.method, 'POST');
    assert.equal(created.id, '11111111-2222-3333-4444-555555555555');
    await api.create('solutions', { a: 1 });
    assert.equal('MSCRM.SolutionUniqueName' in calls[3].init.headers, false);
    await api.update('systemforms', 'f-1', { formxml: '<form/>' }, { solution: config.solution });
    assert.equal(calls[4].init.method, 'PATCH');
    assert.ok(calls[4].url.endsWith('systemforms(f-1)'));
    assert.equal(await api.getTable('notfound'), null);
    assert.equal(await api.getTable('missing_one'), null);
    await api.publish([TABLE]);
    assert.deepEqual(JSON.parse(calls.at(-1).init.body), { ParameterXml: `<importexportxml><entities><entity>${TABLE}</entity></entities></importexportxml>` });
    assert.ok(calls.every(call => ['GET', 'POST', 'PATCH'].includes(call.init.method)));
  } finally {
    globalThis.fetch = original;
  }
});

test('command line options are parsed strictly', () => {
  assert.deepEqual(parseOptions([]), { apply: false, bindFrom: undefined, publisher: undefined, skipViews: false, skipForm: false, replaceForm: false });
  assert.deepEqual(parseOptions(['--apply', '--bind-from', 'new_other_', '--publisher', 'p', '--skip-views', '--skip-form', '--replace-form']),
    { apply: true, bindFrom: 'new_other_', publisher: 'p', skipViews: true, skipForm: true, replaceForm: true });
  assert.throws(() => parseOptions(['--bind-from']), /needs a value/);
  assert.throws(() => parseOptions(['--bind-from', '--apply']), /needs a value/);
});

// The real entry point, with no Azure CLI on the PATH: it must end with a readable message, not a stack trace.
const runCli = (script, args) => spawnSync(process.execPath, [new URL(`./${script}`, import.meta.url).pathname, ...args], {
  encoding: 'utf8', env: { ...process.env, PATH: mkdtempSync(join(tmpdir(), 'no-az-')) },
});

test('without an Azure login the command line ends with a message and no stack trace', { skip: process.platform === 'win32' }, () => {
  const result = runCli('bootstrap-solution.mjs', []);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Stopped: Could not acquire a Dataverse token/);
  assert.doesNotMatch(result.stderr, /\n\s+at /, 'no stack trace');
  const bad = runCli('bootstrap-solution.mjs', ['--bind-from']);
  assert.equal(bad.status, 1);
  assert.match(bad.stderr, /Stopped: --bind-from needs a value/);
  assert.doesNotMatch(bad.stderr, /\n\s+at /, 'no stack trace');
});

// Writes the generated flow definitions and a readable outline to docs/flows/, so the two flows can be reviewed on
// GitHub before anything exists in the tenant. The files are derived from tools/automation.mjs and tools/intake.mjs
// and tools/flows-export.test.mjs fails when they are stale. They are NOT an import package: the deploy scripts wrap
// the same definition and send it to Dataverse (tools/deploy-automation.ps1, tools/deploy-intake.ps1).
//
//   node tools/export-flows.mjs           # write the files
//   node tools/export-flows.mjs --check   # exit 1 if a file is missing or stale, write nothing

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { config, connectionReferences, flowDefinition } from './automation.mjs';
import { intakeDefinition } from './intake.mjs';

export const outputDirectory = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'flows');

const LIMIT = 170;
const text = (value) => (typeof value === 'string' ? value : JSON.stringify(value));
const shorten = (value) => {
  const flat = text(value).replace(/\s+/g, ' ').trim();
  return flat.length > LIMIT ? `${flat.slice(0, LIMIT - 1)}…` : flat;
};
const code = (value) => `\`${shorten(value).replaceAll('`', "'")}\``;

function detail(action) {
  const inputs = action.inputs ?? {};
  switch (action.type) {
    case 'OpenApiConnection': {
      const parameters = inputs.parameters ?? {};
      const table = parameters.entityName ? ` auf ${parameters.entityName}` : '';
      const filter = parameters.$filter ? `, Filter ${code(parameters.$filter)}` : '';
      return `${inputs.host?.connectionName} / ${inputs.host?.operationId}${table}${filter}`;
    }
    case 'Http': return `${inputs.method} ${code(inputs.uri)}`;
    case 'If': return `wenn ${code(action.expression)}`;
    case 'Switch': return `nach ${code(action.expression)}`;
    case 'Foreach': return `über ${code(action.foreach)}`;
    case 'Compose': return code(inputs);
    case 'InitializeVariable': return inputs.variables.map(variable => `${variable.name} (${variable.type})`).join(', ');
    case 'SetVariable': return `${inputs.name} = ${code(inputs.value)}`;
    case 'AppendToArrayVariable': return `${inputs.name} += ${code(inputs.value)}`;
    case 'Select': case 'Query': return `aus ${code(inputs.from)}`;
    case 'ParseJson': return `liest ${code(inputs.content)}`;
    case 'Response': return `Status ${inputs.statusCode}`;
    default: return '';
  }
}

// A handler that only runs after a failure says so, because that is what makes the outline readable.
function failureNote(runAfter = {}) {
  const failing = Object.entries(runAfter).filter(([, statuses]) => statuses.some(status => status !== 'Succeeded') && !statuses.includes('Succeeded'));
  return failing.length ? `, läuft nur nach Fehler von ${failing.map(([name, statuses]) => `\`${name}\` (${statuses.join(', ')})`).join(', ')}` : '';
}

function outlineLines(actions = {}, depth = 0) {
  const pad = '  '.repeat(depth);
  const lines = [];
  const branch = (label, children) => {
    if (children && Object.keys(children).length) lines.push(`${pad}  - ${label}`, ...outlineLines(children, depth + 2));
  };
  for (const [name, action] of Object.entries(actions)) {
    const extra = detail(action);
    lines.push(`${pad}- \`${name}\` (${action.type})${extra ? `: ${extra}` : ''}${failureNote(action.runAfter)}`);
    if (action.type === 'If') {
      branch('dann:', action.actions);
      branch('sonst:', action.else?.actions);
    } else if (action.type === 'Switch') {
      for (const entry of Object.values(action.cases ?? {})) branch(`Fall ${code(entry.case)}:`, entry.actions);
      branch('Standard:', action.default?.actions);
    } else {
      lines.push(...outlineLines(action.actions, depth + 1));
    }
  }
  return lines;
}

function allActions(actions = {}) {
  return Object.entries(actions).flatMap(([name, action]) => [
    [name, action],
    ...allActions(action.actions),
    ...allActions(action.else?.actions),
    ...allActions(action.default?.actions),
    ...Object.values(action.cases ?? {}).flatMap(entry => allActions(entry.actions)),
  ]);
}

export function actionNames(definition) {
  return allActions(definition.actions).map(([name]) => name);
}

function triggerText(definition) {
  const [[name, trigger]] = Object.entries(definition.triggers);
  if (trigger.type === 'Recurrence') {
    const runs = trigger.runtimeConfiguration?.concurrency?.runs;
    return `\`${name}\`, Wiederholung alle ${trigger.recurrence.interval} ${trigger.recurrence.frequency === 'Minute' ? 'Minuten' : trigger.recurrence.frequency}${runs ? `, höchstens ${runs} Lauf gleichzeitig` : ''}`;
  }
  const fields = Object.keys(trigger.inputs?.schema?.properties ?? {});
  return `\`${name}\`, HTTP-Anfrage (${trigger.kind ?? trigger.type})${fields.length ? `, erwartete Felder: ${fields.map(field => `\`${field}\``).join(', ')}` : ''}`;
}

export function outline({ title, definition, flow, script }) {
  const used = [...new Set(allActions(definition.actions).map(([, action]) => action.inputs?.host?.connectionName).filter(Boolean))];
  const references = connectionReferences({});
  const total = allActions(definition.actions).length;
  return [
    `# ${title}: Gliederung`,
    '',
    'Erzeugt mit `node tools/export-flows.mjs`, nicht von Hand ändern. Die vollständige Definition steht in der gleichnamigen Datei `*.definition.json`; hier ist nur die Struktur mit den wichtigsten Angaben je Aktion (lange Ausdrücke sind gekürzt).',
    '',
    `- **Flow:** ${flow.name}`,
    `- **Vorgesehene Flow-ID:** \`${flow.id}\` (wird beim Anlegen durch \`${script}\` verwendet)`,
    `- **Auslöser:** ${triggerText(definition)}`,
    `- **Verbindungen (Connection References):** ${used.map(name => `\`${references[name].connectionReferenceLogicalName}\``).join(', ')}`,
    `- **Aktionen:** ${total}`,
    '- **Zustand nach der Bereitstellung:** ausgeschaltet, bis das Deploy-Skript mit `-Enable` läuft',
    '',
    '## Aktionen',
    '',
    ...outlineLines(definition.actions),
    '',
  ].join('\n');
}

const readme = () => `# Erzeugte Flow-Definitionen

Diese Dateien zeigen, was die beiden Deploy-Skripte in Dataverse anlegen werden. Sie sind **abgeleitet** und kein Import-Paket: Die Quelle sind \`tools/automation.mjs\` (Verarbeitung), \`tools/intake.mjs\` (Einreichung) und \`_data/profile.json\`. Mit \`node tools/export-flows.mjs\` werden sie neu geschrieben, und ein Test (\`tools/flows-export.test.mjs\`) schlägt fehl, wenn sie nicht mehr zum Code passen.

| Datei | Inhalt |
|---|---|
| \`processing.outline.md\` | Gliederung des Verarbeitungs-Flows (${config.flows.processing.name}) |
| \`processing.definition.json\` | Vollständige Definition des Verarbeitungs-Flows |
| \`intake.outline.md\` | Gliederung des Einreichungs-Flows (${config.flows.intake.name}) |
| \`intake.definition.json\` | Vollständige Definition des Einreichungs-Flows |

Sie gelten für das Profil in \`_data/profile.json\` (Tabelle \`${config.table}\`, Lösung \`${config.solution}\`). Die Flows selbst gibt es erst, wenn die Schritte der Stufe 2 im [Go-Live-Runbook](../2026-09-30_go-live-runbook.md) im Tenant gelaufen sind.
`;

export function renderFiles() {
  const processing = flowDefinition();
  const intake = intakeDefinition();
  return {
    'README.md': readme(),
    'processing.definition.json': `${JSON.stringify(processing, null, 2)}\n`,
    'processing.outline.md': outline({ title: config.flows.processing.name, definition: processing, flow: config.flows.processing, script: 'tools/deploy-automation.ps1' }),
    'intake.definition.json': `${JSON.stringify(intake, null, 2)}\n`,
    'intake.outline.md': outline({ title: config.flows.intake.name, definition: intake, flow: config.flows.intake, script: 'tools/deploy-intake.ps1' }),
  };
}

function main(argv) {
  const files = renderFiles();
  const stale = Object.entries(files).filter(([name, content]) => !existsSync(join(outputDirectory, name)) || readFileSync(join(outputDirectory, name), 'utf8') !== content).map(([name]) => name);
  if (argv.includes('--check')) {
    if (stale.length) {
      console.error(`Stale or missing: ${stale.join(', ')}. Run node tools/export-flows.mjs.`);
      process.exitCode = 1;
    } else console.log('The exported flow files are up to date.');
    return;
  }
  mkdirSync(outputDirectory, { recursive: true });
  for (const [name, content] of Object.entries(files)) writeFileSync(join(outputDirectory, name), content, 'utf8');
  console.log(`Wrote ${Object.keys(files).length} files to docs/flows/ (${stale.length} changed).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main(process.argv.slice(2));

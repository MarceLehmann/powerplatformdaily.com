import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { config, flowDefinition } from './automation.mjs';
import { intakeDefinition } from './intake.mjs';
import { actionNames, outputDirectory, renderFiles } from './export-flows.mjs';

test('the exported flow files exist and match what the generators produce now', () => {
  const files = renderFiles();
  assert.deepEqual(Object.keys(files).sort(), ['README.md', 'intake.definition.json', 'intake.outline.md', 'processing.definition.json', 'processing.outline.md']);
  for (const [name, content] of Object.entries(files)) {
    const path = join(outputDirectory, name);
    assert.ok(existsSync(path), `${name} is missing: run node tools/export-flows.mjs`);
    assert.equal(readFileSync(path, 'utf8'), content, `${name} is stale: run node tools/export-flows.mjs`);
  }
});

test('the export is deterministic and the JSON is the generated definition', () => {
  assert.deepEqual(renderFiles(), renderFiles());
  const files = renderFiles();
  assert.deepEqual(JSON.parse(files['processing.definition.json']), JSON.parse(JSON.stringify(flowDefinition())));
  assert.deepEqual(JSON.parse(files['intake.definition.json']), JSON.parse(JSON.stringify(intakeDefinition())));
});

test('every action of each flow appears in its outline, and the header names the flow and its connections', () => {
  const files = renderFiles();
  for (const [key, definition] of [['processing', flowDefinition()], ['intake', intakeDefinition()]]) {
    const outline = files[`${key}.outline.md`];
    const names = actionNames(definition);
    assert.ok(names.length > 5);
    assert.equal(new Set(names).size, names.length, 'action names are unique within a flow');
    for (const name of names) assert.ok(outline.includes(`\`${name}\``), `${key}: ${name} is missing in the outline`);
    assert.ok(outline.includes(`**Aktionen:** ${names.length}`));
    assert.ok(outline.includes(config.flows[key].name));
    assert.ok(outline.includes(config.flows[key].id));
    assert.ok(outline.includes(`${config.connectionReferencePrefix}dataverse`));
    assert.doesNotMatch(outline, /\[object Object\]|undefined/);
  }
  // the processing flow needs all five connections, the intake flow only Dataverse
  for (const name of ['rss', 'conversion', 'foundry', 'github']) assert.ok(files['processing.outline.md'].includes(`${config.connectionReferencePrefix}${name}`));
  assert.ok(!files['intake.outline.md'].includes(`${config.connectionReferencePrefix}github`));
});

test('the exported files carry no tenant identifiers and no secrets', () => {
  const everything = Object.values(renderFiles()).join('\n');
  for (const value of [config.tenant, config.environment, config.organization]) assert.ok(!everything.includes(value), `${value} must not be in the exported files`);
  assert.doesNotMatch(everything, /[?&]sig=|Bearer\s|api[-_]?key\s*[:=]/i);
});

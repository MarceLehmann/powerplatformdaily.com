// One-time schema setup for T-0074 (cross-repo dedup). Creates the new_contentstaging table,
// its attributes, and the new_normalizedurlkey alternate key on new_normalizedurl, then polls
// until the key reaches State=Active (Dataverse indexes alternate keys asynchronously - using
// one before it's Active can silently behave like a non-unique insert instead of enforcing the
// constraint).
//
// Usage: node tools/create-dedup-staging-table.mjs [--dry-run]

import { execFileSync } from 'node:child_process';
import { stagingConfig, stagingTableDefinition, alternateKeyDefinition } from './dedup-staging.mjs';

const dryRun = process.argv.includes('--dry-run');

function getToken() {
  const token = execFileSync('az', ['account', 'get-access-token', '--resource', stagingConfig.organization, '--query', 'accessToken', '-o', 'tsv'], { shell: true }).toString().trim();
  if (!token) throw new Error('Could not acquire a Dataverse token - run `az login`.');
  return token;
}

async function dataverse(token, method, path, body, extraHeaders = {}) {
  const response = await fetch(`${stagingConfig.organization}/api/data/v9.2/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) throw new Error(`${method} ${path} failed: ${response.status} ${await response.text()}`);
  return response.status === 204 ? null : response.json();
}

async function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

async function main() {
  const token = getToken();

  const existing = await dataverse(token, 'GET', `EntityDefinitions?$select=LogicalName&$filter=LogicalName eq '${stagingConfig.table}'`);
  const tableExists = existing.value.length > 0;
  if (tableExists) {
    console.log(`Table ${stagingConfig.table} already exists - checking for missing attributes.`);
    const currentAttrs = await dataverse(token, 'GET', `EntityDefinitions(LogicalName='${stagingConfig.table}')/Attributes?$select=LogicalName`);
    const have = new Set(currentAttrs.value.map((a) => a.LogicalName));
    for (const attr of stagingTableDefinition.Attributes) {
      if (have.has(attr.SchemaName)) continue;
      if (dryRun) { console.log(`[dry-run] would add attribute ${attr.SchemaName}.`); continue; }
      await dataverse(token, 'POST', `EntityDefinitions(LogicalName='${stagingConfig.table}')/Attributes`, attr);
      console.log(`Added attribute ${attr.SchemaName}.`);
    }
  } else if (dryRun) {
    console.log(`[dry-run] would create table ${stagingConfig.table} with ${stagingTableDefinition.Attributes.length} attributes.`);
    console.log(`[dry-run] would create alternate key ${stagingConfig.alternateKeyName} on new_normalizedurl.`);
    return;
  } else {
    await dataverse(token, 'POST', 'EntityDefinitions', stagingTableDefinition);
    console.log(`Created table ${stagingConfig.table}.`);
    // Attribute creation on the new entity is processed async server-side immediately after
    // the entity itself commits - a short pause avoids a race against the key creation below.
    await sleep(15000);
  }

  const existingKey = await dataverse(token, 'GET', `EntityDefinitions(LogicalName='${stagingConfig.table}')/Keys?$select=SchemaName,EntityKeyIndexStatus`);
  const key = existingKey.value.find((k) => k.SchemaName === stagingConfig.alternateKeyName);
  if (key) {
    console.log(`Key ${stagingConfig.alternateKeyName} already exists, status: ${key.EntityKeyIndexStatus}.`);
  } else if (dryRun) {
    console.log(`[dry-run] would create alternate key ${stagingConfig.alternateKeyName} on new_normalizedurl.`);
    return;
  } else {
    await dataverse(token, 'POST', `EntityDefinitions(LogicalName='${stagingConfig.table}')/Keys`, alternateKeyDefinition);
    console.log(`Submitted key ${stagingConfig.alternateKeyName} - polling for State=Active...`);
  }

  if (dryRun) return;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const check = await dataverse(token, 'GET', `EntityDefinitions(LogicalName='${stagingConfig.table}')/Keys?$select=SchemaName,EntityKeyIndexStatus`);
    const current = check.value.find((k) => k.SchemaName === stagingConfig.alternateKeyName);
    console.log(`  attempt ${attempt + 1}: EntityKeyIndexStatus = ${current?.EntityKeyIndexStatus}`);
    if (current?.EntityKeyIndexStatus === 'Active') {
      console.log('Alternate key is Active. Schema setup complete.');
      return;
    }
    await sleep(15000);
  }
  throw new Error('Alternate key did not reach Active status within the poll budget - check manually before relying on upsert/duplicate-key behavior.');
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

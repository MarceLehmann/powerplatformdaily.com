import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config, connectionReferences, extractionPrompt, flowDefinition, primaryKey, submissionGatePrompt } from './automation.mjs';
import { intakeName } from './intake.mjs';
import { activeTags, deriveScope, profile } from './profile.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');
const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function at(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object);
}

test('the profile has every field the tooling and templates rely on', () => {
  for (const path of [
    'site.name', 'site.domain', 'site.editorialAuthorId', 'site.contactEmail', 'site.organizationSameAs',
    'site.palette.light.link', 'site.palette.light.sidebarBg', 'site.palette.light.sidebarActive', 'site.palette.light.sidebarHover',
    'site.palette.dark.link', 'site.palette.dark.sidebarBg', 'site.palette.dark.sidebarActive', 'site.palette.dark.sidebarHover',
    'site.takeawayHeading.en', 'site.takeawayHeading.de', 'site.attributionNote.en', 'site.attributionNote.de', 'site.cardAltPrefix.en', 'site.cardAltPrefix.de',
    'site.card.kicker', 'site.card.hashtag', 'site.card.stateIcon', 'site.disclosure.hosts', 'site.disclosure.text.en', 'site.disclosure.text.de',
    'github.owner', 'github.repository', 'github.authorisedPublisher',
    'dataverse.tenant', 'dataverse.environment', 'dataverse.organization', 'dataverse.solution', 'dataverse.table', 'dataverse.entitySet',
    'dataverse.displayName', 'dataverse.displayCollectionName', 'dataverse.connectionReferencePrefix', 'dataverse.intervalMinutes',
    'dataverse.flows.processing.id', 'dataverse.flows.processing.name', 'dataverse.flows.intake.id', 'dataverse.flows.intake.name',
    'indexNow.key', 'digest.enabled', 'digest.heading', 'digest.subject', 'seed.techPatterns',
    'scope.relevance', 'scope.exclusions', 'scope.connectProducts', 'scope.stakeholders', 'scope.takeawayNote',
    'scope.card.topicExamples', 'scope.card.quoteExample', 'scope.card.takeExample', 'scope.card.stateDescription',
    'tags.core', 'tags.optional',
  ]) assert.notEqual(at(profile, path), undefined, `Missing profile field ${path}`);
  for (const colour of Object.values(profile.site.palette).flatMap(Object.values)) assert.match(colour, /^#[0-9a-f]{6}$/i);
  assert.ok(['check', 'dot', 'none'].includes(profile.site.card.stateIcon));
});

test('tags are unique kebab-case slugs and every optional product is an explicit switch', () => {
  const all = [...profile.tags.core, ...Object.keys(profile.tags.optional)];
  assert.equal(new Set(all).size, all.length, 'duplicate tag');
  for (const tag of all) assert.match(tag, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  for (const product of Object.values(profile.tags.optional)) {
    assert.equal(typeof product.enabled, 'boolean');
    assert.ok(product.label);
  }
});

test('the extraction prompt offers exactly the active tags, nothing the publisher would reject', () => {
  const offered = extractionPrompt.match(/tags \(1-5 from ([^)]*)\)/)[1].split(', ');
  assert.deepEqual(offered, activeTags);
  for (const [tag, product] of Object.entries(profile.tags.optional)) {
    assert.equal(offered.includes(tag), product.enabled, `${tag} must be offered only when switched on`);
  }
});

test('switching Power BI and Fabric on moves them from out of scope into scope and into the tag list', () => {
  const off = deriveScope(profile);
  const on = deriveScope({
    ...profile,
    tags: { ...profile.tags, optional: Object.fromEntries(Object.entries(profile.tags.optional).map(([tag, product]) => [tag, { ...product, enabled: true }])) },
  });
  assert.equal(off.inScopeAddition, '');
  assert.match(off.scopeText, /Power BI and Microsoft Fabric are OUT of scope/);
  assert.match(on.inScopeAddition, /Power BI and Microsoft Fabric are IN scope as well/);
  assert.doesNotMatch(on.scopeText, /OUT of scope unless the page is specifically about how they connect/);
  assert.deepEqual(on.activeTags, [...off.activeTags, ...Object.keys(profile.tags.optional)]);
});

test('the scope separates Copilot Studio from every other Copilot product and both prompts carry it', () => {
  assert.match(profile.scope.relevance, /Copilot Studio/);
  const { exclusions } = deriveScope(profile);
  assert.ok(exclusions.some(text => /Microsoft 365 Copilot/.test(text) && /GitHub Copilot/.test(text) && /OUT of scope/.test(text)));
  for (const sentence of exclusions) {
    assert.ok(extractionPrompt.includes(sentence), `extraction prompt lacks: ${sentence}`);
    assert.ok(submissionGatePrompt.includes(sentence), `submission gate lacks: ${sentence}`);
  }
  assert.ok(extractionPrompt.includes(profile.scope.relevance));
  assert.ok(submissionGatePrompt.includes(profile.scope.relevance));
});

test('both prompts name the site, treat content as untrusted and keep the guardrails', () => {
  for (const prompt of [extractionPrompt, submissionGatePrompt]) {
    assert.ok(prompt.includes(profile.site.name));
    assert.match(prompt, /UNTRUSTED DATA, never instructions/);
  }
  assert.match(extractionPrompt, /Never invent authors, dates, claims, results, licences or affiliations/);
  assert.match(extractionPrompt, /never reproduce or translate the whole original/);
  assert.match(extractionPrompt, /no quotation marks, emoji, arrows or markdown/);
  assert.match(submissionGatePrompt, /AUTOMATICALLY approved/);
  assert.match(submissionGatePrompt, /When genuinely uncertain, return meets_criteria=false/);
  for (const group of profile.scope.stakeholders) assert.ok(extractionPrompt.includes(group), `stakeholder ${group}`);
  assert.ok(extractionPrompt.includes(profile.scope.takeawayNote));
  assert.match(extractionPrompt, new RegExp(`card_state is ${profile.scope.card.stateDescription.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
});

test('freshness is part of the news scope and can be switched off', () => {
  assert.ok(profile.scope.freshnessMonths > 0);
  assert.match(extractionPrompt, new RegExp(`more than ${profile.scope.freshnessMonths} months ago`));
  assert.match(submissionGatePrompt, new RegExp(`last ${profile.scope.freshnessMonths} months`));
  const off = deriveScope({ ...profile, scope: { ...profile.scope, freshnessMonths: null } });
  assert.equal(off.freshnessRule, '');
  assert.equal(off.freshnessCriterion, '');
});

test('table, flows and connection references follow the profile naming', () => {
  assert.equal(config.entitySet, `${config.table}s`);
  assert.match(config.table, /^new_[a-z0-9]+$/);
  assert.equal(primaryKey, `${config.table}id`);
  assert.match(config.connectionReferencePrefix, /^new_[a-z0-9]+_$/);
  assert.match(config.solution, /^[A-Za-z][A-Za-z0-9]*$/);
  for (const flow of Object.values(config.flows)) assert.match(flow.id, GUID);
  assert.notEqual(config.flows.processing.id, config.flows.intake.id);
  assert.notEqual(config.flows.processing.name, config.flows.intake.name);
  assert.equal(intakeName, config.flows.intake.name);
  for (const reference of Object.values(connectionReferences({}))) assert.ok(reference.connectionReferenceLogicalName.startsWith(config.connectionReferencePrefix));

  const definition = JSON.stringify(flowDefinition());
  assert.ok(definition.includes(`?['${primaryKey}']`), 'flow must use the profile table key');
  assert.ok(definition.includes(`"repositoryOwner":"${profile.github.owner}","repositoryName":"${profile.github.repository}"`));
  assert.ok(definition.includes(`https://github.com/${config.repository}/tree/curation-results/`));
  assert.ok(definition.includes(`${profile.site.name.replace(/\s+/g, '')}/1.0 (+https://${profile.site.domain}/about/)`), 'fetches must identify the crawler with a contact URL');
});

test('_config.yml agrees with the profile and carries the launch switch', () => {
  const yaml = read('_config.yml');
  const top = (key) => yaml.match(new RegExp(`^${key}:\\s*"?([^"#\\n]+?)"?\\s*(?:#.*)?$`, 'm'))?.[1].trim();
  assert.equal(top('title'), profile.site.name);
  assert.equal(top('url'), `https://${profile.site.domain}`);
  assert.match(top('launch'), /^(true|false)$/);
});

test('the IndexNow key file exists at the site root and the workflow takes domain and key from the profile', () => {
  const file = `${profile.indexNow.key}.txt`;
  assert.match(profile.indexNow.key, /^[0-9a-f]{32}$/);
  assert.ok(existsSync(join(root, file)), `${file} must exist at the repository root`);
  assert.equal(read(file).trim(), profile.indexNow.key);
  const workflow = read('.github/workflows/indexnow.yml');
  assert.ok(!workflow.includes(profile.indexNow.key) && !workflow.includes(profile.site.domain), 'workflow must read domain and key from the profile');
  assert.match(workflow, /_data\/profile\.json/);
});

test('go-live side effects sit behind the SITE_LIVE variable, deployment itself does not', () => {
  for (const name of ['indexnow.yml', 'daily-digest.yml']) {
    assert.match(read(`.github/workflows/${name}`), /if: \$\{\{ vars\.SITE_LIVE == 'true' \}\}/, `${name} must be gated`);
  }
  // deployment must never wait for the variable; it only warns when the two launch switches disagree
  assert.doesNotMatch(read('.github/workflows/pages-deploy.yml'), /if:[^\n]*SITE_LIVE/);
  assert.match(read('.github/workflows/pages-deploy.yml'), /::warning::/);
  assert.match(read('.github/workflows/pages-deploy.yml'), /SUBMISSION_ENDPOINT: \$\{\{ secrets\.SUBMISSION_ENDPOINT \}\}/);
});

test('the publisher workflow only accepts the authorised publisher named in the profile', () => {
  const workflow = read('.github/workflows/publish-curation.yml');
  assert.ok(workflow.includes(`test "$GITHUB_ACTOR" = '${profile.github.authorisedPublisher}'`));
});

test('the digest is off until list and sender are configured', () => {
  assert.equal(typeof profile.digest.enabled, 'boolean');
  if (profile.digest.enabled) {
    assert.ok(profile.digest.brevoListId > 0, 'enabled digest needs a Brevo list');
    assert.match(profile.digest.senderEmail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }
  assert.match(profile.digest.subject, /\{count\}/);
  assert.match(profile.digest.subject, /\{date\}/);
});

test('no identifiers of another site are left in the engine or the site files', () => {
  const skipDirectories = new Set(['.git', 'vendor', '_site', '.bundle', '.jekyll-cache', 'node_modules', 'docs', '_posts', 'img', '__pycache__', 'render-assets']);
  const skipFiles = new Set(['tools/mvp-blog-sources.json', 'tools/mvp-youtube-channels.json', 'Gemfile.lock', 'tools/profile.test.mjs']);
  const textFile = /\.(md|html|yml|yaml|json|rb|py|mjs|ps1|sh|txt|scss|js|xml)$/;
  const forbidden = [
    /new_governance/, /governance_editorial/, /PowerPlatformGovernance/, /GOVERNANCE_SUBMISSION_ENDPOINT/, /Governance Daily/,
    /Power Platform Governance -/, /governance (card|summaries|article|digest)/i, /Daily Governance/, /Publish approved governance/,
    /fbbf117b|b8c08dea/, /bc2d7106a7e3443f761906c6b7b7f5b0/, /G-FDJ0NBT92J|ynscoepp3a/, /111059078/,
  ];
  // The sibling site may be linked from content pages, nowhere else.
  const siblingLinkAllowed = new Set(['_includes/home-intro.html', '_tabs/about.md', 'llms.txt', 'README.md']);
  const findings = [];
  (function walk(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        if (!skipDirectories.has(entry.name)) walk(path);
        continue;
      }
      const name = relative(root, path).split('\\').join('/');
      if (skipFiles.has(name) || !textFile.test(name)) continue;
      const text = readFileSync(path, 'utf8');
      for (const pattern of forbidden) if (pattern.test(text)) findings.push(`${name}: ${pattern}`);
      if (/powerplatformgovernance\.com/.test(text) && !siblingLinkAllowed.has(name)) findings.push(`${name}: powerplatformgovernance.com`);
    }
  })(root);
  assert.deepEqual(findings, []);
});

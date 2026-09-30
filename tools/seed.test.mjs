import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { approval, kind, processing } from './automation.mjs';
import { buildRecords, createApi, matchesScope, parseOptions, seed } from './seed-mvp-sources.mjs';

const read = (name) => JSON.parse(readFileSync(new URL(`./${name}`, import.meta.url), 'utf8'));
const blogs = read('mvp-blog-sources.json');
const channels = read('mvp-youtube-channels.json');

test('seeded sources are approved but disabled unless the pilot is switched on explicitly', () => {
  const records = buildRecords({ blogs, channels }, parseOptions([]));
  assert.ok(records.length > 0);
  for (const record of records) {
    assert.equal(record.new_approval, approval.approved);
    assert.equal(record.new_enabled, false);
    assert.equal(record.new_kind, kind.rss);
    assert.equal(record.new_processing, processing.ready);
  }
  for (const record of buildRecords({ blogs, channels }, parseOptions(['--enable']))) assert.equal(record.new_enabled, true);
});

test('only blogs that cover the profile products are seeded, YouTube channels only on request', () => {
  const scoped = buildRecords({ blogs, channels }, parseOptions([]));
  const everything = buildRecords({ blogs, channels }, parseOptions(['--all-topics', '--with-youtube']));
  assert.equal(scoped.length, blogs.filter(entry => matchesScope(entry)).length);
  assert.ok(scoped.length < blogs.length + channels.length);
  // the YouTube list maps four channels to two people each; the seed keeps one record per feed
  assert.equal(everything.length, blogs.length + channels.length - 4);
  assert.ok(!scoped.some(record => /youtube\.com\/feeds/.test(record.new_contenturl)));
  assert.equal(matchesScope({ tech: 'Power BI;Microsoft Fabric' }), false);
  assert.equal(matchesScope({ tech: 'Copilot Studio;M365 Copilot' }), true);
  assert.equal(matchesScope({ tech: null }), false);
});

test('every seeded feed URL is a public HTTPS URL and no URL is seeded twice', () => {
  const records = buildRecords({ blogs, channels }, parseOptions(['--all-topics', '--with-youtube']));
  assert.equal(new Set(records.map(record => record.new_contenturl)).size, records.length);
  assert.equal(new Set(channels.map(channel => channel.feedUrl)).size, channels.length - 4, 'source list shape changed: re-check the duplicate channel mapping');
  for (const record of records) assert.match(record.new_contenturl, /^https:\/\//);
  assert.throws(() => buildRecords({ extras: [{ name: 'Plain HTTP', xmlUrl: 'http://example.org/feed' }] }), /Not a public HTTPS feed URL/);
  assert.throws(() => buildRecords({ extras: [{ name: 'Credentials', xmlUrl: 'https://user:secret@example.org/feed' }] }), /Not a public HTTPS feed URL/);
  assert.equal(buildRecords({ extras: [{ name: 'Official', xmlUrl: 'https://example.org/feed/' }] }, {}).length, 1);
});

test('hand-picked extras come first and --only selects exactly the named sources', () => {
  const extras = [{ name: 'Official Example', xmlUrl: 'https://example.org/feed/' }];
  const records = buildRecords({ blogs, channels, extras }, parseOptions([]));
  assert.equal(records[0].new_contenturl, 'https://example.org/feed/');
  assert.equal(buildRecords({ blogs, channels, extras }, parseOptions(['--only', 'official example'])).length, 1);
  const someone = blogs.find(entry => matchesScope(entry));
  const picked = buildRecords({ blogs, channels, extras }, parseOptions(['--only', ` ${someone.name.toUpperCase()} ,official example`]));
  assert.ok(picked.some(record => record.new_contenturl === someone.xmlUrl));
  assert.ok(picked.some(record => record.new_contenturl === 'https://example.org/feed/'));
  assert.ok(picked.length < 5);
  assert.throws(() => parseOptions(['--only', ' , ']), /at least one name term/);
});

test('the limit option is parsed strictly', () => {
  assert.equal(parseOptions(['--limit', '15']).limit, 15);
  assert.equal(parseOptions([]).limit, Infinity);
  assert.throws(() => parseOptions(['--limit', 'many']), /non-negative number/);
});

test('the default is a dry run and --apply is the only way to write', () => {
  assert.equal(parseOptions([]).apply, false);
  assert.equal(parseOptions(['--dry-run']).apply, false);
  assert.equal(parseOptions(['--apply']).apply, true);
  assert.throws(() => parseOptions(['--apply', '--dry-run']), /contradict/);
});

test('--feed-from is a real past date and is set on the new records only when given', () => {
  assert.equal(parseOptions(['--feed-from', '2026-09-01']).feedFrom, '2026-09-01T00:00:00.000Z');
  assert.equal(parseOptions([]).feedFrom, undefined);
  for (const bad of ['yesterday', '2026-13-01', '2026-02-30', '2999-01-01', '']) assert.throws(() => parseOptions(['--feed-from', bad]), /--feed-from/);
  assert.throws(() => parseOptions(['--feed-from']), /--feed-from/);
  const extras = [{ name: 'Official Example', xmlUrl: 'https://example.org/feed/' }];
  assert.equal(buildRecords({ extras }, parseOptions(['--feed-from', '2026-09-01']))[0].new_feedfrom, '2026-09-01T00:00:00.000Z');
  assert.equal('new_feedfrom' in buildRecords({ extras }, parseOptions([]))[0], false);
});

test('--only matches the label, which is the name followed by the technologies', () => {
  const byProduct = buildRecords({ blogs }, parseOptions(['--only', 'copilot studio']));
  assert.ok(byProduct.length > 0 && byProduct.length < blogs.length);
  assert.ok(byProduct.every(record => /copilot studio/i.test(record.new_name)));
});

function fakeApi({ existing = [], failRead } = {}) {
  const calls = { created: [] };
  return {
    calls,
    existingUrls: async () => { if (failRead) throw new Error(failRead); return existing; },
    create: async (record) => { calls.created.push(record); },
  };
}
const extras = [1, 2, 3, 4].map(index => ({ name: `Source ${index}`, xmlUrl: `https://example.org/${index}/feed/` }));
const quiet = () => {};

test('a dry run reads but never creates; --apply creates only what is missing and respects the limit', async () => {
  const records = buildRecords({ extras }, parseOptions([]));
  const dry = fakeApi({ existing: ['https://example.org/2/feed/'] });
  const planned = await seed({ records, options: parseOptions([]), api: dry, log: quiet });
  assert.deepEqual(dry.calls.created, []);
  assert.deepEqual([planned.created, planned.skipped, planned.checked], [3, 1, true]);

  const live = fakeApi({ existing: ['https://example.org/2/feed/'] });
  const done = await seed({ records, options: parseOptions(['--apply', '--limit', '2']), api: live, log: quiet });
  assert.deepEqual(live.calls.created.map(record => record.new_contenturl), ['https://example.org/1/feed/', 'https://example.org/3/feed/']);
  assert.equal(done.created, 2);
  assert.ok(live.calls.created.every(record => record.new_enabled === false && record.new_approval === approval.approved));
});

test('without access a dry run still lists the sources, but --apply stops', async () => {
  const records = buildRecords({ extras }, parseOptions([]));
  const lines = [];
  const dry = await seed({ records, options: parseOptions([]), api: fakeApi({ failRead: 'no login' }), log: line => lines.push(line) });
  assert.deepEqual([dry.created, dry.checked], [4, false]);
  assert.ok(lines.some(line => line.includes('could not be read (no login)')));
  assert.ok(lines.some(line => line.includes('(not checked)')));
  const live = fakeApi({ failRead: 'table not found' });
  await assert.rejects(seed({ records, options: parseOptions(['--apply']), api: live, log: quiet }), /table not found/);
  assert.deepEqual(live.calls.created, []);
});

test('the Web API adapter reads every page and reports a missing table', async () => {
  const requests = [];
  const answers = [
    { status: 200, body: { value: [{ new_contenturl: 'https://a/' }], '@odata.nextLink': 'https://example.crm/api/data/v9.2/tables?$select=new_contenturl&$skiptoken=x' } },
    { status: 200, body: { value: [{ new_contenturl: 'https://b/' }] } },
    { status: 404, body: {} },
  ];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    requests.push({ url: String(url), method: init.method });
    const answer = answers.shift();
    return { status: answer.status, ok: answer.status < 300, json: async () => answer.body, text: async () => JSON.stringify(answer.body), headers: new Map() };
  };
  try {
    const api = createApi('token');
    assert.deepEqual(await api.existingUrls(), ['https://a/', 'https://b/']);
    assert.ok(requests[1].url.endsWith('/api/data/v9.2/tables?$select=new_contenturl&$skiptoken=x'));
    await assert.rejects(api.existingUrls(), /bootstrap-solution/);
  } finally {
    globalThis.fetch = original;
  }
});

// The real entry point, with no Azure CLI on the PATH.
const runCli = (args) => spawnSync(process.execPath, [new URL('./seed-mvp-sources.mjs', import.meta.url).pathname, ...args], {
  encoding: 'utf8', env: { ...process.env, PATH: mkdtempSync(join(tmpdir(), 'no-az-')) },
});

test('on the command line a dry run works without a login and an apply stops with a message', { skip: process.platform === 'win32' }, () => {
  const dry = runCli(['--only', 'copilot studio', '--limit', '2']);
  assert.equal(dry.status, 0);
  assert.match(dry.stdout, /Would create 2 record\(s\), skipped 0 already present \(not checked\)/);
  assert.match(dry.stdout, /Nothing was written/);
  const apply = runCli(['--apply', '--limit', '1']);
  assert.equal(apply.status, 1);
  assert.match(apply.stderr, /Could not acquire a Dataverse token/);
  assert.doesNotMatch(apply.stderr, /\n\s+at /, 'no stack trace');
  assert.doesNotMatch(apply.stdout, /created:/, 'nothing is created without a login');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { approval, kind, processing } from './automation.mjs';
import { buildRecords, matchesScope, parseOptions } from './seed-mvp-sources.mjs';

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

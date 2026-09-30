// Bulk-creates RSS source records in the site's Dataverse table from three optional inputs:
//   - tools/mvp-blog-sources.json      Power Platform MVP blogs (feed URLs verified to answer with feed content),
//                                      filtered by the products in _data/profile.json (seed.techPatterns)
//   - tools/extra-sources.json         hand-picked additions, e.g. official Microsoft feeds:
//                                      [{ "name": "...", "xmlUrl": "https://.../feed/" }]
//   - tools/mvp-youtube-channels.json  YouTube channel upload feeds (only with --with-youtube; the transcript path
//                                      has not produced a published item on the governance site yet)
//
// These are curated by the editor directly, not public submissions, so they are created already APPROVED - they
// bypass the AI submission gate (that gate expects a single article page, not a feed URL).
//
// Unlike the first version, records are created DISABLED by default. Nothing is polled until "Processing enabled"
// is switched on, which makes a staged rollout possible: create a small pilot with --enable --limit 15, watch it,
// then add more. Existing URLs are always skipped, so re-running is safe.
//
// Usage (needs an active `az login` against the tenant that owns the Dataverse environment - see profile.json):
//   node tools/seed-mvp-sources.mjs --dry-run              # print what would be created, write nothing
//   node tools/seed-mvp-sources.mjs                        # create missing records, disabled
//   node tools/seed-mvp-sources.mjs --enable --limit 15    # create at most 15 new records, enabled (pilot)
//   node tools/seed-mvp-sources.mjs --enable --only "Anders Jensen,Matthew Devaney"   # exactly these sources
//   Options: --with-youtube  include YouTube channel feeds     --all-topics  skip the product filter
//            --only a,b      keep sources whose name contains one of the terms (case-insensitive)
//   Hand-picked extras (extra-sources.json) come first, so --limit fills a pilot with them before any blog.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { approval, config, kind, processing, profile } from './automation.mjs';

const read = (name) => JSON.parse(readFileSync(new URL(`./${name}`, import.meta.url), 'utf8'));

export function parseOptions(argv) {
  const onlyIndex = argv.indexOf('--only');
  const only = onlyIndex >= 0 ? String(argv[onlyIndex + 1] ?? '').split(',').map(term => term.trim().toLowerCase()).filter(Boolean) : [];
  if (onlyIndex >= 0 && only.length === 0) throw new Error('--only needs at least one name term');
  const limitIndex = argv.indexOf('--limit');
  const limit = limitIndex >= 0 ? Number.parseInt(argv[limitIndex + 1], 10) : Infinity;
  if (!(limit >= 0)) throw new Error('--limit needs a non-negative number');
  return {
    dryRun: argv.includes('--dry-run'),
    enable: argv.includes('--enable'),
    withYoutube: argv.includes('--with-youtube'),
    allTopics: argv.includes('--all-topics'),
    only,
    limit,
  };
}

// A blog is in scope when its declared technologies mention one of the profile's products.
export function matchesScope(entry, patterns = profile.seed.techPatterns) {
  const tech = String(entry.tech ?? '').toLowerCase();
  return patterns.some(pattern => tech.includes(pattern));
}

function assertFeedUrl(url) {
  if (typeof url !== 'string' || !/^https:\/\/[^\s/@]+\.[a-z]{2,}(?::443)?\//i.test(url)) throw new Error(`Not a public HTTPS feed URL: ${url}`);
  return url;
}

export function buildRecords({ blogs = [], channels = [], extras = [] }, options = {}) {
  const only = options.only ?? [];
  const sources = [
    ...extras.map(entry => ({ label: `${entry.name} - official/extra`, url: entry.xmlUrl })),
    ...blogs.filter(entry => options.allTopics || matchesScope(entry)).map(entry => ({ label: `${entry.name} - ${entry.tech}`, url: entry.xmlUrl })),
    ...(options.withYoutube ? channels.map(entry => ({ label: `${entry.name} - YouTube channel`, url: entry.feedUrl })) : []),
  ].filter(source => only.length === 0 || only.some(term => source.label.toLowerCase().includes(term)));
  // The same feed can appear twice (the YouTube list maps four channels to two people each); the first one wins.
  const seen = new Set();
  return sources.filter(source => !seen.has(source.url) && seen.add(source.url)).map(source => ({
    new_name: source.label.slice(0, 100),
    new_contenturl: assertFeedUrl(source.url),
    new_kind: kind.rss,
    new_approval: approval.approved,
    new_enabled: options.enable === true,
    new_processing: processing.ready,
  }));
}

function getToken() {
  const token = execFileSync('az', ['account', 'get-access-token', '--resource', config.organization, '--tenant', config.tenant, '--query', 'accessToken', '-o', 'tsv'], { shell: true }).toString().trim();
  if (!token) throw new Error('Could not acquire a Dataverse token - run `az login` against the tenant that owns ' + config.organization);
  return token;
}

async function dataverse(token, method, path, body) {
  const response = await fetch(`${config.organization}/api/data/v9.2/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) throw new Error(`${method} ${path} failed: ${response.status} ${await response.text()}`);
  return response.status === 204 ? null : response.json();
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const extrasUrl = new URL('./extra-sources.json', import.meta.url);
  const records = buildRecords({
    blogs: read('mvp-blog-sources.json'),
    channels: read('mvp-youtube-channels.json'),
    extras: existsSync(extrasUrl) ? read('extra-sources.json') : [],
  }, options);

  const token = getToken();
  const existing = await dataverse(token, 'GET', `${config.entitySet}?$select=new_contenturl&$top=5000`);
  const existingUrls = new Set(existing.value.map(row => row.new_contenturl));

  let created = 0;
  let skipped = 0;
  for (const record of records) {
    if (existingUrls.has(record.new_contenturl)) {
      skipped += 1;
      continue;
    }
    if (created >= options.limit) break;
    if (options.dryRun) {
      console.log('[dry-run] would create:', record.new_name, record.new_contenturl, record.new_enabled ? '(enabled)' : '(disabled)');
    } else {
      await dataverse(token, 'POST', config.entitySet, record);
      console.log('created:', record.new_name, record.new_enabled ? '(enabled)' : '(disabled)');
    }
    created += 1;
  }
  console.log(`\n${options.dryRun ? 'Would create' : 'Created'} ${created} record(s), skipped ${skipped} already present.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

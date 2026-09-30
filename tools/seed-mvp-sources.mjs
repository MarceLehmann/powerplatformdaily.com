// Bulk-creates RSS source records in the site's Dataverse table from three optional inputs:
//   - tools/mvp-blog-sources.json      Power Platform MVP blogs, filtered by the products in _data/profile.json
//                                      (seed.techPatterns). The feed URLs are candidates: none of them has been
//                                      checked for this site yet (see WP-03 in the specification)
//   - tools/extra-sources.json         hand-picked additions, e.g. official Microsoft feeds:
//                                      [{ "name": "...", "xmlUrl": "https://.../feed/" }]
//   - tools/mvp-youtube-channels.json  YouTube channel upload feeds (only with --with-youtube; the transcript path
//                                      has not produced a published item on the governance site yet)
//
// These are curated by the editor directly, not public submissions, so they are created already APPROVED - they
// bypass the AI submission gate (that gate expects a single article page, not a feed URL).
//
// The default is a DRY RUN: it prints what would be created and writes nothing. --apply writes. Records are
// created DISABLED unless --enable is given, and nothing is polled until "Processing enabled" is switched on, which
// makes a staged rollout possible: create a small pilot with --apply --enable --limit 15, watch it, then add more.
// Records whose URL already exists are skipped, so re-running is safe - which also means --enable never changes an
// existing record. To switch existing records on, edit "Processing enabled" in the table's data view in the maker portal.
//
// A new source starts at its creation time: only entries published afterwards are read. --feed-from <date> sets
// "Process RSS articles published from" on the new records to read the older entries of a feed as well (for the pilot
// evaluation). Only use it for feeds that have at most 30 entries since that date: the flow processes 30 entries
// per poll and marks the rest as seen without reading them (finding F1 in the specification).
//
// Usage (--apply needs an active `az login` against the tenant that owns the Dataverse environment - see profile.json;
// without a login the dry run still lists every source and only skips the check for existing records):
//   node tools/seed-mvp-sources.mjs                                       # dry run
//   node tools/seed-mvp-sources.mjs --apply                               # create missing records, disabled
//   node tools/seed-mvp-sources.mjs --apply --enable --limit 15           # create at most 15 new records, enabled (pilot)
//   node tools/seed-mvp-sources.mjs --apply --enable --only "Anders Jensen,Matthew Devaney"   # exactly these sources
//   Options: --with-youtube  include YouTube channel feeds     --all-topics  skip the product filter
//            --only a,b      keep sources whose label contains one of the terms (case-insensitive); the label is the
//                            name followed by the technologies, so --only "copilot studio" selects by product
//            --feed-from 2026-09-01   see above
//   Hand-picked extras (extra-sources.json) come first, so --limit fills a pilot with them before any blog.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { approval, config, kind, processing, profile } from './automation.mjs';

const read = (name) => JSON.parse(readFileSync(new URL(`./${name}`, import.meta.url), 'utf8'));

function parseFeedFrom(text) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text ?? '')) throw new Error('--feed-from needs a date like 2026-09-01');
  const date = new Date(`${text}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== text) throw new Error(`--feed-from ${text} is not a real date`);
  if (date.getTime() > Date.now()) throw new Error('--feed-from must not be in the future');
  return date.toISOString();
}

export function parseOptions(argv) {
  const onlyIndex = argv.indexOf('--only');
  const only = onlyIndex >= 0 ? String(argv[onlyIndex + 1] ?? '').split(',').map(term => term.trim().toLowerCase()).filter(Boolean) : [];
  if (onlyIndex >= 0 && only.length === 0) throw new Error('--only needs at least one name term');
  const limitIndex = argv.indexOf('--limit');
  const limit = limitIndex >= 0 ? Number.parseInt(argv[limitIndex + 1], 10) : Infinity;
  if (!(limit >= 0)) throw new Error('--limit needs a non-negative number');
  const feedFromIndex = argv.indexOf('--feed-from');
  if (argv.includes('--apply') && argv.includes('--dry-run')) throw new Error('--apply and --dry-run contradict each other');
  return {
    apply: argv.includes('--apply'),
    enable: argv.includes('--enable'),
    withYoutube: argv.includes('--with-youtube'),
    allTopics: argv.includes('--all-topics'),
    feedFrom: feedFromIndex >= 0 ? parseFeedFrom(argv[feedFromIndex + 1]) : undefined,
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
    ...(options.feedFrom ? { new_feedfrom: options.feedFrom } : {}),
  }));
}

// The logic, separated from the network so it can be tested: `api` reads the existing URLs and creates a record.
export async function seed({ records, options, api, log = console.log }) {
  const apply = options.apply === true;
  const tag = apply ? '[apply]' : '[dry-run]';
  let existingUrls = new Set();
  let checked = true;
  try {
    existingUrls = new Set(await api.existingUrls());
  } catch (error) {
    if (apply) throw error;
    checked = false;
    log(`${tag} Existing records could not be read (${error.message}). Every source is listed as new; a real run skips what is already there.`);
  }

  let created = 0;
  let skipped = 0;
  for (const record of records) {
    if (existingUrls.has(record.new_contenturl)) {
      skipped += 1;
      continue;
    }
    if (created >= options.limit) break;
    const state = `${record.new_enabled ? 'enabled' : 'disabled'}${record.new_feedfrom ? `, from ${record.new_feedfrom.slice(0, 10)}` : ''}`;
    if (apply) await api.create(record);
    log(`${tag} ${apply ? 'created' : 'would create'}: ${record.new_name} ${record.new_contenturl} (${state})`);
    created += 1;
  }
  log(`\n${apply ? 'Created' : 'Would create'} ${created} record(s), skipped ${skipped} already present${checked ? '' : ' (not checked)'}.`);
  if (!apply) log('Nothing was written. Run again with --apply to create them.');
  return { created, skipped, checked };
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

export function createApi(token) {
  async function dataverse(method, path, body) {
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
    if (response.status === 404) throw new Error(`table ${config.table} not found - run tools/bootstrap-solution.mjs --apply first`);
    if (!response.ok) throw new Error(`${method} ${path} failed: ${response.status} ${(await response.text()).slice(0, 600)}`);
    return response.status === 204 ? null : response.json();
  }
  return {
    async existingUrls() {
      const rows = [];
      let next = `${config.entitySet}?$select=new_contenturl`;
      while (next) {
        const page = await dataverse('GET', next);
        rows.push(...page.value.map(row => row.new_contenturl));
        // Dataverse pages at 5000 rows; the link is absolute, so strip the API root again.
        next = page['@odata.nextLink']?.split('/api/data/v9.2/')[1];
      }
      return rows;
    },
    create: (record) => dataverse('POST', config.entitySet, record),
  };
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const extrasUrl = new URL('./extra-sources.json', import.meta.url);
  const records = buildRecords({
    blogs: read('mvp-blog-sources.json'),
    channels: read('mvp-youtube-channels.json'),
    extras: existsSync(extrasUrl) ? read('extra-sources.json') : [],
  }, options);

  let api;
  try {
    api = createApi(getToken());
  } catch (error) {
    if (options.apply) throw error;
    api = { existingUrls: async () => { throw error; }, create: async () => { throw error; } };
  }
  await seed({ records, options, api });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

// Single source of truth for everything that differs between sites built on this engine.
// The same file (_data/profile.json) is read by the Node tooling here, by the Ruby publisher, by the
// Python card and digest scripts and - through site.data.profile - by the Jekyll templates.
import { readFileSync } from 'node:fs';

export const profile = JSON.parse(readFileSync(new URL('../_data/profile.json', import.meta.url), 'utf8'));

const list = (items) => items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : (items[0] ?? '');

// Derives the tag allowlist and the scope sentences of the prompts from a profile. Kept as a function of its
// input so tests can check the switched-on state of the optional products (Power BI, Fabric) as well.
export function deriveScope(source) {
  const optional = Object.entries(source.tags.optional).map(([tag, value]) => ({ tag, ...value }));
  const enabled = optional.filter(product => product.enabled);
  const disabled = optional.filter(product => !product.enabled);

  // Tags the publisher accepts and the extraction prompt offers. Optional products join only when switched on,
  // so prompt and publisher can never drift apart.
  const activeTags = [...source.tags.core, ...enabled.map(product => product.tag)];

  // Everything the model must treat as out of scope, including optional products that are switched off.
  const exclusions = [
    ...source.scope.exclusions,
    ...(disabled.length
      ? [`${list(disabled.map(product => product.label))} ${disabled.length > 1 ? 'are' : 'is'} OUT of scope unless the page is specifically about how ${disabled.length > 1 ? 'they connect' : 'it connects'} to ${source.scope.connectProducts}.`]
      : []),
  ];
  const inScopeAddition = enabled.length
    ? `${list(enabled.map(product => product.label))} ${enabled.length > 1 ? 'are' : 'is'} IN scope as well.`
    : '';
  const months = source.scope.freshnessMonths;
  return {
    activeTags,
    relevance: source.scope.relevance,
    exclusions,
    inScopeAddition,
    scopeText: [...exclusions, inScopeAddition].filter(Boolean).join(' '),
    freshnessRule: months
      ? `If the page shows that it was published more than ${months} months ago, or presents long-past events as upcoming, set publishable=false: this site publishes news, not an archive.`
      : '',
    freshnessCriterion: months
      ? `It is recent enough to count as news for this site: published within roughly the last ${months} months, or clearly still current.`
      : '',
  };
}

const derived = deriveScope(profile);
export const activeTags = derived.activeTags;
export const relevance = () => derived.relevance;
export const exclusions = () => derived.exclusions;
export const inScopeAddition = () => derived.inScopeAddition;
export const scopeText = () => derived.scopeText;
export const freshnessRule = () => derived.freshnessRule;
export const freshnessCriterion = () => derived.freshnessCriterion;

export const githubRepository = `${profile.github.owner}/${profile.github.repository}`;

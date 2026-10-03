// T-0074: cross-repo dedup resolver. Runs every 10 minutes, independent of either site's own
// 6-hourly Recurring_check. Finds staged items (new_contentstaging, written by the staging step
// each site's own automation.mjs added to its Has_publications branch) that have sat for at
// least WAIT_MINUTES, resolves same-story-different-URL collisions via Foundry, and does the
// actual GitHub dispatch for whichever item is clear to publish. Exact-URL collisions never
// reach this logic at all - the shared table's alternate key already makes that race-safe at
// staging time (second CreateRecord fails, caught there, nothing to resolve here).
//
// One shared flow handles both sites: new_site picks the right Dataverse table and GitHub repo
// per item via a runtime expression, not a design-time picker, so this needs only one dataverse
// and one github connection reference (both already bound to the environment-wide personal
// GitHub connection every other flow in both repos uses - see T-0135 for confirmation that one
// connectionId already covers both repos).

import { after, compose, condition, connector, withTimeout } from './automation.mjs';

// automation.mjs's own connector() only applies a default timeout to rss/conversion/foundry
// calls (see its connectorTimeouts comment: this project already lost 28+ minutes once to an
// untimed connector call stalling a sequential, concurrency:1 loop). dataverse/github calls get
// no default there either, and this resolver's first real run stalled on exactly that gap - so
// every connector call here gets an explicit timeout, deliberately more defensive than the
// baseline.
const dataverseCall = (operationId, parameters, ...deps) => withTimeout(connector('dataverse', operationId, parameters, ...deps), 'PT2M');
const githubCall = (operationId, parameters, ...deps) => withTimeout(connector('github', operationId, parameters, ...deps), 'PT2M');
const foundryCall = (operationId, parameters, ...deps) => withTimeout(connector('foundry', operationId, parameters, ...deps), 'PT3M');
import { stagingConfig, site, stagingStatus, WAIT_MINUTES } from './dedup-staging.mjs';

export const dedupResolverName = 'Cross-repo dedup resolver (Governance + PPNews, T-0074)';

const mySite = "items('For_each_ready_entry')?['new_site']";
const myId = "items('For_each_ready_entry')?['new_contentstagingid']";
const mySourceRecordId = "items('For_each_ready_entry')?['new_sourcerecordid']";
const sourceTableFor = (siteExpr) => `@if(equals(${siteExpr}, ${site.governance}), 'new_governancesources', 'new_newssources')`;
const repoNameFor = (siteExpr) => `@if(equals(${siteExpr}, ${site.governance}), 'powerplatformgovernance', 'powerplatformdaily.com')`;

// Dispatches the current foreach item and marks its staging entry Published. `afterName` is the
// name of whichever action immediately precedes this in the branch it's inlined into (differs
// between the no-conflict path and the "this entry won the Foundry comparison" path). `prefix`
// keeps action names distinct between the two call sites - Power Automate's run-history views
// key by action name across the whole run, so reusing names across branches makes diagnosing a
// specific run ambiguous (this bit hard during T-0135; not repeating it here).
function publishWinnerActions(prefix, afterName) {
  const n = (name) => `${prefix}_${name}`;
  // afterName omitted (no dependency) when the branch's own condition already gates on the
  // last step taken before this point - that step is an outer sibling here, not runAfter-able.
  const deps = afterName ? [afterName] : [];
  return {
    [n('Get_origin')]: dataverseCall('GetItem', { entityName: sourceTableFor(mySite), recordId: `@${mySourceRecordId}` }, ...deps),
    [n('Request_id')]: compose('@guid()', n('Get_origin')),
    [n('Public_credit')]: compose(`@if(equals(body('${n('Get_origin')}')?['new_publishcredit'], true), addProperty(addProperty(addProperty(json('{}'), 'name', coalesce(body('${n('Get_origin')}')?['new_submittername'], '')), 'linkedin', coalesce(body('${n('Get_origin')}')?['new_submitterlinkedin'], '')), 'publish_credit', true), json('{}'))`, n('Request_id')),
    // entityName is a runtime expression here (either site's table), not a static constant the
    // connector can bind a known schema to at save time - unlike every entityName elsewhere in
    // this codebase. The per-field "item/fieldname" shortcut properties only materialize for a
    // statically-known table; a dynamic entityName needs the generic nested "item" object form.
    [n('Mark_source_queued')]: dataverseCall('UpdateRecord', {
      entityName: sourceTableFor(mySite),
      recordId: `@${mySourceRecordId}`,
      item: {
        new_processing: 100000004, // processing.queued - same numeric value in both site tables
        new_requestid: `@outputs('${n('Request_id')}')`,
        // Watermark/seenIDs were already advanced for real when the item was staged (not a
        // pending copy) - this just satisfies the existing receipt-confirmation flow's
        // expectation that pendingwatermark/pendingseenids exist, by reconfirming the
        // already-current values.
        new_pendingwatermark: `@body('${n('Get_origin')}')?['new_watermark']`,
        new_pendingseenids: `@body('${n('Get_origin')}')?['new_seenids']`,
        new_lastchecked: '@utcNow()',
        new_lastmessage: 'Cleared by dedup resolver; awaiting confirmed GitHub workflow result.',
      },
    }, n('Public_credit')),
    [n('Dispatch_to_GitHub')]: githubCall('CreateRepositoryDispatchEvent', {
      repositoryOwner: 'MarceLehmann', repositoryName: repoNameFor(mySite),
      body: { event_type: 'curated-publication', client_payload: {
        request_id: `@outputs('${n('Request_id')}')`,
        articles: `@createArray(json(items('For_each_ready_entry')?['new_payload']))`,
        credit: `@outputs('${n('Public_credit')}')`,
      } },
    }, n('Mark_source_queued')),
    [n('Mark_entry_published')]: dataverseCall('UpdateRecord', {
      entityName: stagingConfig.entitySet, recordId: `@${myId}`,
      'item/new_status': stagingStatus.published,
    }, n('Dispatch_to_GitHub')),
  };
}

function supersede(afterName, targetIdExpr, note) {
  return dataverseCall('UpdateRecord', {
    entityName: stagingConfig.entitySet, recordId: targetIdExpr,
    'item/new_status': stagingStatus.superseded,
    'item/new_decisionnote': note,
  }, ...(afterName ? [afterName] : []));
}

export function dedupResolverDefinition() {
  return {
    $schema: 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#', contentVersion: '1.0.0.0',
    parameters: { $authentication: { defaultValue: {}, type: 'SecureObject' }, $connections: { defaultValue: {}, type: 'Object' } },
    triggers: { Every_10_minutes: { type: 'Recurrence', recurrence: { frequency: 'Minute', interval: 10 }, runtimeConfiguration: { concurrency: { runs: 1 } } } },
    actions: {
      Cutoff: compose(`@addMinutes(utcNow(), -${WAIT_MINUTES})`),
      List_ready: { ...dataverseCall('ListRecords', {
        entityName: stagingConfig.entitySet,
        $filter: `@concat('new_status eq ${stagingStatus.staged} and new_stagedat le ', outputs('Cutoff'))`,
        $orderby: 'new_stagedat asc',
      }, 'Cutoff'), runtimeConfiguration: { paginationPolicy: { minimumItemCount: 1000 } } },
      For_each_ready_entry: {
        type: 'Foreach', foreach: "@body('List_ready')?['value']", runAfter: after('List_ready'),
        runtimeConfiguration: { concurrency: { repetitions: 1 } },
        actions: {
          Title_key: compose("@toLower(trim(items('For_each_ready_entry')?['new_name']))"),
          // Dataverse's OData implementation does NOT support the tolower() filter function
          // (confirmed: HTTP 501 "The 'tolower' function isn't supported" - this is what
          // actually stalled the first real run, not a missing timeout as first suspected; the
          // connector silently retried the failing call until the timeout cut it off). Plain
          // 'eq' against new_name already matches case-insensitively under Dataverse's default
          // collation (verified directly), so compare against the column with no wrapper at all.
          Find_title_match: dataverseCall('ListRecords', {
            entityName: stagingConfig.entitySet,
            $filter: `@concat('new_site ne ', ${mySite}, ' and new_status ne ${stagingStatus.superseded} and new_name eq ''', replace(outputs('Title_key'), decodeUriComponent('%27'), decodeUriComponent('%27%27')), '''')`,
            $top: 1,
          }, 'Title_key'),
          Has_conflict: condition("@greater(length(body('Find_title_match')?['value']), 0)", {
            Foundry_compare: foundryCall('ChatCompletion', {
              deploymentId: 'model-router', 'api-version': '2024-08-01-preview', body: { messages: [
                { role: 'system', content: 'You decide which of two near-duplicate Power Platform articles should be published, given they were independently picked up by two sister sites with different topic scopes: Governance (security, compliance, DLP, ALM, CoE, environment strategy, administration) and PPNews/Daily (Copilot Studio, Power Apps, Power Automate, Power BI, Fabric product news and how-to). Pick the site whose scope the content actually fits best. Return exactly one JSON object, no Markdown fences: {"winner": "this" or "other", "reason": string, max 200 characters}. "this" means candidate A keeps it, "other" means candidate B keeps it. No other keys.' },
                { role: 'user', content: "@string(json(concat('{\"candidate_a_site\":', string(items('For_each_ready_entry')?['new_site']), ',\"candidate_a_title\":', string(items('For_each_ready_entry')?['new_name']), ',\"candidate_a_tags\":', string(items('For_each_ready_entry')?['new_tags']), ',\"candidate_b_site\":', string(body('Find_title_match')?['value'][0]?['new_site']), ',\"candidate_b_title\":', string(body('Find_title_match')?['value'][0]?['new_name']), ',\"candidate_b_tags\":', string(body('Find_title_match')?['value'][0]?['new_tags']), '}')))" },
              ], response_format: { type: 'json_object' } },
            }), // no runAfter dependency needed: Has_conflict's own condition already gates entry here on Find_title_match having succeeded, and Find_title_match is an outer sibling, not reachable from inside this branch
            Parse_decision: { type: 'ParseJson', runAfter: after('Foundry_compare'), inputs: {
              content: "@body('Foundry_compare')?['choices']?[0]?['message']?['content']",
              schema: { type: 'object', required: ['winner', 'reason'], properties: { winner: { type: 'string', enum: ['this', 'other'] }, reason: { type: 'string', maxLength: 200 } } },
            } },
            This_wins: condition("@equals(body('Parse_decision')?['winner'], 'this')", {
              // No runAfter dependency on Parse_decision here: This_wins's own condition already
              // gates entry on it, and Parse_decision is an outer sibling from inside this branch.
              Supersede_other: supersede(null, "@body('Find_title_match')?['value'][0]?['new_contentstagingid']", "@take(concat('Other site superseded by resolver: ', coalesce(body('Parse_decision')?['reason'], '')), 2000)"),
              ...publishWinnerActions('Winner', 'Supersede_other'),
            }, {
              Supersede_this: supersede(null, `@${myId}`, "@take(concat('This entry superseded by resolver: ', coalesce(body('Parse_decision')?['reason'], '')), 2000)"),
            }, 'Parse_decision'),
          }, {
            ...publishWinnerActions('Clean'),
          }, 'Find_title_match'),
        },
      },
    },
    outputs: {},
  };
}

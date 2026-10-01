// Standalone helper flow: runs the SAME Foundry relevance check as the live 5-minute flow
// (tools/automation.mjs), but never dispatches to GitHub and never auto-publishes. For every
// candidate the Foundry check judges publishable, it creates a new_newssource record of
// kind: article, approval: approved, enabled: FALSE - a dormant "reviewed, parked for later"
// record that the live flow ignores (its eligibility filter requires enabled=true). Marcel (or
// a future run) flips individual records to enabled: true to release them one at a time.
//
// Does not touch _posts, does not call Dispatch_to_GitHub, does not call the submission gate.
// Reuses the existing new_news_* connection references - no new connections or keys needed.
//
// Bounded by MaxCandidates (trigger input, see below) and by only considering feed items with
// a publish date on/after BackfillSince, so a single run has a predictable, capped Foundry cost.

import {
  config, kind, approval, processing, extractionPrompt,
  after, compose, condition, connector, set, hostSafetyCheck,
} from './automation.mjs';

export const backfillName = 'Power Platform News - Backfill to review queue';

const BACKFILL_SINCE = '2026-01-01T00:00:00Z';
const ITEMS_PER_SOURCE = 5; // sample breadth across many sources rather than exhausting one feed

export function backfillDefinition() {
  const perItem = {
    Article_URL: compose("@if(startsWith(toLower(trim(items('For_each_item')?['primaryLink'])), 'http'), trim(items('For_each_item')?['primaryLink']), items('For_each_item')?['primaryLink'])"),
    Validate_item_URL: hostSafetyCheck("outputs('Article_URL')", 'Article_URL'),
    Video_ID: compose(`@if(contains(outputs('Article_URL'), 'v='), first(split(last(split(outputs('Article_URL'), 'v=')), '&')), if(contains(outputs('Article_URL'), 'youtu.be/'), first(split(last(split(outputs('Article_URL'), 'youtu.be/')), '?')), ''))`, 'Validate_item_URL'),
    Is_youtube: condition("@not(empty(outputs('Video_ID')))", {
      Fetch_transcript: { type: 'Http', inputs: { method: 'GET', uri: "@concat('https://www.youtube.com/api/timedtext?fmt=json3&lang=en&v=', outputs('Video_ID'))", headers: { Accept: 'application/json' }, retryPolicy: { type: 'exponential', count: 2, interval: 'PT10S' } }, runAfter: {}, limit: { timeout: 'PT1M' } },
      Transcript_segments: { type: 'Select', inputs: { from: "@coalesce(body('Fetch_transcript')?['events'], createArray())", select: "@coalesce(item()?['segs'][0]?['utf8'], ' ')" }, runAfter: after('Fetch_transcript') },
      Set_text_youtube: set('ExtractedText', "@join(body('Transcript_segments'), ' ')", 'Transcript_segments'),
    }, {
      Fetch_article: { type: 'Http', inputs: { method: 'GET', uri: "@outputs('Article_URL')", headers: { Accept: 'text/html', 'User-Agent': 'PowerPlatformNews-Backfill/1.0' }, retryPolicy: { type: 'exponential', count: 2, interval: 'PT10S' } }, runAfter: {}, limit: { timeout: 'PT1M' } },
      HTML_to_text: connector('conversion', 'HtmlToText', { Content: "@take(string(body('Fetch_article')), 600000)" }, 'Fetch_article'),
      Set_text_article: set('ExtractedText', "@body('HTML_to_text')", 'HTML_to_text'),
    }, 'Video_ID'),
    Foundry_extract: connector('foundry', 'ChatCompletion', {
      deploymentId: 'model-router', 'api-version': '2024-08-01-preview', body: { messages: [
        { role: 'system', content: extractionPrompt },
        { role: 'user', content: "@string(addProperty(addProperty(json('{}'), 'url', outputs('Article_URL')), 'page_text', take(variables('ExtractedText'), 30000)))" },
      ], response_format: { type: 'json_object' } },
    }, 'Is_youtube'),
    Parse_assessment: { type: 'ParseJson', runAfter: after('Foundry_extract'), inputs: {
      content: "@body('Foundry_extract')?['choices']?[0]?['message']?['content']",
      schema: { type: 'object', required: ['publishable', 'reason'], properties: { publishable: { type: 'boolean' }, reason: { type: 'string' } } },
    } },
    Increment_checked: set('CheckedCount', "@add(variables('CheckedCount'), 1)", 'Parse_assessment'),
    If_publishable: condition("@equals(body('Parse_assessment')?['publishable'], true)", {
      Check_existing: connector('dataverse', 'ListRecords', {
        entityName: config.entitySet, $top: 1,
        $filter: "@concat('new_contenturl eq ', decodeUriComponent('%27'), replace(outputs('Article_URL'), decodeUriComponent('%27'), decodeUriComponent('%27%27')), decodeUriComponent('%27'))",
      }, 'Increment_checked'),
      Create_if_new: condition("@empty(body('Check_existing')?['value'])", {
        Review_note: compose("@concat('Backfill-Fund, zur Freigabe bereit. EN: ', body('Parse_assessment')?['en']?['title'], ' | DE: ', body('Parse_assessment')?['de']?['title'], ' | TL;DR: ', body('Parse_assessment')?['en']?['tldr'], ' | Tags: ', join(body('Parse_assessment')?['tags'], ', '))"),
        Create_review_record: connector('dataverse', 'CreateRecord', {
          entityName: config.entitySet,
          'item/new_name': "@take(coalesce(body('Parse_assessment')?['en']?['title'], outputs('Article_URL')), 100)",
          'item/new_contenturl': "@outputs('Article_URL')",
          'item/new_kind': kind.article,
          'item/new_approval': approval.approved,
          'item/new_enabled': false,
          'item/new_processing': processing.ready,
          'item/new_lastmessage': "@take(outputs('Review_note'), 4000)",
        }, 'Review_note'),
        Increment_created: set('CreatedCount', "@add(variables('CreatedCount'), 1)", 'Create_review_record'),
      }, {}, 'Check_existing'),
    }, {}, 'Increment_checked'),
  };

  return {
    $schema: 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#', contentVersion: '1.0.0.0',
    parameters: { $authentication: { defaultValue: {}, type: 'SecureObject' }, $connections: { defaultValue: {}, type: 'Object' } },
    triggers: {
      manual: { type: 'Request', kind: 'Http', inputs: { method: 'POST', schema: {
        type: 'object', properties: { maxCandidates: { type: 'integer' } },
      } } },
    },
    actions: {
      Max_candidates: compose("@coalesce(triggerBody()?['maxCandidates'], 25)"),
      Init: { type: 'InitializeVariable', runAfter: after('Max_candidates'), inputs: { variables: [
        { name: 'CheckedCount', type: 'integer', value: 0 },
        { name: 'CreatedCount', type: 'integer', value: 0 },
        { name: 'ExtractedText', type: 'string', value: '' },
      ] } },
      List_rss_sources: { ...connector('dataverse', 'ListRecords', {
        entityName: config.entitySet,
        $filter: `new_kind eq ${kind.rss} and new_approval eq ${approval.approved} and statecode eq 0`,
        $select: 'new_newssourceid,new_name,new_contenturl',
      }, 'Init'), runtimeConfiguration: { paginationPolicy: { minimumItemCount: 1000 } } },
      For_each_source: {
        type: 'Foreach', foreach: "@body('List_rss_sources')?['value']", runAfter: after('List_rss_sources'),
        runtimeConfiguration: { concurrency: { repetitions: 1 } },
        actions: {
          Under_cap_source: condition("@less(variables('CheckedCount'), outputs('Max_candidates'))", {
            Source_URL: compose("@trim(items('For_each_source')?['new_contenturl'])"),
            Validate_source_URL: hostSafetyCheck("outputs('Source_URL')", 'Source_URL'),
            Read_RSS: connector('rss', 'ListFeedItems', { feedUrl: "@outputs('Source_URL')" }, 'Validate_source_URL'),
            Recent_items: { type: 'Query', inputs: {
              from: "@body('Read_RSS')",
              where: `@greaterOrEquals(ticks(coalesce(item()?['publishDate'], '${BACKFILL_SINCE}')), ticks('${BACKFILL_SINCE}'))`,
            }, runAfter: after('Read_RSS') },
            Capped_items: compose(`@take(body('Recent_items'), ${ITEMS_PER_SOURCE})`, 'Recent_items'),
            For_each_item: {
              type: 'Foreach', foreach: "@outputs('Capped_items')", runAfter: after('Capped_items'),
              runtimeConfiguration: { concurrency: { repetitions: 1 } },
              actions: {
                Under_cap_item: condition("@less(variables('CheckedCount'), outputs('Max_candidates'))", {
                  Try_item: { type: 'Scope', runAfter: {}, actions: perItem },
                  Catch_item: { type: 'Scope', runAfter: { Try_item: ['Failed', 'TimedOut'] }, actions: {
                    Skipped_item: compose("@concat('Backfill item failed, skipped: ', outputs('Article_URL'))"),
                  } },
                }),
              },
            },
          }),
        },
      },
      Summary: compose("@concat('Backfill run: ', string(variables('CheckedCount')), ' checked, ', string(variables('CreatedCount')), ' created for review.')", 'For_each_source'),
    },
    outputs: {},
  };
}

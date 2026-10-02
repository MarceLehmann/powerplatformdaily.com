// Standalone daily scheduler (T-0131): releases the next BATCH_SIZE still-pending backfill
// article records (kind: article, enabled: false, approval: approved, processing: ready) by
// flipping new_enabled to true. Does nothing else - the existing Recurring_check flow in
// automation.mjs picks up newly-enabled records on its own next 6-hourly cycle and runs them
// through the full pipeline (Foundry re-check, DE/EN formatting, Dispatch_to_GitHub), exactly
// like any organically-discovered article. No duplicated Foundry/dispatch logic here.
//
// Trigger fires daily at 17:00 in the W. Europe Standard Time zone (handles the CEST/CET
// daylight-saving switch automatically - Power Automate resolves the schedule against the
// named zone, not a fixed UTC offset).
//
// Oldest-created pending record first (createdon asc), so the release order roughly follows
// the order the backfill run originally found them in.

import { config, kind, approval, processing, after, compose, connector } from './automation.mjs';

export const releaseScheduleName = 'Power Platform Daily - Release pending articles (daily 17:00 CH)';

const BATCH_SIZE = 3;

export function releaseScheduleDefinition() {
  return {
    $schema: 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#', contentVersion: '1.0.0.0',
    parameters: { $authentication: { defaultValue: {}, type: 'SecureObject' }, $connections: { defaultValue: {}, type: 'Object' } },
    triggers: {
      Daily_1700_CH: {
        type: 'Recurrence',
        recurrence: {
          frequency: 'Day', interval: 1,
          schedule: { hours: ['17'], minutes: [0] },
          timeZone: 'W. Europe Standard Time',
        },
        runtimeConfiguration: { concurrency: { runs: 1 } },
      },
    },
    actions: {
      List_pending: connector('dataverse', 'ListRecords', {
        entityName: config.entitySet,
        $filter: `statecode eq 0 and new_kind eq ${kind.article} and new_enabled eq false and new_approval eq ${approval.approved} and new_processing eq ${processing.ready}`,
        $orderby: 'createdon asc',
        $select: 'new_newssourceid,new_name',
        $top: BATCH_SIZE,
      }),
      For_each_batch_item: {
        type: 'Foreach', foreach: "@body('List_pending')?['value']", runAfter: after('List_pending'),
        runtimeConfiguration: { concurrency: { repetitions: 1 } },
        actions: {
          Release_record: connector('dataverse', 'UpdateRecord', {
            entityName: config.entitySet,
            recordId: "@items('For_each_batch_item')?['new_newssourceid']",
            'item/new_enabled': true,
            'item/new_lastmessage': "@concat('Freigegeben fuer taegliche Staffel-Veroeffentlichung (T-0131): ', utcNow())",
          }),
        },
      },
      Summary: compose("@concat('Released ', string(length(body('List_pending')?['value'])), ' pending article(s) for today''s batch.')", 'For_each_batch_item'),
    },
    outputs: {},
  };
}

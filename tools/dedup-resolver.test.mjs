import test from 'node:test';
import assert from 'node:assert/strict';
import { dedupResolverDefinition } from './dedup-resolver.mjs';
import { WAIT_MINUTES, stagingStatus } from './dedup-staging.mjs';

function collectActions(flow) {
  const actions = new Map();
  function visit(block) {
    for (const [name, action] of Object.entries(block)) {
      assert.equal(actions.has(name), false, `Duplicate action ${name} - action names must be unique across the whole run, not just within their container, or run-history views become ambiguous`);
      actions.set(name, action);
      for (const [dependency, states] of Object.entries(action.runAfter ?? {})) {
        assert.ok(block[dependency], `${name}: missing dependency ${dependency} in the same actions block`);
        assert.ok(Array.isArray(states));
      }
      if (action.type === 'Foreach') assert.equal(action.runtimeConfiguration.concurrency.repetitions, 1);
      if (action.actions) visit(action.actions);
      if (action.else) visit(action.else.actions);
    }
  }
  visit(flow.actions);
  return actions;
}

test('resolver structure has no dangling runAfter references and stays sequential', () => {
  const flow = dedupResolverDefinition();
  assert.equal(flow.triggers.Every_10_minutes.recurrence.interval, 10);
  assert.equal(flow.triggers.Every_10_minutes.runtimeConfiguration.concurrency.runs, 1);
  const actions = collectActions(flow);
  assert.equal(actions.get('Cutoff').inputs, `@addMinutes(utcNow(), -${WAIT_MINUTES})`);
  assert.match(actions.get('List_ready').inputs.parameters.$filter, new RegExp(`new_status eq ${stagingStatus.staged}`));
});

test('clean path (no title conflict) dispatches and marks the entry Published', () => {
  const actions = collectActions(dedupResolverDefinition());
  const hasConflict = actions.get('Has_conflict');
  // No runAfter dependency expected: Has_conflict's own condition already gates entry on
  // Find_title_match, which is an outer sibling unreachable from inside either branch.
  assert.ok(hasConflict.else.actions.Clean_Get_origin, 'no-conflict path must publish directly');
  assert.deepEqual(hasConflict.else.actions.Clean_Get_origin.runAfter, {});
  assert.ok(hasConflict.else.actions.Clean_Dispatch_to_GitHub);
  assert.ok(hasConflict.else.actions.Clean_Mark_entry_published);
});

test('conflict path only publishes the Foundry-chosen winner and logs the loser without deleting it', () => {
  const actions = collectActions(dedupResolverDefinition());
  const hasConflict = actions.get('Has_conflict');
  const thisWins = hasConflict.actions.This_wins;
  assert.ok(thisWins.actions.Supersede_other, 'winning this entry must supersede, not delete, the other');
  assert.equal(thisWins.actions.Supersede_other.inputs.parameters['item/new_status'], stagingStatus.superseded);
  assert.deepEqual(thisWins.actions.Supersede_other.runAfter, {}, 'Parse_decision is an outer sibling here - This_wins already gates on it');
  assert.ok(thisWins.actions.Winner_Get_origin, 'winning this entry must still publish it');
  assert.deepEqual(thisWins.actions.Winner_Get_origin.runAfter, { Supersede_other: ['Succeeded'] });
  assert.ok(thisWins.else.actions.Supersede_this, 'losing must supersede this entry, not delete it');
  assert.equal(thisWins.else.actions.Supersede_this.inputs.parameters['item/new_status'], stagingStatus.superseded);
  assert.equal(Object.keys(thisWins.else.actions).length, 1, 'the losing branch must not also publish');
});

test('dispatch uses a dynamic per-item repo/table, not a fixed site', () => {
  const actions = collectActions(dedupResolverDefinition());
  const dispatch = actions.get('Has_conflict').else.actions.Clean_Dispatch_to_GitHub;
  assert.match(dispatch.inputs.parameters.repositoryName, /if\(equals\(.*new_site.*powerplatformgovernance.*powerplatformdaily\.com/);
  const getOrigin = actions.get('Has_conflict').else.actions.Clean_Get_origin;
  assert.match(getOrigin.inputs.parameters.entityName, /if\(equals\(.*new_site.*new_governancesources.*new_newssources/);
});

test('every dataverse/github/foundry connector call has an explicit timeout', () => {
  // The resolver's first real run stalled 13+ minutes with zero progress on an untimed call -
  // every OpenApiConnection action here must set its own limit.timeout, no exceptions.
  const actions = collectActions(dedupResolverDefinition());
  let checked = 0;
  for (const [name, action] of actions) {
    if (action.type !== 'OpenApiConnection') continue;
    checked += 1;
    assert.ok(action.limit && action.limit.timeout, `${name} is missing an explicit connector timeout`);
  }
  assert.ok(checked >= 8, `expected to check at least 8 connector actions, only found ${checked}`);
});

test('request_id and credit are regenerated fresh at dispatch time, not reused from staging', () => {
  const actions = collectActions(dedupResolverDefinition());
  const dispatch = actions.get('Has_conflict').else.actions.Clean_Dispatch_to_GitHub;
  assert.equal(dispatch.inputs.parameters.body.client_payload.request_id, "@outputs('Clean_Request_id')");
  assert.match(dispatch.inputs.parameters.body.client_payload.articles, /createArray\(json\(items\('For_each_ready_entry'\)\?\['new_payload'\]\)\)/);
});

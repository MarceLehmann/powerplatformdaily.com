---
title: Build durable Copilot Studio processes with Dataverse state tables
description: A practical pattern for long-running invoice and purchase order processes
  using Copilot Studio agents, agent flows, Dataverse and scheduled sweeps.
date: '2026-10-13T16:58:42Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- dataverse
- power-automate
- power-bi
- connectors
content_type: curated_summary
curation_id: 8ea278de479cfe2e67a1e0ca
image:
  path: "/assets/img/curated/8ea278de479cfe2e67a1e0ca.png"
  alt: 'News card: Copilot Studio agents can orchestrate long-running processes through
    Dataverse state tables.'
permalink: "/en/posts/build-durable-copilot-studio-processes-with-dataverse-state-tables-8ea278de/"
translation_url: "/de/posts/build-durable-copilot-studio-processes-with-dataverse-state-tables-8ea278de/"
source_url: https://holgerimbery.blog/statetable-multi-agent-orchestration
source_site_url: https://holgerimbery.blog/
source_title: 'Long-Running Business Processes in Copilot Studio: State Tables, Agent
  Flows and Multi-Agent Orchestration'
source_name: Holger Imbery - fieldnotes and insights
source_language: en
source_language_name: English
source_author: Holger Imbery
source_published_at: '2026-09-13'
source_type: article
faq:
- question: How can Copilot Studio handle an invoice process that waits for days?
  answer: Store the case and its next action time in Dataverse, then use a scheduled
    agent flow to resume due work. The conversation does not remain open.
- question: What does the Copilot Studio TransitionCase agent flow do?
  answer: TransitionCase validates a requested state change against an allowed-transition
    list and writes the new row version. It ensures one component controls state changes.
- question: How are scanned invoices processed in this Copilot Studio pattern?
  answer: A specialist agent sends scanned documents through OCR or document intelligence,
    returns structured invoice fields with per-field confidence, and stores the result
    in the state table.
---

## TL;DR

Use a central Dataverse state table as the source of truth for long-running Copilot Studio processes. An orchestrator agent routes cases to specialist agents, while agent flows guard transitions, perform deterministic work, call connectors and periodically sweep due items.

{% include curated-attribution.html %}

## Why it matters

- Makers: Design the business states first, then keep routing in Copilot Studio and deterministic checks in agent flows so each component has a clear responsibility.
- Admins/IT: Use Dataverse rows, guarded transitions and scheduled sweeps instead of keeping long-running work in conversation memory, so cases survive waiting periods and restarts.
- BI/Data teams: Build Power BI reporting over the state table to track state counts, dwell times and low-confidence extraction fields.
- Leadership/Business: Start with one document type and supplier group, then use the audit trail and NeedsHuman queue to monitor reliability before widening the process.

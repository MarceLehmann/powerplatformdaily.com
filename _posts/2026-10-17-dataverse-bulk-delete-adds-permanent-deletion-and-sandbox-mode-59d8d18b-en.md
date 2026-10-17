---
title: Dataverse bulk delete adds permanent deletion and sandbox mode
description: New Dataverse bulk delete options support permanent deletion and sandbox
  execution through the Web API, with error details and restore controls also available.
date: '2026-10-17T16:53:20Z'
author: news_editorial
lang: en
toc: false
tags:
- dataverse
- power-apps
content_type: curated_summary
curation_id: 59d8d18b68755722d52b3e4a
image:
  path: "/assets/img/curated/59d8d18b68755722d52b3e4a.png"
  alt: 'News card: Dataverse bulk delete jobs can now permanently delete records and
    run in sandbox mode.'
permalink: "/en/posts/dataverse-bulk-delete-adds-permanent-deletion-and-sandbox-mode-59d8d18b/"
translation_url: "/de/posts/dataverse-bulk-delete-adds-permanent-deletion-and-sandbox-mode-59d8d18b/"
source_url: https://markcarrington.dev/2026/06/22/new-bulk-delete-options-come-to-dataverse/?utm_source=rss&utm_medium=rss&utm_campaign=new-bulk-delete-options-come-to-dataverse
source_site_url: https://markcarrington.dev/
source_title: New bulk delete options come to Dataverse
source_name: markcarrington.dev
source_language: en
source_language_name: English
source_author: Mark Carrington
source_published_at: '2026-06-22'
source_type: article
faq:
- question: How do I enable permanent deletion in a Dataverse bulk delete job?
  answer: Set CanRecoverDeletedRecords to false in the Web API Options object. The
    permanent deletion checkbox appears only when Keep deleted Dataverse records is
    enabled.
- question: How can I run a Dataverse bulk delete job in sandbox mode?
  answer: Set RunJobForSandbox to true in the Web API Options object. Sandbox mode
    is currently unavailable in the Dataverse bulk delete UI.
- question: What happened to bulk delete failures in the Dataverse interface?
  answer: Failed records are logged in the bulkdeletefailure table and surfaced under
    Run details. The author could see counts, but the UI did not render details correctly.
---

## TL;DR

Dataverse bulk delete jobs now support permanent deletion through CanRecoverDeletedRecords and sandbox execution through RunJobForSandbox in the Web API. Both options together reduced an example 1,100-record job to an average of 05:54, while individual results varied. The new settings are not yet available in the .NET SDK.

{% include curated-attribution.html %}

## Why it matters

- Makers: Use sandbox mode for disposable test data when plugins and related processing should not fire, but create the job through the Web API because the setting is not exposed in the UI.
- Admins/IT: Review whether permanent deletion fits retention requirements, remembering it matters when Keep deleted Dataverse records is enabled and removes restore options.
- BI/Data teams: Test both options against representative workloads, because the reported timing varied and sandbox mode alone was slower in the example.

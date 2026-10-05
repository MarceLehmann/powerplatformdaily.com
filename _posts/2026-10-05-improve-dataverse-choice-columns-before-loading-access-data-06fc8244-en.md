---
title: Improve Dataverse Choice Columns Before Loading Access Data
description: Review transformed Access data, improve the Dataverse model, and choose
  local or global Choice columns before importing.
date: '2026-10-05T16:57:54Z'
author: news_editorial
lang: en
toc: false
tags:
- dataverse
- power-apps
content_type: curated_summary
curation_id: 06fc8244b0dfc8ed156e7a97
image:
  path: "/assets/img/curated/06fc8244b0dfc8ed156e7a97.png"
  alt: 'News card: Improve Dataverse data quality before importing Access data. Choose
    local or global Choice columns for consistent values.'
permalink: "/en/posts/improve-dataverse-choice-columns-before-loading-access-data-06fc8244/"
translation_url: "/de/posts/improve-dataverse-choice-columns-before-loading-access-data-06fc8244/"
source_url: https://charleslakes.com/2026/06/26/solution-rebuild-part-2-database-access-to-dataverse-loading/
source_site_url: https://charleslakes.com/
source_title: 'Solution Rebuild: Part #2 | Database – Access to Dataverse (Loading)'
source_name: charleslakes.com
source_language: en
source_language_name: English
source_author: Charles
source_published_at: '2026-06-26'
source_type: article
faq:
- question: How can Choice columns improve imported Access data in Dataverse?
  answer: Choice columns replace repeated free text values with defined options, helping
    reduce inconsistent entries during Dataverse data loading.
- question: What is the difference between local and global choices in Dataverse?
  answer: Local choices belong to one table, while global choices are created in solutions
    and can be used by tables across the environment.
- question: When should I use a global Choice in Dataverse?
  answer: Use a global Choice when the same set of options is needed by multiple tables
    in the environment.
---

## TL;DR

Before loading transformed Microsoft Access data into Dataverse, review the data model and replace repeated text values with Choice columns where appropriate. Local choices belong to one table, while global choices are created in solutions and can be reused by tables across the environment. The choice depends on whether reuse is needed.

{% include curated-attribution.html %}

## Why it matters

- Makers: Audit transformed Access data before import and consider Choice columns for repeated values, because controlled options can reduce inconsistent entries.
- Admins/IT: Decide whether each Choice should be local or global based on reuse, because global choices can be used by multiple tables in the environment.

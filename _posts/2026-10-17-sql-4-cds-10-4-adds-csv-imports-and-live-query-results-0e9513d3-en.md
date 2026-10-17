---
title: SQL 4 CDS 10.4 adds CSV imports and live query results
description: SQL 4 CDS 10.4 can import CSV data into Dataverse, show results during
  execution, display text output and expose more metadata.
date: '2026-10-17T16:53:22Z'
author: news_editorial
lang: en
toc: false
tags:
- dataverse
content_type: curated_summary
curation_id: 0e9513d301fa06a710b21d9f
image:
  path: "/assets/img/curated/0e9513d301fa06a710b21d9f.png"
  alt: 'News card: SQL 4 CDS 10.4 adds CSV imports, live query results and richer
    Dataverse metadata.'
permalink: "/en/posts/sql-4-cds-10-4-adds-csv-imports-and-live-query-results-0e9513d3/"
translation_url: "/de/posts/sql-4-cds-10-4-adds-csv-imports-and-live-query-results-0e9513d3/"
source_url: https://markcarrington.dev/2026/05/22/sql-4-cds-10-4-released/?utm_source=rss&utm_medium=rss&utm_campaign=sql-4-cds-10-4-released
source_site_url: https://markcarrington.dev/
source_title: SQL 4 CDS 10.4 Released
source_name: Mark Carrington
source_language: en
source_language_name: English
source_author: Mark Carrington
source_published_at: '2026-05-22'
source_type: article
faq:
- question: How can SQL 4 CDS 10.4 import a CSV file into Dataverse?
  answer: SQL 4 CDS 10.4 uses OPENROWSET with FORMAT='CSV' in a SELECT statement,
    which can feed INSERT, UPDATE or DELETE operations.
- question: Which maths functions does SQL 4 CDS 10.4 support?
  answer: The release adds ABS, SIGN, CEILING, FLOOR and ROUND for SQL 4 CDS queries.
- question: How does SQL 4 CDS 10.4 expose statecode and statuscode metadata?
  answer: The metadata.optionsetvalue table adds defaultstatus, state, invariantname
    and transitiondata information for relevant statecode and statuscode values.
---

## TL;DR

SQL 4 CDS 10.4 adds OPENROWSET CSV imports for Dataverse, including multiple files, file metadata and encoding options. Queries can populate the results grid while running, results can display as text, five maths functions are supported, and statecode or statuscode metadata now exposes additional columns.

{% include curated-attribution.html %}

## Why it matters

- Makers: Use OPENROWSET with FIRSTROW, file format settings and CODEPAGE when loading CSV data into Dataverse, especially when headers or special characters need handling.
- BI/Data teams: Use wildcard imports plus filename or filepath metadata for multi-file loads, and inspect live query output or text results while troubleshooting longer queries.
- Makers: Check the expanded statecode and statuscode metadata when queries need default status, related state or custom transition details.

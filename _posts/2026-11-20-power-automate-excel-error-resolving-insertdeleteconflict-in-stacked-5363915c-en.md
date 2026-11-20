---
title: 'Power Automate Excel error: resolving InsertDeleteConflict in stacked tables'
description: A stacked Excel template with differently structured tables can make
  Power Automate's Add a row action fail with InsertDeleteConflict.
date: '2026-11-20T13:26:21Z'
author: news_editorial
lang: en
toc: false
tags:
- power-automate
- connectors
- ai-builder
content_type: curated_summary
curation_id: 5363915ca6467e5505822bba
image:
  path: "/assets/img/curated/5363915ca6467e5505822bba.png"
  alt: 'News card: Power Automate can fail when adding rows to stacked Excel tables
    with different column structures.'
permalink: "/en/posts/power-automate-excel-error-resolving-insertdeleteconflict-in-stacked-5363915c/"
translation_url: "/de/posts/power-automate-excel-error-resolving-insertdeleteconflict-in-stacked-5363915c/"
source_url: https://veronicageek.com/2026/power-automate-flow-error-with-excel-connectors-graph-api-conflict-response-error-code-is-insertdeleteconflict/
source_site_url: https://veronicageek.com/
source_title: 'Power Automate flow error with Excel connectors: Graph API conflict
  response, InsertDeleteConflict'
source_name: Veronique's Blog
source_language: en
source_language_name: English
source_author: Veronique Lengelle
source_published_at: '2026-11-20'
source_type: article
faq:
- question: Why does Power Automate Add a row return InsertDeleteConflict in Excel?
  answer: The error occurs when Add a row would move cells in a worksheet whose stacked
    tables have different column structures.
- question: Which Excel table layout can trigger the Power Automate connector conflict?
  answer: A lower table with one more column than the table above can cause the connector
    to fail when adding a row.
- question: How can I avoid InsertDeleteConflict with stacked Excel tables in Power
    Automate?
  answer: Use Office Scripts for the stacked layout, or place the tables on separate
    worksheets to avoid this connector limitation.
---

## TL;DR

Power Automate&\#39;s Excel connector can return InsertDeleteConflict when Add a row would move cells in a stacked worksheet containing tables with different column structures. The source recommends using Office Scripts for that layout or moving the tables to separate worksheets.

## Why it matters

- Makers: Check whether stacked Excel tables have different column counts when Add a row fails, because the connector may be unable to move cells safely.
- Makers: Use Office Scripts for a stacked layout with different tables, or place each table on a separate worksheet to avoid this connector limitation.

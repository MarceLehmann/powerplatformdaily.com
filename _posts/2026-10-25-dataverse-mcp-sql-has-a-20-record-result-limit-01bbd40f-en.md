---
title: Dataverse MCP SQL has a 20-record result limit
description: McpExecuteSqlQuery in the tested Dataverse MCP setup limits returned
  rows to 20, while supporting focused filtering, joins and basic aggregates.
date: '2026-10-25T16:57:18Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- dataverse
content_type: curated_summary
curation_id: 01bbd40fa4dbd508bef2275c
image:
  path: "/assets/img/curated/01bbd40fa4dbd508bef2275c.png"
  alt: 'News card: Dataverse MCP SQL returns a maximum of 20 rows in the tested implementation.'
permalink: "/en/posts/dataverse-mcp-sql-has-a-20-record-result-limit-01bbd40f/"
translation_url: "/de/posts/dataverse-mcp-sql-has-a-20-record-result-limit-01bbd40f/"
source_url: https://brewingthought.com/2026/07/28/the-adventures-of-dataverse-mcp-server-the-mystery-of-the-20-record-limit/
source_site_url: https://brewingthought.com/
source_title: 'The Adventures of Dataverse MCP Server: The Mystery of the 20-Record
  Limit'
source_name: Brewing Thought
source_language: en
source_language_name: English
source_author: Rachit Garg
source_published_at: '2026-07-28'
source_type: article
faq:
- question: Why does Dataverse McpExecuteSqlQuery return only 20 records?
  answer: The tested implementation enforces 20 as the maximum returned result size.
    Its Custom API metadata also exposes a top parameter with a default of 20.
- question: Which SQL operations does Dataverse MCP SQL support for Copilot Studio
    agents?
  answer: It supports SELECT, TOP, WHERE, ORDER BY, GROUP BY, JOIN, COUNT, SUM, AVG,
    MIN and MAX. It excludes constructs such as subqueries, HAVING, DISTINCT and CTEs.
- question: Do Dynamics 365 Finance and Operations virtual tables work the same with
    Dataverse MCP SQL?
  answer: No, virtual table results also depend on the underlying provider. Aggregate
    scenarios tested against F&O virtual entities did not always behave like native
    Dataverse tables.
---

## TL;DR

The tested McpExecuteSqlQuery implementation exposes a top parameter with a default and enforced maximum of 20 returned records. Dataverse MCP SQL can still use SELECT, WHERE, ORDER BY, GROUP BY, JOIN and basic aggregates, but it is intended for focused AI-agent context rather than bulk retrieval or full analytics.

{% include curated-attribution.html %}

## Why it matters

- Makers: Design agent queries to return a small, relevant result set and use supported filtering or aggregates where appropriate.
- Admins/IT: Test queries against Dynamics 365 Finance and Operations virtual tables because their provider can behave differently from native Dataverse tables.
- BI/Data teams: Keep bulk exports, frequently refreshed dashboards and large-scale retrieval in data and analytics tools rather than MCP SQL.

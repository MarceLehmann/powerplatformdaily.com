---
title: Avoid SharePoint list view threshold errors in Power Automate
description: Use Filter Query in Get files (properties only) to return a targeted
  SharePoint Online subset instead of an entire growing library.
date: '2026-10-04T16:57:02Z'
author: news_editorial
lang: en
toc: false
tags:
- power-automate
- connectors
content_type: curated_summary
curation_id: b65a0656be09765d95abcdb8
image:
  path: "/assets/img/curated/b65a0656be09765d95abcdb8.png"
  alt: 'News card: Filter SharePoint files at the source to avoid list view threshold
    errors.'
permalink: "/en/posts/avoid-sharepoint-list-view-threshold-errors-in-power-automate-b65a0656/"
translation_url: "/de/posts/avoid-sharepoint-list-view-threshold-errors-in-power-automate-b65a0656/"
source_url: https://charleslakes.com/2026/09/28/power-automate-cloud-flows-get-spo-items-list-view-threshold-error/
source_site_url: https://charleslakes.com/
source_title: 'Power Automate: Cloud Flows | Get SPO Items + List View Threshold Error'
source_name: Charles Lakes
source_language: en
source_language_name: English
source_author: Charles
source_published_at: '2026-09-28'
source_updated_at: '2026-09-28'
source_type: article
faq:
- question: How do I fix a list view threshold error in Power Automate Get files properties
    only?
  answer: Add a Filter Query in the action's Advanced parameters. It restricts the
    SharePoint REST request to the required subset of files.
- question: Why does Get files properties only fail after a SharePoint Online library
    grows past 5,000 items?
  answer: The action can attempt to retrieve too many library items in one HTTP GET
    request. That request can exceed the SharePoint list view threshold.
- question: Which filter should come first in a Power Automate SharePoint OData Filter
    Query?
  answer: Put first the filter that returns the smaller set of list items. This reduces
    the query size as the document library continues growing.
---

## TL;DR

Power Automate cloud flows using SharePoint Online Get files (properties only) can hit a list view threshold once a library exceeds 5,000 items. Add an OData Filter Query under Advanced parameters to restrict the initial REST request, and put the filter that returns fewer items first as the library grows.

{% include curated-attribution.html %}

## Why it matters

- Makers: Add an OData Filter Query to Get files (properties only) so the flow retrieves only the SharePoint files it needs.
- Makers: Order filters with the more selective column first to reduce the chance of another threshold failure as the library grows.

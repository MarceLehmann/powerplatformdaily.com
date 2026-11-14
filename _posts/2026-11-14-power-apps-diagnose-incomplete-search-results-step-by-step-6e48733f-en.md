---
title: 'Power Apps: Diagnose incomplete search results step by step'
description: A step-by-step method to find why a Power Apps search screen skips valid
  records, covering delegation, row limits, connector support, filters and user access.
date: '2026-11-14T13:24:58Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
- connectors
content_type: curated_summary
curation_id: 6e48733fee123fcfb684147a
image:
  path: "/assets/img/curated/6e48733fee123fcfb684147a.png"
  alt: 'News card: Trace the missing record from data source to screen before changing
    the search formula.'
permalink: "/en/posts/power-apps-diagnose-incomplete-search-results-step-by-step-6e48733f/"
translation_url: "/de/posts/power-apps-diagnose-incomplete-search-results-step-by-step-6e48733f/"
source_url: https://softchief.com/power-apps-diagnose-incomplete-search-results-for-business-users/
source_site_url: https://softchief.com/
source_title: 'Power Apps: Diagnose Incomplete Search Results for Business Users'
source_name: Softchief Technologies
source_language: en
source_language_name: English
source_author: Softchief
source_published_at: '2026-11-14'
source_type: article
faq:
- question: Why does my Power Apps search not find a record that exists?
  answer: Usually delegation, formula logic, stale data or the user's access rules.
    Start with one missing record and trace it through the source, the formula and
    the screen.
- question: What is the default data row limit for non-delegable queries in Power
    Apps?
  answer: 500 records by default. The app setting can be raised up to 10,000, but
    the source warns a higher limit does not make an unsupported query reliable.
- question: Which search functions are delegable for SharePoint and SQL Server in
    Power Apps?
  answer: Microsoft guidance cited in the post lists StartsWith for SharePoint text
    fields and both Search and StartsWith for SQL Server text, so check the delegation
    table per connector.
animation:
  video: /assets/img/animations/6e48733fee123fcfb684147a-en.mp4
  poster: /assets/img/animations/6e48733fee123fcfb684147a-en.poster.webp
  width: 800
  height: 450
  alt: "A four step sequence shows how to diagnose missing Power Apps search results by comparing records, checking searched fields, testing filter logic, and retesting as the affected user."
---

## TL;DR

When a Power Apps search screen skips a valid record, delegation is a prime suspect: a nondelegable query processes at most the data row limit, 500 by default, and raising it to 10,000 does not make the query reliable. Compare the missing record with a working one, check which fields the formula searches, test filter logic, then retest under the affected user&\#39;s account.

## Why it matters

- Makers: Start from one reported missing record, inspect the Items formula for delegation warnings, and match the query pattern to your connector before changing anything.
- Admins/IT: Confirm which environment and data source the app reads and review row-level access rules, since an admin may see records the user cannot.
- Leadership/Business: Ask users to report one concrete missing record with their exact search text so makers can verify the fix under the same account.

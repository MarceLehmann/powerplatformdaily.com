---
title: Replace 25 Power Apps globals with one record
description: Use a gblEvent record and Patch to manage multi-screen form data, then
  save one SharePoint item with a single Patch.
date: '2026-10-03T19:05:48Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
content_type: curated_summary
curation_id: d6b5dee3ad1801c88e91ebe1
image:
  path: "/assets/img/curated/d6b5dee3ad1801c88e91ebe1.png"
  alt: 'News card: Replace 25 global variables with one Power Apps record.'
permalink: "/en/posts/replace-25-power-apps-globals-with-one-record-d6b5dee3/"
translation_url: "/de/posts/replace-25-power-apps-globals-with-one-record-d6b5dee3/"
source_url: https://365-anouck.be/stop-shuttling-25-global-variables-through-your-power-apps-form/
source_site_url: https://365-anouck.be/
source_title: Stop Shuttling 25 Global Variables Through Your Power Apps Form
source_name: 365-ANOUCK
source_language: en
source_language_name: English
source_author: Anouck
source_published_at: '2026-07-02'
source_type: article
faq:
  - question: "What replaces 25 global variables in this multi-screen Power Apps form?"
    answer: "One gblEvent record. Each Next button uses Patch to add or update that record's fields instead of separate variables."
  - question: "How does this approach finally save the SharePoint item?"
    answer: "A final Patch with Defaults(Events) creates the SharePoint item, and Errors(Events) can return the actual save error message."
  - question: "What should makers test early when saving to SharePoint choice and person columns?"
    answer: "Test those columns early, because SharePoint choice and person fields require specific record shapes when patched from Power Apps."
---

## TL;DR

A multi-screen Power Apps event form can replace roughly 25 global variables with one gblEvent record. Each Next button uses Patch to add or update its fields. A final Patch with Defaults(Events) creates the SharePoint item, while Errors(Events) can return the actual save error message.

{% include curated-attribution.html %}

## Why it matters

- Makers: Initialise one gblEvent record, then Patch each screen&\#39;s fields into it to reduce duplicate variable wiring.
- Makers: Use one final Patch with Defaults(Events) to create the SharePoint item and avoid forms spread across screens.
- Makers: Test SharePoint choice and person columns early because they require specific record shapes.

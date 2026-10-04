---
title: Stop unnecessary SharePoint cloud flow runs with trigger conditions
description: Use a Power Automate trigger condition to run a SharePoint folder-copy
  flow only when a new document set has the Binder content type.
date: '2026-10-04T16:57:04Z'
author: news_editorial
lang: en
toc: false
tags:
- power-automate
- connectors
content_type: curated_summary
curation_id: d0ae9109e32553e1ecfba14a
image:
  path: "/assets/img/curated/d0ae9109e32553e1ecfba14a.png"
  alt: 'News card: Trigger conditions stop SharePoint flows from running for every
    new file.'
permalink: "/en/posts/stop-unnecessary-sharepoint-cloud-flow-runs-with-trigger-conditions-d0ae9109/"
translation_url: "/de/posts/stop-unnecessary-sharepoint-cloud-flow-runs-with-trigger-conditions-d0ae9109/"
source_url: https://charleslakes.com/2026/07/27/power-automate-cloud-flows-trigger-conditions-preventing-unnecessary-runs/
source_site_url: https://charleslakes.com/
source_title: 'POWER AUTOMATE: CLOUD FLOWS + TRIGGER CONDITIONS | PREVENTING UNNECESSARY
  RUNS'
source_name: console.log('Charles');
source_language: en
source_language_name: English
source_author: Charles
source_published_at: '2026-07-27'
source_type: article
faq:
- question: How do I limit a Power Automate SharePoint folder-copy flow to Binder
    document sets?
  answer: Add a trigger condition that checks whether the newly created item's content
    type name is Binder. This prevents ordinary library files from starting the folder-copy
    flow.
- question: Why does the SharePoint When a file is created trigger cause unnecessary
    cloud flow runs?
  answer: It runs whenever a file is added to the library. A Binder template with
    more than 50 child folders can therefore generate many unwanted runs.
- question: What does the Copy folder action do in the Binder document-set flow?
  answer: It copies the nested folder structure from a separate template library into
    the newly created Binder. The default document-set content is left empty.
---

## TL;DR

A Power Automate cloud flow uses the SharePoint When a file is created, properties only trigger and a Copy folder action to populate new Binder document sets. Adding a trigger condition for the Binder content type prevents the flow from running for every file added to the library, reducing unnecessary runs and potential billing costs.

{% include curated-attribution.html %}

## Why it matters

- Makers: Add a trigger condition that checks for the Binder content type before copying the template folder structure, so ordinary file uploads do not start the flow.
- Leadership/Business: Watch flow run volume when a document-set template contains many folders, because unrestricted file triggers can create avoidable billing costs.

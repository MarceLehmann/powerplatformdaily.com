---
title: Build model-driven app dialogs with Generative Pages
description: Use navigateTo to open a Generative Page dialog, pass context through
  pageInput, and return selected Dataverse records to the calling form.
date: '2026-10-03T22:36:21Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
- dataverse
content_type: curated_summary
curation_id: 8faccabe216b94e9483c18cd
image:
  path: "/assets/img/curated/8faccabe216b94e9483c18cd.png"
  alt: 'News card: Generative Pages can pass dialog context in and return selected
    Dataverse records.'
permalink: "/en/posts/build-model-driven-app-dialogs-with-generative-pages-8faccabe/"
translation_url: "/de/posts/build-model-driven-app-dialogs-with-generative-pages-8faccabe/"
source_url: https://dianabirkelbach.wordpress.com/2026/10/03/how-to-make-dialogs-with-generative-pages/
source_site_url: https://dianabirkelbach.wordpress.com/
source_title: How To Make Dialogs With Generative Pages
source_name: Dianamics PCF Lady
source_language: en
source_language_name: English
source_author: Diana Birkelbach
source_published_at: '2026-10-03'
source_type: article
---

## TL;DR

Generative Pages in Power Apps model-driven apps can open as dialogs through Xrm.Navigation.navigateTo with pageType generative and target 2. Callers pass entityName, recordId, and custom data; pages can return project and milestone records through result.returnValue. The output and closing pattern described is undocumented, so use it cautiously.

{% include curated-attribution.html %}

## Why it matters

- Makers: Use pageInput data, entityName, and recordId to turn a Generative Page into a contextual picker dialog.
- Makers: Handle result.returnValue to populate Dataverse lookups with returned record IDs, names, and logical table names.
- Admins/IT: Watch the undocumented setPageOutput and navigateBack pattern because its support status or signature may change.

---
title: 'PCF vs Generative Pages: when to use each in Power Apps'
description: Generative Pages simplify dialogs, direct connectors and page-specific
  Dataverse work, while PCFs remain stronger for form lifecycle, grids and offline
  use.
date: '2026-10-20T16:37:13Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
- dataverse
- roadmap
content_type: curated_summary
curation_id: a33597b80f4749f4f543b294
image:
  path: "/assets/img/curated/a33597b80f4749f4f543b294.png"
  alt: 'News card: Generative Pages can serve as app pages, form controls and dialogs
    without a wrapper.'
permalink: "/en/posts/pcf-vs-generative-pages-when-to-use-each-in-power-apps-a33597b8/"
translation_url: "/de/posts/pcf-vs-generative-pages-when-to-use-each-in-power-apps-a33597b8/"
source_url: https://dianabirkelbach.wordpress.com/2026/10/20/pcf-vs-generative-pages/
source_site_url: https://dianabirkelbach.wordpress.com/
source_title: PCF VS GENERATIVE PAGES
source_name: Dianamics PCF Lady
source_language: en
source_language_name: English
source_published_at: '2026-10-20'
source_type: article
faq:
- question: Can a Power Apps Generative Page be opened as a dialog?
  answer: Yes. A Generative Page can open as a dialog through Xrm.Navigation.navigateTo
    and can receive input parameters and return a result.
- question: When should I use a PCF instead of a Generative Page on a model-driven
    form?
  answer: Use a PCF when the control must react to form lifecycle changes, dynamic
    parameters, field events, or command interactions. Generative Pages do not provide
    those capabilities directly.
- question: Do Generative Pages support connectors and offline use in Power Apps?
  answer: Generative Pages can use connectors directly. Offline support is not available
    for Generative Pages, while PCFs support offline use.
---

## TL;DR

Generative Pages can run in a model-driven app sitemap, on a form, or as dialogs that accept input and return values. They can directly use connectors and Dataverse APIs, but lack offline support, dynamic form parameter updates, PCF state, and dataset command integration. PCFs remain preferable for field controls, ribbon-aware grids, and broader npm package needs.

{% include curated-attribution.html %}

## Why it matters

- Makers: Use a Generative Page for a purpose-built sitemap page or dialog when direct connectors and returned dialog values are needed.
- Makers: Choose a PCF for field lifecycle behaviour, dynamic parameter changes, or dataset selections that must work with ribbon commands.
- Makers: Treat Generative Page offline support as unavailable and use a PCF for offline scenarios.
- Admins/IT: Account for Generative Pages as app-linked solution components with source, transpiled code, metadata and prompt artifacts.

---
title: Dynamics 365 Performance Probe measures what users actually experience
description: A browser extension for Edge and Chrome separates usable time from fully
  loaded time, classifies requests, and links likely causes to responsible owners.
date: '2026-10-23T16:53:19Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
- dataverse
content_type: curated_summary
curation_id: ecb607d1ce22a265ac920901
image:
  path: "/assets/img/curated/ecb607d1ce22a265ac920901.png"
  alt: 'News card: A browser probe separates usable time from fully loaded time in
    Dynamics 365.'
permalink: "/en/posts/dynamics-365-performance-probe-measures-what-users-actually-experience-ecb607d1/"
translation_url: "/de/posts/dynamics-365-performance-probe-measures-what-users-actually-experience-ecb607d1/"
source_url: https://www.powerpete.com/dynamics-365-performance-probe-browser-extension/
source_site_url: https://www.powerpete.com/
source_title: Dynamics 365 Performance Probe Browser Extension
source_name: Power Pete
source_language: en
source_language_name: English
source_published_at: '2026-09-02'
source_type: article
faq:
- question: How does Dynamics 365 Performance Probe classify browser requests?
  answer: The extension classifies requests as blocking, post-render, or background.
    Only blocking requests contribute to the performance score.
- question: What does usable time measure in Dynamics 365 Performance Probe?
  answer: Usable time measures when the user can work again. Fully loaded time appears
    separately for context and does not affect the score.
- question: How do I capture a Dynamics 365 model-driven app with Performance Probe?
  answer: Install the unpacked extension, press Start, reload the Dynamics 365 tab,
    work normally for ten minutes, then open and export the report.
animation:
  src: /assets/img/animations/ecb607d1ce22a265ac920901-en.gif
  poster: /assets/img/animations/ecb607d1ce22a265ac920901-en.poster.png
  width: 800
  height: 450
  alt: "The animation shows the Performance Probe workflow: install the extension, press Start, reload the Dynamics 365 tab, work normally for ten minutes, then open and export the report."
---

## TL;DR

The Dynamics 365 Performance Probe browser extension measures model-driven app performance from the user&\#39;s seat. It separates blocking, post-render, and background requests, reports usable time alongside fully loaded time, identifies eleven likely causes, assigns ownership buckets, and creates offline PDF or HTML reports after at least 30 interactions.

{% include curated-attribution.html %}

## Why it matters

- Makers: Install the Edge or Chrome extension, start it before reloading the model-driven app, and capture normal work for ten minutes so measurements include the full boot sequence.
- Admins/IT: Use the request categories and ownership buckets to route slow interactions to custom build, client systems, Microsoft platform, or shared causes instead of treating every delay as one problem.
- Leadership/Business: Read usable time separately from fully loaded time because a screen can be ready before background detail finishes, preventing misleading performance discussions.

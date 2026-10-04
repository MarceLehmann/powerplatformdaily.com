---
title: Build a Power Apps progress bar for multi-screen forms
description: Use two Rectangle controls, a label and a global step variable to show
  completion across a seven-screen Power Apps form.
date: '2026-10-03T19:05:50Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
content_type: curated_summary
curation_id: 86f1c2a743055090701806fa
image:
  path: "/assets/img/curated/86f1c2a743055090701806fa.png"
  alt: 'News card: Build a multi-screen form progress bar with three controls and
    one variable.'
permalink: "/en/posts/build-a-power-apps-progress-bar-for-multi-screen-forms-86f1c2a7/"
translation_url: "/de/posts/build-a-power-apps-progress-bar-for-multi-screen-forms-86f1c2a7/"
source_url: https://365-anouck.be/building-a-simple-progress-bar-for-a-multi-screen-power-apps-form/
source_site_url: https://365-anouck.be/
source_title: Building a Simple Progress Bar for a Multi-Screen Power Apps Form
source_name: 365-ANOUCK
source_language: en
source_language_name: English
source_author: Anouck
source_published_at: '2026-07-01'
source_type: article
faq:
  - question: "What three controls make up a Power Apps progress bar for multi-screen forms?"
    answer: "A recTrack rectangle, a recFill rectangle and a text label. recFill's width is recTrack's width multiplied by the current step divided by total steps."
  - question: "How does each screen update the progress bar in this Power Apps form?"
    answer: "Each screen sets a global step variable in its OnVisible property, which the fill rectangle then uses to recalculate its width."
  - question: "How can a progress bar stay accessible instead of relying on colour alone?"
    answer: "Keep a visible text step label alongside the bar and add an AccessibleLabel, so progress is communicated beyond colour."
---

## TL;DR

A Power Apps Canvas form can show progress with a recTrack rectangle, a recFill rectangle and a text label. Each screen sets gblStep in OnVisible, while recFill.Width uses recTrack.Width multiplied by gblStep divided by gblTotalSteps. A component, responsive layout and AccessibleLabel improve reuse and accessibility.

{% include curated-attribution.html %}

## Why it matters

- Makers: Set gblStep in every screen&\#39;s OnVisible property and calculate the fill width from gblStep and gblTotalSteps.
- Makers: Replace hard-coded totals with gblTotalSteps and consider a Canvas component to update the bar design in one place.
- Makers: Keep a text step label and add an AccessibleLabel so progress is not communicated by colour alone.

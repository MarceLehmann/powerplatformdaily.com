---
title: Designing Power Apps for colour blindness
description: Use icons, text labels, accessible error messages, contrast checks and
  grayscale testing so Power Apps do not rely on colour alone.
date: '2026-10-22T16:51:30Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
content_type: curated_summary
curation_id: cc29602e8c6f0f9f0df51a23
image:
  path: "/assets/img/curated/cc29602e8c6f0f9f0df51a23.png"
  alt: 'News card: Power Apps should never use colour as the only signal of meaning.'
permalink: "/en/posts/designing-power-apps-for-colour-blindness-cc29602e/"
translation_url: "/de/posts/designing-power-apps-for-colour-blindness-cc29602e/"
source_url: https://paulienbuskens.com/2026/02/07/designing-for-color-blindness-in-power-apps/
source_site_url: https://paulienbuskens.com/
source_title: Designing for Color Blindness in Power Apps
source_name: Pauliens Blog
source_language: en
source_language_name: English
source_author: Paulien Buskens
source_published_at: '2026-02-07'
source_type: article
faq:
- question: How can Power Apps status indicators work for colour-blind users?
  answer: Pair every status colour with an icon or text label. Approved, rejected
    and pending states can use distinct icons alongside supportive colour.
- question: What should a Power Apps validation error include besides a red border?
  answer: Include a clear error message and an AccessibleLabel for screen readers.
    Red text or a red border alone does not communicate the problem reliably.
- question: How do I test whether a Power Apps dashboard relies too much on colour?
  answer: View the app in grayscale or use a browser simulator. Add direct data labels,
    trend icons or a small table when chart meaning disappears.
---

## TL;DR

Power Apps makers can make status, validation and dashboard signals clearer by pairing colour with icons or text, adding AccessibleLabel values to errors, using data labels and testing screens in grayscale. The guidance also recommends at least 4.5:1 contrast for body text and testing high-contrast themes.

{% include curated-attribution.html %}

## Why it matters

- Makers: Pair approval, rejection and pending colours with icons or text so gallery and button states remain understandable.
- Makers: Add clear error messages and AccessibleLabel values instead of relying on a red border or red text.
- BI/Data teams: Add labels, trend icons or a small data table to red and green dashboard comparisons.
- Makers: Test screens in grayscale and with high-contrast themes to reveal signals that disappear.

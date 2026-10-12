---
title: 'Power Apps gallery controls: how OnSelect determines click behavior'
description: A clickable control inside a Power Apps gallery can run its own OnSelect
  formula instead of the gallery formula. Select(Parent) passes the click to the gallery.
date: '2026-10-12T16:57:19Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
content_type: curated_summary
curation_id: e67062f1b57712b6c888e89e
image:
  path: "/assets/img/curated/e67062f1b57712b6c888e89e.png"
  alt: 'News card: Clickable controls in Power Apps galleries can override the gallery
    OnSelect formula.'
permalink: "/en/posts/power-apps-gallery-controls-how-onselect-determines-click-behavior-e67062f1/"
translation_url: "/de/posts/power-apps-gallery-controls-how-onselect-determines-click-behavior-e67062f1/"
source_url: https://thepoweraddict.com/onselect-how-to-use-for-a-clickable-control-in-a-gallery/?utm_source=rss&utm_medium=rss&utm_campaign=onselect-how-to-use-for-a-clickable-control-in-a-gallery
source_site_url: https://thepoweraddict.com/
source_title: OnSelect – How to Use for a Clickable Control in a Gallery
source_name: The Power Addict
source_language: en
source_language_name: English
source_author: Hardit Bhatia
source_published_at: '2026-03-27'
source_updated_at: '2026-03-27'
source_type: article
faq:
- question: How does OnSelect work for a button inside a Power Apps gallery?
  answer: A button inside a gallery runs its own OnSelect formula when one is configured.
    That formula takes precedence over the gallery's OnSelect when clicked.
- question: What does Select(Parent) do on a clickable control in a Power Apps gallery?
  answer: Select(Parent) makes the control click behave like selecting the gallery.
    This lets the gallery's OnSelect define the resulting action.
- question: Why do changes to a Power Apps gallery OnSelect sometimes have no effect?
  answer: Changes have no effect when the clicked control contains its own different
    OnSelect formula. The control formula runs instead of the gallery formula.
---

## TL;DR

In Power Apps galleries, a clickable control such as a button uses its own OnSelect formula when configured. Setting OnSelect to Select(Parent) makes the click behave like selecting the gallery, while a different formula takes precedence and can make gallery changes appear ineffective.

{% include curated-attribution.html %}

## Why it matters

- Makers: Set a clickable control inside a gallery to Select(Parent) when it should follow the gallery behavior, and inspect the control&\#39;s own OnSelect before changing the gallery formula.
- Makers: Use the control-specific OnSelect when the button needs distinct behavior, because its formula takes precedence when that control is clicked and determines the resulting action.

---
title: Patch Power Apps images and signatures to D365 F&SCM
description: Use camera or add picture controls in a canvas app, convert images to
  base64, and patch them to D365 F&SCM attachments.
date: '2026-10-12T16:57:22Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
- connectors
content_type: curated_summary
curation_id: 2bcbcaae86f030e22c6ba031
image:
  path: "/assets/img/curated/2bcbcaae86f030e22c6ba031.png"
  alt: 'News card: Power Apps can upload camera photos and signatures to D365 F&SCM
    attachments.'
permalink: "/en/posts/patch-power-apps-images-and-signatures-to-d365-f-scm-2bcbcaae/"
translation_url: "/de/posts/patch-power-apps-images-and-signatures-to-d365-f-scm-2bcbcaae/"
source_url: https://thepoweraddict.com/how-to-patch-images-from-power-apps-to-d365-fscm/?utm_source=rss&utm_medium=rss&utm_campaign=how-to-patch-images-from-power-apps-to-d365-fscm
source_site_url: https://thepoweraddict.com/
source_title: How to Patch Images from Power Apps to D365 F&SCM
source_name: The Power Addict
source_language: en
source_language_name: English
source_author: Hardit Bhatia
source_published_at: '2026-03-30'
source_updated_at: '2026-03-31'
source_type: article
faq:
- question: How do I patch camera images from Power Apps to D365 F&SCM?
  answer: Collect the camera stream in a collection, then use ForAll and Patch to
    create sales order attachment records in D365 F&SCM.
- question: What value goes into the Archive file field for D365 F&SCM images?
  answer: The Archive file field receives the base64 image content extracted from
    JSON output created with JSONFormat.IncludeBinaryData.
- question: Does the Power Apps add picture control require different upload code
    for D365 F&SCM?
  answer: Only the Capture formula changes, using the image control inside the add
    picture control. The Upload formula remains the same.
---

## TL;DR

A canvas app can collect camera photos or add picture images, convert each image to base64 with JSON and patch the data to the D365 F&amp;SCM sales order attachments table. A signature is patched separately using the same Archive file approach, while the add picture control changes only the Capture formula.

{% include curated-attribution.html %}

## Why it matters

- Makers: Store each captured image with a unique ID, the selected sales order, and its image value, then use ForAll and Patch to create D365 F&amp;SCM attachments.
- Makers: Use JSON with IncludeBinaryData and extract the base64 payload for the Archive file field, because that field carries the image data.
- Admins/IT: Set up the canvas app connection to the D365 F&amp;SCM virtual entity and attachment table, since the pattern relies on those data sources.

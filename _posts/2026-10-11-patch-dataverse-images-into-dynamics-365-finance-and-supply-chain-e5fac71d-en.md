---
title: Patch Dataverse images into Dynamics 365 Finance and Supply Chain
description: A Canvas app can use Power Fx to send Dataverse images, photos and signatures
  to Dynamics 365 Finance and Supply Chain attachments.
date: '2026-10-11T16:55:41Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
- dataverse
- connectors
content_type: curated_summary
curation_id: e5fac71ddd201e4dbe19d335
image:
  path: "/assets/img/curated/e5fac71ddd201e4dbe19d335.png"
  alt: 'News card: Canvas apps can patch Dataverse images into Dynamics 365 Finance
    and Supply Chain attachments.'
permalink: "/en/posts/patch-dataverse-images-into-dynamics-365-finance-and-supply-chain-e5fac71d/"
translation_url: "/de/posts/patch-dataverse-images-into-dynamics-365-finance-and-supply-chain-e5fac71d/"
source_url: https://thepoweraddict.com/how-to-patch-images-from-dataverse-to-d365-fsc/?utm_source=rss&utm_medium=rss&utm_campaign=how-to-patch-images-from-dataverse-to-d365-fsc
source_site_url: https://thepoweraddict.com/
source_title: How to patch images from Dataverse to D365 F&SC
source_name: The Power Addict
source_language: en
source_language_name: English
source_author: Hardit Bhatia
source_published_at: '2026-03-31'
source_updated_at: '2026-03-31'
source_type: article
faq:
- question: How does a Canvas app convert a Dataverse image for a D365 F&SC attachment?
  answer: The formula serializes the image with JSON and IncludeBinaryData, then extracts
    the base64 content assigned to the Archive file field.
- question: Which D365 F&SC table receives images patched from Dataverse?
  answer: The images are patched into the Sales order header document attachments
    V2 table, using Defaults and Patch for each attachment record.
- question: How are customer signatures added alongside Dataverse photos in D365 F&SC?
  answer: A separate Patch uses penSignature.Image and writes it to the same attachments
    table with a file name, PNG type, description and Archive file value.
---

## TL;DR

Power Apps can use ForAll and Patch to send Dataverse image records to the D365 Finance and Supply Chain sales order header document attachments table. JSON with IncludeBinaryData converts each image or signature into base64 content for the Archive file value, while file names, types and descriptions are supplied in the same formula.

{% include curated-attribution.html %}

## Why it matters

- Makers: Use ForAll and Patch to process related Dataverse image records and create attachments against the selected D365 Finance and Supply Chain sales order.
- Makers: Convert each image with JSON and JSONFormat.IncludeBinaryData, then extract the base64 content for Archive file so D365 can store the attachment.
- Makers: Patch penSignature.Image separately when a customer signature must accompany delivery photos, using the same attachment table and metadata pattern.

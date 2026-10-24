---
title: Build AI-powered invoice document automation in Power Automate
description: Extract invoice data from Outlook PDF attachments with AI Builder, route
  it for approval, store it in SharePoint and generate a Word document.
date: '2026-10-24T16:55:27Z'
author: news_editorial
lang: en
toc: false
tags:
- power-automate
- ai-builder
- connectors
content_type: curated_summary
curation_id: da6b9fec2b239a6168693a0a
image:
  path: "/assets/img/curated/da6b9fec2b239a6168693a0a.png"
  alt: 'News card: Power Automate can extract invoice data and create a Word document
    from an Outlook attachment.'
permalink: "/en/posts/build-ai-powered-invoice-document-automation-in-power-automate-da6b9fec/"
translation_url: "/de/posts/build-ai-powered-invoice-document-automation-in-power-automate-da6b9fec/"
source_url: https://penbotrpa.com/2026/03/13/ai-powered-document-automation-with-power-automate/
source_site_url: https://penbotrpa.com/
source_title: AI-POWERED DOCUMENT AUTOMATION WITH POWER AUTOMATE
source_name: PenBot_RPA
source_language: en
source_language_name: English
source_author: penbot_rpa
source_published_at: '2026-03-13'
source_type: article
faq:
- question: How does the AI Builder prompt extract invoice fields from an Outlook
    PDF attachment?
  answer: The Run a prompt action receives the attachment file content and requests
    document number, date, discount, total, and item details as JSON.
- question: Which SharePoint lists are needed for this Power Automate invoice workflow?
  answer: The workflow uses separate header-level and item-level lists. Both lists
    include a status choice that moves from New to Done.
- question: How does Populate a Microsoft Word template add invoice line items?
  answer: The second flow gets SharePoint item records by document number and passes
    Select output into the Word template's repeating myTable field.
animation:
  src: /assets/img/animations/da6b9fec2b239a6168693a0a-en.gif
  poster: /assets/img/animations/da6b9fec2b239a6168693a0a-en.poster.png
  width: 800
  height: 450
  alt: "Sequence shows Outlook PDF attachments saved to OneDrive, invoice data extracted with AI Builder, approval requested, data stored in SharePoint, and a Word document generated with email confirmation."
---

## TL;DR

A two-flow Power Automate pattern saves Outlook PDF attachments to OneDrive, uses an AI Builder prompt to extract invoice fields and line items, requests approval, stores header and item data in SharePoint, then populates a Word template and emails confirmation.

{% include curated-attribution.html %}

## Why it matters

- Makers: Build separate extraction and document-generation flows to turn approved Outlook invoice attachments into Word files.
- Makers: Configure Word content controls and a repeating myTable section so SharePoint item rows populate the document output.
- Admins/IT: Review OneDrive sharing settings because the flow creates view links for source files and organization edit links for generated documents.

---
title: Extract Grab e-receipts from Outlook with Power Automate Desktop
description: Build a Power Automate Desktop flow that retrieves Grab e-receipts from
  Outlook, extracts key details, exports them to Excel, and emails the report.
date: '2026-10-24T16:55:25Z'
author: news_editorial
lang: en
toc: false
tags:
- power-automate
content_type: curated_summary
curation_id: 3f5be9ed0558a8ba17fc5fa3
image:
  path: "/assets/img/curated/3f5be9ed0558a8ba17fc5fa3.png"
  alt: 'News card: Power Automate Desktop extracts Grab e-receipt data from Outlook.'
permalink: "/en/posts/extract-grab-e-receipts-from-outlook-with-power-automate-desktop-3f5be9ed/"
translation_url: "/de/posts/extract-grab-e-receipts-from-outlook-with-power-automate-desktop-3f5be9ed/"
source_url: https://penbotrpa.com/2026/03/10/automating-grab-e-receipt-extraction-using-power-automate-desktop/
source_site_url: https://penbotrpa.com/
source_title: AUTOMATING GRAB E-RECEIPT EXTRACTION USING POWER AUTOMATE DESKTOP
source_name: PenBot_RPA
source_language: en
source_language_name: English
source_author: penbot_rpa
source_published_at: '2026-03-10'
source_type: article
faq:
- question: How can Power Automate Desktop retrieve Grab e-receipts from Outlook?
  answer: Use the Outlook retrieval step and set the Account field to the email account
    connected to Grab. The workflow then processes the retrieved receipt emails.
- question: Which Grab e-receipt details can Power Automate Desktop extract?
  answer: The flow extracts the price, date and time, and shop name. It stores these
    values in lists before organizing them into a data table.
- question: How does Power Automate Desktop send the Grab receipt report?
  answer: The flow exports the organized data to an Excel file and sends the report
    by email. Outlook desktop and Microsoft Excel are prerequisites.
---

## TL;DR

Power Automate Desktop can retrieve Grab e-receipts from an Outlook inbox, extract the price, date and time, and shop name, place the results in a data table, export them to Excel, and email the finished report. The workflow requires Outlook desktop, Power Automate Desktop, and Microsoft Excel.

{% include curated-attribution.html %}

## Why it matters

- Makers: Configure the Outlook account, create lists, extract receipt values, and convert the results into a data table before exporting to Excel and emailing the report.
- Admins/IT: Ensure Outlook desktop, Power Automate Desktop, and Microsoft Excel are available, because all three are listed as prerequisites for this receipt-processing workflow.

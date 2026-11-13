---
title: Report and disable SharePoint Copilot Credit sharing (UBB) with PowerShell
description: A PnP PowerShell script reads each SharePoint site's Usage-Based Billing
  status via the SP.UBB endpoints and can turn off Copilot Credit sharing, logging
  results to a CSV report.
date: '2026-11-13T19:23:43Z'
author: news_editorial
lang: en
toc: false
tags:
- licensing
content_type: curated_summary
curation_id: 165891330c04af764e3f9c0d
image:
  path: "/assets/img/curated/165891330c04af764e3f9c0d.png"
  alt: 'News card: SharePoint sites can share Copilot Credits for AI features, and
    one PowerShell script reports that setting and can switch it off.'
permalink: "/en/posts/report-and-disable-sharepoint-copilot-credit-sharing-ubb-with-16589133/"
translation_url: "/de/posts/report-and-disable-sharepoint-copilot-credit-sharing-ubb-with-16589133/"
source_url: https://reshmeeauckloo.com/posts/sharepoint-powershell-ubb/
source_site_url: https://reshmeeauckloo.com/
source_title: Manage SharePoint Usage-Based Billing (UBB) with PowerShell
source_name: reshmeeauckloo.com
source_language: en
source_language_name: English
source_author: Reshmee Auckloo
source_published_at: '2026-11-13'
source_type: article
faq:
- question: How can I check which SharePoint sites have Usage-Based Billing for Copilot
    Credits enabled?
  answer: Connect to your SharePoint admin center with PnP PowerShell, call the SP.UBB.GetUBB
    endpoint per site, and export IsUBB, EnabledDate and credit status to CSV.
- question: Can PowerShell turn off Share Copilot Credits on a SharePoint site?
  answer: Yes, the source's script posts to SP.UBB.SetUBB(isUBB=false) per site; it
    only disables sharing, enabling UBB still requires the SharePoint settings experience.
- question: Which AI features in SharePoint consume shared Copilot Credits under UBB?
  answer: Per the source, supported AI features include advanced autofill and faster
    document processing, and autofill falls back to standard processing when credits
    are unavailable.
---

## TL;DR

Per the source of 2026-11-13, SharePoint Usage-Based Billing lets a site use shared Copilot Credits for AI features such as advanced autofill and faster document processing, with fallback to standard processing when credits run out. A PnP PowerShell script reports each site&\#39;s UBB status and can disable sharing, writing a CSV report.

## Why it matters

- Admins/IT: Run the script against your SharePoint admin center with PnP PowerShell to report UBB status for group-connected team sites and standard channel sites, then review warnings because sites that could not be read or updated are left out of the CSV.
- Admins/IT: The source calls the SP.UBB REST endpoints SharePoint service endpoints, so confirm their availability and behavior in your tenant before using them in automation.
- Makers: The script reports and can disable credit sharing but cannot enable it; site owners and admins must use the SharePoint settings experience to turn on Share Copilot Credits with this site.

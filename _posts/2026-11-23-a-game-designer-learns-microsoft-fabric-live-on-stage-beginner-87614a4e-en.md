---
title: 'A game designer learns Microsoft Fabric live on stage: beginner questions,
  capacity basics, when Fabric fits'
description: 'Per the 19 October 2026 recap: a Fabric beginner learned Microsoft Fabric
  live on stage at Nordic Summit 2026, from OneLake and tenant-to-item nesting to
  F2 capacity sizing and fit.'
date: '2026-11-23T01:40:32Z'
author: news_editorial
lang: en
toc: false
tags:
- fabric
- power-bi
- licensing
content_type: curated_summary
curation_id: 87614a4efcad2899778f9eba
image:
  path: "/assets/img/curated/87614a4efcad2899778f9eba.png"
  alt: 'News card: A game designer learned Microsoft Fabric live on stage, and every
    step she deleted came straight back.'
permalink: "/en/posts/a-game-designer-learns-microsoft-fabric-live-on-stage-beginner-87614a4e/"
translation_url: "/de/posts/a-game-designer-learns-microsoft-fabric-live-on-stage-beginner-87614a4e/"
source_url: https://www.karlex.fi/a-game-designer-learns-fabric-on-stage-and-asks-the-questions-nobody-asks/
source_site_url: https://www.karlex.fi/
source_title: A game designer learns Fabric on stage, and asks the questions nobody
  asks
source_name: Karlex
source_language: en
source_language_name: English
source_author: Karl-Johan Spiik
source_published_at: '2026-10-19'
source_type: article
faq:
- question: What is the difference between a lakehouse and a warehouse in Microsoft
    Fabric?
  answer: A lakehouse holds diverse content that you work with in Python or Spark,
    while a warehouse adds strict schema enforcement for reporting, and Fabric includes
    both.
- question: How much of an F8 Microsoft Fabric capacity does 500 GB per day of Dataflow
    Gen2 ingestion use?
  answer: According to the session's worked example, 500 GB a day is roughly 50,000
    capacity-unit seconds, about 7 percent of what an F8 provides over 24 hours.
- question: When is Microsoft Fabric the wrong tool according to this session?
  answer: The session's fit table names small use cases that Excel or Power BI already
    covers, multi-cloud strategies, legacy constraints and teams without Microsoft
    skills.
---

## TL;DR

Nordic Summit 2026 ran an unusual Fabric format: a daily practitioner taught a Fabric beginner live. The session built a minimal mental model of Fabric as Microsoft&\#39;s SaaS platform for data and AI, with OneLake as central storage, tenant to capacities to workspaces to items nesting, capacity units from F2 upward and pausable, plus a fit check for when Fabric pays off.

## Why it matters

- Makers: start Fabric projects on the smallest capacity, and treat the applied steps list in a dataflow as an undo log, because even steps deleted live in the demo came straight back.
- BI/Data teams: use the fit check before proposing Fabric, since one analyst merging CSVs in Python all day was judged a no, while multi-role, multi-source reporting was a clear yes.
- Leadership/Business: capacity is compute measured in units that double per tier from F2, billed pay as you go and pausable or as an annual reservation, so begin small and scale when load demands.
- Admins/IT: learn the nesting model early, because a tenant holds capacities, workspaces hold items, and data moves between workspaces but not across separate capacities.

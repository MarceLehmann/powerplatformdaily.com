---
title: 'Copilot Studio agents that know their limits: authority, evidence, enforcement'
description: Copilot Studio agents that change business records need delegated authority,
  verified evidence and enforcement at the point of action, as shown in a fictional
  refund design example.
date: '2026-11-14T13:24:57Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
content_type: curated_summary
curation_id: dd8b92314f5be61382184acf
image:
  path: "/assets/img/curated/dd8b92314f5be61382184acf.png"
  alt: 'News card: Design Copilot Studio agents around authority, evidence and enforcement
    before they touch business records.'
permalink: "/en/posts/copilot-studio-agents-that-know-their-limits-authority-evidence-dd8b9231/"
translation_url: "/de/posts/copilot-studio-agents-that-know-their-limits-authority-evidence-dd8b9231/"
source_url: https://www.divyaakula.com/copilotstudio/2026/11/14/agents-that-know-their-limits.html
source_site_url: https://www.divyaakula.com/
source_title: Agents That Know Their Limits
source_name: Divya Akula blog
source_language: en
source_language_name: English
source_author: Divya Akula
source_published_at: '2026-11-14'
source_type: article
faq:
- question: How much can a Copilot Studio refund agent approve on its own?
  answer: The design uses an explicit delegated cap, an illustrative $100 per order;
    an eligible $80 refund proceeds while an eligible $800 refund is routed for review.
- question: What should an agent do when the purchase date is missing for a refund?
  answer: It returns an ASK outcome, telling the user the date must be verified before
    the 30-day policy condition can be checked.
- question: What did the Copilot Studio and Azure AI Foundry refund demo actually
    test?
  answer: 'Two separate routes: a Foundry analyst with advisory-only analysis and
    a deterministic flow using fictional fixtures; no combined end-to-end execution
    path was verified.'
animation:
  video: /assets/img/animations/dd8b92314f5be61382184acf-en.mp4
  poster: /assets/img/animations/dd8b92314f5be61382184acf-en.poster.webp
  width: 800
  height: 450
  alt: "Three steps show the refund agent design: set delegated authority, evaluate evidence into PROCEED ASK or REVIEW, then enforce checks in the service that performs the write."
---

## TL;DR

Divya Akula&\#39;s 2026-11-14 post designs a Copilot Studio refund agent around three questions: what the agent may do (an illustrative $100 autonomous limit per order), whether the evidence suffices (PROCEED, ASK, REVIEW outcomes), and where enforcement lives (checks at the API or service that performs the write). The demo used separate tested routes; no end-to-end execution path was verified.

## Why it matters

- Makers: Write down objective, investigation sources, action scope, intervention points and accountability before choosing tools, and put the blocking check in the service that performs the write rather than only in agent instructions.
- Admins/IT: Reflect the division of responsibilities in permissions, so a read-only analyst agent holds no execution tool and no broadly privileged shared credential undermines the design.
- Leadership/Business: Treat escalations above delegated limits as the system working correctly and back a real human review workflow with verified approvals rather than relying on model instructions.

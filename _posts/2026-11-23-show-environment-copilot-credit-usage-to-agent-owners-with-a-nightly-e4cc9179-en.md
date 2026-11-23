---
title: Show environment Copilot Credit usage to agent owners with a nightly Power
  Automate flow
description: Per the source of 2026-10-20, a self-built view shows agent owners monthly
  Copilot Credit use per environment against its cap, collected nightly via the licensing
  API.
date: '2026-11-23T01:40:32Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- power-automate
- licensing
- connectors
content_type: curated_summary
curation_id: e4cc917964a691a5f9098845
image:
  path: "/assets/img/curated/e4cc917964a691a5f9098845.png"
  alt: 'News card: Copilot Credit visibility belongs with agent owners, not just admins.
    A nightly Power Automate flow shows each maker the environment pool.'
permalink: "/en/posts/show-environment-copilot-credit-usage-to-agent-owners-with-a-nightly-e4cc9179/"
translation_url: "/de/posts/show-environment-copilot-credit-usage-to-agent-owners-with-a-nightly-e4cc9179/"
source_url: https://www.karlex.fi/copilotcreditusage/
source_site_url: https://www.karlex.fi/
source_title: Agent owners should follow environment Copilot Credit usage – not the
  admins
source_name: Karlex
source_language: en
source_language_name: English
source_author: Karl-Johan Spiik
source_published_at: '2026-10-20'
source_type: article
faq:
- question: Where does Copilot Studio show an agent owner the credit consumption of
    other agents?
  answer: The Monitor page shows only your own agent's use, so the source's tool reads
    the environment entitlement and thresholds nightly and shows consumption against
    the environment cap.
- question: Which API returns month-to-date billed credits per Copilot Studio agent?
  answer: Get All Resource Thresholds, the same data the admin center's Manage Agents
    page uses; the per-agent Entitlement Insight call returned 403 in the author's
    tests.
- question: Does pay-as-you-go billing work for developer environments in Power Platform?
  answer: According to the source, pay-as-you-go works only for production and sandbox
    environments, not developer ones.
---

## TL;DR

According to the source of 2026-10-20, Copilot Studio shows agent owners only their own agent&\#39;s credits, while environment allocation and per-agent consumption sit in the admin center. A nightly Power Automate flow reads each environment&\#39;s MCSMessages entitlement and the resource thresholds, stores rows in a SharePoint list and shows makers their environment&\#39;s credits against its cap; the Entra-group based version is still being built.

## Why it matters

- Makers: Check the Monitor page for your own agent, but also ask how the environment&\#39;s shared pool is allocated, since most agents have no individual monthly limit.
- Admins/IT: Expose environment credit data through the licensing API and resource thresholds instead of answering each shortfall, and grant maker rights only through Entra groups so the view works.
- Leadership/Business: Visibility acts as a light control, and a busy shared environment can prompt a critical project to move to its own environment.

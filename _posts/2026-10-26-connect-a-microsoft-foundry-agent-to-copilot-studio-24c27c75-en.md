---
title: Connect a Microsoft Foundry agent to Copilot Studio
description: Add an existing Microsoft Foundry agent to Copilot Studio as an external
  agent using the project endpoint and agent ID.
date: '2026-10-26T16:59:06Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- connectors
content_type: curated_summary
curation_id: 24c27c756940b7b47754c0fd
image:
  path: "/assets/img/curated/24c27c756940b7b47754c0fd.png"
  alt: 'News card: Copilot Studio can connect to Microsoft Foundry agents as external
    agents.'
permalink: "/en/posts/connect-a-microsoft-foundry-agent-to-copilot-studio-24c27c75/"
translation_url: "/de/posts/connect-a-microsoft-foundry-agent-to-copilot-studio-24c27c75/"
source_url: https://reshmeeauckloo.com/posts/copilotstudio-connect-foundry/
source_site_url: https://reshmeeauckloo.com/
source_title: Connect a Microsoft Foundry agent to Copilot Studio
source_name: reshmeeauckloo.com
source_language: en
source_language_name: English
source_published_at: '2026-09-07'
source_type: article
faq:
- question: What endpoint format does a Copilot Studio Foundry connection use?
  answer: The connection uses the Microsoft Foundry project endpoint, including the
    resource name and project name in the services.ai.azure.com address.
- question: Why must the Microsoft Foundry project endpoint end with a slash in Copilot
    Studio?
  answer: The endpoint needs a trailing slash after it is pasted into the connection
    dialog. Without it, the connection can produce a 400 error or other errors.
- question: Which Microsoft Foundry agent detail must be entered in Copilot Studio?
  answer: Copilot Studio requires the target agent ID from Microsoft Foundry, along
    with the project endpoint, before the external agent can be saved and tested.
---

## TL;DR

Copilot Studio can add a Microsoft Foundry agent as an external agent by using the Foundry project endpoint, a trailing slash, and the target agent ID, then testing the connection. The source also lists an existing Foundry project and agent as prerequisites.

{% include curated-attribution.html %}

## Why it matters

- Makers: Prepare the Foundry project endpoint and agent ID, add Microsoft Foundry as the external agent type, and test invocation in Copilot Studio.
- Admins/IT: Verify access to the Foundry agent and append a trailing slash to the project endpoint, because omitting it can cause a 400 error or other errors.

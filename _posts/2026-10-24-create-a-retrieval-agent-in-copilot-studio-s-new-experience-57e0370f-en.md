---
title: Create a retrieval agent in Copilot Studio's new experience
description: Create, ground, test and publish a Copilot Studio retrieval agent, then
  add an Outlook email action.
date: '2026-10-24T16:55:28Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- connectors
- dataverse
content_type: curated_summary
curation_id: 57e0370f54cf7a06759231dc
image:
  path: "/assets/img/curated/57e0370f54cf7a06759231dc.png"
  alt: 'News card: Build a retrieval agent with knowledge sources and an email action.'
permalink: "/en/posts/create-a-retrieval-agent-in-copilot-studio-s-new-experience-57e0370f/"
translation_url: "/de/posts/create-a-retrieval-agent-in-copilot-studio-s-new-experience-57e0370f/"
source_url: https://penbotrpa.com/2026/08/31/retrieval-agent-copilot-studio-new-experience/
source_site_url: https://penbotrpa.com/
source_title: RETRIEVAL AGENT – COPILOT STUDIO (NEW EXPERIENCE)
source_name: PenBot_RPA
source_language: en
source_language_name: English
source_author: penbot_rpa
source_published_at: '2026-08-31'
source_type: article
faq:
- question: How do I create a retrieval agent in the Copilot Studio new experience?
  answer: Create a new agent in the new experience, then provide its name, image and
    instructions. Add knowledge, select a model and test the agent.
- question: Which knowledge sources can a Copilot Studio retrieval agent use?
  answer: The agent can use public websites, files, SharePoint, Dataverse and Azure
    AI Search. Public website URLs cannot end in a file extension or go beyond two
    path levels.
- question: How can a Copilot Studio agent send an answer by Outlook email?
  answer: Add the Office 365 Outlook Send an email (V2) tool and authenticate its
    connector if needed. In Preview, allow permission and submit a request that asks
    the agent to email its answer.
---

## TL;DR

Copilot Studio&\#39;s new experience can create a retrieval agent with instructions, a selected model and knowledge from public websites, files, SharePoint, Dataverse or Azure AI Search. The agent can be published and extended with the Office 365 Outlook Send an email (V2) tool after connector authentication and permission approval.

{% include curated-attribution.html %}

## Why it matters

- Makers: Add clear instructions and suitable knowledge sources so the agent can answer from configured material rather than unsupported assumptions.
- Makers: Test the selected model in Preview before publishing, then verify the Outlook email action by approving permission and checking the inbox.
- Admins/IT: Ensure the Office 365 Outlook connector is authenticated before makers add the Send an email (V2) tool.

---
title: Build a SharePoint-grounded Copilot Studio agent for Teams
description: Create a focused Copilot Studio agent with selected SharePoint sources,
  explicit fallback rules, and a Teams publishing path.
date: '2026-10-04T16:57:00Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
content_type: curated_summary
curation_id: d059a86e54dd6040463cb19a
image:
  path: "/assets/img/curated/d059a86e54dd6040463cb19a.png"
  alt: 'News card: Build a SharePoint-grounded agent that answers only from the sites
    you choose.'
permalink: "/en/posts/build-a-sharepoint-grounded-copilot-studio-agent-for-teams-d059a86e/"
translation_url: "/de/posts/build-a-sharepoint-grounded-copilot-studio-agent-for-teams-d059a86e/"
source_url: https://365-anouck.be/how-to-build-a-custom-copilot-agent-for-your-sharepoint-intranet/
source_site_url: https://365-anouck.be/
source_title: How to Build a Custom Copilot Agent for Your SharePoint Intranet
source_name: 365-ANOUCK
source_language: en
source_language_name: English
source_author: Anouck
source_published_at: '2026-05-06'
source_type: article
faq:
- question: How do I limit a Copilot Studio intranet agent to HR SharePoint content?
  answer: Add only the relevant SharePoint sites or document libraries as knowledge
    sources. Use agent instructions to restrict answers to HR topics and redirect
    unrelated questions.
- question: Do SharePoint permissions still apply to a Copilot Studio agent?
  answer: Yes, users receive answers only from SharePoint content they already have
    permission to access. The agent inherits those access boundaries.
- question: Where can I publish a SharePoint-grounded Copilot Studio agent for employees?
  answer: Publish the tested agent to Microsoft Teams. It can be pinned to a relevant
    team or channel and added as a Viva Connections dashboard card.
---

## TL;DR

Copilot Studio can create a custom intranet agent grounded in selected SharePoint sites or document libraries. Configure a specific name, instructions and fallback behaviour, then publish the tested agent to Teams and optionally surface it through a Viva Connections dashboard card.

{% include curated-attribution.html %}

## Why it matters

- Makers: Restrict knowledge to the relevant SharePoint sites or libraries, then add instructions for scope, source links, language and unanswered questions.
- Makers: Test the agent before publishing it to Teams, and pin it where employees already work, such as the relevant team or channel.
- Admins/IT: Remember that SharePoint permissions continue to apply, avoid shared OneDrive as grounding, and communicate that content refresh is not instant.

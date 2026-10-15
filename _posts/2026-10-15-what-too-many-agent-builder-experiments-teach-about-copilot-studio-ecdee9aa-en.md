---
title: What too many Agent Builder experiments teach about Copilot Studio
description: Agent Builder experiments reveal practical lessons about grounding, instructions,
  skills, lifecycle and when to move a use case into a larger tool.
date: '2026-10-15T17:01:19Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- power-automate
- licensing
content_type: curated_summary
curation_id: ecdee9aa3975f30a023eae1a
image:
  path: "/assets/img/curated/ecdee9aa3975f30a023eae1a.png"
  alt: 'News card: Agent Builder experiments teach reusable lessons about grounding,
    instructions, roles and agent lifecycle.'
permalink: "/en/posts/what-too-many-agent-builder-experiments-teach-about-copilot-studio-ecdee9aa/"
translation_url: "/de/posts/what-too-many-agent-builder-experiments-teach-about-copilot-studio-ecdee9aa/"
source_url: https://www.karlex.fi/the-first-experiment-is-cheap-what-building-too-many-agent-builder-agents-teaches-you/
source_site_url: https://www.karlex.fi/
source_title: 'The first experiment is cheap: what building too many Agent Builder
  agents teaches you'
source_name: Karlex
source_language: en
source_language_name: English
source_author: Karl-Johan Spiik
source_published_at: '2026-09-27'
source_type: article
faq:
- question: How does Agent Builder use SharePoint pages linked from a knowledge source?
  answer: Agent Builder does not automatically understand pages linked from a grounded
    SharePoint page. Each relevant knowledge source must be considered separately.
- question: What is the status of custom skills in Agent Builder?
  answer: Custom skills are in preview and may appear differently depending on whether
    Copilot is opened through Teams or the app.
- question: How can Power Automate track unused Agent Builder agents?
  answer: The described pattern uses Graph API detection, a SharePoint list, Power
    Automate and Teams adaptive cards to contact owners after 60 days of inactivity.
---

## TL;DR

Agent Builder experiments show that strong knowledge sources matter more than clever instructions, linked SharePoint pages are not automatically included, custom skills remain in preview, and an 8,000 character instruction limit makes many roles messy. Power Automate, Teams adaptive cards and the Graph API can support lightweight agent inventory and follow-up.

{% include curated-attribution.html %}

## Why it matters

- Makers: Test grounding and instructions early, because an agent based on one SharePoint page will not automatically understand pages linked from it.
- Makers: Treat custom skills and interface details as changeable, because the tool was renamed, buttons moved, and preview features appeared differently across Teams and the app.
- Admins/IT: Use Agent 365 visibility and a lightweight Graph API, SharePoint, Power Automate and Teams pattern to identify new or unused agents and prompt owners to review them.
- Leadership/Business: Encourage inexpensive experiments while recognising that the resulting agents teach reusable skills about roles, grounding, ownership and lifecycle.

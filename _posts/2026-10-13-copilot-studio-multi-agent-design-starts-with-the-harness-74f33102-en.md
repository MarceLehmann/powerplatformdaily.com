---
title: Copilot Studio multi-agent design starts with the harness
description: Standard and GitHub Copilot harnesses expose different options for child
  agents, skills, A2A, MCP and connected agents.
date: '2026-10-13T16:58:36Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- connectors
- roadmap
content_type: curated_summary
curation_id: 74f331026c7a0e117bea7536
image:
  path: "/assets/img/curated/74f331026c7a0e117bea7536.png"
  alt: 'News card: Choose the harness before you design the agent. A harness change
    requires a rebuild.'
permalink: "/en/posts/copilot-studio-multi-agent-design-starts-with-the-harness-74f33102/"
translation_url: "/de/posts/copilot-studio-multi-agent-design-starts-with-the-harness-74f33102/"
source_url: https://holgerimbery.blog/multi-agent-orchestration-copilot-studio-harnesses
source_site_url: https://holgerimbery.blog/
source_title: Multi-Agent Orchestration in Copilot Studio - Pick the Harness First
source_name: Holger Imbery - fieldnotes and insights
source_language: en
source_language_name: English
source_author: Holger Imbery
source_published_at: '2026-09-05'
source_type: article
faq:
- question: Can I move a Copilot Studio agent from the standard harness to the GitHub
    Copilot harness?
  answer: No. Agents cannot be transferred between the standard and GitHub Copilot
    harnesses, so changing harness requires rebuilding the agent.
- question: When should I use Copilot Studio child agents instead of skills?
  answer: Use child agents when typed inputs and outputs, triggers, validation, priorities
    or a separate tool limit are needed. Skills suit reusable instructions, scripts,
    templates and reference files in the GitHub Copilot harness.
- question: Can a Copilot Studio skill call Microsoft Graph or an external REST API
    directly?
  answer: No. Skill code runs in a sandbox without an outbound network path. External
    systems must be reached through a configured, governed tool such as a connector,
    workflow or MCP server.
---

## TL;DR

Copilot Studio agents cannot move between the standard and GitHub Copilot harnesses without a rebuild. Standard supports child agents and documented A2A, while the GitHub Copilot harness supports skills, sandboxed file work and Copilot Studio-only connected agents. Harness choice also changes billing and available capabilities.

{% include curated-attribution.html %}

## Why it matters

- Makers: Choose the harness before building, because moving an agent to the other harness requires a rebuild and changes the available orchestration patterns.
- Makers: Use child agents in the standard harness for typed inputs, triggers and separate tool limits; use skills in the GitHub Copilot harness for reusable instruction and file-processing packages.
- Admins/IT: Treat external access from skills as governed tools, since skill code has no outbound network path and skills do not authenticate.
- Leadership/Business: Budget for GitHub Copilot harness usage from authoring onward, because building, testing and evaluating are metered.

---
title: Copilot Studio workflows put agent reasoning directly into the process
description: The new Copilot Studio workflow experience adds agent nodes, structured
  outputs, node testing and evaluations alongside deterministic actions.
date: '2026-10-13T17:08:35Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- licensing
- roadmap
content_type: curated_summary
curation_id: 7af005ad2b78c404627fec10
image:
  path: "/assets/img/curated/7af005ad2b78c404627fec10.png"
  alt: 'News card: Copilot Studio workflows can now place reasoning directly beside
    deterministic actions.'
permalink: "/en/posts/copilot-studio-workflows-put-agent-reasoning-directly-into-the-process-7af005ad/"
translation_url: "/de/posts/copilot-studio-workflows-put-agent-reasoning-directly-into-the-process-7af005ad/"
source_url: https://holgerimbery.blog/copilot-studio-workflows-new-experience
source_site_url: https://holgerimbery.blog/
source_title: 'Workflows in the Copilot Studio: What the Agent Node Actually Changes'
source_name: Holger Imbery - fieldnotes and insights
source_language: en
source_language_name: English
source_author: Holger Imbery
source_published_at: '2026-09-01'
source_type: article
faq:
- question: What agent choices are available in a Copilot Studio workflow agent node?
  answer: The node can call an existing published agent or create an inline agent
    scoped to that workflow. Inline agents are not reusable across workflows.
- question: How does structured output improve Copilot Studio workflow steps?
  answer: Structured output exposes named fields as dynamic-content tokens, allowing
    later steps to branch on values or write them directly to Dataverse columns.
- question: What limits apply to Copilot Studio workflow evaluations?
  answer: Evaluations apply only to new workflow-created agents, allow up to five
    AI-generated test methods and 20 evaluation runs per node daily. Custom models
    are unavailable.
---

## TL;DR

Copilot Studio’s new workflow experience places an agent node directly on a visual workflow canvas alongside deterministic actions. Makers can use published or workflow-scoped inline agents, return structured outputs, request human assistance, test nodes in isolation and evaluate new inline agents with documented limits.

{% include curated-attribution.html %}

## Why it matters

- Makers: Build the deterministic backbone first, then add an agent node only where unstructured input or judgment exceeds fixed rules. Define the output schema before writing instructions so downstream steps can use fields directly.
- Admins/IT: Choose the GitHub Copilot harness deliberately and budget for usage-based billing across building, testing, evaluating and runtime work. Treat workflow and MCP server tools for agents as preview capabilities when planning production designs.

---
title: Power Apps gains custom tools and rich UI for agent conversations
description: Power Apps can expose custom tools and rich MCP UI when an app is exported
  as a Microsoft 365 Copilot declarative agent.
date: '2026-10-02T18:57:59Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
- copilot-studio
- connectors
- dataverse
content_type: curated_summary
curation_id: 1e532e03b8aee15d70d6e714
image:
  path: "/assets/img/curated/1e532e03b8aee15d70d6e714.png"
  alt: 'News card: Power Apps can export custom tools and rich UI as declarative Copilot
    agents.'
permalink: "/en/posts/power-apps-gains-custom-tools-and-rich-ui-for-agent-conversations-1e532e03/"
translation_url: "/de/posts/power-apps-gains-custom-tools-and-rich-ui-for-agent-conversations-1e532e03/"
source_url: https://nullpointer.se/agentification-power-platform.html
source_site_url: https://nullpointer.se/
source_title: The death of BizApps and the rise of the agentic Power Platform
source_name: The Nullpointer Blog
source_language: en
source_language_name: English
source_author: Andreas Adner
source_published_at: '2026-05-03'
source_type: article
faq:
  - question: "What happens to custom tools when I export a Power App as a declarative Copilot agent?"
    answer: "They become MCP plugin actions inside the exported declarative agent. The custom tools capability in Power Apps is in public preview. A Power App can also expose its own MCP server with custom MCP Apps UI tools, and the whole app can be packaged as a declarative Copilot agent package for deployment in your tenant."
  - question: "Which kinds of agents can update Dataverse data from inside a Power App?"
    answer: "The standard Microsoft 365 Copilot agent running in Power Apps can read Dataverse data but cannot change it. Custom agents, meaning declarative agents, Copilot Studio agents or custom engine agents, can update data when they are deployed together with the Dataverse MCP Server. Choose a custom agent whenever the conversation must write back to records."
  - question: "How do interactive UI widgets reach agent conversations in Microsoft 365 Copilot?"
    answer: "Microsoft announced support for the OpenAI Apps SDK in Microsoft 365 Copilot on March 9, 2026, with MCP Apps following shortly after. Both work only for declarative agents and are marketed as interactive UI widgets, part of MCP plugin actions. Full MCP Apps support for declarative Copilot agents arrived on April 7, 2026."
  - question: "What is the main limitation of custom agents inside a Power App?"
    answer: "A custom agent has no awareness of the Power App it runs in. It cannot tell which form, view or record the user currently has open, so your agent logic cannot rely on that screen context. The author lists this as a current constraint, which matters most when a conversation depends on the record the user is looking at."
  - question: "How does an exported Power App agent reach my tenant?"
    answer: "You download the Power App as a declarative Copilot agent package and deploy it to your tenant. The article names no further admin steps. The custom tools capability in Power Apps is in public preview, announced in April 2026, so any scenario that relies on custom tools carries that preview status. Plan the tenant deployment of such packages with this in mind."
---

## TL;DR

Power Apps custom tools and rich UI for app-based conversations are in public preview. When a Power App is exported as a declarative Copilot agent, its custom tools become MCP plugin actions. Power Apps can also expose an MCP server and package the app as a declarative agent for tenant deployment.

{% include curated-attribution.html %}

## Why it matters

- Makers: Test exporting Power Apps as declarative agents so custom app tools can be invoked through MCP plugin actions.
- Makers: Validate rich MCP UI scenarios for app-based conversations while the capability remains in public preview.
- Admins/IT: Review tenant deployment of downloaded declarative agent packages before making app capabilities available in Microsoft 365 Copilot.

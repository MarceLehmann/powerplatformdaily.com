---
title: Power Apps Widgets Bring Interactive App UI Into Copilot Chats
description: Built-in Model-driven App MCP widgets and custom Power Apps widgets bring
  forms, grids and Dataverse data into Copilot conversations.
date: '2026-10-07T17:01:53Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
- dataverse
content_type: curated_summary
curation_id: 76d47838aaa9a21262f2e206
image:
  path: "/assets/img/curated/76d47838aaa9a21262f2e206.png"
  alt: 'News card: Power Apps widgets bring interactive app UI into Copilot conversations.'
permalink: "/en/posts/power-apps-widgets-bring-interactive-app-ui-into-copilot-chats-76d47838/"
translation_url: "/de/posts/power-apps-widgets-bring-interactive-app-ui-into-copilot-chats-76d47838/"
source_url: https://dianabirkelbach.wordpress.com/2026/05/26/inside-built-in-and-custom-copilot-ui-widgets-powered-by-power-apps/
source_site_url: https://dianabirkelbach.wordpress.com/
source_title: Inside Built-in and Custom Copilot UI Widgets Powered by Power Apps
source_name: Dianamics PCF Lady
source_language: en
source_language_name: English
source_published_at: '2026-05-26'
source_type: article
faq:
- question: How do Model-driven App MCP widgets work in M365 Copilot Chat?
  answer: They expose Model-driven App views and forms as interactive MCP Apps, allowing
    users to view, create and edit records within the conversation.
- question: How do I activate built-in MCP tools for a Power Apps Model-driven App?
  answer: Open the app in the maker portal, select App MCP, and choose Set up MCP.
    The app then provides built-in record and data tools.
- question: What does a custom Power Apps UI widget need to contain?
  answer: It needs self-contained HTML that consumes the custom tool’s JSON output
    and communicates with the MCP host. The UI definition is optional.
animation:
  src: /assets/img/animations/76d47838aaa9a21262f2e206-en.gif
  poster: /assets/img/animations/76d47838aaa9a21262f2e206-en.poster.png
  width: 800
  height: 450
  alt: "Three steps show how to activate built-in MCP tools for a Model-driven App: open the app in the maker portal, select App MCP, then choose Set up MCP."
---

## TL;DR

Power Apps can expose Model-driven App views and forms as MCP Apps in M365 Copilot Chat. Developers can also define custom tools with prompt instructions, Dataverse inputs and optional self-contained HTML widgets that receive JSON output and communicate with the chat host.

{% include curated-attribution.html %}

## Why it matters

- Makers: Activate the App MCP capability for a Model-driven App to expose built-in record and data tools, then download its app package for deployment.
- Makers: Define clear custom tool names, descriptions and instructions, because M365 Copilot uses them to decide when to call a tool.
- Admins/IT: Plan for Teams or M365 deployment rights, since developers without the required permissions may need organizational approval before uploading the app.
- BI/Data teams: Check Dataverse fields, JSON output and linked-table behavior carefully, because the examples show useful filtering alongside some lookup and related-data limitations in preview.

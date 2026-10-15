---
title: Build a Microsoft release radar with MCP in Copilot Studio
description: Use the Microsoft Release Communications MCP Server in Copilot Studio
  or VS Code to query current roadmap data and publish a release radar agent.
date: '2026-10-15T17:01:19Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- roadmap
- connectors
content_type: curated_summary
curation_id: 2f4a95301eea3fe77024533f
image:
  path: "/assets/img/curated/2f4a95301eea3fe77024533f.png"
  alt: 'News card: Copilot Studio agents can use MRC MCP for current Microsoft roadmap
    data.'
permalink: "/en/posts/build-a-microsoft-release-radar-with-mcp-in-copilot-studio-2f4a9530/"
translation_url: "/de/posts/build-a-microsoft-release-radar-with-mcp-in-copilot-studio-2f4a9530/"
source_url: https://contactcenterchronicles.com/building-a-microsoft-release-radar-with-mcp-in-copilot-studio-and-vs-code/
source_site_url: https://contactcenterchronicles.com/
source_title: Building a Microsoft Release Radar with MCP in Copilot Studio and VS
  Code
source_name: Contact Center Chronicles
source_language: en
source_language_name: English
source_author: Kristine Risberg
source_published_at: '2026-09-03'
source_type: article
faq:
- question: How do I add the Microsoft Release Communications MCP Server to Copilot
    Studio?
  answer: Add the MRC MCP Server under Tools, or enter its Microsoft endpoint manually,
    then create a named connection without credentials.
- question: Which tools does the MRC MCP Server expose in Copilot Studio?
  answer: Copilot Studio can discover four tools, including recent roadmap retrieval,
    individual roadmap lookup, recent Azure updates, and individual Azure update lookup.
- question: How can a Copilot Studio agent use MRC MCP for current roadmap answers?
  answer: Instruct the agent to use MRC for roadmap questions, select the required
    tools, and publish it to Microsoft 365 Copilot or Teams.
---

## TL;DR

The Microsoft Release Communications MCP Server gives Copilot Studio agents and GitHub Copilot in VS Code access to current Microsoft AI at Work roadmap data. Add the HTTP server, select its four tools, instruct the agent to use them for roadmap questions, and publish the resulting agent to Microsoft 365 Copilot and Teams.

{% include curated-attribution.html %}

## Why it matters

- Makers: Add the MRC MCP Server under Copilot Studio Tools and instruct the agent to use it for roadmap questions, so answers come from current release data.
- Admins/IT: Check the available MCP tools and connection setup, noting that the server requires no authentication or separate licence.
- Leadership/Business: Use a published Release Radar agent in Microsoft 365 Copilot or Teams to help users track upcoming changes and preparation needs.

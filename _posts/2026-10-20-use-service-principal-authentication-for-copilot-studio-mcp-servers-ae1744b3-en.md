---
title: Use service principal authentication for Copilot Studio MCP servers
description: Configure an MCP server as a Power Platform custom connector with app-only
  authentication, then use a maker-provided shared connection in Copilot Studio.
date: '2026-10-20T17:08:17Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- connectors
content_type: curated_summary
curation_id: ae1744b3fba0778a9d18300b
image:
  path: "/assets/img/curated/ae1744b3fba0778a9d18300b.png"
  alt: 'News card: Copilot Studio MCP servers can use a shared service principal connection.'
permalink: "/en/posts/use-service-principal-authentication-for-copilot-studio-mcp-servers-ae1744b3/"
translation_url: "/de/posts/use-service-principal-authentication-for-copilot-studio-mcp-servers-ae1744b3/"
source_url: https://ashiqf.com/2026/03/19/secure-your-mcp-server-with-service-principal-authentication-for-copilot-studio/
source_site_url: https://ashiqf.com/
source_title: Secure Your MCP Server with Service Principal Authentication for Copilot
  Studio
source_name: Mohamed Ashiq Faleel
source_language: en
source_language_name: English
source_author: Mohamed Ashiq Faleel
source_published_at: '2026-03-19'
source_type: article
faq:
- question: How do I use a service principal with a Copilot Studio MCP server?
  answer: Create a Power Platform custom connector with OAuth 2.0 service principal
    support, then create and select its shared connection in Copilot Studio.
- question: Which permission does the Copilot client need for the MCP Server API?
  answer: The Copilot client needs the MCP Server application's api.server.access
    application permission. An administrator must grant consent for that permission.
- question: Which Copilot Studio credential setting keeps an MCP tool on one connection?
  answer: Select Maker provided under Credentials to use after adding the MCP tool.
    This makes the agent use the same shared connection rather than prompting each
    user.
animation:
  video: /assets/img/animations/ae1744b3fba0778a9d18300b-en.mp4
  poster: /assets/img/animations/ae1744b3fba0778a9d18300b-en.poster.webp
  width: 800
  height: 450
  alt: "Five steps show configuring a custom connector for service principal auth, granting Copilot client permission and admin consent, adding the MCP header, creating a shared connection, and selecting Maker provided."
---

## TL;DR

Copilot Studio can connect to an MCP server through a Power Platform custom connector using OAuth 2.0 service principal support. Create an application app role, grant the Copilot client application permission and admin consent, add x-ms-agentic-protocol: mcp-streamable-1.0, create the shared connection, then select Maker provided credentials for the agent tool.

{% include curated-attribution.html %}

## Why it matters

- Makers: Build the MCP custom connector with OAuth 2.0 service principal support, add the MCP protocol extension, then attach its connection as an existing MCP server tool.
- Admins/IT: Create the MCP API application role, assign the application permission to the Copilot client and grant admin consent before the shared connection is created.
- Leadership/Business: Use app-only authentication for shared or background tools that do not require individual user identity, avoiding per-user connection creation.

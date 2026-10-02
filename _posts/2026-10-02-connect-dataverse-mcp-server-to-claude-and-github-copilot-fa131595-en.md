---
title: Connect Dataverse MCP Server to Claude and GitHub Copilot
description: Configure the Dataverse MCP Server remote Streamable HTTP endpoint for
  Claude Desktop, Claude Code, and GitHub Copilot with an Entra app and OAuth2 PKCE.
date: '2026-10-02T18:57:50Z'
author: news_editorial
lang: en
toc: false
tags:
- dataverse
- connectors
content_type: curated_summary
curation_id: fa1315951adb7cb08e51dd97
image:
  path: "/assets/img/curated/fa1315951adb7cb08e51dd97.png"
  alt: 'News card: Dataverse MCP can connect to Claude and GitHub Copilot through
    its remote HTTP endpoint.'
permalink: "/en/posts/connect-dataverse-mcp-server-to-claude-and-github-copilot-fa131595/"
translation_url: "/de/posts/connect-dataverse-mcp-server-to-claude-and-github-copilot-fa131595/"
source_url: https://nullpointer.se/dv-mcp-non-microsoft.html
source_site_url: https://nullpointer.se/
source_title: Running Dataverse MCP Server in non-Microsoft clients
source_name: The Nullpointer Blog
source_language: en
source_language_name: English
source_author: Andreas Adner
source_published_at: '2026-06-28'
source_type: article
---

## TL;DR

Dataverse MCP Server can be connected to Claude Desktop, Claude Code, the GitHub Copilot app, and GitHub Copilot CLI through its remote Streamable HTTP endpoint. Register an Entra app with mcp.tools permission, allow it in the Dataverse environment, enable public client flows, and configure each client redirect URI for OAuth2 PKCE authentication.

{% include curated-attribution.html %}

## Why it matters

- Makers: Configure Claude Desktop, Claude Code, or GitHub Copilot with the Dataverse MCP remote HTTP URL and the Entra application ID to use Dataverse tools without a local STDIO proxy.
- Admins/IT: Register an Entra application, grant the mcp.tools permission, add its ID to the environment&\#39;s allowed clients, and enable public client flows for PKCE.
- Admins/IT: Add the client-specific OAuth2 redirect URIs before users authenticate; the Authentication settings page used in the setup is marked Preview.

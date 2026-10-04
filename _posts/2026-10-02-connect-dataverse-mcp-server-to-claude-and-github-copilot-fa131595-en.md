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
faq:
  - question: "How do I connect Dataverse MCP Server to Claude Code from the command line?"
    answer: "Use the claude mcp add command with the HTTP transport, your Entra app registration ID as client ID, a name for the server and the Dataverse MCP URL. After you start Claude Code, run the /mcp command and sign in through the browser link it shows. The app registration and its redirect URI must already be in place."
  - question: "Which redirect URIs does the Entra app need for Claude Desktop, Claude Code and GitHub Copilot?"
    answer: "Add one redirect URI per client in the app registration. Claude Desktop uses the claude.ai MCP authentication callback address, Claude Code uses http://localhost/callback, and GitHub Copilot, both app and CLI, uses http://127.0.0.1. Register these addresses before anyone signs in, because each client expects its own value during the OAuth2 flow."
  - question: "Why must public client flows be enabled for the Dataverse MCP Entra app?"
    answer: "Public client flows allow the OAuth2 PKCE sign-in that desktop and CLI clients use to authenticate against the remote Dataverse MCP endpoint. In the Authentication settings of the app registration you set Allow public client flows to Enabled. The author notes that this Authentication page is still marked Preview in the walkthrough."
  - question: "What permission and allow-list step does the Dataverse environment need for MCP clients?"
    answer: "Grant the app registration the mcp.tools API permission and note its application ID. Then add that ID to the allowed clients in the MCP Server access controls of your Dataverse environment, so the environment recognises the client. The same application ID is entered later in the configuration of each client."
  - question: "What replaces the local STDIO proxy when using Dataverse MCP with non-Microsoft clients?"
    answer: "The remote endpoint with Streamable HTTP transport replaces it. The author calls the local STDIO proxy approach outdated, because it needs tedious configuration. With the remote URL and OAuth2 PKCE, Claude Desktop, Claude Code, the GitHub Copilot app and GitHub Copilot CLI connect directly. In Claude Desktop you create a custom connector with the MCP URL and the app ID."
---

## TL;DR

Dataverse MCP Server can be connected to Claude Desktop, Claude Code, the GitHub Copilot app, and GitHub Copilot CLI through its remote Streamable HTTP endpoint. Register an Entra app with mcp.tools permission, allow it in the Dataverse environment, enable public client flows, and configure each client redirect URI for OAuth2 PKCE authentication.

{% include curated-attribution.html %}

## Why it matters

- Makers: Configure Claude Desktop, Claude Code, or GitHub Copilot with the Dataverse MCP remote HTTP URL and the Entra application ID to use Dataverse tools without a local STDIO proxy.
- Admins/IT: Register an Entra application, grant the mcp.tools permission, add its ID to the environment&\#39;s allowed clients, and enable public client flows for PKCE.
- Admins/IT: Add the client-specific OAuth2 redirect URIs before users authenticate; the Authentication settings page used in the setup is marked Preview.

---
title: Dataverse MCP Server mit Claude und GitHub Copilot verbinden
description: Den Remote-Endpunkt des Dataverse MCP Server über Streamable HTTP für
  Claude Desktop, Claude Code und GitHub Copilot mit einer Entra-App und OAuth2 PKCE
  einrichten.
date: '2026-10-02T18:57:50Z'
author: news_editorial
lang: de
toc: false
tags:
- dataverse
- connectors
content_type: curated_summary
curation_id: fa1315951adb7cb08e51dd97
image:
  path: "/assets/img/curated/fa1315951adb7cb08e51dd97.png"
  alt: 'News-Karte: Dataverse MCP can connect to Claude and GitHub Copilot through
    its remote HTTP endpoint.'
permalink: "/de/posts/connect-dataverse-mcp-server-to-claude-and-github-copilot-fa131595/"
translation_url: "/en/posts/connect-dataverse-mcp-server-to-claude-and-github-copilot-fa131595/"
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
  - question: "Wie verbinde ich den Dataverse MCP Server per Befehlszeile mit Claude Code?"
    answer: "Führe claude mcp add mit HTTP-Transport aus, mit der Client-ID deiner Entra-App und der Dataverse-MCP-URL. Melde dich danach über den Browserlink an, den /mcp anzeigt."
  - question: "Welche Berechtigung und Freigabe braucht die Dataverse-Umgebung für MCP-Clients?"
    answer: "Gib der App-Registrierung die API-Berechtigung mcp.tools. Trage danach ihre Anwendungs-ID bei den erlaubten Clients der MCP-Server-Zugriffssteuerung deiner Dataverse-Umgebung ein."
  - question: "Was ersetzt den lokalen STDIO-Proxy bei Dataverse MCP in Nicht-Microsoft-Clients?"
    answer: "Ein entfernter Endpunkt mit Streamable-HTTP-Transport. Der Autor nennt den alten lokalen STDIO-Proxy veraltet und aufwendig; Clients verbinden sich jetzt direkt per OAuth2 PKCE."
---

## TL;DR

Der Dataverse MCP Server lässt sich über seinen Remote-Endpunkt mit Streamable HTTP mit Claude Desktop, Claude Code, der GitHub-Copilot-App und GitHub Copilot CLI verbinden. Dafür wird eine Entra-App mit der Berechtigung mcp.tools registriert, in der Dataverse-Umgebung zugelassen, öffentliche Clientflows werden aktiviert und pro Client eine OAuth2-PKCE-Umleitungs-URI hinterlegt.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Claude Desktop, Claude Code oder GitHub Copilot mit der Remote-HTTP-URL des Dataverse MCP Server und der Entra-Anwendungs-ID einrichten, um Dataverse-Tools ohne lokalen STDIO-Proxy zu verwenden.
- Admins/IT: Eine Entra-Anwendung registrieren, die Berechtigung mcp.tools erteilen, ihre ID bei den zugelassenen Clients der Umgebung eintragen und öffentliche Clientflows für PKCE aktivieren.
- Admins/IT: Die OAuth2-Umleitungs-URIs der jeweiligen Clients vor der Anmeldung hinterlegen; die dafür verwendete Authentifizierungseinstellung ist als Vorschau gekennzeichnet.

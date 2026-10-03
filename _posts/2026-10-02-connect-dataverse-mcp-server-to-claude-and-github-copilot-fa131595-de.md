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
    answer: "Nutze den Befehl claude mcp add mit HTTP-Transport, der Anwendungs-ID deiner Entra-App als Client-ID, einem frei gewählten Servernamen und der MCP-URL deiner Dataverse-Umgebung. Nach dem Start von Claude Code gibst du den Befehl /mcp ein und meldest dich über den angezeigten Browserlink an. Die App-Registrierung samt Redirect-URI muss dafür schon bestehen."
  - question: "Welche Redirect-URIs braucht die Entra-App für Claude Desktop, Claude Code und GitHub Copilot?"
    answer: "Trage pro Client eine eigene Redirect-URI in der App-Registrierung ein. Claude Desktop nutzt die Rückruf-Adresse der MCP-Authentifizierung auf claude.ai, Claude Code verwendet http://localhost/callback, und GitHub Copilot, ob App oder CLI, nutzt http://127.0.0.1. Lege diese Adressen an, bevor sich Benutzer zum ersten Mal anmelden."
  - question: "Warum müssen öffentliche Clientflüsse für die Dataverse-MCP-App aktiviert sein?"
    answer: "Sie ermöglichen die OAuth2-Anmeldung mit PKCE, über die sich Desktop- und CLI-Clients am entfernten Dataverse-MCP-Endpunkt authentifizieren. Du stellst in den Authentifizierungseinstellungen der App-Registrierung die Option Allow public client flows auf Enabled. Der Autor weist darauf hin, dass diese Authentifizierungsseite im beschriebenen Setup noch als Preview gekennzeichnet ist."
  - question: "Welche Berechtigung und Freigabe braucht die Dataverse-Umgebung für MCP-Clients?"
    answer: "Gib der App-Registrierung die API-Berechtigung mcp.tools und notiere dir die Anwendungs-ID. Trage diese ID danach bei den erlaubten Clients der MCP-Server-Zugriffssteuerung deiner Dataverse-Umgebung ein, damit die Umgebung den Client erkennt. Dieselbe Anwendungs-ID gibst du später in der Konfiguration jedes Clients an."
  - question: "Was ersetzt den lokalen STDIO-Proxy bei Dataverse MCP in Nicht-Microsoft-Clients?"
    answer: "Der entfernte Endpunkt mit Streamable-HTTP-Transport ersetzt ihn. Der Autor bezeichnet den lokalen STDIO-Proxy als veraltet und aufwendig in der Einrichtung. Mit der Remote-URL und OAuth2 PKCE verbinden sich Claude Desktop, Claude Code, die GitHub-Copilot-App und GitHub Copilot CLI direkt. In Claude Desktop legst du dafür einen eigenen Connector mit MCP-URL und App-ID an."
---

## TL;DR

Der Dataverse MCP Server lässt sich über seinen Remote-Endpunkt mit Streamable HTTP mit Claude Desktop, Claude Code, der GitHub-Copilot-App und GitHub Copilot CLI verbinden. Dafür wird eine Entra-App mit der Berechtigung mcp.tools registriert, in der Dataverse-Umgebung zugelassen, öffentliche Clientflows werden aktiviert und pro Client eine OAuth2-PKCE-Umleitungs-URI hinterlegt.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Claude Desktop, Claude Code oder GitHub Copilot mit der Remote-HTTP-URL des Dataverse MCP Server und der Entra-Anwendungs-ID einrichten, um Dataverse-Tools ohne lokalen STDIO-Proxy zu verwenden.
- Admins/IT: Eine Entra-Anwendung registrieren, die Berechtigung mcp.tools erteilen, ihre ID bei den zugelassenen Clients der Umgebung eintragen und öffentliche Clientflows für PKCE aktivieren.
- Admins/IT: Die OAuth2-Umleitungs-URIs der jeweiligen Clients vor der Anmeldung hinterlegen; die dafür verwendete Authentifizierungseinstellung ist als Vorschau gekennzeichnet.

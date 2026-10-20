---
title: Service Principal für MCP-Server in Copilot Studio nutzen
description: Einen MCP-Server als Power-Platform-Custom-Connector mit App-only-Authentifizierung
  konfigurieren und die gemeinsame Verbindung in Copilot Studio verwenden.
date: '2026-10-20T17:08:17Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- connectors
content_type: curated_summary
curation_id: ae1744b3fba0778a9d18300b
image:
  path: "/assets/img/curated/ae1744b3fba0778a9d18300b.png"
  alt: 'News-Karte: Copilot Studio MCP servers can use a shared service principal
    connection.'
permalink: "/de/posts/use-service-principal-authentication-for-copilot-studio-mcp-servers-ae1744b3/"
translation_url: "/en/posts/use-service-principal-authentication-for-copilot-studio-mcp-servers-ae1744b3/"
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
- question: Wie nutze ich einen Service Principal für einen MCP-Server in Copilot
    Studio?
  answer: Erstellen Sie einen Power-Platform-Custom-Connector mit OAuth-2.0-Service-Principal-Unterstützung
    und wählen Sie dessen gemeinsame Verbindung in Copilot Studio aus.
- question: Welche Berechtigung benötigt der Copilot-Client für die MCP-Server-API?
  answer: Der Copilot-Client benötigt die Anwendungsberechtigung api.server.access
    der MCP-Server-Anwendung. Ein Administrator muss dafür den Admin Consent erteilen.
- question: Welche Copilot-Studio-Anmeldeinformation bindet ein MCP-Tool an eine gemeinsame
    Verbindung?
  answer: Wählen Sie nach dem Hinzufügen des MCP-Tools unter Credentials to use die
    Option Maker provided. Dadurch verwendet der Agent dieselbe gemeinsame Verbindung
    ohne Benutzeranmeldung.
---

## TL;DR

Copilot Studio kann über einen Power-Platform-Custom-Connector mit OAuth-2.0-Service-Principal-Unterstützung auf einen MCP-Server zugreifen. Erstellen Sie eine Anwendungsrolle, erteilen Sie der Copilot-Client-App die Anwendungsberechtigung samt Admin Consent, ergänzen Sie x-ms-agentic-protocol: mcp-streamable-1.0, erstellen Sie die gemeinsame Verbindung und wählen Sie für das Agent-Tool Maker provided als Anmeldeinformation.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Erstellen Sie den MCP-Custom-Connector mit OAuth-2.0-Service-Principal-Unterstützung, ergänzen Sie die MCP-Protokollerweiterung und fügen Sie die Verbindung als vorhandenes MCP-Server-Tool hinzu.
- Admins/IT: Erstellen Sie die MCP-API-Anwendungsrolle, weisen Sie der Copilot-Client-App die Anwendungsberechtigung zu und erteilen Sie Admin Consent, bevor die gemeinsame Verbindung erstellt wird.
- Leadership/Business: Nutzen Sie App-only-Authentifizierung für gemeinsame oder Hintergrundtools ohne individuelle Benutzeridentität, um einzelne Benutzerverbindungen zu vermeiden.

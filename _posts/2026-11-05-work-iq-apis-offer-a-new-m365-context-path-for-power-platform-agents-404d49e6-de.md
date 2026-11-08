---
title: Work IQ APIs erschliessen M365-Kontext für Power Platform-Agenten
description: Laut Quelle vom 03.11.2026 stellen Work IQ APIs M365-Kontext, Aktionen
  und Zwischenzustände für Copilot Studio, Power Automate und eigene Konnektoren bereit.
date: '2026-11-05T19:39:20Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- power-automate
- connectors
content_type: curated_summary
curation_id: 404d49e604df7820e732ed86
image:
  path: "/assets/img/curated/404d49e604df7820e732ed86.png"
  alt: 'News-Karte: Work IQ gives Power Platform agents M365 context through a smaller
    MCP surface.'
permalink: "/de/posts/work-iq-apis-offer-a-new-m365-context-path-for-power-platform-agents-404d49e6/"
translation_url: "/en/posts/work-iq-apis-offer-a-new-m365-context-path-for-power-platform-agents-404d49e6/"
source_url: https://aidevme.com/work-iq-apis-microsoft-365-intelligence-layer-enterprise-agents/
source_site_url: https://aidevme.com/
source_title: Work IQ APIs for Power Platform Developers
source_name: AIDevMe
source_language: en
source_language_name: English
source_author: Zsolt Zombik
source_published_at: '2026-06-15'
source_updated_at: '2026-11-03'
source_type: article
faq:
- question: Wie können Copilot Studio-Agenten Work IQ APIs statt Microsoft Graph verwenden?
  answer: Copilot Studio-Agenten können Work IQ für zusammengefasste Antworten, agentenfähigen
    Kontext, Microsoft-365-Aktionen und Zwischenzustände nutzen. Die Quelle beschreibt
    dies als alternativen Integrationsweg.
- question: Was bietet die Work IQ MCP-Schnittstelle für Power Automate-Flows?
  answer: Die MCP-Schnittstelle bietet zehn generische Werkzeuge mit schrittweiser
    Offenlegung für Microsoft-365-Daten und Aktionen. Laut Quelle verringert dies
    den Aufwand bei der Werkzeugauswahl für Agenten.
- question: Braucht Work IQ vor der Power-Platform-Integration eine Administratorzustimmung?
  answer: Ja, Work IQ benötigt Mandantenberechtigungen mit administrativen Rechten.
    Beim ersten Zugriff erscheint ein Zustimmungsdialog, und Nicht-Administratoren
    brauchen dafür eine Freigabe durch ihre Administration.
---

## TL;DR

Work IQ APIs bündeln Chat, Context, Tools und Workspaces für Agenten. Laut Quelle vom 03.11.2026 können Copilot Studio-Agenten, Power Automate-Flows und eigene Konnektoren dadurch M365-Kontext über eine MCP-Schnittstelle statt über viele Graph-Aufrufe beziehen. In Microsoft-internen Tests wurden dabei 80 Prozent weniger Tokens beobachtet.

## Warum das wichtig ist

- Makers: Work IQ mit Graph-basierten eigenen Konnektoren vergleichen, wenn Agenten E-Mails, Kalender oder Teams-Kontext benötigen, weil die Quelle weniger Werkzeuge und vorverarbeiteten Kontext beschreibt.
- Admins/IT: Die erforderliche Mandantenzustimmung vor der Aktivierung des Work IQ-MCP-Servers prüfen, weil der erste Zugriff administrative Freigabe verlangt.
- Leadership/Business: Verbrauchsbasierte Copilot Credits und Testergebnisse getrennt bewerten, weil die Reduktion um 80 Prozent laut Quelle nur in Microsoft-internen Tests beobachtet wurde.

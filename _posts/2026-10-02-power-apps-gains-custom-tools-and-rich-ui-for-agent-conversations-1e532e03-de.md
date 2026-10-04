---
title: Power Apps erhält eigene Tools und Rich UI für Agent-Unterhaltungen
description: Power Apps kann beim Export als deklarativer Microsoft-365-Copilot-Agent
  eigene Tools und umfangreiche MCP-Benutzeroberflächen bereitstellen.
date: '2026-10-02T18:57:59Z'
author: news_editorial
lang: de
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
  alt: 'News-Karte: Power Apps can export custom tools and rich UI as declarative
    Copilot agents.'
permalink: "/de/posts/power-apps-gains-custom-tools-and-rich-ui-for-agent-conversations-1e532e03/"
translation_url: "/en/posts/power-apps-gains-custom-tools-and-rich-ui-for-agent-conversations-1e532e03/"
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
  - question: "Was passiert mit benutzerdefinierten Tools, wenn ich eine Power App als deklarativen Copilot-Agenten exportiere?"
    answer: "Sie werden im exportierten deklarativen Agenten zu MCP-Plugin-Aktionen. Die Funktion für benutzerdefinierte Tools in Power Apps befindet sich in der öffentlichen Preview. Eine Power App kann ausserdem einen eigenen MCP-Server mit MCP-Apps-Oberflächen bereitstellen, und die ganze App lässt sich als Paket eines deklarativen Copilot-Agenten für die Bereitstellung im Tenant verpacken."
  - question: "Welche Agenten dürfen innerhalb einer Power App Dataverse-Daten ändern?"
    answer: "Der Standard-Agent von Microsoft 365 Copilot in Power Apps kann Dataverse-Daten nur lesen. Benutzerdefinierte Agenten, also deklarative Agenten, Copilot-Studio-Agenten oder Custom-Engine-Agenten, können Daten aktualisieren, wenn sie zusammen mit dem Dataverse MCP Server bereitgestellt werden. Wenn eine Unterhaltung Datensätze zurückschreiben soll, brauchst du daher einen benutzerdefinierten Agenten."
  - question: "Wie gelangen interaktive UI-Widgets in Agent-Unterhaltungen von Microsoft 365 Copilot?"
    answer: "Am 9. März 2026 kündigte Microsoft die Unterstützung des OpenAI Apps SDK in Microsoft 365 Copilot an, MCP Apps folgten kurz danach. Beides gilt zunächst nur für deklarative Agenten und läuft unter der Bezeichnung interaktive UI-Widgets als Teil der MCP-Plugin-Aktionen. Die volle Unterstützung von MCP Apps für deklarative Copilot-Agenten kam am 7. April 2026."
  - question: "Welche Einschränkung haben benutzerdefinierte Agenten innerhalb einer Power App?"
    answer: "Ein benutzerdefinierter Agent weiss nichts über die Power App, in der er läuft. Er kann nicht erkennen, welches Formular, welche Ansicht oder welchen Datensatz die Person gerade geöffnet hat. Plane deine Agentenlogik deshalb nicht auf diesem Bildschirmkontext auf. Der Autor führt das als aktuelle Einschränkung auf, die besonders bei Unterhaltungen zum angezeigten Datensatz zählt."
  - question: "Wie gelangt ein exportierter Power-Apps-Agent in meinen Tenant?"
    answer: "Du lädst die Power App als Paket eines deklarativen Copilot-Agenten herunter und stellst es in deinem Tenant bereit. Weitere Admin-Schritte nennt der Artikel nicht. Die Funktion für benutzerdefinierte Tools in Power Apps ist in der öffentlichen Preview, angekündigt im April 2026, deshalb tragen alle Szenarien, die darauf aufbauen, diesen Preview-Status. Plane die Bereitstellung solcher Pakete im Tenant mit diesem Hinweis."
---

## TL;DR

Eigene Power-Apps-Tools und umfangreiche Benutzeroberflächen für appbasierte Unterhaltungen sind als öffentliche Vorschau verfügbar. Wird eine Power App als deklarativer Copilot-Agent exportiert, werden ihre eigenen Tools zu MCP-Plug-In-Aktionen. Power Apps kann zudem einen MCP-Server bereitstellen und als deklaratives Agent-Paket im Tenant eingesetzt werden.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Testet den Export von Power Apps als deklarative Agenten, damit eigene App-Tools über MCP-Plug-In-Aktionen nutzbar werden.
- Makers: Prüft Szenarien mit umfangreicher MCP-Benutzeroberfläche für appbasierte Unterhaltungen, solange die Funktion in öffentlicher Vorschau ist.
- Admins/IT: Prüft die Tenant-Bereitstellung heruntergeladener deklarativer Agent-Pakete, bevor App-Funktionen in Microsoft 365 Copilot verfügbar gemacht werden.

---
title: 'Copilot Studio: Multi-Agent-Design beginnt mit dem Harness'
description: Standard- und GitHub-Copilot-Harness bieten unterschiedliche Optionen
  für Child Agents, Skills, A2A, MCP und verbundene Agents.
date: '2026-10-13T16:58:36Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- connectors
- roadmap
content_type: curated_summary
curation_id: 74f331026c7a0e117bea7536
image:
  path: "/assets/img/curated/74f331026c7a0e117bea7536.png"
  alt: 'News-Karte: Choose the harness before you design the agent. A harness change
    requires a rebuild.'
permalink: "/de/posts/copilot-studio-multi-agent-design-starts-with-the-harness-74f33102/"
translation_url: "/en/posts/copilot-studio-multi-agent-design-starts-with-the-harness-74f33102/"
source_url: https://holgerimbery.blog/multi-agent-orchestration-copilot-studio-harnesses
source_site_url: https://holgerimbery.blog/
source_title: Multi-Agent Orchestration in Copilot Studio - Pick the Harness First
source_name: Holger Imbery - fieldnotes and insights
source_language: en
source_language_name: English
source_author: Holger Imbery
source_published_at: '2026-09-05'
source_type: article
faq:
- question: Kann ich einen Copilot-Studio-Agent vom Standard-Harness in den GitHub-Copilot-Harness
    verschieben?
  answer: Nein. Agents können nicht zwischen Standard- und GitHub-Copilot-Harness
    übertragen werden, daher ist bei einem Wechsel ein Neubau erforderlich.
- question: Wann nutze ich in Copilot Studio Child Agents statt Skills?
  answer: Child Agents eignen sich für typisierte Ein- und Ausgaben, Trigger, Validierung,
    Prioritäten oder ein separates Tool-Limit. Skills eignen sich für wiederverwendbare
    Anweisungen, Skripte, Vorlagen und Referenzdateien im GitHub-Copilot-Harness.
- question: Kann ein Copilot-Studio-Skill Microsoft Graph oder eine externe REST-API
    direkt aufrufen?
  answer: Nein. Skill-Code läuft in einer Sandbox ohne ausgehenden Netzwerkpfad. Externe
    Systeme müssen über ein konfiguriertes, geregeltes Tool wie Connector, Workflow
    oder MCP-Server angesprochen werden.
---

## TL;DR

Copilot-Studio-Agents können nicht ohne Neubau zwischen Standard- und GitHub-Copilot-Harness verschoben werden. Der Standard-Harness unterstützt Child Agents und dokumentiertes A2A. Der GitHub-Copilot-Harness unterstützt Skills, sandboxbasierte Dateiarbeit und nur in Copilot Studio erstellte verbundene Agents. Auch Abrechnung und Funktionen unterscheiden sich.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Den Harness vor dem Bau wählen, denn ein Wechsel in den anderen Harness erfordert einen Neubau und verändert die verfügbaren Orchestrierungsmuster.
- Makers: Child Agents im Standard-Harness für typisierte Ein- und Ausgaben, Trigger und separate Tool-Limits einsetzen; Skills im GitHub-Copilot-Harness für wiederverwendbare Anweisungs- und Dateipakete nutzen.
- Admins/IT: Externen Zugriff aus Skills als geregelte Tools behandeln, weil Skill-Code keinen ausgehenden Netzwerkpfad hat und Skills nicht authentifizieren.
- Leadership/Business: GitHub-Copilot-Harness-Nutzung ab der Erstellung budgetieren, weil Erstellen, Testen und Auswerten abgerechnet werden.

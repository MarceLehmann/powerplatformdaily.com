---
title: Copilot Studio Hooks steuern Tool-Aufrufe im Lebenszyklus
description: Preview-Hooks führen Workflows bei sechs Agentenereignissen aus, auch
  vor Tool-Aufrufen. Fehlerhafte Hooks stoppen den Agenten nicht.
date: '2026-10-03T00:42:57Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- power-automate
- connectors
- dataverse
- licensing
content_type: curated_summary
curation_id: 996b49fe340872fa42f43233
image:
  path: "/assets/img/curated/996b49fe340872fa42f43233.png"
  alt: 'News-Karte: Copilot Studio hooks can inspect, change or deny tool calls before
    they run.'
permalink: "/de/posts/copilot-studio-hooks-add-lifecycle-workflow-controls-996b49fe/"
translation_url: "/en/posts/copilot-studio-hooks-add-lifecycle-workflow-controls-996b49fe/"
source_url: https://flowaltdelete.ca/2026/10/02/ai-weekly-october-2-2026/
source_site_url: https://flowaltdelete.ca/
source_title: 'AI Weekly: Copilot Studio Hooks, Lovable, and Desktop Automation'
source_name: Flow Alt Delete
source_language: en
source_language_name: English
source_author: Josh Cook
source_published_at: '2026-10-02'
source_type: article
faq:
  - question: "Bei welchen Lebenszyklusereignissen kann ein Copilot-Studio-Hook einen Workflow ausführen?"
    answer: "Bei sechs Ereignissen, darunter vor und nach einem Tool-Aufruf. Ein Hook vor dem Aufruf kann Argumente prüfen, ändern oder den Aufruf ablehnen."
  - question: "Wie sollten Makers das Testen eines Vorab-Hooks bei einem Update-Tool beginnen?"
    answer: "Ein einzelnes Update-Tool mit dem Hook pilotieren und gezielt sowohl eine Ablehnung als auch einen defekten Workflow testen."
  - question: "Was kann ein Post-Call-Hook nach einem Dataverse-Update-Tool-Aufruf tun?"
    answer: "Er kann die Aktivität protokollieren oder das zurückgegebene Ergebnis anpassen, was zeigt, was der Agent tatsächlich geändert hat."
---

## TL;DR

Copilot Studio Preview-Hooks für Agents mit dem GitHub-Copilot-Harness können Workflows bei sechs Lebenszyklusereignissen ausführen. Ein Hook vor dem Tool-Aufruf kann Argumente prüfen oder ändern und Aufrufe ablehnen. Fehler, Timeouts oder unlesbare Antworten lassen den Agenten jedoch weiterlaufen.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Einen Update-Tool-Aufruf mit einem Vorab-Hook pilotieren und sowohl eine Ablehnung als auch einen defekten Workflow testen.
- Admins/IT: Verbindliche Autorisierung und Geschäftsregeln im zugrunde liegenden Dienst durchsetzen, weil ein fehlerhafter Hook den Agenten nicht blockiert.
- BI/Data teams: Bei Dataverse-Szenarien Aktivitäten von Update-Tools protokollieren und prüfen, dass abgelehnte Anfragen keine Geschäftsregeln verletzen.

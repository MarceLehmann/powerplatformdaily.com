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
  - question: "An welchen sechs Stellen kann ein Hook in Copilot Studio einen Workflow ausführen?"
    answer: "Hooks laufen beim Start einer Sitzung, beim Absenden eines Prompts, bei einem Agentenfehler, vor dem Start eines Tools, nach einem erfolgreichen Toolaufruf und nach einem fehlgeschlagenen Toolaufruf. An diesen Ereignissen löst der Hook einen Power-Automate-Workflow aus. Die Funktion ist in der Preview und gilt für Agenten, die das GitHub-Copilot-Harness verwenden."
  - question: "Was kann ein Before-Tool-Hook mit einem Toolaufruf anstellen?"
    answer: "Er kann die Argumente des Aufrufs prüfen, verändern oder den Aufruf ganz ablehnen, bevor das Tool läuft. Damit lassen sich Änderungsanfragen früh kontrollieren. Der Beitrag rät, mit einem einzigen Update-Tool zu starten und sowohl eine ausdrückliche Ablehnung als auch einen absichtlich kaputten Workflow zu testen, bevor du das Setup ausweitest."
  - question: "Was passiert, wenn der Workflow eines Copilot-Studio-Hooks fehlschlägt oder abläuft?"
    answer: "Der Agent arbeitet einfach weiter. Ein fehlgeschlagener Workflow, eine Zeitüberschreitung oder eine unlesbare Antwort stoppt ihn nicht, ein Hook ist also keine harte Sperre. Teste deshalb gezielt einen defekten Workflow, denn dieses Verhalten entscheidet, ob eine in einem Hook abgelegte Regel wirklich durchgesetzt wird."
  - question: "Wo gehören verbindliche Berechtigungsregeln hin, wenn Hooks im Fehlerfall durchlassen?"
    answer: "In den zugrunde liegenden Dienst, nicht in den Hook. Laut Microsoft gehören Autorisierung und Geschäftsregeln dorthin, weil ein fehlerhafter Hook den Agenten nicht aufhält. Hooks bleiben nützlich zum Prüfen, Anpassen von Argumenten und Protokollieren, doch der Dienst muss Anfragen, die gegen deine Regeln verstossen, selbst ablehnen."
  - question: "Wie helfen Post-Call-Hooks bei Update-Tools auf Dataverse?"
    answer: "Nach einem erfolgreichen Toolaufruf kann ein Hook das zurückgegebene Ergebnis anpassen oder die Aktivität protokollieren. Für Dataverse-Szenarien empfiehlt der Beitrag, die Aktivität der Update-Tools zu protokollieren und zu prüfen, dass abgelehnte Anfragen keine Geschäftsregeln verletzen. So bleibt eine Spur dessen, was der Agent getan hat."
---

## TL;DR

Copilot Studio Preview-Hooks für Agents mit dem GitHub-Copilot-Harness können Workflows bei sechs Lebenszyklusereignissen ausführen. Ein Hook vor dem Tool-Aufruf kann Argumente prüfen oder ändern und Aufrufe ablehnen. Fehler, Timeouts oder unlesbare Antworten lassen den Agenten jedoch weiterlaufen.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Einen Update-Tool-Aufruf mit einem Vorab-Hook pilotieren und sowohl eine Ablehnung als auch einen defekten Workflow testen.
- Admins/IT: Verbindliche Autorisierung und Geschäftsregeln im zugrunde liegenden Dienst durchsetzen, weil ein fehlerhafter Hook den Agenten nicht blockiert.
- BI/Data teams: Bei Dataverse-Szenarien Aktivitäten von Update-Tools protokollieren und prüfen, dass abgelehnte Anfragen keine Geschäftsregeln verletzen.

---
title: Copilot Studio Agentenkosten pro Testunterhaltung messen
description: Laut Quelle vom 27.11.2026 zeigt Copilot Studio Preview beim Test laufende
  Credit-Schätzungen pro Unterhaltung, und Agent 365 Ausgabenrichtlinien schliessen
  AI-Builder-Nutzung aus.
date: '2026-11-28T07:19:41Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- licensing
- ai-builder
content_type: curated_summary
curation_id: a4dbe736335e80322610f67f
image:
  path: "/assets/img/curated/a4dbe736335e80322610f67f.png"
  alt: 'News-Karte: Copilot Studio shows a running credit estimate while you test,
    so you can price one agent task before you ship it.'
permalink: "/de/posts/measure-copilot-studio-agent-costs-one-test-conversation-at-a-time-a4dbe736/"
translation_url: "/en/posts/measure-copilot-studio-agent-costs-one-test-conversation-at-a-time-a4dbe736/"
source_url: https://flowaltdelete.ca/2026/11/27/copilot-studio-agent-costs-ai-weekly-november-27-2026/
source_site_url: https://flowaltdelete.ca/
source_title: 'AI Weekly: How to Measure Copilot Studio Agent Costs'
source_name: Flow Alt Delete
source_language: en
source_language_name: English
source_author: Josh Cook
source_published_at: '2026-11-27'
source_type: article
faq:
- question: Wo zeigt Copilot Studio die Credit-Schätzung für eine einzelne Testunterhaltung
    an?
  answer: Copilot Studio Preview zeigt während des Testens eine laufende Schätzung
    an, sodass sich die Kosten jeder Unterhaltung vor dem Livegang ablesen lassen.
- question: Wie rechne ich den Creditverbrauch eines Copilot Studio Agents für einen
    Piloten hoch?
  answer: Man teilt die Credits aller Versuche, Wiederholungen eingeschlossen, durch
    die tatsächlich gelösten Aufgaben und behandelt Grader-Kosten als Einmalaufwand.
- question: Decken Agent 365 Ausgabenrichtlinien auch AI Builder Nutzungen ab?
  answer: Nein. Diese Ressourcenrichtlinien schliessen AI Builder laut Microsoft aus;
    abhängige Workloads sollten auf dem bestehenden Setup bleiben.
---

## TL;DR

Copilot Studio Preview zeigt beim Testen eines Agents eine laufende Credit-Schätzung pro Testunterhaltung; das Beispiel eines Angebotsprüfungs-Agents von Microsoft blieb bei geschätzten 60,54 Credits und empfahl eine menschliche Prüfung. Die Pilotkennzahl teilt die Gesamtcredits inklusive Wiederholungen durch die tatsächlich gelösten Aufgaben. Agent 365 Ausgabenrichtlinien waren laut Quelle vom 27.11.2026 in öffentlicher Vorschau und schliessen AI Builder aus.

## Warum das wichtig ist

- Maker: Zwei Testunterhaltungen für dieselbe Aufgabe ausführen, in Preview die Credit-Schätzung je Lauf ablesen und die Gesamtcredits inklusive Wiederholungen durch die gelösten Aufgaben teilen, bevor ein Pilot bepreist wird; Grader-Kosten als Einmalkosten aus der Produktionsschätzung halten.
- Admins/IT: Agent 365 Ausgabenrichtlinien, laut Quelle vom 27.11.2026 in öffentlicher Vorschau, mit einer Pilotumgebung beginnen, die Person für Warnungen benennen und prüfen, ob der Agentfluss AI Builder nutzt, den diese Ressourcenrichtlinien ausschliessen.

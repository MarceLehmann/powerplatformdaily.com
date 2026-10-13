---
title: Copilot Studio bringt Agentenlogik direkt in Workflows
description: Die neue Workflow-Erfahrung von Copilot Studio ergänzt visuelle Agentenknoten,
  strukturierte Ausgaben, Knotentests und Auswertungen neben deterministischen Aktionen.
date: '2026-10-13T17:08:35Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- licensing
- roadmap
content_type: curated_summary
curation_id: 7af005ad2b78c404627fec10
image:
  path: "/assets/img/curated/7af005ad2b78c404627fec10.png"
  alt: 'News-Karte: Copilot Studio workflows can now place reasoning directly beside
    deterministic actions.'
permalink: "/de/posts/copilot-studio-workflows-put-agent-reasoning-directly-into-the-process-7af005ad/"
translation_url: "/en/posts/copilot-studio-workflows-put-agent-reasoning-directly-into-the-process-7af005ad/"
source_url: https://holgerimbery.blog/copilot-studio-workflows-new-experience
source_site_url: https://holgerimbery.blog/
source_title: 'Workflows in the Copilot Studio: What the Agent Node Actually Changes'
source_name: Holger Imbery - fieldnotes and insights
source_language: en
source_language_name: English
source_author: Holger Imbery
source_published_at: '2026-09-01'
source_type: article
faq:
- question: Welche Agententypen kann ich in einem Copilot-Studio-Workflowknoten auswählen?
  answer: Der Knoten kann einen bestehenden veröffentlichten Agenten aufrufen oder
    einen auf den Workflow begrenzten Inline-Agenten erstellen. Inline-Agenten sind
    nicht zwischen Workflows wiederverwendbar.
- question: Wie hilft die Einstellung zur strukturierten Ausgabe in Copilot-Studio-Workflows?
  answer: Benannte Felder werden als dynamische Inhaltstoken verfügbar. Nachfolgende
    Schritte können dadurch Werte prüfen oder sie direkt in Dataverse-Spalten schreiben.
- question: Welche Grenzen gelten für Auswertungen in Copilot-Studio-Workflows?
  answer: Auswertungen gelten nur für neue, in Workflows erstellte Agenten, erlauben
    bis zu fünf automatisch erzeugte Testmethoden und 20 Auswertungsläufe je Knoten
    täglich. Eigene Modelle sind nicht verfügbar.
---

## TL;DR

Die neue Workflow-Erfahrung von Copilot Studio platziert einen Agentenknoten neben deterministischen Aktionen auf einer visuellen Arbeitsfläche. Maker können veröffentlichte oder workflowgebundene Inline-Agenten verwenden, strukturierte Ausgaben erzeugen, menschliche Hilfe anfordern, Knoten einzeln testen und neue Inline-Agenten mit festgelegten Grenzen auswerten.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Erstelle zuerst das deterministische Grundgerüst und füge den Agentenknoten nur dort ein, wo unstrukturierte Eingaben oder Beurteilungen feste Regeln überfordern. Definiere das Ausgabeschema vor den Anweisungen, damit nachfolgende Schritte Felder direkt verwenden können.
- Admins/IT: Wähle den GitHub-Copilot-Harness bewusst und plane nutzungsbasierte Abrechnung für Erstellung, Tests, Auswertungen und Laufzeit ein. Behandle Workflows und MCP-Server als Agententools bei Produktionsplanungen als Vorschaufunktionen.

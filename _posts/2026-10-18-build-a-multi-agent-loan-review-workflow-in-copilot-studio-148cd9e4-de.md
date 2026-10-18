---
title: Multi-Agenten-Workflow zur Kreditprüfung in Copilot Studio erstellen
description: Dieser Copilot-Studio-Workflow extrahiert PDF-Felder, prüft Anträge,
  gleicht Kreditzwecke mit SharePoint ab und versendet eine Entscheidung per E-Mail.
date: '2026-10-18T16:54:37Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- connectors
- dataverse
content_type: curated_summary
curation_id: 148cd9e4326fc7339b2173d4
image:
  path: "/assets/img/curated/148cd9e4326fc7339b2173d4.png"
  alt: 'News-Karte: Copilot Studio can split one review across agents that extract,
    validate, reason, and respond.'
permalink: "/de/posts/build-a-multi-agent-loan-review-workflow-in-copilot-studio-148cd9e4/"
translation_url: "/en/posts/build-a-multi-agent-loan-review-workflow-in-copilot-studio-148cd9e4/"
source_url: https://www.matthewdevaney.com/how-to-build-multi-agent-workflows-in-copilot-studio/
source_site_url: https://www.matthewdevaney.com/
source_title: How To Build Multi-Agent Workflows In Copilot Studio
source_name: Matthew Devaney
source_language: en
source_language_name: English
source_author: Matthew Devaney
source_published_at: '2026-09-13'
source_type: article
faq:
- question: Wie startet Copilot Studio eine Kreditprüfung nach dem Hochladen einer
    PDF?
  answer: Ein Connector-Trigger verwendet SharePoint When A File Is Created. Danach
    übergibt Get File Content den hochgeladenen PDF-Inhalt an einen Agenten.
- question: Wie prüft der Copilot-Studio-Workflow die Felder eines Kreditantrags?
  answer: Feste Ausdrücke speichern die Prüfregeln in einem Array. Ein Filter Array
    lässt anschliessend nur fehlgeschlagene Prüfungen und Fehlermeldungen weiterlaufen.
- question: Wie gleicht ein Copilot-Studio-Agent den Kreditzweck mit SharePoint ab?
  answer: Ein Wissens-Agent durchsucht die SharePoint-Liste Loan Purposes und gibt
    Approved oder Flagged zurück, parallel zu den festen Prüfregeln.
---

## TL;DR

Copilot Studio koordiniert mehrere Agenten für einen Kreditantrag: SharePoint liefert den PDF-Inhalt, ein Agent extrahiert strukturierte Felder, parallele Prüfungen validieren Regeln und Kreditzwecke, und ein letzter Agent erstellt die Zusage oder Absage per E-Mail.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Teilt komplexe Prüfungen auf fokussierte Agenten auf und nutzt strukturierte Ausgaben für PDF-Felder sowie parallele Zweige für unabhängige Prüfungen.
- Makers: Testet veröffentlichte Workflows mit unterschiedlichen Antragswerten, damit erwartete und tatsächliche Ergebnisse der festen Regeln verglichen werden können.
- Admins/IT: Richtet die SharePoint-Dokumentbibliothek und die Liste der Kreditzwecke ein, da der Workflow beide als Trigger- und Wissensquelle verwendet.

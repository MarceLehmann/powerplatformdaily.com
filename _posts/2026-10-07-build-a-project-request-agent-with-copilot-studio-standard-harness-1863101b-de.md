---
title: Projektanfrage-Agent mit dem Standard Harness in Copilot Studio erstellen
description: Diese Anleitung zeigt einen strukturierten Copilot Studio-Agenten, der
  Projektdaten sammelt und SharePoint-Einträge über Flows erstellt oder abruft.
date: '2026-10-07T17:10:11Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- power-automate
- connectors
content_type: curated_summary
curation_id: 1863101bc5734d7d27772035
image:
  path: "/assets/img/curated/1863101bc5734d7d27772035.png"
  alt: 'News-Karte: Copilot Studio agents can collect project details and call flows
    to create or retrieve SharePoint records.'
permalink: "/de/posts/build-a-project-request-agent-with-copilot-studio-standard-harness-1863101b/"
translation_url: "/en/posts/build-a-project-request-agent-with-copilot-studio-standard-harness-1863101b/"
source_url: https://www.divyaakula.com/copilotstudio/2026/08/16/Creating-Agents-With-Standard-Harness.html
source_site_url: https://www.divyaakula.com/
source_title: Building a Project Request Agent with the Standard Harness
source_name: Divya Akula
source_language: en
source_language_name: English
source_author: Divya Akula
source_published_at: '2026-08-16'
source_type: article
faq:
- question: Wie speichert der Projektanfrage-Agent in Copilot Studio Anfragen in SharePoint?
  answer: Der Agent sammelt die erforderlichen Projektdaten und ruft einen Flow auf,
    der einen Eintrag in der SharePoint-Liste Project Requests erstellt.
- question: Welche Bausteine verwendet der Projektanfrage-Agent in Copilot Studio?
  answer: Das Beispiel verwendet Anweisungen, Themen, Knoten, Variablen und Tools.
    Frage- und Bedingungsknoten steuern Datenerfassung und Verzweigungen innerhalb
    der Themen.
- question: Wie kann ein Copilot Studio-Agent den Status einer bestehenden Projektanfrage
    prüfen?
  answer: Ein Statusthema ermöglicht die Abfrage einer bekannten Anfrage und ruft
    einen Flow auf, der die Anfrage findet und ihren aktuellen Status zurückgibt.
animation:
  src: /assets/img/animations/1863101bc5734d7d27772035-de.gif
  poster: /assets/img/animations/1863101bc5734d7d27772035-de.poster.png
  width: 800
  height: 450
  alt: "Ein Ablauf in vier Schritten zeigt einen Copilot Studio-Agenten mit Anweisungen und Themen, der Projektdaten in Variablen sammelt und dann Power Automate aufruft, um einen SharePoint-Eintrag zu erstellen oder abzurufen."
---

## TL;DR

Die neue Copilot Studio-Oberfläche erstellt einen Projektanfrage-Agenten mit Anweisungen, Themen, Knoten, Variablen und Tools. Zwei Power Automate-Flows erfassen Projektdaten, erstellen SharePoint-Listeneinträge oder rufen den aktuellen Status ab.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Erstellt geführte Themen mit Frage- und Bedingungsknoten und speichert Projektdaten in Variablen, bevor der passende Flow aufgerufen wird.
- Makers: Verwendet einen Flow zum Erstellen eines SharePoint-Eintrags und einen weiteren zum Abrufen des Status, damit die festen Prozessschritte ausserhalb des Agenten bleiben.
- Admins/IT: Stellt vor dem Testen den Zugriff auf Copilot Studio, Power Platform und eine SharePoint-Website sicher, auf der die benötigte Liste erstellt werden kann.

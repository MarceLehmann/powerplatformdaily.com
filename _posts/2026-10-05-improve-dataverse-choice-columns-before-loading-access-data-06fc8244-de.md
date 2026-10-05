---
title: Dataverse Choice-Spalten vor dem Laden von Access-Daten verbessern
description: Transformierte Access-Daten prüfen, das Dataverse-Datenmodell verbessern
  und vor dem Import lokale oder globale Choice-Spalten wählen.
date: '2026-10-05T16:57:54Z'
author: news_editorial
lang: de
toc: false
tags:
- dataverse
- power-apps
content_type: curated_summary
curation_id: 06fc8244b0dfc8ed156e7a97
image:
  path: "/assets/img/curated/06fc8244b0dfc8ed156e7a97.png"
  alt: 'News-Karte: Improve Dataverse data quality before importing Access data. Choose
    local or global Choice columns for consistent values.'
permalink: "/de/posts/improve-dataverse-choice-columns-before-loading-access-data-06fc8244/"
translation_url: "/en/posts/improve-dataverse-choice-columns-before-loading-access-data-06fc8244/"
source_url: https://charleslakes.com/2026/06/26/solution-rebuild-part-2-database-access-to-dataverse-loading/
source_site_url: https://charleslakes.com/
source_title: 'Solution Rebuild: Part #2 | Database – Access to Dataverse (Loading)'
source_name: charleslakes.com
source_language: en
source_language_name: English
source_author: Charles
source_published_at: '2026-06-26'
source_type: article
faq:
- question: Wie verbessern Choice-Spalten den Import von Access-Daten nach Dataverse?
  answer: Choice-Spalten ersetzen wiederholte Freitextwerte durch festgelegte Optionen
    und können dadurch uneinheitliche Eingaben beim Dataverse-Laden verringern.
- question: Was ist der Unterschied zwischen lokalen und globalen Choices in Dataverse?
  answer: Lokale Choices gehören zu einer Tabelle. Globale Choices werden in Lösungen
    erstellt und können von Tabellen in der Umgebung verwendet werden.
- question: Wann sollte eine globale Choice in Dataverse verwendet werden?
  answer: Eine globale Choice eignet sich, wenn mehrere Tabellen in der Umgebung denselben
    Satz von Optionen benötigen.
---

## TL;DR

Vor dem Laden transformierter Microsoft-Access-Daten in Dataverse sollte das Datenmodell geprüft werden. Wiederholte Textwerte können bei Bedarf durch Choice-Spalten ersetzt werden. Lokale Choices gehören zu einer Tabelle, globale Choices werden in Lösungen erstellt und können von mehreren Tabellen in der Umgebung genutzt werden. Entscheidend ist der geplante Wiedergebrauch.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Transformierte Access-Daten vor dem Import prüfen und wiederholte Werte als Choice-Spalten modellieren, weil feste Optionen uneinheitliche Eingaben verringern können.
- Admins/IT: Für jede Choice die Wiederverwendung bewerten, weil globale Choices in Lösungen erstellt und von mehreren Tabellen der Umgebung genutzt werden können.

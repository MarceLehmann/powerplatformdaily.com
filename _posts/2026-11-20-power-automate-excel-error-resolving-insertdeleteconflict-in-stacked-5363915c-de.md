---
title: 'Power Automate und Excel: InsertDeleteConflict bei gestapelten Tabellen beheben'
description: Unterschiedlich aufgebaute, gestapelte Excel-Tabellen können die Aktion
  Add a row in Power Automate mit InsertDeleteConflict fehlschlagen lassen.
date: '2026-11-20T13:26:21Z'
author: news_editorial
lang: de
toc: false
tags:
- power-automate
- connectors
- ai-builder
content_type: curated_summary
curation_id: 5363915ca6467e5505822bba
image:
  path: "/assets/img/curated/5363915ca6467e5505822bba.png"
  alt: 'News-Karte: Power Automate can fail when adding rows to stacked Excel tables
    with different column structures.'
permalink: "/de/posts/power-automate-excel-error-resolving-insertdeleteconflict-in-stacked-5363915c/"
translation_url: "/en/posts/power-automate-excel-error-resolving-insertdeleteconflict-in-stacked-5363915c/"
source_url: https://veronicageek.com/2026/power-automate-flow-error-with-excel-connectors-graph-api-conflict-response-error-code-is-insertdeleteconflict/
source_site_url: https://veronicageek.com/
source_title: 'Power Automate flow error with Excel connectors: Graph API conflict
  response, InsertDeleteConflict'
source_name: Veronique's Blog
source_language: en
source_language_name: English
source_author: Veronique Lengelle
source_published_at: '2026-11-20'
source_type: article
faq:
- question: Warum meldet Add a row in Power Automate bei Excel InsertDeleteConflict?
  answer: Der Fehler entsteht, wenn Add a row Zellen in einem Arbeitsblatt mit unterschiedlich
    aufgebauten, gestapelten Tabellen verschieben müsste.
- question: Welches Excel-Tabellenlayout kann den Connector-Konflikt in Power Automate
    auslösen?
  answer: Eine untere Tabelle mit einer zusätzlichen Spalte kann dazu führen, dass
    der Connector beim Einfügen einer Zeile fehlschlägt.
- question: Wie vermeide ich InsertDeleteConflict bei gestapelten Excel-Tabellen in
    Power Automate?
  answer: Verwendet Office Scripts für das gestapelte Layout oder legt die Tabellen
    auf separate Arbeitsblätter, um diese Connector-Einschränkung zu umgehen.
---

## TL;DR

Der Excel-Connector von Power Automate kann InsertDeleteConflict melden, wenn Add a row Zellen in einem Arbeitsblatt mit unterschiedlich aufgebauten, gestapelten Tabellen verschieben müsste. Als Auswege nennt die Quelle Office Scripts oder separate Arbeitsblätter für die Tabellen.

## Warum das wichtig ist

- Makers: Prüft bei einem Fehler von Add a row, ob gestapelte Excel-Tabellen unterschiedlich viele Spalten haben, weil der Connector Zellen dann möglicherweise nicht verschieben kann.
- Makers: Verwendet für dieses Layout Office Scripts oder legt jede Tabelle auf ein eigenes Arbeitsblatt, um die genannte Connector-Einschränkung zu vermeiden.

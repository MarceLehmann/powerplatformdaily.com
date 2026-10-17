---
title: SQL 4 CDS 10.4 erweitert CSV-Import und laufende Abfragen
description: SQL 4 CDS 10.4 importiert CSV-Daten in Dataverse, zeigt Ergebnisse während
  der Ausführung, unterstützt Textausgabe und liefert zusätzliche Metadaten.
date: '2026-10-17T16:53:22Z'
author: news_editorial
lang: de
toc: false
tags:
- dataverse
content_type: curated_summary
curation_id: 0e9513d301fa06a710b21d9f
image:
  path: "/assets/img/curated/0e9513d301fa06a710b21d9f.png"
  alt: 'News-Karte: SQL 4 CDS 10.4 adds CSV imports, live query results and richer
    Dataverse metadata.'
permalink: "/de/posts/sql-4-cds-10-4-adds-csv-imports-and-live-query-results-0e9513d3/"
translation_url: "/en/posts/sql-4-cds-10-4-adds-csv-imports-and-live-query-results-0e9513d3/"
source_url: https://markcarrington.dev/2026/05/22/sql-4-cds-10-4-released/?utm_source=rss&utm_medium=rss&utm_campaign=sql-4-cds-10-4-released
source_site_url: https://markcarrington.dev/
source_title: SQL 4 CDS 10.4 Released
source_name: Mark Carrington
source_language: en
source_language_name: English
source_author: Mark Carrington
source_published_at: '2026-05-22'
source_type: article
faq:
- question: Wie importiert SQL 4 CDS 10.4 eine CSV-Datei nach Dataverse?
  answer: SQL 4 CDS 10.4 verwendet OPENROWSET mit FORMAT='CSV' in einer SELECT-Anweisung,
    die INSERT, UPDATE oder DELETE speisen kann.
- question: Welche Mathematikfunktionen unterstützt SQL 4 CDS 10.4?
  answer: Die Version ergänzt ABS, SIGN, CEILING, FLOOR und ROUND für SQL 4 CDS-Abfragen.
- question: Welche zusätzlichen statecode- und statuscode-Metadaten zeigt SQL 4 CDS
    10.4?
  answer: Die Tabelle metadata.optionsetvalue liefert nun passende Informationen zu
    defaultstatus, state, invariantname und transitiondata für statecode und statuscode.
---

## TL;DR

SQL 4 CDS 10.4 nutzt OPENROWSET für CSV-Importe nach Dataverse, einschliesslich mehrerer Dateien, Dateimetadaten und Zeichencodierung. Das Ergebnisraster füllt sich bereits während der Abfrage, Textausgabe ist verfügbar, fünf Mathematikfunktionen kommen hinzu und statecode sowie statuscode erhalten zusätzliche Metadatenspalten.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Nutzt OPENROWSET mit FIRSTROW, Dateiformatoptionen und CODEPAGE für CSV-Importe nach Dataverse, besonders bei Kopfzeilen oder Sonderzeichen.
- BI/Data teams: Verwendet Platzhalter sowie filename oder filepath für mehrere Dateien und prüft laufende Ergebnisse oder die Textansicht bei langen Abfragen.
- Makers: Prüft die erweiterten statecode- und statuscode-Metadaten, wenn Standardstatus, zugehöriger Zustand oder benutzerdefinierte Übergänge relevant sind.

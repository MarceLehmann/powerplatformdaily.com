---
title: Verwandte Dataverse-Daten mit Expand Query in Power Automate abrufen
description: Die Dataverse-Aktion Get a Row by ID mit Expand Query konfigurieren und
  verwandte Felder später per benutzerdefiniertem Ausdruck verwenden.
date: '2026-10-09T16:52:56Z'
author: news_editorial
lang: de
toc: false
tags:
- power-automate
- dataverse
content_type: curated_summary
curation_id: 7821fe4cb54b93a32c9d9aca
image:
  path: "/assets/img/curated/7821fe4cb54b93a32c9d9aca.png"
  alt: 'News-Karte: Power Automate can retrieve related Dataverse data with Expand
    Query.'
permalink: "/de/posts/use-expand-query-to-retrieve-related-dataverse-data-in-power-automate-7821fe4c/"
translation_url: "/en/posts/use-expand-query-to-retrieve-related-dataverse-data-in-power-automate-7821fe4c/"
source_url: https://citizendeveloper365.com/how-to-use-expand-query-in-power-automate/
source_site_url: https://citizendeveloper365.com/
source_title: 'Updated: How to Use Expand Query in Power Automate'
source_name: Citizen Developer
source_language: en
source_language_name: English
source_author: Griffin Lickfeldt
source_published_at: '2026-02-04'
source_updated_at: '2026-02-04'
source_type: article
faq:
- question: Wie rufe ich verwandte Dataverse-Spalten mit Expand Query in Power Automate
    ab?
  answer: Verwende das Feld Expand Query in Dataverse Get a Row by ID mit einem OData-Ausdruck,
    um Daten der verwandten Tabelle anzufordern.
- question: Wie begrenze ich die zurückgegebenen Felder einer Dataverse-Verknüpfung
    in Power Automate?
  answer: Füge $select nach der Navigationseigenschaft ein und liste die benötigten
    Spalten wie contactid und fullname des verwandten Datensatzes auf.
- question: Wie verwende ich erweiterte Dataverse-Daten in einer späteren Flow-Aktion?
  answer: Verwende einen Body-Ausdruck mit Aktionsname, SchemaName des Lookup-Felds
    und logischem Spaltennamen, um den erweiterten Wert abzurufen.
---

## TL;DR

Die Dataverse-Aktion Get a Row by ID in Power Automate verwendet eine OData-Abfrage mit Expand Query, um Daten verwandter Tabellen abzurufen. Der Leitfaden zeigt primarycontactid($select=contactid,fullname) und den Zugriff auf die erweiterten Werte mit einem Body-Ausdruck in nachfolgenden Aktionen.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Die Navigationseigenschaft der verwandten Tabelle in Expand Query eintragen und mit $select gezielt Spalten wie contactid und fullname anfordern.
- Makers: Erweiterte Werte mit einem benutzerdefinierten Body-Ausdruck abrufen, wenn sie nicht im Bereich Dynamischer Inhalt erscheinen, damit spätere Aktionen die verknüpften Daten nutzen können.

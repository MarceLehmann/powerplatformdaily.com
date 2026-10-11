---
title: Dataverse-Bilder aus Power Apps an Dynamics 365 F&SC senden
description: Eine Canvas-App kann Dataverse-Bilder, Fotos und Unterschriften per Power
  Fx an Anlagen in Dynamics 365 Finance and Supply Chain senden.
date: '2026-10-11T16:55:41Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
- dataverse
- connectors
content_type: curated_summary
curation_id: e5fac71ddd201e4dbe19d335
image:
  path: "/assets/img/curated/e5fac71ddd201e4dbe19d335.png"
  alt: 'News-Karte: Canvas apps can patch Dataverse images into Dynamics 365 Finance
    and Supply Chain attachments.'
permalink: "/de/posts/patch-dataverse-images-into-dynamics-365-finance-and-supply-chain-e5fac71d/"
translation_url: "/en/posts/patch-dataverse-images-into-dynamics-365-finance-and-supply-chain-e5fac71d/"
source_url: https://thepoweraddict.com/how-to-patch-images-from-dataverse-to-d365-fsc/?utm_source=rss&utm_medium=rss&utm_campaign=how-to-patch-images-from-dataverse-to-d365-fsc
source_site_url: https://thepoweraddict.com/
source_title: How to patch images from Dataverse to D365 F&SC
source_name: The Power Addict
source_language: en
source_language_name: English
source_author: Hardit Bhatia
source_published_at: '2026-03-31'
source_updated_at: '2026-03-31'
source_type: article
faq:
- question: Wie wandelt eine Canvas-App ein Dataverse-Bild für eine D365-F&SC-Anlage
    um?
  answer: Die Formel serialisiert das Bild mit JSON und IncludeBinaryData und extrahiert
    anschliessend den Base64-Inhalt für das Feld Archive file.
- question: In welche D365-F&SC-Tabelle werden Dataverse-Bilder geschrieben?
  answer: Die Bilder werden mit Defaults und Patch in die Tabelle Sales order header
    document attachments V2 geschrieben, wobei je Anlage ein Datensatz entsteht.
- question: Wie wird eine Kundenunterschrift zusammen mit Dataverse-Fotos in D365
    F&SC gespeichert?
  answer: Ein separater Patch verwendet penSignature.Image und schreibt Dateiname,
    PNG-Typ, Beschreibung sowie den Archive-file-Inhalt in dieselbe Anlagentabelle.
---

## TL;DR

Power Apps nutzt ForAll und Patch, um verknüpfte Dataverse-Bilder an die Tabelle für Anlagen von Verkaufsauftragsköpfen in D365 Finance and Supply Chain zu senden. JSON mit IncludeBinaryData wandelt jedes Bild oder jede Unterschrift in Base64-Inhalt für das Feld Archive file um. Dateiname, Typ und Beschreibung werden ebenfalls gesetzt.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Verarbeitet verknüpfte Dataverse-Bilddatensätze mit ForAll und Patch, damit Anlagen dem ausgewählten Verkaufsauftrag in D365 Finance and Supply Chain zugeordnet werden.
- Makers: Wandelt jedes Bild mit JSON und JSONFormat.IncludeBinaryData um und extrahiert den Base64-Inhalt für Archive file, damit D365 die Anlage speichern kann.
- Makers: Fügt penSignature.Image mit einem separaten Patch hinzu, wenn eine Kundenunterschrift zusammen mit Lieferfotos gespeichert werden soll.

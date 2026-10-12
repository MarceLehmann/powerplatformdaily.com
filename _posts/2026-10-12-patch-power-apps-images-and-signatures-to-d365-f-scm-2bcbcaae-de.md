---
title: Bilder und Unterschriften aus Power Apps an D365 F&SCM senden
description: Nutze Kamera oder Bild hinzufügen in einer Canvas-App, wandle Bilder
  in Base64 um und schreibe sie als Anlagen nach D365 F&SCM.
date: '2026-10-12T16:57:22Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
- connectors
content_type: curated_summary
curation_id: 2bcbcaae86f030e22c6ba031
image:
  path: "/assets/img/curated/2bcbcaae86f030e22c6ba031.png"
  alt: 'News-Karte: Power Apps can upload camera photos and signatures to D365 F&SCM
    attachments.'
permalink: "/de/posts/patch-power-apps-images-and-signatures-to-d365-f-scm-2bcbcaae/"
translation_url: "/en/posts/patch-power-apps-images-and-signatures-to-d365-f-scm-2bcbcaae/"
source_url: https://thepoweraddict.com/how-to-patch-images-from-power-apps-to-d365-fscm/?utm_source=rss&utm_medium=rss&utm_campaign=how-to-patch-images-from-power-apps-to-d365-fscm
source_site_url: https://thepoweraddict.com/
source_title: How to Patch Images from Power Apps to D365 F&SCM
source_name: The Power Addict
source_language: en
source_language_name: English
source_author: Hardit Bhatia
source_published_at: '2026-03-30'
source_updated_at: '2026-03-31'
source_type: article
faq:
- question: Wie schreibe ich Kamerabilder aus Power Apps nach D365 F&SCM?
  answer: Sammle den Kamerastream in einer Collection und verwende anschliessend ForAll
    sowie Patch, um Anlagen für den Auftrag in D365 F&SCM anzulegen.
- question: Welcher Wert gehört für Bilder aus Power Apps in das Feld Archive file?
  answer: Das Feld Archive file erhält den Base64-Inhalt des Bildes, der aus der JSON-Ausgabe
    mit JSONFormat.IncludeBinaryData extrahiert wird.
- question: Braucht Bild hinzufügen in Power Apps eine andere Upload-Formel für D365
    F&SCM?
  answer: Nur die Capture-Formel ändert sich und verwendet das Bildsteuerelement innerhalb
    von Bild hinzufügen. Die Upload-Formel bleibt unverändert.
---

## TL;DR

Eine Canvas-App kann Kamerafotos oder Bilder aus Bild hinzufügen sammeln, jedes Bild mit JSON und IncludeBinaryData in Base64 umwandeln und an die Anlagen des D365 F&amp;SCM-Auftrags schreiben. Die Unterschrift wird separat mit demselben Archive-file-Muster gespeichert. Bei Bild hinzufügen ändert sich nur die Capture-Formel.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Speichert jedes aufgenommene Bild mit eindeutiger ID, ausgewähltem Auftrag und Bildwert und nutzt ForAll sowie Patch für D365-F&amp;SCM-Anlagen.
- Makers: Verwendet JSON mit IncludeBinaryData und extrahiert die Base64-Daten für das Feld Archive file, weil dieses Feld die Bilddaten übernimmt.
- Admins/IT: Richtet die Verbindung der Canvas-App zur virtuellen D365-F&amp;SCM-Entität und zur Anlagentabelle ein, da dieses Muster diese Datenquellen verwendet.

---
title: Fortschrittsbalken für mehrseitige Power-Apps-Formulare erstellen
description: Zwei Rechtecke, ein Label und eine globale Schrittvariable zeigen den
  Fortschritt in einem Power-Apps-Formular mit sieben Screens.
date: '2026-10-03T19:05:50Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
content_type: curated_summary
curation_id: 86f1c2a743055090701806fa
image:
  path: "/assets/img/curated/86f1c2a743055090701806fa.png"
  alt: 'News-Karte: Build a multi-screen form progress bar with three controls and
    one variable.'
permalink: "/de/posts/build-a-power-apps-progress-bar-for-multi-screen-forms-86f1c2a7/"
translation_url: "/en/posts/build-a-power-apps-progress-bar-for-multi-screen-forms-86f1c2a7/"
source_url: https://365-anouck.be/building-a-simple-progress-bar-for-a-multi-screen-power-apps-form/
source_site_url: https://365-anouck.be/
source_title: Building a Simple Progress Bar for a Multi-Screen Power Apps Form
source_name: 365-ANOUCK
source_language: en
source_language_name: English
source_author: Anouck
source_published_at: '2026-07-01'
source_type: article
---

## TL;DR

Ein Power-Apps-Canvas-Formular kann Fortschritt mit einem recTrack-Rechteck, einem recFill-Rechteck und einem Textlabel anzeigen. Jeder Screen setzt gblStep in OnVisible. recFill.Width berechnet sich aus recTrack.Width multipliziert mit gblStep geteilt durch gblTotalSteps. Eine Komponente, responsives Layout und AccessibleLabel verbessern Wiederverwendung und Barrierefreiheit.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Setzt gblStep in der OnVisible-Eigenschaft jedes Screens und berechnet die Füllbreite aus gblStep und gblTotalSteps.
- Makers: Ersetzt fest codierte Gesamtwerte durch gblTotalSteps und erwägt eine Canvas-Komponente, um das Balkendesign zentral zu ändern.
- Makers: Behaltet ein Textlabel für den Schritt bei und ergänzt AccessibleLabel, damit Fortschritt nicht nur über Farbe vermittelt wird.

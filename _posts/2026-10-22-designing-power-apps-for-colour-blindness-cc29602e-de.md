---
title: Power Apps für Farbenblindheit gestalten
description: Icons, Textlabels, verständliche Fehlermeldungen, Kontrastprüfungen und
  Graustufentests verhindern, dass Power Apps nur über Farben kommunizieren.
date: '2026-10-22T16:51:30Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
content_type: curated_summary
curation_id: cc29602e8c6f0f9f0df51a23
image:
  path: "/assets/img/curated/cc29602e8c6f0f9f0df51a23.png"
  alt: 'News-Karte: Power Apps should never use colour as the only signal of meaning.'
permalink: "/de/posts/designing-power-apps-for-colour-blindness-cc29602e/"
translation_url: "/en/posts/designing-power-apps-for-colour-blindness-cc29602e/"
source_url: https://paulienbuskens.com/2026/02/07/designing-for-color-blindness-in-power-apps/
source_site_url: https://paulienbuskens.com/
source_title: Designing for Color Blindness in Power Apps
source_name: Pauliens Blog
source_language: en
source_language_name: English
source_author: Paulien Buskens
source_published_at: '2026-02-07'
source_type: article
faq:
- question: Wie funktionieren Statusanzeigen in Power Apps für farbenblinde Nutzer?
  answer: Jede Statusfarbe sollte mit einem Icon oder Textlabel ergänzt werden. Für
    genehmigt, abgelehnt und ausstehend können unterschiedliche Icons zusätzlich zur
    Farbe verwendet werden.
- question: Was sollte ein Validierungsfehler in Power Apps neben einem roten Rahmen
    enthalten?
  answer: Er sollte eine klare Fehlermeldung und ein AccessibleLabel für Screenreader
    enthalten. Roter Text oder ein roter Rahmen allein vermittelt das Problem nicht
    zuverlässig.
- question: Wie prüfe ich, ob ein Power-Apps-Dashboard zu stark von Farben abhängt?
  answer: Betrachtet die App in Graustufen oder mit einem Browser-Simulator. Ergänzt
    Datenlabels, Trendicons oder eine kleine Tabelle, wenn Diagrammaussagen verschwinden.
---

## TL;DR

Power-Apps-Maker können Status, Validierung und Dashboard-Signale verständlicher gestalten, indem sie Farben mit Icons oder Text ergänzen, AccessibleLabel für Fehler setzen, Datenlabels nutzen und Bildschirme in Graustufen testen. Empfohlen werden zudem mindestens 4,5:1 Kontrast für Fliesstext und Tests mit kontrastreichen Designs.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Ergänzt Farben für Genehmigung, Ablehnung und Ausstehend mit Icons oder Text, damit Zustände in Galerien und Schaltflächen verständlich bleiben.
- Makers: Fügt klare Fehlermeldungen und AccessibleLabel hinzu, statt nur rote Rahmen oder roten Text einzusetzen.
- BI/Data teams: Ergänzt rot-grüne Dashboard-Vergleiche durch Datenlabels, Trendicons oder eine kleine Datentabelle.
- Makers: Testet Bildschirme in Graustufen und mit kontrastreichen Designs, um verschwundene Signale zu erkennen.

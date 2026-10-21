---
title: Power Apps für Screenreader-Nutzende gestalten
description: AccessibleLabel, logische TabIndex-Werte, beschreibende Validierung und
  Gallery-Beschriftungen verbessern die Screenreader-Navigation in Power Apps.
date: '2026-10-21T16:59:17Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
content_type: curated_summary
curation_id: b5dfacc31618596dd37bc565
image:
  path: "/assets/img/curated/b5dfacc31618596dd37bc565.png"
  alt: 'News-Karte: AccessibleLabel and logical tab order make Power Apps usable with
    screen readers.'
permalink: "/de/posts/design-power-apps-for-screen-reader-users-b5dfacc3/"
translation_url: "/en/posts/design-power-apps-for-screen-reader-users-b5dfacc3/"
source_url: https://paulienbuskens.com/2026/02/26/accessibility-screen-readers-power-apps/
source_site_url: https://paulienbuskens.com/
source_title: Designing Power Apps for Screen Readers
source_name: Pauliens Blog
source_language: en
source_language_name: English
source_author: Paulienbuskens
source_published_at: '2026-02-26'
source_type: article
faq:
- question: Wie setze ich AccessibleLabel für eine reine Symbolschaltfläche in Power
    Apps?
  answer: Setzen Sie AccessibleLabel auf eine klare Aktionsbeschreibung wie Element
    löschen. So sagt ein Screenreader die Funktion der Schaltfläche an statt nur Schaltfläche.
- question: Wie sollte TabIndex für Screenreader-Nutzende in Power Apps angeordnet
    sein?
  answer: Beginnen Sie bei TabIndex 0 und erhöhen Sie den Wert logisch entlang des
    visuellen Layouts. Eine vorhersehbare Reihenfolge hilft bei der Tastaturnavigation,
    den Kontext zu behalten.
- question: Wie wird eine Power-Apps-Gallery für einen Screenreader verständlich?
  answer: Geben Sie der Gallery einen AccessibleLabel-Wert, der die enthaltene Sammlung
    beschreibt. Dadurch erhalten Nutzende Orientierung, bevor sie durch wiederholte
    Gallery-Elemente navigieren.
---

## TL;DR

Power-Apps-Maker verbessern die Screenreader-Unterstützung mit aussagekräftigen AccessibleLabel-Werten, einer logischen TabIndex-Reihenfolge, beschriebenen Galleries und klar angesagten Pflichtfeldfehlern. Symbolschaltflächen brauchen Aktionsbeschreibungen, dekorative Elemente einen leeren AccessibleLabel-Wert, damit keine unnötigen Ansagen entstehen.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Vergeben Sie für jedes interaktive Steuerelement aussagekräftige AccessibleLabel-Werte, damit Screenreader Aktionen und den Zweck von Eingaben klar ansagen.
- Makers: Prüfen Sie, ob TabIndex der visuellen Reihenfolge folgt, da Tastaturnutzende Steuerelemente nacheinander durchlaufen.
- Makers: Testen Sie mit NVDA oder VoiceOver nur per Tastatur, um fehlende Beschriftungen, verwirrende Reihenfolgen und störende Ansagen zu erkennen.

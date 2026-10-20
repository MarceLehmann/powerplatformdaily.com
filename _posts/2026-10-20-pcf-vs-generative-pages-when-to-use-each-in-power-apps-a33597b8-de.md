---
title: 'PCF oder Generative Pages: Einsatz in Power Apps'
description: Generative Pages vereinfachen Dialoge, direkte Connectors und spezifische
  Dataverse-Zugriffe. PCFs bleiben stärker bei Formularlebenszyklus, Grids und Offline-Einsatz.
date: '2026-10-20T16:37:13Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
- dataverse
- roadmap
content_type: curated_summary
curation_id: a33597b80f4749f4f543b294
image:
  path: "/assets/img/curated/a33597b80f4749f4f543b294.png"
  alt: 'News-Karte: Generative Pages can serve as app pages, form controls and dialogs
    without a wrapper.'
permalink: "/de/posts/pcf-vs-generative-pages-when-to-use-each-in-power-apps-a33597b8/"
translation_url: "/en/posts/pcf-vs-generative-pages-when-to-use-each-in-power-apps-a33597b8/"
source_url: https://dianabirkelbach.wordpress.com/2026/10/20/pcf-vs-generative-pages/
source_site_url: https://dianabirkelbach.wordpress.com/
source_title: PCF VS GENERATIVE PAGES
source_name: Dianamics PCF Lady
source_language: en
source_language_name: English
source_published_at: '2026-10-20'
source_type: article
faq:
- question: Kann eine Power Apps Generative Page als Dialog geöffnet werden?
  answer: Ja. Eine Generative Page kann über Xrm.Navigation.navigateTo als Dialog
    geöffnet werden und Eingabeparameter entgegennehmen sowie ein Ergebnis zurückgeben.
- question: Wann sollte ich in einem modellgesteuerten Formular einen PCF statt einer
    Generative Page verwenden?
  answer: Ein PCF ist passend bei Formularlebenszyklus, dynamischen Parametern, Feldereignissen
    oder Befehlsinteraktionen. Generative Pages bieten diese Funktionen nicht direkt.
- question: Unterstützen Generative Pages in Power Apps Connectors und Offline-Betrieb?
  answer: Generative Pages können Connectors direkt verwenden. Offline-Unterstützung
    ist für Generative Pages nicht vorhanden, PCFs unterstützen dagegen den Offline-Betrieb.
---

## TL;DR

Generative Pages können in einer modellgesteuerten App in der Sitemap, auf einem Formular oder als Dialog mit Eingabe- und Rückgabewerten laufen. Sie nutzen Connectors und Dataverse-APIs direkt, unterstützen aber kein Offline, keine dynamischen Formularparameter, keinen PCF-Zustand und keine Dataset-Befehlsintegration. PCFs bleiben für Feldsteuerelemente, ribbonfähige Grids und zusätzliche npm-Pakete besser geeignet.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Nutzt eine Generative Page für eine zweckgebundene Sitemap-Seite oder einen Dialog, wenn direkte Connectors und Dialogrückgabewerte benötigt werden.
- Makers: Wählt einen PCF für Feldlebenszyklus, dynamische Parameter oder Dataset-Auswahlen, die mit Ribbon-Befehlen arbeiten müssen.
- Makers: Plant Generative Pages ohne Offline-Unterstützung und verwendet für Offline-Szenarien einen PCF.
- Admins/IT: Berücksichtigt Generative Pages als an Apps gebundene Lösungskomponenten mit Quellcode, transpiliertem Code, Metadaten und Prompt-Artefakten.

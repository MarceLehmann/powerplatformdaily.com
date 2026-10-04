---
title: Dialoge für modellgesteuerte Apps mit Generative Pages bauen
description: Öffnen Sie eine Generative Page als Dialog, übergeben Sie Kontext per
  pageInput und geben Sie ausgewählte Dataverse-Datensätze an das aufrufende Formular
  zurück.
date: '2026-10-03T22:36:21Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
- dataverse
content_type: curated_summary
curation_id: 8faccabe216b94e9483c18cd
image:
  path: "/assets/img/curated/8faccabe216b94e9483c18cd.png"
  alt: 'News-Karte: Generative Pages can pass dialog context in and return selected
    Dataverse records.'
permalink: "/de/posts/build-model-driven-app-dialogs-with-generative-pages-8faccabe/"
translation_url: "/en/posts/build-model-driven-app-dialogs-with-generative-pages-8faccabe/"
source_url: https://dianabirkelbach.wordpress.com/2026/10/03/how-to-make-dialogs-with-generative-pages/
source_site_url: https://dianabirkelbach.wordpress.com/
source_title: How To Make Dialogs With Generative Pages
source_name: Dianamics PCF Lady
source_language: en
source_language_name: English
source_author: Diana Birkelbach
source_published_at: '2026-10-03'
source_type: article
faq:
  - question: "Wie öffnet man eine Generative Page als Dialog in einer modellgesteuerten App?"
    answer: "Mit Xrm.Navigation.navigateTo, pageType generative und target 2. Aufrufer übergeben entityName, recordId und eigene Daten als Kontext."
  - question: "Wie kann ein Generative-Page-Dialog ausgewählte Dataverse-Datensätze an den Aufrufer zurückgeben?"
    answer: "Über result.returnValue, das Projekt- und Meilenstein-Datensätze zurückgeben kann, um Dataverse-Lookups im aufrufenden Formular zu füllen."
  - question: "Ist das Muster für Ausgabe und Schliessen von Generative-Page-Dialogen offiziell dokumentiert?"
    answer: "Nein. Das Muster aus setPageOutput und navigateBack ist nicht dokumentiert, Admins sollten auf Änderungen bei Supportstatus oder Signatur achten."
---

## TL;DR

Generative Pages in Power Apps modellgesteuerten Apps lassen sich über Xrm.Navigation.navigateTo mit pageType generative und target 2 als Dialog öffnen. Aufrufer übergeben entityName, recordId und eigene Daten. Die Seite kann Projekt- und Meilenstein-Datensätze über result.returnValue zurückgeben. Das beschriebene Muster für Ausgabe und Schliessen ist nicht dokumentiert und sollte vorsichtig eingesetzt werden.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Nutzen Sie pageInput data, entityName und recordId, um eine Generative Page als kontextbezogenen Auswahldialog einzusetzen.
- Makers: Verarbeiten Sie result.returnValue, um Dataverse-Lookups mit zurückgegebenen IDs, Namen und logischen Tabellennamen zu füllen.
- Admins/IT: Beobachten Sie das undokumentierte Muster setPageOutput und navigateBack, da sich Supportstatus oder Signatur ändern können.

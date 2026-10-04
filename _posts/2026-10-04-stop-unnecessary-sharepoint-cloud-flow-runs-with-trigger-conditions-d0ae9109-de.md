---
title: Unnötige SharePoint-Cloud-Flow-Ausführungen mit Triggerbedingungen vermeiden
description: Eine Power-Automate-Triggerbedingung startet einen SharePoint-Ordnerkopierflow
  nur für neue Dokumentsets mit dem Inhaltstyp Binder.
date: '2026-10-04T16:57:04Z'
author: news_editorial
lang: de
toc: false
tags:
- power-automate
- connectors
content_type: curated_summary
curation_id: d0ae9109e32553e1ecfba14a
image:
  path: "/assets/img/curated/d0ae9109e32553e1ecfba14a.png"
  alt: 'News-Karte: Trigger conditions stop SharePoint flows from running for every
    new file.'
permalink: "/de/posts/stop-unnecessary-sharepoint-cloud-flow-runs-with-trigger-conditions-d0ae9109/"
translation_url: "/en/posts/stop-unnecessary-sharepoint-cloud-flow-runs-with-trigger-conditions-d0ae9109/"
source_url: https://charleslakes.com/2026/07/27/power-automate-cloud-flows-trigger-conditions-preventing-unnecessary-runs/
source_site_url: https://charleslakes.com/
source_title: 'POWER AUTOMATE: CLOUD FLOWS + TRIGGER CONDITIONS | PREVENTING UNNECESSARY
  RUNS'
source_name: console.log('Charles');
source_language: en
source_language_name: English
source_author: Charles
source_published_at: '2026-07-27'
source_type: article
faq:
- question: Wie begrenze ich einen Power-Automate-SharePoint-Ordnerkopierflow auf
    Binder-Dokumentsets?
  answer: Fügt eine Triggerbedingung hinzu, die den Inhaltstypnamen des neu erstellten
    Elements auf Binder prüft. So starten normale Dateien in der Bibliothek den Ordnerkopierflow
    nicht.
- question: Warum verursacht der SharePoint-Trigger Beim Erstellen einer Datei unnötige
    Cloud-Flow-Ausführungen?
  answer: Er wird bei jeder neu hinzugefügten Datei in der Bibliothek ausgelöst. Eine
    Binder-Vorlage mit mehr als 50 Unterordnern kann dadurch viele unerwünschte Runs
    erzeugen.
- question: Was macht die Aktion Ordner kopieren im Binder-Dokumentset-Flow?
  answer: Sie kopiert die verschachtelte Ordnerstruktur aus einer separaten Vorlagenbibliothek
    in den neu erstellten Binder. Der Standardinhalt des Dokumentsets bleibt dabei
    leer.
---

## TL;DR

Ein Power-Automate-Cloud-Flow verwendet den SharePoint-Trigger Beim Erstellen einer Datei, nur Eigenschaften, und die Aktion Ordner kopieren, um neue Binder-Dokumentsets zu befüllen. Eine Triggerbedingung für den Inhaltstyp Binder verhindert Ausführungen bei jeder Datei in der Bibliothek und senkt unnötige Runs sowie mögliche Abrechnungskosten.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Fügt eine Triggerbedingung für den Inhaltstyp Binder hinzu, bevor die Vorlagenordner kopiert werden, damit gewöhnliche Datei-Uploads den Flow nicht starten.
- Leadership/Business: Beobachtet die Anzahl der Flow-Ausführungen bei Dokumentset-Vorlagen mit vielen Ordnern, denn offene Dateitrigger können vermeidbare Kosten erzeugen.

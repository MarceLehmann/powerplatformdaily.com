---
title: 'Power Apps: Einfache Fehlerbehandlung für Patch-Vorgänge'
description: Mit der OnError-Eigenschaft des App-Steuerelements und einer globalen
  Variable lassen sich genaue Fehlermeldungen fehlgeschlagener Patch-Vorgänge anzeigen.
date: '2026-10-11T16:55:39Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
content_type: curated_summary
curation_id: 74b5494570834134002192df
image:
  path: "/assets/img/curated/74b5494570834134002192df.png"
  alt: 'News-Karte: Power Apps can show the exact Patch error message automatically.'
permalink: "/de/posts/a-simple-power-apps-pattern-for-showing-patch-errors-74b54945/"
translation_url: "/en/posts/a-simple-power-apps-pattern-for-showing-patch-errors-74b54945/"
source_url: https://thepoweraddict.com/a-simple-way-to-implement-error-handling/?utm_source=rss&utm_medium=rss&utm_campaign=a-simple-way-to-implement-error-handling
source_site_url: https://thepoweraddict.com/
source_title: A Simple Way to Implement Error Handling
source_name: The Power Addict
source_language: en
source_language_name: English
source_author: Hardit Bhatia
source_published_at: '2026-03-31'
source_updated_at: '2026-03-31'
source_type: article
faq:
- question: Wie verarbeitet die OnError-Eigenschaft in Power Apps Fehler bei Patch?
  answer: OnError setzt gblIsError auf true und zeigt den aus FirstError.Message gelesenen
    Text als Fehlermeldung an.
- question: Welche Variable muss vor einem Patch-Aufruf in Power Apps gesetzt werden?
  answer: gblIsError muss vor Patch auf false gesetzt werden, damit die Fehlerbehandlung
    den Status bei einem Fehler auf true ändern kann.
- question: Wie liest die Power Apps-Formel die genaue Fehlermeldung aus?
  answer: Die Formel verarbeitet FirstError.Message, trennt den Text am Nachrichtenmarker
    und entfernt die abschliessenden Zeichen vor der Anzeige.
---

## TL;DR

Die OnError-Eigenschaft des App-Steuerelements setzt gblIsError auf true und zeigt den aus FirstError.Message gelesenen Fehlertext an. Vor jedem Patch-Aufruf wird gblIsError auf false gesetzt, damit ein Fehler die zentrale Benachrichtigung auslöst und Nutzer eine konkrete Erklärung erhalten.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Setzt gblIsError unmittelbar vor jedem Patch-Aufruf auf false und nutzt die OnError-Formel des App-Steuerelements, damit die zurückgegebene Fehlermeldung angezeigt wird.
- Makers: Übernehmt dieses zentrale Muster für fehlgeschlagene Patch-Vorgänge, damit Nutzer statt einer unklaren Reaktion eine konkrete Erklärung erhalten.
- Makers: Prüft die angezeigte Meldung im Testlauf, weil die Fehlerbehandlung den genauen Text aus FirstError.Message an die Benachrichtigung übergibt.

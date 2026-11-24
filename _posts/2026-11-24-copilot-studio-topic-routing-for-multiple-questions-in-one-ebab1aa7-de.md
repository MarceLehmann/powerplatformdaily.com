---
title: Copilot Studio Topic Routing für mehrere Fragen in einer Unterhaltung
description: Die Quelle zeigt, wie Bestellstatus, Adressänderung und Rückerstattungsrichtlinie
  in fokussierte Themen aufgeteilt und mit Inputs, Outputs und Orchestrierung verbunden
  werden.
date: '2026-11-24T01:32:12Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- power-automate
content_type: curated_summary
curation_id: ebab1aa720abab251316a818
image:
  path: "/assets/img/curated/ebab1aa720abab251316a818.png"
  alt: 'News-Karte: Copilot Studio can route multiple questions in one conversation.'
permalink: "/de/posts/copilot-studio-topic-routing-for-multiple-questions-in-one-ebab1aa7/"
translation_url: "/en/posts/copilot-studio-topic-routing-for-multiple-questions-in-one-ebab1aa7/"
source_url: https://softchief.com/copilot-studio-topic-routing-multiple-user-questions/
source_site_url: https://softchief.com/
source_title: 'Copilot Studio: How to Design Topic Routing When Users Ask Multiple
  Questions in One Conversation'
source_name: Softchief Technologies
source_language: en
source_language_name: English
source_author: Softchief Author
source_published_at: '2026-11-23'
source_type: article
faq:
- question: Wie verarbeitet Copilot Studio eine Nachricht mit Bestellstatus, Adressänderung
    und Rückerstattungsrichtlinie gleichzeitig?
  answer: Es kann in der klassischen Orchestrierung passende Themen auseinanderhalten
    oder in der generativen Orchestrierung mehrere Fähigkeiten gemeinsam planen. Laut
    Quelle hängt die Wahl vom Orchestrierungsmodell ab.
- question: Welche Topic-Ein- und Ausgaben definiert das Bestellbeispiel?
  answer: Das Beispiel gibt OrderId an die Statusabfrage, OrderId plus NewDeliveryAddress
    und CustomerVerified an die Adressaktualisierung und liefert Status-, Versand-
    und Updatefelder zurück.
- question: Warum soll die Adressaktualisierung in der Backend-Logik liegen?
  answer: Das Backend prüft zuerst Existenz, Besitz und Berechtigung des Auftrags,
    bevor etwas geändert wird. So bleiben Geschäftsregeln wiederverwendbar und doppelte
    Logik in Themen wird vermieden.
animation:
  video: /assets/img/animations/ebab1aa720abab251316a818-de.mp4
  poster: /assets/img/animations/ebab1aa720abab251316a818-de.poster.webp
  width: 800
  height: 450
  alt: "Ein Ablauf mit vier Schritten zeigt eine Nachricht, die in fokussierte Topics aufgeteilt wird, Inputs an Faehigkeiten uebergibt, per Orchestrierung weiterleitet und im Backend validiert."
---

## TL;DR

Copilot Studio kann eine einzelne Nachricht mit Bestellstatus, Adressänderung und Rückerstattungsrichtlinie in getrennte Fähigkeiten aufteilen, wenn fokussierte Themen, klare Inputs und Outputs sowie klassische oder generative Orchestrierung eingesetzt werden. Die Quelle empfiehlt auch, Backend-Prüfungen und Geschäftsregeln ausserhalb des Gesprächstopics zu halten.

## Warum das wichtig ist

- Makers: Teile jede Geschäftsfähigkeit in ein fokussiertes Topic auf, definiere Inputs und Outputs klar und nutze Weiterleitungen oder Orchestrierung, damit Mehrfachanfragen vorhersehbar und wiederverwendbar bleiben.
- Makers: Wähle klassische Orchestrierung für kontrollierte Pfade und generative Orchestrierung, wenn der Agent mehrere Anfragen in einer Nachricht koordinieren soll.
- Admins/IT: Halte Autorisierung, Auftragsprüfung und Änderungsregeln im Backend, weil die Quelle sagt, dass der Agent nicht annehmen soll, dass jede Bestellung änderbar ist.

---
title: Grab E-Belege mit Power Automate Desktop aus Outlook extrahieren
description: Ein Power-Automate-Desktop-Flow ruft Grab E-Belege aus Outlook ab, extrahiert
  Kerndaten, exportiert sie nach Excel und versendet den Bericht.
date: '2026-10-24T16:55:25Z'
author: news_editorial
lang: de
toc: false
tags:
- power-automate
content_type: curated_summary
curation_id: 3f5be9ed0558a8ba17fc5fa3
image:
  path: "/assets/img/curated/3f5be9ed0558a8ba17fc5fa3.png"
  alt: 'News-Karte: Power Automate Desktop extracts Grab e-receipt data from Outlook.'
permalink: "/de/posts/extract-grab-e-receipts-from-outlook-with-power-automate-desktop-3f5be9ed/"
translation_url: "/en/posts/extract-grab-e-receipts-from-outlook-with-power-automate-desktop-3f5be9ed/"
source_url: https://penbotrpa.com/2026/03/10/automating-grab-e-receipt-extraction-using-power-automate-desktop/
source_site_url: https://penbotrpa.com/
source_title: AUTOMATING GRAB E-RECEIPT EXTRACTION USING POWER AUTOMATE DESKTOP
source_name: PenBot_RPA
source_language: en
source_language_name: English
source_author: penbot_rpa
source_published_at: '2026-03-10'
source_type: article
faq:
- question: Wie ruft Power Automate Desktop Grab E-Belege aus Outlook ab?
  answer: Der Outlook-Abrufschritt verwendet das mit Grab verbundene E-Mail-Konto
    im Feld Account. Anschliessend verarbeitet der Ablauf die abgerufenen Beleg-E-Mails.
- question: Welche Grab E-Belegdaten extrahiert Power Automate Desktop?
  answer: Der Ablauf extrahiert Preis, Datum und Uhrzeit sowie den Shopnamen. Diese
    Werte werden zunächst in Listen gespeichert und danach in einer Datentabelle organisiert.
- question: Wie versendet Power Automate Desktop den Grab-Belegbericht?
  answer: Der Ablauf exportiert die organisierten Daten in eine Excel-Datei und versendet
    den Bericht per E-Mail. Outlook Desktop und Microsoft Excel sind Voraussetzungen.
animation:
  video: /assets/img/animations/3f5be9ed0558a8ba17fc5fa3-de.mp4
  poster: /assets/img/animations/3f5be9ed0558a8ba17fc5fa3-de.poster.webp
  width: 800
  height: 450
  alt: "Ein Ablauf in vier Schritten zeigt, wie Grab E-Belege aus Outlook abgerufen, Kerndaten in einer Datentabelle organisiert, nach Excel exportiert und der fertige Bericht per E-Mail versendet wird."
---

## TL;DR

Power Automate Desktop kann Grab E-Belege aus einem Outlook-Postfach abrufen, Preis, Datum und Uhrzeit sowie Shopnamen extrahieren, die Ergebnisse in einer Datentabelle sammeln, nach Excel exportieren und den fertigen Bericht per E-Mail senden. Der Ablauf benötigt Outlook Desktop, Power Automate Desktop und Microsoft Excel.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Outlook-Konto einrichten, Listen erstellen, Belegdaten extrahieren und die Ergebnisse vor dem Excel-Export und E-Mail-Versand in einer Datentabelle organisieren.
- Admins/IT: Outlook Desktop, Power Automate Desktop und Microsoft Excel bereitstellen, da alle drei Anwendungen als Voraussetzungen für diesen Belegverarbeitungsablauf genannt werden.

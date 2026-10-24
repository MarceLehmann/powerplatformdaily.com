---
title: KI-gestützte Rechnungsautomatisierung mit Power Automate erstellen
description: PDF-Rechnungsdaten aus Outlook-Anhängen mit AI Builder extrahieren, freigeben,
  in SharePoint speichern und ein Word-Dokument erzeugen.
date: '2026-10-24T16:55:27Z'
author: news_editorial
lang: de
toc: false
tags:
- power-automate
- ai-builder
- connectors
content_type: curated_summary
curation_id: da6b9fec2b239a6168693a0a
image:
  path: "/assets/img/curated/da6b9fec2b239a6168693a0a.png"
  alt: 'News-Karte: Power Automate can extract invoice data and create a Word document
    from an Outlook attachment.'
permalink: "/de/posts/build-ai-powered-invoice-document-automation-in-power-automate-da6b9fec/"
translation_url: "/en/posts/build-ai-powered-invoice-document-automation-in-power-automate-da6b9fec/"
source_url: https://penbotrpa.com/2026/03/13/ai-powered-document-automation-with-power-automate/
source_site_url: https://penbotrpa.com/
source_title: AI-POWERED DOCUMENT AUTOMATION WITH POWER AUTOMATE
source_name: PenBot_RPA
source_language: en
source_language_name: English
source_author: penbot_rpa
source_published_at: '2026-03-13'
source_type: article
faq:
- question: Wie extrahiert der AI-Builder-Prompt Rechnungsfelder aus einem Outlook-PDF-Anhang?
  answer: Die Aktion Run a prompt erhält den Dateiinhalt des Anhangs und fordert Dokumentnummer,
    Datum, Rabatt, Gesamtbetrag und Positionen als JSON an.
- question: Welche SharePoint-Listen benötigt dieser Power-Automate-Rechnungsflow?
  answer: Der Flow verwendet getrennte Listen für Kopf- und Positionsdaten. Beide
    Listen enthalten einen Status, der von New auf Done wechselt.
- question: Wie fügt Populate a Microsoft Word template Rechnungspositionen ein?
  answer: Der zweite Flow liest SharePoint-Positionen nach Dokumentnummer aus und
    übergibt die Select-Ausgabe an das wiederholbare Word-Feld myTable.
---

## TL;DR

Ein Muster mit zwei Power-Automate-Flows speichert Outlook-PDF-Anhänge in OneDrive, extrahiert Rechnungsfelder und Positionen per AI-Builder-Prompt, fordert eine Freigabe an, speichert Kopf- und Positionsdaten in SharePoint und füllt danach eine Word-Vorlage mit Bestätigung per E-Mail.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Erstellen Sie getrennte Flows für Extraktion und Dokumenterstellung, um freigegebene Outlook-Rechnungsanhänge in Word-Dateien umzuwandeln.
- Makers: Konfigurieren Sie Word-Inhaltssteuerelemente und den wiederholbaren Bereich myTable, damit SharePoint-Positionsdaten im Dokument erscheinen.
- Admins/IT: Prüfen Sie die OneDrive-Freigabeeinstellungen, da der Flow Ansichtslinks für Quelldateien und Organisations-Bearbeitungslinks für erzeugte Dokumente erstellt.

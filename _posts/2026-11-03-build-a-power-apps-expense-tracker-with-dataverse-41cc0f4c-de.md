---
title: Power Apps Ausgaben-Tracker mit Dataverse erstellen
description: Erstellen Sie eine Power Apps Canvas-App für Tablets mit einer per Copilot
  erzeugten Dataverse-Tabelle, einem Formular für Ausgaben und einer Galerie für gespeicherte
  Datensätze.
date: '2026-11-03T07:33:58Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
- dataverse
content_type: curated_summary
curation_id: 41cc0f4c21e64e129e1c6fbf
image:
  path: "/assets/img/curated/41cc0f4c21e64e129e1c6fbf.png"
  alt: 'News-Karte: Build an expense tracker with a Dataverse form and gallery.'
permalink: "/de/posts/build-a-power-apps-expense-tracker-with-dataverse-41cc0f4c/"
translation_url: "/en/posts/build-a-power-apps-expense-tracker-with-dataverse-41cc0f4c/"
source_url: https://softchief.com/build-a-power-apps-canvas-app-for-expense-tracking/
source_site_url: https://softchief.com/
source_title: Build a Power Apps Canvas App for Expense Tracking
source_name: Softchief Technologies
source_language: en
source_language_name: English
source_author: Softchief Author
source_published_at: '2026-11-02'
source_type: article
faq:
- question: Wie erstelle ich mit Copilot eine Dataverse-Tabelle für einen Power Apps
    Ausgaben-Tracker?
  answer: Nutzen Sie die Copilot-Option im Dataverse-Datenarbeitsbereich und beschreiben
    Sie die benötigten persönlichen Ausgabendaten. Prüfen Sie die vorgeschlagenen
    Felder vor dem Speichern.
- question: Welche Power Apps Formel speichert eine neue Ausgabe aus frmExpense?
  answer: Setzen Sie OnSelect der Speichern-Schaltfläche auf SubmitForm(frmExpense).
    Das Formular muss im Modus Neu konfiguriert sein, damit ein Datensatz erstellt
    wird.
- question: Wie zeige ich gespeicherte Dataverse-Ausgaben in einer Power Apps Galerie
    an?
  answer: Fügen Sie auf einem separaten Screen eine Galerie ein und verbinden Sie
    sie mit der Tabelle für persönliche Ausgaben. Konfigurieren Sie Beschriftungen
    für Name, Betrag und Datum.
---

## TL;DR

Erstellen Sie einen Ausgaben-Tracker als Power Apps Canvas-App, indem Sie mit Copilot eine Dataverse-Tabelle für persönliche Ausgaben erzeugen und anschliessend ein Bearbeitungsformular sowie eine Galerie verbinden. Das Formular wird auf Neu gesetzt, die Speichern-Schaltfläche nutzt SubmitForm(frmExpense), und eine Benachrichtigung bestätigt den Erfolg.

## Warum das wichtig ist

- Makers: Prüfen Sie die von Copilot erzeugten Dataverse-Felder vor dem Screenbau und beschränken Sie das Eingabeformular auf relevante Ausgabendaten.
- Makers: Setzen Sie das Formular auf Neu und verbinden Sie die Speichern-Schaltfläche mit SubmitForm(frmExpense), damit neue Ausgaben in Dataverse angelegt werden.
- Makers: Platzieren Sie die Galerie auf einem separaten Screen und testen Sie, ob Name, Betrag und Datum gespeicherter Ausgaben erscheinen.

---
title: Rollenbasierte Dropdown-Filter in Power Apps
description: Eine eingeschränkte SharePoint-Auswahl in einer Canvas-App ausblenden
  oder den nächsten Schritt nach der Auswahl für unberechtigte Personen blockieren.
date: '2026-10-03T19:05:43Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
content_type: curated_summary
curation_id: 9856bd23f9ca630903492e9a
image:
  path: "/assets/img/curated/9856bd23f9ca630903492e9a.png"
  alt: 'News-Karte: Power Apps dropdowns can hide or gate restricted SharePoint choices
    by user.'
permalink: "/de/posts/role-based-dropdown-filtering-in-power-apps-9856bd23/"
translation_url: "/en/posts/role-based-dropdown-filtering-in-power-apps-9856bd23/"
source_url: https://365-anouck.be/show-the-right-choices-to-the-right-people-role-based-dropdown-filtering-in-power-apps/
source_site_url: https://365-anouck.be/
source_title: 'Show the Right Choices to the Right People: Role-Based Dropdown Filtering
  in Power Apps'
source_name: 365-ANOUCK
source_language: en
source_language_name: English
source_author: Anouck
source_published_at: '2026-07-06'
source_type: article
---

## TL;DR

Eine Power-Apps-Canvas-App kann Lower(User().Email) mit einer Liste berechtigter Personen abgleichen. Danach wird ein eingeschränkter Wert aus Choices() gefiltert oder die Navigation per Notify bzw. deaktiviertem Weiter-Button blockiert. Diese Steuerelemente sind nur clientseitig; die Datenebene braucht einen Flow oder strengere SharePoint-Berechtigungen.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Nutzen Sie die Items-Formel des Dropdowns, um eine eingeschränkte SharePoint-Auswahl für unberechtigte Personen auszublenden, oder prüfen Sie die Auswahl am Weiter-Button, wenn sie sichtbar bleiben soll.
- Makers: Pflegen Sie die Liste berechtigter Personen in einer kleinen SharePoint-Liste oder Microsoft-365-Gruppe, wenn Änderungen ohne erneute Veröffentlichung der App möglich sein sollen.
- Admins/IT: Betrachten Sie Prüfungen in Canvas-Apps nicht als Durchsetzung; verwenden Sie Automatisierung bei der Elementerstellung oder Listenberechtigungen, wenn unberechtigte Werte an der Datenquelle verhindert werden müssen.

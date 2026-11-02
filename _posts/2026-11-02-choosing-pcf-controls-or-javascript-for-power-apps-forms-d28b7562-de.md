---
title: PCF-Steuerelemente oder JavaScript für Power-Apps-Formulare wählen
description: PCF eignet sich für wiederverwendbare benutzerdefinierte Oberflächen,
  JavaScript für gezielte Ereignisse in modellgesteuerten Formularen. Kritische Regeln
  gehören auf den Server.
date: '2026-11-02T19:43:05Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
- dataverse
content_type: curated_summary
curation_id: d28b756205bcef8a79a30efd
image:
  path: "/assets/img/curated/d28b756205bcef8a79a30efd.png"
  alt: 'News-Karte: Use PCF for custom interfaces and JavaScript for focused form
    behavior.'
permalink: "/de/posts/choosing-pcf-controls-or-javascript-for-power-apps-forms-d28b7562/"
translation_url: "/en/posts/choosing-pcf-controls-or-javascript-for-power-apps-forms-d28b7562/"
source_url: https://softchief.com/pcf-controls-vs-javascript-in-dynamics-365-which-customization-approach-should-you-use/
source_site_url: https://softchief.com/
source_title: 'PCF Controls vs JavaScript in Dynamics 365: Which Customization Approach
  Should You Use?'
source_name: Softchief Technologies
source_language: en
source_language_name: English
source_author: Softchief Author
source_published_at: '2026-09-29'
source_type: article
faq:
- question: Wann sollte ich in einer modellgesteuerten App ein PCF-Steuerelement statt
    JavaScript verwenden?
  answer: Ein PCF-Steuerelement eignet sich für eine eigene Art der Dateneingabe oder
    -anzeige. JavaScript passt besser zu unterstützten Formularereignissen und clientseitigen
    Interaktionen.
- question: Können JavaScript-Formularskripte kritische Datenregeln in Dynamics 365
    absichern?
  answer: Nein, JavaScript-Formularskripte dürfen nicht die einzige Durchsetzungsebene
    für kritische Regeln sein. Browserseitiges Ausblenden und Prüfen verhindert keinen
    Zugriff über andere Wege.
- question: Warum sollen neue Power-Apps-Formularskripte formContext statt Xrm.Page
    verwenden?
  answer: Neue Skripte sollen formContext verwenden, weil Xrm.Page veraltet ist. Der
    Ausführungskontext gibt dem Code Zugriff auf die passenden Formulardaten und Steuerelemente.
---

## TL;DR

PCF-Steuerelemente erstellen wiederverwendbare benutzerdefinierte Oberflächen für unterstützte modellgesteuerte Apps und Canvas-Apps. JavaScript verarbeitet clientseitige Ereignisse in modellgesteuerten Formularen. Skripte sollen formContext und unterstützte Client-APIs verwenden; Kompatibilität muss geprüft und kritische Datenregeln serverseitig erzwungen werden.

## Warum das wichtig ist

- Makers: JavaScript für gezielte Formularereignisse einsetzen, PCF für eine eigenständige wiederverwendbare Eingabe- oder Anzeigeoberfläche wählen.
- Makers: Unterstützung für Ziel-App, Feld, Gerät und Komponente prüfen, bevor ein PCF-Design festgelegt wird.
- Admins/IT: Für beide Anpassungen unterstützte APIs, Lösungspaketierung, Versionierung und Regressionstests in der Ziel-App verlangen.
- Admins/IT: Sicherheitskritische Validierung serverseitig halten, da ausgeblendete Felder und Browserprüfungen Daten nicht schützen.

---
title: So funktioniert einwilligungsbasierte Aufzeichnung im D365 Contact Center
description: Eine praktische Anleitung zur Konfiguration von Copilot Studio und D365
  Contact Center, damit die Kundeneinwilligung Aufzeichnung und Transkription steuert.
date: '2026-10-16T16:52:28Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
content_type: curated_summary
curation_id: 7ff322e7c59efa912fe7cbcf
image:
  path: "/assets/img/curated/7ff322e7c59efa912fe7cbcf.png"
  alt: 'News-Karte: Copilot Studio voice agents can pass caller consent to D365 Contact
    Center.'
permalink: "/de/posts/how-consent-based-recording-works-with-d365-contact-center-voice-7ff322e7/"
translation_url: "/en/posts/how-consent-based-recording-works-with-d365-contact-center-voice-7ff322e7/"
source_url: https://contactcenterchronicles.com/consent-based-recording-in-d365-contact-center/
source_site_url: https://contactcenterchronicles.com/
source_title: 'CONSENT-BASED RECORDING IN D365 CONTACT CENTER: HOW IT ACTUALLY WORKS'
source_name: Contact Center Chronicles
source_language: en
source_language_name: English
source_author: Kristine Risberg
source_published_at: '2026-06-08'
source_type: article
faq:
- question: Wie übergibt Sys.ConsentEvent die Einwilligungsentscheidung an D365 Contact
    Center?
  answer: Sys.ConsentEvent übermittelt die boolesche Antwort aus dem User-Consent-Thema
    an Contact Center, das dadurch Aufzeichnung und Transkription steuert.
- question: Was sieht ein Service-Mitarbeiter nach abgelehnter Aufzeichnungseinwilligung?
  answer: Nach einer Ablehnung sieht der Mitarbeiter kein Transkript und kann Aufzeichnung
    oder Transkription im Arbeitsbereich nicht starten, pausieren oder fortsetzen.
- question: Welche Voraussetzungen gelten für einwilligungsbasierte Aufzeichnung bei
    eingehenden Anrufen?
  answer: Erforderlich sind ein eingehender Sprach-Workstream mit einem sprachfähigen
    Agenten und ein aktiviertes User-Consent-Thema.
---

## TL;DR

Ein Copilot Studio Sprachagent erfasst die Ja- oder Nein-Antwort des Anrufers, übermittelt sie mit Sys.ConsentEvent und steuert damit Aufzeichnung und Transkription im D365 Contact Center. Die Entscheidung bleibt bei Weiterleitungen und Rückfragen erhalten. Bei Ablehnung sind Transkript und Aufzeichnungssteuerung für Mitarbeitende nicht verfügbar.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Das User-Consent-Thema, Global.ConsentResponse und Sys.ConsentEvent so konfigurieren, dass der Agent die Entscheidung an Contact Center übermittelt.
- Admins/IT: Die Workstream-Einstellung Request for User Consent mit dem zugewiesenen Sprachagenten abstimmen und beide Einwilligungsergebnisse einschliesslich Stille und unklarer Antworten testen.
- Admins/IT: Externe Weiterleitungen separat prüfen, weil D365 Contact Center die Aufzeichnung durch andere Anbieter nicht steuert.

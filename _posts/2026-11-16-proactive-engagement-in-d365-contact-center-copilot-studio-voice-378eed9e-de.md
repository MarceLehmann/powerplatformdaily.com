---
title: Proaktive Kundenansprache im D365 Contact Center mit Copilot Studio Voice-Agenten
  und SMS
description: 'Laut Quelle vom 16.11.2026: Proaktive Sprach- und SMS-Anrufe im D365
  Contact Center, über Customer Insights - Journeys ausgelöst und von einem Copilot
  Studio Voice-Agenten geführt, mit Demo-Limits.'
date: '2026-11-16T19:19:00Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- power-automate
- dataverse
content_type: curated_summary
curation_id: 378eed9ead759fdc6566a163
image:
  path: "/assets/img/curated/378eed9ead759fdc6566a163.png"
  alt: 'News-Karte: D365 Contact Center can now start outbound calls handled by a
    Copilot Studio voice agent, with Customer Insights Journeys deciding when.'
permalink: "/de/posts/proactive-engagement-in-d365-contact-center-copilot-studio-voice-378eed9e/"
translation_url: "/en/posts/proactive-engagement-in-d365-contact-center-copilot-studio-voice-378eed9e/"
source_url: https://contactcenterchronicles.com/proactive-engagement-in-d365-contact-center-from-reactive-support-to-ai-led-outreach/
source_site_url: https://contactcenterchronicles.com/
source_title: 'Proactive Engagement in D365 Contact Center: From Reactive Support
  to AI-Led Outreach'
source_name: Contact Center Chronicles
source_language: en
source_language_name: English
source_published_at: '2026-11-16'
source_type: article
faq:
- question: Wie aktiviere ich ausgehende Anrufe im D365 Contact Center für proaktive
    Sprachanrufe?
  answer: Der ausgehende Sprachkanal im Workstream benötigt eine genehmigte KYC-Prüfung.
    Ohne diese Freigabe lässt sich ausgehendes Anrufen nicht aktivieren, selbst wenn
    alles andere korrekt konfiguriert ist.
- question: Wie erhält ein Copilot Studio Voice-Agent beim proaktiven Anruf Kontext
    zum Kunden?
  answer: Kontextvariablen im Outbound-Workstream übergeben Attribute aus der Journey
    an den Agenten. Im Demo-Aufbau holte ein Power Automate Agent Flow zusätzlich
    Workshop-Voraussetzungen direkt aus Dataverse.
- question: Was unterscheidet die Wahlmodi Preview und Copilot bei proaktiven Anrufen
    in D365 Contact Center?
  answer: Preview verbindet zuerst eine Person, die Details prüfen kann, bevor der
    Kunde angerufen wird. Copilot lässt einen Voice-Agenten das Gespräch führen, mit
    Grenzen für Gleichzeitigkeit und Fehlerquote.
animation:
  video: /assets/img/animations/378eed9ead759fdc6566a163-de.mp4
  poster: /assets/img/animations/378eed9ead759fdc6566a163-de.poster.webp
  width: 800
  height: 450
  alt: "Eine Journey loest die Ansprache aus, Kontextvariablen geben Kundendaten an den Agenten weiter, ein Power Automate Agent Flow liest Daten aus Dataverse, und Contact Center fuehrt den Anruf mit einem Copilot Studio Voice-Agenten oder einer Person aus."
---

## TL;DR

D365 Contact Center unterstützt proaktive ausgehende Sprach- und SMS-Kontakte: Customer Insights - Journeys entscheidet, wann der Kontakt ausgelöst wird, während Contact Center das Gespräch über einen Copilot Studio Voice-Agenten, eine Person oder beides führt. Die Quelle vom 16.11.2026 beschreibt die Wahlmodi Preview und Copilot, Kontextvariablen von der Journey zum Agenten, einen Power Automate Agent Flow mit Workshop-Daten aus Dataverse und die nötige KYC-Freigabe für ausgehende Anrufe.

## Warum das wichtig ist

- Makers: Journey-Attribute, Workstream-Kontextvariablen und Copilot Studio Variablen sauber zuordnen; Express Mode des Agent Flows ist als Preview gekennzeichnet, und Themennamen ohne Punkte verwenden, damit sich Solutions exportieren lassen.
- Admins/IT: KYC-Freigabe für den ausgehenden Sprachkanal früh einplanen, denn ohne sie bleibt ausgehendes Anrufen gesperrt; Customer Insights - Journeys und Contact Center gehören in dieselbe Umgebung.
- Leadership/Business: Wahlmodus bewusst wählen; im Demo-Szenario waren fünf gleichzeitige KI-Anrufe das Limit, vor allem zur Kostenkontrolle bei Copilot Credits, also Limits an das erwartete Volumen anpassen.

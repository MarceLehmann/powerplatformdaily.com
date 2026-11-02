---
title: Copilot Studio Agent mit Twilio per SMS verbinden
description: Erstelle einen Hotel-Concierge in Copilot Studio, der SMS über Dynamics
  365 Contact Center, ein Twilio-Konto und eine zugewiesene Telefonnummer austauscht.
date: '2026-10-19T16:55:48Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- connectors
- dataverse
content_type: curated_summary
curation_id: dbcfb68bc46722a27a5f6a26
image:
  path: "/assets/img/curated/dbcfb68bc46722a27a5f6a26.png"
  alt: 'News-Karte: Copilot Studio agents can send and receive SMS through Dynamics
    365 Contact Center and Twilio.'
permalink: "/de/posts/connect-a-copilot-studio-agent-to-sms-with-twilio-dbcfb68b/"
translation_url: "/en/posts/connect-a-copilot-studio-agent-to-sms-with-twilio-dbcfb68b/"
source_url: https://www.matthewdevaney.com/how-to-send-and-receive-sms-text-messages-in-copilot-studio/
source_site_url: https://www.matthewdevaney.com/
source_title: How To Send And Receive SMS Text Messages In Copilot Studio
source_name: Matthew Devaney
source_language: en
source_language_name: English
source_author: Matthew Devaney
source_published_at: '2026-08-30'
source_type: article
faq:
- question: Wie verbinde ich einen Copilot Studio Agent mit SMS in Dynamics 365 Contact
    Center?
  answer: Aktiviert den SMS-Kanal, fügt ein Twilio-Konto und eine Telefonnummer hinzu,
    konfiguriert einen Workstream und verbindet anschliessend den Copilot Studio Agent.
- question: Funktioniert ein kostenloses Twilio-Testkonto mit SMS in Dynamics 365
    Contact Center?
  answer: Nein. Für dieses Tutorial ist ein kostenpflichtiges Twilio-Konto erforderlich,
    da ein kostenloses Testkonto nicht erfolgreich mit Contact Center verbunden werden
    kann.
- question: Welche Webhook-Einstellung braucht Twilio für Copilot Studio SMS?
  answer: Bei der gekauften Telefonnummer wird die Callback-URL von Contact Center
    in der Twilio-Nachrichtenkonfiguration mit der HTTP-POST-Methode hinterlegt.
animation:
  video: /assets/img/animations/dbcfb68bc46722a27a5f6a26-de.mp4
  poster: /assets/img/animations/dbcfb68bc46722a27a5f6a26-de.poster.webp
  width: 800
  height: 450
  alt: "Ein Ablauf mit vier Schritten zeigt das Aktivieren des SMS-Kanals, das Hinzufuegen eines Twilio-Kontos und einer Telefonnummer, das Konfigurieren eines eingehenden SMS-Workstreams und das Verbinden des Copilot Studio Agent."
---

## TL;DR

Ein Copilot Studio Agent kann SMS über Dynamics 365 Contact Center und Twilio senden und empfangen. Dafür werden eine Dataverse-Umgebung, der SMS-Kanal, ein kostenpflichtiges Twilio-Konto, eine SMS-fähige Telefonnummer, ein Webhook, ein Workstream und der verbundene Agent eingerichtet.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Erstellt den Copilot Studio Agent, ladet die FAQ-PDF als Wissensquelle hoch, definiert die Anweisungen und wählt für den öffentlichen SMS-Zugriff keine Authentifizierung.
- Admins/IT: Erstellt eine Sandbox- oder Produktionsumgebung mit Dataverse und Contact Center, aktiviert SMS und richtet das Twilio-Konto ein.
- Makers: Verbindet den Agent mit einem eingehenden SMS-Workstream und testet Antworten von der gekauften Telefonnummer.
- Admins/IT: Hinterlegt die Contact-Center-Callback-URL bei Twilio mit HTTP POST und überwacht dort Nachrichtenprotokolle.

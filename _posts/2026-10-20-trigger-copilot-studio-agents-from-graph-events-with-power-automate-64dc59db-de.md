---
title: Copilot Studio Agents mit Graph-Ereignissen und Power Automate auslösen
description: Microsoft Graph Änderungsbenachrichtigungen über Azure Event Hubs an
  Power Automate leiten und damit einen Copilot Studio Agent ausführen.
date: '2026-10-20T17:08:36Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- power-automate
- connectors
content_type: curated_summary
curation_id: 64dc59db61e6e9019f3984c1
image:
  path: "/assets/img/curated/64dc59db61e6e9019f3984c1.png"
  alt: 'News-Karte: Copilot Studio agents can react to Graph events without user interaction.'
permalink: "/de/posts/trigger-copilot-studio-agents-from-graph-events-with-power-automate-64dc59db/"
translation_url: "/en/posts/trigger-copilot-studio-agents-from-graph-events-with-power-automate-64dc59db/"
source_url: https://ashiqf.com/2026/03/31/triggering-copilot-studio-agents-autonomously-using-microsoft-graph-change-notifications-power-automate/
source_site_url: https://ashiqf.com/
source_title: Triggering Copilot Studio Agents Autonomously Using Microsoft Graph
  Change Notifications + Power Automate
source_name: Mohamed Ashiq Faleel
source_language: en
source_language_name: English
source_author: Mohamed Ashiq Faleel
source_published_at: '2026-03-31'
source_updated_at: '2026-05-03'
source_type: article
faq:
- question: Wie löst Power Automate einen Copilot Studio Agent bei einer Teams-Kanalnachricht
    aus?
  answer: Erstellen Sie ein Graph Abonnement, das Änderungsbenachrichtigungen an Azure
    Event Hubs sendet. Power Automate verarbeitet das Ereignis und übergibt relevante
    Werte mit Execute Agent.
- question: Welche Event Hub Rollen brauchen Microsoft Graph und Power Automate für
    Benachrichtigungen?
  answer: Microsoft Graph Change Tracking benötigt auf dem Hub die Rolle Azure Event
    Hubs Data Sender. Die Power Automate Verbindung benötigt die Rolle Azure Event
    Hubs Data Receiver.
- question: Vermeiden Graph Rich Notifications einen zweiten API-Aufruf in Power Automate?
  answer: Ja, Rich Notifications können verschlüsselte Ressourcendaten direkt in der
    Benachrichtigung liefern. Power Automate benötigt dennoch eine externe Entschlüsselung,
    da keine nativen RSA- oder AES-Aktionen vorhanden sind.
animation:
  video: /assets/img/animations/64dc59db61e6e9019f3984c1-de.mp4
  poster: /assets/img/animations/64dc59db61e6e9019f3984c1-de.poster.webp
  width: 800
  height: 450
  alt: "Ein Ablauf mit vier Schritten zeigt, wie Microsoft Graph Aenderungsbenachrichtigungen an Azure Event Hubs gesendet, von einem Power Automate Trigger gelesen, aus ContentData dekodiert und mit Execute Agent an Copilot Studio gesendet werden."
---

## TL;DR

Microsoft Graph Änderungsbenachrichtigungen können an Azure Event Hubs zugestellt, über den Event Hubs Trigger von Power Automate verarbeitet, aus ContentData dekodiert und mit Execute Agent an Copilot Studio übergeben werden. Rich Notifications enthalten optional verschlüsselte Ressourcendaten und benötigen Azure Functions oder Logic Apps Standard zur Entschlüsselung.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Erstellen Sie ereignisgesteuerte Flows mit Event Hub Trigger und Execute Agent, um Nachrichtendaten ohne Benutzerinteraktion an Copilot Studio zu senden.
- Admins/IT: Weisen Sie Microsoft Graph Change Tracking die Data Sender Rolle und der Flow-Identität die Data Receiver Rolle auf dem jeweiligen Event Hub zu und erneuern Sie ablaufende Graph Abonnements.
- Makers: Nutzen Sie Rich Notifications für Nachrichteninhalte, planen Sie aber Azure Functions oder Logic Apps Standard für die Entschlüsselung ein.

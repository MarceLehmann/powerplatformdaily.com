---
title: Visual Studio Azure-Guthaben für Copilot Studio Pay-as-you-go verwenden
description: Eine praktische Anleitung, um ein aktiviertes Visual-Studio-Azure-Abonnement
  mit einem Copilot-Studio-Abrechnungsplan für Tests zu verbinden.
date: '2026-10-26T16:59:10Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- licensing
content_type: curated_summary
curation_id: f2102985f501e2dfd61fe8a1
image:
  path: "/assets/img/curated/f2102985f501e2dfd61fe8a1.png"
  alt: 'News-Karte: Copilot Studio can use Visual Studio Azure credits for pay-as-you-go
    billing.'
permalink: "/de/posts/use-visual-studio-azure-credits-for-copilot-studio-pay-as-you-go-f2102985/"
translation_url: "/en/posts/use-visual-studio-azure-credits-for-copilot-studio-pay-as-you-go-f2102985/"
source_url: https://reshmeeauckloo.com/posts/copilotstudio-payg-vssubscription/
source_site_url: https://reshmeeauckloo.com/
source_title: Use a Visual Studio Subscription for Copilot Studio Pay-As-You-Go Billing
source_name: Blog about anything related to my learnings
source_language: en
source_language_name: English
source_published_at: '2026-09-11'
source_type: article
faq:
- question: Wie nutze ich Visual-Studio-Azure-Guthaben für die Pay-as-you-go-Abrechnung
    in Copilot Studio?
  answer: Aktiviert das Visual-Studio-Azure-Guthaben, stellt das Abonnement im Umgebungsmmandanten
    bereit und wählt es beim Erstellen des Abrechnungsplans aus.
- question: Warum wird mein Visual-Studio-Azure-Abonnement im Copilot-Studio-Abrechnungsplan
    nicht angezeigt?
  answer: Prüft den Mandanten, die Aktivierung des Visual-Studio-Vorteils und die
    erforderliche Azure-Rollenzuweisung für euer Konto.
- question: Was geschieht nach dem Erstellen eines Copilot-Studio-Abrechnungsplans
    mit Azure-Guthaben?
  answer: Der Abrechnungsplan wird zunächst bereitgestellt und sollte danach für die
    Umgebung als aktiviert angezeigt werden.
animation:
  src: /assets/img/animations/f2102985f501e2dfd61fe8a1-de.gif
  poster: /assets/img/animations/f2102985f501e2dfd61fe8a1-de.poster.png
  width: 800
  height: 450
  alt: "Ablauf zur Nutzung von Visual Studio Azure-Guthaben fuer die Copilot Studio-Abrechnung: Guthaben aktivieren, Abonnement im Mandanten verfuegbar machen, im Abrechnungsplan auswaehlen, dann auf Bereitstellung warten und aktiviert pruefen."
---

## TL;DR

Copilot Studio kann aktiviertes Azure-Guthaben aus einem Visual-Studio-Abonnement als Azure-Abonnement für einen Pay-as-you-go-Abrechnungsplan verwenden. Umgebung und Abonnement müssen im selben Microsoft-Entra-Mandanten verfügbar sein. Nach dem Erstellen wartet man auf die Bereitstellung und prüft, ob der Plan für die Umgebung aktiviert ist.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Aktiviert das Azure-Guthaben des Visual-Studio-Abonnements und wählt es für Tests aus, wenn die enthaltenen Copilot-Studio-Berechtigungen nicht ausreichen.
- Admins/IT: Macht das Azure-Abonnement im Microsoft-Entra-Mandanten der Umgebung verfügbar und prüft die erforderlichen Power-Platform- und Azure-Berechtigungen.
- Leadership/Business: Prüft Abonnementlimits, unterstützte Angebote und den erwarteten Copilot-Studio-Verbrauch, bevor dieser Ansatz für länger laufende Produktionslasten eingesetzt wird.

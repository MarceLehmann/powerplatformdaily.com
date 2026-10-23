---
title: Dynamics 365 Performance Probe misst, was Anwender wirklich erleben
description: Die Browser-Erweiterung für Edge und Chrome trennt nutzbare Zeit von
  vollständig geladenen Ansichten, ordnet Anfragen ein und weist mögliche Ursachen
  Verantwortlichen zu.
date: '2026-10-23T16:53:19Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
- dataverse
content_type: curated_summary
curation_id: ecb607d1ce22a265ac920901
image:
  path: "/assets/img/curated/ecb607d1ce22a265ac920901.png"
  alt: 'News-Karte: A browser probe separates usable time from fully loaded time in
    Dynamics 365.'
permalink: "/de/posts/dynamics-365-performance-probe-measures-what-users-actually-experience-ecb607d1/"
translation_url: "/en/posts/dynamics-365-performance-probe-measures-what-users-actually-experience-ecb607d1/"
source_url: https://www.powerpete.com/dynamics-365-performance-probe-browser-extension/
source_site_url: https://www.powerpete.com/
source_title: Dynamics 365 Performance Probe Browser Extension
source_name: Power Pete
source_language: en
source_language_name: English
source_published_at: '2026-09-02'
source_type: article
faq:
- question: Wie klassifiziert Dynamics 365 Performance Probe Browseranfragen?
  answer: Die Erweiterung klassifiziert Anfragen als blockierend, nach dem Rendern
    oder im Hintergrund. Nur blockierende Anfragen fliessen in die Leistungsbewertung
    ein.
- question: Was misst die nutzbare Zeit in Dynamics 365 Performance Probe?
  answer: Die nutzbare Zeit zeigt, wann Anwender wieder arbeiten können. Die vollständig
    geladene Zeit wird separat als Kontext angezeigt und beeinflusst den Score nicht.
- question: Wie erfasse ich eine modellgesteuerte Dynamics 365 App mit Performance
    Probe?
  answer: Installiert die entpackte Erweiterung, drückt Start, ladet die Dynamics
    365 Registerkarte neu, arbeitet zehn Minuten normal und öffnet danach den Bericht.
animation:
  src: /assets/img/animations/ecb607d1ce22a265ac920901-de.gif
  poster: /assets/img/animations/ecb607d1ce22a265ac920901-de.poster.png
  width: 800
  height: 450
  alt: "Die Animation zeigt den Ablauf mit Performance Probe: Erweiterung installieren, Start druecken, die Dynamics 365 Registerkarte neu laden, zehn Minuten normal arbeiten, dann den Bericht oeffnen und exportieren."
---

## TL;DR

Die Browser-Erweiterung Dynamics 365 Performance Probe misst die Leistung modellgesteuerter Apps aus Sicht der Anwender. Sie trennt blockierende, nach dem Rendern gestartete und Hintergrundanfragen, zeigt nutzbare neben vollständig geladener Zeit, erkennt elf mögliche Ursachen, weist Verantwortungsbereiche zu und erstellt PDF- oder HTML-Berichte für die Offline-Nutzung.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Installiert die Erweiterung für Edge oder Chrome, startet sie vor dem Neuladen der modellgesteuerten App und arbeitet zehn Minuten normal, damit auch der vollständige Start gemessen wird.
- Admins/IT: Nutzt Anfragekategorien und Verantwortungsbereiche, um langsame Interaktionen an eigene Anpassungen, Kundensysteme, die Microsoft-Plattform oder gemeinsame Ursachen weiterzuleiten.
- Leadership/Business: Betrachtet nutzbare Zeit getrennt von vollständig geladener Zeit, weil eine Ansicht bereits arbeitsbereit sein kann, während Hintergrunddetails noch geladen werden.

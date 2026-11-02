---
title: Microsoft Foundry Agent mit Copilot Studio verbinden
description: Einen bestehenden Microsoft Foundry Agent als externen Agent in Copilot
  Studio mit Projektendpunkt und Agent-ID hinzufuegen.
date: '2026-10-26T16:59:06Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- connectors
content_type: curated_summary
curation_id: 24c27c756940b7b47754c0fd
image:
  path: "/assets/img/curated/24c27c756940b7b47754c0fd.png"
  alt: 'News-Karte: Copilot Studio can connect to Microsoft Foundry agents as external
    agents.'
permalink: "/de/posts/connect-a-microsoft-foundry-agent-to-copilot-studio-24c27c75/"
translation_url: "/en/posts/connect-a-microsoft-foundry-agent-to-copilot-studio-24c27c75/"
source_url: https://reshmeeauckloo.com/posts/copilotstudio-connect-foundry/
source_site_url: https://reshmeeauckloo.com/
source_title: Connect a Microsoft Foundry agent to Copilot Studio
source_name: reshmeeauckloo.com
source_language: en
source_language_name: English
source_published_at: '2026-09-07'
source_type: article
faq:
- question: Welches Endpunktformat verwendet eine Foundry-Verbindung in Copilot Studio?
  answer: Die Verbindung verwendet den Microsoft Foundry-Projektendpunkt mit Ressourcenname
    und Projektname in der services.ai.azure.com-Adresse.
- question: Warum muss der Microsoft Foundry-Projektendpunkt in Copilot Studio mit
    einem Schraegstrich enden?
  answer: Der Endpunkt benoetigt im Verbindungsdialog einen abschliessenden Schraegstrich.
    Ohne ihn kann die Verbindung einen 400-Fehler oder andere Fehler verursachen.
- question: Welche Microsoft Foundry-Agentendaten muessen in Copilot Studio eingetragen
    werden?
  answer: Copilot Studio benoetigt die Ziel-Agent-ID aus Microsoft Foundry sowie den
    Projektendpunkt, bevor der externe Agent gespeichert und getestet werden kann.
animation:
  video: /assets/img/animations/24c27c756940b7b47754c0fd-de.mp4
  poster: /assets/img/animations/24c27c756940b7b47754c0fd-de.poster.webp
  width: 800
  height: 450
  alt: "Ein Ablauf mit vier Schritten zeigt, wie ein bestehender Microsoft Foundry Agent in Copilot Studio verbunden wird: Projektendpunkt und Agent-ID vorbereiten, Microsoft Foundry waehlen, Schraegstrich anhaengen und Verbindung testen."
---

## TL;DR

Copilot Studio kann einen Microsoft Foundry Agent als externen Agent hinzufuegen. Dafuer werden der Foundry-Projektendpunkt mit abschliessendem Schraegstrich und die Ziel-Agent-ID benoetigt, bevor die Verbindung getestet wird. Ein bestehendes Foundry-Projekt und ein vorhandener Agent sind Voraussetzungen.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Projektendpunkt und Agent-ID aus Foundry bereithalten, Microsoft Foundry als externen Agententyp waehlen und den Aufruf in Copilot Studio testen.
- Admins/IT: Zugriff auf den Foundry Agent pruefen und einen abschliessenden Schraegstrich an den Projektendpunkt anhaengen, weil sein Fehlen einen 400-Fehler oder andere Fehler verursachen kann.

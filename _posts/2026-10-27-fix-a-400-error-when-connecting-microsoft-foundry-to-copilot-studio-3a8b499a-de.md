---
title: 'Copilot Studio: 400-Fehler bei Microsoft Foundry beheben'
description: Ein mit Copilot Studio verbundener Microsoft-Foundry-Agent kann wegen
  fehlender Unterstützung des Aktivitätsprotokolls einen 400-Fehler liefern. Ein abschliessender
  Schrägstrich kann helfen.
date: '2026-10-27T17:01:25Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- connectors
content_type: curated_summary
curation_id: 3a8b499af3ca30c7e466aa7e
image:
  path: "/assets/img/curated/3a8b499af3ca30c7e466aa7e.png"
  alt: 'News-Karte: A trailing slash may clear the Copilot Studio 400 error. Otherwise
    check Activity Protocol support.'
permalink: "/de/posts/fix-a-400-error-when-connecting-microsoft-foundry-to-copilot-studio-3a8b499a/"
translation_url: "/en/posts/fix-a-400-error-when-connecting-microsoft-foundry-to-copilot-studio-3a8b499a/"
source_url: https://reshmeeauckloo.com/posts/copilotstudio-connect-foundry-400-activityprotocol/
source_site_url: https://reshmeeauckloo.com/
source_title: Fix 400 Error While Using Microsoft Foundry to Copilot Studio
source_name: Blog about anything related to my learnings
source_language: en
source_language_name: English
source_published_at: '2026-09-07'
source_type: article
faq:
- question: Was bedeutet Endpunkt unterstützt keine Aktivität bei einer Copilot-Studio-Verbindung
    mit Microsoft Foundry?
  answer: Copilot Studio ruft den Foundry-Agent über das Aktivitätsprotokoll auf,
    aber der Agent-Endpunkt ist nicht für dieses Protokoll konfiguriert.
- question: Kann ein abschliessender Schrägstrich den 400-Fehler des Microsoft-Foundry-Projektendpunkts
    in Copilot Studio beheben?
  answer: Ja, ein abschliessender Schrägstrich am Projektendpunkt kann den 400-Fehler
    beseitigen. Falls das nicht hilft, sollte die Unterstützung des Aktivitätsprotokolls
    geprüft werden.
- question: Welches Protokoll muss ein Microsoft-Foundry-Agent für Copilot Studio
    unterstützen?
  answer: Der stabile Foundry-Agent-Endpunkt muss das Aktivitätsprotokoll unterstützen.
    Neu erstellte Agents stellen standardmässig meist Responses bereit, daher kann
    zusätzliche Konfiguration nötig sein.
---

## TL;DR

Ein mit Copilot Studio verbundener Microsoft-Foundry-Agent kann einen 400-Fehler liefern, wenn sein stabiler Endpunkt das Aktivitätsprotokoll nicht unterstützt. Neu erstellte Agents stellen typischerweise standardmässig Responses bereit. Ein abschliessender Schrägstrich am Projektendpunkt kann den Fehler beheben; andernfalls sollte die Protokollkonfiguration geprüft werden.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Ergänzt einen abschliessenden Schrägstrich am Foundry-Projektendpunkt und versucht die Verbindung erneut, da dies den 400-Fehler beseitigen kann.
- Makers: Prüft, ob der stabile Foundry-Agent-Endpunkt das Aktivitätsprotokoll unterstützt, weil Copilot Studio dieses Protokoll für die Verbindung benötigt.

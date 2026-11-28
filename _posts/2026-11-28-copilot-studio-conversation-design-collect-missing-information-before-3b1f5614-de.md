---
title: 'Copilot Studio: Konversationen so gestalten, dass fehlende Infos vor der Aktion
  abgefragt werden'
description: 'Copilot Studio Konversationen bauen: Mit Question Nodes, Variablen und
  Bedingungen fehlende Eingaben erfragen, prüfen und erst nach Bestätigung den Power-Automate-Flow
  starten.'
date: '2026-11-28T01:29:16Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- power-automate
content_type: curated_summary
curation_id: 3b1f561449161602a0f02a59
image:
  path: "/assets/img/curated/3b1f561449161602a0f02a59.png"
  alt: 'News-Karte: A Copilot Studio agent should collect only the missing details,
    validate them, and act only after the user confirms.'
permalink: "/de/posts/copilot-studio-conversation-design-collect-missing-information-before-3b1f5614/"
translation_url: "/en/posts/copilot-studio-conversation-design-collect-missing-information-before-3b1f5614/"
source_url: https://softchief.com/copilot-studio-conversation-design/
source_site_url: https://softchief.com/
source_title: 'Microsoft Copilot Studio: How to Design Conversations That Collect
  Missing Information Before Taking Action'
source_name: Softchief Technologies
source_language: en
source_language_name: English
source_author: Softchief Author
source_published_at: '2026-11-27'
source_type: article
faq:
- question: Wie verhindere ich, dass ein Copilot Studio Agent nach Angaben fragt,
    die der Nutzer schon genannt hat?
  answer: Pflichtfelder mit den erfassten Werten abgleichen und Question Nodes nur
    für die Lücken auslösen, statt die Konversation neu zu starten.
- question: Kann ich in Copilot Studio ein Enddatum per Power Fx gegen das Startdatum
    prüfen?
  answer: Ja. Question Nodes unterstützen zusätzliche Entitätsvalidierung mit Power
    Fx, zum Beispiel eine Bedingung, die ein Enddatum vor dem Startdatum ablehnt.
- question: Wie fragt generative Orchestrierung in Copilot Studio fehlende Tool-Eingaben
    ab?
  answer: Laut Quelle nutzt sie Beschreibungen von Topics und Tool-Eingaben, um Rückfragen
    zu fehlenden Werten zu erzeugen; eigene Prompts lassen sich für präzise Formulierungen
    hinterlegen.
---

## TL;DR

Copilot Studio erlaubt Konversationen, die fehlende Angaben sammeln, bevor eine Aktion läuft. Der Ansatz: Eingabekontrakt definieren, bereits genannte Werte übernehmen, mit Question Nodes nur Lücken abfragen, Antworten per Power Fx prüfen, je nach Szenario verzweigen, die Zusammenfassung bestätigen lassen und erst dann Power Automate aufrufen. Autorisierung, Geschäftsregeln und Schutz vor Doppelübermittlung bleiben Aufgabe des Backends.

## Warum das wichtig ist

- Maker: Pflichtfelder vorab definieren, bereits genannte Werte wiederverwenden, nur fehlende Angaben per Question Node erfragen, Antworten früh validieren und vor dem Flow-Aufruf eine Zusammenfassung bestätigen lassen.
- Admins/IT: Autorisierung, Geschäftsregeln und Schutz vor Doppelübermittlung im Flow oder in Dataverse erzwingen, da die Bestätigung im Chat Backend-Prüfungen nicht ersetzt.
- Leadership/Business: Bei kritischen Vorgängen wie Einkaufsanforderungen oder Urlaubsanträgen verlangen, dass Bestätigungsschritte und getestete Fehlerpfade vorhanden sind, bevor die Automatisierung eingeführt wird.

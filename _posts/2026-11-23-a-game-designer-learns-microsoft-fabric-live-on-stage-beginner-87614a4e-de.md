---
title: 'Eine Game-Designerin lernt Microsoft Fabric auf der Bühne: Einsteigerfragen,
  Capacity-Grundlagen und Passung'
description: 'Laut Quelle vom 19.10.2026 lernte eine Fabric-Einsteigerin live auf
  dem Nordic Summit 2026: OneLake, die Verschachtelung von Tenant bis Item, F2-Capacity
  und wann Fabric passt.'
date: '2026-11-23T01:40:32Z'
author: news_editorial
lang: de
toc: false
tags:
- fabric
- power-bi
- licensing
content_type: curated_summary
curation_id: 87614a4efcad2899778f9eba
image:
  path: "/assets/img/curated/87614a4efcad2899778f9eba.png"
  alt: 'News-Karte: A game designer learned Microsoft Fabric live on stage, and every
    step she deleted came straight back.'
permalink: "/de/posts/a-game-designer-learns-microsoft-fabric-live-on-stage-beginner-87614a4e/"
translation_url: "/en/posts/a-game-designer-learns-microsoft-fabric-live-on-stage-beginner-87614a4e/"
source_url: https://www.karlex.fi/a-game-designer-learns-fabric-on-stage-and-asks-the-questions-nobody-asks/
source_site_url: https://www.karlex.fi/
source_title: A game designer learns Fabric on stage, and asks the questions nobody
  asks
source_name: Karlex
source_language: en
source_language_name: English
source_author: Karl-Johan Spiik
source_published_at: '2026-10-19'
source_type: article
faq:
- question: Was ist der Unterschied zwischen Lakehouse und Warehouse in Microsoft
    Fabric?
  answer: Ein Lakehouse hält unterschiedliche Inhalte, die man mit Python oder Spark
    bearbeitet, ein Warehouse erzwingt strenge Schemas für Reporting, und Fabric bietet
    beides.
- question: Wie viel einer F8-Capacity belegt in Microsoft Fabric die Aufnahme von
    500 GB pro Tag?
  answer: Laut dem Rechenbeispiel der Session sind 500 GB pro Tag rund 50.000 Capacity-Einheiten-Sekunden,
    etwa 7 Prozent dessen, was eine F8 in 24 Stunden bietet.
- question: Wann ist Microsoft Fabric laut der Session ungeeignet?
  answer: Die Fit-Tabelle der Session nennt kleine Anwendungsfälle, die Excel oder
    Power BI schon abdecken, Multi-Cloud-Strategien, Legacy-Einschränkungen und Teams
    ohne Microsoft-Kenntnisse.
---

## TL;DR

Auf dem Nordic Summit 2026 unterrichtete eine erfahrene Fabric-Praktikerin eine Einsteigerin live. Die Session lieferte ein minimales Grundmodell: Fabric als Microsofts SaaS-Plattform für Daten und KI, OneLake als zentraler Speicher, die Verschachtelung von Tenant über Capacities und Workspaces bis zu Items, Capacity-Einheiten ab F2 und pausierbar, sowie ein Fit-Check, wann sich Fabric lohnt.

## Warum das wichtig ist

- Makers: Fabric-Projekte auf der kleinsten Capacity starten und die Liste der angewendeten Schritte in einem Dataflow als Undo-Protokoll nutzen, denn selbst im Live-Demo gelöschte Schritte kamen sofort zurück.
- BI/Data teams: vor einer Fabric-Empfehlung den Fit-Check nutzen, denn eine einzelne Analystin, die täglich CSVs von Hand zusammenführt, wurde als Nein bewertet, rollen- und quellenübergreifendes Reporting als klares Ja.
- Leadership/Business: Capacity ist die Rechenleistung, gemessen in Einheiten, die sich pro Stufe ab F2 verdoppeln, entweder stündlich nutzungsabhängig und pausierbar oder jährlich reserviert abgerechnet; klein beginnen und nur bei Bedarf skalieren.
- Admins/IT: das Verschachtelungsmodell früh lernen, denn ein Tenant hält Capacities, Workspaces halten Items, und Daten lassen sich zwischen Workspaces austauschen, aber nicht über getrennte Capacities hinweg.

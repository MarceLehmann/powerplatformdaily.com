---
title: 'Power Apps: Unvollständige Suchergebnisse Schritt für Schritt diagnostizieren'
description: 'Schrittweise Methode, um zu finden, warum eine Power Apps-Suche gültige
  Datensätze auslässt: Delegation, Zeilenlimit, Connector, Filter und Benutzerrechte
  prüfen.'
date: '2026-11-14T13:24:58Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
- connectors
content_type: curated_summary
curation_id: 6e48733fee123fcfb684147a
image:
  path: "/assets/img/curated/6e48733fee123fcfb684147a.png"
  alt: 'News-Karte: Trace the missing record from data source to screen before changing
    the search formula.'
permalink: "/de/posts/power-apps-diagnose-incomplete-search-results-step-by-step-6e48733f/"
translation_url: "/en/posts/power-apps-diagnose-incomplete-search-results-step-by-step-6e48733f/"
source_url: https://softchief.com/power-apps-diagnose-incomplete-search-results-for-business-users/
source_site_url: https://softchief.com/
source_title: 'Power Apps: Diagnose Incomplete Search Results for Business Users'
source_name: Softchief Technologies
source_language: en
source_language_name: English
source_author: Softchief
source_published_at: '2026-11-14'
source_type: article
faq:
- question: Warum findet meine Power Apps-Suche einen vorhandenen Datensatz nicht?
  answer: Häufig wegen Delegation, Formellogik, veralteter Daten oder Zugriffsrechten
    des Benutzers. Verfolgen Sie einen fehlenden Datensatz durch Quelle, Formel und
    Bildschirm.
- question: Wie hoch ist das Standard-Datenzeilenlimit für nicht delegierbare Abfragen
    in Power Apps?
  answer: Standardmässig 500 Datensätze. Die App-Einstellung lässt sich auf bis zu
    10,000 erhöhen, laut Quelle macht das eine nicht unterstützte Abfrage aber nicht
    zuverlässig.
- question: Welche Suchfunktionen sind bei SharePoint und SQL Server in Power Apps
    delegierbar?
  answer: Laut der zitierten Microsoft-Dokumentation unterstützt SharePoint bei Textfeldern
    StartsWith, SQL Server bei Text sowohl Search als auch StartsWith. Prüfen Sie
    die Delegationstabelle Ihres Connectors.
---

## TL;DR

Wenn eine Power Apps-Suche einen vorhandenen Datensatz auslässt, ist Delegation ein Hauptverdächtiger: Eine nicht delegierbare Abfrage verarbeitet höchstens das Datenzeilenlimit, standardmässig 500, und eine Erhöhung auf 10,000 macht sie laut Quelle nicht zuverlässig. Vergleichen Sie den fehlenden mit einem gefundenen Datensatz, prüfen Sie die durchsuchten Felder und Filterlogik und testen Sie anschliessend mit dem Konto des betroffenen Benutzers.

## Warum das wichtig ist

- Makers: Beginnen Sie mit einem gemeldeten fehlenden Datensatz, prüfen Sie die Items-Formel auf Delegationswarnungen und wählen Sie ein Abfragemuster, das Ihr Connector unterstützt.
- Admins/IT: Prüfen Sie Umgebung, Datenquelle und zeilenbasierte Zugriffsregeln, denn Administratoren sehen oft Datensätze, die Benutzer nicht sehen.
- Leadership/Business: Bitten Sie Benutzer um einen konkreten fehlenden Datensatz mit exaktem Suchtext, damit Maker die Korrektur mit demselben Konto testen können.

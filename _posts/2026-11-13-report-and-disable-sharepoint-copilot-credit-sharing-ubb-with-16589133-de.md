---
title: SharePoint-Copilot-Credit-Freigabe (UBB) per PowerShell prüfen und deaktivieren
description: Ein PnP-PowerShell-Skript liest den UBB-Status jeder SharePoint-Website
  über die SP.UBB-Endpunkte und kann die Copilot-Credit-Freigabe deaktivieren; Ergebnisse
  landen im CSV-Bericht.
date: '2026-11-13T19:23:43Z'
author: news_editorial
lang: de
toc: false
tags:
- licensing
content_type: curated_summary
curation_id: 165891330c04af764e3f9c0d
image:
  path: "/assets/img/curated/165891330c04af764e3f9c0d.png"
  alt: 'News-Karte: SharePoint sites can share Copilot Credits for AI features, and
    one PowerShell script reports that setting and can switch it off.'
permalink: "/de/posts/report-and-disable-sharepoint-copilot-credit-sharing-ubb-with-16589133/"
translation_url: "/en/posts/report-and-disable-sharepoint-copilot-credit-sharing-ubb-with-16589133/"
source_url: https://reshmeeauckloo.com/posts/sharepoint-powershell-ubb/
source_site_url: https://reshmeeauckloo.com/
source_title: Manage SharePoint Usage-Based Billing (UBB) with PowerShell
source_name: reshmeeauckloo.com
source_language: en
source_language_name: English
source_author: Reshmee Auckloo
source_published_at: '2026-11-13'
source_type: article
faq:
- question: Wie prüfe ich mit PowerShell, welche SharePoint-Websites Usage-Based Billing
    für Copilot Credits aktiviert haben?
  answer: Verbinden Sie PnP PowerShell mit dem Admin Center und rufen Sie den Endpunkt
    SP.UBB.GetUBB je Website ab; IsUBB, EnabledDate und Credit-Status landen im CSV-Bericht.
- question: Kann PowerShell die Einstellung Copilot Credits mit dieser Website in
    SharePoint deaktivieren?
  answer: Ja, das Skript sendet SP.UBB.SetUBB(isUBB=false) je Website; das Aktivieren
    der Freigabe bleibt der SharePoint-Einstellungsoberfläche vorbehalten.
- question: Welche KI-Funktionen in SharePoint verbrauchen gemeinsame Copilot Credits
    über UBB?
  answer: Laut Quelle gehören erweitertes Autofill und schnellere Dokumentverarbeitung
    dazu; ohne Credits fällt Autofill auf Standardverarbeitung zurück.
---

## TL;DR

Laut Quelle vom 13.11.2026 erlaubt SharePoint Usage-Based Billing einer Website die Nutzung gemeinsamer Copilot Credits für KI-Funktionen wie erweitertes Autofill und schnellere Dokumentverarbeitung; bei fehlenden Credits fällt Autofill auf Standardverarbeitung zurück. Ein PnP-PowerShell-Skript meldet den UBB-Status je Website und kann die Freigabe deaktivieren, mit CSV-Bericht im Logs-Ordner.

## Warum das wichtig ist

- Admins/IT: Skript mit PnP PowerShell gegen das SharePoint-Admin Center ausführen, um den UBB-Status für Gruppen-Teamwebsites und Standard-Kanalwebsites zu berichten; Warnungen prüfen, da nicht lesbare oder aktualisierbare Websites im CSV fehlen.
- Admins/IT: Die Quelle nennt die SP.UBB-Endpunkte SharePoint-Dienstendpunkte, daher Verfügbarkeit und Verhalten vor jeder Automatisierung im eigenen Mandanten prüfen.
- Makers: Das Skript kann die Freigabe nur melden und deaktivieren; zum Aktivieren ist weiterhin die SharePoint-Websiteeinstellung zum Teilen von Copilot Credits nötig.

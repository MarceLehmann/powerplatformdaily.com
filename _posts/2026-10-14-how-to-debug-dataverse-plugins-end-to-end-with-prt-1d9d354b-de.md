---
title: Dataverse Plugins mit PRT vollständig debuggen
description: So lassen sich Dataverse Plugins und Plugin-Pakete mit dem Plugin Registration
  Tool, korrekten PDB-Dateien und passenden Profiler-Einstellungen debuggen.
date: '2026-10-14T17:00:07Z'
author: news_editorial
lang: de
toc: false
tags:
- dataverse
- power-apps
content_type: curated_summary
curation_id: 1d9d354bdccda1b0161bec9c
image:
  path: "/assets/img/curated/1d9d354bdccda1b0161bec9c.png"
  alt: 'News-Karte: Dataverse plugin packages can be debugged end to end with the
    right PRT configuration.'
permalink: "/de/posts/how-to-debug-dataverse-plugins-end-to-end-with-prt-1d9d354b/"
translation_url: "/en/posts/how-to-debug-dataverse-plugins-end-to-end-with-prt-1d9d354b/"
source_url: https://hajekj.net/2026/03/09/debugging-dataverse-plugins/
source_site_url: https://hajekj.net/
source_title: Debugging Dataverse plugins
source_name: Honza's Blarg
source_language: en
source_language_name: English
source_author: Jan Hajek
source_published_at: '2026-03-09'
source_updated_at: '2026-03-09'
source_type: article
faq:
- question: Wie konfiguriere ich PRT für das Debugging von Dataverse Plugin-Paketen?
  answer: Setzt LegacyPluginProfiler in appsettings.json des Plugin Registration Tools
    auf false, bevor PRT startet. Diese Einstellung wird für Plugin-Pakete benötigt.
- question: Warum braucht das Debugging von Dataverse Plugins eine PDB-Datei?
  answer: Eine korrekte PDB-Datei liefert die benötigten Debug-Informationen. Ohne
    sie ist Debugging auf Quellcodeebene nicht möglich.
- question: Wie wiederhole ich eine aufgezeichnete Dataverse Plugin-Ausführung in
    Visual Studio?
  answer: Startet die Profilerstellung, führt das Plugin aus, wählt Ausführung und
    Assembly aus dem Verlauf und verbindet Visual Studio mit dem Prozess für die Wiederholung.
---

## TL;DR

Für das Debugging von Dataverse Plugins braucht es das aktuelle Plugin Registration Tool, einen Debug-Build mit korrekter PDB-Datei, LegacyPluginProfiler auf false, aktivierte Plugin Trace Logs und einen verbundenen Debugger für die aufgezeichnete Ausführung.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Erstellt das Plugin in der Debug-Konfiguration und prüft die erzeugte PDB-Datei, da fehlende Debug-Informationen das Debugging des Quellcodes verhindern.
- Admins/IT: Aktiviert Plugin Trace Logs und setzt LegacyPluginProfiler in PRT auf false, weil der Legacy-Profiler bei Plugin-Paketen einen unerwarteten Fehler auslösen kann.
- Makers: Startet die Profilerstellung, führt das Plugin aus, wählt Ausführung und Assembly aus dem Verlauf und verbindet Visual Studio oder einen CLR-Debugger für die Wiederholung.

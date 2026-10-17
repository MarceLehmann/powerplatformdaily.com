---
title: Dataverse erweitert Massenlöschung um permanente Löschung und Sandbox-Modus
description: Neue Optionen für Dataverse-Massenlöschaufträge ermöglichen permanente
  Löschung und Sandbox-Ausführung über die Web API, ergänzt durch Fehlerdetails und
  Wiederherstellungsfunktionen.
date: '2026-10-17T16:53:20Z'
author: news_editorial
lang: de
toc: false
tags:
- dataverse
- power-apps
content_type: curated_summary
curation_id: 59d8d18b68755722d52b3e4a
image:
  path: "/assets/img/curated/59d8d18b68755722d52b3e4a.png"
  alt: 'News-Karte: Dataverse bulk delete jobs can now permanently delete records
    and run in sandbox mode.'
permalink: "/de/posts/dataverse-bulk-delete-adds-permanent-deletion-and-sandbox-mode-59d8d18b/"
translation_url: "/en/posts/dataverse-bulk-delete-adds-permanent-deletion-and-sandbox-mode-59d8d18b/"
source_url: https://markcarrington.dev/2026/06/22/new-bulk-delete-options-come-to-dataverse/?utm_source=rss&utm_medium=rss&utm_campaign=new-bulk-delete-options-come-to-dataverse
source_site_url: https://markcarrington.dev/
source_title: New bulk delete options come to Dataverse
source_name: markcarrington.dev
source_language: en
source_language_name: English
source_author: Mark Carrington
source_published_at: '2026-06-22'
source_type: article
faq:
- question: Wie aktiviere ich permanente Löschung in einem Dataverse-Massenlöschauftrag?
  answer: Setzt CanRecoverDeletedRecords im Options-Objekt der Web API auf false.
    Das Kontrollkästchen erscheint nur, wenn Keep deleted Dataverse records aktiviert
    ist.
- question: Wie führe ich einen Dataverse-Massenlöschauftrag im Sandbox-Modus aus?
  answer: Setzt RunJobForSandbox im Options-Objekt der Web API auf true. Der Sandbox-Modus
    ist derzeit in der Dataverse-Oberfläche nicht verfügbar.
- question: Wie zeigt Dataverse fehlgeschlagene Massenlöschungen an?
  answer: Fehlgeschlagene Datensätze werden in der Tabelle bulkdeletefailure protokolliert
    und unter Run details angezeigt. In der Oberfläche wurden die Details beim Autor
    jedoch nicht korrekt dargestellt.
---

## TL;DR

Dataverse-Massenlöschaufträge unterstützen jetzt permanente Löschung über CanRecoverDeletedRecords und Sandbox-Ausführung über RunJobForSandbox in der Web API. Zusammen verkürzten beide Optionen einen Beispielauftrag mit 1.100 Datensätzen auf durchschnittlich 05:54. Die Einstellungen sind derzeit noch nicht im .NET SDK verfügbar.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Nutzt den Sandbox-Modus für entbehrliche Testdaten, wenn Plugins und verbundene Verarbeitung nicht ausgelöst werden sollen. Der Auftrag muss derzeit über die Web API erstellt werden.
- Admins/IT: Prüft, ob permanente Löschung zu den Aufbewahrungsanforderungen passt. Sie ist relevant, wenn Keep deleted Dataverse records aktiviert ist, und entfernt Wiederherstellungsoptionen.
- BI/Data teams: Testet beide Optionen mit repräsentativen Arbeitslasten, da die gemessenen Zeiten schwankten und der Sandbox-Modus allein im Beispiel langsamer war.

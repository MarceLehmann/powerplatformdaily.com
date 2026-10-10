---
title: Deterministische Agentenflows in Microsoft Copilot Studio erstellen
description: Die Anleitung zeigt, wie Agentenflows mit Triggern und Aktionen erstellt,
  Dataverse-Datensätze aktualisiert und Ergebnisse getestet werden.
date: '2026-10-10T16:54:17Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- power-automate
- dataverse
content_type: curated_summary
curation_id: ca1f4579919606d93a4d5a3c
image:
  path: "/assets/img/curated/ca1f4579919606d93a4d5a3c.png"
  alt: 'News-Karte: Copilot Studio agents can launch deterministic flows to update
    Dataverse records.'
permalink: "/de/posts/build-deterministic-agent-flows-in-microsoft-copilot-studio-ca1f4579/"
translation_url: "/en/posts/build-deterministic-agent-flows-in-microsoft-copilot-studio-ca1f4579/"
source_url: https://citizendeveloper365.com/how-to-build-agent-flows-in-microsoft-copilot-studio/
source_site_url: https://citizendeveloper365.com/
source_title: How to Build Agent Flows in Microsoft Copilot Studio
source_name: Citizen Developer
source_language: en
source_language_name: English
source_author: Griffin Lickfeldt
source_published_at: '2026-01-03'
source_updated_at: '2026-01-05'
source_type: article
faq:
- question: Wie werden Agentenflows in Microsoft Copilot Studio gestartet?
  answer: Agentenflows können autonom oder über eine Chat-Erfahrung starten, sobald
    ein konfiguriertes Ereignis den Agenten auslöst. Als Beispiel dient die Änderung
    eines Kontofelds.
- question: Welche Dataverse-Aktion nutzt ein Agentenflow in Copilot Studio?
  answer: Ein Agentenflow kann die Aktion Update a row verwenden, um einen Dataverse-Kontodatensatz
    zu ändern, beispielsweise dessen Beschreibung.
- question: Wie teste ich simulierte Trigger für Copilot Studio Agentenflows?
  answer: Führt simulierte Trigger aus und prüft, ob alle Aktionen starten und die
    erwarteten Kontenänderungen erscheinen. Vergangene Ereignisse können für weitere
    Szenarien erneut ausgelöst werden.
---

## TL;DR

Agentenflows in Microsoft Copilot Studio führen deterministische Prozesse aus, die von einem Agenten gestartet werden. Die Anleitung zeigt Trigger, Themen, das Tool New Agent flow, Ein- und Ausgaben, eine Dataverse-Zeilenaktualisierung sowie Tests mit simulierten Triggern.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Erstellt ein Thema und fügt das Tool New Agent flow hinzu, danach klare Ein- und Ausgaben sowie Aktionen für das Szenario.
- Makers: Verwendet Update a row in Dataverse, wenn Kontoinformationen geändert werden müssen, und prüft anschliessend die erwarteten Felder.
- Admins/IT: Achtet auf die empfohlene Aktion end all topics, die den Abschluss signalisiert und unbeabsichtigte weitere Verarbeitung verhindert.

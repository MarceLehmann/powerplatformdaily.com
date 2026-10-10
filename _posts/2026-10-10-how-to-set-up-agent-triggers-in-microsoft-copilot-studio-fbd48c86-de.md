---
title: Agent-Trigger in Microsoft Copilot Studio einrichten
description: So konfigurierst du Copilot-Studio-Trigger für Dataverse-Ereignisse,
  Berechtigungen, Bereiche, Filter, Ausführungskontext und Tests.
date: '2026-10-10T16:54:17Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- dataverse
content_type: curated_summary
curation_id: fbd48c864dfbb0182a90f851
image:
  path: "/assets/img/curated/fbd48c864dfbb0182a90f851.png"
  alt: 'News-Karte: Copilot Studio agents can now act when Dataverse events occur.
    Configure triggers for autonomous work.'
permalink: "/de/posts/how-to-set-up-agent-triggers-in-microsoft-copilot-studio-fbd48c86/"
translation_url: "/en/posts/how-to-set-up-agent-triggers-in-microsoft-copilot-studio-fbd48c86/"
source_url: https://citizendeveloper365.com/how-to-setup-agent-triggers-in-microsoft-copilot-studio/
source_site_url: https://citizendeveloper365.com/
source_title: How to Setup Agent Triggers in Microsoft Copilot Studio
source_name: Citizen Developer
source_language: en
source_language_name: English
source_author: Griffin Lickfeldt
source_published_at: '2026-01-03'
source_updated_at: '2026-01-06'
source_type: article
faq:
- question: Wie erstelle ich in Copilot Studio einen Dataverse-Trigger für einen neuen
    Datensatz?
  answer: Öffne die Übersicht des Agenten, wähle Add Trigger, dann Dataverse | Add
    a record und konfiguriere Name, Verbindung, Tabelle und Eigenschaften.
- question: Welche Ausführungskontexte gibt es für Agent-Trigger in Copilot Studio?
  answer: Der Trigger kann als Flowbesitzer, ändernder Benutzer oder Zeilenbesitzer
    ausgeführt werden. Damit wird festgelegt, wessen Kontext den Agenten oder Flow
    ausführt.
- question: Wie teste ich einen Agent-Trigger nach der Einrichtung in Copilot Studio?
  answer: Erstelle den konfigurierten Dataverse-Datensatz, nutze die Testfunktion
    und prüfe den Testbereich, um Nachricht und Funktion des Triggers zu verifizieren.
---

## TL;DR

Agent-Trigger in Microsoft Copilot Studio starten Agenten bei konfigurierten Ereignissen, etwa beim Hinzufügen eines Account-Datensatzes in Dataverse. Die Einrichtung umfasst Triggerauswahl, Verbindungen, Berechtigungen, Bereich, Filter, Ausführungsoptionen und zusätzliche Anweisungen. Nach dem Anlegen eines Datensatzes lässt sich das Ergebnis im Testbereich prüfen.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Wählt einen passenden Dataverse-Trigger, legt Ereigniseigenschaften, Filter und Anweisungen fest und testet ihn mit einem neuen Datensatz, damit die richtige Nachricht ankommt.
- Admins/IT: Prüft Verbindungen, Benutzerrechte, Bereich und Ausführungskontext, weil diese Einstellungen den Datenkontext des Triggers bestimmen.
- BI/Data teams: Kontrolliert Tabelle und Änderungstyp, besonders bei Filtern wie aktiven Accounts, damit die Automatisierung nur auf die vorgesehenen Datensätze reagiert.

---
title: E-Mail-Klassifizierung mit Copilot für automatische Falltypen in D365 nutzen
description: Ein erweiteter Automatic-Record-Creation-Flow liest die Copilot-E-Mailkategorie
  aus und ordnet sie vor der Fallerstellung einem Falltyp zu.
date: '2026-10-16T16:52:25Z'
author: news_editorial
lang: de
toc: false
tags:
- power-automate
- dataverse
content_type: curated_summary
curation_id: be0d10001c9603aeb182cd5c
image:
  path: "/assets/img/curated/be0d10001c9603aeb182cd5c.png"
  alt: 'News-Karte: Copilot email classification can set the case type automatically
    before case creation.'
permalink: "/de/posts/use-copilot-email-classification-to-automate-case-types-in-d365-be0d1000/"
translation_url: "/en/posts/use-copilot-email-classification-to-automate-case-types-in-d365-be0d1000/"
source_url: https://contactcenterchronicles.com/using-ai-powered-email-classification-to-categorize-cases-in-d365-customer-service/
source_site_url: https://contactcenterchronicles.com/
source_title: Using AI-Powered Email Classification to Automatically Categorize Cases
  in D365 Customer Service
source_name: Contact Center Chronicles
source_language: en
source_language_name: English
source_author: Kristine Risberg
source_published_at: '2026-07-06'
source_type: article
faq:
- question: Wie erhält der Automatic-Record-Creation-Flow die Copilot-E-Mailkategorie?
  answer: Der Flow liest das Nachschlagefeld der E-Mail und ruft den Kategorienamen
    mit Dataverse Get a row by ID ab.
- question: Warum kann die Arbeitsklassifizierung von Unified Routing die E-Mailkategorie
    nicht zuverlässig verwenden?
  answer: Die Klassifizierung liegt auf der E-Mail, während der Fall-Workstream Falldatensätze
    auswertet und die passende verknüpfte E-Mail nicht sicher bestimmen kann.
- question: Wie setzt die Switch-Aktion den Falltyp in Dynamics 365?
  answer: Switch vergleicht den abgerufenen Kategorienamen und setzt eine numerische
    CaseType-Variable, die Create a record in eine Ganzzahl umwandelt.
---

## TL;DR

Copilot ordnet eingehende E-Mails vordefinierten Kategorien zu. Ein erweiterter Automatic-Record-Creation-Flow liest den zugehörigen Dataverse-Datensatz, ordnet ihn per Switch einem Falltyp zu und schreibt den Integerwert vor der Fallerstellung in das Auswahlfeld Case Type.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Erweitert den klassischen Automatic-Record-Creation-Flow vor Create a record, lest die E-Mailkategorie aus und ordnet sie per Switch zu.
- Admins/IT: Konfiguriert Kategorien mit Beschreibungen, legt die zu verarbeitenden E-Mails fest, aktiviert die Verarbeitung beim Eingang und prüft die Funktion.

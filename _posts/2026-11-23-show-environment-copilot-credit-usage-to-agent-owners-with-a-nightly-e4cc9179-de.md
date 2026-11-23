---
title: Copilot-Credit-Verbrauch pro Umgebung für Agent-Owner sichtbar machen
description: Laut Quelle vom 20.10.2026 zeigt ein selbst gebautes Tool Agent-Ownern
  monatlich den Copilot-Credit-Verbrauch jeder Umgebung gegen ihr Limit, nachts über
  die Licensing API gesammelt.
date: '2026-11-23T01:40:32Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- power-automate
- licensing
- connectors
content_type: curated_summary
curation_id: e4cc917964a691a5f9098845
image:
  path: "/assets/img/curated/e4cc917964a691a5f9098845.png"
  alt: 'News-Karte: Copilot Credit visibility belongs with agent owners, not just
    admins. A nightly Power Automate flow shows each maker the environment pool.'
permalink: "/de/posts/show-environment-copilot-credit-usage-to-agent-owners-with-a-nightly-e4cc9179/"
translation_url: "/en/posts/show-environment-copilot-credit-usage-to-agent-owners-with-a-nightly-e4cc9179/"
source_url: https://www.karlex.fi/copilotcreditusage/
source_site_url: https://www.karlex.fi/
source_title: Agent owners should follow environment Copilot Credit usage – not the
  admins
source_name: Karlex
source_language: en
source_language_name: English
source_author: Karl-Johan Spiik
source_published_at: '2026-10-20'
source_type: article
faq:
- question: Wo sieht ein Agent-Owner in Copilot Studio den Credit-Verbrauch der anderen
    Agents?
  answer: Nur den eigenen Agent zeigt die Monitor-Seite, das Tool der Quelle liest
    daher nachts Umgebungsberechtigung und Thresholds und zeigt den Verbrauch gegen
    das Umgebungslimit.
- question: Welche API liefert die im Monat abgerechneten Credits pro Copilot Studio
    Agent?
  answer: Get All Resource Thresholds, dieselben Daten wie die Seite Agents verwalten
    im Admin Center; der Entitlement-Insight-Aufruf pro Agent gab in den Tests der
    Quelle einen 403-Fehler.
- question: Gilt Power Platform Pay-as-you-go auch für Developer-Umgebungen?
  answer: Laut Quelle funktioniert Pay-as-you-go nur in Produktions- und Sandbox-Umgebungen,
    Developer-Umgebungen sind von dieser Abrechnung ausgeschlossen.
animation:
  video: /assets/img/animations/e4cc917964a691a5f9098845-de.mp4
  poster: /assets/img/animations/e4cc917964a691a5f9098845-de.poster.webp
  width: 800
  height: 450
  alt: "Ein naechtlicher Power Automate Flow liest pro Umgebung die MCSMessages-Berechtigung und Resource Thresholds, speichert Zeilen in einer SharePoint-Liste und zeigt Makern den Verbrauch gegen das Umgebungslimit."
---

## TL;DR

Laut Quelle vom 20.10.2026 zeigt Copilot Studio Agent-Ownern nur die Credits des eigenen Agents, Zuweisung und Verbrauch pro Agent liegen im Admin Center. Ein nächtlicher Power Automate Flow liest die MCSMessages-Berechtigung jeder Umgebung und die Resource Thresholds, speichert Zeilen in einer SharePoint-Liste und zeigt Makern den Verbrauch gegen das Umgebungslimit; die Version mit Entra-Gruppen ist im Aufbau.

## Warum das wichtig ist

- Makers: Die Monitor-Seite zeigt nur den eigenen Agent, fragt daher auch nach Zuweisung und Verbrauch der gemeinsamen Umgebung, da die meisten Agents kein eigenes Monatslimit haben.
- Admins/IT: Statt jeden Grenzfall zu erklären, Daten über die Licensing API und Resource Thresholds bereitstellen und Maker-Rechte nur über Entra-Gruppen vergeben, damit die Sichtbarkeit funktioniert.
- Leadership/Business: Sichtbarkeit wirkt als leichte Steuerung, ein kritisches Projekt kann dadurch in eine eigene Umgebung mit eigenen Makern wechseln.

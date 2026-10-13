---
title: Dauerhafte Copilot Studio Prozesse mit Dataverse Statustabellen bauen
description: Ein praxisnahes Muster für langfristige Rechnungs- und Bestellprozesse
  mit Copilot Studio Agents, Agent Flows, Dataverse und geplanten Prüfungen.
date: '2026-10-13T16:58:42Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- dataverse
- power-automate
- power-bi
- connectors
content_type: curated_summary
curation_id: 8ea278de479cfe2e67a1e0ca
image:
  path: "/assets/img/curated/8ea278de479cfe2e67a1e0ca.png"
  alt: 'News-Karte: Copilot Studio agents can orchestrate long-running processes through
    Dataverse state tables.'
permalink: "/de/posts/build-durable-copilot-studio-processes-with-dataverse-state-tables-8ea278de/"
translation_url: "/en/posts/build-durable-copilot-studio-processes-with-dataverse-state-tables-8ea278de/"
source_url: https://holgerimbery.blog/statetable-multi-agent-orchestration
source_site_url: https://holgerimbery.blog/
source_title: 'Long-Running Business Processes in Copilot Studio: State Tables, Agent
  Flows and Multi-Agent Orchestration'
source_name: Holger Imbery - fieldnotes and insights
source_language: en
source_language_name: English
source_author: Holger Imbery
source_published_at: '2026-09-13'
source_type: article
faq:
- question: Wie verarbeitet Copilot Studio einen Rechnungsprozess mit mehrtägiger
    Wartezeit?
  answer: Der Fall und seine nächste Ausführungszeit werden in Dataverse gespeichert,
    danach nimmt ein geplanter Agent Flow fällige Arbeit wieder auf. Das Gespräch
    bleibt nicht offen.
- question: Welche Aufgabe hat der TransitionCase Agent Flow in Copilot Studio?
  answer: TransitionCase prüft eine angeforderte Zustandsänderung gegen eine Liste
    erlaubter Übergänge und speichert die neue Zeilenversion. So kontrolliert eine
    Komponente die Statusänderungen.
- question: Wie werden gescannte Rechnungen in diesem Copilot Studio Muster verarbeitet?
  answer: Ein Spezialist führt gescannte Dokumente durch OCR oder Document Intelligence,
    erzeugt strukturierte Rechnungsfelder mit Feldsicherheit und speichert das Ergebnis
    in der Statustabelle.
---

## TL;DR

Eine zentrale Dataverse Statustabelle dient als Quelle der Wahrheit für langfristige Copilot Studio Prozesse. Ein Orchestrator Agent verteilt Fälle an Spezialisten, während Agent Flows Übergänge absichern, deterministische Aufgaben ausführen, Connectoren aufrufen und fällige Fälle prüfen.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Die Geschäftszustände zuerst festlegen und Routing in Copilot Studio von deterministischen Prüfungen in Agent Flows trennen, damit jede Komponente klar abgegrenzt bleibt.
- Admins/IT: Dataverse Zeilen, geschützte Übergänge und geplante Prüfungen statt offener Gesprächssitzungen verwenden, damit Fälle Wartezeiten und Neustarts überstehen.
- BI/Data teams: Power BI Berichte über der Statustabelle erstellen, um Fallzahlen, Verweildauer und Felder mit niedriger Extraktionssicherheit zu verfolgen.
- Leadership/Business: Mit einem Dokumenttyp und einer Lieferantengruppe starten und Audit Trail sowie NeedsHuman Warteschlange prüfen, bevor der Prozess erweitert wird.

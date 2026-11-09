---
title: Optionale Genehmigungen in einem Power Automate Flow steuern
description: Bedingungen, eindeutige Ergebnisse und getrennte Regeln führen nur die
  benötigten Genehmigungen aus, ohne gemeinsame Prozessschritte in mehreren Flows
  zu duplizieren.
date: '2026-11-09T07:25:36Z'
author: news_editorial
lang: de
toc: false
tags:
- power-automate
content_type: curated_summary
curation_id: 7fb43c8efde41d32914f112c
image:
  path: "/assets/img/curated/7fb43c8efde41d32914f112c.png"
  alt: 'News-Karte: Power Automate can handle optional approval steps in one cloud
    flow.'
permalink: "/de/posts/handle-optional-power-automate-approvals-in-one-cloud-flow-7fb43c8e/"
translation_url: "/en/posts/handle-optional-power-automate-approvals-in-one-cloud-flow-7fb43c8e/"
source_url: https://softchief.com/power-automate-handle-optional-approval-steps-without-creating-separate-flows/
source_site_url: https://softchief.com/
source_title: 'Power Automate: Handle Optional Approval Steps Without Creating Separate
  Flows'
source_name: Softchief Technologies
source_language: en
source_language_name: English
source_author: Softchief Author
source_published_at: '2026-11-09'
source_type: article
faq:
- question: Wie überspringt Power Automate eine optionale Managergenehmigung ohne
    einen weiteren Flow?
  answer: Platziere die Genehmigung in einem Bedingungszweig und führe gemeinsame
    Aktionen danach weiter. Der übersprungene Pfad sollte ausdrücklich das Ergebnis
    Nicht erforderlich erhalten.
- question: Wie kann ein Power Automate Flow eine nicht ausgeführte Genehmigung erfassen?
  answer: Initialisiere eine Ergebnisvariable vor der Bedingung mit Nicht erforderlich
    und ersetze diesen Wert durch das Genehmigungsergebnis, wenn der Zweig ausgeführt
    wird.
- question: Wie behandelt man Ablehnung und keine Antwort bei optionalen Power Automate
    Genehmigungen?
  answer: Prüfe die Ergebnisse nach jeder Genehmigung und definiere getrennte Behandlung
    für Ablehnung, Zeitüberschreitung oder fehlgeschlagene Aktionen. Teste jeden Fall
    im Ausführungsverlauf.
animation:
  video: /assets/img/animations/7fb43c8efde41d32914f112c-de.mp4
  poster: /assets/img/animations/7fb43c8efde41d32914f112c-de.poster.webp
  width: 800
  height: 450
  alt: "Eine Abfolge mit vier Schritten zeigt einen Power Automate Flow: Zuerst Nicht erforderlich initialisieren, dann eine Genehmigung bei Bedarf im Bedingungszweig ausfuehren, danach das Ergebnis ersetzen und zuletzt alle Pfade testen."
---

## TL;DR

Power Automate kann mit Bedingungen oder Switch-Aktionen optionale Manager- und Finanzgenehmigungen in einem Cloud Flow ausführen. Initialisiere Ergebnisse wie Nicht erforderlich vor jedem Zweig, aktualisiere sie bei ausgeführten Genehmigungen und teste genehmigte, abgelehnte, übersprungene und unbeantwortete Pfade.

## Warum das wichtig ist

- Makers: Formuliere Genehmigungsregeln klar, nutze Bedingungen oder Switch-Aktionen und initialisiere übersprungene Ergebnisse, damit nachgelagerte Schritte Nicht erforderlich von Genehmigt oder Abgelehnt unterscheiden können.
- Makers: Platziere gemeinsame Aktualisierungen und Benachrichtigungen nach den Genehmigungszweigen und teste jeden erforderlichen, übersprungenen, abgelehnten und unbeantworteten Pfad in der Ausführungsverlauf.
- Leadership/Business: Kläre Schwellenwerte, Grenzwerte, Währungen sowie den Umgang mit Ablehnungen und Zeitüberschreitungen mit den Prozessverantwortlichen.

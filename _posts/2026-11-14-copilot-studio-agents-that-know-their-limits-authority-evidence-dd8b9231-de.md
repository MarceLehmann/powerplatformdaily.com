---
title: 'Copilot Studio Agenten mit Grenzen: Befugnis, Evidenz und Durchsetzung'
description: Copilot Studio Agenten, die Datensätze ändern, brauchen klar delegierte
  Befugnis, geprüfte Evidenz und Kontrollen genau dort, wo die Aktion passiert, gezeigt
  am fiktiven Rückerstattungsbeispiel.
date: '2026-11-14T13:24:57Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
content_type: curated_summary
curation_id: dd8b92314f5be61382184acf
image:
  path: "/assets/img/curated/dd8b92314f5be61382184acf.png"
  alt: 'News-Karte: Design Copilot Studio agents around authority, evidence and enforcement
    before they touch business records.'
permalink: "/de/posts/copilot-studio-agents-that-know-their-limits-authority-evidence-dd8b9231/"
translation_url: "/en/posts/copilot-studio-agents-that-know-their-limits-authority-evidence-dd8b9231/"
source_url: https://www.divyaakula.com/copilotstudio/2026/11/14/agents-that-know-their-limits.html
source_site_url: https://www.divyaakula.com/
source_title: Agents That Know Their Limits
source_name: Divya Akula blog
source_language: en
source_language_name: English
source_author: Divya Akula
source_published_at: '2026-11-14'
source_type: article
faq:
- question: Wie viel darf ein Copilot Studio Agent bei Rückerstattungen selbst genehmigen?
  answer: Laut Quelle gilt eine beispielhafte delegierte Grenze von 100 Dollar pro
    Auftrag; eine berechtigte Rückerstattung von 80 Dollar wird ausgeführt, 800 Dollar
    gehen zur Prüfung.
- question: Was macht ein Copilot Studio Agent, wenn das Kaufdatum für eine Rückerstattung
    fehlt?
  answer: Er liefert das Ergebnis ASK und teilt mit, dass das Datum geprüft werden
    muss, bevor die 30-Tage-Frist der Richtlinie geprüft werden kann.
- question: Was hat die Rückerstattungs-Demo mit Copilot Studio und Azure AI Foundry
    tatsächlich getestet?
  answer: 'Zwei getrennte Routen: eine Foundry-Analyse nur beratend und ein deterministischer
    Ablauf mit fiktiven Testdaten; ein durchgehender Ausführungspfad wurde nicht verifiziert.'
---

## TL;DR

Ein Beitrag von Divya Akula vom 14.11.2026 entwirft einen Copilot Studio Rückerstattungsagenten um drei Fragen: Was darf der Agent tun (beispielhafte Grenze von 100 Dollar pro Auftrag), reicht die Evidenz (Ergebnisse PROCEED, ASK, REVIEW) und wo wird erzwungen (Prüfung im Dienst, der den Schreibzugriff ausführt)? Die Demo nutzte getrennt getestete Routen; ein durchgehender Ausführungspfad wurde nicht verifiziert.

## Warum das wichtig ist

- Makers: Ziel, Untersuchungsquellen, Aktionsumfang, Eingriffspunkte und Verantwortlichkeit vor der Toolauswahl schriftlich festlegen und die blockierende Prüfung in den Dienst legen, der den Schreibzugriff ausführt, statt nur auf Agentenanweisungen zu setzen.
- Admins/IT: Berechtigungen an die Aufgabenteilung koppeln, damit ein nur lesender Analyst-Agent kein Ausführungswerkzeug erhält und kein breit privilegierter geteilter Zugang die Architektur untergräbt.
- Leadership/Business: Eskalationen oberhalb delegierter Grenzen als korrektes Verhalten des Systems werten und einen echten Prüfworkflow mit verifizierten Freigaben unterstützen, statt sich auf Modellanweisungen zu verlassen.

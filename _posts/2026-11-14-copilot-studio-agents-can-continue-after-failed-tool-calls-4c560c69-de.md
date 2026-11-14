---
title: Copilot Studio Agents können nach fehlgeschlagenen Tool-Aufrufen fortfahren
description: Laut Quelle vom 13.11.2026 setzte der Copilot-Studio-Harness seine Arbeit
  nach fehlgeschlagenen Tool-Aufrufen in 84–91 % beobachteter Fälle fort. Ergebnisse
  müssen weiterhin geprüft werden.
date: '2026-11-14T07:24:27Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- connectors
content_type: curated_summary
curation_id: 4c560c690f3fb7d76ffc6260
image:
  path: "/assets/img/curated/4c560c690f3fb7d76ffc6260.png"
  alt: 'News-Karte: Copilot Studio agents can continue after failed tool calls.'
permalink: "/de/posts/copilot-studio-agents-can-continue-after-failed-tool-calls-4c560c69/"
translation_url: "/en/posts/copilot-studio-agents-can-continue-after-failed-tool-calls-4c560c69/"
source_url: https://flowaltdelete.ca/2026/11/13/copilot-connector-write-actions-november-13-2026/
source_site_url: https://flowaltdelete.ca/
source_title: What Copilot Studio agents do after a failed tool call
source_name: Flow Alt Delete
source_language: en
source_language_name: English
source_author: Josh Cook
source_published_at: '2026-11-13'
source_type: article
faq:
- question: Wie reagiert der Copilot-Studio-Harness auf einen fehlgeschlagenen Tool-Aufruf?
  answer: Der Harness prüft das fehlgeschlagene Ergebnis, entscheidet über den nächsten
    Schritt und kann innerhalb seiner Zeit-, Schritt- und Token-Grenzen fortfahren.
- question: Was misst das Ergebnis von 84–91 % bei Copilot Studio?
  answer: Microsoft berichtet 84–91 % Fortsetzung in beobachteten Fällen über autonome
    und Microsoft-365-Copilot-Kanäle hinweg. Der Wert bestätigt keinen vollständigen
    Abschluss.
- question: Wie teste ich einen Copilot-Studio-Agent mit fehlenden oder geschützten
    Daten?
  answer: Verwendet eine Arbeitsmappe ohne erwartete Tabelle und einen nicht zugänglichen
    Datensatz. Prüft danach, ob der Agent beide Einschränkungen klar meldet.
animation:
  video: /assets/img/animations/4c560c690f3fb7d76ffc6260-de.mp4
  poster: /assets/img/animations/4c560c690f3fb7d76ffc6260-de.poster.webp
  width: 800
  height: 450
  alt: "Eine Vier-Schritt-Abfolge zeigt, wie der Copilot-Studio-Harness einen Schritt ausfuehrt, das Ergebnis prueft, den naechsten Schritt festlegt und innerhalb von Grenzen wiederholt."
---

## TL;DR

Der Copilot-Studio-Harness prüft jeden Schritt, entscheidet über das weitere Vorgehen und wiederholt es innerhalb von Zeit-, Schritt- und Token-Grenzen. Laut Quelle vom 13.11.2026 setzten Agents ihre Arbeit in 84–91 % beobachteter Fälle nach einem fehlgeschlagenen Tool-Aufruf fort. Das beweist noch keinen vollständigen Abschluss.

## Warum das wichtig ist

- Makers: Testet Agents mit einer Excel-Arbeitsmappe ohne erwartete Tabelle und prüft, ob fehlende Eingaben erkannt werden, denn weiteres Ausführen garantiert kein brauchbares Ergebnis.
- BI/Data teams: Verwendet zusätzlich einen Datensatz ohne Zugriffsberechtigung und prüft, ob der Agent die Zugriffssperre meldet, statt fehlende Daten als gültig zu behandeln.
- Admins/IT: Prüft Connector-Zugriffe und Anmeldedaten bei fehlgeschlagenen Tool-Aufrufen, weil Copilot Studio diese Verbindungen verwaltet und der Harness den nächsten Schritt steuert.

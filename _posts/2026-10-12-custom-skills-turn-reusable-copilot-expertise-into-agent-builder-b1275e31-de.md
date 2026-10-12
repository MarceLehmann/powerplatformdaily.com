---
title: Custom Skills machen wiederverwendbares Copilot-Wissen in Agent Builder nutzbar
description: Custom Skills bündeln Anweisungen, Dateien und Skripte für deklarative
  Agents. Der Beitrag zeigt, wann Agent Builder genügt und wann Copilot Studio erforderlich
  wird.
date: '2026-10-12T16:57:21Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- roadmap
- licensing
content_type: curated_summary
curation_id: b1275e31d09f3c57801a6dfc
image:
  path: "/assets/img/curated/b1275e31d09f3c57801a6dfc.png"
  alt: 'News-Karte: Custom skills package reusable expertise for declarative agents.'
permalink: "/de/posts/custom-skills-turn-reusable-copilot-expertise-into-agent-builder-b1275e31/"
translation_url: "/en/posts/custom-skills-turn-reusable-copilot-expertise-into-agent-builder-b1275e31/"
source_url: https://holgerimbery.blog/declarative-agent-skills-agent-builder
source_site_url: https://holgerimbery.blog/
source_title: Prompt Libraries Are Reusable Text - Skills Are Reusable Expertise
source_name: Holger Imbery - fieldnotes and insights
source_language: en
source_language_name: English
source_author: Holger Imbery
source_published_at: '2026-09-19'
source_type: article
faq:
- question: Wie funktionieren Custom Skills in Microsoft 365 Copilot Agent Builder?
  answer: Custom Skills bündeln Anweisungen, Referenzdateien, Vorlagen und Skripte.
    Ein deklarativer Agent lädt sie erst, wenn die jeweilige Aufgabe sie benötigt.
- question: Welches Format muss ein Skill für den Upload in Agent Builder haben?
  answer: Agent Builder benötigt das vollständige Skill-ZIP. Der Upload von SKILL.md
    allein oder einzelner Dateien wird nicht unterstützt.
- question: Wann sollte ein Custom Skill von Agent Builder zu Copilot Studio wechseln?
  answer: Der Wechsel ist vorgesehen, wenn der Skill Integrationen, mehrstufige Workflows,
    autonome Aktionen, Lifecycle-Management oder einen externen Kanal benötigt.
---

## TL;DR

Custom Skills für deklarative Agents bündeln Anweisungen, Referenzdateien, Vorlagen und Skripte in einem Ordner, der bei Bedarf geladen wird. Für Dokumente, Bewertungen und Entscheidungsaufzeichnungen empfiehlt die Quelle Agent Builder. Copilot Studio ist für grössere Zielgruppen, Workflows, Integrationen, autonome Szenarien oder externe Kanäle vorgesehen.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Beginnt mit einem wiederkehrenden Dokumentenprozess, ladet das vollständige Skill-ZIP in Agent Builder hoch und testet, ob die Beschreibung den Skill zuverlässig auslöst.
- Admins/IT: Prüft die Teilnahme an der Frontier Preview und die Einschränkung durch Information Barriers. Haltet das Masterpaket in der Versionsverwaltung, weil Skills derzeit nicht zwischen Agents geteilt werden können.
- Leadership/Business: Nutzt Agent Builder für einfache Inhaltsarbeit und wechselt erst zu Copilot Studio, wenn eine Verbindung zu anderen Systemen oder umfangreiche Workflows erforderlich sind.

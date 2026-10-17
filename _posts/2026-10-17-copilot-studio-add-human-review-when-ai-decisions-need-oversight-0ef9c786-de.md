---
title: 'Copilot Studio: Menschliche Prüfung für unsichere KI-Entscheidungen'
description: Dieser Copilot-Studio-Arbeitsablauf prüft Kreditzwecke, fordert über
  Outlook oder Teams eine menschliche Entscheidung an und speichert sie in SharePoint.
date: '2026-10-17T16:53:25Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- connectors
content_type: curated_summary
curation_id: 0ef9c7863178b432cf0fbe98
image:
  path: "/assets/img/curated/0ef9c7863178b432cf0fbe98.png"
  alt: 'News-Karte: Copilot Studio agents can pause for human review when an AI decision
    is uncertain.'
permalink: "/de/posts/copilot-studio-add-human-review-when-ai-decisions-need-oversight-0ef9c786/"
translation_url: "/en/posts/copilot-studio-add-human-review-when-ai-decisions-need-oversight-0ef9c786/"
source_url: https://www.matthewdevaney.com/copilot-studio-ask-for-human-review-on-ai-decisions/
source_site_url: https://www.matthewdevaney.com/
source_title: 'Copilot Studio: Ask For Human Review On AI Decisions'
source_name: Matthew Devaney
source_language: en
source_language_name: English
source_author: Matthew Devaney
source_published_at: '2026-09-27'
source_type: article
faq:
- question: Wie erkennt ein Copilot-Studio-Arbeitsablauf einen nötigen menschlichen
    Kreditprüfer?
  answer: Der Arbeitsablauf weist Human-Review zu, wenn der angegebene Kreditzweck
    keinen passenden Eintrag in der SharePoint-Liste Loan Purposes hat.
- question: Über welche Kanäle kann Copilot Studio eine menschliche Prüfung anfordern?
  answer: Die Human-Review-Aktion kann eine prüfende Person per Outlook-E-Mail oder
    Teams-Chat kontaktieren und danach auf die Antwort warten.
- question: Wie speichert Copilot Studio die Entscheidung und Begründung der menschlichen
    Prüfung?
  answer: Der Arbeitsablauf aktualisiert SharePoint mit Allowed oder Flagged, dem
    Prüfstatus und der von der prüfenden Person eingegebenen Begründung.
---

## TL;DR

Ein Copilot-Studio-Arbeitsablauf vergleicht den Kreditzweck mit einer SharePoint-Liste, weist Allowed, Flagged oder Human-Review zu und wartet bei unbekannten Zwecken auf eine Antwort über Outlook oder Teams. Danach werden Entscheidung, Prüfstatus und Begründung im Kreditantrag gespeichert.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Füge einen Agentenknoten mit strukturierter Kategorieausgabe hinzu, damit Allowed, Flagged und Human-Review getrennt verarbeitet werden.
- Makers: Konfiguriere die Human-Review-Aktion mit Eingaben für eine Ja- oder Nein-Entscheidung und eine Begründung.
- Admins/IT: Beobachte den Outlook- oder Teams-Prüfkanal und die SharePoint-Felder, weil der Arbeitsablauf auf die Antwort wartet.

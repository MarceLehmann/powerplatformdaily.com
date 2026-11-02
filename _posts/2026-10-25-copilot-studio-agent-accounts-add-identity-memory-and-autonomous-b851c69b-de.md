---
title: Copilot Studio Agent-Konten bringen Identität, Gedächtnis und Trigger
description: Agent-Konten in der Copilot Studio Frontier Preview geben Agenten eine
  Microsoft-365-Identität, gemeinsames Gedächtnis sowie Ereignis- und Zeitplan-Trigger.
date: '2026-10-25T10:36:40Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- licensing
- connectors
- roadmap
content_type: curated_summary
curation_id: b851c69b871c47c796ba51a0
image:
  path: "/assets/img/curated/b851c69b871c47c796ba51a0.png"
  alt: 'News-Karte: Copilot Studio agents can get their own Microsoft 365 identity,
    mailbox and triggers.'
permalink: "/de/posts/copilot-studio-agent-accounts-add-identity-memory-and-autonomous-b851c69b/"
translation_url: "/en/posts/copilot-studio-agent-accounts-add-identity-memory-and-autonomous-b851c69b/"
source_url: https://aidevme.com/copilot-studio-agent-accounts-governance/?utm_source=rss&utm_medium=rss&utm_campaign=copilot-studio-agent-accounts-governance
source_site_url: https://aidevme.com/
source_title: 'Copilot Studio Agent Accounts: What Architects Must Check Before an
  Agent Gets Its Own Identity'
source_name: Practical AI, Copilot & Modern Development Insights
source_language: en
source_language_name: English
source_author: Zsolt Zombik
source_published_at: '2026-10-25'
source_type: article
faq:
- question: Was bringt ein Agent-Konto in Copilot Studio?
  answer: Ein Agent-Konto gibt dem Agenten ein Microsoft-Entra-Konto, ein Postfach,
    eine Teams-Präsenz und einen Verzeichniseintrag sowie gemeinsames Gedächtnis.
- question: Welche Voraussetzungen braucht Agent accounts in Copilot Studio?
  answer: Der Tenant muss für Frontier registriert sein, die Frontier-Vorlage muss
    aktiviert werden, und eine Umgebung mit frühem Release, aktivierte Agent-Konten
    sowie passende Lizenzen sind erforderlich.
- question: Kann gemeinsames Gedächtnis von Copilot Studio Agent-Konten Informationen
    offenlegen?
  answer: Ja. Geteilte Dateien oder Chats können in Antworten für Nutzer zusammengefasst
    werden, die keinen Zugriff besitzen, geschützte Dokumente kann der Agent jedoch
    nicht lesen.
animation:
  video: /assets/img/animations/b851c69b871c47c796ba51a0-de.mp4
  poster: /assets/img/animations/b851c69b871c47c796ba51a0-de.poster.webp
  width: 800
  height: 450
  alt: "Eine Abfolge mit fuenf Schritten zeigt die Tenant-Registrierung fuer Frontier, das Aktivieren der Frontier-Vorlage, eine Umgebung mit fruehem Release, das Aktivieren von Agent-Konten und passende Lizenzen."
---

## TL;DR

Copilot Studio Agent-Konten in der Frontier Preview geben Agenten eine Microsoft-Entra-Identität, ein Postfach, eine Teams-Präsenz und gemeinsames Gedächtnis. Ereignis- oder Wiederholungstrigger können Arbeit im GitHub-Copilot-Harness autonom starten. Erforderlich sind Tenant-Registrierung, eine Umgebung mit frühem Release, aktivierte Agent-Konten, passende Maker-Lizenzen und eine separate Kontolizenz beim Veröffentlichen.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Trigger vor dem Veröffentlichen testen, Namen und Besitzer früh festlegen und den Authentifizierungsmodus jedes Tools prüfen, weil Identität und E-Mail-Adresse danach nicht mehr geändert werden können.
- Admins/IT: Die Preview auf eine Umgebung mit frühem Release und ausgewählte Ersteller begrenzen, Entra-API-Berechtigungen prüfen und Copilot Credits überwachen, weil autonome Ausführungen über die Host-Umgebung abgerechnet werden.
- Leadership/Business: Einen wiederkehrenden internen Prozess wählen, bei dem alle Beteiligten die Daten sehen dürfen, weil Agent-Konten gemeinsames Gedächtnis verwenden und die Preview keine separate Abwahl ermöglicht.

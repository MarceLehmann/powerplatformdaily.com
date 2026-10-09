---
title: E-Mails mit Agents in Microsoft Copilot Studio senden
description: So richten Sie einen Copilot-Studio-Agent ein, der E-Mails über Outlook
  oder einen Agent-Flow sendet, mit dynamischen Eingaben, Bestätigung und Tests.
date: '2026-10-09T16:52:54Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- connectors
content_type: curated_summary
curation_id: 8ff5e30f5737912a695745a7
image:
  path: "/assets/img/curated/8ff5e30f5737912a695745a7.png"
  alt: 'News-Karte: Copilot Studio agents can send emails through Outlook or agent
    flows.'
permalink: "/de/posts/send-emails-with-agents-in-microsoft-copilot-studio-8ff5e30f/"
translation_url: "/en/posts/send-emails-with-agents-in-microsoft-copilot-studio-8ff5e30f/"
source_url: https://citizendeveloper365.com/send-emails-with-agents-in-mirosoft-copilot-studio/
source_site_url: https://citizendeveloper365.com/
source_title: 'Solved: Send Emails with Agents in Microsoft Copilot Studio'
source_name: Citizen Developer
source_language: en
source_language_name: English
source_author: Griffin Lickfeldt
source_published_at: '2026-01-03'
source_updated_at: '2026-01-07'
source_type: article
faq:
- question: Wie kann ein Copilot-Studio-Agent bei einer geänderten Kreditsperre eine
    E-Mail senden?
  answer: Konfigurieren Sie die Änderung der Kreditsperre als Trigger und verbinden
    Sie anschliessend Outlook oder einen Agent-Flow für den E-Mail-Versand.
- question: Was ist der Unterschied zwischen Outlook und Agent-Flows beim E-Mail-Versand
    in Copilot Studio?
  answer: Die Office-365-Outlook-Verbindung ist für einfache E-Mails schneller eingerichtet,
    während ein Agent-Flow mehr Kontrolle für deterministische Prozesse bietet.
- question: Wie kann ich vor dem E-Mail-Versand eines Copilot-Studio-Agents eine Bestätigung
    verlangen?
  answer: Aktivieren Sie die Bestätigungsoption in der E-Mail-Konfiguration, besonders
    in Chats, damit der Benutzer die Nachricht vor dem Versand bestätigt.
---

## TL;DR

Microsoft Copilot Studio-Agents können bei Ereignissen wie einer Änderung der Kreditsperre eines Kontos E-Mails senden. Wählen Sie das Office-365-Outlook-Tool zum E-Mail-Senden oder einen Agent-Flow, definieren Sie Empfänger und Inhalt, aktivieren Sie bei Bedarf eine Bestätigung und prüfen Sie die Zustellung im Test.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Nutzen Sie die Outlook-Verbindung für einfache Nachrichten und einen Agent-Flow, wenn Sie die gesendeten Informationen deterministisch steuern müssen.
- Makers: Legen Sie Empfänger, Betreff und Nachrichtentext fest, testen Sie die Trigger in Copilot Studio und prüfen Sie den E-Mail-Eingang.
- Admins/IT: Prüfen Sie automatisierte externe E-Mails und schützen Sie vertrauliche Informationen, da KI-generierte Antworten variieren können.
- Leadership/Business: Identifizieren Sie wiederkehrende ereignisgesteuerte E-Mails für die Automatisierung und behalten Sie die Kontrolle über die Kommunikation.

---
title: SharePoint-Freigabelinks in einem Copilot-Studio-Agentenfluss analysieren
description: Ein Agentenfluss übernimmt einen SharePoint-Freigabelink, fragt SharePoint
  ab und gibt die Website-URL sowie den relativen Dateipfad zurück.
date: '2026-11-03T19:46:04Z'
author: news_editorial
lang: de
toc: false
tags:
- copilot-studio
- power-automate
- connectors
content_type: curated_summary
curation_id: 9a643d2bff080dad6721d127
image:
  path: "/assets/img/curated/9a643d2bff080dad6721d127.png"
  alt: 'News-Karte: Copilot Studio agent flows can turn SharePoint sharing links into
    site URLs and relative file paths.'
permalink: "/de/posts/parse-sharepoint-sharing-links-in-a-copilot-studio-agent-flow-9a643d2b/"
translation_url: "/en/posts/parse-sharepoint-sharing-links-in-a-copilot-studio-agent-flow-9a643d2b/"
source_url: https://flali.hatenablog.com/entry/CopilotStudioAgentFlowSharePointLink
source_site_url: https://flali.hatenablog.com/
source_title: "【Copilot Studio】SharePointの共有リンクを解析する（Agent Flow）"
source_name: ふらりのメモ書き
source_language: ja
source_language_name: ja
source_author: flali
source_published_at: '2026-09-30'
source_type: article
faq:
- question: Wie analysiert ein Copilot-Studio-Agentenfluss einen SharePoint-Freigabelink?
  answer: Der Fluss entfernt die Abfragezeichenfolge, kodiert den verbleibenden Link
    mit modifiziertem Base64 und verwendet ihn für eine SharePoint-driveItem-Anfrage.
- question: Welche Werte gibt der SharePoint-Freigabelink-Fluss an den Copilot-Studio-Agenten
    zurück?
  answer: Er gibt die SharePoint-Website-URL und den relativen Dateipfad als zwei
    Textausgaben in der Agentenantwort zurück.
- question: Kann diese Methode zur Analyse von SharePoint-Links in Power-Automate-Cloud-Flows
    verwendet werden?
  answer: Ja, die beschriebene Methode kann auch in einem Power-Automate-Cloud-Flow
    verwendet werden, da der Agentenfluss ein Cloud-Flow ist.
---

## TL;DR

Ein Copilot-Studio-Agentenfluss übernimmt einen SharePoint-Freigabelink, entfernt die Abfragezeichenfolge, wandelt den restlichen Link in modifiziertes Base64 um und verwendet HTTP-GET-Anfragen an SharePoint. Dadurch werden die Website-URL und der relative Dateipfad ermittelt und als zwei Textausgaben an den Agenten zurückgegeben.

## Warum das wichtig ist

- Makers: Den im Chat eingegebenen SharePoint-Freigabelink an den Agentenfluss übergeben und siteUrl sowie fileRelativePath als Textausgaben zurückgeben.
- Admins/IT: Eine SharePoint-Websiteadresse auswählen und die HTTP-GET-Anfragen für driveItem und site konfigurieren.

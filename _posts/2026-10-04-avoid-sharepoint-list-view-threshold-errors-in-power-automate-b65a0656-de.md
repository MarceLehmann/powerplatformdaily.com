---
title: SharePoint-Schwellenfehler in Power Automate vermeiden
description: Verwenden Sie Filter Query in Get files (properties only), um aus einer
  wachsenden SharePoint-Online-Bibliothek nur die benötigten Dateien abzurufen.
date: '2026-10-04T16:57:02Z'
author: news_editorial
lang: de
toc: false
tags:
- power-automate
- connectors
content_type: curated_summary
curation_id: b65a0656be09765d95abcdb8
image:
  path: "/assets/img/curated/b65a0656be09765d95abcdb8.png"
  alt: 'News-Karte: Filter SharePoint files at the source to avoid list view threshold
    errors.'
permalink: "/de/posts/avoid-sharepoint-list-view-threshold-errors-in-power-automate-b65a0656/"
translation_url: "/en/posts/avoid-sharepoint-list-view-threshold-errors-in-power-automate-b65a0656/"
source_url: https://charleslakes.com/2026/09/28/power-automate-cloud-flows-get-spo-items-list-view-threshold-error/
source_site_url: https://charleslakes.com/
source_title: 'Power Automate: Cloud Flows | Get SPO Items + List View Threshold Error'
source_name: Charles Lakes
source_language: en
source_language_name: English
source_author: Charles
source_published_at: '2026-09-28'
source_updated_at: '2026-09-28'
source_type: article
faq:
- question: Wie behebe ich den List-View-Threshold-Fehler in Power Automate Get files
    (properties only)?
  answer: Fügen Sie in den Advanced parameters eine Filter Query hinzu. Sie begrenzt
    die SharePoint-REST-Anfrage auf die benötigte Teilmenge von Dateien.
- question: Warum schlägt Get files (properties only) nach mehr als 5.000 SharePoint-Online-Elementen
    fehl?
  answer: Die Aktion kann zu viele Bibliothekselemente mit einer HTTP-GET-Anfrage
    abrufen wollen. Diese Anfrage kann den SharePoint-List-View-Threshold überschreiten.
- question: Welcher Filter sollte in einer Power-Automate-OData-Filter-Query zuerst
    stehen?
  answer: Setzen Sie den Filter mit weniger zurückgegebenen Listenelementen zuerst.
    Dadurch bleibt die Abfrage kleiner, wenn die Dokumentbibliothek weiter wächst.
---

## TL;DR

Power-Automate-Cloud-Flows mit SharePoint Online Get files (properties only) können ab mehr als 5.000 Bibliothekselementen einen List-View-Threshold-Fehler auslösen. Fügen Sie unter Advanced parameters eine OData Filter Query hinzu, um die REST-Anfrage einzugrenzen. Der Filter mit weniger Treffern sollte bei wachsender Bibliothek zuerst stehen.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Fügen Sie in Get files (properties only) eine OData Filter Query hinzu, damit der Flow nur benötigte SharePoint-Dateien abruft.
- Makers: Setzen Sie den stärker eingrenzenden Filter zuerst ein, um bei wachsender Bibliothek weitere Schwellenfehler zu vermeiden.

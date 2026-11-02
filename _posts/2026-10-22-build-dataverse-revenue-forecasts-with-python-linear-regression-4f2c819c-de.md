---
title: Umsatzprognosen aus Dataverse mit Python und linearer Regression
description: Mit Dataverse SDK für Python, Pandas und Scikit-Learn Daten abrufen,
  künftige Umsätze prognostizieren und Ergebnisse wieder in Dataverse speichern.
date: '2026-10-22T16:51:28Z'
author: news_editorial
lang: de
toc: false
tags:
- dataverse
- ai-builder
- power-apps
content_type: curated_summary
curation_id: 4f2c819c484089420ef5dce6
image:
  path: "/assets/img/curated/4f2c819c484089420ef5dce6.png"
  alt: 'News-Karte: Dataverse data can power Python linear regression forecasts.'
permalink: "/de/posts/build-dataverse-revenue-forecasts-with-python-linear-regression-4f2c819c/"
translation_url: "/en/posts/build-dataverse-revenue-forecasts-with-python-linear-regression-4f2c819c/"
source_url: https://ecellorscrm.com/2026/09/25/linear-regression-with-microsoft-dataverse-predictive-analytics-using-python/
source_site_url: https://ecellorscrm.com/
source_title: 'Linear Regression with Microsoft Dataverse: Predictive Analytics Using
  Python'
source_name: Ecellors Blog
source_language: en
source_language_name: English
source_author: Pavan Mani Deep Y
source_published_at: '2026-09-25'
source_type: article
faq:
- question: Wie ruft Python Dataverse-Daten für ein lineares Regressionsmodell ab?
  answer: Das Dataverse SDK für Python fragt ausgewählte Tabellenspalten ab und lädt
    die Datensätze zur Analyse in einen Pandas DataFrame.
- question: Wie prognostiziert das Beispiel künftige Umsätze aus Dataverse-Daten?
  answer: Das Beispiel trainiert Scikit-Learn LinearRegression mit Monats- und Umsatzspalten
    und prognostiziert anschliessend Umsätze für die Monate 6, 7 und 8.
- question: Wie speichert Python Prognoseergebnisse für Power Apps in Dataverse?
  answer: Der Python-Client erstellt Datensätze in einer Umsatzprognosetabelle und
    speichert darin den jeweiligen künftigen Monat sowie den prognostizierten Umsatz.
animation:
  video: /assets/img/animations/4f2c819c484089420ef5dce6-de.mp4
  poster: /assets/img/animations/4f2c819c484089420ef5dce6-de.poster.webp
  width: 800
  height: 450
  alt: "Ein Ablauf mit drei Schritten zeigt, wie Dataverse Umsatzdaten in Pandas geladen, ein lineares Regressionsmodell mit Scikit-Learn trainiert und Prognosen zurueck in Dataverse gespeichert werden."
---

## TL;DR

Das Dataverse SDK für Python lädt monatliche Umsatzdaten in einen Pandas DataFrame. Scikit-Learn trainiert daraus ein lineares Regressionsmodell. Prognosen für kommende Monate werden anschliessend in Dataverse gespeichert und können von Power Apps, Power BI oder Copilot-Erlebnissen genutzt werden.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Nutzt das beschriebene Dataverse-Tabellenmuster, damit Prognoseergebnisse in Power Apps oder anderen Geschäftserlebnissen verfügbar sind.
- BI/Data teams: Ruft Dataverse-Daten mit dem Python SDK ab, bereitet sie in Pandas auf und trainiert das Beispielmodell mit Scikit-Learn.
- Leadership/Business: Prüft historische Umsatz-, Ticket- oder Nachfragedaten als Grundlage für die im Beitrag beschriebenen Prognoseszenarien.

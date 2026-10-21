---
title: Managed Identity in Power Platform Custom Connectors nutzen
description: Preview Managed Identity Authentifizierung in Custom Connectors einrichten,
  um Entra ID geschützte APIs ohne Client Secrets aufzurufen.
date: '2026-10-21T16:59:11Z'
author: news_editorial
lang: de
toc: false
tags:
- connectors
- power-apps
- power-automate
content_type: curated_summary
curation_id: e1fa83f0b6e9ff29b3ace09a
image:
  path: "/assets/img/curated/e1fa83f0b6e9ff29b3ace09a.png"
  alt: 'News-Karte: Custom connectors can call Entra ID protected APIs without client
    secrets.'
permalink: "/de/posts/use-managed-identity-in-power-platform-custom-connectors-e1fa83f0/"
translation_url: "/en/posts/use-managed-identity-in-power-platform-custom-connectors-e1fa83f0/"
source_url: https://ashiqf.com/2026/03/10/access-apis-in-power-platform-without-secrets-using-managed-identity-in-custom-connectors/
source_site_url: https://ashiqf.com/
source_title: Access APIs in Power Platform Without Secrets Using Managed Identity
  in Custom Connectors
source_name: Mohamed Ashiq Faleel
source_language: en
source_language_name: English
source_author: Mohamed Ashiq Faleel
source_published_at: '2026-03-10'
source_type: article
faq:
- question: Wie aktiviere ich Managed Identity für einen Power Platform Custom Connector?
  answer: Im Security-Tab OAuth 2.0 und Azure Active Directory auswählen und bei Secret
    Options Managed Identity festlegen. Anschliessend Anwendungs-ID, Mandanten-ID,
    Ressourcen-URL und Bereich eintragen.
- question: Welche Entra ID Konfiguration braucht ein Managed Identity Custom Connector?
  answer: Die App-Registrierung benötigt die Connector-Weiterleitungs-URL und eine
    föderierte Anmeldeinformation. Der vom Connector erzeugte Aussteller und Subjektbezeichner
    stellen die Vertrauensbeziehung her.
- question: Kann ein Managed Identity Custom Connector Microsoft Graph aus Power Automate
    aufrufen?
  answer: Ja, der Connector kann nach dem Erstellen der Verbindung in Power Automate
    genutzt werden. Das Beispiel definiert eine GET-Aktion für das Profil des aktuellen
    Microsoft Graph Benutzers.
---

## TL;DR

Power Platform Custom Connectors können die Managed Identity Authentifizierung als Preview nutzen, um durch Microsoft Entra ID geschützte APIs ohne Client Secrets oder Zertifikate aufzurufen. Dafür werden OAuth 2.0, eine Entra ID App-Registrierung, die Connector-Weiterleitungs-URL und föderierte Anmeldeinformationen konfiguriert.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: OAuth 2.0 mit Managed Identity im Custom Connector konfigurieren, API-Aktionen definieren und eine Verbindung ohne Client Secret erstellen.
- Admins/IT: Eine Entra ID App für einen einzelnen Mandanten registrieren, erforderliche API-Berechtigungen hinzufügen und föderierte Anmeldeinformationen mit Connector-Werten einrichten.
- Makers: Den Preview-Status berücksichtigen und die Funktion vor einem produktiven Integrationseinsatz validieren.

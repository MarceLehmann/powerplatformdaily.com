---
title: Use managed identity in Power Platform custom connectors
description: Configure preview managed identity authentication in a custom connector
  to call Microsoft Entra ID protected APIs without client secrets.
date: '2026-10-21T16:59:11Z'
author: news_editorial
lang: en
toc: false
tags:
- connectors
- power-apps
- power-automate
content_type: curated_summary
curation_id: e1fa83f0b6e9ff29b3ace09a
image:
  path: "/assets/img/curated/e1fa83f0b6e9ff29b3ace09a.png"
  alt: 'News card: Custom connectors can call Entra ID protected APIs without client
    secrets.'
permalink: "/en/posts/use-managed-identity-in-power-platform-custom-connectors-e1fa83f0/"
translation_url: "/de/posts/use-managed-identity-in-power-platform-custom-connectors-e1fa83f0/"
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
- question: How do I enable managed identity for a Power Platform custom connector?
  answer: Select OAuth 2.0 and Azure Active Directory in the connector Security tab,
    then choose Managed Identity under Secret Options. Supply the application ID,
    tenant ID, resource URL, and scope.
- question: What Entra ID configuration does a managed identity custom connector need?
  answer: The application registration needs the connector redirect URL and a federated
    credential. Use the connector-generated issuer and explicit subject identifier
    to establish trust.
- question: Can a managed identity custom connector call Microsoft Graph from Power
    Automate?
  answer: Yes, the connector can be used from Power Automate after its connection
    is created. The example defines a GET action for the Microsoft Graph current user
    profile endpoint.
animation:
  video: /assets/img/animations/e1fa83f0b6e9ff29b3ace09a-en.mp4
  poster: /assets/img/animations/e1fa83f0b6e9ff29b3ace09a-en.poster.webp
  width: 800
  height: 450
  alt: "A four step sequence shows configuring OAuth 2.0 with Managed Identity in a custom connector, registering the redirect URL and federated credential in Entra ID, then creating and using the connection in Power Apps or Power Automate."
---

## TL;DR

Power Platform custom connectors can use preview managed identity authentication to access Microsoft Entra ID protected APIs without client secrets or certificates. Configure OAuth 2.0 with Managed Identity, register the connector redirect URL and federated credential in an Entra ID app, then create and use the connection in Power Apps or Power Automate.

{% include curated-attribution.html %}

## Why it matters

- Makers: Configure OAuth 2.0 with Managed Identity in a custom connector, then define API actions and create a connection without entering a client secret.
- Admins/IT: Register a single-tenant Entra ID application, add the required API permissions, and establish federated credentials using connector-generated values.
- Makers: Treat this capability as preview and validate it before relying on it for production integrations.

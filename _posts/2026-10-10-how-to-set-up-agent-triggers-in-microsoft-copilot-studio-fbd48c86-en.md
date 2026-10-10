---
title: How to Set Up Agent Triggers in Microsoft Copilot Studio
description: Configure Copilot Studio agent triggers for Dataverse events, permissions,
  scope, filters, run-as options and testing.
date: '2026-10-10T16:54:17Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- dataverse
content_type: curated_summary
curation_id: fbd48c864dfbb0182a90f851
image:
  path: "/assets/img/curated/fbd48c864dfbb0182a90f851.png"
  alt: 'News card: Copilot Studio agents can now act when Dataverse events occur.
    Configure triggers for autonomous work.'
permalink: "/en/posts/how-to-set-up-agent-triggers-in-microsoft-copilot-studio-fbd48c86/"
translation_url: "/de/posts/how-to-set-up-agent-triggers-in-microsoft-copilot-studio-fbd48c86/"
source_url: https://citizendeveloper365.com/how-to-setup-agent-triggers-in-microsoft-copilot-studio/
source_site_url: https://citizendeveloper365.com/
source_title: How to Setup Agent Triggers in Microsoft Copilot Studio
source_name: Citizen Developer
source_language: en
source_language_name: English
source_author: Griffin Lickfeldt
source_published_at: '2026-01-03'
source_updated_at: '2026-01-06'
source_type: article
faq:
- question: How do I create a Dataverse Add a record trigger in Copilot Studio?
  answer: Open the agent Overview tab, choose Add Trigger, select Dataverse | Add
    a record, then configure its name, connection, table and properties.
- question: What run-as options are available for Copilot Studio agent triggers?
  answer: A trigger can run as the flow owner, modifying user or row owner. Each option
    determines whose context executes the agent or flow.
- question: How can I test an agent trigger after configuring it in Copilot Studio?
  answer: Create the configured Dataverse record, use the test feature and inspect
    the Test Pane to verify the message sent and resulting functionality.
---

## TL;DR

Microsoft Copilot Studio agent triggers start agent activity when configured events occur, such as adding an Account record in Dataverse. The setup covers trigger selection, connections, permissions, scope, filters, run-as properties and additional instructions. Makers can test the result by creating a record and checking the Test Pane.

{% include curated-attribution.html %}

## Why it matters

- Makers: Select a suitable Dataverse trigger, define its event properties, filters and instructions, then test it with a new record to confirm the agent receives the intended message.
- Admins/IT: Review the trigger connections, user privileges, scope and run-as choice because these settings determine which data context executes the trigger.
- BI/Data teams: Check the selected Dataverse table and change type, especially when filtering events such as active Accounts, so automation responds to the intended records.

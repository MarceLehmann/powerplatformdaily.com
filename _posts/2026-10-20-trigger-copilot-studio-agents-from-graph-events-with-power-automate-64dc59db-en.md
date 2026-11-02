---
title: Trigger Copilot Studio agents from Graph events with Power Automate
description: Route Microsoft Graph change notifications through Azure Event Hubs,
  then use Power Automate to invoke a Copilot Studio agent.
date: '2026-10-20T17:08:36Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- power-automate
- connectors
content_type: curated_summary
curation_id: 64dc59db61e6e9019f3984c1
image:
  path: "/assets/img/curated/64dc59db61e6e9019f3984c1.png"
  alt: 'News card: Copilot Studio agents can react to Graph events without user interaction.'
permalink: "/en/posts/trigger-copilot-studio-agents-from-graph-events-with-power-automate-64dc59db/"
translation_url: "/de/posts/trigger-copilot-studio-agents-from-graph-events-with-power-automate-64dc59db/"
source_url: https://ashiqf.com/2026/03/31/triggering-copilot-studio-agents-autonomously-using-microsoft-graph-change-notifications-power-automate/
source_site_url: https://ashiqf.com/
source_title: Triggering Copilot Studio Agents Autonomously Using Microsoft Graph
  Change Notifications + Power Automate
source_name: Mohamed Ashiq Faleel
source_language: en
source_language_name: English
source_author: Mohamed Ashiq Faleel
source_published_at: '2026-03-31'
source_updated_at: '2026-05-03'
source_type: article
faq:
- question: How can Power Automate trigger a Copilot Studio agent from a Teams channel
    message?
  answer: Create a Graph subscription that sends change notifications to Azure Event
    Hubs. Power Automate consumes the event and passes relevant values through the
    Execute Agent action.
- question: Which Event Hub roles are required for Microsoft Graph and Power Automate
    notifications?
  answer: Microsoft Graph Change Tracking needs the Azure Event Hubs Data Sender role
    on the hub. The Power Automate connection needs the Azure Event Hubs Data Receiver
    role.
- question: Do Graph rich notifications remove the need for a second API call in Power
    Automate?
  answer: Yes, rich notifications can deliver encrypted resource data inline with
    the notification. Power Automate still needs external decryption because it has
    no native RSA or AES decryption action.
animation:
  video: /assets/img/animations/64dc59db61e6e9019f3984c1-en.mp4
  poster: /assets/img/animations/64dc59db61e6e9019f3984c1-en.poster.webp
  width: 800
  height: 450
  alt: "A four step flow shows Microsoft Graph change notifications sent to Azure Event Hubs, read by a Power Automate trigger, decoded from ContentData, and sent to Copilot Studio with Execute Agent."
---

## TL;DR

Microsoft Graph change notifications can be delivered to Azure Event Hubs, consumed by the Power Automate Event Hubs trigger, decoded from ContentData, and passed to Copilot Studio through Execute Agent. Rich notifications can include encrypted resource data, which requires decryption through Azure Functions or Logic Apps Standard.

{% include curated-attribution.html %}

## Why it matters

- Makers: Build event-driven flows with an Event Hub trigger and Execute Agent to send message data to Copilot Studio without user interaction.
- Admins/IT: Assign Graph Change Tracking Data Sender and flow identities Data Receiver roles on the specific Event Hub, then renew expiring Graph subscriptions.
- Makers: Use rich notifications when message content is needed, but plan an Azure Function or Logic Apps Standard script for decryption.

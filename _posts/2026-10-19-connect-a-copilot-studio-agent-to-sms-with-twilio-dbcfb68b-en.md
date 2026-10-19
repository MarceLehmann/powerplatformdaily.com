---
title: Connect a Copilot Studio agent to SMS with Twilio
description: Build a Copilot Studio hotel concierge that exchanges SMS messages through
  Dynamics 365 Contact Center, a Twilio account, and an assigned phone number.
date: '2026-10-19T16:55:48Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- connectors
- dataverse
content_type: curated_summary
curation_id: dbcfb68bc46722a27a5f6a26
image:
  path: "/assets/img/curated/dbcfb68bc46722a27a5f6a26.png"
  alt: 'News card: Copilot Studio agents can send and receive SMS through Dynamics
    365 Contact Center and Twilio.'
permalink: "/en/posts/connect-a-copilot-studio-agent-to-sms-with-twilio-dbcfb68b/"
translation_url: "/de/posts/connect-a-copilot-studio-agent-to-sms-with-twilio-dbcfb68b/"
source_url: https://www.matthewdevaney.com/how-to-send-and-receive-sms-text-messages-in-copilot-studio/
source_site_url: https://www.matthewdevaney.com/
source_title: How To Send And Receive SMS Text Messages In Copilot Studio
source_name: Matthew Devaney
source_language: en
source_language_name: English
source_author: Matthew Devaney
source_published_at: '2026-08-30'
source_type: article
faq:
- question: How do I connect a Copilot Studio agent to SMS with Dynamics 365 Contact
    Center?
  answer: Enable the SMS channel, add a Twilio messaging account and phone number,
    configure a workstream, then connect the Copilot Studio agent.
- question: Can a Twilio free trial account connect to Dynamics 365 Contact Center
    SMS?
  answer: No. This tutorial requires a paid Twilio messaging account because a free
    trial account cannot be successfully connected to Contact Center.
- question: What webhook configuration does Twilio need for Copilot Studio SMS?
  answer: Twilio needs the Contact Center callback URL pasted into the purchased phone
    number’s messaging configuration, using the HTTP POST method.
---

## TL;DR

A Copilot Studio agent can exchange SMS messages through Dynamics 365 Contact Center and Twilio. The setup uses a Dataverse environment, the SMS channel, a paid Twilio messaging account, an SMS-capable phone number, a webhook, a workstream, and the connected agent.

{% include curated-attribution.html %}

## Why it matters

- Makers: Create the Copilot Studio agent, add its FAQ PDF as knowledge, define its instructions, and select no authentication for public SMS access.
- Admins/IT: Create a sandbox or production environment with Dataverse and Contact Center, then enable SMS and configure the Twilio account.
- Makers: Connect the agent to an inbound SMS workstream and test replies from the purchased phone number.
- Admins/IT: Use the Twilio callback URL with HTTP POST and monitor message logs in Twilio.

---
title: 'Proactive engagement in D365 Contact Center: Copilot Studio voice agents and
  SMS in orchestrated journeys'
description: 'Source of 2026-11-16: proactive voice and SMS in D365 Contact Center,
  triggered via Customer Insights - Journeys and handled by a Copilot Studio voice
  agent, with setup steps and demo limits.'
date: '2026-11-16T19:19:00Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- power-automate
- dataverse
content_type: curated_summary
curation_id: 378eed9ead759fdc6566a163
image:
  path: "/assets/img/curated/378eed9ead759fdc6566a163.png"
  alt: 'News card: D365 Contact Center can now start outbound calls handled by a Copilot
    Studio voice agent, with Customer Insights Journeys deciding when.'
permalink: "/en/posts/proactive-engagement-in-d365-contact-center-copilot-studio-voice-378eed9e/"
translation_url: "/de/posts/proactive-engagement-in-d365-contact-center-copilot-studio-voice-378eed9e/"
source_url: https://contactcenterchronicles.com/proactive-engagement-in-d365-contact-center-from-reactive-support-to-ai-led-outreach/
source_site_url: https://contactcenterchronicles.com/
source_title: 'Proactive Engagement in D365 Contact Center: From Reactive Support
  to AI-Led Outreach'
source_name: Contact Center Chronicles
source_language: en
source_language_name: English
source_published_at: '2026-11-16'
source_type: article
faq:
- question: How do I enable outbound calling in D365 Contact Center for proactive
    voice engagements?
  answer: The outbound voice channel in your workstream needs an approved Know Your
    Customer process. Without KYC approval, outbound calling cannot be enabled even
    if everything else is configured correctly.
- question: How does a Copilot Studio voice agent get customer context during a proactive
    call in D365 Contact Center?
  answer: Context variables on the outbound workstream carry journey attributes to
    the agent. The demo also fetched workshop prerequisites from Dataverse during
    the call with a Power Automate agent flow.
- question: What is the difference between Preview and Copilot dialing modes for proactive
    outbound calls?
  answer: Preview mode connects a representative first to review details before the
    customer is called. Copilot mode lets a Copilot Studio voice agent run the conversation,
    with concurrency and failure-rate limits.
---

## TL;DR

D365 Contact Center supports proactive outbound voice and SMS: Customer Insights - Journeys decides when outreach fires, while Contact Center runs the conversation through a Copilot Studio voice agent, a representative, or both. The source of 2026-11-16 details Preview and Copilot dialing modes, journey-to-agent context variables, a Power Automate agent flow pulling workshop data from Dataverse, and required KYC approval for outbound voice.

## Why it matters

- Makers: Map journey attributes, workstream context variables and Copilot Studio variables carefully, and note the agent flow&\#39;s Express mode is preview and topic names cannot contain periods if you export via solutions.
- Admins/IT: Secure KYC approval for the outbound voice channel early, since outbound calling stays blocked without it, and keep Customer Insights - Journeys and Contact Center in the same environment.
- Leadership/Business: Choose dialing modes deliberately; the demo capped AI-led calls at five concurrent, mainly to limit Copilot Credits, so align limits with forecast volume.

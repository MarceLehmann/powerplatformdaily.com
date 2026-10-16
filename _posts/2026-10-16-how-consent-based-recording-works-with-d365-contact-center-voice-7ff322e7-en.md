---
title: How consent-based recording works with D365 Contact Center voice agents
description: A practical guide to configuring Copilot Studio voice agents and D365
  Contact Center so caller consent controls recording and transcription.
date: '2026-10-16T16:52:28Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
content_type: curated_summary
curation_id: 7ff322e7c59efa912fe7cbcf
image:
  path: "/assets/img/curated/7ff322e7c59efa912fe7cbcf.png"
  alt: 'News card: Copilot Studio voice agents can pass caller consent to D365 Contact
    Center.'
permalink: "/en/posts/how-consent-based-recording-works-with-d365-contact-center-voice-7ff322e7/"
translation_url: "/de/posts/how-consent-based-recording-works-with-d365-contact-center-voice-7ff322e7/"
source_url: https://contactcenterchronicles.com/consent-based-recording-in-d365-contact-center/
source_site_url: https://contactcenterchronicles.com/
source_title: 'CONSENT-BASED RECORDING IN D365 CONTACT CENTER: HOW IT ACTUALLY WORKS'
source_name: Contact Center Chronicles
source_language: en
source_language_name: English
source_author: Kristine Risberg
source_published_at: '2026-06-08'
source_type: article
faq:
- question: How does Sys.ConsentEvent control recording in D365 Contact Center?
  answer: Sys.ConsentEvent sends the caller's Boolean response from the User Consent
    topic to Contact Center, which enforces recording and transcription behavior.
- question: What happens when a caller declines consent after transfer to a representative?
  answer: After a decline, the representative cannot view the transcript or start,
    pause, or resume recording and transcription in the workspace.
- question: What prerequisites are required for inbound consent-based recording?
  answer: The setup requires an inbound voice workstream with a voice-enabled agent
    and an activated User Consent topic.
---

## TL;DR

Consent-based recording uses a Copilot Studio voice agent to capture a caller&\#39;s Boolean response, send it through Sys.ConsentEvent, and control recording and transcription in D365 Contact Center. The decision remains effective when the call is transferred or placed into a consult, while declined calls hide transcripts and recording controls.

{% include curated-attribution.html %}

## Why it matters

- Makers: Configure the User Consent topic, Global.ConsentResponse and Sys.ConsentEvent so the agent sends the caller&\#39;s decision to Contact Center.
- Admins/IT: Match the Request for User Consent workstream setting with the assigned voice agent and test both consent outcomes, including silence and unclear responses.
- Admins/IT: Review external transfers separately because D365 Contact Center does not control recording or transcription by non-Microsoft parties.

---
title: Send Emails with Agents in Microsoft Copilot Studio
description: Set up a Copilot Studio agent to send emails through Outlook or an agent
  flow, with dynamic inputs, confirmation safeguards and testing.
date: '2026-10-09T16:52:54Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- connectors
content_type: curated_summary
curation_id: 8ff5e30f5737912a695745a7
image:
  path: "/assets/img/curated/8ff5e30f5737912a695745a7.png"
  alt: 'News card: Copilot Studio agents can send emails through Outlook or agent
    flows.'
permalink: "/en/posts/send-emails-with-agents-in-microsoft-copilot-studio-8ff5e30f/"
translation_url: "/de/posts/send-emails-with-agents-in-microsoft-copilot-studio-8ff5e30f/"
source_url: https://citizendeveloper365.com/send-emails-with-agents-in-mirosoft-copilot-studio/
source_site_url: https://citizendeveloper365.com/
source_title: 'Solved: Send Emails with Agents in Microsoft Copilot Studio'
source_name: Citizen Developer
source_language: en
source_language_name: English
source_author: Griffin Lickfeldt
source_published_at: '2026-01-03'
source_updated_at: '2026-01-07'
source_type: article
faq:
- question: How can a Copilot Studio agent send an email when an account credit hold
    changes?
  answer: Configure the credit hold change as the trigger, then connect Outlook or
    an agent flow to send the resulting email.
- question: What is the difference between Outlook and agent flows for Copilot Studio
    email sending?
  answer: The Office 365 Outlook connection is quicker for straightforward emails,
    while an agent flow offers more control and suits deterministic processes.
- question: How can I require confirmation before a Copilot Studio agent sends an
    email?
  answer: Use the confirmation safeguard in the email setup, especially for chat scenarios,
    so the user confirms the message before sending.
---

## TL;DR

Microsoft Copilot Studio agents can send emails when events occur, such as an account credit hold change. Configure either the Office 365 Outlook send an email tool or an agent flow, define recipients and message content, optionally require user confirmation, then test the trigger and verify delivery.

{% include curated-attribution.html %}

## Why it matters

- Makers: Choose the Outlook tool for straightforward messages or an agent flow when deterministic control over sent information matters.
- Makers: Define recipient, subject and body inputs, then test triggers in Copilot Studio and verify the delivered email.
- Admins/IT: Review external email automation and protect sensitive information because AI-generated responses can vary.
- Leadership/Business: Identify repetitive event-driven emails suitable for automation while retaining oversight over communications.

---
title: Copilot Studio agent accounts add identity, memory and autonomous triggers
description: Copilot Studio Frontier preview agent accounts provide a Microsoft 365
  identity, shared memory and event or schedule triggers, with licensing and environment
  prerequisites.
date: '2026-10-25T10:36:40Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- licensing
- connectors
- roadmap
content_type: curated_summary
curation_id: b851c69b871c47c796ba51a0
image:
  path: "/assets/img/curated/b851c69b871c47c796ba51a0.png"
  alt: 'News card: Copilot Studio agents can get their own Microsoft 365 identity,
    mailbox and triggers.'
permalink: "/en/posts/copilot-studio-agent-accounts-add-identity-memory-and-autonomous-b851c69b/"
translation_url: "/de/posts/copilot-studio-agent-accounts-add-identity-memory-and-autonomous-b851c69b/"
source_url: https://aidevme.com/copilot-studio-agent-accounts-governance/?utm_source=rss&utm_medium=rss&utm_campaign=copilot-studio-agent-accounts-governance
source_site_url: https://aidevme.com/
source_title: 'Copilot Studio Agent Accounts: What Architects Must Check Before an
  Agent Gets Its Own Identity'
source_name: Practical AI, Copilot & Modern Development Insights
source_language: en
source_language_name: English
source_author: Zsolt Zombik
source_published_at: '2026-10-25'
source_type: article
faq:
- question: What does a Copilot Studio agent account add to an agent?
  answer: It gives the agent a Microsoft Entra account, mailbox, Teams presence and
    directory entry, plus shared memory for everyone working with it.
- question: How do I enable Agent accounts in Copilot Studio Preview?
  answer: Enroll the tenant in Frontier, activate the Copilot Studio Frontier template,
    use an early-release environment, enable Agent accounts, and provide eligible
    licenses.
- question: Can Copilot Studio agent account memory expose shared information?
  answer: Yes. Files or chats shared with the agent can be summarized in responses
    to users without access, although the agent cannot read protected documents.
animation:
  src: /assets/img/animations/b851c69b871c47c796ba51a0-en.gif
  poster: /assets/img/animations/b851c69b871c47c796ba51a0-en.poster.png
  width: 800
  height: 450
  alt: "A five step setup sequence shows enrolling the tenant in Frontier, activating the Frontier template, using an early release environment, enabling Agent accounts, and providing eligible licenses."
---

## TL;DR

Copilot Studio Frontier preview agent accounts give agents a Microsoft Entra identity, mailbox, Teams presence and shared memory. Event or recurrence triggers can start work autonomously in the GitHub Copilot harness. The feature requires tenant enrollment, an early-release environment, enabled Agent accounts settings, eligible maker licensing and a separate account license at publish time.

{% include curated-attribution.html %}

## Why it matters

- Makers: Test triggers before publishing, agree on the agent name and owner early, and review each tool&\#39;s authentication mode because the identity and email address cannot be changed after publishing.
- Admins/IT: Restrict the preview to an early-release environment and selected makers, review Entra API permissions, and monitor Copilot Credits because autonomous runs bill through the hosting environment.
- Leadership/Business: Choose a recurring internal process where participants can see all data in scope, because account-based agents use shared memory across people and the preview cannot provide a separate memory opt-out.

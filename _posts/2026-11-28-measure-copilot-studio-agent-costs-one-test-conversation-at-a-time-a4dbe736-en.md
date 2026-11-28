---
title: Measure Copilot Studio agent costs one test conversation at a time
description: According to the source of 2026-11-27, Copilot Studio Preview shows running
  credit estimates per test conversation, and Agent 365 spending policies in public
  preview exclude AI Builder usage.
date: '2026-11-28T07:19:41Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- licensing
- ai-builder
content_type: curated_summary
curation_id: a4dbe736335e80322610f67f
image:
  path: "/assets/img/curated/a4dbe736335e80322610f67f.png"
  alt: 'News card: Copilot Studio shows a running credit estimate while you test,
    so you can price one agent task before you ship it.'
permalink: "/en/posts/measure-copilot-studio-agent-costs-one-test-conversation-at-a-time-a4dbe736/"
translation_url: "/de/posts/measure-copilot-studio-agent-costs-one-test-conversation-at-a-time-a4dbe736/"
source_url: https://flowaltdelete.ca/2026/11/27/copilot-studio-agent-costs-ai-weekly-november-27-2026/
source_site_url: https://flowaltdelete.ca/
source_title: 'AI Weekly: How to Measure Copilot Studio Agent Costs'
source_name: Flow Alt Delete
source_language: en
source_language_name: English
source_author: Josh Cook
source_published_at: '2026-11-27'
source_type: article
faq:
- question: Where does Copilot Studio show the credit estimate for an individual test
    chat?
  answer: Copilot Studio Preview displays a running credit estimate while you test
    an agent, so you can read the cost of each conversation before it goes live.
- question: What number should I use to forecast Copilot Studio agent costs for a
    pilot?
  answer: Divide the credits used across all attempts, including retries, by the number
    of requests the agent actually resolved, and treat grader costs as one-time.
- question: Do Agent 365 spending policies cover AI Builder usage?
  answer: No. Microsoft says these resource policies exclude AI Builder usage and
    advises keeping workloads that depend on it on their existing setup.
---

## TL;DR

Copilot Studio Preview shows a running credit estimate per test conversation, and Microsoft&\#39;s bid evaluation example stopped at an estimated 60.54 credits to request human review. The pilot metric divides total credits, retries included, by tasks the agent actually resolved. Agent 365 spending policies were in public preview as of 2026-11-27, can fund one resource or environment, and exclude AI Builder usage.

## Why it matters

- Makers: run two test conversations for the same task, read the Preview credit estimate on each, and divide total credits including retries by resolved tasks before pricing a pilot; keep the one-time grader cost out of the production forecast.
- Admins/IT: start Agent 365 spending policies, in public preview as of 2026-11-27, with one pilot environment, name who gets the alert, and check whether the agent flow uses AI Builder, which these resource policies exclude.

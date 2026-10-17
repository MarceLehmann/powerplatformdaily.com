---
title: 'Copilot Studio: Add Human Review When AI Decisions Need Oversight'
description: Build a Copilot Studio workflow that checks loan purposes, requests human
  input through Outlook or Teams, and records the decision in SharePoint.
date: '2026-10-17T16:53:25Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- connectors
content_type: curated_summary
curation_id: 0ef9c7863178b432cf0fbe98
image:
  path: "/assets/img/curated/0ef9c7863178b432cf0fbe98.png"
  alt: 'News card: Copilot Studio agents can pause for human review when an AI decision
    is uncertain.'
permalink: "/en/posts/copilot-studio-add-human-review-when-ai-decisions-need-oversight-0ef9c786/"
translation_url: "/de/posts/copilot-studio-add-human-review-when-ai-decisions-need-oversight-0ef9c786/"
source_url: https://www.matthewdevaney.com/copilot-studio-ask-for-human-review-on-ai-decisions/
source_site_url: https://www.matthewdevaney.com/
source_title: 'Copilot Studio: Ask For Human Review On AI Decisions'
source_name: Matthew Devaney
source_language: en
source_language_name: English
source_author: Matthew Devaney
source_published_at: '2026-09-27'
source_type: article
faq:
- question: How does a Copilot Studio workflow decide when a loan application needs
    human review?
  answer: The workflow assigns Human-Review when the stated loan purpose has no matching
    entry in the supplied SharePoint Loan Purposes list.
- question: Which channels can Copilot Studio use to request a reviewer decision?
  answer: The Human Review action can contact a reviewer through Outlook email or
    Teams chat, then wait for the submitted response.
- question: How does Copilot Studio store a human reviewer’s loan decision and rationale?
  answer: The workflow updates SharePoint with the Allowed or Flagged decision, a
    human-review status, and the reviewer’s rationale.
---

## TL;DR

A Copilot Studio workflow compares a loan purpose with a SharePoint list, assigns Allowed, Flagged, or Human-Review, and pauses for an Outlook or Teams response when no matching purpose exists. The workflow then updates the loan application with the decision, review status, and rationale.

{% include curated-attribution.html %}

## Why it matters

- Makers: Add an agent node with structured category output so workflows can separate Allowed, Flagged, and Human-Review cases.
- Makers: Configure the Human Review action with reviewer inputs for a yes or no decision and rationale.
- Admins/IT: Watch the Outlook or Teams review channel and SharePoint fields because the workflow depends on the reviewer response before continuing.

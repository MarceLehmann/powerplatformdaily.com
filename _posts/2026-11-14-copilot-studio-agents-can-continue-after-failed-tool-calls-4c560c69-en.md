---
title: Copilot Studio agents can continue after failed tool calls
description: Microsoft reports that the Copilot Studio harness continued after failed
  tool calls in 84–91% of observed cases, while results still require verification.
date: '2026-11-14T07:24:27Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- connectors
content_type: curated_summary
curation_id: 4c560c690f3fb7d76ffc6260
image:
  path: "/assets/img/curated/4c560c690f3fb7d76ffc6260.png"
  alt: 'News card: Copilot Studio agents can continue after failed tool calls.'
permalink: "/en/posts/copilot-studio-agents-can-continue-after-failed-tool-calls-4c560c69/"
translation_url: "/de/posts/copilot-studio-agents-can-continue-after-failed-tool-calls-4c560c69/"
source_url: https://flowaltdelete.ca/2026/11/13/copilot-connector-write-actions-november-13-2026/
source_site_url: https://flowaltdelete.ca/
source_title: What Copilot Studio agents do after a failed tool call
source_name: Flow Alt Delete
source_language: en
source_language_name: English
source_author: Josh Cook
source_published_at: '2026-11-13'
source_type: article
faq:
- question: How does the Copilot Studio harness respond when a tool call fails?
  answer: The harness inspects the failed result, decides what to do next, and can
    continue within its time, step, and token limits.
- question: What does the 84–91% Copilot Studio continuation result measure?
  answer: Microsoft reports 84–91% continuation in observed cases across autonomous
    and Microsoft 365 Copilot channels; the measure does not confirm task completion.
- question: How can I test a Copilot Studio agent with missing or restricted data?
  answer: Use a workbook without the expected table and a record the user cannot access,
    then check whether the agent identifies each limitation clearly.
---

## TL;DR

Copilot Studio’s harness takes a step, inspects the result, decides what to do next, and repeats within time, step and token limits. Microsoft reports that agents continued after failed tool calls in 84–91% of observed cases across autonomous and Microsoft 365 Copilot channels, but continuation does not prove completion.

## Why it matters

- Makers: Test agents with a missing Excel table and confirm they identify the missing input before proceeding, because continued execution alone does not prove a useful result.
- BI/Data teams: Include inaccessible records in evaluation cases and verify that the agent reports the permission block instead of treating missing data as valid.
- Admins/IT: Review connector access and credentials when diagnosing failed tool calls, because Copilot Studio handles those connections while the harness controls the next step.

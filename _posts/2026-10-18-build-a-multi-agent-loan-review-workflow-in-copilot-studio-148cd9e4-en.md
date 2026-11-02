---
title: Build a Multi-Agent Loan Review Workflow in Copilot Studio
description: Create a Copilot Studio workflow that extracts PDF fields, validates
  applications, checks loan purposes in SharePoint, and emails a decision.
date: '2026-10-18T16:54:37Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- connectors
- dataverse
content_type: curated_summary
curation_id: 148cd9e4326fc7339b2173d4
image:
  path: "/assets/img/curated/148cd9e4326fc7339b2173d4.png"
  alt: 'News card: Copilot Studio can split one review across agents that extract,
    validate, reason, and respond.'
permalink: "/en/posts/build-a-multi-agent-loan-review-workflow-in-copilot-studio-148cd9e4/"
translation_url: "/de/posts/build-a-multi-agent-loan-review-workflow-in-copilot-studio-148cd9e4/"
source_url: https://www.matthewdevaney.com/how-to-build-multi-agent-workflows-in-copilot-studio/
source_site_url: https://www.matthewdevaney.com/
source_title: How To Build Multi-Agent Workflows In Copilot Studio
source_name: Matthew Devaney
source_language: en
source_language_name: English
source_author: Matthew Devaney
source_published_at: '2026-09-13'
source_type: article
faq:
- question: How does Copilot Studio start a loan review when a PDF is uploaded?
  answer: A Connector trigger uses SharePoint When A File Is Created, followed by
    Get File Content to pass the uploaded PDF into an agent.
- question: How does the Copilot Studio workflow validate loan application fields?
  answer: It stores hardcoded validation expressions in an array, then filters that
    array so only failed tests and their error messages continue.
- question: How can a Copilot Studio agent check a loan purpose against SharePoint?
  answer: A knowledge agent searches a SharePoint Loan Purposes list and returns Approved
    or Flagged, while running in parallel with hardcoded checks.
animation:
  video: /assets/img/animations/148cd9e4326fc7339b2173d4-en.mp4
  poster: /assets/img/animations/148cd9e4326fc7339b2173d4-en.poster.webp
  width: 800
  height: 450
  alt: "Four stages: a new PDF in SharePoint starts the workflow, one agent extracts fields, parallel checks validate rules and loan purposes, a final agent writes the decision email."
---

## TL;DR

Copilot Studio can coordinate agents in a loan application workflow: a SharePoint trigger supplies PDF content, one agent extracts structured fields, parallel validation checks rules and loan purposes, and a final agent writes an approval or rejection email.

{% include curated-attribution.html %}

## Why it matters

- Makers: Split complex reviews into focused agents, using structured output for extracted PDF fields and parallel branches for independent checks.
- Makers: Test published workflows with varied application values so hardcoded validation results can be compared with expected outcomes.
- Admins/IT: Prepare the SharePoint document library and loan-purpose list because the workflow uses them as its trigger source and knowledge source.

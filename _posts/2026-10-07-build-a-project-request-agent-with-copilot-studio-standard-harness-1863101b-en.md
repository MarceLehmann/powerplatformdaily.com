---
title: Build a Project Request Agent with Copilot Studio Standard Harness
description: Learn how to build a structured Copilot Studio agent that collects project
  details and uses flows to create or retrieve SharePoint records.
date: '2026-10-07T17:10:11Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- power-automate
- connectors
content_type: curated_summary
curation_id: 1863101bc5734d7d27772035
image:
  path: "/assets/img/curated/1863101bc5734d7d27772035.png"
  alt: 'News card: Copilot Studio agents can collect project details and call flows
    to create or retrieve SharePoint records.'
permalink: "/en/posts/build-a-project-request-agent-with-copilot-studio-standard-harness-1863101b/"
translation_url: "/de/posts/build-a-project-request-agent-with-copilot-studio-standard-harness-1863101b/"
source_url: https://www.divyaakula.com/copilotstudio/2026/08/16/Creating-Agents-With-Standard-Harness.html
source_site_url: https://www.divyaakula.com/
source_title: Building a Project Request Agent with the Standard Harness
source_name: Divya Akula
source_language: en
source_language_name: English
source_author: Divya Akula
source_published_at: '2026-08-16'
source_type: article
faq:
- question: How does the Copilot Studio Project Request Agent save submissions to
    SharePoint?
  answer: The agent collects the required project details and calls a flow that creates
    an item in the SharePoint Project Requests list.
- question: Which Copilot Studio building blocks are used for the project request
    conversation?
  answer: The example uses instructions, topics, nodes, variables, and tools. Question
    and condition nodes guide data collection and branching within topics.
- question: How can a Copilot Studio agent check an existing project request status?
  answer: A status topic lets users ask about a known request, then calls a flow that
    finds the request and returns its current status.
animation:
  src: /assets/img/animations/1863101bc5734d7d27772035-en.gif
  poster: /assets/img/animations/1863101bc5734d7d27772035-en.poster.png
  width: 800
  height: 450
  alt: "A four step flow shows a Copilot Studio agent set up with instructions and topics, collecting project details into variables, then calling Power Automate to create or retrieve a SharePoint record."
---

## TL;DR

Copilot Studio’s new experience can build a Project Request Agent with instructions, topics, nodes, variables, and tools. Two Power Automate flows collect project details, create SharePoint list items, or retrieve a project’s current status.

{% include curated-attribution.html %}

## Why it matters

- Makers: Build guided topics with question and condition nodes, then store project details in variables before calling the appropriate flow.
- Makers: Use one flow to create a SharePoint list item and another to retrieve status, keeping the deterministic business steps outside the agent.
- Admins/IT: Confirm access to Copilot Studio, Power Platform, and a SharePoint site where the required list can be created before testing.

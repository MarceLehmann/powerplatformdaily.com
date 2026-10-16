---
title: Use Copilot email classification to automate case types in D365 Customer Service
description: A classic Automatic Record Creation flow can retrieve Copilot's email
  category and map it to a Case Type before creating the case.
date: '2026-10-16T16:52:25Z'
author: news_editorial
lang: en
toc: false
tags:
- power-automate
- dataverse
content_type: curated_summary
curation_id: be0d10001c9603aeb182cd5c
image:
  path: "/assets/img/curated/be0d10001c9603aeb182cd5c.png"
  alt: 'News card: Copilot email classification can set the case type automatically
    before case creation.'
permalink: "/en/posts/use-copilot-email-classification-to-automate-case-types-in-d365-be0d1000/"
translation_url: "/de/posts/use-copilot-email-classification-to-automate-case-types-in-d365-be0d1000/"
source_url: https://contactcenterchronicles.com/using-ai-powered-email-classification-to-categorize-cases-in-d365-customer-service/
source_site_url: https://contactcenterchronicles.com/
source_title: Using AI-Powered Email Classification to Automatically Categorize Cases
  in D365 Customer Service
source_name: Contact Center Chronicles
source_language: en
source_language_name: English
source_author: Kristine Risberg
source_published_at: '2026-07-06'
source_type: article
faq:
- question: How does the Automatic Record Creation flow access Copilot's email category?
  answer: The flow reads the email classification lookup, then uses Dataverse Get
    a row by ID to retrieve the category name.
- question: Why can’t unified routing work classification reliably use the email classification
    value?
  answer: The classification is stored on the email, while the case workstream evaluates
    case records and cannot reliably select the correct related email.
- question: How does the Switch action set the Dynamics 365 Case Type?
  answer: The Switch matches the retrieved category name and assigns a numeric CaseType
    variable, which Create a record converts to an integer.
---

## TL;DR

Copilot classifies incoming emails into predefined categories, while an extended Automatic Record Creation cloud flow retrieves the related Dataverse category, uses a case-sensitive Switch action to map it, and writes the resulting integer to the Case Type choice field before creating the case.

{% include curated-attribution.html %}

## Why it matters

- Makers: Extend the classic Automatic Record Creation flow before Create a record, retrieve the email classification row, and map categories through a Switch action.
- Admins/IT: Configure email categories with descriptions, choose which emails to process, run classification as emails arrive, and verify the feature is enabled.

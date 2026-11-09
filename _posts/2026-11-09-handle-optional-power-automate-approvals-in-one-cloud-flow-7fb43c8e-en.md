---
title: Handle optional Power Automate approvals in one cloud flow
description: Use conditions, explicit outcomes and separate rules to run only the
  Power Automate approvals a request needs, without duplicating shared process steps.
date: '2026-11-09T07:25:36Z'
author: news_editorial
lang: en
toc: false
tags:
- power-automate
content_type: curated_summary
curation_id: 7fb43c8efde41d32914f112c
image:
  path: "/assets/img/curated/7fb43c8efde41d32914f112c.png"
  alt: 'News card: Power Automate can handle optional approval steps in one cloud
    flow.'
permalink: "/en/posts/handle-optional-power-automate-approvals-in-one-cloud-flow-7fb43c8e/"
translation_url: "/de/posts/handle-optional-power-automate-approvals-in-one-cloud-flow-7fb43c8e/"
source_url: https://softchief.com/power-automate-handle-optional-approval-steps-without-creating-separate-flows/
source_site_url: https://softchief.com/
source_title: 'Power Automate: Handle Optional Approval Steps Without Creating Separate
  Flows'
source_name: Softchief Technologies
source_language: en
source_language_name: English
source_author: Softchief Author
source_published_at: '2026-11-09'
source_type: article
faq:
- question: How can Power Automate skip an optional manager approval without creating
    another flow?
  answer: Place the approval inside a Condition branch and continue with shared actions
    after the branch. The skipped path should receive an explicit Not required outcome.
- question: How should a Power Automate flow track an approval that did not run?
  answer: Initialize an outcome variable before the condition with Not required, then
    replace it with the approval result when the branch executes.
- question: How should optional Power Automate approvals handle rejection and no response?
  answer: Check approval outcomes after each approval and define separate handling
    for rejection, timeout or failed actions. Test each case and review the run history.
animation:
  video: /assets/img/animations/7fb43c8efde41d32914f112c-en.mp4
  poster: /assets/img/animations/7fb43c8efde41d32914f112c-en.poster.webp
  width: 800
  height: 450
  alt: "A four step sequence shows one Power Automate flow: initialize Not required, run an approval in a Condition branch when needed, replace it with the approval result, then test approved, rejected, skipped and unanswered paths."
---

## TL;DR

Power Automate can use Conditions or Switch actions to run optional manager and finance approvals in one cloud flow. Initialize outcomes such as Not required before each branch, update them when approvals run, then test approved, rejected, skipped and unanswered paths before using the flow.

## Why it matters

- Makers: Define approval rules in plain language, use Conditions or Switch actions, and initialize skipped outcomes so downstream steps can distinguish Not required from Approved or Rejected.
- Makers: Keep shared updates and notifications after approval branches, then test every required, skipped, rejected and unanswered route in run history.
- Leadership/Business: Confirm thresholds, boundary values, currencies and rejection or timeout handling with process owners before the flow is built or changed.

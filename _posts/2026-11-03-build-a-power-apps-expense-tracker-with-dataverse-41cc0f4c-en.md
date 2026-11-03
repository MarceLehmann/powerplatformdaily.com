---
title: Build a Power Apps expense tracker with Dataverse
description: Create a tablet Power Apps canvas app that uses a Copilot-generated Dataverse
  table, an edit form for new expenses, and a gallery for saved records.
date: '2026-11-03T07:33:58Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
- dataverse
content_type: curated_summary
curation_id: 41cc0f4c21e64e129e1c6fbf
image:
  path: "/assets/img/curated/41cc0f4c21e64e129e1c6fbf.png"
  alt: 'News card: Build an expense tracker with a Dataverse form and gallery.'
permalink: "/en/posts/build-a-power-apps-expense-tracker-with-dataverse-41cc0f4c/"
translation_url: "/de/posts/build-a-power-apps-expense-tracker-with-dataverse-41cc0f4c/"
source_url: https://softchief.com/build-a-power-apps-canvas-app-for-expense-tracking/
source_site_url: https://softchief.com/
source_title: Build a Power Apps Canvas App for Expense Tracking
source_name: Softchief Technologies
source_language: en
source_language_name: English
source_author: Softchief Author
source_published_at: '2026-11-02'
source_type: article
faq:
- question: How do I create a Dataverse table with Copilot for a Power Apps expense
    tracker?
  answer: Use the Copilot option in the Dataverse data workspace and describe the
    personal expense data needed. Review the suggested fields before saving the table.
- question: Which Power Apps formula saves a new expense from frmExpense?
  answer: Set the save button's OnSelect property to SubmitForm(frmExpense). The form
    must be configured in New mode to create a record.
- question: How can I show saved Dataverse expenses in a Power Apps gallery?
  answer: Insert a gallery on a separate screen and connect it to the personal expenses
    table. Configure its labels to display the expense name, amount and date.
---

## TL;DR

Create a Power Apps canvas expense tracker by generating a personal-expenses Dataverse table with Copilot, then connecting an edit form and a gallery to it. Set the form to New, use SubmitForm(frmExpense) on the save button, show a success notification, and test navigation and saved records.

## Why it matters

- Makers: Review Copilot-generated Dataverse fields before building screens, then keep the entry form limited to expense name, amount, date and recurring status.
- Makers: Set the form to New and connect the save button to SubmitForm(frmExpense) so new expense records are stored in Dataverse.
- Makers: Put the gallery on a separate screen and test that saved expenses display the intended name, amount and date.

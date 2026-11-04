---
title: Build a Power Automate flow that emails new Dataverse contacts
description: Create an automated cloud flow using a Dataverse Added trigger and an
  Outlook email action, then personalize messages with contact data and check run
  history.
date: '2026-11-04T07:25:52Z'
author: news_editorial
lang: en
toc: false
tags:
- power-automate
- dataverse
- connectors
content_type: curated_summary
curation_id: 614f33198ee989e6dd498fc4
image:
  path: "/assets/img/curated/614f33198ee989e6dd498fc4.png"
  alt: 'News card: Send a personalized Outlook email when a new Dataverse contact
    is added.'
permalink: "/en/posts/build-a-power-automate-flow-that-emails-new-dataverse-contacts-614f3319/"
translation_url: "/de/posts/build-a-power-automate-flow-that-emails-new-dataverse-contacts-614f3319/"
source_url: https://softchief.com/power-automate-for-beginners-build-a-flow-that-emails-new-contacts/
source_site_url: https://softchief.com/
source_title: 'Power Automate for Beginners: Build a Flow That Emails New Contacts'
source_name: Softchief Technologies
source_language: en
source_language_name: English
source_author: Softchief Author
source_published_at: '2026-11-03'
source_type: article
faq:
- question: How do I send an Outlook email when a Dataverse Contact row is added?
  answer: Create an automated cloud flow with the Dataverse row trigger set to Added
    and Contact, then add an Outlook action to send the email.
- question: How can a Power Automate welcome email use the new contact's name?
  answer: Insert the Full Name value from dynamic content into the email greeting.
    The value is supplied by the Dataverse trigger for each new contact.
- question: What should I check when a Dataverse contact email flow fails?
  answer: Review flow run details for missing data, connection problems, or a trigger
    setting that does not match the test record. Then correct the cause and retest.
animation:
  video: /assets/img/animations/614f33198ee989e6dd498fc4-en.mp4
  poster: /assets/img/animations/614f33198ee989e6dd498fc4-en.poster.webp
  width: 800
  height: 450
  alt: "A 4 step flow shows creating an automated cloud flow with a Dataverse Added trigger for Contact, adding an Outlook email action, inserting Full Name dynamic content, then testing and checking run history."
---

## TL;DR

Create an automated cloud flow with a Microsoft Dataverse row trigger set to Added for the Contact table, then add an Outlook email action. Use dynamic content such as Full Name to personalize the message, test with a sample contact, and review run history for missing data, connection, or trigger issues.

## Why it matters

- Makers: Configure the Dataverse Contact trigger for Added, then use an Outlook action and dynamic content to send personalized welcome emails.
- Makers: Test with contacts containing required fields and inspect run history to identify missing data, connection failures, or incorrect trigger settings.
- Admins/IT: Ensure required connections, permissions, and environment access are available because connector options depend on account setup.

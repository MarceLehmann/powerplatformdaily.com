---
title: A Simple Power Apps Pattern for Showing Patch Errors
description: Use the App control OnError property and a global flag to display the
  exact error message from failed Patch operations.
date: '2026-10-11T16:55:39Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
content_type: curated_summary
curation_id: 74b5494570834134002192df
image:
  path: "/assets/img/curated/74b5494570834134002192df.png"
  alt: 'News card: Power Apps can show the exact Patch error message automatically.'
permalink: "/en/posts/a-simple-power-apps-pattern-for-showing-patch-errors-74b54945/"
translation_url: "/de/posts/a-simple-power-apps-pattern-for-showing-patch-errors-74b54945/"
source_url: https://thepoweraddict.com/a-simple-way-to-implement-error-handling/?utm_source=rss&utm_medium=rss&utm_campaign=a-simple-way-to-implement-error-handling
source_site_url: https://thepoweraddict.com/
source_title: A Simple Way to Implement Error Handling
source_name: The Power Addict
source_language: en
source_language_name: English
source_author: Hardit Bhatia
source_published_at: '2026-03-31'
source_updated_at: '2026-03-31'
source_type: article
faq:
- question: How does the Power Apps App control OnError property handle Patch failures?
  answer: Set gblIsError to true in OnError, then notify the parsed FirstError.Message
    as an error notification.
- question: What should be set before calling Patch in this Power Apps pattern?
  answer: Set gblIsError to false before Patch, allowing the App control handler to
    change it to true when an error occurs.
- question: How does the formula extract the Power Apps error message?
  answer: It takes FirstError.Message, splits it at the message marker, removes the
    closing characters, and displays the resulting text.
---

## TL;DR

Set the App control OnError property to mark gblIsError true and notify users with the parsed FirstError.Message. Set gblIsError false immediately before each Patch call so the central error handler can surface failures with a specific message.

{% include curated-attribution.html %}

## Why it matters

- Makers: Set gblIsError to false immediately before each Patch call, then rely on the App control OnError formula to surface the returned message to users.
- Makers: Reuse the central OnError pattern so failed Patch operations set the error flag and display a specific notification instead of leaving users without an explanation.
- Makers: Review the displayed message during testing because the formula extracts the error text from FirstError.Message for the user notification.

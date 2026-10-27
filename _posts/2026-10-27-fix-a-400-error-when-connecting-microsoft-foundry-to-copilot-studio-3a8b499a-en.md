---
title: Fix a 400 Error When Connecting Microsoft Foundry to Copilot Studio
description: A Microsoft Foundry agent can return a 400 error in Copilot Studio when
  its endpoint lacks Activity Protocol support. A trailing slash may resolve it.
date: '2026-10-27T17:01:25Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- connectors
content_type: curated_summary
curation_id: 3a8b499af3ca30c7e466aa7e
image:
  path: "/assets/img/curated/3a8b499af3ca30c7e466aa7e.png"
  alt: 'News card: A trailing slash may clear the Copilot Studio 400 error. Otherwise
    check Activity Protocol support.'
permalink: "/en/posts/fix-a-400-error-when-connecting-microsoft-foundry-to-copilot-studio-3a8b499a/"
translation_url: "/de/posts/fix-a-400-error-when-connecting-microsoft-foundry-to-copilot-studio-3a8b499a/"
source_url: https://reshmeeauckloo.com/posts/copilotstudio-connect-foundry-400-activityprotocol/
source_site_url: https://reshmeeauckloo.com/
source_title: Fix 400 Error While Using Microsoft Foundry to Copilot Studio
source_name: Blog about anything related to my learnings
source_language: en
source_language_name: English
source_published_at: '2026-09-07'
source_type: article
faq:
- question: What does endpoint does not support activity mean in a Copilot Studio
    and Microsoft Foundry connection?
  answer: It means Copilot Studio is calling the Foundry agent through the Activity
    Protocol, but the agent endpoint is not configured to support it.
- question: Can adding a trailing slash fix the Microsoft Foundry project endpoint
    400 error in Copilot Studio?
  answer: Yes, appending a trailing slash to the project endpoint may make the 400
    error disappear. If it does not, inspect Activity Protocol support.
- question: Which protocol must a Microsoft Foundry agent endpoint support for Copilot
    Studio?
  answer: The stable Foundry agent endpoint must support the Activity Protocol. Newly
    created agents typically expose Responses by default, so other protocols may need
    configuration.
---

## TL;DR

A Microsoft Foundry agent connected to Copilot Studio can return a 400 error when its stable endpoint does not support the Activity Protocol. Newly created agents typically expose Responses by default. Appending a trailing slash to the project endpoint may fix the connection; otherwise, check the agent endpoint protocol configuration.

{% include curated-attribution.html %}

## Why it matters

- Makers: Append a trailing slash to the Foundry project endpoint and retry, because the source reports this may remove the 400 error.
- Makers: Check whether the stable Foundry agent endpoint supports the Activity Protocol, because Copilot Studio requires that protocol for the connection.

---
title: Parse SharePoint sharing links in a Copilot Studio agent flow
description: A practical flow passes a SharePoint sharing link from a Copilot Studio
  agent, queries SharePoint, and returns the site URL and relative file path.
date: '2026-11-03T19:46:04Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- power-automate
- connectors
content_type: curated_summary
curation_id: 9a643d2bff080dad6721d127
image:
  path: "/assets/img/curated/9a643d2bff080dad6721d127.png"
  alt: 'News card: Copilot Studio agent flows can turn SharePoint sharing links into
    site URLs and relative file paths.'
permalink: "/en/posts/parse-sharepoint-sharing-links-in-a-copilot-studio-agent-flow-9a643d2b/"
translation_url: "/de/posts/parse-sharepoint-sharing-links-in-a-copilot-studio-agent-flow-9a643d2b/"
source_url: https://flali.hatenablog.com/entry/CopilotStudioAgentFlowSharePointLink
source_site_url: https://flali.hatenablog.com/
source_title: "【Copilot Studio】SharePointの共有リンクを解析する（Agent Flow）"
source_name: ふらりのメモ書き
source_language: ja
source_language_name: ja
source_author: flali
source_published_at: '2026-09-30'
source_type: article
faq:
- question: How does a Copilot Studio agent flow decode a SharePoint sharing link?
  answer: The flow removes the query string, encodes the remaining link with modified
    Base64, and uses the result in a SharePoint driveItem request.
- question: What does the SharePoint sharing link flow return to the Copilot Studio
    agent?
  answer: It returns the SharePoint site URL and the file relative path as two text
    outputs in the agent response.
- question: Can this SharePoint link parsing method be used in Power Automate cloud
    flows?
  answer: Yes, the described method can also be used in a Power Automate cloud flow
    because the agent flow is a cloud flow.
---

## TL;DR

A Copilot Studio agent flow accepts a SharePoint sharing link, removes its query string, converts the remaining link to modified Base64, and uses SharePoint HTTP GET requests to retrieve the site URL and file relative path. The two values are returned to the agent as text outputs.

## Why it matters

- Makers: Pass the chat-entered SharePoint sharing link into the agent flow and return siteUrl and fileRelativePath as text outputs.
- Admins/IT: Configure the flow with a selected SharePoint site address and HTTP GET requests for the driveItem and site endpoints.

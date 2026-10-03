---
title: Role-based dropdown filtering in Power Apps
description: Hide a restricted SharePoint choice for unauthorised users or block them
  from continuing after they select it in a canvas app.
date: '2026-10-03T19:05:43Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
content_type: curated_summary
curation_id: 9856bd23f9ca630903492e9a
image:
  path: "/assets/img/curated/9856bd23f9ca630903492e9a.png"
  alt: 'News card: Power Apps dropdowns can hide or gate restricted SharePoint choices
    by user.'
permalink: "/en/posts/role-based-dropdown-filtering-in-power-apps-9856bd23/"
translation_url: "/de/posts/role-based-dropdown-filtering-in-power-apps-9856bd23/"
source_url: https://365-anouck.be/show-the-right-choices-to-the-right-people-role-based-dropdown-filtering-in-power-apps/
source_site_url: https://365-anouck.be/
source_title: 'Show the Right Choices to the Right People: Role-Based Dropdown Filtering
  in Power Apps'
source_name: 365-ANOUCK
source_language: en
source_language_name: English
source_author: Anouck
source_published_at: '2026-07-06'
source_type: article
---

## TL;DR

A Power Apps canvas app can check Lower(User().Email) against an allowed-user list, then either filter a restricted value from Choices() or block navigation with Notify or a disabled Next button. These controls are client-side only; data-layer enforcement needs a flow or tighter SharePoint permissions.

{% include curated-attribution.html %}

## Why it matters

- Makers: Use the dropdown Items formula to remove a restricted SharePoint choice for unauthorised users, or validate the selection on the Next button when the choice must remain visible.
- Makers: Keep the allowed-user list in a small SharePoint list or Microsoft 365 group when permissions need updating without republishing the app.
- Admins/IT: Do not treat canvas-app checks as enforcement; use item-creation automation or list permissions if unauthorised values must be prevented at the data source.

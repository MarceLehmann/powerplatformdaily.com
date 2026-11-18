---
title: Why Power BI reports work for the author but fail for other users, and how
  to find the cause
description: 'A practical troubleshooting path for Power BI reports that fail for
  viewers: check sharing, licences, RLS, DirectQuery identity, gateway and refresh,
  then test with viewer accounts before release.'
date: '2026-11-18T07:32:09Z'
author: news_editorial
lang: en
toc: false
tags:
- power-bi
- licensing
content_type: curated_summary
curation_id: e41325f9ecbfa9b242b3a44e
image:
  path: "/assets/img/curated/e41325f9ecbfa9b242b3a44e.png"
  alt: 'News card: A Power BI report that works for its author has not yet passed
    the viewer test.'
permalink: "/en/posts/why-power-bi-reports-work-for-the-author-but-fail-for-other-users-and-e41325f9/"
translation_url: "/de/posts/why-power-bi-reports-work-for-the-author-but-fail-for-other-users-and-e41325f9/"
source_url: https://softchief.com/power-bi-reports-work-for-the-author-but-fail-for-other-users-find-the-cause/
source_site_url: https://softchief.com/
source_title: 'Power BI Reports Work for the Author but Fail for Other Users: Find
  the Cause'
source_name: Softchief Technologies Blog
source_language: en
source_language_name: English
source_published_at: '2026-11-18'
source_type: article
faq:
- question: Do viewers need Build permission on a Power BI semantic model to open
    a report?
  answer: No, viewing a report usually needs no Build permission; Build is required
    to create new content from the model. Check the model too when it sits in another
    workspace.
- question: How do workspace roles change row-level security behaviour in Power BI?
  answer: RLS filters apply to users with the Viewer role, while Admin, Member and
    Contributor roles are not restricted the same way. Use Viewer or an app for filtered
    data.
- question: Which Power BI licence do viewers need for shared reports?
  answer: According to the source, viewers on shared capacity generally need Pro or
    PPU, and free licences suffice on qualifying Premium capacity or Fabric F64 or
    higher.
---

## TL;DR

Power BI reports can open for the author yet fail for colleagues with access errors, blank visuals, missing rows or stale data, because permissions, licences, data access and sign-in identities differ. Record the exact error, reproduce it as the affected user, then check sharing, semantic model permissions, licensing, RLS roles, DirectQuery SSO identity, gateway mapping and refresh history before wider release.

## Why it matters

- Makers: Reproduce failures as the affected user before changing report settings, because testing as the author hides missing permissions and RLS filters.
- BI/Data teams: Add a pre-release viewer test covering licences, app audiences, RLS roles and gateway credentials, and document dependencies and credential owners.
- Admins/IT: Review tenant settings only after naming the blocked feature and affected group, and verify external-access rules for guest users.

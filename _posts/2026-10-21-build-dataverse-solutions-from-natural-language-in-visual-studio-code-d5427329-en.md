---
title: Build Dataverse solutions from natural language in Visual Studio Code
description: A practical walkthrough uses Claude Code, Power Platform Tools and Microsoft
  Dataverse skills to create an environment, solution, data model and sample data.
date: '2026-10-21T16:59:14Z'
author: news_editorial
lang: en
toc: false
tags:
- power-apps
- dataverse
content_type: curated_summary
curation_id: d5427329428d394ff6bf698b
image:
  path: "/assets/img/curated/d5427329428d394ff6bf698b.png"
  alt: 'News card: VS Code agents can build Dataverse environments, solutions, tables,
    and sample data from natural language prompts.'
permalink: "/en/posts/build-dataverse-solutions-from-natural-language-in-visual-studio-code-d5427329/"
translation_url: "/de/posts/build-dataverse-solutions-from-natural-language-in-visual-studio-code-d5427329/"
source_url: https://readyxrm.blog/2026/07/16/ditch-the-power-apps-maker-portal/
source_site_url: https://readyxrm.blog/
source_title: Ditch the Power Apps Maker Portal!
source_name: The ReadyXRM Blog
source_language: en
source_language_name: English
source_author: Nick Doelman
source_published_at: '2026-07-16'
source_type: article
faq:
- question: How can Claude Code create a Dataverse environment from Visual Studio
    Code?
  answer: Claude Code uses Dataverse skills and PAC commands to create the environment
    after collecting tenant, type and region choices.
- question: What does the Microsoft Dataverse skills plugin add to Claude Code?
  answer: The plugin supplies Dataverse skills and connects agentic work with the
    Dataverse MCP server, Dataverse CLI and PAC CLI.
- question: Can a natural language prompt build an expense app Dataverse data model?
  answer: Yes, the demonstrated prompt created expense header and line tables, fields,
    a contact lookup, status reasons and a relationship.
animation:
  src: /assets/img/animations/d5427329428d394ff6bf698b-en.gif
  poster: /assets/img/animations/d5427329428d394ff6bf698b-en.poster.png
  width: 800
  height: 450
  alt: "A four step sequence shows using Visual Studio Code, Claude Code and Dataverse skills to create an environment, add authentication, build a solution and data model, and load sample data."
---

## TL;DR

Visual Studio Code, Claude Code and Microsoft Dataverse skills can create a Dataverse environment, authentication profile, solution, publisher, expense data model and sample data from natural language prompts. The walkthrough also shows how the Dataverse MCP server and PAC tooling support the process.

{% include curated-attribution.html %}

## Why it matters

- Makers: Set up Visual Studio Code with Power Platform Tools and Dataverse skills to build Dataverse assets from prompts instead of portal screens.
- Admins/IT: Provide the required tenant access and review approval prompts because environment creation and authentication still depend on tenant permissions.
- BI/Data teams: Specify field types and relationships precisely in prompts, since the demonstrated model required correcting decimal fields to currency fields.
- Leadership/Business: Treat agentic tooling as a productivity aid, not a replacement for Dataverse knowledge and solution architecture.

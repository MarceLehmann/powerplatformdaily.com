---
title: Custom skills turn reusable Copilot expertise into Agent Builder packages
description: Custom skills package instructions, files and scripts for declarative
  agents. The source explains why Agent Builder fits document work and when Copilot
  Studio is needed.
date: '2026-10-12T16:57:21Z'
author: news_editorial
lang: en
toc: false
tags:
- copilot-studio
- roadmap
- licensing
content_type: curated_summary
curation_id: b1275e31d09f3c57801a6dfc
image:
  path: "/assets/img/curated/b1275e31d09f3c57801a6dfc.png"
  alt: 'News card: Custom skills package reusable expertise for declarative agents.'
permalink: "/en/posts/custom-skills-turn-reusable-copilot-expertise-into-agent-builder-b1275e31/"
translation_url: "/de/posts/custom-skills-turn-reusable-copilot-expertise-into-agent-builder-b1275e31/"
source_url: https://holgerimbery.blog/declarative-agent-skills-agent-builder
source_site_url: https://holgerimbery.blog/
source_title: Prompt Libraries Are Reusable Text - Skills Are Reusable Expertise
source_name: Holger Imbery - fieldnotes and insights
source_language: en
source_language_name: English
source_author: Holger Imbery
source_published_at: '2026-09-19'
source_type: article
faq:
- question: How do custom skills work in Microsoft 365 Copilot Agent Builder?
  answer: Custom skills package instructions, reference files, templates, and scripts
    in a folder that a declarative agent loads when the task requires it.
- question: Can Agent Builder upload a custom skill ZIP?
  answer: Yes, Agent Builder accepts a complete skill ZIP under Configure, while uploading
    SKILL.md alone or separate individual files is unsupported.
- question: When should a declarative agent custom skill move to Copilot Studio?
  answer: Move it to Copilot Studio when it needs custom integrations, multi-step
    workflows, autonomous behavior, lifecycle management, or an external channel.
---

## TL;DR

Custom skills for declarative agents package instructions, reference files, templates, and scripts in a folder that loads on demand. The source recommends Agent Builder for document, assessment, and decision-record scenarios, while Copilot Studio is reserved for broader audiences, workflows, custom integrations, autonomous behavior, or external channels.

{% include curated-attribution.html %}

## Why it matters

- Makers: Start with one repeatable document workflow, create or upload the complete skill ZIP in Agent Builder, and test whether its description triggers the skill correctly.
- Admins/IT: Confirm Frontier Preview eligibility and the Information Barriers restriction before rollout, then keep the master skill package in source control because reuse across agents is not supported.
- Leadership/Business: Use Agent Builder for lightweight content work and move to Copilot Studio only when the capability must integrate with another system or run broader workflows.

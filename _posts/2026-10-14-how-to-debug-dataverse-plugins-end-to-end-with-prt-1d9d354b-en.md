---
title: How to debug Dataverse plugins end to end with PRT
description: Use the Plugin Registration Tool, correct PDB files and profiler settings
  to debug Dataverse plugins and plugin packages in a real environment.
date: '2026-10-14T17:00:07Z'
author: news_editorial
lang: en
toc: false
tags:
- dataverse
- power-apps
content_type: curated_summary
curation_id: 1d9d354bdccda1b0161bec9c
image:
  path: "/assets/img/curated/1d9d354bdccda1b0161bec9c.png"
  alt: 'News card: Dataverse plugin packages can be debugged end to end with the right
    PRT configuration.'
permalink: "/en/posts/how-to-debug-dataverse-plugins-end-to-end-with-prt-1d9d354b/"
translation_url: "/de/posts/how-to-debug-dataverse-plugins-end-to-end-with-prt-1d9d354b/"
source_url: https://hajekj.net/2026/03/09/debugging-dataverse-plugins/
source_site_url: https://hajekj.net/
source_title: Debugging Dataverse plugins
source_name: Honza's Blarg
source_language: en
source_language_name: English
source_author: Jan Hajek
source_published_at: '2026-03-09'
source_updated_at: '2026-03-09'
source_type: article
faq:
- question: How do I configure PRT to debug Dataverse plugin packages?
  answer: Set LegacyPluginProfiler to false in PRT's appsettings.json before launching
    the Plugin Registration Tool. This is required for plugin package debugging.
- question: Why does Dataverse plugin debugging require a PDB file?
  answer: A correct PDB file provides the debugging information needed to debug the
    plugin code. Without it, source-level debugging cannot work.
- question: How do I replay a profiled Dataverse plugin execution in Visual Studio?
  answer: Start profiling, execute the plugin, select its execution and assembly from
    the history, then attach Visual Studio to the process and replay it.
---

## TL;DR

Dataverse plugin debugging requires the latest Plugin Registration Tool, a Debug build with a usable PDB file, LegacyPluginProfiler set to false, enabled Plugin Trace Log, and a profiling replay attached from Visual Studio or VS Code.

{% include curated-attribution.html %}

## Why it matters

- Makers: Build the plugin in Debug configuration and verify that the correct PDB file is produced, because missing symbols prevent source debugging.
- Admins/IT: Ensure Plugin Trace Log is enabled and configure PRT with LegacyPluginProfiler set to false, because the legacy profiler can fail with plugin packages.
- Makers: Start profiling, execute the plugin, select the recorded assembly, and attach Visual Studio or a CLR debugger to replay the execution.

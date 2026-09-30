---
# the default layout is 'page'
icon: fas fa-info-circle
order: 5
title: About
description: "Independent news on Power Apps, Power Automate and Copilot Studio: short summaries, clear source credit and links to the originals."
---

Power Platform News brings what is new in Power Apps, Power Automate and Copilot Studio into one place. Each entry offers a short TL;DR, a note on what it means for makers, developers, admins and business owners, and a direct link to the original article.

## What we cover

- Power Apps: canvas and model-driven apps, code apps and the maker experience
- Power Automate: cloud and desktop flows, agent flows and connectors
- Copilot Studio: building, extending and managing agents. Microsoft 365 Copilot, GitHub Copilot and other Copilot products are not covered unless an item is about building agents with Copilot Studio
- Dataverse, Power Pages and platform-wide changes in administration, licensing, ALM and security that affect them
- Power BI and Microsoft Fabric are not covered for now

## How this site works

We watch a curated list of independent community blogs and, as they are added, official Microsoft channels. New items are checked automatically for relevance, and the short summaries are written with AI assistance. They are our own summaries, never republications or full translations. Because they are generated automatically, a summary can contain mistakes: read the original before you act on it, and tell us when something is wrong.

## Editorial approach

We help you find worthwhile reading, not replace it. We identify the original blog and author, show the source's own publication date next to our entry date when the source states one, and link directly to the original. We do not republish full articles, images or translations.

The original author and the person who suggests a link are not necessarily the same person. Contributor names and LinkedIn profiles appear only with permission. A submitted RSS feed is not blanket permission to republish its contents.

Authors can request a correction or removal by emailing [{{ site.data.profile.site.contactEmail }}](mailto:{{ site.data.profile.site.contactEmail }}). Listing a source does not imply a partnership or endorsement.

Many capabilities start in preview and change quickly, so verify availability and requirements against current Microsoft documentation before relying on them in production.

## Independence

Power Platform News is an independent publication. It is not affiliated with, endorsed by or sponsored by Microsoft. Power Apps, Power Automate, Copilot Studio, Dataverse, Power Pages, Power BI and Microsoft Fabric are trademarks of Microsoft Corporation.

## Editor

The site is edited by **Marcel Lehmann**, founder of [KMUpower](https://kmupower.com/), a Swiss Power Platform consultancy and training business.

Marcel also edits [PowerPlatformTip](https://www.powerplatformtip.com/) and [Power Platform Governance](https://powerplatformgovernance.com/). We disclose that connection when featuring PowerPlatformTip here. Connect with [Marcel](https://www.linkedin.com/in/marcelehmann/) on LinkedIn.

## Contribute

{% assign submission_endpoint = site.data.submission.endpoint | default: '' | strip %}{% if submission_endpoint == '' %}Suggestions are not open yet. When they are, you can suggest an article on our [submission page]({{ '/submit/' | relative_url }}).{% else %}Suggest an article on our [submission page]({{ '/submit/' | relative_url }}).{% endif %} A link is enough; your name and LinkedIn profile are optional. Suggested links are checked automatically for relevance and quality, without a person reviewing each one, before anything is published.

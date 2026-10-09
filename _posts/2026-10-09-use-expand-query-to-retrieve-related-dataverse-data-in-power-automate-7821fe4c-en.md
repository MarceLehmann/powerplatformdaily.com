---
title: Use Expand Query to retrieve related Dataverse data in Power Automate
description: Configure Dataverse Get a Row by ID with Expand Query, then access related
  fields through a custom expression in later flow actions.
date: '2026-10-09T16:52:56Z'
author: news_editorial
lang: en
toc: false
tags:
- power-automate
- dataverse
content_type: curated_summary
curation_id: 7821fe4cb54b93a32c9d9aca
image:
  path: "/assets/img/curated/7821fe4cb54b93a32c9d9aca.png"
  alt: 'News card: Power Automate can retrieve related Dataverse data with Expand
    Query.'
permalink: "/en/posts/use-expand-query-to-retrieve-related-dataverse-data-in-power-automate-7821fe4c/"
translation_url: "/de/posts/use-expand-query-to-retrieve-related-dataverse-data-in-power-automate-7821fe4c/"
source_url: https://citizendeveloper365.com/how-to-use-expand-query-in-power-automate/
source_site_url: https://citizendeveloper365.com/
source_title: 'Updated: How to Use Expand Query in Power Automate'
source_name: Citizen Developer
source_language: en
source_language_name: English
source_author: Griffin Lickfeldt
source_published_at: '2026-02-04'
source_updated_at: '2026-02-04'
source_type: article
faq:
- question: How do I return related Dataverse columns with Power Automate Expand Query?
  answer: Use the Expand Query field in Dataverse Get a Row by ID to request related
    table data with an OData-style expression.
- question: How can I limit fields returned by a Power Automate Dataverse lookup?
  answer: Add $select after the navigation property and list the required columns,
    such as contactid and fullname, for the related record.
- question: How do I reference expanded Dataverse data in a later flow action?
  answer: Use a Body expression containing the action name, lookup schema name, and
    related column logical name to retrieve the expanded value.
---

## TL;DR

Power Automate&\#39;s Dataverse Get a Row by ID action uses an OData-style Expand Query to return related table data. The guide shows primarycontactid($select=contactid,fullname), then accesses the expanded values with Body(&\#39;Get\_a\_row\_by\_ID&\#39;)?\[&\#39;primarycontactid&\#39;\]\[&\#39;FullName&\#39;\] in subsequent actions.

{% include curated-attribution.html %}

## Why it matters

- Makers: Add the related table navigation property to Expand Query and use $select when you need specific columns, such as contactid and fullname.
- Makers: Retrieve expanded values with a custom Body expression when they do not appear in the Dynamic Content panel, so later actions can use the related record data.

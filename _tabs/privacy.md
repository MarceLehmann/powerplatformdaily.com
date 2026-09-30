---
layout: page
title: Privacy Policy
icon: fas fa-user-shield
order: 7
permalink: /privacy/
description: "Privacy Policy for Power Platform News - how we collect, use and protect your data."
sitemap:
  priority: 0.3
  changefreq: yearly
---

{%- assign uses_ga = false -%}{%- if site.analytics.google.id and site.analytics.google.id != empty -%}{%- assign uses_ga = true -%}{%- endif -%}
{%- assign uses_clarity = false -%}{%- if site.analytics.clarity.id and site.analytics.clarity.id != empty -%}{%- assign uses_clarity = true -%}{%- endif -%}

**Last Updated:** September 30, 2026

## Introduction

Welcome to Power Platform News ("we," "our," or "us"), a project of Marcel Lehmann / KMUpower. This Privacy Policy explains how we collect, use, disclose and safeguard information when you visit [powerplatformnews.com](https://powerplatformnews.com).

## Information We Collect

### Automatically Collected Information
{% if uses_ga or uses_clarity %}
If you accept analytics on your first visit, we collect usage information through {% if uses_ga %}Google Analytics{% endif %}{% if uses_ga and uses_clarity %} and {% endif %}{% if uses_clarity %}Microsoft Clarity{% endif %}, including:
- **IP address** (used to derive an approximate, non-precise location; not stored in identifiable form by us)
- **Browser and device type**
- **Pages visited, time spent, and navigation patterns**
- **Referring website or search engine**
{% if uses_clarity %}- **Interaction data such as clicks, scrolling and anonymised session replays** (Microsoft Clarity){% endif %}

If you decline, none of these services load.
{% else %}
This site does not currently use analytics or advertising cookies. Our hosting provider and the font and script providers named below receive technical data such as your IP address when a page loads (see "Third-Party Services" below).
{% endif %}

### Information You Provide Voluntarily
If you use the [content submission form](/submit/) to suggest an article for curation, we collect:
- **The suggested URL** (required)
- **Your name and LinkedIn profile URL** (optional, only if you choose to add them)
- A hidden anti-spam field that legitimate visitors never fill in; submissions where it is filled in are discarded automatically

We only publish your name and LinkedIn profile alongside a summary if you explicitly tick the "I agree to have my name and LinkedIn profile published with this suggestion" checkbox. If you leave it unticked, your name and profile are not stored and never shown on the site.

## How We Process Submissions and Content

- **Storage:** submissions are stored in Microsoft Dataverse and processed with Microsoft Power Automate, both part of Microsoft Power Platform.
- **AI processing:** the text of a submitted page or of a feed item is analysed by an AI service (Azure AI Foundry) to decide whether it is relevant and to draft a short summary. Your name and LinkedIn profile are not sent to the AI service.
- **AI-assisted summaries:** the summaries on this site are generated with AI assistance and can contain errors. Every summary links to the original source.
- **Publication:** approved summaries are written to a private GitHub repository and published through GitHub Pages. A contributor name or LinkedIn profile is included only with your consent.

## How We Use Your Information

We use the information we collect to:

1. **Process content suggestions**: check submitted URLs and, if you opted in, credit you publicly for the suggestion
2. **Understand site usage**: analyse which items and topics are most useful, to guide future curation (only if you accepted analytics)
3. **Website improvement**: identify broken links, slow pages, or content gaps
4. **Legal compliance**: meet legal and regulatory requirements

## Cookies and Tracking Technologies
{% if uses_ga or uses_clarity %}
We ask for your consent before loading {% if uses_ga %}Google Analytics{% endif %}{% if uses_ga and uses_clarity %} and {% endif %}{% if uses_clarity %}Microsoft Clarity{% endif %}. On your first visit, a banner lets you **Accept** or **Decline**:
- **Accept**: the analytics service(s) load and set cookies to distinguish visitors and measure site usage.
- **Decline**: no analytics service loads; only a small first-party cookie remembers your choice for 365 days so we don't ask again.

You can change your mind at any time by clearing the `cookie_consent` cookie in your browser settings, which shows the banner again on your next visit.{% if uses_ga %} You can also opt out of Google Analytics entirely using the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout).{% endif %}
{% else %}
This site does not set analytics or advertising cookies.
{% endif %}

## Third-Party Services

We use the following third-party services:
{% if uses_ga %}
### Google Analytics
- Usage data is collected to understand site traffic and popular content
- Google's [Privacy Policy](https://policies.google.com/privacy) applies to data processed by Google Analytics
- Data is retained according to the retention setting configured for this site
{% endif %}
{% if uses_clarity %}
### Microsoft Clarity
- Interaction data such as clicks and scrolling, and anonymised session replays, are collected to understand how the site is used
- The [Microsoft Privacy Statement](https://privacy.microsoft.com/en-us/privacystatement) applies to data processed by Clarity
{% endif %}
### Fonts, icons and scripts (Google Fonts, jsDelivr)
- When a page loads, your browser fetches fonts from Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) and icons and some scripts from the jsDelivr content delivery network (`cdn.jsdelivr.net`)
- This happens on every page, before and regardless of your analytics choice. These providers receive your IP address and browser details
- Google's [Privacy Policy](https://policies.google.com/privacy) applies to Google Fonts

### GitHub Pages
Our website is hosted on GitHub Pages:
- GitHub's [Privacy Policy](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement) applies
- Server logs may be collected by GitHub/Fastly (our CDN) for security and performance purposes

### Microsoft Power Platform and Azure
Submissions are processed with Microsoft Dataverse, Power Automate and Azure AI Foundry, as described above. The [Microsoft Privacy Statement](https://privacy.microsoft.com/en-us/privacystatement) applies.

### LinkedIn (optional, submission form only)
If you choose to add a LinkedIn profile URL to a content suggestion and opt in to publication, that URL is displayed on the resulting page as a clickable link. We do not otherwise integrate with or receive data from LinkedIn.

## Data Security

We implement reasonable technical and organizational measures to protect information submitted to us:

- **Encryption**: HTTPS encryption for all website traffic
- **Minimal collection**: We only ask for what a content suggestion genuinely needs
- **Third-Party Security**: We only work with widely used, reputable service providers

However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.

## Data Retention

{% if uses_ga or uses_clarity %}- **Analytics data**: retained by the analytics providers according to the retention settings configured for this site
{% endif %}- **Content suggestions**: retained as long as needed to review and, if published, attribute the summary; you may request deletion at any time (see "Your Rights" below)

## Your Rights (GDPR / Swiss FADP)

Depending on where you live, you may have the following rights regarding your personal data:

1. **Right to Access**: Request a copy of the personal data we hold about you
2. **Right to Rectification**: Correct inaccurate or incomplete data
3. **Right to Erasure**: Request deletion of your personal data (e.g. removing your name/LinkedIn credit from a published post)
4. **Right to Object**: Object to processing of your personal data
5. **Right to Withdraw Consent**: Withdraw your earlier consent to publish your name/LinkedIn credit at any time

To exercise these rights, contact us at: [{{ site.data.profile.site.contactEmail }}](mailto:{{ site.data.profile.site.contactEmail }})

## Children's Privacy

Our website is not directed at children under 16 years of age, and we do not knowingly collect personal information from children.

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date.

## External Links

Every summary links to its original source on another website. We are not responsible for the privacy practices of those external sites and encourage you to review their own privacy policies.

## Contact Us

If you have questions about this Privacy Policy or our privacy practices, please contact:

**Marcel Lehmann**
Email: [{{ site.data.profile.site.contactEmail }}](mailto:{{ site.data.profile.site.contactEmail }})
Website: [powerplatformnews.com](https://powerplatformnews.com)

---

*This Privacy Policy is written with the GDPR and the Swiss Federal Act on Data Protection (FADP/revDSG) in mind. It applies to all visitors of powerplatformnews.com.*

---
title: 'Power Apps Galerie-Steuerelemente: So bestimmt OnSelect das Klickverhalten'
description: Ein klickbares Steuerelement in einer Power Apps Galerie kann seine eigene
  OnSelect-Formel statt der Galerieformel ausführen. Select(Parent) leitet den Klick
  an die Galerie weiter.
date: '2026-10-12T16:57:19Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
content_type: curated_summary
curation_id: e67062f1b57712b6c888e89e
image:
  path: "/assets/img/curated/e67062f1b57712b6c888e89e.png"
  alt: 'News-Karte: Clickable controls in Power Apps galleries can override the gallery
    OnSelect formula.'
permalink: "/de/posts/power-apps-gallery-controls-how-onselect-determines-click-behavior-e67062f1/"
translation_url: "/en/posts/power-apps-gallery-controls-how-onselect-determines-click-behavior-e67062f1/"
source_url: https://thepoweraddict.com/onselect-how-to-use-for-a-clickable-control-in-a-gallery/?utm_source=rss&utm_medium=rss&utm_campaign=onselect-how-to-use-for-a-clickable-control-in-a-gallery
source_site_url: https://thepoweraddict.com/
source_title: OnSelect – How to Use for a Clickable Control in a Gallery
source_name: The Power Addict
source_language: en
source_language_name: English
source_author: Hardit Bhatia
source_published_at: '2026-03-27'
source_updated_at: '2026-03-27'
source_type: article
faq:
- question: Wie funktioniert OnSelect bei einer Schaltfläche in einer Power Apps Galerie?
  answer: Eine Schaltfläche in einer Galerie führt ihre eigene OnSelect-Formel aus,
    wenn eine festgelegt ist. Diese Formel hat beim Klick Vorrang vor der OnSelect-Formel
    der Galerie.
- question: Was bewirkt Select(Parent) bei einem klickbaren Steuerelement in einer
    Power Apps Galerie?
  answer: Select(Parent) lässt den Klick wie eine Auswahl der Galerie wirken. Dadurch
    bestimmt die OnSelect-Formel der Galerie die anschliessende Aktion.
- question: Warum wirken Änderungen an OnSelect einer Power Apps Galerie manchmal
    nicht?
  answer: Die Änderungen wirken nicht, wenn das angeklickte Steuerelement eine eigene
    andere OnSelect-Formel enthält. Beim Klick wird dann diese Steuerelementformel
    ausgeführt.
---

## TL;DR

In Power Apps Galerien verwendet ein klickbares Steuerelement wie eine Schaltfläche seine eigene OnSelect-Formel, wenn sie festgelegt ist. Mit Select(Parent) verhält sich der Klick wie eine Auswahl der Galerie. Eine andere Formel hat Vorrang und kann Änderungen an OnSelect der Galerie wirkungslos erscheinen lassen.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Setzt ein klickbares Steuerelement in einer Galerie auf Select(Parent), wenn es dem Verhalten der Galerie folgen soll, und prüft zuerst dessen OnSelect-Formel.
- Makers: Verwendet eine eigene OnSelect-Formel, wenn die Schaltfläche eine andere Aktion benötigt, da diese Formel beim Klick Vorrang vor der Galerieformel hat.

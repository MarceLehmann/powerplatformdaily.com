---
title: Power Apps Bilder und Unterschriften in Dataverse speichern
description: Kamera- oder Bild-hinzufügen-Steuerelemente, Sammlungen und Patch laden
  Bilder und Unterschriften aus einer Canvas-App in Dataverse.
date: '2026-10-11T16:55:43Z'
author: news_editorial
lang: de
toc: false
tags:
- power-apps
- dataverse
content_type: curated_summary
curation_id: e87b3336de66715f7920f8c3
image:
  path: "/assets/img/curated/e87b3336de66715f7920f8c3.png"
  alt: 'News-Karte: Power Apps can patch camera photos and signatures directly into
    Dataverse.'
permalink: "/de/posts/how-to-patch-power-apps-images-and-signatures-to-dataverse-e87b3336/"
translation_url: "/en/posts/how-to-patch-power-apps-images-and-signatures-to-dataverse-e87b3336/"
source_url: https://thepoweraddict.com/how-to-patch-images-from-power-apps-to-dataverse/?utm_source=rss&utm_medium=rss&utm_campaign=how-to-patch-images-from-power-apps-to-dataverse
source_site_url: https://thepoweraddict.com/
source_title: How to patch images from Power Apps to Dataverse
source_name: The Power Addict
source_language: en
source_language_name: English
source_author: Hardit Bhatia
source_published_at: '2026-03-31'
source_type: article
faq:
- question: Wie speichert eine Power Apps Canvas-App Kamerafotos in Dataverse?
  answer: Die App sammelt jeden Kamerastream mit einer generierten GUID und einem
    Bildtyp, danach erstellen ForAll und Patch die Dataverse-Datensätze.
- question: Wie werden Power Apps Unterschriften in Dataverse gespeichert?
  answer: Ein separater Patch speichert das Bild des Stift-Steuerelements, kennzeichnet
    es als Kundenunterschrift und verknüpft es mit dem Lieferschein.
- question: Ändert das Bild-hinzufügen-Steuerelement die Power Apps Upload-Formel?
  answer: Die Capture-Formel verwendet imgUploadPhoto.Image statt des Kamerastreams,
    während die Upload-Formel unverändert bleibt.
---

## TL;DR

Power Apps kann Fotos über das Kamera- oder Bild-hinzufügen-Steuerelement erfassen, sie mit ID und Bildtyp sammeln und mit ForAll und Patch in Dataverse speichern. Ein separater Patch speichert eine Unterschrift aus dem Stift-Steuerelement und verknüpft die Datensätze mit einem Lieferschein.

{% include curated-attribution.html %}

## Warum das wichtig ist

- Makers: Erstellt den Erfassungsablauf mit Kamera- oder Bild-hinzufügen-Steuerelement, speichert Bild und Typ in einer Sammlung und übertragt die Sammlung mit Patch nach Dataverse. Verwendet einen separaten Patch für die Unterschrift.
- Admins/IT: Prüft, ob die Dataverse-Tabelle die in den Formeln verwendeten Felder für Bild, Auswahl, Name und Lieferschein sowie deren Verknüpfung enthält.

---
title: Power-Automate-Flow für E-Mails an neue Dataverse-Kontakte erstellen
description: Ein automatisierter Cloud Flow nutzt den Dataverse-Trigger Added und
  eine Outlook-E-Mail-Aktion. Kontaktdaten personalisieren die Nachricht, die Run-History
  hilft bei der Prüfung.
date: '2026-11-04T07:25:52Z'
author: news_editorial
lang: de
toc: false
tags:
- power-automate
- dataverse
- connectors
content_type: curated_summary
curation_id: 614f33198ee989e6dd498fc4
image:
  path: "/assets/img/curated/614f33198ee989e6dd498fc4.png"
  alt: 'News-Karte: Send a personalized Outlook email when a new Dataverse contact
    is added.'
permalink: "/de/posts/build-a-power-automate-flow-that-emails-new-dataverse-contacts-614f3319/"
translation_url: "/en/posts/build-a-power-automate-flow-that-emails-new-dataverse-contacts-614f3319/"
source_url: https://softchief.com/power-automate-for-beginners-build-a-flow-that-emails-new-contacts/
source_site_url: https://softchief.com/
source_title: 'Power Automate for Beginners: Build a Flow That Emails New Contacts'
source_name: Softchief Technologies
source_language: en
source_language_name: English
source_author: Softchief Author
source_published_at: '2026-11-03'
source_type: article
faq:
- question: Wie sende ich bei einem neuen Dataverse-Kontakt eine Outlook-E-Mail?
  answer: Erstellen Sie einen automatisierten Cloud Flow mit dem Dataverse-Zeilentrigger
    Added für Contact und fügen Sie danach eine Outlook-E-Mail-Aktion hinzu.
- question: Wie nutzt eine Power-Automate-Willkommensmail den Namen eines neuen Kontakts?
  answer: Fügen Sie Full Name aus den dynamischen Inhalten in die E-Mail-Begrüssung
    ein. Dieser Wert wird für jeden neuen Kontakt vom Dataverse-Trigger geliefert.
- question: Was prüfe ich, wenn ein Dataverse-Kontakt-E-Mail-Flow fehlschlägt?
  answer: Prüfen Sie die Run-Details auf fehlende Daten, Verbindungsprobleme oder
    eine nicht passende Triggereinstellung. Beheben Sie die Ursache und testen Sie
    erneut.
animation:
  video: /assets/img/animations/614f33198ee989e6dd498fc4-de.mp4
  poster: /assets/img/animations/614f33198ee989e6dd498fc4-de.poster.webp
  width: 800
  height: 450
  alt: "Ein 4-Schritt-Ablauf zeigt das Erstellen eines automatisierten Cloud Flow mit Dataverse-Trigger Added fuer Contact, das Hinzufuegen einer Outlook-E-Mail-Aktion, das Einfuegen von Full Name und das Pruefen der Run-History."
---

## TL;DR

Erstellen Sie einen automatisierten Cloud Flow mit einem Microsoft-Dataverse-Zeilentrigger für Added in der Tabelle Contact und ergänzen Sie eine Outlook-E-Mail-Aktion. Dynamische Inhalte wie Full Name personalisieren die Nachricht. Testen Sie mit einem Beispielkontakt und prüfen Sie die Run-History auf fehlende Daten, Verbindungsprobleme oder falsche Triggereinstellungen.

## Warum das wichtig ist

- Makers: Konfigurieren Sie den Dataverse-Trigger Contact für Added und nutzen Sie Outlook sowie dynamische Inhalte für personalisierte Willkommens-E-Mails.
- Makers: Testen Sie mit Kontakten, die alle Pflichtfelder enthalten, und prüfen Sie die Run-History auf Daten-, Verbindungs- und Triggerprobleme.
- Admins/IT: Stellen Sie Verbindungen, Berechtigungen und den Zugriff auf die Umgebung bereit, da Connector-Optionen von Konto und Einrichtung abhängen.

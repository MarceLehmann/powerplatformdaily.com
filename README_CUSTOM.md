# Power Platform Daily

Dieses Repository ist die technische Basis für einen kuratierten Blog rund um Microsoft Power Platform Produktneuigkeiten: Copilot Studio, Power Apps, Power Automate, Power BI und Microsoft Fabric - neue Features, Releases, Roadmap, Integrationen/Connectors und praxisnahe How-tos.

Governance, Security, Compliance, DLP, ALM, CoE und Administration sind bewusst **nicht** Thema dieser Seite - dafür gibt es die Schwesterseite [Power Platform Governance](https://powerplatformgovernance.com). Beide Seiten sollen sich nicht überschneiden.

Der Blog wird nicht manuell gepflegt, sondern durch einen Power-Automate-Flow mit RSS-Feeds und einzelnen Artikel-URLs aus einer kuratierten Quellenliste automatisch aktualisiert. Neue Inhalte werden als zweisprachige Markdown-Artikel formatiert, ins Repository committet und per GitHub Pages veröffentlicht.

## Architektur (Kurzfassung)

1. **Quellen** liegen in Dataverse (Tabelle `new_newssource`, Solution `PowerPlatformDaily`) - RSS-Feeds oder einzelne Artikel/Video/Podcast-URLs, mit Freigabestatus.
2. **Power-Automate-Flow** `Power Platform Daily - RSS and articles - Every 5 minutes` prüft alle 5 Minuten freigegebene Quellen, holt neue Einträge, lässt sie durch die Azure-AI-Foundry-Prüfung laufen (Themen-Relevanz plus DE/EN-Kurzfassung) und übergibt relevante Treffer per `repository_dispatch` an diesen Repo.
3. **Website-Einreichungen** laufen über den Flow `Power Platform Daily - Website submissions - Webhook` (`tools/intake.mjs`) direkt in Dataverse, zunächst ungeprüft/deaktiviert; eine KI-Gate-Prüfung entscheidet danach autonom über Freigabe.
4. **GitHub-Workflow** `publish-curation.yml` validiert, dedupliziert, rendert die Quote-Card-Bilder und committet beide Sprachversionen nach `_posts/`.
5. **`pages-deploy.yml`** baut die Jekyll/Chirpy-Seite und deployed nach GitHub Pages.
6. **`daily-digest.yml`** verschickt täglich einen Brevo-Digest neuer Beiträge; **`indexnow.yml`** meldet neue/geänderte Seiten an IndexNow.

## Technischer Stack

- Frontend: Jekyll + Chirpy
- Quellen: Dataverse
- Orchestrierung: Power Automate (`tools/automation.mjs`, `tools/intake.mjs`)
- KI-Bewertung/Kurzfassung: Azure AI Foundry (Custom Connector)
- GitHub-Publishing: `repository_dispatch` + `tools/publish-curation.rb`
- Karten-Rendering: `tools/render_card.py`

## Status

Repository-Struktur, Automation-Code und Website sind aufgebaut, analog zur Schwesterseite Power Platform Governance.

## Performance, Barrierefreiheit, HTML (22.11.2026, Runde 10von10)

Overrides von Chirpy 7.6.0 (alle in `_includes/` und `_layouts/`, am Dateikopf als Override markiert):

- `_includes/datetime.html`: `datetime`-Attribut am `<time>` (W3C).
- `_includes/notification.html`: `role="alert"` am `<aside>` entfernt (W3C), `aria-live` bleibt.
- `_includes/post-nav.html`: kein `aria-label` am deaktivierten `<div>`; der Link-Name beginnt mit "Older/Newer:" und enthält den sichtbaren Titel.
- `_includes/head.html`: viewport ohne `user-scalable=no`; kurze Seitentitel (unter 30 Zeichen) bekommen `seo_title_pad` aus `_config.yml`; Vorladen des Kopfbilds.
- `_includes/refactor-content.html`: Kopfbild ohne `shimmer`, Code-Blöcke per Tastatur erreichbar (`tabindex`), leere Tabellenkopfzelle mit unsichtbarem Namen, `code`-Element um die Zeilennummern-Tabelle durch `div.code-block` ersetzt.
- `_includes/search-loader.html`: der Suchindex (`search.json`) wird erst beim ersten Zugriff auf die Suche geladen.
- `_includes/hero-image.html`, `_layouts/post.html`, `_layouts/home.html`: WebP-Varianten (`srcset`) für Kopfbild und Karten, wenn die Dateien existieren.
- `_includes/metadata-hook.html`: `Organization.logo` und absolute `image.url`.
- `_config.yml`: `compress_html` behält `</head>`.

Bilder: `tools/hero_webp.py` schreibt zu jeder Karte `assets/img/curated/<id>.png` zwei verlustfreie WebP-Dateien: `<id>-hero.webp` (der Ausschnitt 40:21, den das Theme im Beitrag zeigt) und `<id>-card.webp` (die ganze Karte für die Startseite). Gleiche Pixel wie das PNG, rund die Hälfte der Bytes oder weniger. `tools/render_card.py` ruft das für jede neue Karte auf. Fehlen die WebP-Dateien, zeigt das Template das PNG wie vorher; `tools/check-site.rb` prüft, dass jede im `srcset` genannte Datei im Build liegt. Nachziehen für ältere Karten: `python tools/hero_webp.py`.

Schriften: `assets/lib/fonts/main.css` enthält Ersatzschriften mit angepassten Massen (Source Sans Pro und Lato gegen Arial), damit der Schrifttausch keinen Layoutsprung auslöst. Font Awesome ist auf die benutzten Symbole gekürzt (`python tools/subset-fontawesome.py`, braucht `pip install fonttools brotli`; die vollen Schriften liegen unter `tools/fontawesome-full/`). Wird ein neues Symbol gebraucht: Name in `EXTRA` im Skript oder als `fa-<name>` in den Quelltext schreiben und das Skript neu ausführen.

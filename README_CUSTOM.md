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

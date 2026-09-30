# Erzeugte Flow-Definitionen

Diese Dateien zeigen, was die beiden Deploy-Skripte in Dataverse anlegen werden. Sie sind **abgeleitet** und kein Import-Paket: Die Quelle sind `tools/automation.mjs` (Verarbeitung), `tools/intake.mjs` (Einreichung) und `_data/profile.json`. Mit `node tools/export-flows.mjs` werden sie neu geschrieben, und ein Test (`tools/flows-export.test.mjs`) schlägt fehl, wenn sie nicht mehr zum Code passen.

| Datei | Inhalt |
|---|---|
| `processing.outline.md` | Gliederung des Verarbeitungs-Flows (Power Platform News - RSS and articles - Every 5 minutes) |
| `processing.definition.json` | Vollständige Definition des Verarbeitungs-Flows |
| `intake.outline.md` | Gliederung des Einreichungs-Flows (Power Platform News - Website submissions - Webhook) |
| `intake.definition.json` | Vollständige Definition des Einreichungs-Flows |

Sie gelten für das Profil in `_data/profile.json` (Tabelle `new_newssource`, Lösung `PowerPlatformNews`). Die Flows selbst gibt es erst, wenn die Schritte der Stufe 2 im [Go-Live-Runbook](../2026-09-30_go-live-runbook.md) im Tenant gelaufen sind.

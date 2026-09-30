# News-Automation: Betrieb und Freigabe

Stand: 30.09.2026. Dieser Umsetzungsstand beschreibt die Architektur so, wie sie für Power Platform News implementiert ist - analog zur bereits produktiven Schwesterseite Power Platform Governance, mit denselben Mechanismen unter neuem Namen. Die Dataverse-Solution, der Cloud Flow und die Website-Einreichung selbst sind noch nicht deployed/aktiviert; das ist eine spätere Phase (`tools/deploy-automation.ps1`, `tools/deploy-intake.ps1`, jeweils mit `-Enable`).

## Gewünschter Ablauf

1. Power Automate läuft alle fünf Minuten, ohne parallele Flow-Ausführungen.
2. Aus `new_newssources` werden ausschliesslich aktive, freigegebene Quellen gelesen.
3. RSS: Feed abrufen, neue Feed-IDs erkennen, neue Artikel abrufen. Artikel: die einzelne freigegebene URL einmal verarbeiten.
4. Der bestehende `AzureAIFoundry-Privat`-Connector prüft mit `ChatCompletion` / `model-router`, ob belastbare Inhalte zu Copilot Studio, Power Apps, Power Automate, Power BI oder Microsoft Fabric vorliegen: neue Features, Releases, Roadmap, Integrationen/Connectors oder praktische How-tos. Governance-/Security-/Compliance-Inhalte (Thema der Schwesterseite), allgemeine KI-News, Werbung und unzureichende Inhalte werden nicht veröffentlicht.
5. Nur relevante Inhalte werden zu kurzen eigenen DE-/EN-Zusammenfassungen mit Originalquelle, Autor soweit belegt und direktem Original-Link verarbeitet.
6. Der GitHub-Connector sendet die strukturierten Daten als `repository_dispatch` an `Publish Curated Articles`. Keine Zugangsdaten oder ungeprüften Markdown-Dateien im Payload.
7. Der GitHub-Workflow validiert alles nochmals, dedupliziert anhand der Original-URL und schreibt beide Sprachversionen gemeinsam nach `_posts/`. Danach startet er den Pages-Build.
8. Nach erfolgreicher Validierung, Git-Übernahme und gegebenenfalls Pages-Build-Anforderung erstellt der Publisher die GitHub-Referenz `refs/tags/curation-results/<request_id>`. Der Flow liest diese Bestätigung authentifiziert über `GetReference`. Erst dann bestätigt er Feed-IDs bzw. setzt einen Einzelartikel auf `Published to GitHub`. Das bedeutet Git-Übernahme, nicht bereits bestätigtes Pages-Deployment. Ein bereits vorhandener Artikel wird ebenfalls bestätigt, ohne neue Dateien zu erzeugen.

Es gibt keine separate Artikeltabelle und kein Speichern fremder Artikeltexte in Dataverse. Pro Quelle werden nur Betriebsstatus und verarbeitete Feed-IDs gespeichert. Der vollständige Artikel bleibt beim ursprünglichen Herausgeber.

## Erfassung und Freigabe

Tabelle: **News sources** (`new_newssource`).

| Feld | Verwendung |
|---|---|
| Name | Interne Bezeichnung der Quelle oder des Artikels |
| Article, RSS, YouTube or podcast URL | Die genaue HTTPS-Artikel-, Video-, Podcast- oder Feed-URL, nicht eine Blog-Startseite ohne Feed |
| Source type | `RSS`, `Article`, `YouTube` oder `Podcast` |
| Approval | `Awaiting approval`, `Approved`, `Rejected` |
| Processing enabled | Separater Ein-/Aus-Schalter; standardmässig `No` |
| Processing status | `Ready`, `Published`, `Needs review`, `Error`, `Awaiting GitHub result` |
| Process RSS articles published from | Optionaler Startzeitpunkt beim ersten Feed-Lauf; sonst gilt die Erstellungszeit des Quelldatensatzes |
| Submitter name / Submitter LinkedIn | Optionale Angaben passend zum Websiteformular |
| Public contributor credit consent | Nur `Yes` erlaubt die Übertragung dieser Angaben zu GitHub |
| Last processing message | Lauf- oder Fehlerhinweis; keine fremden Volltexte |

**Start:** `Approval = Approved`, `Processing enabled = Yes`, `Processing status = Ready`. Zum Pausieren `Processing enabled = No` setzen. Der technische Dataverse-Status muss ebenfalls aktiv sein. Freigabe eines RSS-Feeds erlaubt die automatische Veröffentlichung seiner relevanten Kurzfassungen, nicht die Übernahme fremder Volltexte oder Bilder.

Ansichten (analog zur Schwesterseite): `News - Awaiting approval`, `News - Active RSS feeds`, `News - Individual articles`, `News - Needs attention`. Das Hauptformular enthält die fachlichen Eingabefelder und schreibgeschützte Betriebsinformationen. Die internen Feed-ID-Felder stehen bewusst nicht im Erfassungsformular.

Eine URL-Änderung an einer bereits freigegebenen Quelle nur nach Pausierung und erneuter Prüfung durchführen; für eine andere Quelle vorzugsweise einen neuen Datensatz anlegen. Bereits an GitHub übergebene Aufträge sind durch ein nachträgliches Pausieren nicht zurückgerufen; solche Läufe bei Bedarf in GitHub abbrechen.

## Formularmapping

| Websitefeld | Dataverse |
|---|---|
| `content_url` | `new_contenturl` |
| `submitter_name` | `new_submittername` |
| `submitter_linkedin` | `new_submitterlinkedin` |
| `publish_credit` exakt `yes` | `new_publishcredit = true`, sonst `false` |

Öffentliche Eingaben dürfen niemals `new_approval` oder `new_enabled` setzen. Der Webhook-Intake weist zusätzliche Felder ab und setzt Freigabe/Aktivierung ausschliesslich serverseitig.

## Website-Webhook

- Flow: `Power Platform News - Website submissions - Webhook`, in derselben Solution wie der Five-Minutes-Flow. Erst nach Deployment (`tools/deploy-intake.ps1 -Enable`) für die direkte Website-Einreichung aktiv.
- Definition: `tools/intake.mjs`; Bereitstellung: `pwsh -File tools/deploy-intake.ps1`. Ohne `-Enable` bleibt der Flow ausgeschaltet. Keine Abhängigkeit von GitHub oder Foundry.
- Request: JSON per POST mit den vier Websitefeldern und optional leerem Honeypot-Feld `website`. Nur HTTPS, keine offensichtlichen lokalen/IP-Ziele oder URL-Zugangsdaten; LinkedIn nur persönliches Profil auf `linkedin.com` bzw. `www.linkedin.com`.
- Keine URL wird beim Intake abgerufen. Keine KI-, GitHub- oder Veröffentlichungsaktion. `Approval = Awaiting approval`, `Processing enabled = No`, `Processing status = Needs review` sind fest verdrahtet.
- Quelltyp wird zunächst als `Article` gespeichert. Bei der manuellen Prüfung auf `RSS` ändern, wenn ein Feed eingereicht wurde; danach bewusst freigeben, aktivieren und auf `Ready` setzen. Eine Blog-Startseite ohne nutzbaren Feed bleibt zur Klärung gesperrt.
- Namen und LinkedIn werden nur mit `publish_credit = yes` übertragen und gespeichert. Ohne Einwilligung werden sie bereits im Browser weggelassen.
- Bereits vorhandene URLs werden nicht geändert, auch nicht Einwilligung oder Freigabe. Fragmente werden entfernt. Die Lookup-Prüfung verhindert Wiederholungen nacheinander, ist jedoch keine atomare Eindeutigkeitsgarantie für gleichzeitige Requests. Die manuelle Prüfung muss solche Dubletten zusammenführen; keine automatische Freigabe.
- Antwort erst nach erfolgreicher Dataverse-Operation: HTTP 202 mit `accepted: true, status: awaiting_review`. Ungültige Eingaben: 400. Speicherfehler: 503. Keine persönlichen Daten, Datensatz-IDs oder Fehlerdetails in öffentlichen Antworten.
- Callback-Adresse wird als GitHub-Actions-Secret `NEWS_SUBMISSION_ENDPOINT` erst beim Pages-Build eingebunden, nicht im Git-Verlauf gespeichert. **Im ausgelieferten HTML und im Browser ist sie absichtlich öffentlich; das Build-Secret ändert daran nichts.** Geschützte Flow-Eingaben/Ausgaben reduzieren persönliche Daten im Laufprotokoll. Die gespeicherten Dataverse-Angaben bleiben dort für Berechtigte sichtbar.
- `tools/test-intake-live.ps1` prüft den lebenden Webhook (gespeicherte Freigabesperre, Opt-in, Wiederholung, unzulässige Steuerfelder) und verlangt zwingend eine `-FlowId`; kein Default, damit versehentlich niemals der Intake-Flow der Schwesterseite Governance angesprochen wird. Das Skript verlangt einen ausgeschalteten Flow und darf nicht während des öffentlichen Betriebs ausgeführt werden.

### Direkter Pilotbetrieb (nach Deployment)

Kein Proxy und keine Azure Function nötig. `_data/submission.yml` enthält `direct_webhook: true` und eine leere lokale `endpoint`-Angabe. Build-Plugin und Browser erlauben die signierte Power-Automate-Adresse nur bei dieser ausdrücklichen Freigabe und passender Callback-Struktur. Ohne Build-Secret bleibt das Formular deaktiviert.

1. Kein eigener serverseitiger Rate-Limiter oder CAPTCHA vorgesehen. Honeypot und Eingabeprüfung sind nur einfache Hürden. Viele gültige unterschiedliche Einreichungen können Dataverse-Speicher und Flow-/API-Kapazität beanspruchen; mögliche Kosten hängen vom Lizenzmodell ab - dieselben Restrisiken wie bei der Schwesterseite Governance, dort für den Pilotbetrieb akzeptiert.
2. Laufzahlen, Fehler und die Ansicht `News - Awaiting approval` manuell beobachten. Keine automatische Missbrauchsüberwachung vorgesehen.
3. Bei Missbrauch zuerst den Einreichungsflow ausschalten. Bei Schlüsselwechsel das Actions-Secret aktualisieren und den Pages-Build erneut auslösen; eine bereits veröffentlichte Adresse als dauerhaft bekannt behandeln.
4. Später bei Bedarf einen Proxy mit wirksamer Anfragebegrenzung und/oder serverseitig geprüftem Bot-Schutz ergänzen. Alle bestehenden Freigabesperren beibehalten. Für diesen Wechsel `direct_webhook` wieder deaktivieren und den öffentlichen Proxy konfigurieren.

Implementierungsgrundlage ist dieselbe wie bei Governance: die Second-Brain-Notiz `Flow_per_Web_API_anlegen_clientdata.md`. Zusätzlich gilt, live bei Governance verifiziert und unverändert übernommen: `ParseJson` unterstützt bei `OpenApiConnection` keine `pattern`-Schemas; `ParseJson`/`Compose` benötigen hier ausschliesslich geschützte Eingaben statt separat geschützter Ausgaben; synchrone `Response`-Aktionen erlauben keine Trigger-Parallelitätsbegrenzung.

## Sicherheit und Betriebsgrenzen

- HTTPS, Port 443, keine URL-Zugangsdaten und keine offensichtlichen lokalen/IP-Ziele. RSS-Artikel müssen denselben Host wie der freigegebene Feed verwenden. Externe Feed-Hosts benötigen eine gesonderte Erweiterung der Freigaberegel.
- Diese Prüfungen ersetzen keinen DNS-/Redirect-kontrollierten Fetch-Proxy. Deshalb nur manuell geprüfte öffentliche Quellen freigeben; kein ungeprüfter öffentlicher Auto-Import. Die HTTP-/RSS-Connectors sind keine vollständige SSRF-Schutzschicht.
- Fremde Seiteninhalte sind untrusted data. Sie können keine Freigabe erteilen, Repository-Pfade bestimmen oder Tools ausführen. HTML-/Liquid-Ausgaben werden beim Rendern entschärft.
- Maximal 30 neue Kandidaten pro Quelle und 2000 gemerkte Feed-IDs; grössere Mengen gehen in `Needs review`. Beim ersten Lauf kann der Startzeitpunkt historische Artikel ausschliessen. Keine stille Begrenzung mit anschliessendem Überspringen.
- Fehler bestätigen keine Feed-IDs. Nach drei aufeinanderfolgenden Verarbeitungsfehlern erfolgt `Needs review`. Bereits übergebene Aufträge bleiben bei fehlender GitHub-Bestätigung in `Awaiting GitHub result`; sie werden nicht erneut an Foundry oder GitHub übergeben. Nach 24 Stunden ohne Bestätigung erfolgt `Needs review`, auch bei einem fehlgeschlagenen Publisher oder einer defekten Verbindung.
- GitHub-Deduplizierung liest die vorhandenen Postdateien. Keine zusätzliche Artikel-Datenbank. Gleichzeitige Git-Commits werden bei abweichenden Dateien per Rebase wiederholt; echte Konflikte verlangen Prüfung.
- Das Repository bleibt privat. Erfolgsreferenzen werden ausschliesslich über die angemeldete GitHub-Verbindung gelesen; es gibt keine anonyme Actions-Abfrage. Bestätigungs-Tags nicht löschen, solange zugehörige Aufträge noch warten. Den tatsächlichen Fehler eines Publishers in GitHub Actions prüfen; der Connector liefert hier nur die Erfolgsbestätigung, nicht das Actions-Fehlerprotokoll.
- Eine GitHub-Übergabe ist auf die vom Connector/API unterstützte Payload-Grösse begrenzt. Zu grosse Batches schlagen sichtbar fehl und werden nicht als veröffentlicht markiert.
- Der Standard-GitHub-Connector fordert auch Organisationsrechte an. Die persönliche Zustimmung dazu erfolgt durch Marcel, nicht automatisiert.

## Umsetzungsstand

- Repository-Struktur, Automation-Code (`tools/automation.mjs`, `tools/intake.mjs`), GitHub-Workflows und Website sind aufgebaut - 1:1 dieselbe Architektur wie bei der bereits produktiven Schwesterseite Power Platform Governance, mit neuem Solution-/Tabellen-/Connection-Reference-Namen (`PowerPlatformNews`, `new_newssource`, `new_news_*`) und neuem Themenfokus.
- **Noch offen (spätere Phase, nicht Teil dieses Repository-Aufbaus):** Dataverse-Solution, Tabelle, Fachformular, Ansichten und Connection References in Dataverse tatsächlich anlegen; Cloud Flow `Power Platform News - RSS and articles - Every 5 minutes` und den Website-Webhook-Flow deployen (`tools/deploy-automation.ps1`, `tools/deploy-intake.ps1`); GitHub-Verbindung herstellen; erste Quellen freigeben; `NEWS_SUBMISSION_ENDPOINT`-Secret setzen; Live-Tests fahren (`tools/test-intake-live.ps1`).
- Lokale Prüfungen sind bereits jetzt lauffähig, unabhängig vom Dataverse-Deployment: Node-Tests für Gates und Flow-Struktur (`node --test tools/*.test.mjs`), Ruby-Tests für den Publisher (`tools/test-publish-curation.rb`), Jekyll-Build und Websiteprüfungen (`tools/check-site.rb`).

## Änderungen und Betrieb (nach Deployment)

1. Quellen über das Formular einreichen oder in Dataverse anlegen. Quelltyp und URL manuell prüfen, dann bewusst auf `Approved`, `Yes`, `Ready` setzen. Ohne freigegebene Quellen bleibt der aktive Flow im Leerlauf.
2. Für Definitionänderungen zuerst den Veröffentlichungsflow ausschalten. `pwsh -File tools/deploy-automation.ps1` mit PowerShell 7.4 oder neuer ausführen. Das Skript nutzt die vorhandene Azure-CLI-Anmeldung, prüft die komplette paginierte Connections-Liste, bindet GitHub und speichert den aktuellen Generator-Stand. Es gibt keine Tokens aus und lässt den Flow standardmässig ausgeschaltet.
3. Bei mehreren GitHub-Verbindungen die gewünschte Connection-ID mit `-GitHubConnection` angeben.
4. Nach erfolgreichen kontrollierten End-to-End-Tests im Designer aktivieren. Alternativ kann das Bereitstellungsskript nach erfolgter Prüfung mit `-Enable` aktivieren.

Quellartefakte: `tools/automation.mjs`, `tools/publish-curation.rb`, `tools/deploy-automation.ps1` und `.github/workflows/publish-curation.yml`. Keine Secrets in diesen Dateien.

# Go-Live-Runbook: Power Platform News

Grundsatz: Jede Stufe ist umkehrbar. Erst weitergehen, wenn das Tor der Stufe erfüllt ist. Warum diese Reihenfolge gilt, steht in der [Spezifikation](2026-09-30_spezifikation_power-platform-news.md).

**[M]** = Marcel muss es selbst tun (Konto, Tenant, Zustimmung). **STOPP** = nicht weitergehen, bevor die Bedingung erfüllt ist.

Ausgangszustand dieses Branches: Seite auf `noindex`, `robots.txt` sperrt alles, kein Flow bereitgestellt, IndexNow und Digest gesperrt, öffentliche Einreichung nicht freigegeben, keine Analytics-IDs, keine Geheimnisse gesetzt.

## Stufe 0: Entscheidungen

Vor jeder weiteren Stufe: E1–E5 und E10 aus Abschnitt 8 der Spezifikation beantworten. Den Diff des Branches ansehen (`git diff d284fd2..HEAD`, der erste Commit ist der unveränderte Governance-Snapshot).

**Tor 0:** Entscheidungen E1–E5 und E10 sind bestätigt.

## Stufe 1: Seite steht, bleibt unsichtbar

1. **[M]** Pull Request `ccr-453447c5-qyg2zo` → `main` prüfen und mergen.
2. **[M]** Repository → Settings → Pages → Build and deployment → Source: **GitHub Actions**. (Pages aus einem privaten Repository braucht einen passenden GitHub-Tarif. Beim Governance-Repository ist das bereits der Fall.) Ohne diese Einstellung schlägt der Deploy-Schritt fehl. Das ist erwartet.
3. **[M]** DNS beim Domain-Anbieter eintragen. Werte laut GitHub-Dokumentation, vor dem Eintragen dort gegenprüfen:
   - Hauptdomain, A-Records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Hauptdomain, AAAA-Records: `2606:50c0:8000::153` bis `2606:50c0:8003::153`
   - `www`, CNAME: `marcelehmann.github.io`
4. **[M]** Domain bei GitHub verifizieren (Account-Einstellungen → Pages → Add a domain, TXT-Eintrag), damit niemand die Domain übernehmen kann.
5. **[M]** In den Pages-Einstellungen die Custom Domain `powerplatformnews.com` eintragen, dann „Enforce HTTPS“ aktivieren, sobald das Zertifikat da ist.
6. Workflow „Build and Deploy“ erneut ausführen (Actions → Run workflow), bis er grün ist.
7. Prüfen:

```bash
curl -s https://powerplatformnews.com/robots.txt
# erwartet: "Disallow: /" und keine Zeile "Allow:" oder "Sitemap:"
curl -s https://powerplatformnews.com/ | grep -o '<meta name="robots"[^>]*>'
# erwartet: noindex, nofollow
```

**Tor 1:** Seite lädt über HTTPS, beide Ausgaben wie erwartet, das Formular zeigt „Submissions are not open yet“.

## Stufe 2: Flows bereit, aber aus

Voraussetzungen: PowerShell 7.4 oder neuer, Azure CLI, Node 20 oder neuer. Alle Namen und Kennungen stehen in `_data/profile.json`. Die Schritte 2.1 bis 2.4 sind **WP-01** und nur im Tenant möglich. Bisher wurde nichts davon ausgeführt.

**2.1 Lösung [M].** Neue Lösung „Power Platform News“, eindeutiger Name `PowerPlatformNews`, derselbe Herausgeber wie bei Governance (Präfix `new`), in derselben Umgebung.

**2.2 Tabelle [M].** `new_newssource` aus der Definition in `tools/automation.mjs` (`tableDefinition`). Empfohlen per Web API (`POST .../EntityDefinitions` mit Header `MSCRM.SolutionUniqueName: powerplatformnews`), weil die Oberfläche Auswahlwerte in Anlegereihenfolge vergibt und der Code **feste Werte** erwartet:

| Feld | Werte |
|---|---|
| `new_kind` | Article `100000000`, RSS `100000001`, YouTube `100000002`, Podcast `100000003` |
| `new_approval` | Awaiting approval `100000000`, Approved `100000001`, Rejected `100000002` |
| `new_processing` | Ready `100000000`, Published to GitHub `100000001`, Needs review `100000002`, Error `100000003`, Awaiting GitHub result `100000004` |

Definition ansehen: `node -e "import('./tools/automation.mjs').then(m => console.log(JSON.stringify(m.tableDefinition, null, 1)))"`. Nach dem Anlegen die Anpassungen veröffentlichen.

**2.3 Formular und Ansichten [M].** Hauptformular mit den fachlichen Feldern (Name, URL, Quelltyp, Freigabe, Verarbeitung aktiviert, Verarbeitungsstatus, Startzeitpunkt, Einreicher-Felder, Einwilligung) und schreibgeschützten Betriebsfeldern. Die internen Feed-ID-Felder gehören nicht ins Erfassungsformular. Vier Ansichten, abgeleitet aus den Ansichtsnamen im Bestand (die Filter sind nicht im Repo, daher hier rekonstruiert):

| Ansicht | Filter |
|---|---|
| News - Awaiting approval | Freigabe = Awaiting approval |
| News - Active RSS feeds | Quelltyp = RSS, Freigabe = Approved, Verarbeitung aktiviert = Ja |
| News - Individual articles | Quelltyp = Article |
| News - Needs attention | Status = Needs review, Error oder Awaiting GitHub result |

**2.4 Connection References und Verbindungen [M].** Fünf Referenzen in der Lösung anlegen und an bestehende Verbindungen binden:

| Logischer Name | Connector |
|---|---|
| `new_news_dataverse` | `shared_commondataserviceforapps` |
| `new_news_rss` | `shared_rss` |
| `new_news_conversion` | `shared_conversionservice` |
| `new_news_foundry` | `shared_new-5fazureaifoundry-2dprivat-5fff421f3a907912f9` (der vorhandene Custom Connector `AzureAIFoundry-Privat`, wird wiederverwendet) |
| `new_news_github` | `shared_github` |

Der Standard-GitHub-Connector fordert auch Organisationsrechte an. Die Zustimmung erteilt Marcel persönlich in Power Automate.

**2.5 Flows bereitstellen (aus).**

```bash
az login --tenant <tenant aus _data/profile.json>
pwsh -File tools/deploy-intake.ps1        # Webhook-Flow anlegen bzw. aktualisieren, bleibt aus
pwsh -File tools/deploy-automation.ps1    # Verarbeitungs-Flow anlegen bzw. aktualisieren, bleibt aus
```

Erwartet: `DefinitionVerified = True` und `Enabled = False`. Das Anlegen des Verarbeitungs-Flows durch das Skript ist neu und noch nie gegen den Tenant gelaufen. Bei einem Fehler die Meldung festhalten und nichts erzwingen.

**Tor 2:** Beide Flows existieren, sind ausgeschaltet, `DefinitionVerified = True`, die Tabelle ist leer.

## Stufe 3: Pilot (10–15 Quellen, Seite bleibt `noindex`)

1. **Quellen wählen (WP-03).** Offizielle Microsoft-Feeds einzeln verifizieren (HTTP 200 und gültiges XML) und in `tools/extra-sources.json` eintragen: `[{ "name": "…", "xmlUrl": "https://…/feed/" }]`. Dazu 5–10 aktive MVP-Blogs.
2. **Trockenlauf:** `node tools/seed-mvp-sources.mjs --dry-run --only "Name1,Name2"`. Anzahl, Namen und URLs prüfen.
3. **Anlegen:** `node tools/seed-mvp-sources.mjs --enable --only "Name1,Name2,Official Example"` oder allgemein `--enable --limit 15` (handverlesene Zusatzquellen kommen zuerst).
4. **Prompt prüfen (WP-04):** 40–60 echte Einträge bewerten. Erwartet: Präzision ≥ 90 %, keine Treffer zu Microsoft 365 Copilot oder GitHub Copilot, keine Preview als allgemein verfügbar dargestellt.
5. **Flow einschalten:** erst im Designer einen kontrollierten Testlauf, dann `pwsh -File tools/deploy-automation.ps1 -Enable`.
6. **7–14 Tage täglich prüfen** (Checkliste unten). Laufdauer und Aktionen aus der Laufhistorie notieren (WP-05).

**Abbruch** bei: falscher Copilot-Zuordnung, Preview als GA, erfundenen Fakten, falscher Quellenangabe, Fehlerquote über 2 % der Läufe, Laufdauer über 10 Minuten bei 15 Quellen.

**Tor 3 → 4:** Kriterien aus Abschnitt 10 der Spezifikation erfüllt.

## Stufe 4: Ausbau

- Pro Woche etwa 25 Quellen: `node tools/seed-mvp-sources.mjs --enable --limit 25` (vorhandene URLs werden übersprungen).
- Nach jeder Erweiterung Laufdauer und Aktionen notieren. Bei Laufdauer über 15 Minuten stoppen und die Stellhebel aus Abschnitt 7.3 anwenden (WP-05, WP-06).
- YouTube erst nach eigener Prüfung der Kanalzuordnung (`--with-youtube`, die Liste enthält vier Doppelzuordnungen).
- Öffentliche Einreichung bleibt **aus** (`direct_webhook: false`, kein Secret), bis WP-06 und WP-13 erledigt sind.
- **Einreichung öffnen** (nur nach WP-06 und WP-13, Entscheidung E4), in dieser Reihenfolge:
  1. Intake-Flow ist noch aus: `pwsh -File tools/test-intake-live.ps1`. Das Skript aktiviert den Flow kurz selbst, prüft 11 HTTP-Fälle (Freigabesperre, Einwilligung, Wiederholung, unzulässige Felder), schaltet ihn wieder aus und räumt die Testdatensätze ab. Es darf nie im öffentlichen Betrieb laufen.
  2. `pwsh -File tools/deploy-intake.ps1 -Enable`.
  3. Die Callback-URL aus dem HTTP-Trigger des Flows kopieren und als Actions-Secret `SUBMISSION_ENDPOINT` hinterlegen.
  4. `direct_webhook: true` in `_data/submission.yml` committen und den Build abwarten. Die URL ist danach im HTML öffentlich (bewusst, ein Secret ändert daran nichts).
  5. Einen kontrollierten Test im Browser auf `/submit/` machen. Laufzahlen, Fehler und die Ansicht *News - Awaiting approval* von Hand beobachten.

## Stufe 5: Launch

Voraussetzung: WP-08 bis WP-12 erledigt und E11 abgeschlossen.

1. In `_config.yml`: `launch: true` und die Analytics-IDs eintragen (WP-11). Committen.
2. **[M]** Repository-Variable `SITE_LIVE` = `true` setzen (Settings → Secrets and variables → Actions → Variables).
3. Build abwarten, dann prüfen:

```bash
curl -s https://powerplatformnews.com/robots.txt      # erwartet: "Allow: /" und die Sitemap-Zeile
curl -s https://powerplatformnews.com/ | grep -c 'name="robots"'   # erwartet: 0
```

4. **[M]** Search Console und Bing Webmaster Tools: Domain bestätigen, `https://powerplatformnews.com/sitemap.xml` einreichen.
5. IndexNow einmal von Hand starten (Actions → IndexNow Ping → Run workflow). Danach läuft es täglich.
6. Ankündigung, erste Woche weiter täglich prüfen.

## Notbremse und Rückbau

| Situation | Maßnahme |
|---|---|
| Falsche oder problematische Beiträge | Verarbeitungs-Flow ausschalten. Beiträge per Commit aus `_posts/` löschen (beide Sprachdateien) |
| Seite soll wieder unsichtbar sein | `launch: false` committen und die Variable `SITE_LIVE` löschen |
| Takedown-Anfrage | Beitrag löschen, Quelle auf `Rejected` setzen oder Host sperren (nach WP-08 per Sperrliste), Antwort an die Anfragenden, Vorgang festhalten |
| Missbrauch des Formulars | Webhook-Flow ausschalten. Danach `SUBMISSION_ENDPOINT` austauschen (neue Flow-URL), Build auslösen. Eine veröffentlichte URL gilt als dauerhaft bekannt |
| Fehlerhafte Flow-Definition | Flow ausschalten und neu bereitstellen. Das Skript bricht hängende Läufe ab |

## Laufender Betrieb

- Ansicht *News - Needs attention*, fehlgeschlagene Publisher-Läufe in GitHub Actions und die Flow-Laufhistorie regelmäßig ansehen (im Pilot täglich).
- Quelle pausieren: `Processing enabled = Nein`. Die URL einer freigegebenen Quelle nur nach Pausieren ändern, für eine andere Quelle besser einen neuen Datensatz anlegen.
- Bereits an GitHub übergebene Aufträge werden durch Pausieren nicht zurückgerufen. Den Publisher-Lauf bei Bedarf in GitHub abbrechen.
- Die Bestätigungs-Tags `curation-results/*` nicht löschen, solange Aufträge warten.
- Pushes des Publishers lösen IndexNow nicht aus (Bot-Push). Die tägliche Ausführung deckt das ab.
- Änderungen an der Flow-Definition: zuerst Flow ausschalten, dann `deploy-automation.ps1`. Das Skript nutzt die vorhandene `az`-Anmeldung und gibt keine Tokens aus.

## Checkliste: Tagesprüfung im Pilot

Für jeden neuen Beitrag:

- [ ] Thema im Scope (Power Apps, Power Automate, Copilot Studio, begleitend Dataverse und Power Pages)?
- [ ] Kein anderer Copilot (Microsoft 365, GitHub, Security)?
- [ ] Kurzfassung sachlich richtig, gegen das Original geprüft?
- [ ] Status richtig dargestellt (GA, Preview, angekündigt, wird eingestellt)?
- [ ] Quelle, Autor und Originaldatum korrekt, Link führt direkt zum Original?
- [ ] KI-Hinweis sichtbar?
- [ ] Deutscher Text in Ordnung (Umlaute, Ton)?
- [ ] Karte lesbar, kein Umbruchfehler?
- [ ] Kein Duplikat eines vorhandenen Beitrags?

Kennzahlen notieren: Kandidaten, veröffentlicht, Trefferquote, Laufdauer, Fehler, geschätzte KI-Kosten.

## Geheimnisse und Variablen

| Name | Art | Wann setzen |
|---|---|---|
| `SUBMISSION_ENDPOINT` | Actions-Secret | Erst bei geöffneter Einreichung (Stufe 4) |
| `SITE_LIVE` | Actions-Variable `true` | Erst beim Launch (Stufe 5) |
| `BREVO_API_KEY` | Actions-Secret | Nur wenn der Digest aktiviert wird (E8) |

Keine Zugangsdaten, Tokens oder Callback-URLs gehören ins Repository.

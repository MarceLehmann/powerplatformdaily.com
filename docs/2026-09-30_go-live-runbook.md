# Go-Live-Runbook: Power Platform News

Grundsatz: Jede Stufe lässt sich bis zum Launch zurücknehmen (Flows ausschalten, `launch: false` lassen, Beiträge löschen). Die Dataverse-Objekte bleiben dabei bestehen, denn das Bootstrap-Skript löscht nichts. Wer sie entfernen will, tut das von Hand im Maker-Portal. Erst weitergehen, wenn das Tor der Stufe erfüllt ist. Warum diese Reihenfolge gilt, steht in der [Spezifikation](2026-09-30_spezifikation_power-platform-news.md).

**[M]** = Marcel muss es selbst tun (Konto, Tenant, Zustimmung). **STOPP** = nicht weitergehen, bevor die Bedingung erfüllt ist.

Ausgangszustand dieses Branches: Die Seite ist für Suchmaschinen gesperrt (`noindex`, `robots.txt` sperrt alles), kein Flow ist bereitgestellt, IndexNow und Digest sind gesperrt, die öffentliche Einreichung ist nicht freigegeben, es gibt keine Analytics-IDs und keine gesetzten Geheimnisse. Das Repository enthält **keine Beiträge und keine Datensätze**. Nur die Kandidatenlisten für das Seed-Skript liegen in `tools/`, auf Name, Technologien, Start- und Feed-Adresse reduziert. Im Tenant wurde nichts angelegt, und kein Skript hier lief gegen einen Tenant.

## Stufe 0: Entscheidungen

Vor jeder weiteren Stufe: E1–E5, E10 und E12 aus Abschnitt 8 der Spezifikation beantworten. Den Diff des Branches ansehen (`git diff d284fd2..HEAD`, der erste Commit ist der unveränderte Governance-Snapshot).

**Tor 0:** Entscheidungen E1–E5, E10 und E12 sind bestätigt.

## Stufe 1: Seite steht, für Suchmaschinen gesperrt

Die Stufe hat zwei Teile. **Schritt 1** (Merge nach `main`) ist immer nötig, bevor der Pilot Beiträge veröffentlichen kann: `repository_dispatch` startet nur Workflows des Standard-Branches (nach GitHub-Verhalten, nicht geprüft). Die **Schritte 2 bis 7** machen die Seite im Netz erreichbar. Lautet E12 „erst zum Launch“, bleibt Pages bis dahin aus und die Schritte 2 bis 7 wandern in Stufe 5 vor den Schalter `launch: true`. Bis dahin endet jeder Build, den der Publisher anstösst, rot (vermutlich im Schritt `configure-pages`). Der Publisher selbst und seine Quittung sind davon nicht betroffen, weil er den Build nur anfordert und nicht auf ihn wartet (nach Code-Lektüre).

Ab den Schritten 2 bis 7 ist die Seite im Netz **erreichbar und lesbar**. `noindex` und `Disallow` bitten nur Suchmaschinen, sie nicht aufzunehmen. `feed.xml`, `sitemap.xml` und `llms.txt` werden ausgeliefert, und wer die Adresse kennt, sieht alles, auch spätere Pilotbeiträge (E12).

1. **[M]** Den Branch `ccr-453447c5-qyg2zo` prüfen und nach `main` mergen (dazu einen Pull Request anlegen).
2. **[M]** Repository → Settings → Pages → Build and deployment → Source: **GitHub Actions**. Pages aus einem privaten Repository braucht einen passenden GitHub-Tarif (beim Governance-Repository ist das bereits der Fall, für dieses Repository ist es nicht geprüft). Ohne diese Einstellung schlägt der Workflow fehl, vermutlich schon im Schritt `actions/configure-pages` des Build-Jobs und nicht erst beim Deploy. Das ist erwartet.
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

**Tor 1:** Der Branch liegt auf `main`. Bei E12 „früh“ zusätzlich: Seite lädt über HTTPS, beide Ausgaben wie erwartet, das Formular zeigt „Submissions are not open yet“.

## Stufe 2: Flows bereit, aber aus (WP-01, WP-20)

Voraussetzungen: PowerShell 7.4 oder neuer, Azure CLI, Node 20 oder neuer. Alle Namen und Kennungen stehen in `_data/profile.json`. Die Schritte 2.1 bis 2.4 sind nur im Tenant möglich und wurden bisher nicht ausgeführt.

**2.1 Lizenz klären (WP-20) [M].** Zuerst, weil sie über den Pilotumfang entscheidet: Welche Lizenz deckt beide Flows, welches Tageslimit für Anfragen gilt, und wie viel verbraucht der Governance-Flow schon? Nach dem Modell der Spezifikation (Abschnitt 7.2) überschreitet der Flow ein Tageslimit von 40.000 Anfragen ab 7 aktiven Quellen, der Pilot mit 15 Quellen braucht rund 92.000. Reicht das Limit nicht, zuerst E10 entscheiden (Fallback-Polling, WP-21) oder den Pilot verkleinern. Rechnerisch bleiben bei 40.000 Anfragen pro Tag höchstens 6 Quellen, abzüglich dessen, was der Governance-Flow verbraucht, und damit weniger als die 10–15 Quellen des geplanten Pilots.

**2.2 Dataverse-Seite anlegen [M].** Das Skript legt Lösung `PowerPlatformNews`, die eigene Tabelle `new_newssource`, fünf Connection References, vier Ansichten und das Hauptformular an. Erst den Trockenlauf lesen, er schreibt nichts:

```bash
az login --tenant <tenant aus _data/profile.json>
node tools/bootstrap-solution.mjs --bind-from new_governance_
```

- Der Herausgeber wird über das Präfix `new` gefunden. Gibt es mehrere, mit `--publisher <eindeutiger Name>` wählen.
- `--bind-from new_governance_` bindet die fünf neuen Referenzen an dieselben Verbindungen, die die Governance-Referenzen nutzen (Dataverse, RSS, Content Conversion, Foundry-Connector, GitHub). Ist eine davon bei Governance nicht gebunden, steht eine Warnung da. Trifft das Präfix gar keine gebundene Referenz (meist fehlt der Unterstrich am Ende), stoppt das Skript vor dem Schreiben. Die GitHub-Verbindung setzt `deploy-automation.ps1` ohnehin selbst.
- Existiert die Tabelle schon, prüft das Skript Spalten und die festen Auswahlwerte samt Bezeichnungen und bricht bei Abweichung ab, **bevor** etwas geschrieben wird. Ein vorhandenes, von Hand geändertes Formular bleibt unberührt (`--replace-form` ersetzt es).

Wenn der Trockenlauf stimmt:

```bash
node tools/bootstrap-solution.mjs --bind-from new_governance_ --apply
```

Das Skript ergänzt nur und löscht nichts. Ein zweiter Lauf meldet alles als vorhanden. Schlägt das Anlegen einer Ansicht oder des Formulars fehl, ist das eine Warnung: Die Objekte dann von Hand anlegen (Tabellen unten). Danach im Maker-Portal prüfen: Die Lösung enthält Tabelle, fünf gebundene Referenzen, vier Ansichten und das Formular.

**2.3 Referenz für den Handweg.** Nur nötig, wenn das Skript nicht nutzbar ist oder ein Teil fehlschlägt.

Tabelle `new_newssource` aus der Definition in `tools/automation.mjs` (`tableDefinition`). Per Web API (`POST .../EntityDefinitions` mit Header `MSCRM.SolutionUniqueName: powerplatformnews`), weil die Oberfläche Auswahlwerte in Anlegereihenfolge vergibt und der Code **feste Werte** erwartet:

| Feld | Werte |
|---|---|
| `new_kind` | Article `100000000`, RSS `100000001`, YouTube `100000002`, Podcast `100000003` |
| `new_approval` | Awaiting approval `100000000`, Approved `100000001`, Rejected `100000002` |
| `new_processing` | Ready `100000000`, Published to GitHub `100000001`, Needs review `100000002`, Error `100000003`, Awaiting GitHub result `100000004` |

Definition ansehen: `node -e "import('./tools/automation.mjs').then(m => console.log(JSON.stringify(m.tableDefinition, null, 1)))"`. Nach dem Anlegen die Anpassungen veröffentlichen.

Connection References (alle in der Lösung):

| Logischer Name | Connector |
|---|---|
| `new_news_dataverse` | `shared_commondataserviceforapps` |
| `new_news_rss` | `shared_rss` |
| `new_news_conversion` | `shared_conversionservice` |
| `new_news_foundry` | `shared_new-5fazureaifoundry-2dprivat-5fff421f3a907912f9` (der vorhandene Custom Connector `AzureAIFoundry-Privat`, wird wiederverwendet) |
| `new_news_github` | `shared_github` |

Der Standard-GitHub-Connector fordert auch Organisationsrechte an. Die Zustimmung erteilt Marcel persönlich in Power Automate.

Ansichten (die Filter sind im Bestand nicht im Repo, daher rekonstruiert):

| Ansicht | Filter |
|---|---|
| News - Awaiting approval | Freigabe = Awaiting approval |
| News - Active RSS feeds | Quelltyp = RSS, Freigabe = Approved, Verarbeitung aktiviert = Ja |
| News - Individual articles | Quelltyp ≠ RSS |
| News - Needs attention | Status = Needs review, Error oder Awaiting GitHub result |

Hauptformular: die fachlichen Felder (Name, URL, Quelltyp, Freigabe, Verarbeitung aktiviert, Verarbeitungsstatus, Startzeitpunkt, Einreicher-Felder, Einwilligung) und schreibgeschützte Betriebsfelder. Die internen Feed-ID-Felder gehören nicht ins Erfassungsformular.

**2.4 Flows bereitstellen (aus).**

```bash
pwsh -File tools/deploy-intake.ps1        # Webhook-Flow anlegen bzw. aktualisieren, bleibt aus
pwsh -File tools/deploy-automation.ps1    # Verarbeitungs-Flow anlegen bzw. aktualisieren, bleibt aus
```

`deploy-automation.ps1` braucht genau **eine** verbundene GitHub-Verbindung. Gibt es mehrere oder soll eine eigene Verbindung nur für diese Seite dienen (R12 der Spezifikation), die Connection-ID (den technischen Namen der Verbindung, nicht den Anzeigenamen) mit `-GitHubConnection <Connection-ID>` angeben. Erwartet: `DefinitionVerified = True` und `Enabled = False`. Das Anlegen des Verarbeitungs-Flows durch das Skript ist neu und noch nie gegen den Tenant gelaufen. Bei einem Fehler die Meldung festhalten und nichts erzwingen.

**Tor 2:** Beide Flows existieren, sind ausgeschaltet, `DefinitionVerified = True`, die Tabelle ist leer, die Lizenz ist geklärt (WP-20).

## Stufe 3: Pilot (10–15 Quellen, Seite bleibt `noindex`)

Zwei Teile: zuerst ein **Auswertungslauf** mit rückdatiertem Start, der in kurzer Zeit genug Kandidaten für die Bewertung liefert, dann 7–14 Tage Regelbetrieb. Ohne Rückdatierung liefern 15 Quellen in 7–14 Tagen nach der Annahme der Spezifikation nur etwa 4–28 Kandidaten.

1. **Quellen wählen (WP-03).** Die Listen in `tools/` sind Kandidaten und für diese Seite nicht geprüft. Offizielle Microsoft-Feeds einzeln verifizieren (HTTP 200, gültiges XML, die Beitragslinks der Einträge haben denselben Host wie die Feed-Adresse) und in `tools/extra-sources.json` eintragen: `[{ "name": "…", "xmlUrl": "https://…/feed/" }]`. Dazu 5–10 aktive MVP-Blogs, deren Feed-Host zur Startseite passt.
2. **Trockenlauf:** `node tools/seed-mvp-sources.mjs --only "Name1,Name2"`. Das schreibt nichts und läuft auch ohne Anmeldung (dann prüft es nicht, was schon vorhanden ist). `--only` vergleicht mit dem Namen **und** den Technologien der Quelle. Anzahl, Namen und URLs prüfen.
3. **Auswertungslauf anlegen (WP-04):** `node tools/seed-mvp-sources.mjs --apply --enable --feed-from <Datum, 60 Tage zurück> --only "Name1,Name2,Official Example"`. `--feed-from` nur für Feeds, die im Zeitraum **höchstens 15 Einträge** haben (von Hand im Feed nachsehen): Der Flow verarbeitet 30 Einträge je Abruf und markiert den Rest als gesehen, ohne ihn zu lesen (F1), und eine Übergabe von mehr als etwa 16 bis 19 Artikeln an GitHub kann scheitern (F20). Die übrigen Quellen ohne `--feed-from` und sofort eingeschaltet anlegen: Sie beginnen bei ihrer Erstellungszeit. Ein später eingeschalteter Datensatz liest dagegen alles, was seit dem Anlegen erschien.
4. **Flow einschalten:** erst im Designer einen kontrollierten Testlauf, dann `pwsh -File tools/deploy-automation.ps1 -Enable`.
5. **Bewerten (WP-04):** alle vom Modell entschiedenen Kandidaten, mindestens 40. Veröffentlichte Beiträge stehen in `_posts/` (die Seite bleibt `noindex`). **Verworfene** Kandidaten speichert der Flow nicht, Bewertung und Grund stehen nur in der Laufhistorie (Aufbewahrung begrenzt, die Dauer im Tenant prüfen): zeitnah auswerten. Erwartet: Präzision ≥ 90 %, keine Treffer zu Microsoft 365 Copilot oder GitHub Copilot, keine Preview als allgemein verfügbar dargestellt.
6. **7–14 Tage täglich prüfen** (Checkliste unten). Laufdauer und Aktionen aus der Laufhistorie notieren (WP-05).

**Abbruch** bei: falscher Copilot-Zuordnung, Preview als GA, erfundenen Fakten, falscher Quellenangabe, Fehlerquote über 2 % der Läufe, Laufdauer über 10 Minuten bei 15 Quellen.

**Tor 3 → 4:** Kriterien aus Abschnitt 10 der Spezifikation erfüllt.

## Stufe 4: Ausbau

Bedingung für diese Stufe (Tor 4): WP-04, WP-05, WP-06 und WP-07 sind erledigt, und wenn die Messung es verlangt auch WP-21. Bis dahin höchstens die 10–15 Pilotquellen.

- Pro Woche etwa 25 Quellen: `node tools/seed-mvp-sources.mjs --apply --enable --limit 25`. Vorhandene URLs werden übersprungen, `--enable` ändert vorhandene Datensätze nie. Wer Datensätze erst deaktiviert anlegt, schaltet sie im Datenbestand der Tabelle im Maker-Portal von Hand ein, sollte das aber zeitnah tun: Die Untergrenze für neue Einträge ist die Erstellungszeit des Datensatzes und nicht der Zeitpunkt des Einschaltens (F1).
- Nach jeder Erweiterung Laufdauer und Aktionen notieren. Bei Laufdauer über 15 Minuten stoppen und die Stellhebel aus Abschnitt 7.3 anwenden (Messung WP-05, Umsetzung WP-21).
- YouTube erst nach eigener Prüfung der Kanalzuordnung (`--with-youtube`, die Liste enthält vier Doppelzuordnungen) und wissen, dass die Erkennung nur Textteile der URL prüft (F6).
- Öffentliche Einreichung bleibt **aus** (`direct_webhook: false`, kein Secret), bis WP-06 und WP-13 erledigt sind.

**Einreichung öffnen** (nur nach WP-06 und WP-13, Entscheidung E4):

1. **Live-Test vorbereiten.** `tools/test-intake-live.ps1` verlangt einen ausgeschalteten Einreichungs-Flow (das Skript schaltet ihn selbst kurz ein und danach wieder aus) und setzt voraus, dass er existiert (Stufe 2). Den **Verarbeitungs-Flow ebenfalls ausschalten**, sonst holt er die Testdatensätze ab, beurteilt sie und kann das Skript mit „Submission escaped approval gates“ abbrechen lassen (das Skript verweigert den Start, solange der Verarbeitungs-Flow läuft).
2. `pwsh -File tools/test-intake-live.ps1`. Es prüft 11 HTTP-Fälle (Freigabesperre, Einwilligung, Wiederholung, unzulässige Felder), schaltet den Flow wieder aus und räumt die Testdatensätze ab. Es darf nie im öffentlichen Betrieb laufen. Es holt die Callback-URL selbst und gibt sie nie aus.
3. Verarbeitungs-Flow wieder einschalten.
4. Einreichung freischalten, **entweder**
   - **Variante A, mit Proxy (empfohlen, WP-13):** Das Secret `SUBMISSION_ENDPOINT` ist die Adresse des Proxys (HTTPS, ohne Query-String), `direct_webhook` bleibt `false`. Der Proxy leitet an den Flow weiter und kennt dessen signierte Adresse. Dann „Build and Deploy“ ausführen. **Oder**
   - **Variante B, direkt (nur mit bewusster Entscheidung, E4):** Reihenfolge einhalten. (a) `direct_webhook: true` in `_data/submission.yml` committen und den Build abwarten. Mit leerem Secret bleibt das Formular dabei deaktiviert. (b) `pwsh -File tools/deploy-intake.ps1 -Enable`. (c) Die Callback-URL aus der Trigger-Karte „When an HTTP request is received“ im Designer kopieren und als Actions-Secret `SUBMISSION_ENDPOINT` hinterlegen. (d) „Build and Deploy“ erneut ausführen. Die URL ist danach im HTML öffentlich (bewusst, ein Secret ändert daran nichts). **Nicht umgekehrt:** Ist das Secret mit signierter URL gesetzt, während `direct_webhook` noch `false` ist, bricht jeder Build mit „Invalid submission endpoint“ ab, auch die vom Publisher ausgelösten.
5. Texte nachziehen, die vom Formular abhängen: `llms.txt` („Submit content … (opens later)“) und `_includes/home-intro.html` („chooses the sources“ stimmt nicht mehr ganz, sobald das Gate Einreichungen annimmt). Bei Variante A muss der Proxy Anfragen von der Website erlauben (CORS).
6. Einen kontrollierten Test im Browser auf `/submit/` machen. Laufzahlen, Fehler und die Ansicht *News - Awaiting approval* von Hand beobachten.

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

| Situation | Massnahme |
|---|---|
| Falsche oder problematische Beiträge | Verarbeitungs-Flow ausschalten. Beiträge per Commit aus `_posts/` löschen (beide Sprachdateien) und das Kartenbild `assets/img/curated/<curation_id>.png` |
| Seite soll vor dem Launch nicht gefunden werden | Ist schon so: `noindex` und `Disallow` gelten, solange `launch: false` ist. Die Seite bleibt für alle lesbar, die die Adresse kennen. Soll auch das nicht sein, Pages ausschalten |
| Seite soll **nach dem Launch** wieder aus den Suchergebnissen | `launch: false` committen und `SITE_LIVE` löschen stellt `noindex` und `Disallow` her, entfernt aber bereits indexierte Seiten **nicht zuverlässig**: Die `robots.txt`-Sperre hindert Crawler daran, das `noindex` zu lesen. Zuverlässig ist das Entfernen-Werkzeug der Search Console und der Bing Webmaster Tools, dazu die Seiten aus dem Build nehmen (GitHub Pages liefert dann 404) |
| Takedown-Anfrage | Beitrag löschen (beide Sprachdateien und das Kartenbild), Quelle auf `Rejected` setzen oder Host sperren (nach WP-08 per Sperrliste), Antwort an die Anfragenden, Vorgang festhalten |
| Missbrauch des Formulars | Webhook-Flow ausschalten. Danach `SUBMISSION_ENDPOINT` austauschen (neue Flow-URL), Build auslösen. Eine veröffentlichte URL gilt als dauerhaft bekannt |
| Fehlerhafte Flow-Definition | Flow ausschalten und neu bereitstellen. Das Skript bricht hängende Läufe ab |

## Laufender Betrieb

- Ansicht *News - Needs attention*, fehlgeschlagene Publisher-Läufe in GitHub Actions und die Flow-Laufhistorie regelmässig ansehen (im Pilot täglich).
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
| `SUBMISSION_ENDPOINT` | Actions-Secret | Erst bei geöffneter Einreichung (Stufe 4), Reihenfolge je nach Variante beachten |
| `SITE_LIVE` | Actions-Variable `true` | Erst beim Launch (Stufe 5) |
| `BREVO_API_KEY` | Actions-Secret | Nur wenn der Digest aktiviert wird (E8) |

Keine Zugangsdaten, Tokens oder Callback-URLs gehören ins Repository.

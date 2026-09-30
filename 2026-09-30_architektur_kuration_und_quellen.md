# Kuration, Quellen und Einreichungen

Stand: 30.09.2026. Diese Ausrichtung ist für die Website und die Automatisierung massgeblich.

## Zweck

Power Platform News ist eine kuratierte Sammlung: relevante Produktneuigkeiten zu Copilot Studio, Power Apps, Power Automate, Power BI und Microsoft Fabric finden, kurz zusammenfassen, ihre praktische Bedeutung einordnen und zum Original weiterleiten. Kein Volltextarchiv, keine vollständigen Übersetzungen fremder Beiträge und keine nachgebauten Anleitungen. Governance-, Security- und Compliance-Inhalte gehören auf die Schwesterseite Power Platform Governance, nicht hierher.

## Mindeststandard aus Sicht des Originalautors

- **Erkennbare Urheberschaft:** Blogname, Originalautor und verlinkter Originaltitel stehen vor der Zusammenfassung. Die Beschreibung nennt die Quelle auch auf der Startseite.
- **Besuche für das Original:** Der Hauptlink lautet „Detailed article on [Blogname]“ und führt direkt zur Artikel-URL, ohne Login, Newsletter-Schranke oder Tracking-Redirect.
- **Kurzfassung statt Ersatz:** Meist etwa 40–80 Wörter TL;DR plus eine kurze eigene Einordnung. Sehr kurze Quellen noch knapper behandeln. Keine vollständigen Schrittfolgen oder FAQ nacherzählen. Die Wortzahl ist eine redaktionelle Orientierung, keine rechtliche Freigrenze.
- **Keine falsche Zuschreibung:** Originalautor, Herausgeber unserer Kurzfassung und Einreicher sind unterschiedliche Rollen. Unsere Einordnung ist als „Why it matters“ / „Warum das wichtig ist“ erkennbar.
- **Zeitlicher Kontext:** Originaldatum und belegtes Änderungsdatum getrennt vom Datum unseres Beitrags ausweisen. Produktversprechen nicht ungeprüft als aktuell darstellen.
- **Rechte respektieren:** Öffentliche URLs und RSS-Feeds sind keine pauschale Erlaubnis zur Wiederveröffentlichung. Keine fremden Bilder, Screenshots, Logos, Codeblöcke oder längeren Zitate ohne passende Rechte übernehmen. Lizenz nur nennen, wenn belegt; Bedingungen beachten.
- **Korrektur und Entfernung:** Autoren können sich an die öffentlich angegebene Adresse `info@kmupower.com` wenden. Bei Entfernung oder RSS-Abmeldung auch zukünftige Wiederaufnahme verhindern; das spätere Backend muss dies berücksichtigen.
- **Keine erfundene Partnerschaft:** Quellenaufnahme bedeutet keine Empfehlung durch den Autor. Gemeinsame Herausgeber und bezahlte Platzierungen offenlegen.

Normale redaktionelle Quellenlinks werden nicht pauschal auf `nofollow` gesetzt. Vom Einreicher gelieferte LinkedIn-Links sind als `ugc` markiert. Für bezahlte Links gelten gesonderte Kennzeichnung und Linkattribute. Quellenlink und Nutzungsrecht sind unterschiedliche Fragen.

## Einreichung mit einem Pflichtfeld

| Feld | Pflicht | Bedeutung |
|---|---|---|
| `content_url` | Ja | Artikel-, Blog- oder RSS/Atom-URL; HTTP/HTTPS |
| `submitter_name` | Nein | Gewünschter öffentlicher Name |
| `submitter_linkedin` | Nein | Persönliche LinkedIn-Profil-URL unter `https://[www.]linkedin.com/in/` |
| `publish_credit` | Nein | HTML-Checkbox sendet `yes` nur bei ausdrücklicher Freigabe |

Kein Titel, Blogname, Themenkatalog, Sprachfeld oder E-Mail nötig. Metadaten werden aus der Quelle ermittelt und vor Veröffentlichung geprüft. Der Einreicher muss nicht der Originalautor sein.

Ohne Einwilligung erscheinen weder Name noch LinkedIn-Link. Solche Angaben dürfen dann auch nicht im öffentlichen Git-Repository, Feed, Suchindex oder JSON-LD landen. In Markdown sind bei Freigabe nur `submitted_by.name`, `submitted_by.linkedin` und der echte boolesche Wert `submitted_by.publish_credit: true` erlaubt. Keine privaten Kontakt- oder Einwilligungsprotokolle im öffentlichen Repository speichern.

Das spätere Backend muss URL-Schema, Host, Redirects und Eingaben serverseitig prüfen, private Netzwerkziele beim Abruf blockieren, personenbezogene Felder minimieren und vor HTML-Ausgabe escapen. Browser-Validierung ersetzt diese Prüfung nicht. Nicht behaupten, eine LinkedIn-Identität sei verifiziert, nur weil eine URL angegeben wurde.

## Quellenübersicht

- Die Seite `/sources/` entsteht beim Build aus `source_url` der veröffentlichten Beiträge.
- Domain-Ermittlung über den URI-Parser, nicht über Texteingaben oder Blognamen.
- Domains werden kleingeschrieben; ein führendes `www.` wird für die Gruppierung entfernt. Echte Subdomains bleiben eigenständig.
- Eine Domain erscheint einmal, mit Link zur Quellwebsite und zu den vorhandenen Zusammenfassungen.
- Unveröffentlichte Einträge, ungültige URLs und URLs mit Zugangsdaten werden nicht aufgenommen.
- Einreicher-Profile sind keine Quellen und landen deshalb nicht in dieser Domain-Liste.

## SEO und GEO

Konkreter Titel, eigenständige Beschreibung, TL;DR, thematische Tags, nachvollziehbare Quellen und eine kurze zusätzliche Einordnung machen den Eintrag verständlich. Die Seite erhält eine selbstreferenzierende Canonical-URL und korrektes `BlogPosting`-JSON-LD mit Power Platform News als Herausgeber der Zusammenfassung. Originaldaten bleiben sichtbare Quellenangaben, nicht das Veröffentlichungsdatum unseres neuen Textes.

Kein künstlicher Langtext für Suchmaschinen, keine erfundenen FAQs, keine Ranking- oder KI-Zitationsgarantien. Reine Duplikate und vollständige Übersetzungen sind nicht das Ziel. `source_url` ist kein externes Canonical. DE/EN wären zwei Fassungen unserer Kurzfassung; automatische Sprachvarianten und `hreflang` sind noch nicht umgesetzt.

## Beispielquelle für den Gemeinsame-Herausgeberschaft-Hinweis

Für Beiträge, deren Original bei [PowerPlatformTip](https://www.powerplatformtip.com) erscheint, gilt derselbe Hinweis wie bei der Schwesterseite Governance: `tools/publish-curation.rb` setzt automatisch `publisher_disclosure`, sobald `source_site_url` auf `powerplatformtip.com` zeigt, weil beide Publikationen von Marcel Lehmann herausgegeben werden. Das ist ein Mechanik-Detail, kein Hinweis auf einen bereits veröffentlichten Beispielbeitrag.

## Betriebsstand

Das vereinfachte Einreichungsformular, die automatisierte Quellenliste (`/sources/`) und der Publisher (`tools/publish-curation.rb`) sind implementiert und lokal getestet (`tools/test-publish-curation.rb`). Ein öffentlicher Einreichungs-Endpunkt ist noch nicht angeschlossen (kein `NEWS_SUBMISSION_ENDPOINT`-Secret gesetzt); der Formularversand bleibt deshalb deaktiviert, bis der Einreichungsflow deployt ist. `_posts/` enthält bewusst noch keine Beiträge - es wurde noch kein Einreichungs- oder Foundry-Flow ausgeführt.
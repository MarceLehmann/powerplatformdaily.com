# Power Platform News - Website submissions - Webhook: Gliederung

Erzeugt mit `node tools/export-flows.mjs`, nicht von Hand ändern. Die vollständige Definition steht in der gleichnamigen Datei `*.definition.json`; hier ist nur die Struktur mit den wichtigsten Angaben je Aktion (lange Ausdrücke sind gekürzt).

- **Flow:** Power Platform News - Website submissions - Webhook
- **Vorgesehene Flow-ID:** `d6230459-edff-4421-b42a-68f8b0579c8a` (wird beim Anlegen durch `tools/deploy-intake.ps1` verwendet)
- **Auslöser:** `manual`, HTTP-Anfrage (Http)
- **Verbindungen (Connection References):** `new_news_dataverse`
- **Aktionen:** 11
- **Zustand nach der Bereitstellung:** ausgeschaltet, bis das Deploy-Skript mit `-Enable` läuft

## Aktionen

- `Validate` (Scope)
  - `Validate_payload` (ParseJson): liest `@triggerBody()`
  - `Content_URL` (Compose): `@first(split(body('Validate_payload')?['content_url'], '#'))`
  - `Validate_host` (ParseJson): liest `{"content_url_valid":"@and(equals(uriScheme(outputs('Content_URL')), 'https'), equals(uriPort(outputs('Content_URL')), 443), contains(uriHost(outputs('Content_URL')), '.…`
- `Invalid_request` (Response): Status 400, läuft nur nach Fehler von `Validate` (Failed, TimedOut)
- `Store` (Scope)
  - `Find_existing` (OpenApiConnection): dataverse / ListRecords auf new_newssources, Filter `@concat('new_contenturl eq ', decodeUriComponent('%27'), replace(outputs('Content_URL'), decodeUriComponent('%27'), decodeUriComponent('%27%27')), decodeUriComponent('%2…`
  - `Create_if_new` (If): wenn `@empty(body('Find_existing')?['value'])`
    - dann:
      - `Create_submission` (OpenApiConnection): dataverse / CreateRecord auf new_newssources
- `Accepted` (Response): Status 202
- `Storage_failed` (Response): Status 503, läuft nur nach Fehler von `Store` (Failed, TimedOut)

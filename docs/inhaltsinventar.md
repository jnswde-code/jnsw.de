# Inhaltsinventar

Stand: 09.11.2026  
Basis: cb9adf1  
Methode: Code-Belege Datei:Zeile, Code-Suche über `app/tools` nach Anmeldeprüfungen, Netzwerkaufrufen und Browser-Speicher sowie Live-Abruf der Orga am 09.11.2026 ca. 16:15. HTTP 200 belegt, dass eine Seite erreichbar ist, nicht dass das Werkzeug funktioniert.

## PDF-Werkzeug

- **URL/Abschnitt:** `/tools/pdf-zusammenfuegen` (Live HTTP 200), `/projekte/pdf-tool` (Live HTTP 200)
- **Nutzen:** PDF-Dateien verbinden, umbenennen und als ZIP bündeln.
- **Reifegrad:** Eigene Route und Case Study, keine Prototyp-Kennzeichnung (`app/tools/ToolsExperience.tsx:41`). Funktion nicht live im Browser geprüft; ein Betriebsstatus ist unbelegt.
- **Öffentliche Erreichbarkeit:** Erreichbar (HTTP 200).
- **Konto:** Nicht erforderlich: `app/tools/pdf-zusammenfuegen/page.tsx` und `app/tools/layout.tsx` enthalten keine Anmeldeprüfung; Live HTTP 200 ohne Anmeldung.
- **Datenverarbeitung:** Lokal im Browser: `app/tools/pdf-zusammenfuegen/mergePdf.ts:24-36` verarbeitet ArrayBuffer mit `@cantoo/pdf-lib`; die Code-Suche findet unter `app/tools/pdf-zusammenfuegen/` keinen Netzwerkaufruf.
- **Belege:** `app/tools/pdf-zusammenfuegen/page.tsx:8`; `app/tools/pdf-zusammenfuegen/mergePdf.ts:24-36`; Live HTTP 200 für `/tools/pdf-zusammenfuegen` und `/projekte/pdf-tool`.

## Wohnungssuche

- **URL/Abschnitt:** `/tools/wohnungssuche` (Live HTTP 404); Dialog unter `/tools`.
- **Nutzen:** Verwaltung von Wohnungsanzeigen mit Status-Workflow (Prototyp).
- **Reifegrad:** Prototyp; keine eigene Route.
- **Öffentliche Erreichbarkeit:** Direkte URL liefert HTTP 404; als Dialog auf `/tools` erreichbar.
- **Konto:** Nicht erforderlich: `app/tools/page.tsx`, `app/tools/layout.tsx` und die Workbench enthalten keine Anmeldeprüfung; `/tools` live HTTP 200 ohne Anmeldung.
- **Datenverarbeitung:** Beispieldaten (`app/tools/wohnungssuche/listingsData.ts:24`); die Code-Suche findet im Werkzeug weder Netzwerkaufruf noch Browser-Speicher.
- **Belege:** `app/tools/ToolsExperience.tsx:5,14-16,46-58`; `app/tools/wohnungssuche/listingsData.ts:24`; Live HTTP 404 `/tools/wohnungssuche`.

## Abfrage-Konfigurator

- **URL/Abschnitt:** `/tools/abfrage`, `/tools/query` (Live HTTP 404); Dialog unter `/tools`.
- **Nutzen:** Regelbaum-basierte Textabfrage konfigurieren (Prototyp).
- **Reifegrad:** Prototyp; keine eigene Route.
- **Öffentliche Erreichbarkeit:** Direkte URL liefert HTTP 404; als Dialog auf `/tools` erreichbar.
- **Konto:** Nicht erforderlich: `app/tools/page.tsx`, `app/tools/layout.tsx` und der Prototyp enthalten keine Anmeldeprüfung; `/tools` live HTTP 200 ohne Anmeldung.
- **Datenverarbeitung:** Frontend-Prototyp mit fester Felddefinition (`app/tools/query-konfigurator/QueryConfiguratorPrototype.jsx:34`); die Code-Suche findet im Werkzeug weder Netzwerkaufruf noch Browser-Speicher.
- **Belege:** `app/tools/ToolsExperience.tsx:6,18-20,59-71`; `app/tools/query-konfigurator/QueryConfiguratorPrototype.jsx:34`; Live HTTP 404 `/tools/abfrage`, `/tools/query`.

## Support-KI

- **URL/Abschnitt:** `/tools/support-ki`, `/tools/support` (Live HTTP 404); Dialog unter `/tools`; API-Endpunkt `/api/support-ki/token`.
- **Nutzen:** Chat- und Sprachdialog mit Agent über LiveKit; im Dialog als „Support-KI / SimpliSan“ bezeichnet (`app/tools/support-ki/SupportKiWorkbench.tsx:118`).
- **Reifegrad:** Token-Endpunkt vorhanden; Live-Konfiguration unbelegt.
- **Öffentliche Erreichbarkeit:** Direkte Tool-URLs liefern HTTP 404; Dialog auf `/tools` erreichbar; API-Endpunkt vorhanden.
- **Konto:** Nur aktive Konten (`app/api/support-ki/token/route.ts:24-25`); ohne Anmeldung HTTP 401. Der Dialog selbst liegt auf dem öffentlichen `/tools`.
- **Datenverarbeitung:** Verbindung zu LiveKit (`SupportKiWorkbench.tsx:39-66`); Token mit 10 Minuten Gültigkeit (`app/api/support-ki/token/route.ts:34`); ohne Konfiguration HTTP 503 (`app/api/support-ki/token/route.ts:27-28`). Ort des Agenten, Weitergabe an Dritte und Live-Konfiguration unbelegt.
- **Belege:** `app/tools/support-ki/SupportKiWorkbench.tsx:39-66`; `app/api/support-ki/token/route.ts:24,27-28,34`; Live HTTP 404 `/tools/support-ki`, `/tools/support`.

## Bewerbungswerkstatt

- **URL/Abschnitt:** `/community/bewerbungswerkstatt` (Live HTTP 307 nach `/community`).
- **Nutzen:** Bewerbungsunterlagen verwalten und Stellenanzeigen importieren.
- **Reifegrad:** Funktion hinter Anmeldung nicht live geprüft.
- **Öffentliche Erreichbarkeit:** Ohne Anmeldung HTTP 307 nach `/community`; erfordert Konto.
- **Konto:** Erforderlich.
- **Datenverarbeitung:** Job-Import über eigenen Worker `worker/import-ai.ts:36` mit Cloudflare Workers AI Modell `@cf/meta/llama-3.1-8b-instruct-fp8`; Aufbewahrung dort unbelegt. Bewerbungsdaten laut Schema in D1-Tabellen (`db/schema.ts:74-189`).
- **Belege:** `app/community/bewerbungswerkstatt/page.tsx:6`; `worker/import-ai.ts:36`; `db/schema.ts:74-189`; `wrangler.import-ai.jsonc` (Cloudflare Workers AI Binding); Live HTTP 307 `/community/bewerbungswerkstatt`.

## jnsw.de

- **URL/Abschnitt:** `/` (Live HTTP 200, Titel „Digitale Produkte, Tools und Dokumentation | JNSW.DE“), `/tools`, `/projekte`, `/informationen`, `/community`, `/sitemap.xml`, `/robots.txt` (alle Live HTTP 200).
- **Nutzen:** Übersicht über digitale Produkte, Tools und Dokumentation.
- **Reifegrad:** Öffentliche Seiten live erreichbar; ein darüber hinausgehender Betriebsstatus ist unbelegt.
- **Öffentliche Erreichbarkeit:** Öffentlich erreichbar (HTTP 200).
- **Konto:** Für die öffentlichen Seiten nicht erforderlich (`app/page.tsx:16` löst den Nutzer auf, leitet aber nicht um). Konto nötig für Support-KI-Token und Bewerbungswerkstatt.
- **Datenverarbeitung:** Konten und Sitzungen in D1-Tabellen (`db/schema.ts:5,44`). Logs und Auswertungen durch das Hosting unbelegt.
- **Belege:** `app/page.tsx:16`; `db/schema.ts:5,44`; Live HTTP 200 für `/`, `/tools`, `/projekte`, `/informationen`, `/community`, `/sitemap.xml`, `/robots.txt`; Live-Titel `/`.

## jw-dev

- **URL/Abschnitt:** `/projekte/jw-dev` (Live HTTP 404); privates Repo `jnswde-code/jw-dev`.
- **Nutzen:** CLI-Beschreibung: „Dienst und Dashboard für parallele Claude-Sessions“ (Orga-Klärung, kein Code-Beleg in diesem Repo).
- **Reifegrad:** Keine öffentliche Projektseite vorhanden; darüber hinaus unbelegt.
- **Öffentliche Erreichbarkeit:** Kein öffentlicher Link, kein öffentliches Dashboard; `/projekte/jw-dev` liefert HTTP 404.
- **Konto:** unbelegt
- **Datenverarbeitung:** unbelegt
- **Belege:** Live HTTP 404 `/projekte/jw-dev`; CLI-Beschreibung (Orga-Klärung).

## Unbelegte Punkte

- PDF-Werkzeug und Prototypen: Funktion im Browser nicht live geprüft.
- Support-KI: Ort des Agenten, Weitergabe an Dritte, ob LiveKit live konfiguriert ist, Verhältnis zu SimpliSan.
- Bewerbungswerkstatt: Funktion hinter Anmeldung, Aufbewahrung im Job-Import-Worker.
- jnsw.de: Betriebsstatus, Logs und Auswertungen durch das Hosting.
- jw-dev: Öffentlicher Link/Dashboard, Konto, Datenverarbeitung, sonstige Funktionen.

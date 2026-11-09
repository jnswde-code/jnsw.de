# Inhaltsinventar

Stand: 09.11.2026  
Basis: cb9adf1  
Methode: Code-Belege Datei:Zeile plus Live-Abruf der Orga am 09.11.2026 ca. 16:15

## PDF-Werkzeug

- **URL/Abschnitt:** `/tools/pdf-zusammenfuegen` (Live HTTP 200), `/projekte/pdf-tool` (Live HTTP 200)
- **Nutzen:** PDF-Dateien verbinden, umbenennen und als ZIP bündeln.
- **Reifegrad:** Produktiv; eigene Route.
- **Öffentliche Erreichbarkeit:** Erreichbar (HTTP 200).
- **Konto:** Nicht erforderlich (laut Seitenbeschreibung).
- **Datenverarbeitung:** Lokal im Browser; `mergePdf.ts:24-36` verarbeitet ArrayBuffer mit `@cantoo/pdf-lib` ohne Serverupload.
- **Belege:** `app/tools/pdf-zusammenfuegen/page.tsx:8`; `app/tools/pdf-zusammenfuegen/mergePdf.ts:24-36`; Live HTTP 200 für `/tools/pdf-zusammenfuegen` und `/projekte/pdf-tool`.

## Wohnungssuche

- **URL/Abschnitt:** `/tools/wohnungssuche` (Live HTTP 404); Dialog unter `/tools`.
- **Nutzen:** Verwaltung von Wohnungsanzeigen mit Status-Workflow (Prototyp).
- **Reifegrad:** Prototyp; keine eigene Route.
- **Öffentliche Erreichbarkeit:** Direkte URL liefert HTTP 404; als Dialog auf `/tools` erreichbar.
- **Konto:** unbelegt
- **Datenverarbeitung:** Beispieldaten (`listingsData.ts:24`); keine echte Datenquelle erkennbar.
- **Belege:** `app/tools/ToolsExperience.tsx:5,14-16,46-58`; `app/tools/wohnungssuche/listingsData.ts:24`; Live HTTP 404 `/tools/wohnungssuche`.

## Abfrage-Konfigurator

- **URL/Abschnitt:** `/tools/abfrage`, `/tools/query` (Live HTTP 404); Dialog unter `/tools`.
- **Nutzen:** Regelbaum-basierte Textabfrage konfigurieren (Prototyp).
- **Reifegrad:** Prototyp; keine eigene Route.
- **Öffentliche Erreichbarkeit:** Direkte URL liefert HTTP 404; als Dialog auf `/tools` erreichbar.
- **Konto:** unbelegt
- **Datenverarbeitung:** Frontend-Prototyp mit fester Felddefinition (`QueryConfiguratorPrototype.jsx:34`); Serververarbeitung unbelegt.
- **Belege:** `app/tools/ToolsExperience.tsx:6,18-20,59-71`; `app/tools/query-konfigurator/QueryConfiguratorPrototype.jsx:34`; Live HTTP 404 `/tools/abfrage`, `/tools/query`.

## Support-KI

- **URL/Abschnitt:** `/tools/support-ki`, `/tools/support` (Live HTTP 404); Dialog unter `/tools`; API-Endpunkt `/api/support-ki/token`.
- **Nutzen:** Chat- und Sprachdialog mit Agent über LiveKit.
- **Reifegrad:** Token-Endpunkt vorhanden; Live-Konfiguration unbelegt.
- **Öffentliche Erreichbarkeit:** Direkte Tool-URLs liefern HTTP 404; Dialog auf `/tools` erreichbar; API-Endpunkt vorhanden.
- **Konto:** Nur aktive Konten (`route.ts:24`); ohne Anmeldung HTTP 401.
- **Datenverarbeitung:** Verbindung zu LiveKit (`SupportKiWorkbench.tsx:39-66`); Token mit 10 Minuten Gültigkeit (`route.ts:34`); ohne Konfiguration HTTP 503 (`route.ts:27-28`). Ort des Agenten, Weitergabe an Dritte und Live-Konfiguration unbelegt.
- **Belege:** `app/tools/support-ki/SupportKiWorkbench.tsx:39-66`; `app/api/support-ki/token/route.ts:24,27-28,34`; Live HTTP 404 `/tools/support-ki`, `/tools/support`.

## Bewerbungswerkstatt

- **URL/Abschnitt:** `/community/bewerbungswerkstatt` (Live HTTP 307 nach `/community`).
- **Nutzen:** Bewerbungsunterlagen verwalten und Stellenanzeigen importieren.
- **Reifegrad:** Funktion hinter Anmeldung nicht live geprüft.
- **Öffentliche Erreichbarkeit:** Ohne Anmeldung HTTP 307 nach `/community`; erfordert Konto.
- **Konto:** Erforderlich.
- **Datenverarbeitung:** Job-Import über eigenen Worker `worker/import-ai.ts:36` mit Cloudflare Workers AI Modell `@cf/meta/llama-3.1-8b-instruct-fp8`; Aufbewahrung dort unbelegt.
- **Belege:** `app/community/bewerbungswerkstatt/page.tsx:6`; `worker/import-ai.ts:36`; `wrangler.import-ai.jsonc` (Cloudflare Workers AI Binding); Live HTTP 307 `/community/bewerbungswerkstatt`.

## jnsw.de

- **URL/Abschnitt:** `/` (Live HTTP 200, Titel „Digitale Produkte, Tools und Dokumentation | JNSW.DE“), `/tools`, `/projekte`, `/informationen`, `/community`, `/sitemap.xml`, `/robots.txt` (alle Live HTTP 200).
- **Nutzen:** Übersicht über digitale Produkte, Tools und Dokumentation.
- **Reifegrad:** Produktiv.
- **Öffentliche Erreichbarkeit:** Öffentlich erreichbar (HTTP 200).
- **Konto:** Für öffentliche Seiten nicht erforderlich; community- oder tool-spezifische Funktionen können Konto erfordern.
- **Datenverarbeitung:** unbelegt
- **Belege:** Live HTTP 200 für `/`, `/tools`, `/projekte`, `/informationen`, `/community`, `/sitemap.xml`, `/robots.txt`; Live-Titel `/`.

## jw-dev

- **URL/Abschnitt:** `/projekte/jw-dev` (Live HTTP 404); privates Repo `jnswde-code/jw-dev`.
- **Nutzen:** CLI-Beschreibung: „Dienst und Dashboard für parallele Claude-Sessions“ (Orga-Klärung, kein Code-Beleg in diesem Repo).
- **Reifegrad:** Öffentliche Projektseite folgt in §3.4; Rest unbelegt.
- **Öffentliche Erreichbarkeit:** Kein öffentlicher Link, kein öffentliches Dashboard; `/projekte/jw-dev` liefert HTTP 404.
- **Konto:** unbelegt
- **Datenverarbeitung:** unbelegt
- **Belege:** Live HTTP 404 `/projekte/jw-dev`; Orga-Klärung CLI-Beschreibung.

## Unbelegte Punkte

- Wohnungssuche: Kontoanforderungen, echte Datenquellen, Serververarbeitung.
- Abfrage-Konfigurator: Kontoanforderungen, Speicherort von Konfigurationen, Serververarbeitung.
- Support-KI: Ort des Agenten, Weitergabe an Dritte, ob LiveKit live konfiguriert ist.
- Bewerbungswerkstatt: Funktion hinter Anmeldung, Aufbewahrung im Job-Import-Worker.
- jnsw.de: Datenverarbeitung auf allgemeinen Seiten.
- jw-dev: Öffentlicher Link/Dashboard, Konto, Datenverarbeitung, sonstige Funktionen.

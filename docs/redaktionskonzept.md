# Redaktionskonzept

Stand: 09.11.2026  
Status: Vorschlag, noch nicht abgestimmt  
Faktenquelle: `docs/inhaltsinventar.md` (Basis cb9adf1)

## 1. Kernbotschaft

JNSW.DE ist meine persönliche Projektplattform für praktische digitale Werkzeuge und nachvollziehbare KI-gestützte Entwicklung. Im Vordergrund steht der Nutzen für konkrete Aufgaben, nicht die Technik dahinter.

## 2. Tonalität

- Ich-Form als Vorschlag, nüchtern und konkret.
- Keine Team- oder Agenturbehauptungen.
- Keine Werbesprache, keine erfundenen Zahlen, Referenzen oder Kunden.

## 3. Muster je Projekt

Für jeden der sieben Inventar-Einträge gilt der gleiche Aufbau:

1. **Problem:** Welche Aufgabe soll gelöst werden?
2. **Nutzen:** Was bringt es dem Nutzer?
3. **Belegter Stand:** Was ist nachweisbar vorhanden?
4. **Grenzen:** Was ist unbelegt oder noch nicht umgesetzt?
5. **Nächster Schritt:** Was soll als Nächstes passieren?

## 4. Inventar-Einträge im Redaktionsmuster

### PDF-Werkzeug

- **Problem:** Mehrere PDF-Dateien sollen zu einem durchgängigen Dokument verbunden, einzeln umbenannt oder als ZIP gebündelt werden.
- **Nutzen:** Die wichtigsten PDF-Grundoperationen lassen sich ohne externen Dienst erledigen.
- **Belegter Stand:** Eigene Route `/tools/pdf-zusammenfuegen` und eigene Case Study unter `/projekte/pdf-tool` liefern HTTP 200. Das Tool ist nicht als Prototyp gekennzeichnet (`app/tools/ToolsExperience.tsx:41`).
- **Grenzen:** Die Funktion im Browser wurde nicht live geprüft; ein Betriebsstatus ist unbelegt.
- **Nächster Schritt:** Texte einheitlich auf „lokal im Browser und ohne Konto“ bringen; beides ist im Inventar belegt.

### Wohnungssuche

- **Problem:** Wohnungsanzeigen sollen über einen Status-Workflow verwaltet werden.
- **Nutzen:** Der Prototyp zeigt an Beispieldaten, wie sich der Stand je Anzeige verfolgen lässt.
- **Belegter Stand:** Erreichbar als Dialog auf `/tools`, keine eigene Route; `/tools/wohnungssuche` liefert HTTP 404.
- **Grenzen:** Prototyp mit Beispieldaten; kein Backend, keine Netzwerkverbindung, keine Browser-Speicherung nachgewiesen.
- **Nächster Schritt:** Immer als "Prototyp mit Beispieldaten" beschreiben und nicht als eigenständiges Produkt bewerben.

### Abfrage-Konfigurator

- **Problem:** Regelbasierte Textabfragen sollen ohne Programmierung konfiguriert werden.
- **Nutzen:** Der Prototyp zeigt, wie sich eine Textabfrage über einen Regelbaum zusammenstellen lässt.
- **Belegter Stand:** Erreichbar als Dialog auf `/tools`, keine eigene Route; `/tools/abfrage` und `/tools/query` liefern HTTP 404.
- **Grenzen:** Frontend-Prototyp mit fester Felddefinition; kein Backend, keine Netzwerkverbindung, keine Browser-Speicherung nachgewiesen.
- **Nächster Schritt:** Immer als "Prototyp mit Beispieldaten" beschreiben und nicht als eigenständiges Produkt bewerben.

### Support-KI / SimpliSan

- **Problem:** Nutzer sollen über Chat oder Sprache mit einem Support-Agenten interagieren können.
- **Nutzen:** Direkte Dialogoberfläche für Support-Anfragen.
- **Belegter Stand:** Dialog auf `/tools` erreichbar; API-Endpunkt `/api/support-ki/token` vorhanden; Verbindung über LiveKit vorgesehen; Token-Laufzeit 10 Minuten.
- **Grenzen:** Direkte Tool-URLs liefern HTTP 404; Live-Konfiguration, Ort des Agenten, Weitergabe an Dritte und aktueller Betrieb sind unbelegt. Nur mit aktivem Konto nutzbar.
- **Nächster Schritt:** Öffentlich nur als "Verbindung über LiveKit, Konto erforderlich" beschreiben; keine Aussage zur Funktionsfähigkeit oder zum Datenfluss treffen.

### Bewerbungswerkstatt

- **Problem:** Bewerbungsunterlagen und Stellenanzeigen sollen an einem Ort verwaltet werden.
- **Nutzen:** Strukturierte Vorbereitung von Bewerbungen.
- **Belegter Stand:** Route `/community/bewerbungswerkstatt` leitet ohne Anmeldung auf `/community` um (HTTP 307). Job-Import verwendet Cloudflare Workers AI (`@cf/meta/llama-3.1-8b-instruct-fp8`).
- **Grenzen:** Funktion hinter Anmeldung nicht live geprüft; Aufbewahrung im Import-Worker unbelegt.
- **Nächster Schritt:** Nur mit Konto bewerben; KI-Import über Cloudflare Workers AI nennen, aber nichts zur Speicherung behaupten.

### jnsw.de

- **Problem:** Eine übersichtliche Projektplattform für eigene Tools und deren Dokumentation bereitstellen.
- **Nutzen:** Besucher finden Projekte, Tools und Hintergründe an einem Ort.
- **Belegter Stand:** Startseite `/` und die Bereiche `/tools`, `/projekte`, `/informationen`, `/community`, `/sitemap.xml`, `/robots.txt` liefern HTTP 200.
- **Grenzen:** Betriebsstatus über HTTP-Erreichbarkeit hinaus unbelegt; Hosting-Logs und Auswertungen unbelegt.
- **Nächster Schritt:** Startseite neu gliedern und Navigation um "Projekte" erweitern.

### jw-dev

- **Problem:** Parallele Claude-Sessions sollen organisiert und über ein Dashboard nachvollziehbar gemacht werden.
- **Nutzen:** Übersicht über laufende und abgeschlossene KI-gestützte Entwicklungsschritte.
- **Belegter Stand:** `/projekte/jw-dev` liefert HTTP 404; öffentliche Projektseite existiert noch nicht. CLI-Beschreibung nennt "Dienst und Dashboard für parallele Claude-Sessions" (Orga-Klärung, kein Code-Beleg in diesem Repo).
- **Grenzen:** Öffentlicher Link, Dashboard, Konto und Datenverarbeitung sind unbelegt.
- **Nächster Schritt:** Fallstudie vom Nutzer bestätigen lassen, danach die Route `/projekte/jw-dev` anlegen.

## 5. Ersatztexte

### 5.1 Hero

**Heute** (`app/page.tsx:25-43`):

```text
JNSW.DE / Digitale Produkte
Entwicklung und Dokumentation aus Deutschland

Kleine Produkte.
Klar gemacht..

JNSW.DE entwickelt nützliche digitale Werkzeuge und dokumentiert die Entscheidungen dahinter.
Entdecken →
```

**Vorschlag:**

```text
JNSW.DE / Persönliche Projektplattform
Digitale Werkzeuge und KI-gestützte Entwicklung

Kleine Werkzeuge.
Klar erklärt..

Ich baue digitale Werkzeuge für konkrete Aufgaben und dokumentiere die Entscheidungen dabei nachvollziehbar.
Tools ansehen →
```

### 5.2 Abschnittsnummern

**Heute** (`app/page.tsx:56`, `app/page.tsx:73`):

- `01 / Tools`
- `02 / Informationen`

**Vorschlag:**

- `01 / Projekte`
- `02 / Tools`
- `03 / Informationen`
- `04 / Community`

> Hinweis: Die Community-Sektion hat aktuell keine sichtbare Nummerierung (`app/page.tsx:86-90`). Die neue Nummerierung folgt der Reihenfolge top, projekte, tools, informationen, community.

### 5.3 Projekte-Abschnitt auf der Startseite (neu, id=projekte)

**Heute:**

Der Abschnitt existiert auf der Startseite nicht.

**Vorschlag:**

```text
01 / Projekte

Projekte, die ich baue.

Werkzeuge und Case Studies mit Problem, Nutzen und belegtem Stand.

[PDF-Werkbank]
Case Study 01 · 2026
PDFs verbinden, umbenennen und als ZIP bündeln, lokal im Browser und ohne Konto.
→ /projekte/pdf-tool

[jw-dev] (nur nach Entscheidung in Abschnitt 7)
Case Study 02
Dienst und Dashboard für parallele Claude-Sessions: wie ich KI-gestützte Entwicklung organisiere.
→ /projekte/jw-dev
```

> Hinweis: Die Verlinkung zu jw-dev erfolgt auf die geplante Route `/projekte/jw-dev`. Ob die Case Study öffentlich verlinkt wird, ist eine der Entscheidungen in Abschnitt 7.

### 5.4 Tools

#### Einleitung auf `/tools`

**Heute** (`app/tools/page.tsx:5-17`):

```text
Titel: Digitale Tools für klare Aufgaben | JNSW.DE
Description: Kostenlose, datensparsame Werkzeuge für konkrete digitale Aufgaben – direkt im Browser und ohne unnötige Konten.

JNSW.DE / Tools
Werkzeuge für konkrete Aufgaben.

Werkzeuge
für Ideen..

Kleine digitale Helfer, die lokal, verständlich und ohne unnötige Konten funktionieren.
```

**Vorschlag:**

```text
Titel: Tools für konkrete Aufgaben | JNSW.DE
Description: Meine digitalen Werkzeuge für klare Aufgaben – einige lokal im Browser, andere als Prototypen oder mit Konto.

JNSW.DE / Tools
Werkzeuge für konkrete Aufgaben.

Werkzeuge
für klare Aufgaben..

Eine Übersicht meiner Werkzeuge. Manche arbeiten lokal im Browser, andere sind Prototypen oder erfordern ein Konto.
```

> Verbotene Begriffe entfernt: "kostenlos", "datensparsam", "lokal" pauschal, "ohne unnötige Konten" pauschal.

#### Tool-Überschrift

**Heute** (`app/tools/ToolsExperience.tsx:30`):

```text
01–04 / Verfügbar
Werkzeuge, die eine konkrete Aufgabe lösen.
```

**Vorschlag:**

```text
01–04 / Werkzeuge
Vier Ansätze für konkrete Aufgaben.
```

> Die Überschrift "Verfügbar" entfällt, weil nicht alle vier Tools im gleichen Sinne öffentlich verfügbar sind.

#### Karte 01: PDF-Werkbank

**Heute** (`app/tools/ToolsExperience.tsx:33-45`):

```text
01
PDF-Werkbank
Verbinden · umbenennen · ZIP · lokal
```

**Vorschlag:**

```text
01
PDF-Werkbank
Verbinden · umbenennen · ZIP · lokal im Browser · ohne Konto
```

#### Dialogtitel PDF-Werkzeug

**Heute** (`app/tools/ToolsExperience.tsx:99-103`):

```text
JNSW.DE / Tools / PDF
PDF-Werkbank
● Verarbeitung lokal im Browser
```

**Vorschlag:**

```text
JNSW.DE / Tools / PDF
PDF-Werkbank
● Verarbeitung lokal im Browser · Kein Konto nötig
```

#### Karte 02: Wohnungssuche

**Heute** (`app/tools/ToolsExperience.tsx:46-58`):

```text
02
Wohnungssuche-Assistent
Prototyp · Mock-Daten · Freigabe-Queue
```

**Vorschlag:**

```text
02
Wohnungssuche-Assistent
Prototyp · Beispieldaten · kein Backend
```

#### Dialogtitel Wohnungssuche

**Heute** (`app/tools/ToolsExperience.tsx:133-137`):

```text
JNSW.DE / Tools / Prototyp
Wohnungssuche-Assistent
● Prototyp · Mock-Daten, kein Backend
```

**Vorschlag:** (nur „Mock-Daten“ wird zu „Beispieldaten“)

```text
JNSW.DE / Tools / Prototyp
Wohnungssuche-Assistent
● Prototyp · Beispieldaten, kein Backend
```

#### Karte 03: Abfrage-Konfigurator

**Heute** (`app/tools/ToolsExperience.tsx:59-71`):

```text
03
Abfrage-Konfigurator
Prototyp · Regelbaum · Text-Abfrage
```

**Vorschlag:**

```text
03
Abfrage-Konfigurator
Prototyp · Beispieldaten · Regelbaum-Editor
```

#### Dialogtitel Abfrage-Konfigurator

**Heute** (`app/tools/ToolsExperience.tsx:167-171`):

```text
JNSW.DE / Tools / Prototyp
Abfrage-Konfigurator
● Prototyp · Beispieldaten, kein Backend
```

**Vorschlag:** (bereits korrekt)

```text
JNSW.DE / Tools / Prototyp
Abfrage-Konfigurator
● Prototyp · Beispieldaten, kein Backend
```

#### Karte 04: Support-KI

**Heute** (`app/tools/ToolsExperience.tsx:72-84`):

```text
04
Support-KI
Chat & Sprachdialog · SimpliSan Support
```

**Vorschlag:**

```text
04
Support-KI
Chat & Sprachdialog · Verbindung über LiveKit · Konto nötig
```

> Hinweis: Die Bezeichnung SimpliSan hängt an der Entscheidung in Abschnitt 7.

#### Dialogtitel Support-KI

**Heute** (`app/tools/ToolsExperience.tsx:201-205`):

```text
JNSW.DE / Tools / Support-KI
Support-KI
● Live-Verbindung via LiveKit
```

**Vorschlag:**

```text
JNSW.DE / Tools / Support-KI
Support-KI
● Verbindung über LiveKit · Nur mit aktivem Konto
```

> Hinweis: "Live-Verbindung" wird vermieden, weil die Live-Konfiguration unbelegt ist.

#### Support-KI-Workbench-Text

**Heute** (`app/tools/support-ki/SupportKiWorkbench.tsx:118-121`):

```text
Support-KI / SimpliSan
Chat & Anruf mit dem Support-Assistenten
Verbindet dich live mit dem Support-KI-Agenten. Ohne laufenden Agenten auf der Gegenseite bleibt eine Nachricht unbeantwortet.
```

**Vorschlag:** keine Änderung.

> Hinweis: Der heutige Text sagt offen, dass ohne laufenden Agenten keine Antwort kommt. `SupportKiWorkbench.tsx` liegt außerhalb der Dateien von §3.5; dort sind Verarbeitung und LiveKit ausdrücklich ausgenommen.

### 5.5 Informationen

**Heute** (`app/informationen/page.tsx:5-20`):

```text
Titel: Informationen zu digitalen Produkten | JNSW.DE
Description: Offene Notizen und Entscheidungen von JNSW.DE zu digitalen Produkten, Werkzeugen und ihrer Umsetzung.

JNSW.DE / Informationen
Eine offene Sammlung fuer digitale Arbeit.

Notizen,
die folgen..

Dieser Bereich entsteht mit den ersten veröffentlichten Beiträgen zu digitalen Produkten, Werkzeugen und ihrer Umsetzung.
```

**Vorschlag:**

```text
Titel: Informationen und Hintergründe | JNSW.DE
Description: Hintergründe zu den Projekten auf JNSW.DE, bisher als Case Study zur PDF-Werkbank.

JNSW.DE / Informationen
Eine offene Sammlung für digitale Arbeit.

Hintergründe,
die mitwachsen..

Eigene Beiträge gibt es hier noch nicht. Hintergründe zu Entscheidung und Umsetzung stehen bisher in der Case Study zur PDF-Werkbank.
→ /projekte/pdf-tool
```

> Hinweis: Der Bereich hat heute keine Beiträge. Der Text behauptet deshalb keine und verweist auf die einzige vorhandene Quelle.

#### `SectionPage`-Platzhaltertext

**Heute** (`app/SectionPage.tsx:17-21`):

```text
JNSW.DE / {label}
Eine offene Sammlung fuer digitale Arbeit.

{title}.

{intro}
```

**Vorschlag:**

```text
JNSW.DE / {label}
Eine offene Sammlung für digitale Arbeit.

{title}.

{intro}
```

> Hinweis: Nur der Tippfehler "fuer" → "für" wird korrigiert. Der Rest ist ein wiederverwendbarer Platzhalter.

### 5.6 Community

**Heute** (`app/community/page.tsx:6-25`):

```text
Titel: Community für digitale Arbeit | JNSW.DE

JNSW.DE / Community
Eine offene Sammlung für digitale Arbeit.

Gute Dinge
gemeinsam..

Ein Ort für Menschen, die Marken und digitale Produkte mit Haltung gestalten wollen.
```

**Vorschlag:**

```text
Titel: Community und Bewerbungswerkstatt | JNSW.DE

JNSW.DE / Community
Konto und Bewerbungswerkstatt.

Gute Dinge
gemeinsam..

Hier entsteht der Community-Bereich von JNSW.DE. Mit einem aktiven Konto erreichst du die Bewerbungswerkstatt.
```

#### CommunityAccount – sichtbare Texte

**Heute** (`app/community/CommunityAccount.tsx:57-118`):

```text
Konto
Konto pausiert.
Dein Konto ist derzeit nicht aktiv. Schreib uns an hello@jnsw.de.

Mitgliedschaft
Willkommen, {displayName}.
Dein Konto ist aktiv. Organisiere deine Bewerbungen in einer privaten Arbeitsfläche.
[Bewerbungswerkstatt öffnen]
[Abmelden]

Mitgliedschaft
E-Mail bestätigen.
Wir haben dir einen Link gesendet. Prüfe auch deinen Spam-Ordner – der Link ist 24 Stunden gültig.
[Bestätigungslink erneut senden]
[Zur Anmeldung]

Mitgliedschaft
Komm dazu.
Mit einem Konto kannst du künftig Community-Angebote nutzen.
[Konto erstellen]
[Anmelden]
```

**Vorschlag:**

```text
Konto
Konto pausiert.
Dein Konto ist derzeit nicht aktiv. Schreib mir an hello@jnsw.de.

Mitgliedschaft
Willkommen, {displayName}.
Dein Konto ist aktiv. Öffne die Bewerbungswerkstatt, um Bewerbungen und Stellenanzeigen zu organisieren.
[Bewerbungswerkstatt öffnen]
[Abmelden]

Mitgliedschaft
E-Mail bestätigen.
Du bekommst einen Link per E-Mail. Prüfe auch deinen Spam-Ordner – der Link ist 24 Stunden gültig.
[Bestätigungslink erneut senden]
[Zur Anmeldung]

Mitgliedschaft
Komm dazu.
Mit einem Konto erreichst du die Bewerbungswerkstatt.
[Konto erstellen]
[Anmelden]
```

> Hinweis: „uns“ und „wir“ entfallen zugunsten der Ich-Form. Nur Wortlaut, keine Änderung an Props oder Abläufen.

#### Bewerbungswerkstatt

**Heute** (`app/community/bewerbungswerkstatt/page.tsx:6`):

```text
Ohne Anmeldung: redirect("/community")
```

**Vorschlag:** (Einbauort ist die Community-Seite; die Route selbst leitet nur um)

```text
Bewerbungswerkstatt – nur mit aktivem Konto erreichbar.
Job-Import über Cloudflare Workers AI.
```

> Hinweis: Der redirect bleibt technisch bestehen. Öffentlich kommuniziert wird: "Nur mit Konto; KI-Import über Cloudflare Workers AI." Nichts zur Aufbewahrung oder zum Funktionsstatus wird behauptet.

### 5.7 Navigation

**Heute** (`app/SiteNav.tsx:8-10`, `app/SiteNav.tsx:43`, `app/SiteNav.tsx:71`):

```text
Links: Tools, Informationen, Community
Wordmark: JNSW.DE
Aside: Verfügbar für ausgewählte Projekte
```

**Vorschlag:**

```text
Links in dieser Reihenfolge:
1. Projekte (id=projekte)
2. Tools (id=tools)
3. Informationen (id=informationen)
4. Community (id=community)

Wordmark: JNSW.DE (unverändert, führt zu id=top)
Aside: Persönliche Projektplattform
```

> Hinweis: Die Navigation wird um "Projekte" erweitert. Die Startseite erhält einen Anker "Projekte" zwischen Hero und Tools. "Verfügbar für ausgewählte Projekte" wird neutraler, da nicht belegt ist, für welche Projekte ich verfügbar bin.

### 5.8 Footer

**Heute** (`app/page.tsx:91-98`):

```text
© 2026 JNSW.DE
Produkte, Werkzeuge, Informationen
hello@jnsw.de
GitHub
```

**Vorschlag:**

```text
© 2026 JNSW.DE
Persönliche Projektplattform
hello@jnsw.de
GitHub
```

> Hinweis: Die Hero-Fußzeile (`app/page.tsx:44-51`) bleibt unverändert. Beide GitHub-Links zeigen heute auf `jnswde-ctrl`, das Repo liegt unter `jnswde-code`; bei der Umsetzung klären, welches Ziel gelten soll.

### 5.9 Globale Metadaten

**Heute** (`app/layout.tsx:9-12`):

```text
Titel: JNSW.DE — Digital products & identities
Description: JNSW.DE gestaltet Marken und digitale Erlebnisse für Menschen, die etwas vorhaben.
Open Graph: JNSW.DE — Digital products & identities, /og.png
Twitter: summary_large_image, /og.png
```

**Vorschlag:**

```text
Titel: JNSW.DE — Persönliche Projektplattform
Description: Meine digitalen Werkzeuge, Case Studies und Hintergründe zu KI-gestützter Entwicklung.
Open Graph: JNSW.DE — Persönliche Projektplattform, /og.png
Twitter: summary_large_image, /og.png
```

### 5.10 Lokale Metadaten

#### Startseite `/`

**Heute** (`app/page.tsx:8-10`):

```text
Titel: Digitale Produkte, Tools und Dokumentation | JNSW.DE
Description: JNSW.DE entwickelt nützliche digitale Tools und dokumentiert Entscheidungen zu Produkten, Gestaltung und Umsetzung.
```

**Vorschlag:**

```text
Titel: Persönliche Projektplattform | JNSW.DE
Description: Übersicht meiner digitalen Werkzeuge, Case Studies und Hintergründe zur Entwicklung.
```

#### Tools `/tools`

**Heute** (`app/tools/page.tsx:5-9`):

```text
Titel: Digitale Tools für klare Aufgaben | JNSW.DE
Description: Kostenlose, datensparsame Werkzeuge für konkrete digitale Aufgaben – direkt im Browser und ohne unnötige Konten.
```

**Vorschlag:**

```text
Titel: Tools für konkrete Aufgaben | JNSW.DE
Description: Meine digitalen Werkzeuge: PDF-Werkbank, Prototypen und Support-KI mit Konto.
```

#### Projekte `/projekte`

**Heute** (`app/projekte/page.tsx:6-10`):

```text
Titel: Projekte und Case Studies | JNSW.DE
Description: Case Studies von JNSW.DE zeigen Problem, Entscheidung und Umsetzung hinter digitalen Produkten und Werkzeugen.
```

**Vorschlag:**

```text
Titel: Projekte und Case Studies | JNSW.DE
Description: Meine Case Studies zu digitalen Werkzeugen – mit Problem, Entscheidung und aktuellem Stand.
```

#### Informationen `/informationen`

**Heute** (`app/informationen/page.tsx:5-9`):

```text
Titel: Informationen zu digitalen Produkten | JNSW.DE
Description: Offene Notizen und Entscheidungen von JNSW.DE zu digitalen Produkten, Werkzeugen und ihrer Umsetzung.
```

**Vorschlag:**

```text
Titel: Informationen und Hintergründe | JNSW.DE
Description: Hintergründe zu den Projekten auf JNSW.DE, bisher als Case Study zur PDF-Werkbank.
```

#### Community `/community`

**Heute** (`app/community/page.tsx:6-8`):

```text
Titel: Community für digitale Arbeit | JNSW.DE
```

**Vorschlag:**

```text
Titel: Community und Bewerbungswerkstatt | JNSW.DE
Description: Konto anlegen und die Bewerbungswerkstatt erreichen.
```

#### PDF-Werkbank und Case Study

**Heute** (`app/tools/pdf-zusammenfuegen/page.tsx:6-8`, `app/projekte/pdf-tool/page.tsx:6-7`).

**Vorschlag:** unverändert, die Aussagen „lokal“, „ohne Upload“ und „ohne Konto“ sind im Inventar belegt.

#### jw-dev `/projekte/jw-dev` (geplante Route)

**Heute:** Route liefert HTTP 404; keine Metadaten vorhanden.

**Vorschlag:**

```text
Titel: jw-dev – Dienst und Dashboard für parallele Claude-Sessions | JNSW.DE
Description: Wie ich parallele Claude-Sessions organisiere und nachvollziehbar mache.
```

> Hinweis: Beschreibung und Titel bleiben so allgemein wie die vorliegenden Belege. Der Nutzer muss den Entwurf bestätigen, bevor die Route veröffentlicht wird.

### 5.11 Startseite: Teaser Tools und Informationen

**Heute** (`app/page.tsx:56-61`, `app/page.tsx:73-81`):

```text
01 / Tools
Werkzeuge, die einfach bleiben.
Für klare Aufgaben, lokal im Browser und ohne unnötige Umwege.

02 / Informationen
Was wir bauen, verständlich machen.
Notizen und Entscheidungen zu digitalen Produkten, Werkzeugen und ihrer Umsetzung folgen hier als offene Dokumentation.
```

**Vorschlag:**

```text
02 / Tools
Werkzeuge für klare Aufgaben.
Eine PDF-Werkbank, die lokal im Browser arbeitet, dazu zwei Prototypen und eine Support-KI mit Konto.

03 / Informationen
Was ich baue, verständlich machen.
Hintergründe zu Entscheidung und Umsetzung stehen bisher in der Case Study zur PDF-Werkbank.
→ /projekte/pdf-tool
```

### 5.12 Projektübersicht `/projekte`

**Heute** (`app/projekte/page.tsx:18-25`, `app/projekte/page.tsx:30`, `app/projekte/page.tsx:38-42`):

```text
JNSW.DE / PROJEKTE
Produkte,
klar erklärt.
Case Studies zeigen Problem, Entscheidung und Umsetzung – nicht nur das Ergebnis.

01 / VERÖFFENTLICHT
Case Study 01 · 2026 · PDF-Werkbank
```

**Vorschlag:**

```text
JNSW.DE / PROJEKTE
Projekte,
klar erklärt.
Case Studies zeigen Problem, Entscheidung und Umsetzung – nicht nur das Ergebnis.

01 / VERÖFFENTLICHT
Case Study 01 · 2026 · PDF-Werkbank
PDFs verbinden, umbenennen und als ZIP bündeln, lokal im Browser und ohne Konto.

Case Study 02 · jw-dev (nur nach Entscheidung in Abschnitt 7)
Dienst und Dashboard für parallele Claude-Sessions.
```

## 6. Fallstudie jw-dev (Entwurf)

> Status: Entwurf – vom Nutzer zu bestätigen, bevor die Route `/projekte/jw-dev` veröffentlicht wird.

### Problem

Bei der KI-gestützten Entwicklung entstehen viele parallele Gespräche und Arbeitsschritte. Ohne Übersicht wiederholen sich Fragen und Entscheidungen; der Kontext geht verloren.

### Nutzen

jw-dev soll als Dienst und Dashboard parallele Claude-Sessions nachvollziehbar machen. Ziel ist es, laufende und abgeschlossene Entwicklungsschritte zu strukturieren und wiederaufzufinden.

### Arbeitsweise (allgemein)

Die Arbeitsweise bleibt bewusst allgemein und steht unter dem Vorbehalt der Bestätigung:

- **Wellen:** Entwicklungsaufgaben werden in überschaubare Schritte (Wellen) aufgeteilt, damit einzelne Ergebnisse geprüft und dokumentiert werden können.
- **Dashboard:** Ein zentrales Dashboard zeigt den aktuellen Stand der parallelen Sessions und bereits abgeschlossener Wellen.
- **Entscheidungen und Prüfungen:** Offene Entscheidungen werden gebündelt, Änderungen werden vor dem Übernehmen geprüft.

### Belegter Stand

- `/projekte/jw-dev` liefert derzeit HTTP 404 (`docs/inhaltsinventar.md`).
- Das Repo `jnswde-code/jw-dev` ist privat.
- Die CLI-Beschreibung lautet "Dienst und Dashboard für parallele Claude-Sessions" (Orga-Klärung, kein Code-Beleg in diesem Repo).

### Grenzen

- Es gibt keine öffentliche Projektseite, keinen öffentlichen Dashboard-Zugang und keinen öffentlichen Link.
- Konto, Datenverarbeitung, Hosting-Ort und technische Details sind unbelegt.
- Keine Zahlen, keine Kunden, keine Produktversprechen.

### Nächster Schritt

Diesen Entwurf der Fallstudie dem Nutzer vorlegen. Erst nach Freigabe wird die Route `/projekte/jw-dev` angelegt und verlinkt.

## 7. Entscheidungen für den Nutzer

| Frage                                                                             | Möglichkeiten                                                                                                                                                                                   | Empfehlung                                                                                                                                                      |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Soll JNSW.DE persönlich oder neutral sprechen?**                                | A) Ich-Form: „Ich baue …“ B) Neutrale Plattform-Form: „JNSW.DE zeigt …“                                                                                                                         | **A) Ich-Form**: Sie passt zur persönlichen Projektplattform und vermeidet Agenturbehauptungen.                                                                 |
| **Welche belegten Projekte werden als Projekte gezeigt?**                         | A) Nur PDF-Werkbank. B) PDF-Werkbank und jw-dev. C) Alle sieben Einträge, auch ohne eigene Route.                                                                                               | **B)**: jw-dev soll als Praxisprojekt sichtbar werden, die Karte erscheint aber erst mit bestätigter Fallstudie. Prototypen und Support-KI bleiben unter Tools. |
| **Welche öffentlichen Belege gibt es für jw-dev?**                                | A) Keine, die Fallstudie beschreibt nur die Arbeitsweise. B) Die CLI-Beschreibung als Selbstbeschreibung. C) Zusätzlicher öffentlicher Beleg, den du bereitstellst (ohne echte Dashboarddaten). | **B)**: Mehr ist heute nicht öffentlich belegt. C ist möglich, wenn du einen Beleg freigibst.                                                                   |
| **Wie wird die Support-KI mit der Bezeichnung SimpliSan öffentlich beschrieben?** | A) „Support-KI / SimpliSan“ mit LiveKit- und Konto-Hinweis. B) „Support-KI“ ohne den Namen, mit LiveKit- und Konto-Hinweis. C) Bis zur Klärung gar nicht zeigen.                                | **B)**, bis das Verhältnis zu SimpliSan bestätigt ist; mit Bestätigung A. Die Texte in Abschnitt 5.4 folgen B.                                                  |

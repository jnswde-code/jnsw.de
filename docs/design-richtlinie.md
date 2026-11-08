# Design-Richtlinie: Scroll Platform in zwei Farbschemata

## Zielbild

JNSW.DE ist eine zusammenhängende Produktoberfläche mit zwei Farbschemata. Das dunkle Schema ist die gestalterische Referenz: tiefschwarzer Grund, leicht angehobene dunkle Arbeitsflächen, feine Linien, klare Typografie und gezielt eingesetzte Akzentfarben. Das helle Schema übersetzt dieselbe Hierarchie auf warmes Papier; es ist kein eigenes Design, sondern ein zweiter Wertesatz für dieselben Tokens. Innerhalb eines Schemas werden keine gegensätzlichen Inhaltsflächen gemischt: im Dunklen keine hellen Vollflächen, im Hellen keine dunklen.

## Farbschemata

- Ohne Nutzerwahl folgt die Seite `prefers-color-scheme`. Der Umschalter in der Navigation (System / Hell / Dunkel) setzt `data-theme="hell|dunkel"` am `<html>` und merkt sich die Wahl in `localStorage`; „System“ löscht den Eintrag.
- Ein Inline-Skript im `<head>` (`app/theme.ts`) setzt `data-theme` vor dem ersten Rendern, damit kein falsches Schema aufblitzt. Ohne JavaScript gilt das System-Schema. Ohne Speicher startet die Seite im System-Schema; eine danach gewählte Einstellung gilt für die laufende Seite.
- `color-scheme` steht auf `:root`, damit Formularelemente und Scrollleisten zum Schema passen. Die Tokens werden über `light-dark()` aufgelöst; Browser ohne `light-dark()` erhalten den dunklen Wertesatz.
- Neue Farben werden als Paar ergänzt: `--dunkel-<name>`, `--hell-<name>` und das semantische Token `--<name>` in `app/globals.css`. Komponenten verwenden ausschließlich semantische Tokens, nie Rohwerte.
- Kontrast mindestens WCAG AA (4,5:1) in beiden Schemata; das ist eine Anforderung an Design und Umsetzung, kein automatisch gemessener Ist-Wert. Akzentfarben als Text oder Rahmen verwenden `--acid-text` und `--blue`, die im Hellen dunkler aufgelöst werden; `--acid` bleibt die Fläche primärer Aktionen mit `--on-acid` als Textfarbe.

Die öffentliche Startseite ist eine ruhige Scroll-Plattform, keine Sammlung aneinandergeklebter Landing Pages. Projekte, Tools, Informationen und Community folgen einer logischen Erzählung und bleiben Teil derselben visuellen Landschaft.

## Navigation und Bewegung

- Das Hauptmenü ist fest sichtbar und navigiert auf der Startseite ausschließlich zu Abschnittsankern.
- Menü-Klicks verwenden Smooth-Scroll; sie dürfen keinen Seitenwechsel auslösen.
- Der sichtbare Abschnitt wird im Menü markiert. Die Markierung ist Orientierung, keine dekorative Animation.
- Jeder Abschnitt erhält `scroll-margin-top`, damit der feste Header keine Überschriften verdeckt.
- Bewegungen bleiben kurz und funktional. `prefers-reduced-motion: reduce` schaltet alle Bewegungen ab, einschließlich Smooth-Scroll, Hover-Skalierung und Zeigerfolger.
- Der Zeigerfolger (`app/CursorGlow.tsx`) ist rein dekorativ: `pointer-events: none`, nur bei `(hover: hover) and (pointer: fine)`, nie auf Touch-Geräten. Er verdeckt nichts und darf keine Klicks abfangen.
- Hover darf Flächen minimal skalieren oder anheben (Skalierung höchstens 1,02), ebenfalls nur bei feinem Zeiger. Verwendete Skalierungen liegen darunter, derzeit etwa 1,015.
- Detailseiten sind für direkte Links und vertiefende Inhalte erlaubt, gehören aber nicht in die primäre Plattformnavigation.

## Farb- und Flächenhierarchie

Die Werte gelten für das dunkle Referenzschema; das helle Schema spiegelt die Hierarchie (hell: `--ink` `#f4f0e7`, `--surface` `#ece7db`, `--surface-raised` `#fbfaf6`, `--paper` `#0b0b0e`, `--blue` `#2340d6`, `--acid` `#a9f24f`, `--acid-text` `#3a6600`).

- `--ink` (`#08080a`) ist die Grundebene für Seitenhintergründe und Hero-Bereiche.
- `--surface` (`#0d0d10`) ist die reguläre Inhaltsfläche für Abschnitte, Formulare und Fallstudien.
- `--surface-raised` (`#15151a`) ist ausschließlich für Eingabefelder und abgegrenzte interaktive Teilflächen vorgesehen.
- `--paper` (`#f4f0e7`) ist die Textfarbe. Abstufungen: `--text-strong`, `--muted`, `--text-soft`, `--text-faint`, alle müssen auf `--ink` mindestens 4,5:1 erreichen.
- `--blue` (`#3157ff`) kennzeichnet Navigation, Fokus und räumliche Tiefe. Es ist keine Standardfläche.
- `--acid` (`#b8ff62`) markiert die Fläche der primären Aktion; Text darauf ist `--on-acid`. Als Text- oder Rahmenfarbe für aktive Zustände und Statussignale gilt `--acid-text`. Acid wird nicht als große Inhaltsfläche eingesetzt.
- `--line` ist die Standardlinie zwischen Bereichen und in Komponenten, `--line-strong` der Rahmen von Dialogen und Ablageflächen.
- Glasflächen (fester Header, Dialoghintergründe) verwenden `--glass-top`, `--glass-bottom`, `--glass-line`, `--glass-blur` und `--overlay`. Im Hellen sind sie deckender, mit sichtbarem Rand und weniger Unschärfe, damit der Effekt nicht matschig wirkt.
- Farbverläufe und Lichtflecken nutzen `--glow`, `--glow-soft`, `--glow-faint` und `--glow-acid`; Varianten von Karten `--tint-blue` und `--tint-green`; Fehler `--danger`, `--danger-text`, `--danger-line`, `--danger-wash`.

## Fließende Plattformfläche

- Die gesamte Scroll-Plattform erhält je Farbschema einen gemeinsamen Grund aus `--ink` mit subtilen radialen oder linearen Verläufen.
- Abschnitte setzen sich über Abstand, Typografie und feine Linien ab, nicht über harte Hintergrundwechsel.
- Farbverläufe schaffen Tiefe, dürfen die Lesbarkeit aber nicht beeinträchtigen oder wie separate Seiten wirken.
- Karten bleiben auf der Grundebene. Varianten entstehen durch `--tint-blue` und `--tint-green`, nicht durch gegensätzliche Vollflächen.

## Komponentenregeln

- Abgetrennte Arbeitsbereiche folgen dem PDF-Dialog: `--surface`, 1px `--line`, zurückhaltender Schatten nur bei Overlays.
- Formulare verwenden dunkle Felder auf `--surface-raised`, helle Schrift und `--line` als Rahmen.
- Primäre Buttons sind acidfarben mit dunklem Text. Sekundäre Buttons bleiben transparent, mit `--line`-Rahmen und heller Schrift.
- Hover darf eine Oberfläche leicht aufhellen oder mit Acid hervorheben. Fokus ist immer deutlich über den blauen Fokusrahmen sichtbar.

## Mobile Tool-Arbeitsflächen

- Mobile-first: bis 479 px beträgt der seitliche Inhaltsabstand mindestens 20 px, ab 480 px 24 px und ab 768 px 32 px. Safe Areas ergänzen diese Abstände mit `env(safe-area-inset-*)`.
- Header, Workflow und Formularbereiche haben auf Mobilgeräten keine feste Höhe. Für viewportabhängige Flächen `svh` oder `dvh`, nie unkompensiertes `100vh`, verwenden.
- Sticky ist nur für den Arbeitsflächen-Header erlaubt. Stepper, Formularaktionen und vergleichbare Inhalte stehen im normalen Dokumentfluss und dürfen nie Überschriften oder Eingaben überdecken.
- Mobile Stepper bestehen aus drei gleich breiten Spalten mit sichtbaren Nummern und lesbaren Labels. Labels dürfen bei Platzmangel gekürzt werden, der aktuelle Schritt muss zusätzlich über `aria-current="step"` erkennbar sein.
- Workflow-Überschriften verwenden auf Mobilgeräten kontrollierte Größen: maximal `10ch`, `font-size: clamp(2.75rem, 13vw, 4rem)`, `line-height: 0.92`, `letter-spacing: -0.055em` und `text-wrap: balance`. Lange Hero-Titel dürfen keinen horizontalen Überlauf erzeugen.
- Uploadflächen sind vollständig anklickbar, mindestens 44 px hoch und auf Mobilgeräten kompakt: zweispaltig mit Icon und Text, `min-height: 152px`, `padding: 24px`. Unter sehr schmalen Breiten darf die Darstellung einspaltig werden.
- Primäre, deaktivierte Aktionen zeigen einen erklärbaren Zustand: gedämpfte, aber klar als deaktiviert erkennbare Fläche sowie ein sichtbarer Hinweis auf die noch fehlende Voraussetzung. Inaktive Fortschrittsschritte bleiben lesbar; Status dürfen nicht nur über Farbe vermittelt werden.
- Interaktive Ziele sind mindestens 44 × 44 px. Fokus wird ausschließlich mit `:focus-visible` deutlich über `--blue` dargestellt und nie ersatzlos entfernt.

## Typografie und Lesbarkeit

- Manrope ist die Lesetypografie, DM Mono ist für Navigation, Metadaten und Bedienelemente reserviert, Georgia nur für sparsame editoriale Kursivakzente.
- Fließtext auf dunklem Grund nutzt `--paper` oder `--muted`; nie dunklen Text auf dunklen Flächen.
- Kontrast und sichtbare Tastaturfokusse haben Vorrang vor rein dekorativer Gestaltung.

## Umsetzung und Review

- Vor einer neuen Oberfläche zuerst vorhandene Klassen, Tokens und das PDF-Dialogmuster wiederverwenden.
- Neue Farbwerte nur als Token ergänzen; keine mehrfach kopierten Hexwerte in Komponenten.
- Im Review beide Farbschemata prüfen: Gibt es einen Rohfarbwert statt eines Tokens? Fällt eine Fläche im anderen Schema aus der Hierarchie? Wirkt ein Abschnitt wie eine abgetrennte Seite? Bleibt das Menü beim Scrollen verständlich? Sind Hover-, Fokus- und Fehlermeldungszustände in beiden Farbschemata lesbar? Überdeckt auf 375 oder 390 px Breite kein Sticky-Element den Inhalt, und entsteht kein horizontaler Überlauf?

# Bauplan der ersten Welle

Dieser Plan beschreibt den Stand der ersten Welle knapp. Die bestehende Next.js-/vinext-Struktur,
die Datenbank samt Migrationen, der Cloudflare-Worker und die Hostingkonfiguration bleiben
unverändert; es kommt kein zweites Framework hinzu.

## Umfang

| Route            | Datei                      | Verantwortung                                                   |
| ---------------- | -------------------------- | --------------------------------------------------------------- |
| `/`              | `app/page.tsx`             | Landingpage, bestehend und dynamisch über Sitzung und Community |
| `/impressum`     | `app/impressum/page.tsx`   | Rechtsseite als Entwurf, zustandslose Serverkomponente          |
| `/datenschutz`   | `app/datenschutz/page.tsx` | Rechtsseite als Entwurf, zustandslose Serverkomponente          |
| gemeinsame Hülle | `app/LegalPage.tsx`        | Überschrift, Entwurfhinweis und Navigation ohne Client-Routing  |

Die Rechtsseiten greifen nicht auf das Backend zu und setzen `noindex`. Ein statischer
Gesamtexport der Anwendung ist nicht eingerichtet.

| Prüfung                     | Datei                        |
| --------------------------- | ---------------------------- |
| Unit-Tests der Rechtsseiten | `tests/legal-pages.test.ts`  |
| Unit-Tests ohne Build       | `package.json` (`test:unit`) |
| Tests mit vorherigem Build  | `package.json` (`test`)      |
| Qualitätsworkflow           | `.github/workflows/ci.yml`   |

## Erweiterung

Weitere Seiten entstehen über den vorhandenen App Router; gemeinsame Elemente werden als kleine
gemeinsame Komponenten wie `app/LegalPage.tsx` ergänzt. Bestehende DB-, Worker- und
Hostingarchitektur bleiben erhalten.

## Offene Angaben vor Veröffentlichung

Betreiber, Anschrift und Kontakt sind zu bestätigen. Tatsächliche Verarbeitungen,
Rechtsgrundlagen, Fristen, Empfänger, Übermittlungen und Betroffenenrechte müssen ausgearbeitet
sein. `noindex` ersetzt keine Inhaltsprüfung.

## Status

- 41 Tests grün unter lokalem Node 24 und in der GitHub-CI unter Node 22.
- YAML-Prüfung, Lint, Format und Build grün.
- Der zusätzliche TypeScript-Gesamtcheck meldet bestehende Fehler; gegenüber der Basis sind
  keine hinzugekommen.
- Google-Zweitprüfung scheiterte mit HTTP 402; keine Guthaben- oder Anbieteränderung, Prüfung
  bleibt ausstehend.
- Browser-Sichtprüfung mangels Browserwerkzeug nicht erfolgt.
- Nur Entwurf-PRs; kein Merge, Deploy oder Neustart.

import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "../../SiteNav";

export const metadata: Metadata = {
  title: "jw-dev – Dienst und Dashboard für parallele Claude-Sessions | JNSW.DE",
  description: "Wie ich parallele Claude-Sessions organisiere und nachvollziehbar mache.",
};

const parts = [
  [
    "Problem",
    "Bei der KI-gestützten Entwicklung entstehen viele parallele Gespräche und Arbeitsschritte. Ohne Übersicht wiederholen sich Fragen und Entscheidungen; der Kontext geht verloren.",
  ],
  [
    "Nutzen",
    "Mit jw-dev will ich parallele Claude-Sessions nachvollziehbar machen. Mein Ziel ist es, laufende und abgeschlossene Entwicklungsschritte zu strukturieren und wiederzufinden.",
  ],
  [
    "Arbeitsweise",
    "Ich teile Entwicklungsaufgaben in überschaubare Schritte und bündele sie in Wellen. Ein Dashboard zeigt den Stand der parallelen Sessions und abgeschlossener Wellen. Offene Entscheidungen fasse ich zusammen; Änderungen prüfe ich vor dem Übernehmen.",
  ],
  [
    "Belegter Stand",
    "Die Selbstbeschreibung von jw-dev lautet: „Dienst und Dashboard für parallele Claude-Sessions“. Diese Fallstudie beschreibt meine Arbeitsweise allgemein. Das Repository ist privat; einen öffentlichen Code-Beleg stelle ich hier nicht bereit.",
  ],
  [
    "Grenzen",
    "Ich biete hier keinen öffentlichen Dashboard-Zugang an. Konto, Datenverarbeitung und Hosting-Ort von jw-dev sind in dieser Fallstudie nicht belegt. Daraus ergibt sich kein Versprechen zu Verfügbarkeit oder Zugang.",
  ],
];

export default function JwDevCaseStudy() {
  return (
    <main className="case-study">
      <section className="case-study-hero">
        <SiteNav />
        <div className="case-study-grid">
          <p className="eyebrow">JNSW.DE / PROJEKTE / 02</p>
          <h1>jw-dev</h1>
          <div className="case-study-intro">
            <p>Dienst und Dashboard für parallele Claude-Sessions.</p>
            <Link className="button button-primary" href="/projekte">
              Projektübersicht →
            </Link>
          </div>
        </div>
      </section>
      <section className="case-study-body">
        <p className="eyebrow">ENTWICKLUNG NACHVOLLZIEHBAR MACHEN</p>
        <div className="case-study-summary">
          <p>
            Wie ich KI-gestützte Entwicklung organisiere, Entscheidungen bündele und Änderungen
            prüfe.
          </p>
          <dl>
            <div>
              <dt>Projekt</dt>
              <dd>Eigene Entwicklungsarbeit</dd>
            </div>
            <div>
              <dt>Zugang</dt>
              <dd>Kein öffentliches Dashboard</dd>
            </div>
          </dl>
        </div>
        <div className="case-study-sections">
          {parts.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </article>
          ))}
          <article>
            <span>06</span>
            <div>
              <h2>Nächster Schritt</h2>
              <p>
                Weitere Projekte und ihre Hintergründe findest du in der{" "}
                <Link href="/projekte">Projektübersicht</Link>.
              </p>
            </div>
          </article>
        </div>
      </section>
      <footer className="site-footer">
        <span>© 2026 JNSW.DE</span>
        <span>Case Study 02</span>
        <Link className="button" href="/projekte">
          Alle Projekte →
        </Link>
      </footer>
    </main>
  );
}

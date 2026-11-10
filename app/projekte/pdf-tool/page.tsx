import type { Metadata } from "next";
import { SiteNav } from "../../SiteNav";
import { PdfToolLauncher } from "../../tools/PdfToolLauncher";

export const metadata: Metadata = {
  title: "PDF-Werkbank: Case Study | JNSW.DE",
  description:
    "Die Case Study zur PDF-Werkbank erklärt, wie ein lokales PDF-Tool ohne Upload, Konto und Serververarbeitung entsteht.",
};

const parts = [
  [
    "Problem",
    "Ich will mehrere PDF-Dateien zu einem durchgängigen Dokument verbinden, einzeln umbenennen oder als ZIP bündeln können – ohne dafür einen externen Dienst zu nutzen.",
  ],
  [
    "Nutzen",
    "Die wichtigsten PDF-Grundoperationen lassen sich lokal im Browser erledigen. Dateien müssen nicht hochgeladen werden und es ist kein Konto nötig.",
  ],
  [
    "Belegter Stand",
    "Die PDF-Werkbank hat einen eigenen Einstieg und diese Case Study. Sie ist im Werkzeugkasten nicht als Prototyp gekennzeichnet.",
  ],
  [
    "Grenzen",
    "Die Funktion im Browser wurde nicht live geprüft; ein Betriebsstatus ist daher unbelegt.",
  ],
  [
    "Nächster Schritt",
    "Öffne die PDF-Werkbank über den Button auf dieser Seite. Dort kannst du zwischen Verbinden und Umbenennen wählen.",
  ],
];

export default function PdfToolCaseStudy() {
  return (
    <main className="case-study">
      <section className="case-study-hero">
        <SiteNav />
        <div className="case-study-grid">
          <p className="eyebrow">JNSW.DE / PROJEKTE / 01</p>
          <h1>
            Eine PDF-Werkbank,
            <br />
            die <em>nicht</em> hochlädt.
          </h1>
          <div className="case-study-intro">
            <p>Case Study · Problem, Nutzen und Stand</p>
            <PdfToolLauncher className="button button-primary" label="Tool ausprobieren →" />
          </div>
        </div>
      </section>
      <section className="case-study-body">
        <p className="eyebrow">ENTSCHEIDUNGEN SICHTBAR MACHEN</p>
        <div className="case-study-summary">
          <p>
            Ein kleines Werkzeug ist dann gut, wenn es eine konkrete Aufgabe zuverlässig erledigt
            und seine Versprechen verständlich macht.
          </p>
          <dl>
            <div>
              <dt>Verarbeitung</dt>
              <dd>Lokal im Browser</dd>
            </div>
            <div>
              <dt>Übertragung</dt>
              <dd>Keine</dd>
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
        </div>
      </section>
      <footer className="site-footer">
        <span>© 2026 JNSW.DE</span>
        <span>Case Study 01</span>
        <PdfToolLauncher className="button" label="PDF-Werkbank öffnen" />
      </footer>
    </main>
  );
}

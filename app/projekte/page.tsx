import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "../SiteNav";
import { PdfToolLauncher } from "../tools/PdfToolLauncher";

export const metadata: Metadata = {
  title: "Projekte und Case Studies | JNSW.DE",
  description:
    "Meine Case Studies zu digitalen Werkzeugen – mit Problem, Entscheidung und aktuellem Stand.",
};

export default function ProjectsPage() {
  return (
    <main className="case-study">
      <section className="case-study-hero">
        <SiteNav />
        <div className="case-study-grid">
          <p className="eyebrow">JNSW.DE / PROJEKTE</p>
          <h1>
            Projekte,
            <br />
            <em>klar erklärt.</em>
          </h1>
          <div className="case-study-intro">
            <p>Case Studies zeigen Problem, Entscheidung und Umsetzung – nicht nur das Ergebnis.</p>
          </div>
        </div>
      </section>
      <section className="case-study-body">
        <p className="eyebrow">01 / VERÖFFENTLICHT</p>
        <div className="projects">
          <Link className="project green" href="/projekte/pdf-tool">
            <span className="project-art" aria-hidden="true">
              <i className="shape-a" />
              <i className="shape-b" />
            </span>
            <span className="project-meta">
              <span>Case Study 01</span>
              <span>2026</span>
            </span>
            <span className="project-name">
              <h2>PDF-Werkbank</h2>
              <span aria-hidden="true">→</span>
            </span>
          </Link>
          <Link className="project blue" href="/projekte/jw-dev">
            <span className="project-art" aria-hidden="true">
              <i className="shape-a" />
              <i className="shape-b" />
            </span>
            <span className="project-meta">
              <span>Case Study 02</span>
              <span>jw-dev</span>
            </span>
            <span className="project-name">
              <h2>jw-dev</h2>
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
        <div className="project-tool-cta">
          <p className="eyebrow">DAS WERKZEUG DAHINTER</p>
          <h2>PDF-Werkbank ausprobieren.</h2>
          <p>PDFs verbinden, umbenennen und als ZIP bündeln – lokal im Browser und ohne Konto.</p>
          <PdfToolLauncher className="button button-primary" />
        </div>
      </section>
    </main>
  );
}

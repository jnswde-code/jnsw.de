import type { Metadata } from "next";
import Link from "next/link";
import { requireAppUser } from "./auth";
import { CommunityAccount } from "./community/CommunityAccount";
import { SiteNav } from "./SiteNav";
import { ToolsExperience } from "./tools/ToolsExperience";

export const metadata: Metadata = {
  title: "Persönliche Projektplattform | JNSW.DE",
  description:
    "Übersicht meiner digitalen Werkzeuge, Case Studies und Hintergründe zur Entwicklung.",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await requireAppUser();

  return (
    <main className="scroll-platform">
      <header className="site-header">
        <SiteNav />
      </header>
      <section className="hero" id="top">
        <div className="hero-grid">
          <p className="eyebrow">
            JNSW.DE / Persönliche Projektplattform
            <br />
            Digitale Werkzeuge und KI-gestützte Entwicklung
          </p>
          <h1>
            Kleine Werkzeuge.
            <br />
            Klar <em>erklärt.</em>
            <span>.</span>
          </h1>
          <div className="hero-note">
            <p>
              Ich baue digitale Werkzeuge für konkrete Aufgaben und dokumentiere die Entscheidungen
              dabei nachvollziehbar.
            </p>
            <a href="#tools">Tools ansehen →</a>
          </div>
        </div>
        <div className="hero-footer">
          <span>© 2026 JNSW.DE</span>
          <span>Berlin / Germany</span>
          <a href="mailto:hello@jnsw.de">hello@jnsw.de</a>
          <a href="https://github.com/jnswde-ctrl" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </section>

      <section
        className="platform-section platform-tools"
        id="projekte"
        aria-labelledby="projects-title"
      >
        <div className="platform-heading">
          <p className="eyebrow">01 / Projekte</p>
          <div>
            <h2 id="projects-title">
              Projekte, die ich <em>baue.</em>
            </h2>
            <p>Werkzeuge und Case Studies mit Problem, Nutzen und belegtem Stand.</p>
          </div>
        </div>
        <div className="projects">
          <Link className="project green" href="/projekte/pdf-tool">
            <span className="project-meta">
              <span>Case Study 01</span>
              <span>2026</span>
            </span>
            <span className="project-name">
              <h2>PDF-Werkbank</h2>
              <span aria-hidden="true">→</span>
            </span>
            <p>PDFs verbinden, umbenennen und als ZIP bündeln, lokal im Browser und ohne Konto.</p>
          </Link>
          <Link className="project blue" href="/projekte/jw-dev">
            <span className="project-meta">
              <span>Case Study 02</span>
            </span>
            <span className="project-name">
              <h2>jw-dev</h2>
              <span aria-hidden="true">→</span>
            </span>
            <p>
              Dienst und Dashboard für parallele Claude-Sessions: wie ich KI-gestützte Entwicklung
              organisiere.
            </p>
          </Link>
        </div>
      </section>

      <section className="platform-section platform-tools" id="tools" aria-labelledby="tools-title">
        <div className="platform-heading">
          <p className="eyebrow">02 / Tools</p>
          <div>
            <h2 id="tools-title">
              Werkzeuge für <em>klare</em> Aufgaben.
            </h2>
            <p>
              Eine PDF-Werkbank, die lokal im Browser arbeitet, dazu zwei Prototypen und eine
              Support-KI mit Konto.
            </p>
          </div>
        </div>
        <ToolsExperience />
      </section>

      <section
        className="platform-section platform-information"
        id="informationen"
        aria-labelledby="information-title"
      >
        <div className="platform-heading">
          <p className="eyebrow">03 / Informationen</p>
          <div>
            <h2 id="information-title">
              Was ich baue, <em>verständlich</em> machen.
            </h2>
            <p>
              Hintergründe zu Entscheidung und Umsetzung stehen bisher in der Case Study zur
              PDF-Werkbank.
            </p>
            <Link href="/projekte/pdf-tool">Zur PDF-Fallstudie →</Link>
          </div>
        </div>
      </section>

      <section className="platform-section community-section" id="community" aria-label="Community">
        <p className="eyebrow">04 / Community</p>
        <CommunityAccount
          initialUser={user ? { displayName: user.displayName, status: user.status } : null}
        />
      </section>
      <footer className="site-footer platform-footer">
        <span>© 2026 JNSW.DE</span>
        <span>Persönliche Projektplattform</span>
        <a href="mailto:hello@jnsw.de">hello@jnsw.de</a>
        <a href="https://github.com/jnswde-ctrl" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </main>
  );
}

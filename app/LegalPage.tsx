import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <nav className="nav" aria-label="Rechtliches">
          <div className="nav-links">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- normaler Link laut Auftrag */}
            <a href="/">Zur Startseite</a>
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
          </div>
        </nav>
        <h1>{title}</h1>
        <p>Entwurf – Angaben noch unvollständig. Nicht zur Veröffentlichung freigegeben.</p>
        <article>{children}</article>
      </section>
    </main>
  );
}

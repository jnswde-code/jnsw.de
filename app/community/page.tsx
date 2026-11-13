import type { Metadata } from "next";
import { requireAppUser } from "../auth";
import { SiteNav } from "../SiteNav";
import { CommunityAccount } from "./CommunityAccount";

export const metadata: Metadata = {
  title: "Community und Bewerbungswerkstatt | JNSW.DE",
  description: "Die Bewerbungswerkstatt mit aktivem Konto erreichen.",
};

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const user = await requireAppUser();

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <SiteNav />
        <div className="subpage-grid">
          <p className="eyebrow">
            JNSW.DE / Community
            <br />
            Konto und Bewerbungswerkstatt.
          </p>
          <h1>
            Gute Dinge
            <br />
            <em>gemeinsam.</em>
            <span>.</span>
          </h1>
          <p className="subpage-intro">
            Hier entsteht der Community-Bereich von JNSW.DE. Mit einem aktiven Konto erreichst du
            die Bewerbungswerkstatt.
          </p>
        </div>
        <div className="orbit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <footer className="subpage-footer">
          <span>© 2026 JNSW.DE</span>
          <span>Berlin / Germany</span>
          <a href="mailto:hello@jnsw.de">hello@jnsw.de</a>
        </footer>
      </section>
      <div className="community-section">
        <p>
          Bewerbungswerkstatt – nur mit aktivem Konto erreichbar. Job-Import über Cloudflare Workers
          AI.
        </p>
        <CommunityAccount
          initialUser={
            user
              ? {
                  displayName: user.displayName,
                  status: user.status,
                  emailVerifiedAt: user.emailVerifiedAt,
                }
              : null
          }
        />
      </div>
    </main>
  );
}

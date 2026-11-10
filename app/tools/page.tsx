import type { Metadata } from "next";
import { SiteNav } from "../SiteNav";
import { ToolsExperience } from "./ToolsExperience";

export const metadata: Metadata = {
  title: "Tools für konkrete Aufgaben | JNSW.DE",
  description: "Meine digitalen Werkzeuge: PDF-Werkbank, Prototypen und Support-KI mit Konto.",
};

export default function ToolsPage() {
  return (
    <main className="tools-page">
      <SiteNav />
      <div className="tools-intro">
        <p className="eyebrow">
          JNSW.DE / Tools
          <br />
          Werkzeuge für konkrete Aufgaben.
        </p>
        <h1>
          Werkzeuge
          <br />
          für <em>klare Aufgaben.</em>
          <span>.</span>
        </h1>
        <p className="tools-lead">
          Eine Übersicht meiner Werkzeuge. Manche arbeiten lokal im Browser, andere sind Prototypen
          oder erfordern ein Konto.
        </p>
      </div>
      <ToolsExperience />
    </main>
  );
}

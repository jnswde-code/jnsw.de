import type { Metadata } from "next";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = {
  title: "Datenschutz | JNSW.DE",
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz">
      <h2>Verantwortlicher und Kontakt</h2>
      <p>Angaben zum Verantwortlichen und Kontaktweg noch zu ergänzen.</p>

      <h2>Hosting und Serverprotokolle</h2>
      <p>
        Konkrete Verarbeitung durch das Hosting und Aufbewahrungsfristen von Serverprotokollen sind
        noch zu bestätigen.
      </p>

      <h2>Konten, Sitzungen und E-Mail</h2>
      <p>
        Datenkategorien, Zwecke und Löschfristen für Konten, Sitzungen und E-Mail-Kommunikation sind
        noch zu prüfen.
      </p>

      <h2>PDF-Werkzeuge</h2>
      <p>Die lokale Verarbeitung ist für jedes Werkzeug noch einzeln zu bestätigen.</p>

      <h2>Externe Dienste und Einbindungen</h2>
      <p>Tatsächlich eingesetzte Dienste sowie Empfänger und Übermittlungen sind noch zu prüfen.</p>

      <h2>Rechtsgrundlagen und Speicherdauer</h2>
      <p>Rechtsgrundlagen und Speicherdauer sind noch zu ergänzen.</p>

      <h2>Rechte und Aufsicht</h2>
      <p>
        Betroffenenrechte, Kontaktweg und zuständige Aufsichtsbehörde sind noch zu prüfen und
        vollständig auszuarbeiten.
      </p>
    </LegalPage>
  );
}

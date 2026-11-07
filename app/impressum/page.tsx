import type { Metadata } from "next";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = {
  title: "Impressum | JNSW.DE",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Betreiber</h2>
      <p>Verantwortlicher Betreiber: Name noch zu ergänzen.</p>

      <h2>Anschrift</h2>
      <p>Anschrift noch zu ergänzen.</p>

      <h2>Kontakt</h2>
      <p>Bestätigte E-Mail-Adresse noch zu ergänzen.</p>

      <h2>Weitere Pflichtangaben</h2>
      <p>Weitere Pflichtangaben werden vor Veröffentlichung geklärt, soweit sie zutreffen.</p>
    </LegalPage>
  );
}

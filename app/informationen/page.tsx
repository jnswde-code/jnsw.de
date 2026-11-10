import type { Metadata } from "next";
import Link from "next/link";
import { SectionPage } from "../SectionPage";

export const metadata: Metadata = {
  title: "Informationen und Hintergründe | JNSW.DE",
  description: "Hintergründe zu den Projekten auf JNSW.DE, bisher als Case Study zur PDF-Werkbank.",
};
export default function InformationenPage() {
  return (
    <SectionPage
      label="Informationen"
      title={
        <>
          Hintergründe,
          <br />
          die <em>mitwachsen.</em>
        </>
      }
      intro={
        <>
          Eigene Beiträge gibt es hier noch nicht. Hintergründe zu Entscheidung und Umsetzung stehen
          bisher in der <Link href="/projekte/pdf-tool">Case Study zur PDF-Werkbank</Link>.
        </>
      }
    />
  );
}

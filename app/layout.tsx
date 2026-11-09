import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./tools/tools.css";
import { CursorGlow } from "./CursorGlow";
import { themeInitScript } from "./theme";

export const metadata: Metadata = {
  metadataBase: new URL("https://jnsw.de"),
  title: "JNSW.DE — Digital products & identities",
  description: "JNSW.DE gestaltet Marken und digitale Erlebnisse für Menschen, die etwas vorhaben.",
  openGraph: { title: "JNSW.DE — Digital products & identities", images: ["/og.png"] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // `data-theme` wird vom Inline-Skript vor der Hydration gesetzt; React soll das nicht als Fehler melden.
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {children}
        <CursorGlow />
      </body>
    </html>
  );
}

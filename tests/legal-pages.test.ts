import assert from "node:assert/strict";
import test from "node:test";
import type { Metadata } from "next";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ImpressumPage, { metadata as impressumMetadata } from "../app/impressum/page";
import DatenschutzPage, { metadata as datenschutzMetadata } from "../app/datenschutz/page";

function withBlockedFetch<T>(fn: () => T): T {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (() => {
    throw new Error("fetch is disabled during legal page render");
  }) as typeof fetch;
  try {
    return fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function renderStaticHtml(Component: () => ReactElement): string {
  return withBlockedFetch(() => renderToStaticMarkup(createElement(Component)));
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function countOccurrences(html: string, pattern: RegExp): number {
  return (html.match(pattern) ?? []).length;
}

function assertRobotsNoIndex(metadata: Metadata): void {
  const { robots } = metadata;
  assert.equal(typeof robots, "object", "metadata.robots must be an object");
  assert.ok(robots !== null && robots !== undefined, "metadata.robots must be set");
  if (typeof robots !== "object" || robots === null) {
    return;
  }
  assert.equal(robots.index, false, "robots index must be false");
  assert.equal(robots.follow, false, "robots follow must be false");
}

function assertDraftLegalPage(html: string, metadata: Metadata, expectedHeading: string): string {
  assert.equal(countOccurrences(html, /<main[\s>]/g), 1, "expected exactly one <main>");
  assert.equal(countOccurrences(html, /<h1[\s>]/g), 1, "expected exactly one <h1>");

  const h1Match = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html);
  assert.ok(h1Match, "expected an <h1> element");
  assert.equal(stripTags(h1Match[1]), expectedHeading, "unexpected h1 text");

  const hrefs = new Set(
    Array.from(html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g), (match) => match[1]),
  );
  assert.ok(hrefs.has("/"), "expected link to start page");
  assert.ok(hrefs.has("/impressum"), "expected link to impressum");
  assert.ok(hrefs.has("/datenschutz"), "expected link to datenschutz");

  const text = stripTags(html);
  assert.ok(text.includes("Entwurf"), "expected visible draft notice");
  assert.ok(text.includes("unvollständig"), "expected draft notice to state incompleteness");
  assert.ok(
    text.includes("Nicht zur Veröffentlichung freigegeben"),
    "expected draft notice to be explicit about publication status",
  );
  assert.ok(
    /noch (zu (ergänzen|prüfen|bestätigen)|einzeln)/.test(text),
    "expected open placeholder wording",
  );

  assertRobotsNoIndex(metadata);
  assert.equal(typeof metadata.title, "string", "expected a page title");

  return text;
}

test("Impressum renders as a draft with open operator, address and contact details", () => {
  const html = renderStaticHtml(ImpressumPage);
  const text = assertDraftLegalPage(html, impressumMetadata, "Impressum");

  assert.ok(text.includes("Betreiber"), "expected operator information");
  assert.ok(text.includes("Anschrift"), "expected address information");
  assert.ok(text.includes("Kontakt"), "expected contact information");

  assert.ok(
    !/Impressum\s*[–-]\s*(fertig|vollständig)/i.test(text),
    "page must not claim to be a finished legal notice",
  );
});

test("Datenschutz renders as a draft with open privacy topics", () => {
  const html = renderStaticHtml(DatenschutzPage);
  const text = assertDraftLegalPage(html, datenschutzMetadata, "Datenschutz");

  assert.ok(text.includes("Hosting"), "expected hosting information");
  assert.ok(
    text.includes("Konten") || text.includes("Sitzungen"),
    "expected account/session information",
  );
  assert.ok(text.includes("Externe Dienste"), "expected external services information");
  assert.ok(text.includes("Rechtsgrundlagen"), "expected legal basis information");
  assert.ok(text.includes("Speicherdauer"), "expected storage duration information");
  assert.ok(text.includes("Rechte"), "expected data subject rights information");

  assert.ok(
    !/(datenschutzerklärung|Datenschutzerklärung)\s+(ist\s+)?(fertig|vollständig|abgeschlossen)/i.test(
      text,
    ),
    "page must not claim to be a finished privacy statement",
  );
});

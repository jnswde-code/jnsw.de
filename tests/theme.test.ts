import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  persistTheme,
  readStoredTheme,
  themeInitScript,
} from "../app/theme";

function page(stored?: string) {
  const dom = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
    url: "http://localhost/",
    runScripts: "outside-only",
  });
  if (stored !== undefined) dom.window.localStorage.setItem(THEME_STORAGE_KEY, stored);
  return dom;
}

test("Inline-Skript setzt das gespeicherte Theme am <html>", () => {
  for (const theme of ["hell", "dunkel"]) {
    const dom = page(theme);
    dom.window.eval(themeInitScript);
    assert.equal(dom.window.document.documentElement.getAttribute("data-theme"), theme);
  }
});

test("Inline-Skript lässt data-theme ohne oder mit ungültigem Speicherwert leer", () => {
  for (const stored of [undefined, "", "neon", "system"]) {
    const dom = page(stored);
    dom.window.eval(themeInitScript);
    assert.equal(dom.window.document.documentElement.hasAttribute("data-theme"), false);
  }
});

test("Inline-Skript übersteht blockierten Speicher", () => {
  const dom = page();
  Object.defineProperty(dom.window, "localStorage", {
    get() {
      throw new Error("Zugriff auf localStorage verweigert");
    },
  });
  assert.doesNotThrow(() => dom.window.eval(themeInitScript));
  assert.equal(dom.window.document.documentElement.hasAttribute("data-theme"), false);
});

test("readStoredTheme fällt bei Fehlern und fehlendem Speicher auf System zurück", () => {
  const broken = {
    getItem() {
      throw new Error("kaputt");
    },
    setItem() {},
    removeItem() {},
  };
  assert.equal(readStoredTheme(broken), "system");
  assert.equal(readStoredTheme(undefined), "system");
  assert.equal(readStoredTheme(page("hell").window.localStorage), "hell");
  assert.equal(readStoredTheme(page("unsinn").window.localStorage), "system");
});

test("persistTheme speichert Hell und Dunkel und löscht den Eintrag bei System", () => {
  const storage = page().window.localStorage;
  persistTheme(storage, "dunkel");
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "dunkel");
  persistTheme(storage, "system");
  assert.equal(storage.getItem(THEME_STORAGE_KEY), null);
  assert.doesNotThrow(() => persistTheme(undefined, "hell"));
});

test("applyTheme setzt und entfernt data-theme", () => {
  const root = page().window.document.documentElement;
  applyTheme(root, "hell");
  assert.equal(root.getAttribute("data-theme"), "hell");
  applyTheme(root, "system");
  assert.equal(root.hasAttribute("data-theme"), false);
});

import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import { act, createElement } from "react";
import { renderToString } from "react-dom/server";
import { THEME_STORAGE_KEY } from "../app/theme";
import {
  chooseTheme,
  getServerThemeChoice,
  getThemeChoice,
  resetThemeStore,
  subscribeTheme,
} from "../app/theme-store";
import { ThemeToggle } from "../app/ThemeToggle";

function installDom({
  storageBlocked = false,
  stored,
}: { storageBlocked?: boolean; stored?: string } = {}) {
  const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "https://jnsw.de" });
  if (stored !== undefined) dom.window.localStorage.setItem(THEME_STORAGE_KEY, stored);
  if (storageBlocked) {
    Object.defineProperty(dom.window, "localStorage", {
      get() {
        throw new Error("Zugriff auf localStorage verweigert");
      },
    });
  }
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    StorageEvent: dom.window.StorageEvent,
  });
  resetThemeStore();
  return dom;
}

test("Serverstand ist immer System", () => {
  assert.equal(getServerThemeChoice(), "system");
});

test("gespeicherte Wahl wird beim ersten Lesen übernommen", () => {
  installDom({ stored: "hell" });
  assert.equal(getThemeChoice(), "hell");
});

test("Wahl gilt und wird angezeigt, auch wenn der Speicher blockiert ist", () => {
  const dom = installDom({ storageBlocked: true });
  const calls: string[] = [];
  const unsubscribe = subscribeTheme(() => calls.push(getThemeChoice()));
  assert.equal(getThemeChoice(), "system");
  assert.doesNotThrow(() => chooseTheme("dunkel"));
  assert.equal(getThemeChoice(), "dunkel");
  assert.equal(dom.window.document.documentElement.getAttribute("data-theme"), "dunkel");
  assert.deepEqual(calls, ["dunkel"]);
  unsubscribe();
});

test("Wahl wird gespeichert, System löscht den Eintrag und das Attribut", () => {
  const dom = installDom();
  chooseTheme("hell");
  assert.equal(dom.window.localStorage.getItem(THEME_STORAGE_KEY), "hell");
  assert.equal(dom.window.document.documentElement.getAttribute("data-theme"), "hell");
  chooseTheme("system");
  assert.equal(dom.window.localStorage.getItem(THEME_STORAGE_KEY), null);
  assert.equal(dom.window.document.documentElement.hasAttribute("data-theme"), false);
});

test("storage-Ereignis eines anderen Tabs übernimmt nur den Theme-Schlüssel", () => {
  const dom = installDom();
  let notified = 0;
  const unsubscribe = subscribeTheme(() => notified++);
  assert.equal(getThemeChoice(), "system");

  dom.window.localStorage.setItem("anderer-schluessel", "x");
  dom.window.dispatchEvent(new dom.window.StorageEvent("storage", { key: "anderer-schluessel" }));
  assert.equal(notified, 0);
  assert.equal(dom.window.document.documentElement.hasAttribute("data-theme"), false);

  dom.window.localStorage.setItem(THEME_STORAGE_KEY, "dunkel");
  dom.window.dispatchEvent(new dom.window.StorageEvent("storage", { key: THEME_STORAGE_KEY }));
  assert.equal(notified, 1);
  assert.equal(getThemeChoice(), "dunkel");
  assert.equal(dom.window.document.documentElement.getAttribute("data-theme"), "dunkel");

  dom.window.localStorage.clear();
  dom.window.dispatchEvent(new dom.window.StorageEvent("storage", { key: null }));
  assert.equal(getThemeChoice(), "system");
  assert.equal(dom.window.document.documentElement.hasAttribute("data-theme"), false);

  unsubscribe();
  dom.window.localStorage.setItem(THEME_STORAGE_KEY, "hell");
  dom.window.dispatchEvent(new dom.window.StorageEvent("storage", { key: THEME_STORAGE_KEY }));
  assert.equal(notified, 2, "nach dem Abmelden kommt keine Benachrichtigung mehr");
});

function pressedChoice(container: HTMLElement): string {
  const pressed = [...container.querySelectorAll("button[aria-pressed='true']")];
  assert.equal(pressed.length, 1, "genau eine Wahl ist gedrückt");
  return pressed[0].textContent ?? "";
}

function clickButton(container: HTMLElement, label: string) {
  const button = [...container.querySelectorAll("button")].find(
    (candidate) => candidate.textContent === label,
  );
  assert.ok(button, `Knopf ${label} vorhanden`);
  button.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
}

function renderServerToggle() {
  const properties = ["window", "document"] as const;
  const previous = properties.map((key) => Object.getOwnPropertyDescriptor(globalThis, key));
  try {
    for (const key of properties) Reflect.deleteProperty(globalThis, key);
    assert.equal(typeof window, "undefined");
    return renderToString(createElement(ThemeToggle));
  } finally {
    properties.forEach((key, index) => {
      if (previous[index]) Object.defineProperty(globalThis, key, previous[index]!);
    });
  }
}

async function hydrateToggle() {
  const html = renderServerToggle();
  assert.match(html, /aria-label="Farbschema"/);
  assert.match(html, /aria-pressed="true"[^>]*>System</);
  const dom = new JSDOM(`<!doctype html><html><body><div id="root">${html}</div></body></html>`, {
    url: "https://jnsw.de",
  });
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    HTMLElement: dom.window.HTMLElement,
    StorageEvent: dom.window.StorageEvent,
    IS_REACT_ACT_ENVIRONMENT: true,
  });
  dom.window.localStorage.setItem(THEME_STORAGE_KEY, "dunkel");
  resetThemeStore();
  const container = dom.window.document.getElementById("root")!;
  const recoverable: unknown[] = [];
  // Erst nach gesetzten globals laden, damit react-dom/client die jsdom-Umgebung nutzt.
  const { hydrateRoot } = await import("react-dom/client");
  let root!: ReturnType<typeof hydrateRoot>;
  await act(async () => {
    root = hydrateRoot(container, createElement(ThemeToggle), {
      onRecoverableError: (error) => recoverable.push(error),
    });
  });
  return { dom, container, root, recoverable };
}

test("ThemeToggle rendert ohne window System und hydratisiert zur gespeicherten Wahl", async () => {
  const serverHtml = renderServerToggle();
  assert.equal(getServerThemeChoice(), "system");
  assert.match(serverHtml, /aria-pressed="true"[^>]*>System</);

  const { dom, container, root, recoverable } = await hydrateToggle();
  try {
    assert.deepEqual(recoverable, [], "keine Hydrationsfehler");
    assert.equal(pressedChoice(container), "Dunkel", "gespeicherte Wahl nach der Hydration");

    await act(async () => {
      clickButton(container, "Hell");
    });
    assert.equal(pressedChoice(container), "Hell");
    assert.equal(getThemeChoice(), "hell");
    assert.equal(dom.window.document.documentElement.getAttribute("data-theme"), "hell");
    assert.equal(dom.window.localStorage.getItem(THEME_STORAGE_KEY), "hell");
    assert.deepEqual(recoverable, []);
  } finally {
    await act(async () => {
      root.unmount();
    });
    container.remove();
    dom.window.close();
    resetThemeStore();
  }
});

test("ThemeToggle zeigt die Wahl per Klick auch bei blockiertem Speicher an", async () => {
  const { dom, container, root, recoverable } = await hydrateToggle();
  try {
    Object.defineProperty(dom.window, "localStorage", {
      get() {
        throw new Error("Zugriff auf localStorage verweigert");
      },
    });
    assert.equal(pressedChoice(container), "Dunkel", "gespeicherte Ausgangswahl");
    await act(async () => {
      clickButton(container, "Hell");
    });
    assert.equal(pressedChoice(container), "Hell", "neue Wahl trotz blockiertem Speicher");
    assert.equal(getThemeChoice(), "hell");
    assert.equal(dom.window.document.documentElement.getAttribute("data-theme"), "hell");
    assert.deepEqual(recoverable, []);
  } finally {
    await act(async () => {
      root.unmount();
    });
    container.remove();
    dom.window.close();
    resetThemeStore();
  }
});

import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { CursorGlow } from "../app/CursorGlow.tsx";

type MediaStub = {
  matches: boolean;
  listeners: Set<() => void>;
  addEventListener(type: string, listener: () => void): void;
  removeEventListener(type: string, listener: () => void): void;
};

function mediaStub(matches: boolean): MediaStub {
  const listeners = new Set<() => void>();
  return {
    matches,
    listeners,
    addEventListener: (_type, listener) => listeners.add(listener),
    removeEventListener: (_type, listener) => listeners.delete(listener),
  };
}

function installDom({ finePointer = true, reducedMotion = false } = {}) {
  const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "https://jnsw.de" });
  const fine = mediaStub(finePointer);
  const reduced = mediaStub(reducedMotion);
  const frames: FrameRequestCallback[] = [];
  dom.window.matchMedia = ((query: string) =>
    query.includes("hover") ? fine : reduced) as typeof window.matchMedia;
  dom.window.requestAnimationFrame = (callback) => frames.push(callback);
  dom.window.cancelAnimationFrame = () => {};
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    Element: dom.window.Element,
    HTMLElement: dom.window.HTMLElement,
    requestAnimationFrame: dom.window.requestAnimationFrame,
    cancelAnimationFrame: dom.window.cancelAnimationFrame,
    IS_REACT_ACT_ENVIRONMENT: true,
  });
  return { dom, fine, reduced, frames };
}

function pointerMove(dom: JSDOM, target: Element, pointerType: string, x = 100, y = 100) {
  const EventClass = dom.window.PointerEvent ?? dom.window.MouseEvent;
  const event = new EventClass("pointermove", { bubbles: true, clientX: x, clientY: y });
  Object.defineProperty(event, "pointerType", { value: pointerType });
  target.dispatchEvent(event);
}

async function render() {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(createElement(CursorGlow));
  });
  const glow = document.querySelector(".cursor-glow") as HTMLElement;
  assert.ok(glow, "Folger wird gerendert");
  return { root, glow };
}

test("Folger springt beim ersten Ereignis zum Zeiger, folgt danach verzögert und wächst über Links", async () => {
  const { dom, frames } = installDom();
  const link = document.createElement("a");
  link.href = "#x";
  document.body.append(link);
  const { glow, root } = await render();

  assert.equal(glow.classList.contains("is-visible"), false);
  pointerMove(dom, document.body, "mouse", 100, 100);
  assert.equal(glow.classList.contains("is-visible"), true);
  assert.equal(glow.classList.contains("is-active"), false);
  frames.shift()!(0);
  assert.equal(glow.style.translate, "100px 100px", "erstes Ereignis setzt die Position direkt");

  pointerMove(dom, link, "mouse", 200, 100);
  assert.equal(glow.classList.contains("is-active"), true);
  frames.shift()!(0);
  assert.equal(glow.style.translate, "118px 100px", "danach nähert sich die Position nur anteilig");
  assert.equal(frames.length, 1, "Schleife läuft weiter, solange Reststrecke bleibt");

  pointerMove(dom, document.body, "mouse", 200, 100);
  assert.equal(glow.classList.contains("is-active"), false);
  await act(async () => root.unmount());
});

test("Stift zählt als feiner Zeiger, Touch wird ignoriert", async () => {
  const { dom } = installDom();
  const { glow, root } = await render();
  pointerMove(dom, document.body, "touch");
  assert.equal(glow.classList.contains("is-visible"), false);
  pointerMove(dom, document.body, "pen");
  assert.equal(glow.classList.contains("is-visible"), true);
  await act(async () => root.unmount());
});

test("Folger bleibt aus, solange ein Dialog geöffnet ist", async () => {
  const { dom } = installDom();
  const dialog = document.createElement("dialog");
  dialog.setAttribute("open", "");
  document.body.append(dialog);
  const { glow, root } = await render();
  pointerMove(dom, document.body, "mouse");
  assert.equal(glow.classList.contains("is-visible"), false);
  dialog.removeAttribute("open");
  pointerMove(dom, document.body, "mouse");
  assert.equal(glow.classList.contains("is-visible"), true);
  await act(async () => root.unmount());
});

test("Verlassen des Fensters blendet aus; Entfernen des Elements unter dem Zeiger nicht", async () => {
  const { dom } = installDom();
  const button = document.createElement("button");
  document.body.append(button);
  const { glow, root } = await render();
  pointerMove(dom, button, "mouse");
  assert.equal(glow.classList.contains("is-active"), true);
  button.dispatchEvent(new dom.window.Event("pointerout", { bubbles: true }));
  button.remove();
  assert.equal(glow.classList.contains("is-visible"), true, "Elementwechsel ist kein Verlassen");
  document.documentElement.dispatchEvent(new dom.window.Event("pointerleave"));
  assert.equal(glow.classList.contains("is-visible"), false);
  await act(async () => root.unmount());
});

test("reduzierte Bewegung schaltet den Folger ab, auch wenn sie erst später aktiviert wird", async () => {
  const { dom, reduced } = installDom();
  const { glow, root } = await render();
  pointerMove(dom, document.body, "mouse");
  assert.equal(glow.classList.contains("is-visible"), true);

  reduced.matches = true;
  for (const listener of reduced.listeners) listener();
  assert.equal(glow.classList.contains("is-visible"), false);
  pointerMove(dom, document.body, "mouse");
  assert.equal(glow.classList.contains("is-visible"), false, "keine Zuhörer mehr aktiv");

  reduced.matches = false;
  for (const listener of reduced.listeners) listener();
  pointerMove(dom, document.body, "mouse");
  assert.equal(glow.classList.contains("is-visible"), true);

  await act(async () => root.unmount());
  pointerMove(dom, document.body, "mouse");
  assert.equal(
    glow.classList.contains("is-visible"),
    false,
    "nach dem Unmount passiert nichts mehr",
  );
});

test("ohne feinen Zeiger werden keine Zuhörer registriert", async () => {
  const { dom } = installDom({ finePointer: false });
  const { glow, root } = await render();
  pointerMove(dom, document.body, "mouse");
  assert.equal(glow.classList.contains("is-visible"), false);
  await act(async () => root.unmount());
});

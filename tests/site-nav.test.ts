import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { SiteNav } from "../app/SiteNav.tsx";

async function mount(path: string, target = true, reducedMotion = false) {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: `https://jnsw.de${path}`,
  });
  let observerCallback: IntersectionObserverCallback | undefined;
  const original = new Map<string, PropertyDescriptor | undefined>();
  const globals = {
    window: dom.window,
    self: dom.window,
    document: dom.window.document,
    navigator: dom.window.navigator,
    HTMLElement: dom.window.HTMLElement,
    IS_REACT_ACT_ENVIRONMENT: true,
    IntersectionObserver: class {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
      observe() {}
      disconnect() {}
    },
  };
  for (const [key, value] of Object.entries(globals)) {
    original.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  Object.defineProperty(dom.window, "matchMedia", {
    value: (query: string) => ({
      matches: reducedMotion && query.includes("prefers-reduced-motion"),
      addEventListener() {},
      removeEventListener() {},
    }),
  });
  const scrolls: ScrollIntoViewOptions[] = [];
  if (target) {
    for (const id of ["projekte", "top"]) {
      const section = dom.window.document.createElement("section");
      section.id = id;
      section.scrollIntoView = (options) => scrolls.push(options as ScrollIntoViewOptions);
      dom.window.document.body.append(section);
    }
  }
  const container = dom.window.document.getElementById("root")!;
  const root = createRoot(container);
  await act(async () => root.render(createElement(SiteNav)));
  return {
    container,
    scrolls,
    click(options: MouseEventInit = {}, href = "/#projekte") {
      const event = new dom.window.MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        ...options,
      });
      const anchor = container.querySelector<HTMLAnchorElement>(`a[href="${href}"]`)!;
      assert.ok(anchor);
      // Capture component cancellation, then suppress jsdom's unsupported page navigation.
      let prevented = false;
      const capture = (e: Event) => {
        prevented = e.defaultPrevented;
        e.preventDefault();
      };
      dom.window.document.addEventListener("click", capture, { once: true });
      anchor.dispatchEvent(event);
      return prevented;
    },
    async activate(id: string) {
      await act(async () =>
        observerCallback?.(
          [
            {
              isIntersecting: true,
              intersectionRatio: 1,
              target: dom.window.document.getElementById(id)!,
            } as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver,
        ),
      );
    },
    async close() {
      await act(async () => root.unmount());
      dom.window.close();
      for (const [key, descriptor] of original) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor);
        else Reflect.deleteProperty(globalThis, key);
      }
    },
  };
}

for (const reduced of [false, true]) {
  test(`scrolls on the home page with reduced motion ${reduced}`, async () => {
    const view = await mount("/", true, reduced);
    try {
      assert.equal(view.click(), true);
      assert.deepEqual(view.scrolls, [{ behavior: reduced ? "auto" : "smooth", block: "start" }]);
      assert.deepEqual(
        [...view.container.querySelectorAll(".nav-links a")].map((a) => a.getAttribute("href")),
        ["/#projekte", "/#tools", "/#informationen", "/#community"],
      );
      assert.equal(view.container.querySelector(".wordmark")?.getAttribute("href"), "/#top");
    } finally {
      await view.close();
    }
  });
}

for (const target of [false, true]) {
  test(`keeps navigation from a detail page with matching target ${target}`, async () => {
    const view = await mount("/projekte/pdf-tool", target);
    try {
      assert.equal(view.click(), false);
      assert.deepEqual(view.scrolls, []);
    } finally {
      await view.close();
    }
  });
}

test("keeps the link default when a home section is missing", async () => {
  const view = await mount("/", false);
  try {
    assert.equal(view.click(), false);
    assert.deepEqual(view.scrolls, []);
  } finally {
    await view.close();
  }
});

for (const options of [
  { ctrlKey: true },
  { metaKey: true },
  { shiftKey: true },
  { altKey: true },
  { button: 1 },
]) {
  test(`preserves modified navigation ${JSON.stringify(options)}`, async () => {
    const view = await mount("/");
    try {
      assert.equal(view.click(options), false);
      assert.deepEqual(view.scrolls, []);
    } finally {
      await view.close();
    }
  });
}

for (const reduced of [false, true]) {
  test(`scrolls the wordmark to top with reduced motion ${reduced}`, async () => {
    const view = await mount("/", true, reduced);
    try {
      assert.equal(view.click({}, "/#top"), true);
      assert.deepEqual(view.scrolls, [{ behavior: reduced ? "auto" : "smooth", block: "start" }]);
    } finally {
      await view.close();
    }
  });
}

test("updates the active link when its section intersects", async () => {
  const view = await mount("/");
  try {
    await view.activate("projekte");
    assert.equal(
      view.container.querySelector('a[href="/#projekte"]')?.getAttribute("aria-current"),
      "page",
    );
    await view.activate("top");
    assert.equal(view.container.querySelector(".nav-links [aria-current]"), null);
  } finally {
    await view.close();
  }
});

/**
 * Gemeinsamer Zustand der Farbschema-Wahl für den Umschalter.
 *
 * Die aktuelle Wahl wird im Modul gehalten, nicht bei jedem Lesen aus dem Speicher
 * geholt: Ist `localStorage` blockiert, gilt die Wahl trotzdem für diese Seite und
 * der Umschalter zeigt sie an.
 */

import {
  THEME_STORAGE_KEY,
  applyTheme,
  getStorage,
  persistTheme,
  readStoredTheme,
  type ThemeChoice,
} from "./theme";

let current: ThemeChoice | undefined;
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

/** Änderung aus einem anderen Tab übernehmen; andere Schlüssel sind uninteressant. */
function onStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== THEME_STORAGE_KEY) return;
  current = readStoredTheme(getStorage());
  applyTheme(document.documentElement, current);
  notify();
}

export function getThemeChoice(): ThemeChoice {
  current ??= readStoredTheme(getStorage());
  return current;
}

/** Server und erste Hydration kennen die gespeicherte Wahl nicht. */
export function getServerThemeChoice(): ThemeChoice {
  return "system";
}

export function chooseTheme(next: ThemeChoice): void {
  current = next;
  applyTheme(document.documentElement, next);
  persistTheme(getStorage(), next);
  notify();
}

export function subscribeTheme(listener: () => void): () => void {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

/** Nur für Tests: den Modulzustand zurücksetzen. */
export function resetThemeStore(): void {
  current = undefined;
  listeners.clear();
}

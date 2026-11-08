/**
 * Farbschema: Zustand, Speicherung und Inline-Skript.
 *
 * Drei Zustände: "system" (kein `data-theme`, die Seite folgt `prefers-color-scheme`),
 * "hell" und "dunkel" (`data-theme` am <html> überschreibt das System). Die Wahl wird in
 * `localStorage` gemerkt; jeder Zugriff ist abgesichert, weil der Speicher blockiert sein kann.
 */

export const THEME_STORAGE_KEY = "jnsw-theme";

export type Theme = "hell" | "dunkel";
export type ThemeChoice = Theme | "system";

export function isTheme(value: unknown): value is Theme {
  return value === "hell" || value === "dunkel";
}

type ThemeStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

/** `window.localStorage` kann schon beim Zugriff werfen (z. B. blockierte Website-Daten). */
export function getStorage(): ThemeStorage | undefined {
  try {
    return typeof window === "undefined" ? undefined : window.localStorage;
  } catch {
    return undefined;
  }
}

export function readStoredTheme(storage: ThemeStorage | undefined): ThemeChoice {
  try {
    const value = storage?.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : "system";
  } catch {
    return "system";
  }
}

export function persistTheme(storage: ThemeStorage | undefined, choice: ThemeChoice): void {
  try {
    if (choice === "system") storage?.removeItem(THEME_STORAGE_KEY);
    else storage?.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Ohne Speicher gilt die Wahl nur für die aktuelle Seite.
  }
}

export function applyTheme(root: HTMLElement, choice: ThemeChoice): void {
  if (choice === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", choice);
}

/**
 * Läuft als Inline-Skript im <head>, bevor der Browser das erste Mal rendert, damit kein
 * falsches Farbschema aufblitzt. Bewusst klein, ohne Abhängigkeiten und ohne moderne Syntax.
 */
export const themeInitScript =
  "(function(){try{var t=localStorage.getItem(" +
  JSON.stringify(THEME_STORAGE_KEY) +
  ');if(t==="hell"||t==="dunkel"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();';

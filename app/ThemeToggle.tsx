"use client";

import { useSyncExternalStore } from "react";
import type { ThemeChoice } from "./theme";
import { chooseTheme, getServerThemeChoice, getThemeChoice, subscribeTheme } from "./theme-store";

const options: ReadonlyArray<[ThemeChoice, string]> = [
  ["system", "System"],
  ["hell", "Hell"],
  ["dunkel", "Dunkel"],
];

export function ThemeToggle() {
  const choice = useSyncExternalStore(subscribeTheme, getThemeChoice, getServerThemeChoice);

  return (
    <span className="theme-toggle" role="group" aria-label="Farbschema">
      {options.map(([value, label]) => (
        <button
          type="button"
          key={value}
          aria-pressed={choice === value}
          onClick={() => chooseTheme(value)}
        >
          {label}
        </button>
      ))}
    </span>
  );
}

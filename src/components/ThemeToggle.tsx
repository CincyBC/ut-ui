import React, { useEffect, useState } from "react";
import { cn } from "../cn";

export type ThemeMode = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "ut-theme";

function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolveTheme(mode: ThemeMode): "light" | "dark" {
  return mode === "system" ? (systemPrefersDark() ? "dark" : "light") : mode;
}

function applyTheme(mode: ThemeMode) {
  document.documentElement.setAttribute("data-theme", resolveTheme(mode));
}

/**
 * Inline script string for a `<script is:inline>` in the document head, run
 * before hydration so the resolved theme is set pre-paint (no flash).
 */
export const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var m=localStorage.getItem(k)||"system";var d=m==="dark"||(m==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-theme",d?"dark":"light");}catch(e){}})();`;

const ICONS: Record<ThemeMode, React.ReactNode> = {
  light: (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="3.25" />
      <path
        strokeLinecap="round"
        d="M8 0.75v1.5M8 13.75v1.5M15.25 8h-1.5M2.25 8H0.75M13.06 2.94l-1.06 1.06M3.99 12.01l-1.06 1.06M13.06 13.06l-1.06-1.06M3.99 3.99 2.94 2.94"
      />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 9.35A6 6 0 0 1 6.65 2 6 6 0 1 0 14 9.35Z"
      />
    </svg>
  ),
  system: (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="0.75" y="2.25" width="14.5" height="9" rx="1" strokeLinejoin="round" />
      <path strokeLinecap="round" d="M5.5 14.25h5M8 11.25v3" />
    </svg>
  ),
};

const LABEL: Record<ThemeMode, string> = { light: "Light", dark: "Dark", system: "System" };
const ORDER: ThemeMode[] = ["light", "dark", "system"];

export interface ThemeToggleProps {
  className?: string;
}

/** Light / dark / system theme switcher. Persists to localStorage and follows OS changes in system mode. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => {
    const stored = (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null) ?? "system";
    setMode(stored);
  }, []);

  useEffect(() => {
    if (mode !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [mode]);

  const select = (next: ThemeMode) => {
    setMode(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn("inline-flex items-center gap-0.5 rounded border border-ut-border bg-ut-surface p-0.5", className)}
    >
      {ORDER.map((value) => {
        const active = mode === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={LABEL[value]}
            title={LABEL[value]}
            onClick={() => select(value)}
            className={cn(
              "rounded p-1.5 transition-colors duration-150",
              active ? "bg-petrol text-paper-text" : "text-ut-muted hover:text-ut-text",
            )}
          >
            {ICONS[value]}
          </button>
        );
      })}
    </div>
  );
}

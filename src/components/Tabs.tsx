import React, { useId, useRef } from "react";
import { cn } from "../cn";

export interface Tab<V extends string> {
  value: V;
  label: React.ReactNode;
}

export interface TabsProps<V extends string> {
  tabs: readonly Tab<V>[];
  value: V;
  onChange: (value: V) => void;
  /** Panel content for the active tab. */
  children?: React.ReactNode;
  ariaLabel: string;
  className?: string;
}

/** Nav-style tabs with the brand 2px green active underline. */
export function Tabs<V extends string>({ tabs, value, onChange, children, ariaLabel, className }: TabsProps<V>) {
  const id = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = tabs.findIndex((t) => t.value === value);
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
    if (next === -1) return;
    e.preventDefault();
    onChange(tabs[next].value);
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div className={className}>
      <div
        ref={listRef}
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className="flex gap-1 border-b border-ut-border"
      >
        {tabs.map((t) => {
          const active = t.value === value;
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              id={`${id}-tab-${t.value}`}
              aria-selected={active}
              aria-controls={`${id}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(t.value)}
              className={cn(
                "-mb-px border-b-2 px-3 py-2 font-sans text-sm font-semibold transition-colors",
                active
                  ? "border-ut-accent text-ut-text"
                  : "border-transparent text-ut-muted hover:text-ut-text",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {children !== undefined && (
        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${value}`} className="pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

import React, { useRef } from "react";
import { cn } from "../cn";

export interface SegmentedControlProps<V extends string> {
  options: readonly (V | { value: V; label: string })[];
  value: V;
  onChange: (value: V) => void;
  size?: "sm" | "md";
  /** Required — rendered as the radiogroup's accessible name. */
  ariaLabel: string;
  className?: string;
}

function normalize<V extends string>(o: V | { value: V; label: string }) {
  return typeof o === "string" ? { value: o, label: o } : o;
}

/** Filter toolbar (e.g. MAX/5Y/1Y/1M/1W). Radiogroup semantics with arrow-key navigation. */
export function SegmentedControl<V extends string>({
  options,
  value,
  onChange,
  size = "sm",
  ariaLabel,
  className,
}: SegmentedControlProps<V>) {
  const groupRef = useRef<HTMLDivElement>(null);
  const items = options.map(normalize);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = items.findIndex((o) => o.value === value);
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % items.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + items.length) % items.length;
    if (next === -1) return;
    e.preventDefault();
    onChange(items[next].value);
    const buttons = groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    buttons?.[next]?.focus();
  };

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        "inline-flex items-center gap-0.5 rounded border border-ut-border bg-ut-surface p-0.5",
        className,
      )}
    >
      {items.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded font-sans font-semibold transition-colors duration-150",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
              active ? "bg-petrol text-paper-text" : "text-ut-muted hover:text-ut-text",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

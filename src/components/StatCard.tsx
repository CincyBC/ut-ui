import React from "react";
import { cn } from "../cn";
import { Card } from "./Card";

export type StatAccent = "green" | "teal" | "petrol" | "amber" | "rust";

// Static lookup: every class literal exists in source so Tailwind v4 generates it.
// Never build class names from props (`bg-${color}-500` is silently dropped).
const ACCENT: Record<StatAccent, { chip: string; text: string }> = {
  green: { chip: "bg-reactor/15", text: "text-reactor [[data-theme=dark]_&]:text-glow" },
  teal: { chip: "bg-isotope/15", text: "text-isotope" },
  petrol: { chip: "bg-petrol/15", text: "text-petrol-light" },
  amber: { chip: "bg-amber-alert/15", text: "text-amber-alert" },
  rust: { chip: "bg-rust/15", text: "text-rust" },
};

export interface StatDelta {
  value: number;
  /** Formats the delta for display; default: signed number. */
  format?: (n: number) => string;
}

export interface StatCardProps {
  /** The headline number. Rendered in mono with tabular numerals. */
  value: React.ReactNode;
  label?: string;
  icon?: React.ElementType;
  accent?: StatAccent;
  /** Signed change; positive renders reactor green, negative rust. */
  delta?: StatDelta;
  footer?: React.ReactNode;
  /** Live-signal glow — one per view, max. */
  live?: boolean;
  className?: string;
}

export function StatCard({
  value,
  label,
  icon: Icon,
  accent = "petrol",
  delta,
  footer,
  live,
  className,
}: StatCardProps) {
  const a = ACCENT[accent];
  return (
    <Card live={live} className={cn("flex h-full flex-col", className)}>
      <div className="flex items-start justify-between gap-3">
        {Icon && (
          <div className={cn("hex-frame p-3", a.chip)}>
            <Icon aria-hidden="true" className={cn("h-6 w-6", a.text)} />
          </div>
        )}
        <div className="ml-auto text-right">
          {label && (
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-ut-muted">{label}</div>
          )}
          <div className="font-mono text-3xl tabular-nums">{value}</div>
          {delta && (
            <div
              className={cn(
                "font-mono text-sm tabular-nums",
                delta.value >= 0 ? "text-ut-accent" : "text-rust",
              )}
            >
              {(delta.format ?? ((n: number) => `${n >= 0 ? "+" : ""}${n.toLocaleString()}`))(delta.value)}
            </div>
          )}
        </div>
      </div>
      {footer && <div className="mt-auto border-t border-ut-border pt-3 text-sm text-ut-muted">{footer}</div>}
    </Card>
  );
}

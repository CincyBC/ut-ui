import React from "react";
import { cn } from "../cn";

export type BadgeTone = "neutral" | "green" | "teal" | "petrol" | "amber" | "rust";

const TONE: Record<BadgeTone, string> = {
  neutral: "bg-steel/15 text-ut-muted",
  green: "bg-reactor/15 text-reactor [[data-theme=dark]_&]:text-glow",
  teal: "bg-isotope/15 text-isotope",
  petrol: "bg-petrol/15 text-petrol-light",
  amber: "bg-amber-alert/15 text-amber-alert",
  rust: "bg-rust/15 text-rust",
};

export interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wider",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export interface StatusBadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const DOT: Record<BadgeTone, string> = {
  neutral: "bg-silver",
  green: "bg-reactor [[data-theme=dark]_&]:bg-glow",
  teal: "bg-isotope",
  petrol: "bg-petrol-light",
  amber: "bg-amber-alert",
  rust: "bg-rust",
};

/** Badge with the hexagonal status marker from the logo motif. */
export function StatusBadge({ children, tone = "neutral", className }: StatusBadgeProps) {
  return (
    <Badge tone={tone} className={className}>
      <span aria-hidden="true" className={cn("hex-frame inline-block h-2 w-2", DOT[tone])} />
      {children}
    </Badge>
  );
}

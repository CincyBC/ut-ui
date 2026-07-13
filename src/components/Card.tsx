import React from "react";
import { cn } from "../cn";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Card heading. */
  title?: React.ReactNode;
  /** Small uppercase label rendered above the title. */
  label?: string;
  /** Right-aligned header slot (filters, actions). */
  headerContent?: React.ReactNode;
  /** Adds the live-signal green glow. One per view, max. */
  live?: boolean;
}

export function Card({ children, className, title, label, headerContent, live }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-ut-border bg-ut-surface p-5 text-ut-text",
        live && "ut-glow-live",
        className,
      )}
    >
      {(title || label || headerContent) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {label && (
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-ut-muted">{label}</div>
            )}
            {title && <h2 className="font-display text-xl font-semibold">{title}</h2>}
          </div>
          {headerContent}
        </div>
      )}
      {children}
    </div>
  );
}

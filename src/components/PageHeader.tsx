import React from "react";
import { cn } from "../cn";
import { Kicker } from "./Kicker";

export interface PageHeaderProps {
  title: React.ReactNode;
  /** Kicker text rendered above the title (e.g. "Analytics"). */
  kicker?: string;
  description?: React.ReactNode;
  /** Right-aligned actions slot. */
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, kicker, description, actions, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-6 flex flex-wrap items-end justify-between gap-4", className)}>
      <div>
        {kicker && <Kicker className="mb-1">{kicker}</Kicker>}
        <h1 className="font-display text-3xl font-semibold uppercase tracking-wide text-ut-text">{title}</h1>
        {description && <p className="mt-1 max-w-prose text-sm text-ut-muted">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}

import type React from "react";
import { cn } from "../cn";

export interface TimelineItem {
  id: string;
  title: React.ReactNode;
  timestamp: string;
  description?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

/** Vertical activity feed with hexagon nodes on a hairline rail. */
export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {items.map((item, i) => (
        <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
          {i < items.length - 1 && (
            <span aria-hidden="true" className="absolute left-[0.5625rem] top-5 h-full w-px bg-ut-border" />
          )}
          <span aria-hidden="true" className="hex-frame mt-1 h-3.5 w-3.5 shrink-0 bg-ut-accent" />
          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-ut-text">{item.title}</span>
              <span className="font-mono text-xs tabular-nums text-ut-muted">{item.timestamp}</span>
            </div>
            {item.description && <p className="text-sm text-ut-muted">{item.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

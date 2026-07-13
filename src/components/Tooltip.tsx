import React, { useId, useState } from "react";
import { cn } from "../cn";

export interface TooltipProps {
  /** Tooltip text. */
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom";
  className?: string;
}

/**
 * Hover/focus tooltip. CSS-positioned relative to the trigger — no portal, so it
 * works inside Astro islands without layout providers.
 */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        "aria-describedby": open ? id : undefined,
      })}
      {open && (
        <span
          role="tooltip"
          id={id}
          className={cn(
            "absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded border border-ut-border",
            "bg-ut-surface px-2 py-1 text-xs text-ut-text shadow-sm",
            side === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5",
            className,
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}

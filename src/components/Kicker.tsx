import React from "react";
import { cn } from "../cn";

export interface KickerProps {
  children: React.ReactNode;
  className?: string;
}

/** Uppercase letter-spaced section label flanked by rules — the "— ANALYTICS —" lockup. */
export function Kicker({ children, className }: KickerProps) {
  return <div className={cn("kicker", className)}>{children}</div>;
}

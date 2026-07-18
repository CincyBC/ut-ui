import React from "react";
import { cn } from "../cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

/** Text/number/email input. Numeric types get tabular mono digits. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, type, className, ...props },
  ref,
) {
  const isNumeric = type === "number";
  return (
    <div className="relative">
      {icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ut-muted">{icon}</span>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full rounded border border-ut-border bg-ut-surface px-3 py-2 text-sm text-ut-text placeholder:text-ut-muted",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-ut-accent",
          "aria-[invalid=true]:border-rust",
          isNumeric && "font-mono tabular-nums",
          Boolean(icon) && "pl-9",
          className,
        )}
        {...props}
      />
    </div>
  );
});

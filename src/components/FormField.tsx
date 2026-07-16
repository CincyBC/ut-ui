import React from "react";
import { cn } from "../cn";

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactElement<{ "aria-invalid"?: boolean }>;
  className?: string;
}

/** Label + hint/error wrapper for a single form control. Pass the control (Input, Select, ...) as children. */
export function FormField({ label, htmlFor, hint, error, children, className }: FormFieldProps) {
  const control = React.cloneElement(children, {
    "aria-invalid": error ? true : undefined,
  });

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ut-text">
        {label}
      </label>
      {control}
      {error ? (
        <p className="text-xs font-medium text-rust">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ut-muted">{hint}</p>
      ) : null}
    </div>
  );
}

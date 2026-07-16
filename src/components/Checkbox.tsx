import React, { useId } from "react";
import { Check } from "lucide-react";
import { cn } from "../cn";

export interface CheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({ label, checked, onChange, disabled, className }: CheckboxProps) {
  const id = useId();
  return (
    <label htmlFor={id} className={cn("inline-flex items-center gap-2 text-sm text-ut-text", className)}>
      <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer absolute inset-0 h-4 w-4 cursor-pointer appearance-none rounded border border-ut-border bg-ut-surface checked:border-ut-accent checked:bg-ut-accent disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Check
          size={12}
          strokeWidth={3}
          aria-hidden="true"
          className="pointer-events-none relative hidden text-ut-bg peer-checked:block"
        />
      </span>
      {label}
    </label>
  );
}

export interface RadioProps {
  label: React.ReactNode;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Radio({ label, name, value, checked, onChange, disabled, className }: RadioProps) {
  const id = useId();
  return (
    <label htmlFor={id} className={cn("inline-flex items-center gap-2 text-sm text-ut-text", className)}>
      <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => onChange(value)}
          className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-ut-border bg-ut-surface checked:border-ut-accent disabled:cursor-not-allowed disabled:opacity-50"
        />
        <span className="pointer-events-none absolute hidden h-2 w-2 rounded-full bg-ut-accent peer-checked:block" />
      </span>
      {label}
    </label>
  );
}

export interface SwitchProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Switch({ label, checked, onChange, disabled, className }: SwitchProps) {
  return (
    <label className={cn("inline-flex items-center gap-2 text-sm text-ut-text", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={typeof label === "string" ? label : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-ut-accent" : "bg-steel/40",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-block h-3.5 w-3.5 transform rounded-full bg-ut-surface transition-transform",
            checked ? "translate-x-4" : "translate-x-1",
          )}
        />
      </button>
      {label}
    </label>
  );
}

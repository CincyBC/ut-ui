import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../cn";

export interface SelectOption<V extends string> {
  value: V;
  label: string;
}

export interface SelectProps<V extends string> extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
  options: readonly SelectOption<V>[];
  value: V;
  onChange: (value: V) => void;
}

/** Native <select>, brand-styled. Keyboard/a11y come from the platform for free. */
export function Select<V extends string>({ options, value, onChange, className, ...props }: SelectProps<V>) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as V)}
        className={cn(
          "w-full appearance-none rounded border border-ut-border bg-ut-surface px-3 py-2 pr-9 text-sm text-ut-text",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-ut-accent",
          "aria-[invalid=true]:border-rust",
          className,
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ut-muted"
      />
    </div>
  );
}

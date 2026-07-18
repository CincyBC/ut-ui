import { cn } from "../cn";

export interface DatePickerProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  min?: string;
  max?: string;
  className?: string;
}

/** Styled native <input type="date">. Swap for a custom month popover if scope grows. */
export function DatePicker({ id, value, onChange, ariaLabel, min, max, className }: DatePickerProps) {
  return (
    <input
      id={id}
      type="date"
      aria-label={ariaLabel}
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "w-full rounded border border-ut-border bg-ut-surface px-3 py-2 font-mono text-sm tabular-nums text-ut-text",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-ut-accent",
        "aria-[invalid=true]:border-rust",
        className,
      )}
    />
  );
}

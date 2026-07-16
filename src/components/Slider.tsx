import { cn } from "../cn";

export interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  ariaLabel: string;
  showValue?: boolean;
  className?: string;
}

/** Single-thumb range slider. Native <input type="range"> for free a11y/keyboard support. */
export function Slider({ min, max, value, onChange, step = 1, ariaLabel, showValue, className }: SliderProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <input
        type="range"
        aria-label={ariaLabel}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-steel/30 accent-ut-accent"
      />
      {showValue && <span className="w-10 text-right font-mono text-sm tabular-nums text-ut-text">{value}</span>}
    </div>
  );
}

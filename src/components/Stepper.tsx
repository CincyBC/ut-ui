import { Check } from "lucide-react";
import { cn } from "../cn";

export interface StepperStep {
  label: string;
}

export interface StepperProps {
  steps: StepperStep[];
  currentIndex: number;
  className?: string;
}

/** Horizontal step indicator with hexagon markers (brand motif). */
export function Stepper({ steps, currentIndex, className }: StepperProps) {
  return (
    <ol className={cn("flex items-start", className)}>
      {steps.map((step, i) => {
        const complete = i < currentIndex;
        const current = i === currentIndex;
        return (
          <li key={step.label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5" data-complete={complete} aria-current={current ? "step" : undefined}>
              <span
                aria-hidden="true"
                className={cn(
                  "hex-frame flex h-7 w-7 items-center justify-center text-xs font-semibold",
                  complete
                    ? "bg-ut-accent text-ut-bg"
                    : current
                      ? "border border-ut-accent text-ut-accent"
                      : "border border-ut-border text-ut-muted",
                )}
              >
                {complete ? <Check size={14} /> : i + 1}
              </span>
              <span className={cn("text-xs font-medium", current ? "text-ut-text" : "text-ut-muted")}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("mx-2 mt-[-1.25rem] h-px flex-1", complete ? "bg-ut-accent" : "bg-ut-border")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

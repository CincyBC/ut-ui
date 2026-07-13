import React from "react";
import { cn } from "../cn";

export type ButtonVariant = "primary" | "accent" | "ghost";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-petrol text-paper-text hover:bg-petrol-light border border-transparent",
  // one accent button per view, max
  accent: "bg-reactor text-white hover:bg-isotope border border-transparent",
  ghost: "bg-transparent text-ut-text border border-ut-border hover:border-ut-accent hover:text-ut-accent",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-[0.9375rem]",
};

export function Button({ variant = "primary", size = "md", className, type, ...rest }: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={cn(
        "inline-flex items-center gap-2 rounded font-sans font-semibold transition-colors duration-150",
        "disabled:opacity-50 disabled:pointer-events-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ut-accent",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      {...rest}
    />
  );
}

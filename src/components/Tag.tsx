import React, { useState } from "react";
import { X } from "lucide-react";
import { cn } from "../cn";

export interface TagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

/** Pill for a single removable label. The only pill-shaped element allowed by brand rules. */
export function Tag({ label, onRemove, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-ut-border bg-ut-surface px-2.5 py-0.5 text-xs font-medium text-ut-text",
        className,
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="text-ut-muted transition-colors hover:text-ut-text"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
}

export interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  ariaLabel?: string;
  placeholder?: string;
  className?: string;
}

/** Type-and-Enter tag editor built on Tag. */
export function TagInput({ value, onChange, ariaLabel = "Tags", placeholder = "Add…", className }: TagInputProps) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const trimmed = draft.trim();
    if (!trimmed || value.includes(trimmed)) {
      setDraft("");
      return;
    }
    onChange([...value, trimmed]);
    setDraft("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 rounded border border-ut-border bg-ut-surface p-1.5",
        className,
      )}
    >
      {value.map((tag) => (
        <Tag key={tag} label={tag} onRemove={() => onChange(value.filter((t) => t !== tag))} />
      ))}
      <input
        aria-label={ariaLabel}
        value={draft}
        placeholder={value.length === 0 ? placeholder : undefined}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        className="min-w-[6rem] flex-1 bg-transparent px-1 py-0.5 text-sm text-ut-text placeholder:text-ut-muted focus:outline-none"
      />
    </div>
  );
}

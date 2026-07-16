import React, { cloneElement, useEffect, useRef, useState } from "react";
import { cn } from "../cn";

export interface DropdownItem {
  label: React.ReactNode;
  onSelect: () => void;
  disabled?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void; "aria-haspopup"?: boolean; "aria-expanded"?: boolean }>;
  items: DropdownItem[];
  align?: "start" | "end";
  className?: string;
}

/** Keyboard-navigable action menu anchored to a trigger element. */
export function Dropdown({ trigger, items, align = "start", className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]')[0]?.focus();
    }
  }, [open]);

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const menuItems = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    const idx = menuItems.indexOf(document.activeElement as HTMLElement);
    let next = -1;
    if (e.key === "ArrowDown") next = (idx + 1) % menuItems.length;
    if (e.key === "ArrowUp") next = (idx - 1 + menuItems.length) % menuItems.length;
    if (next === -1) return;
    e.preventDefault();
    menuItems[next]?.focus();
  };

  const triggerElement = cloneElement(trigger, {
    onClick: (e: React.MouseEvent) => {
      trigger.props.onClick?.(e);
      setOpen((prev) => !prev);
    },
    "aria-haspopup": true,
    "aria-expanded": open,
  });

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {triggerElement}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          onKeyDown={onMenuKeyDown}
          className={cn(
            "absolute z-40 mt-1 min-w-[10rem] rounded border border-ut-border bg-ut-surface py-1 shadow-lg",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              tabIndex={-1}
              onClick={() => {
                item.onSelect();
                setOpen(false);
              }}
              className="flex w-full items-center px-3 py-1.5 text-left text-sm text-ut-text transition-colors hover:bg-ut-bg focus:bg-ut-bg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

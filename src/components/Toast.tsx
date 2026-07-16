import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "../cn";

export type ToastTone = "info" | "success" | "error";

export interface ToastInput {
  message: string;
  tone?: ToastTone;
  durationMs?: number;
}

interface ToastItem extends Required<Omit<ToastInput, "durationMs">> {
  id: string;
  durationMs: number;
}

interface ToastContextValue {
  showToast: (toast: ToastInput) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICON: Record<ToastTone, typeof Info> = {
  info: Info,
  success: CheckCircle2,
  error: AlertTriangle,
};

const TONE: Record<ToastTone, string> = {
  info: "border-ut-border text-ut-text",
  success: "border-reactor/40 text-reactor [[data-theme=dark]_&]:text-glow",
  error: "border-rust/40 text-rust",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const nextId = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ message, tone = "info", durationMs = 4000 }: ToastInput) => {
      const id = `toast-${nextId.current++}`;
      setToasts((current) => [...current, { id, message, tone, durationMs }]);
      window.setTimeout(() => dismiss(id), durationMs);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted &&
        createPortal(
        <div role="status" aria-live="polite" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          {toasts.map((toast) => {
            const Icon = ICON[toast.tone];
            return (
              <div
                key={toast.id}
                className={cn(
                  "flex items-center gap-2 rounded border bg-ut-surface px-4 py-2.5 text-sm shadow-lg",
                  TONE[toast.tone],
                )}
              >
                <Icon size={16} aria-hidden="true" />
                <span className="text-ut-text">{toast.message}</span>
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={() => dismiss(toast.id)}
                  className="ml-2 text-ut-muted hover:text-ut-text"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

/** Access the toast API. Must be used within a <ToastProvider>. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

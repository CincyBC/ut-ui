import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../cn";

export interface CalendarEvent {
  date: string; // YYYY-MM-DD
  label: string;
}

export interface CalendarProps {
  /** Full year, e.g. 2026. */
  year: number;
  /** 1-12. */
  month: number;
  events: CalendarEvent[];
  onNavigate: (direction: "prev" | "next") => void;
  onDateClick?: (date: string) => void;
  className?: string;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${pad(month)}-${pad(day)}`;
}

/** Month-grid calendar. Pass events keyed by ISO date; navigation is controlled by the caller. */
export function Calendar({ year, month, events, onNavigate, onDateClick, className }: CalendarProps) {
  const firstOfMonth = new Date(Date.UTC(year, month - 1, 1));
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const leadingBlanks = firstOfMonth.getUTCDay();

  const eventsByDate = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const list = eventsByDate.get(event.date) ?? [];
    list.push(event);
    eventsByDate.set(event.date, list);
  }

  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ut-text">
          {MONTH_NAMES[month - 1]} {year}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => onNavigate("prev")}
            className="rounded border border-ut-border p-1.5 text-ut-text transition-colors hover:bg-ut-bg"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => onNavigate("next")}
            className="rounded border border-ut-border p-1.5 text-ut-text transition-colors hover:bg-ut-bg"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded border border-ut-border bg-ut-border text-xs">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="bg-ut-surface px-2 py-1.5 text-center font-semibold uppercase tracking-wide text-ut-muted">
            {wd}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} className="min-h-20 bg-ut-bg" />;
          const date = isoDate(year, month, day);
          const dayEvents = eventsByDate.get(date) ?? [];
          return (
            <button
              type="button"
              key={date}
              onClick={() => onDateClick?.(date)}
              className="flex min-h-20 flex-col items-start gap-1 bg-ut-surface p-1.5 text-left transition-colors hover:bg-ut-bg"
            >
              <span className="font-mono text-ut-text">{day}</span>
              {dayEvents.map((e, idx) => (
                <span
                  key={idx}
                  className="w-full truncate rounded bg-ut-accent/15 px-1 py-0.5 text-[0.6875rem] text-ut-accent"
                >
                  {e.label}
                </span>
              ))}
            </button>
          );
        })}
      </div>
    </div>
  );
}

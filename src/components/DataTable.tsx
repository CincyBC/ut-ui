import React, { useMemo, useState } from "react";
import { cn } from "../cn";

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  /** Cell renderer; defaults to `row[key]`. */
  cell?: (row: T) => React.ReactNode;
  /** Right-aligned mono tabular numerals. */
  numeric?: boolean;
  sortable?: boolean;
  /** Value used for sorting; defaults to `row[key]`. */
  sortValue?: (row: T) => string | number;
  align?: "left" | "right" | "center";
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  defaultSort?: { key: string; dir: "asc" | "desc" };
  stickyHeader?: boolean;
  density?: "compact" | "normal";
  onRowClick?: (row: T) => void;
  emptyState?: React.ReactNode;
  /** Accessible table description. */
  caption?: string;
  className?: string;
}

function defaultSortValue<T>(row: T, key: string): string | number {
  const v = (row as Record<string, unknown>)[key];
  if (typeof v === "number") return v;
  return v == null ? "" : String(v);
}

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  defaultSort,
  stickyHeader = true,
  density = "normal",
  onRowClick,
  emptyState,
  caption,
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = useState(defaultSort ?? null);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    const val = col.sortValue ?? ((row: T) => defaultSortValue(row, col.key));
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = val(a);
      const bv = val(b);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv), undefined, { numeric: true }) * dir;
    });
  }, [rows, sort, columns]);

  const toggleSort = (key: string) =>
    setSort((s) => (s?.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));

  const pad = density === "compact" ? "px-3 py-1.5" : "px-4 py-2.5";

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse text-sm text-ut-text">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className={cn(stickyHeader && "sticky top-0 z-[1] bg-ut-surface")}>
          <tr>
            {columns.map((c) => {
              const isSorted = sort?.key === c.key;
              const alignCls =
                c.align === "center" ? "text-center" : c.numeric || c.align === "right" ? "text-right" : "text-left";
              return (
                <th
                  key={c.key}
                  scope="col"
                  style={c.width ? { width: c.width } : undefined}
                  aria-sort={isSorted ? (sort!.dir === "asc" ? "ascending" : "descending") : undefined}
                  className={cn(
                    "border-b border-ut-border text-xs font-semibold uppercase tracking-[0.1em] text-ut-muted",
                    pad,
                    alignCls,
                  )}
                >
                  {c.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(c.key)}
                      className={cn(
                        "inline-flex items-center gap-1 uppercase tracking-[0.1em] hover:text-ut-text",
                        isSorted && "text-ut-text",
                      )}
                    >
                      {c.header}
                      <span aria-hidden="true" className="text-[0.65rem]">
                        {isSorted ? (sort!.dir === "asc" ? "▲" : "▼") : "△"}
                      </span>
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={cn("text-center text-ut-muted", pad)}>
                {emptyState ?? "No data"}
              </td>
            </tr>
          ) : (
            sorted.map((row) => (
              <tr
                key={getRowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  "border-b border-ut-border last:border-b-0",
                  onRowClick && "cursor-pointer hover:bg-ut-bg",
                )}
              >
                {columns.map((c) => {
                  const alignCls =
                    c.align === "center"
                      ? "text-center"
                      : c.numeric || c.align === "right"
                        ? "text-right"
                        : "text-left";
                  return (
                    <td
                      key={c.key}
                      className={cn(pad, alignCls, c.numeric && "font-mono tabular-nums")}
                    >
                      {c.cell ? c.cell(row) : ((row as Record<string, unknown>)[c.key] as React.ReactNode)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../cn";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/** Prev/Next pager for use below a DataTable. Slice `rows` by page in the caller. */
export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div className={cn("flex items-center justify-end gap-3 pt-3", className)}>
      <span className="font-mono text-xs tabular-nums text-ut-muted">
        Page {page} of {pageCount}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded border border-ut-border p-1.5 text-ut-text transition-colors hover:bg-ut-bg disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="rounded border border-ut-border p-1.5 text-ut-text transition-colors hover:bg-ut-bg disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

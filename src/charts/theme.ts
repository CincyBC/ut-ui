/**
 * Brand chart palette. Components accept these token names — never raw hex.
 * Series order per the brand guide: petrol → sage → silver → isotope → amber → rust.
 */
export const chartPalette = {
  petrol: "#3E5F73",
  sage: "#83A28E",
  silver: "#9AA6A4",
  isotope: "#537A77",
  amber: "#C9A227",
  rust: "#B0533F",
  /** Highlight only: latest point, selection, forecast band. */
  glow: "#A1C4A2",
  reactor: "#4C7A5D",
} as const;

export type PaletteKey = keyof typeof chartPalette;

export const seriesOrder: PaletteKey[] = ["petrol", "sage", "silver", "isotope", "amber", "rust"];

export function seriesColor(index: number, override?: PaletteKey): string {
  return chartPalette[override ?? seriesOrder[index % seriesOrder.length]];
}

/** Axis/grid/tooltip styling shared by all charts; reads semantic vars at render. */
export const chartChrome = {
  axis: "var(--ut-text-muted, #596670)",
  grid: "var(--ut-border, #DDDFDA)",
  tooltipBg: "var(--ut-surface, #FFFFFF)",
  tooltipText: "var(--ut-text, #22333F)",
  tooltipBorder: "var(--ut-border, #DDDFDA)",
  fontMono: '"JetBrains Mono", monospace',
};

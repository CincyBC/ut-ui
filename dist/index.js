// src/cn.ts
function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

// src/components/Button.tsx
import { jsx } from "react/jsx-runtime";
var VARIANT = {
  primary: "bg-petrol text-paper-text hover:bg-petrol-light border border-transparent",
  // one accent button per view, max
  accent: "bg-reactor text-white hover:bg-isotope border border-transparent",
  ghost: "bg-transparent text-ut-text border border-ut-border hover:border-ut-accent hover:text-ut-accent"
};
var SIZE = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-[0.9375rem]"
};
function Button({ variant = "primary", size = "md", className, type, ...rest }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: type ?? "button",
      className: cn(
        "inline-flex items-center gap-2 rounded font-sans font-semibold transition-colors duration-150",
        "disabled:opacity-50 disabled:pointer-events-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ut-accent",
        VARIANT[variant],
        SIZE[size],
        className
      ),
      ...rest
    }
  );
}

// src/components/Kicker.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Kicker({ children, className }) {
  return /* @__PURE__ */ jsx2("div", { className: cn("kicker", className), children });
}

// src/components/Badge.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var TONE = {
  neutral: "bg-steel/15 text-ut-muted",
  green: "bg-reactor/15 text-reactor [[data-theme=dark]_&]:text-glow",
  teal: "bg-isotope/15 text-isotope",
  petrol: "bg-petrol/15 text-petrol-light",
  amber: "bg-amber-alert/15 text-amber-alert",
  rust: "bg-rust/15 text-rust"
};
function Badge({ children, tone = "neutral", className }) {
  return /* @__PURE__ */ jsx3(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wider",
        TONE[tone],
        className
      ),
      children
    }
  );
}
var DOT = {
  neutral: "bg-silver",
  green: "bg-reactor [[data-theme=dark]_&]:bg-glow",
  teal: "bg-isotope",
  petrol: "bg-petrol-light",
  amber: "bg-amber-alert",
  rust: "bg-rust"
};
function StatusBadge({ children, tone = "neutral", className }) {
  return /* @__PURE__ */ jsxs(Badge, { tone, className, children: [
    /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", className: cn("hex-frame inline-block h-2 w-2", DOT[tone]) }),
    children
  ] });
}

// src/components/Card.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function Card({ children, className, title, label, headerContent, live }) {
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: cn(
        "rounded-md border border-ut-border bg-ut-surface p-5 text-ut-text",
        live && "ut-glow-live",
        className
      ),
      children: [
        (title || label || headerContent) && /* @__PURE__ */ jsxs2("div", { className: "mb-4 flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxs2("div", { children: [
            label && /* @__PURE__ */ jsx4("div", { className: "text-xs font-semibold uppercase tracking-[0.12em] text-ut-muted", children: label }),
            title && /* @__PURE__ */ jsx4("h2", { className: "font-display text-xl font-semibold", children: title })
          ] }),
          headerContent
        ] }),
        children
      ]
    }
  );
}

// src/components/PageHeader.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function PageHeader({ title, kicker, description, actions, className }) {
  return /* @__PURE__ */ jsxs3("header", { className: cn("mb-6 flex flex-wrap items-end justify-between gap-4", className), children: [
    /* @__PURE__ */ jsxs3("div", { children: [
      kicker && /* @__PURE__ */ jsx5(Kicker, { className: "mb-1", children: kicker }),
      /* @__PURE__ */ jsx5("h1", { className: "font-display text-3xl font-semibold uppercase tracking-wide text-ut-text", children: title }),
      description && /* @__PURE__ */ jsx5("p", { className: "mt-1 max-w-prose text-sm text-ut-muted", children: description })
    ] }),
    actions && /* @__PURE__ */ jsx5("div", { className: "flex items-center gap-2", children: actions })
  ] });
}

// src/components/StatCard.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var ACCENT = {
  green: { chip: "bg-reactor/15", text: "text-reactor [[data-theme=dark]_&]:text-glow" },
  teal: { chip: "bg-isotope/15", text: "text-isotope" },
  petrol: { chip: "bg-petrol/15", text: "text-petrol-light" },
  amber: { chip: "bg-amber-alert/15", text: "text-amber-alert" },
  rust: { chip: "bg-rust/15", text: "text-rust" }
};
function StatCard({
  value,
  label,
  icon: Icon,
  accent = "petrol",
  delta,
  footer,
  live,
  className
}) {
  const a = ACCENT[accent];
  return /* @__PURE__ */ jsxs4(Card, { live, className: cn("flex h-full flex-col", className), children: [
    /* @__PURE__ */ jsxs4("div", { className: "flex items-start justify-between gap-3", children: [
      Icon && /* @__PURE__ */ jsx6("div", { className: cn("hex-frame p-3", a.chip), children: /* @__PURE__ */ jsx6(Icon, { "aria-hidden": "true", className: cn("h-6 w-6", a.text) }) }),
      /* @__PURE__ */ jsxs4("div", { className: "ml-auto text-right", children: [
        label && /* @__PURE__ */ jsx6("div", { className: "text-xs font-semibold uppercase tracking-[0.12em] text-ut-muted", children: label }),
        /* @__PURE__ */ jsx6("div", { className: "font-mono text-3xl tabular-nums", children: value }),
        delta && /* @__PURE__ */ jsx6(
          "div",
          {
            className: cn(
              "font-mono text-sm tabular-nums",
              delta.value >= 0 ? "text-ut-accent" : "text-rust"
            ),
            children: (delta.format ?? ((n) => `${n >= 0 ? "+" : ""}${n.toLocaleString()}`))(delta.value)
          }
        )
      ] })
    ] }),
    footer && /* @__PURE__ */ jsx6("div", { className: "mt-auto border-t border-ut-border pt-3 text-sm text-ut-muted", children: footer })
  ] });
}

// src/components/SegmentedControl.tsx
import { useRef } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
function normalize(o) {
  return typeof o === "string" ? { value: o, label: o } : o;
}
function SegmentedControl({
  options,
  value,
  onChange,
  size = "sm",
  ariaLabel,
  className
}) {
  const groupRef = useRef(null);
  const items = options.map(normalize);
  const onKeyDown = (e) => {
    const idx = items.findIndex((o) => o.value === value);
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % items.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + items.length) % items.length;
    if (next === -1) return;
    e.preventDefault();
    onChange(items[next].value);
    const buttons = groupRef.current?.querySelectorAll('[role="radio"]');
    buttons?.[next]?.focus();
  };
  return /* @__PURE__ */ jsx7(
    "div",
    {
      ref: groupRef,
      role: "radiogroup",
      "aria-label": ariaLabel,
      onKeyDown,
      className: cn(
        "inline-flex items-center gap-0.5 rounded border border-ut-border bg-ut-surface p-0.5",
        className
      ),
      children: items.map((o) => {
        const active = o.value === value;
        return /* @__PURE__ */ jsx7(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": active,
            tabIndex: active ? 0 : -1,
            onClick: () => onChange(o.value),
            className: cn(
              "rounded font-sans font-semibold transition-colors duration-150",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
              active ? "bg-petrol text-paper-text" : "text-ut-muted hover:text-ut-text"
            ),
            children: o.label
          },
          o.value
        );
      })
    }
  );
}

// src/components/Tabs.tsx
import { useId, useRef as useRef2 } from "react";
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
function Tabs({ tabs, value, onChange, children, ariaLabel, className }) {
  const id = useId();
  const listRef = useRef2(null);
  const onKeyDown = (e) => {
    const idx = tabs.findIndex((t) => t.value === value);
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
    if (next === -1) return;
    e.preventDefault();
    onChange(tabs[next].value);
    listRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };
  return /* @__PURE__ */ jsxs5("div", { className, children: [
    /* @__PURE__ */ jsx8(
      "div",
      {
        ref: listRef,
        role: "tablist",
        "aria-label": ariaLabel,
        onKeyDown,
        className: "flex gap-1 border-b border-ut-border",
        children: tabs.map((t) => {
          const active = t.value === value;
          return /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              role: "tab",
              id: `${id}-tab-${t.value}`,
              "aria-selected": active,
              "aria-controls": `${id}-panel`,
              tabIndex: active ? 0 : -1,
              onClick: () => onChange(t.value),
              className: cn(
                "-mb-px border-b-2 px-3 py-2 font-sans text-sm font-semibold transition-colors",
                active ? "border-ut-accent text-ut-text" : "border-transparent text-ut-muted hover:text-ut-text"
              ),
              children: t.label
            },
            t.value
          );
        })
      }
    ),
    children !== void 0 && /* @__PURE__ */ jsx8("div", { role: "tabpanel", id: `${id}-panel`, "aria-labelledby": `${id}-tab-${value}`, className: "pt-4", children })
  ] });
}

// src/components/Tooltip.tsx
import React3, { useId as useId2, useState } from "react";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
function Tooltip({ content, children, side = "top", className }) {
  const id = useId2();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs6(
    "span",
    {
      className: "relative inline-block",
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      onFocus: () => setOpen(true),
      onBlur: () => setOpen(false),
      children: [
        React3.cloneElement(children, {
          "aria-describedby": open ? id : void 0
        }),
        open && /* @__PURE__ */ jsx9(
          "span",
          {
            role: "tooltip",
            id,
            className: cn(
              "absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded border border-ut-border",
              "bg-ut-surface px-2 py-1 text-xs text-ut-text shadow-sm",
              side === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5",
              className
            ),
            children: content
          }
        )
      ]
    }
  );
}

// src/components/ThemeToggle.tsx
import { useEffect, useState as useState2 } from "react";
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
var THEME_STORAGE_KEY = "ut-theme";
function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function resolveTheme(mode) {
  return mode === "system" ? systemPrefersDark() ? "dark" : "light" : mode;
}
function applyTheme(mode) {
  document.documentElement.setAttribute("data-theme", resolveTheme(mode));
}
var themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var m=localStorage.getItem(k)||"system";var d=m==="dark"||(m==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-theme",d?"dark":"light");}catch(e){}})();`;
var ICONS = {
  light: /* @__PURE__ */ jsxs7("svg", { viewBox: "0 0 16 16", width: "14", height: "14", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
    /* @__PURE__ */ jsx10("circle", { cx: "8", cy: "8", r: "3.25" }),
    /* @__PURE__ */ jsx10(
      "path",
      {
        strokeLinecap: "round",
        d: "M8 0.75v1.5M8 13.75v1.5M15.25 8h-1.5M2.25 8H0.75M13.06 2.94l-1.06 1.06M3.99 12.01l-1.06 1.06M13.06 13.06l-1.06-1.06M3.99 3.99 2.94 2.94"
      }
    )
  ] }),
  dark: /* @__PURE__ */ jsx10("svg", { viewBox: "0 0 16 16", width: "14", height: "14", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ jsx10(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M14 9.35A6 6 0 0 1 6.65 2 6 6 0 1 0 14 9.35Z"
    }
  ) }),
  system: /* @__PURE__ */ jsxs7("svg", { viewBox: "0 0 16 16", width: "14", height: "14", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
    /* @__PURE__ */ jsx10("rect", { x: "0.75", y: "2.25", width: "14.5", height: "9", rx: "1", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx10("path", { strokeLinecap: "round", d: "M5.5 14.25h5M8 11.25v3" })
  ] })
};
var LABEL = { light: "Light", dark: "Dark", system: "System" };
var ORDER = ["light", "dark", "system"];
function ThemeToggle({ className }) {
  const [mode, setMode] = useState2("system");
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) ?? "system";
    setMode(stored);
  }, []);
  useEffect(() => {
    if (mode !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [mode]);
  const select2 = (next) => {
    setMode(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
  };
  return /* @__PURE__ */ jsx10(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Theme",
      className: cn("inline-flex items-center gap-0.5 rounded border border-ut-border bg-ut-surface p-0.5", className),
      children: ORDER.map((value) => {
        const active = mode === value;
        return /* @__PURE__ */ jsx10(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": active,
            "aria-label": LABEL[value],
            title: LABEL[value],
            onClick: () => select2(value),
            className: cn(
              "rounded p-1.5 transition-colors duration-150",
              active ? "bg-petrol text-paper-text" : "text-ut-muted hover:text-ut-text"
            ),
            children: ICONS[value]
          },
          value
        );
      })
    }
  );
}

// src/components/DataTable.tsx
import { useMemo, useState as useState3 } from "react";
import { jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
function defaultSortValue(row, key) {
  const v = row[key];
  if (typeof v === "number") return v;
  return v == null ? "" : String(v);
}
function DataTable({
  columns,
  rows,
  getRowKey,
  defaultSort,
  stickyHeader = true,
  density = "normal",
  onRowClick,
  emptyState,
  caption,
  className
}) {
  const [sort, setSort] = useState3(defaultSort ?? null);
  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    const val = col.sortValue ?? ((row) => defaultSortValue(row, col.key));
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = val(a);
      const bv = val(b);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv), void 0, { numeric: true }) * dir;
    });
  }, [rows, sort, columns]);
  const toggleSort = (key) => setSort((s) => s?.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
  const pad2 = density === "compact" ? "px-3 py-1.5" : "px-4 py-2.5";
  return /* @__PURE__ */ jsx11("div", { className: cn("overflow-x-auto", className), children: /* @__PURE__ */ jsxs8("table", { className: "w-full border-collapse text-sm text-ut-text", children: [
    caption && /* @__PURE__ */ jsx11("caption", { className: "sr-only", children: caption }),
    /* @__PURE__ */ jsx11("thead", { className: cn(stickyHeader && "sticky top-0 z-[1] bg-ut-surface"), children: /* @__PURE__ */ jsx11("tr", { children: columns.map((c) => {
      const isSorted = sort?.key === c.key;
      const alignCls = c.align === "center" ? "text-center" : c.numeric || c.align === "right" ? "text-right" : "text-left";
      return /* @__PURE__ */ jsx11(
        "th",
        {
          scope: "col",
          style: c.width ? { width: c.width } : void 0,
          "aria-sort": isSorted ? sort.dir === "asc" ? "ascending" : "descending" : void 0,
          className: cn(
            "border-b border-ut-border text-xs font-semibold uppercase tracking-[0.1em] text-ut-muted",
            pad2,
            alignCls
          ),
          children: c.sortable ? /* @__PURE__ */ jsxs8(
            "button",
            {
              type: "button",
              onClick: () => toggleSort(c.key),
              className: cn(
                "inline-flex items-center gap-1 uppercase tracking-[0.1em] hover:text-ut-text",
                isSorted && "text-ut-text"
              ),
              children: [
                c.header,
                /* @__PURE__ */ jsx11("span", { "aria-hidden": "true", className: "text-[0.65rem]", children: isSorted ? sort.dir === "asc" ? "\u25B2" : "\u25BC" : "\u25B3" })
              ]
            }
          ) : c.header
        },
        c.key
      );
    }) }) }),
    /* @__PURE__ */ jsx11("tbody", { children: sorted.length === 0 ? /* @__PURE__ */ jsx11("tr", { children: /* @__PURE__ */ jsx11("td", { colSpan: columns.length, className: cn("text-center text-ut-muted", pad2), children: emptyState ?? "No data" }) }) : sorted.map((row) => /* @__PURE__ */ jsx11(
      "tr",
      {
        onClick: onRowClick ? () => onRowClick(row) : void 0,
        className: cn(
          "border-b border-ut-border last:border-b-0",
          onRowClick && "cursor-pointer hover:bg-ut-bg"
        ),
        children: columns.map((c) => {
          const alignCls = c.align === "center" ? "text-center" : c.numeric || c.align === "right" ? "text-right" : "text-left";
          return /* @__PURE__ */ jsx11(
            "td",
            {
              className: cn(pad2, alignCls, c.numeric && "font-mono tabular-nums"),
              children: c.cell ? c.cell(row) : row[c.key]
            },
            c.key
          );
        })
      },
      getRowKey(row)
    )) })
  ] }) });
}

// src/charts/LineChart.tsx
import { useEffect as useEffect2, useRef as useRef4 } from "react";

// src/charts/d3.ts
import { select, pointer } from "d3-selection";
import { scaleBand, scalePoint, scaleLinear, scaleTime } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { min, max } from "d3-array";
import { line, area, stack, curveMonotoneX } from "d3-shape";

// src/charts/theme.ts
var chartPalette = {
  petrol: "#3E5F73",
  sage: "#83A28E",
  silver: "#9AA6A4",
  isotope: "#537A77",
  amber: "#C9A227",
  rust: "#B0533F",
  /** Highlight only: latest point, selection, forecast band. */
  glow: "#A1C4A2",
  reactor: "#4C7A5D"
};
var seriesOrder = ["petrol", "sage", "silver", "isotope", "amber", "rust"];
function seriesColor(index, override) {
  return chartPalette[override ?? seriesOrder[index % seriesOrder.length]];
}
var chartChrome = {
  axis: "var(--ut-text-muted, #596670)",
  grid: "var(--ut-border, #DDDFDA)",
  tooltipBg: "var(--ut-surface, #FFFFFF)",
  tooltipText: "var(--ut-text, #22333F)",
  tooltipBorder: "var(--ut-border, #DDDFDA)",
  fontMono: '"JetBrains Mono", monospace'
};

// src/charts/useMeasure.ts
import { useLayoutEffect, useRef as useRef3, useState as useState4 } from "react";
function useMeasure() {
  const ref = useRef3(null);
  const [width, setWidth] = useState4(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

// src/charts/LineChart.tsx
import { jsx as jsx12, jsxs as jsxs9 } from "react/jsx-runtime";
var MARGIN = { top: 16, right: 24, bottom: 44, left: 60 };
function LineChart({
  series,
  height = 360,
  yFormat = (n) => n.toLocaleString(),
  grid = true,
  tooltip = true,
  legend = true,
  zeroBaseline = false,
  ariaLabel,
  className
}) {
  const { ref, width } = useMeasure();
  const svgRef = useRef4(null);
  useEffect2(() => {
    if (width === 0 || series.length === 0) return;
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();
    const first = series[0].data[0]?.x;
    const allY = series.flatMap((s) => s.data.map((d) => d.y));
    let xPos;
    if (typeof first === "string") {
      const labels = Array.from(new Set(series.flatMap((s) => s.data.map((d) => String(d.x)))));
      const scale = scalePoint().domain(labels).range([MARGIN.left, width - MARGIN.right]);
      xPos = (v) => scale(String(v)) ?? 0;
      svg.append("g").attr("transform", `translate(0,${height - MARGIN.bottom})`).call(axisBottom(scale).tickSizeOuter(0)).attr("color", chartChrome.axis).selectAll("text").style("text-anchor", "end").style("font-family", chartChrome.fontMono).attr("dx", "-.8em").attr("dy", ".15em").attr("transform", "rotate(-45)");
    } else {
      const xs = series.flatMap((s) => s.data.map((d) => +d.x));
      const domain = [min(xs) ?? 0, max(xs) ?? 1];
      const range = [MARGIN.left, width - MARGIN.right];
      const scale = first instanceof Date ? scaleTime().domain(domain).range(range) : scaleLinear().domain(domain).range(range);
      xPos = (v) => scale(+v);
      svg.append("g").attr("transform", `translate(0,${height - MARGIN.bottom})`).call(axisBottom(scale).ticks(width / 90).tickSizeOuter(0)).attr("color", chartChrome.axis).selectAll("text").style("font-family", chartChrome.fontMono);
    }
    const yMin = min(allY) ?? 0;
    const y = scaleLinear().domain([zeroBaseline ? Math.min(0, yMin) : yMin, max(allY) ?? 0]).nice().range([height - MARGIN.bottom, MARGIN.top]);
    const yAxis = svg.append("g").attr("transform", `translate(${MARGIN.left},0)`).call(axisLeft(y).ticks(height / 40).tickFormat((d) => yFormat(d))).attr("color", chartChrome.axis).call((g) => g.select(".domain").remove());
    yAxis.selectAll("text").style("font-family", chartChrome.fontMono);
    if (grid) {
      yAxis.call(
        (g) => g.selectAll(".tick line").clone().attr("x2", width - MARGIN.left - MARGIN.right).attr("stroke", chartChrome.grid).attr("stroke-opacity", 0.6)
      );
    }
    const tip = tooltip ? select(ref.current).append("div").attr("class", "ut-chart-tooltip").style("position", "absolute").style("visibility", "hidden").style("background", chartChrome.tooltipBg).style("color", chartChrome.tooltipText).style("border", `1px solid ${chartChrome.tooltipBorder}`).style("padding", "6px 8px").style("border-radius", "4px").style("font-size", "12px").style("font-family", chartChrome.fontMono).style("pointer-events", "none").style("z-index", "10") : null;
    series.forEach((s, i) => {
      const color = seriesColor(i, s.color);
      const line2 = line().x((d) => xPos(d.x)).y((d) => y(d.y)).curve(curveMonotoneX);
      if (s.area) {
        const area2 = area().x((d) => xPos(d.x)).y0(height - MARGIN.bottom).y1((d) => y(d.y)).curve(curveMonotoneX);
        svg.append("path").datum(s.data).attr("class", "series-area").attr("data-series-id", s.id).attr("fill", color).attr("fill-opacity", 0.12).attr("d", area2);
      }
      svg.append("path").datum(s.data).attr("class", "series-line").attr("data-series-id", s.id).attr("fill", "none").attr("stroke", color).attr("stroke-width", 2).attr("stroke-dasharray", s.dashed ? "5,4" : null).attr("d", line2);
      svg.selectAll(`.series-point-${i}`).data(s.data).enter().append("circle").attr("class", `series-point-${i}`).attr("data-series-id", s.id).attr("cx", (d) => xPos(d.x)).attr("cy", (d) => y(d.y)).attr("r", s.data.length > 60 ? 0 : 3).attr("fill", color).on("mouseover", function(_event, d) {
        if (!tip) return;
        tip.style("visibility", "visible").html(`<strong>${s.label ?? s.id}</strong><br/>${yFormat(d.y)}`);
        select(this).attr("r", 6);
      }).on("mousemove", (event) => {
        if (!tip) return;
        const [px, py] = pointer(event, ref.current);
        const isRight = px > width / 2;
        tip.style("top", `${py - 40}px`).style("left", `${isRight ? px - 120 : px + 20}px`);
      }).on("mouseout", function() {
        if (!tip) return;
        tip.style("visibility", "hidden");
        select(this).attr("r", s.data.length > 60 ? 0 : 3);
      });
    });
    return () => {
      tip?.remove();
    };
  }, [series, width, height, yFormat, grid, tooltip, zeroBaseline]);
  return /* @__PURE__ */ jsxs9("div", { ref, className: cn("relative w-full", className), children: [
    /* @__PURE__ */ jsx12("svg", { ref: svgRef, role: "img", "aria-label": ariaLabel, width, height, className: "overflow-visible" }),
    legend && series.length > 1 && /* @__PURE__ */ jsx12("div", { className: "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ut-muted", children: series.map((s, i) => /* @__PURE__ */ jsxs9("span", { className: "inline-flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsx12(
        "span",
        {
          "aria-hidden": "true",
          className: "inline-block h-2 w-4 rounded-sm",
          style: { background: seriesColor(i, s.color) }
        }
      ),
      s.label ?? s.id
    ] }, s.id)) })
  ] });
}

// src/charts/BarChart.tsx
import { useEffect as useEffect3, useRef as useRef5 } from "react";
import { jsx as jsx13, jsxs as jsxs10 } from "react/jsx-runtime";
var MARGIN2 = { top: 16, right: 24, bottom: 44, left: 60 };
function BarChart({
  series,
  height = 360,
  stacked = true,
  yFormat = (n) => n.toLocaleString(),
  legend = true,
  tooltip = true,
  ariaLabel,
  className
}) {
  const { ref, width } = useMeasure();
  const svgRef = useRef5(null);
  useEffect3(() => {
    if (width === 0 || series.length === 0) return;
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();
    const categories = Array.from(new Set(series.flatMap((s) => s.data.map((d) => d.category))));
    const byCat = categories.map((category) => {
      const row = { category };
      for (const s of series) row[s.id] = s.data.find((d) => d.category === category)?.value ?? 0;
      return row;
    });
    const keys = series.map((s) => s.id);
    const color = new Map(series.map((s, i) => [s.id, seriesColor(i, s.color)]));
    const label = new Map(series.map((s) => [s.id, s.label ?? s.id]));
    const x = scaleBand().domain(categories).range([MARGIN2.left, width - MARGIN2.right]).padding(0.2);
    const useStack = stacked && series.length > 1;
    const stackSeries = useStack ? stack().keys(keys)(byCat) : null;
    const yMax = useStack ? max(stackSeries, (layer) => max(layer, (d) => d[1])) ?? 0 : max(series.flatMap((s) => s.data.map((d) => d.value))) ?? 0;
    const y = scaleLinear().domain([0, yMax]).nice().range([height - MARGIN2.bottom, MARGIN2.top]);
    svg.append("g").attr("transform", `translate(0,${height - MARGIN2.bottom})`).call(axisBottom(x).tickSizeOuter(0)).attr("color", chartChrome.axis).selectAll("text").style("text-anchor", "end").style("font-family", chartChrome.fontMono).attr("dx", "-.8em").attr("dy", ".15em").attr("transform", "rotate(-45)");
    svg.append("g").attr("transform", `translate(${MARGIN2.left},0)`).call(axisLeft(y).ticks(height / 40).tickFormat((d) => yFormat(d))).attr("color", chartChrome.axis).call((g) => g.select(".domain").remove()).call(
      (g) => g.selectAll(".tick line").clone().attr("x2", width - MARGIN2.left - MARGIN2.right).attr("stroke", chartChrome.grid).attr("stroke-opacity", 0.6)
    ).selectAll("text").style("font-family", chartChrome.fontMono);
    const tip = tooltip ? select(ref.current).append("div").attr("class", "ut-chart-tooltip").style("position", "absolute").style("visibility", "hidden").style("background", chartChrome.tooltipBg).style("color", chartChrome.tooltipText).style("border", `1px solid ${chartChrome.tooltipBorder}`).style("padding", "6px 8px").style("border-radius", "4px").style("font-size", "12px").style("font-family", chartChrome.fontMono).style("pointer-events", "none").style("z-index", "10") : null;
    const showTip = (event, seriesId, category, value) => {
      if (!tip) return;
      tip.style("visibility", "visible").html(`<strong>${category}</strong><br/>${label.get(seriesId)}: ${yFormat(value)}`);
      const [px, py] = pointer(event, ref.current);
      const isRight = px > width / 2;
      tip.style("top", `${py - 40}px`).style("left", `${isRight ? px - 120 : px + 20}px`);
    };
    if (useStack) {
      svg.append("g").selectAll("g").data(stackSeries).join("g").attr("fill", (d) => color.get(d.key)).attr("data-series-id", (d) => d.key).selectAll("rect").data((layer) => layer.map((d) => ({ d, key: layer.key }))).join("rect").attr("class", "series-bar").attr("x", ({ d }) => x(d.data.category)).attr("y", ({ d }) => y(d[1])).attr("height", ({ d }) => y(d[0]) - y(d[1])).attr("width", x.bandwidth()).on("pointerover pointermove", function(event, { d, key }) {
        showTip(event, key, d.data.category, d[1] - d[0]);
        select(this).style("opacity", 0.85);
      }).on("pointerout", function() {
        tip?.style("visibility", "hidden");
        select(this).style("opacity", 1);
      });
    } else {
      const inner = scaleBand().domain(keys).range([0, x.bandwidth()]).padding(series.length > 1 ? 0.1 : 0);
      svg.append("g").selectAll("g").data(series).join("g").attr("fill", (s, i) => seriesColor(i, s.color)).attr("data-series-id", (s) => s.id).selectAll("rect").data((s) => s.data.map((d) => ({ ...d, sid: s.id }))).join("rect").attr("class", "series-bar").attr("x", (d) => x(d.category) + inner(d.sid)).attr("y", (d) => y(d.value)).attr("height", (d) => y(0) - y(d.value)).attr("width", inner.bandwidth()).on("pointerover pointermove", function(event, d) {
        showTip(event, d.sid, d.category, d.value);
        select(this).style("opacity", 0.85);
      }).on("pointerout", function() {
        tip?.style("visibility", "hidden");
        select(this).style("opacity", 1);
      });
    }
    return () => {
      tip?.remove();
    };
  }, [series, width, height, stacked, yFormat, tooltip]);
  return /* @__PURE__ */ jsxs10("div", { ref, className: cn("relative w-full", className), children: [
    /* @__PURE__ */ jsx13("svg", { ref: svgRef, role: "img", "aria-label": ariaLabel, width, height, className: "overflow-visible" }),
    legend && series.length > 1 && /* @__PURE__ */ jsx13("div", { className: "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ut-muted", children: series.map((s, i) => /* @__PURE__ */ jsxs10("span", { className: "inline-flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsx13(
        "span",
        {
          "aria-hidden": "true",
          className: "inline-block h-2 w-4 rounded-sm",
          style: { background: seriesColor(i, s.color) }
        }
      ),
      s.label ?? s.id
    ] }, s.id)) })
  ] });
}

// src/components/FormField.tsx
import React8 from "react";
import { jsx as jsx14, jsxs as jsxs11 } from "react/jsx-runtime";
function FormField({ label, htmlFor, hint, error, children, className }) {
  const control = React8.cloneElement(children, {
    "aria-invalid": error ? true : void 0
  });
  return /* @__PURE__ */ jsxs11("div", { className: cn("flex flex-col gap-1.5", className), children: [
    /* @__PURE__ */ jsx14("label", { htmlFor, className: "text-sm font-medium text-ut-text", children: label }),
    control,
    error ? /* @__PURE__ */ jsx14("p", { className: "text-xs font-medium text-rust", children: error }) : hint ? /* @__PURE__ */ jsx14("p", { className: "text-xs text-ut-muted", children: hint }) : null
  ] });
}

// src/components/Input.tsx
import React9 from "react";
import { jsx as jsx15, jsxs as jsxs12 } from "react/jsx-runtime";
var Input = React9.forwardRef(function Input2({ icon, type, className, ...props }, ref) {
  const isNumeric = type === "number";
  return /* @__PURE__ */ jsxs12("div", { className: "relative", children: [
    icon && /* @__PURE__ */ jsx15("span", { className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ut-muted", children: icon }),
    /* @__PURE__ */ jsx15(
      "input",
      {
        ref,
        type,
        className: cn(
          "w-full rounded border border-ut-border bg-ut-surface px-3 py-2 text-sm text-ut-text placeholder:text-ut-muted",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-ut-accent",
          "aria-[invalid=true]:border-rust",
          isNumeric && "font-mono tabular-nums",
          Boolean(icon) && "pl-9",
          className
        ),
        ...props
      }
    )
  ] });
});

// src/components/Select.tsx
import { ChevronDown } from "lucide-react";
import { jsx as jsx16, jsxs as jsxs13 } from "react/jsx-runtime";
function Select({ options, value, onChange, className, ...props }) {
  return /* @__PURE__ */ jsxs13("div", { className: "relative", children: [
    /* @__PURE__ */ jsx16(
      "select",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        className: cn(
          "w-full appearance-none rounded border border-ut-border bg-ut-surface px-3 py-2 pr-9 text-sm text-ut-text",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-ut-accent",
          "aria-[invalid=true]:border-rust",
          className
        ),
        ...props,
        children: options.map((o) => /* @__PURE__ */ jsx16("option", { value: o.value, children: o.label }, o.value))
      }
    ),
    /* @__PURE__ */ jsx16(
      ChevronDown,
      {
        size: 16,
        "aria-hidden": "true",
        className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ut-muted"
      }
    )
  ] });
}

// src/components/Checkbox.tsx
import { useId as useId3 } from "react";
import { Check } from "lucide-react";
import { jsx as jsx17, jsxs as jsxs14 } from "react/jsx-runtime";
function Checkbox({ label, checked, onChange, disabled, className }) {
  const id = useId3();
  return /* @__PURE__ */ jsxs14("label", { htmlFor: id, className: cn("inline-flex items-center gap-2 text-sm text-ut-text", className), children: [
    /* @__PURE__ */ jsxs14("span", { className: "relative inline-flex h-4 w-4 shrink-0 items-center justify-center", children: [
      /* @__PURE__ */ jsx17(
        "input",
        {
          id,
          type: "checkbox",
          checked,
          disabled,
          onChange: (e) => onChange(e.target.checked),
          className: "peer absolute inset-0 h-4 w-4 cursor-pointer appearance-none rounded border border-ut-border bg-ut-surface checked:border-ut-accent checked:bg-ut-accent disabled:cursor-not-allowed disabled:opacity-50"
        }
      ),
      /* @__PURE__ */ jsx17(
        Check,
        {
          size: 12,
          strokeWidth: 3,
          "aria-hidden": "true",
          className: "pointer-events-none relative hidden text-ut-bg peer-checked:block"
        }
      )
    ] }),
    label
  ] });
}
function Radio({ label, name, value, checked, onChange, disabled, className }) {
  const id = useId3();
  return /* @__PURE__ */ jsxs14("label", { htmlFor: id, className: cn("inline-flex items-center gap-2 text-sm text-ut-text", className), children: [
    /* @__PURE__ */ jsxs14("span", { className: "relative inline-flex h-4 w-4 shrink-0 items-center justify-center", children: [
      /* @__PURE__ */ jsx17(
        "input",
        {
          id,
          type: "radio",
          name,
          value,
          checked,
          disabled,
          onChange: () => onChange(value),
          className: "peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-ut-border bg-ut-surface checked:border-ut-accent disabled:cursor-not-allowed disabled:opacity-50"
        }
      ),
      /* @__PURE__ */ jsx17("span", { className: "pointer-events-none absolute hidden h-2 w-2 rounded-full bg-ut-accent peer-checked:block" })
    ] }),
    label
  ] });
}
function Switch({ label, checked, onChange, disabled, className }) {
  return /* @__PURE__ */ jsxs14("label", { className: cn("inline-flex items-center gap-2 text-sm text-ut-text", className), children: [
    /* @__PURE__ */ jsx17(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-label": typeof label === "string" ? label : void 0,
        disabled,
        onClick: () => onChange(!checked),
        className: cn(
          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-ut-accent" : "bg-steel/40"
        ),
        children: /* @__PURE__ */ jsx17(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "inline-block h-3.5 w-3.5 transform rounded-full bg-ut-surface transition-transform",
              checked ? "translate-x-4" : "translate-x-1"
            )
          }
        )
      }
    ),
    label
  ] });
}

// src/components/Modal.tsx
import { useEffect as useEffect4, useId as useId4, useRef as useRef6 } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { jsx as jsx18, jsxs as jsxs15 } from "react/jsx-runtime";
function useEscapeToClose(open, onClose) {
  useEffect4(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);
}
function useFocusTrap(open, containerRef) {
  useEffect4(() => {
    if (!open) return;
    const container = containerRef.current;
    container?.focus();
    const onKeyDown = (e) => {
      if (e.key !== "Tab" || !container) return;
      const focusable = container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, containerRef]);
}
function Modal({ open, onClose, title, children, className }) {
  const titleId = useId4();
  const dialogRef = useRef6(null);
  useEscapeToClose(open, onClose);
  useFocusTrap(open, dialogRef);
  if (!open) return null;
  return createPortal(
    /* @__PURE__ */ jsxs15("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx18("div", { "data-testid": "modal-backdrop", className: "absolute inset-0 bg-gunmetal/60", onClick: onClose }),
      /* @__PURE__ */ jsxs15(
        "div",
        {
          ref: dialogRef,
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": titleId,
          tabIndex: -1,
          className: cn(
            "relative z-10 max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto overscroll-contain rounded-md border border-ut-border bg-ut-surface p-6 text-ut-text shadow-lg focus:outline-none",
            className
          ),
          children: [
            /* @__PURE__ */ jsxs15("div", { className: "mb-4 flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsx18("h2", { id: titleId, className: "font-display text-lg font-semibold", children: title }),
              /* @__PURE__ */ jsx18(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "aria-label": "Close",
                  className: "rounded text-ut-muted transition-colors hover:text-ut-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ut-accent",
                  children: /* @__PURE__ */ jsx18(X, { size: 18 })
                }
              )
            ] }),
            children
          ]
        }
      )
    ] }),
    document.body
  );
}
function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel"
}) {
  return /* @__PURE__ */ jsxs15(Modal, { open, onClose, title, children: [
    /* @__PURE__ */ jsx18("p", { className: "mb-6 text-sm text-ut-muted", children: message }),
    /* @__PURE__ */ jsxs15("div", { className: "flex justify-end gap-3", children: [
      /* @__PURE__ */ jsx18(Button, { variant: "ghost", size: "sm", onClick: onClose, children: cancelLabel }),
      /* @__PURE__ */ jsx18(Button, { variant: "accent", size: "sm", onClick: onConfirm, children: confirmLabel })
    ] })
  ] });
}

// src/components/Toast.tsx
import { createContext, useCallback, useContext, useEffect as useEffect5, useRef as useRef7, useState as useState5 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { CheckCircle2, AlertTriangle, Info, X as X2 } from "lucide-react";
import { jsx as jsx19, jsxs as jsxs16 } from "react/jsx-runtime";
var ToastContext = createContext(null);
var ICON = {
  info: Info,
  success: CheckCircle2,
  error: AlertTriangle
};
var TONE2 = {
  info: "border-ut-border text-ut-text",
  success: "border-reactor/40 text-reactor [[data-theme=dark]_&]:text-glow",
  error: "border-rust/40 text-rust"
};
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState5([]);
  const [mounted, setMounted] = useState5(false);
  const nextId = useRef7(0);
  useEffect5(() => {
    setMounted(true);
  }, []);
  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);
  const showToast = useCallback(
    ({ message, tone = "info", durationMs = 4e3 }) => {
      const id = `toast-${nextId.current++}`;
      setToasts((current) => [...current, { id, message, tone, durationMs }]);
      window.setTimeout(() => dismiss(id), durationMs);
    },
    [dismiss]
  );
  return /* @__PURE__ */ jsxs16(ToastContext.Provider, { value: { showToast }, children: [
    children,
    mounted && createPortal2(
      /* @__PURE__ */ jsx19("div", { role: "status", "aria-live": "polite", className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2", children: toasts.map((toast) => {
        const Icon = ICON[toast.tone];
        return /* @__PURE__ */ jsxs16(
          "div",
          {
            className: cn(
              "flex items-center gap-2 rounded border bg-ut-surface px-4 py-2.5 text-sm shadow-lg",
              TONE2[toast.tone]
            ),
            children: [
              /* @__PURE__ */ jsx19(Icon, { size: 16, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx19("span", { className: "text-ut-text", children: toast.message }),
              /* @__PURE__ */ jsx19(
                "button",
                {
                  type: "button",
                  "aria-label": "Dismiss",
                  onClick: () => dismiss(toast.id),
                  className: "ml-2 text-ut-muted hover:text-ut-text",
                  children: /* @__PURE__ */ jsx19(X2, { size: 14 })
                }
              )
            ]
          },
          toast.id
        );
      }) }),
      document.body
    )
  ] });
}
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

// src/components/Dropdown.tsx
import { cloneElement, useEffect as useEffect6, useRef as useRef8, useState as useState6 } from "react";
import { jsx as jsx20, jsxs as jsxs17 } from "react/jsx-runtime";
function Dropdown({ trigger, items, align = "start", className }) {
  const [open, setOpen] = useState6(false);
  const containerRef = useRef8(null);
  const menuRef = useRef8(null);
  useEffect6(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
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
  useEffect6(() => {
    if (open) {
      menuRef.current?.querySelectorAll('[role="menuitem"]')[0]?.focus();
    }
  }, [open]);
  const onMenuKeyDown = (e) => {
    const menuItems = Array.from(menuRef.current?.querySelectorAll('[role="menuitem"]') ?? []);
    const idx = menuItems.indexOf(document.activeElement);
    let next = -1;
    if (e.key === "ArrowDown") next = (idx + 1) % menuItems.length;
    if (e.key === "ArrowUp") next = (idx - 1 + menuItems.length) % menuItems.length;
    if (next === -1) return;
    e.preventDefault();
    menuItems[next]?.focus();
  };
  const triggerElement = cloneElement(trigger, {
    onClick: (e) => {
      trigger.props.onClick?.(e);
      setOpen((prev) => !prev);
    },
    "aria-haspopup": true,
    "aria-expanded": open
  });
  return /* @__PURE__ */ jsxs17("div", { ref: containerRef, className: cn("relative inline-block", className), children: [
    triggerElement,
    open && /* @__PURE__ */ jsx20(
      "div",
      {
        ref: menuRef,
        role: "menu",
        onKeyDown: onMenuKeyDown,
        className: cn(
          "absolute z-40 mt-1 min-w-[10rem] rounded border border-ut-border bg-ut-surface py-1 shadow-lg",
          align === "end" ? "right-0" : "left-0"
        ),
        children: items.map((item, i) => /* @__PURE__ */ jsx20(
          "button",
          {
            type: "button",
            role: "menuitem",
            disabled: item.disabled,
            tabIndex: -1,
            onClick: () => {
              item.onSelect();
              setOpen(false);
            },
            className: "flex w-full items-center px-3 py-1.5 text-left text-sm text-ut-text transition-colors hover:bg-ut-bg focus:bg-ut-bg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            children: item.label
          },
          i
        ))
      }
    )
  ] });
}

// src/components/Tag.tsx
import { useState as useState7 } from "react";
import { X as X3 } from "lucide-react";
import { jsx as jsx21, jsxs as jsxs18 } from "react/jsx-runtime";
function Tag({ label, onRemove, className }) {
  return /* @__PURE__ */ jsxs18(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full border border-ut-border bg-ut-surface px-2.5 py-0.5 text-xs font-medium text-ut-text",
        className
      ),
      children: [
        label,
        onRemove && /* @__PURE__ */ jsx21(
          "button",
          {
            type: "button",
            onClick: onRemove,
            "aria-label": `Remove ${label}`,
            className: "text-ut-muted transition-colors hover:text-ut-text",
            children: /* @__PURE__ */ jsx21(X3, { size: 12 })
          }
        )
      ]
    }
  );
}
function TagInput({ value, onChange, ariaLabel = "Tags", placeholder = "Add\u2026", className }) {
  const [draft, setDraft] = useState7("");
  const addTag = () => {
    const trimmed = draft.trim();
    if (!trimmed || value.includes(trimmed)) {
      setDraft("");
      return;
    }
    onChange([...value, trimmed]);
    setDraft("");
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };
  return /* @__PURE__ */ jsxs18(
    "div",
    {
      className: cn(
        "flex flex-wrap items-center gap-1.5 rounded border border-ut-border bg-ut-surface p-1.5 focus-within:ring-1 focus-within:ring-ut-accent",
        className
      ),
      children: [
        value.map((tag) => /* @__PURE__ */ jsx21(Tag, { label: tag, onRemove: () => onChange(value.filter((t) => t !== tag)) }, tag)),
        /* @__PURE__ */ jsx21(
          "input",
          {
            "aria-label": ariaLabel,
            value: draft,
            placeholder: value.length === 0 ? placeholder : void 0,
            onChange: (e) => setDraft(e.target.value),
            onKeyDown,
            className: "min-w-[6rem] flex-1 bg-transparent px-1 py-0.5 text-sm text-ut-text placeholder:text-ut-muted focus:outline-none"
          }
        )
      ]
    }
  );
}

// src/components/Slider.tsx
import { jsx as jsx22, jsxs as jsxs19 } from "react/jsx-runtime";
function Slider({ min: min2, max: max2, value, onChange, step = 1, ariaLabel, showValue, className }) {
  return /* @__PURE__ */ jsxs19("div", { className: cn("flex items-center gap-3", className), children: [
    /* @__PURE__ */ jsx22(
      "input",
      {
        type: "range",
        "aria-label": ariaLabel,
        min: min2,
        max: max2,
        step,
        value,
        onChange: (e) => onChange(Number(e.target.value)),
        className: "h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-steel/30 accent-ut-accent"
      }
    ),
    showValue && /* @__PURE__ */ jsx22("span", { className: "w-10 text-right font-mono text-sm tabular-nums text-ut-text", children: value })
  ] });
}

// src/components/Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { jsx as jsx23, jsxs as jsxs20 } from "react/jsx-runtime";
function Pagination({ page, pageCount, onPageChange, className }) {
  if (pageCount <= 1) return null;
  return /* @__PURE__ */ jsxs20("div", { className: cn("flex items-center justify-end gap-3 pt-3", className), children: [
    /* @__PURE__ */ jsxs20("span", { className: "font-mono text-xs tabular-nums text-ut-muted", children: [
      "Page ",
      page,
      " of ",
      pageCount
    ] }),
    /* @__PURE__ */ jsxs20("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsx23(
        "button",
        {
          type: "button",
          "aria-label": "Previous page",
          disabled: page <= 1,
          onClick: () => onPageChange(page - 1),
          className: "rounded border border-ut-border p-1.5 text-ut-text transition-colors hover:bg-ut-bg disabled:cursor-not-allowed disabled:opacity-40",
          children: /* @__PURE__ */ jsx23(ChevronLeft, { size: 14 })
        }
      ),
      /* @__PURE__ */ jsx23(
        "button",
        {
          type: "button",
          "aria-label": "Next page",
          disabled: page >= pageCount,
          onClick: () => onPageChange(page + 1),
          className: "rounded border border-ut-border p-1.5 text-ut-text transition-colors hover:bg-ut-bg disabled:cursor-not-allowed disabled:opacity-40",
          children: /* @__PURE__ */ jsx23(ChevronRight, { size: 14 })
        }
      )
    ] })
  ] });
}

// src/components/Stepper.tsx
import { Check as Check2 } from "lucide-react";
import { jsx as jsx24, jsxs as jsxs21 } from "react/jsx-runtime";
function Stepper({ steps, currentIndex, className }) {
  return /* @__PURE__ */ jsx24("ol", { className: cn("flex items-start", className), children: steps.map((step, i) => {
    const complete = i < currentIndex;
    const current = i === currentIndex;
    return /* @__PURE__ */ jsxs21("li", { className: "flex flex-1 items-center last:flex-none", children: [
      /* @__PURE__ */ jsxs21("div", { className: "flex flex-col items-center gap-1.5", "data-complete": complete, "aria-current": current ? "step" : void 0, children: [
        /* @__PURE__ */ jsx24(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "hex-frame flex h-7 w-7 items-center justify-center text-xs font-semibold",
              complete ? "bg-ut-accent text-ut-bg" : current ? "border border-ut-accent text-ut-accent" : "border border-ut-border text-ut-muted"
            ),
            children: complete ? /* @__PURE__ */ jsx24(Check2, { size: 14 }) : i + 1
          }
        ),
        /* @__PURE__ */ jsx24("span", { className: cn("text-xs font-medium", current ? "text-ut-text" : "text-ut-muted"), children: step.label })
      ] }),
      i < steps.length - 1 && /* @__PURE__ */ jsx24("div", { className: cn("mx-2 mt-[-1.25rem] h-px flex-1", complete ? "bg-ut-accent" : "bg-ut-border") })
    ] }, step.label);
  }) });
}

// src/components/Timeline.tsx
import { jsx as jsx25, jsxs as jsxs22 } from "react/jsx-runtime";
function Timeline({ items, className }) {
  return /* @__PURE__ */ jsx25("ol", { className: cn("flex flex-col", className), children: items.map((item, i) => /* @__PURE__ */ jsxs22("li", { className: "relative flex gap-4 pb-6 last:pb-0", children: [
    i < items.length - 1 && /* @__PURE__ */ jsx25("span", { "aria-hidden": "true", className: "absolute left-[0.5625rem] top-5 h-full w-px bg-ut-border" }),
    /* @__PURE__ */ jsx25("span", { "aria-hidden": "true", className: "hex-frame mt-1 h-3.5 w-3.5 shrink-0 bg-ut-accent" }),
    /* @__PURE__ */ jsxs22("div", { className: "flex flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxs22("div", { className: "flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsx25("span", { className: "text-sm font-medium text-ut-text", children: item.title }),
        /* @__PURE__ */ jsx25("span", { className: "font-mono text-xs tabular-nums text-ut-muted", children: item.timestamp })
      ] }),
      item.description && /* @__PURE__ */ jsx25("p", { className: "text-sm text-ut-muted", children: item.description })
    ] })
  ] }, item.id)) });
}

// src/components/Avatar.tsx
import { jsx as jsx26 } from "react/jsx-runtime";
var SIZE2 = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base"
};
function initials(name) {
  return name.split(" ").filter(Boolean).map((part) => part[0]?.toUpperCase()).slice(0, 2).join("");
}
function Avatar({ name, src, size = "md", className }) {
  return /* @__PURE__ */ jsx26(
    "span",
    {
      className: cn(
        "hex-frame flex shrink-0 items-center justify-center overflow-hidden border border-ut-border bg-ut-surface font-mono font-medium text-ut-text",
        SIZE2[size],
        className
      ),
      children: src ? /* @__PURE__ */ jsx26("img", { src, alt: name, className: "h-full w-full object-cover" }) : initials(name)
    }
  );
}

// src/components/DatePicker.tsx
import { jsx as jsx27 } from "react/jsx-runtime";
function DatePicker({ id, value, onChange, ariaLabel, min: min2, max: max2, className }) {
  return /* @__PURE__ */ jsx27(
    "input",
    {
      id,
      type: "date",
      "aria-label": ariaLabel,
      value,
      min: min2,
      max: max2,
      onChange: (e) => onChange(e.target.value),
      className: cn(
        "w-full rounded border border-ut-border bg-ut-surface px-3 py-2 font-mono text-sm tabular-nums text-ut-text",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-ut-accent",
        "aria-[invalid=true]:border-rust",
        className
      )
    }
  );
}

// src/components/Calendar.tsx
import { ChevronLeft as ChevronLeft2, ChevronRight as ChevronRight2 } from "lucide-react";
import { jsx as jsx28, jsxs as jsxs23 } from "react/jsx-runtime";
var MONTH_NAMES = [
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
  "December"
];
var WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function pad(n) {
  return String(n).padStart(2, "0");
}
function isoDate(year, month, day) {
  return `${year}-${pad(month)}-${pad(day)}`;
}
function Calendar({ year, month, events, onNavigate, onDateClick, className }) {
  const firstOfMonth = new Date(Date.UTC(year, month - 1, 1));
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const leadingBlanks = firstOfMonth.getUTCDay();
  const eventsByDate = /* @__PURE__ */ new Map();
  for (const event of events) {
    const list = eventsByDate.get(event.date) ?? [];
    list.push(event);
    eventsByDate.set(event.date, list);
  }
  const cells = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];
  return /* @__PURE__ */ jsxs23("div", { className: cn("flex flex-col gap-3", className), children: [
    /* @__PURE__ */ jsxs23("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs23("h2", { className: "font-display text-lg font-semibold text-ut-text", children: [
        MONTH_NAMES[month - 1],
        " ",
        year
      ] }),
      /* @__PURE__ */ jsxs23("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx28(
          "button",
          {
            type: "button",
            "aria-label": "Previous month",
            onClick: () => onNavigate("prev"),
            className: "rounded border border-ut-border p-1.5 text-ut-text transition-colors hover:bg-ut-bg",
            children: /* @__PURE__ */ jsx28(ChevronLeft2, { size: 14 })
          }
        ),
        /* @__PURE__ */ jsx28(
          "button",
          {
            type: "button",
            "aria-label": "Next month",
            onClick: () => onNavigate("next"),
            className: "rounded border border-ut-border p-1.5 text-ut-text transition-colors hover:bg-ut-bg",
            children: /* @__PURE__ */ jsx28(ChevronRight2, { size: 14 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs23("div", { className: "grid grid-cols-7 gap-px overflow-hidden rounded border border-ut-border bg-ut-border text-xs", children: [
      WEEKDAYS.map((wd) => /* @__PURE__ */ jsx28("div", { className: "bg-ut-surface px-2 py-1.5 text-center font-semibold uppercase tracking-wide text-ut-muted", children: wd }, wd)),
      cells.map((day, i) => {
        if (day === null) return /* @__PURE__ */ jsx28("div", { className: "min-h-20 bg-ut-bg" }, `blank-${i}`);
        const date = isoDate(year, month, day);
        const dayEvents = eventsByDate.get(date) ?? [];
        return /* @__PURE__ */ jsxs23(
          "button",
          {
            type: "button",
            onClick: () => onDateClick?.(date),
            className: "flex min-h-20 flex-col items-start gap-1 bg-ut-surface p-1.5 text-left transition-colors hover:bg-ut-bg",
            children: [
              /* @__PURE__ */ jsx28("span", { className: "font-mono text-ut-text", children: day }),
              dayEvents.map((e, idx) => /* @__PURE__ */ jsx28(
                "span",
                {
                  className: "w-full truncate rounded bg-ut-accent/15 px-1 py-0.5 text-[0.6875rem] text-ut-accent",
                  children: e.label
                },
                idx
              ))
            ]
          },
          date
        );
      })
    ] })
  ] });
}
export {
  Avatar,
  Badge,
  BarChart,
  Button,
  Calendar,
  Card,
  Checkbox,
  ConfirmDialog,
  DataTable,
  DatePicker,
  Dropdown,
  FormField,
  Input,
  Kicker,
  LineChart,
  Modal,
  PageHeader,
  Pagination,
  Radio,
  SegmentedControl,
  Select,
  Slider,
  StatCard,
  StatusBadge,
  Stepper,
  Switch,
  THEME_STORAGE_KEY,
  Tabs,
  Tag,
  TagInput,
  ThemeToggle,
  Timeline,
  ToastProvider,
  Tooltip,
  chartPalette,
  seriesColor,
  seriesOrder,
  themeInitScript,
  useMeasure,
  useToast
};
//# sourceMappingURL=index.js.map
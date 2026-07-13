import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { chartChrome, seriesColor, type PaletteKey } from "./theme";
import { useMeasure } from "./useMeasure";
import { cn } from "../cn";

export interface BarSeries {
  id: string;
  label?: string;
  /** Brand palette token — never a raw hex. */
  color?: PaletteKey;
  data: { category: string; value: number }[];
}

export interface BarChartProps {
  series: BarSeries[];
  height?: number;
  /** Multiple series stack by default (matches customs/inventory usage). */
  stacked?: boolean;
  yFormat?: (n: number) => string;
  legend?: boolean;
  tooltip?: boolean;
  /** Required — the chart is exposed as role="img". */
  ariaLabel: string;
  className?: string;
}

const MARGIN = { top: 16, right: 24, bottom: 44, left: 60 };

export function BarChart({
  series,
  height = 360,
  stacked = true,
  yFormat = (n) => n.toLocaleString(),
  legend = true,
  tooltip = true,
  ariaLabel,
  className,
}: BarChartProps) {
  const { ref, width } = useMeasure<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (width === 0 || series.length === 0) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const categories = Array.from(new Set(series.flatMap((s) => s.data.map((d) => d.category))));
    const byCat = categories.map((category) => {
      const row: Record<string, number | string> = { category };
      for (const s of series) row[s.id] = s.data.find((d) => d.category === category)?.value ?? 0;
      return row;
    });
    const keys = series.map((s) => s.id);
    const color = new Map(series.map((s, i) => [s.id, seriesColor(i, s.color)]));
    const label = new Map(series.map((s) => [s.id, s.label ?? s.id]));

    const x = d3.scaleBand().domain(categories).range([MARGIN.left, width - MARGIN.right]).padding(0.2);

    const useStack = stacked && series.length > 1;
    const stackSeries = useStack ? d3.stack<Record<string, number | string>>().keys(keys)(byCat) : null;
    const yMax = useStack
      ? d3.max(stackSeries!, (layer) => d3.max(layer, (d) => d[1])) ?? 0
      : d3.max(series.flatMap((s) => s.data.map((d) => d.value))) ?? 0;

    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([height - MARGIN.bottom, MARGIN.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - MARGIN.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .attr("color", chartChrome.axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-family", chartChrome.fontMono)
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    svg
      .append("g")
      .attr("transform", `translate(${MARGIN.left},0)`)
      .call(d3.axisLeft(y).ticks(height / 40).tickFormat((d) => yFormat(d as number)))
      .attr("color", chartChrome.axis)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - MARGIN.left - MARGIN.right)
          .attr("stroke", chartChrome.grid)
          .attr("stroke-opacity", 0.6),
      )
      .selectAll("text")
      .style("font-family", chartChrome.fontMono);

    const tip = tooltip
      ? d3
          .select(ref.current)
          .append("div")
          .attr("class", "ut-chart-tooltip")
          .style("position", "absolute")
          .style("visibility", "hidden")
          .style("background", chartChrome.tooltipBg)
          .style("color", chartChrome.tooltipText)
          .style("border", `1px solid ${chartChrome.tooltipBorder}`)
          .style("padding", "6px 8px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("font-family", chartChrome.fontMono)
          .style("pointer-events", "none")
          .style("z-index", "10")
      : null;

    const showTip = (event: PointerEvent, seriesId: string, category: string, value: number) => {
      if (!tip) return;
      tip
        .style("visibility", "visible")
        .html(`<strong>${category}</strong><br/>${label.get(seriesId)}: ${yFormat(value)}`);
      const [px, py] = d3.pointer(event, ref.current);
      const isRight = px > width / 2;
      tip.style("top", `${py - 40}px`).style("left", `${isRight ? px - 120 : px + 20}px`);
    };

    if (useStack) {
      svg
        .append("g")
        .selectAll("g")
        .data(stackSeries!)
        .join("g")
        .attr("fill", (d) => color.get(d.key)!)
        .attr("data-series-id", (d) => d.key)
        .selectAll("rect")
        .data((layer) => layer.map((d) => ({ d, key: layer.key })))
        .join("rect")
        .attr("class", "series-bar")
        .attr("x", ({ d }) => x(d.data.category as string)!)
        .attr("y", ({ d }) => y(d[1]))
        .attr("height", ({ d }) => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth())
        .on("pointerover pointermove", function (event, { d, key }) {
          showTip(event, key, d.data.category as string, d[1] - d[0]);
          d3.select(this).style("opacity", 0.85);
        })
        .on("pointerout", function () {
          tip?.style("visibility", "hidden");
          d3.select(this).style("opacity", 1);
        });
    } else {
      const inner = d3.scaleBand().domain(keys).range([0, x.bandwidth()]).padding(series.length > 1 ? 0.1 : 0);
      svg
        .append("g")
        .selectAll("g")
        .data(series)
        .join("g")
        .attr("fill", (s, i) => seriesColor(i, s.color))
        .attr("data-series-id", (s) => s.id)
        .selectAll("rect")
        .data((s) => s.data.map((d) => ({ ...d, sid: s.id })))
        .join("rect")
        .attr("class", "series-bar")
        .attr("x", (d) => x(d.category)! + inner(d.sid)!)
        .attr("y", (d) => y(d.value))
        .attr("height", (d) => y(0) - y(d.value))
        .attr("width", inner.bandwidth())
        .on("pointerover pointermove", function (event, d) {
          showTip(event, d.sid, d.category, d.value);
          d3.select(this).style("opacity", 0.85);
        })
        .on("pointerout", function () {
          tip?.style("visibility", "hidden");
          d3.select(this).style("opacity", 1);
        });
    }

    return () => {
      tip?.remove();
    };
  }, [series, width, height, stacked, yFormat, tooltip]);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <svg ref={svgRef} role="img" aria-label={ariaLabel} width={width} height={height} className="overflow-visible" />
      {legend && series.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ut-muted">
          {series.map((s, i) => (
            <span key={s.id} className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-4 rounded-sm"
                style={{ background: seriesColor(i, s.color) }}
              />
              {s.label ?? s.id}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

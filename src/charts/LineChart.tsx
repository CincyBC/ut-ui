import React, { useEffect, useRef } from "react";
import * as d3 from "./d3";
import { chartChrome, seriesColor, type PaletteKey } from "./theme";
import { useMeasure } from "./useMeasure";
import { cn } from "../cn";

export type XValue = Date | number | string;

export interface LineSeries {
  id: string;
  label?: string;
  data: { x: XValue; y: number }[];
  /** Brand palette token — never a raw hex. */
  color?: PaletteKey;
  dashed?: boolean;
  area?: boolean;
}

export interface LineChartProps {
  series: LineSeries[];
  height?: number;
  yFormat?: (n: number) => string;
  grid?: boolean;
  tooltip?: boolean;
  legend?: boolean;
  /** Force the y-axis to include 0 (totals/volumes). Prices should leave this off. */
  zeroBaseline?: boolean;
  /** Required — the chart is exposed as role="img". */
  ariaLabel: string;
  className?: string;
}

const MARGIN = { top: 16, right: 24, bottom: 44, left: 60 };

/** String x-values use a point scale; Date/number use time/linear. All series share one x type. */
export function LineChart({
  series,
  height = 360,
  yFormat = (n) => n.toLocaleString(),
  grid = true,
  tooltip = true,
  legend = true,
  zeroBaseline = false,
  ariaLabel,
  className,
}: LineChartProps) {
  const { ref, width } = useMeasure<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (width === 0 || series.length === 0) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const first = series[0].data[0]?.x;
    const allY = series.flatMap((s) => s.data.map((d) => d.y));

    let xPos: (v: XValue) => number;
    if (typeof first === "string") {
      const labels = Array.from(new Set(series.flatMap((s) => s.data.map((d) => String(d.x)))));
      const scale = d3.scalePoint<string>().domain(labels).range([MARGIN.left, width - MARGIN.right]);
      xPos = (v) => scale(String(v)) ?? 0;
      svg
        .append("g")
        .attr("transform", `translate(0,${height - MARGIN.bottom})`)
        .call(d3.axisBottom(scale).tickSizeOuter(0))
        .attr("color", chartChrome.axis)
        .selectAll("text")
        .style("text-anchor", "end")
        .style("font-family", chartChrome.fontMono)
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");
    } else {
      const xs = series.flatMap((s) => s.data.map((d) => +(d.x as number | Date)));
      const domain: [number, number] = [d3.min(xs) ?? 0, d3.max(xs) ?? 1];
      const range: [number, number] = [MARGIN.left, width - MARGIN.right];
      const scale =
        first instanceof Date
          ? d3.scaleTime().domain(domain).range(range)
          : d3.scaleLinear().domain(domain).range(range);
      xPos = (v) => scale(+(v as number | Date));
      svg
        .append("g")
        .attr("transform", `translate(0,${height - MARGIN.bottom})`)
        .call(d3.axisBottom(scale).ticks(width / 90).tickSizeOuter(0))
        .attr("color", chartChrome.axis)
        .selectAll("text")
        .style("font-family", chartChrome.fontMono);
    }

    const yMin = d3.min(allY) ?? 0;
    const y = d3
      .scaleLinear()
      .domain([zeroBaseline ? Math.min(0, yMin) : yMin, d3.max(allY) ?? 0])
      .nice()
      .range([height - MARGIN.bottom, MARGIN.top]);

    const yAxis = svg
      .append("g")
      .attr("transform", `translate(${MARGIN.left},0)`)
      .call(d3.axisLeft(y).ticks(height / 40).tickFormat((d) => yFormat(d as number)))
      .attr("color", chartChrome.axis)
      .call((g) => g.select(".domain").remove());
    yAxis.selectAll("text").style("font-family", chartChrome.fontMono);
    if (grid) {
      yAxis.call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - MARGIN.left - MARGIN.right)
          .attr("stroke", chartChrome.grid)
          .attr("stroke-opacity", 0.6),
      );
    }

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

    series.forEach((s, i) => {
      const color = seriesColor(i, s.color);
      const line = d3
        .line<{ x: XValue; y: number }>()
        .x((d) => xPos(d.x))
        .y((d) => y(d.y))
        .curve(d3.curveMonotoneX);

      if (s.area) {
        const area = d3
          .area<{ x: XValue; y: number }>()
          .x((d) => xPos(d.x))
          .y0(height - MARGIN.bottom)
          .y1((d) => y(d.y))
          .curve(d3.curveMonotoneX);
        svg
          .append("path")
          .datum(s.data)
          .attr("class", "series-area")
          .attr("data-series-id", s.id)
          .attr("fill", color)
          .attr("fill-opacity", 0.12)
          .attr("d", area);
      }

      svg
        .append("path")
        .datum(s.data)
        .attr("class", "series-line")
        .attr("data-series-id", s.id)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", s.dashed ? "5,4" : null)
        .attr("d", line);

      svg
        .selectAll(`.series-point-${i}`)
        .data(s.data)
        .enter()
        .append("circle")
        .attr("class", `series-point-${i}`)
        .attr("data-series-id", s.id)
        .attr("cx", (d) => xPos(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("r", s.data.length > 60 ? 0 : 3)
        .attr("fill", color)
        .on("mouseover", function (_event, d) {
          if (!tip) return;
          tip
            .style("visibility", "visible")
            .html(`<strong>${s.label ?? s.id}</strong><br/>${yFormat(d.y)}`);
          d3.select(this).attr("r", 6);
        })
        .on("mousemove", (event) => {
          if (!tip) return;
          const [px, py] = d3.pointer(event, ref.current);
          const isRight = px > width / 2;
          tip.style("top", `${py - 40}px`).style("left", `${isRight ? px - 120 : px + 20}px`);
        })
        .on("mouseout", function () {
          if (!tip) return;
          tip.style("visibility", "hidden");
          d3.select(this).attr("r", s.data.length > 60 ? 0 : 3);
        });
    });

    return () => {
      tip?.remove();
    };
  }, [series, width, height, yFormat, grid, tooltip, zeroBaseline]);

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

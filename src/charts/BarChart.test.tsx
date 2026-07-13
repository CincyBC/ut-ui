import { render, screen } from "@testing-library/react";
import { BarChart, type BarSeries } from "./BarChart";
import { chartPalette } from "./theme";

const canada: BarSeries = {
  id: "ca",
  label: "Canada",
  data: [
    { category: "2023", value: 400 },
    { category: "2024", value: 520 },
  ],
};
const kazakhstan: BarSeries = {
  id: "kz",
  label: "Kazakhstan",
  data: [
    { category: "2023", value: 900 },
    { category: "2024", value: 950 },
  ],
};

describe("BarChart", () => {
  it("renders an accessible svg image", () => {
    render(<BarChart series={[canada]} ariaLabel="Imports by year" />);
    expect(screen.getByRole("img", { name: "Imports by year" })).toBeInTheDocument();
  });

  it("stacks multiple series by default: one layer per series, brand fills", () => {
    const { container } = render(<BarChart series={[canada, kazakhstan]} ariaLabel="imports" />);
    const layers = container.querySelectorAll("g[data-series-id]");
    expect(layers).toHaveLength(2);
    expect(layers[0].getAttribute("fill")).toBe(chartPalette.petrol);
    expect(layers[1].getAttribute("fill")).toBe(chartPalette.sage);
    expect(container.querySelectorAll("rect.series-bar")).toHaveLength(4);
  });

  it("supports grouped mode", () => {
    const { container } = render(
      <BarChart series={[canada, kazakhstan]} stacked={false} ariaLabel="imports" />,
    );
    expect(container.querySelectorAll("rect.series-bar")).toHaveLength(4);
  });

  it("re-render does not duplicate bars", () => {
    const { container, rerender } = render(<BarChart series={[canada]} ariaLabel="i" />);
    rerender(<BarChart series={[canada]} ariaLabel="i" />);
    expect(container.querySelectorAll("rect.series-bar")).toHaveLength(2);
  });

  it("renders legend labels for multiple series", () => {
    render(<BarChart series={[canada, kazakhstan]} ariaLabel="i" />);
    expect(screen.getByText("Canada")).toBeInTheDocument();
    expect(screen.getByText("Kazakhstan")).toBeInTheDocument();
  });

  it("does not throw on empty data", () => {
    expect(() => render(<BarChart series={[{ id: "e", data: [] }]} ariaLabel="empty" />)).not.toThrow();
  });
});

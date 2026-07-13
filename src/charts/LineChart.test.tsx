import { render, screen } from "@testing-library/react";
import { LineChart, type LineSeries } from "./LineChart";
import { chartPalette } from "./theme";

const spot: LineSeries = {
  id: "spot",
  label: "Spot",
  data: [
    { x: "2026-01", y: 78 },
    { x: "2026-02", y: 81 },
    { x: "2026-03", y: 83 },
  ],
};
const forward: LineSeries = { ...spot, id: "forward", label: "Forward", color: "sage", dashed: true };

describe("LineChart", () => {
  it("renders an accessible svg image", () => {
    render(<LineChart series={[spot]} ariaLabel="U3O8 spot price" />);
    expect(screen.getByRole("img", { name: "U3O8 spot price" })).toBeInTheDocument();
  });

  it("draws one line path per series with brand token strokes", () => {
    const { container } = render(<LineChart series={[spot, forward]} ariaLabel="prices" />);
    const lines = container.querySelectorAll("path.series-line");
    expect(lines).toHaveLength(2);
    expect(lines[0].getAttribute("stroke")).toBe(chartPalette.petrol);
    expect(lines[1].getAttribute("stroke")).toBe(chartPalette.sage);
    expect(lines[1].getAttribute("stroke-dasharray")).toBe("5,4");
  });

  it("re-render with new data does not duplicate nodes", () => {
    const { container, rerender } = render(<LineChart series={[spot]} ariaLabel="p" />);
    rerender(<LineChart series={[{ ...spot, data: [...spot.data, { x: "2026-04", y: 85 }] }]} ariaLabel="p" />);
    expect(container.querySelectorAll("path.series-line")).toHaveLength(1);
    expect(container.querySelectorAll(".ut-chart-tooltip").length).toBeLessThanOrEqual(1);
  });

  it("renders an HTML legend for multiple series", () => {
    render(<LineChart series={[spot, forward]} ariaLabel="p" />);
    expect(screen.getByText("Spot")).toBeInTheDocument();
    expect(screen.getByText("Forward")).toBeInTheDocument();
  });

  it("renders an area layer when requested", () => {
    const { container } = render(<LineChart series={[{ ...spot, area: true }]} ariaLabel="p" />);
    expect(container.querySelectorAll("path.series-area")).toHaveLength(1);
    expect(container.querySelector("path.series-area")!.getAttribute("fill-opacity")).toBe("0.12");
  });

  it("does not throw on empty series data", () => {
    expect(() => render(<LineChart series={[{ id: "e", data: [] }]} ariaLabel="empty" />)).not.toThrow();
  });
});

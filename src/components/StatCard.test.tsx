import { render, screen } from "@testing-library/react";
import { StatCard } from "./StatCard";

const Icon = (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="icon" {...props} />;

describe("StatCard", () => {
  it("renders value in mono with tabular numerals and label", () => {
    render(<StatCard value="$82.50" label="Spot U3O8" />);
    expect(screen.getByText("$82.50")).toHaveClass("font-mono", "tabular-nums");
    expect(screen.getByText("Spot U3O8")).toBeInTheDocument();
  });

  it("resolves accent through the static class lookup (Tailwind v4 regression)", () => {
    const { container } = render(<StatCard value={1} icon={Icon} accent="green" />);
    // class literals must be static strings, never `bg-${color}-500`
    expect(container.querySelector(".hex-frame")).toHaveClass("bg-reactor/15");
    expect(screen.getByTestId("icon").getAttribute("class")).toContain("text-reactor");
    expect(container.innerHTML).not.toMatch(/bg-\$\{/);
  });

  it("colors delta by sign", () => {
    const { rerender } = render(<StatCard value={1} delta={{ value: 2.5 }} />);
    expect(screen.getByText("+2.5")).toHaveClass("text-ut-accent");
    rerender(<StatCard value={1} delta={{ value: -2.5 }} />);
    expect(screen.getByText("-2.5")).toHaveClass("text-rust");
  });

  it("uses a custom delta format", () => {
    render(<StatCard value={1} delta={{ value: 0.031, format: (n) => `${(n * 100).toFixed(1)}%` }} />);
    expect(screen.getByText("3.1%")).toBeInTheDocument();
  });

  it("renders footer below a divider", () => {
    render(<StatCard value={1} footer="Updated daily" />);
    expect(screen.getByText("Updated daily")).toBeInTheDocument();
  });
});

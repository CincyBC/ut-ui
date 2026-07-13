import { render, screen } from "@testing-library/react";
import { Badge, StatusBadge } from "./Badge";

describe("Badge", () => {
  it("renders neutral tone by default", () => {
    render(<Badge>Idle</Badge>);
    expect(screen.getByText("Idle")).toHaveClass("bg-steel/15");
  });

  it("applies tone classes from the static lookup", () => {
    render(<Badge tone="rust">Down</Badge>);
    expect(screen.getByText("Down")).toHaveClass("bg-rust/15", "text-rust");
  });
});

describe("StatusBadge", () => {
  it("renders a hexagonal marker hidden from a11y tree", () => {
    const { container } = render(<StatusBadge tone="green">Operational</StatusBadge>);
    const dot = container.querySelector(".hex-frame");
    expect(dot).not.toBeNull();
    expect(dot).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Operational")).toBeInTheDocument();
  });
});

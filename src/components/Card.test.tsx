import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children on the semantic surface", () => {
    const { container } = render(<Card>body</Card>);
    expect(screen.getByText("body")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("bg-ut-surface", "border-ut-border");
  });

  it("renders title, label, and headerContent", () => {
    render(
      <Card title="Spot Price" label="Numerco" headerContent={<button>filter</button>}>
        x
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "Spot Price" })).toBeInTheDocument();
    expect(screen.getByText("Numerco")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "filter" })).toBeInTheDocument();
  });

  it("applies the live glow only when requested", () => {
    const { container, rerender } = render(<Card>x</Card>);
    expect(container.firstChild).not.toHaveClass("ut-glow-live");
    rerender(<Card live>x</Card>);
    expect(container.firstChild).toHaveClass("ut-glow-live");
  });
});

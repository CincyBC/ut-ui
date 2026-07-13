import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders primary variant by default with petrol background", () => {
    render(<Button>Save</Button>);
    const btn = screen.getByRole("button", { name: "Save" });
    expect(btn).toHaveClass("bg-petrol");
    expect(btn).toHaveAttribute("type", "button");
  });

  it("renders accent and ghost variants", () => {
    const { rerender } = render(<Button variant="accent">Go</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-reactor");
    rerender(<Button variant="ghost">Go</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-ut-border");
  });

  it("forwards props and respects disabled", () => {
    render(
      <Button disabled data-testid="b">
        X
      </Button>,
    );
    expect(screen.getByTestId("b")).toBeDisabled();
  });
});

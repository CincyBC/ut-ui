import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders a text input that accepts typed input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Contract name" />);
    const input = screen.getByLabelText("Contract name");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("applies mono numeral styling for type=number", () => {
    render(<Input type="number" aria-label="Quantity" />);
    expect(screen.getByLabelText("Quantity")).toHaveClass("font-mono");
  });

  it("renders a leading icon slot", () => {
    render(<Input aria-label="Search" icon={<span data-testid="icon" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("forwards onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input aria-label="Name" onChange={onChange} />);
    await user.type(screen.getByLabelText("Name"), "a");
    expect(onChange).toHaveBeenCalled();
  });
});

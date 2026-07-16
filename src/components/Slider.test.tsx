import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders as a native range input with the given bounds", () => {
    render(<Slider ariaLabel="Quantity" min={0} max={100} value={40} onChange={() => {}} />);
    const slider = screen.getByLabelText("Quantity");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
    expect(slider).toHaveValue("40");
  });

  it("calls onChange with a number when moved", () => {
    const onChange = vi.fn();
    render(<Slider ariaLabel="Quantity" min={0} max={100} value={40} onChange={onChange} />);
    const slider = screen.getByLabelText("Quantity");
    fireEvent.change(slider, { target: { value: "60" } });
    expect(onChange).toHaveBeenCalledWith(60);
  });

  it("shows the current value when showValue is set", () => {
    render(<Slider ariaLabel="Quantity" min={0} max={100} value={40} onChange={() => {}} showValue />);
    expect(screen.getByText("40")).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("renders a date input with the given value", () => {
    render(<DatePicker ariaLabel="Delivery date" value="2026-09-15" onChange={() => {}} />);
    expect(screen.getByLabelText("Delivery date")).toHaveValue("2026-09-15");
  });

  it("calls onChange with the new date string", () => {
    const onChange = vi.fn();
    render(<DatePicker ariaLabel="Delivery date" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("Delivery date"), { target: { value: "2026-10-01" } });
    expect(onChange).toHaveBeenCalledWith("2026-10-01");
  });

  it("applies mono numeral styling", () => {
    render(<DatePicker ariaLabel="Delivery date" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Delivery date")).toHaveClass("font-mono");
  });
});

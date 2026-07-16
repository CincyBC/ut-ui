import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox, Radio, Switch } from "./Checkbox";

describe("Checkbox", () => {
  it("toggles checked state via onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Delivered" checked={false} onChange={onChange} />);
    await user.click(screen.getByLabelText("Delivered"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("reflects checked=true", () => {
    render(<Checkbox label="Delivered" checked onChange={() => {}} />);
    expect(screen.getByLabelText("Delivered")).toBeChecked();
  });
});

describe("Radio", () => {
  it("is checked when its value matches the group value", () => {
    render(<Radio label="Utility" name="kind" value="utility" checked onChange={() => {}} />);
    expect(screen.getByLabelText("Utility")).toBeChecked();
  });

  it("calls onChange with its own value when selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Radio label="Producer" name="kind" value="producer" checked={false} onChange={onChange} />);
    await user.click(screen.getByLabelText("Producer"));
    expect(onChange).toHaveBeenCalledWith("producer");
  });
});

describe("Switch", () => {
  it("renders as an accessible switch role", () => {
    render(<Switch label="Live pricing" checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch", { name: "Live pricing" })).toBeInTheDocument();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Live pricing" checked={false} onChange={onChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

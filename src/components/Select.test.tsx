import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Select } from "./Select";

const OPTIONS = [
  { value: "u3o8", label: "U3O8" },
  { value: "swu", label: "SWU" },
];

describe("Select", () => {
  it("renders all options", () => {
    render(<Select aria-label="Material" options={OPTIONS} value="u3o8" onChange={() => {}} />);
    expect(screen.getByRole("option", { name: "U3O8" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "SWU" })).toBeInTheDocument();
  });

  it("reflects the current value", () => {
    render(<Select aria-label="Material" options={OPTIONS} value="swu" onChange={() => {}} />);
    expect(screen.getByLabelText("Material")).toHaveValue("swu");
  });

  it("calls onChange with the new value when selected", async () => {
    const user = userEvent.setup();
    let selected = "u3o8";
    render(
      <Select
        aria-label="Material"
        options={OPTIONS}
        value={selected}
        onChange={(v) => {
          selected = v;
        }}
      />,
    );
    await user.selectOptions(screen.getByLabelText("Material"), "swu");
    expect(selected).toBe("swu");
  });
});

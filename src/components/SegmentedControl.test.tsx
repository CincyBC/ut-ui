import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { SegmentedControl } from "./SegmentedControl";

const OPTIONS = ["MAX", "5Y", "1Y", "1M", "1W"] as const;

function Harness() {
  const [value, setValue] = useState<(typeof OPTIONS)[number]>("1Y");
  return <SegmentedControl options={OPTIONS} value={value} onChange={setValue} ariaLabel="Time range" />;
}

describe("SegmentedControl", () => {
  it("renders a radiogroup with one checked radio", () => {
    render(<Harness />);
    expect(screen.getByRole("radiogroup", { name: "Time range" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(5);
    expect(screen.getByRole("radio", { name: "1Y" })).toHaveAttribute("aria-checked", "true");
  });

  it("changes selection on click", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("radio", { name: "MAX" }));
    expect(screen.getByRole("radio", { name: "MAX" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "1Y" })).toHaveAttribute("aria-checked", "false");
  });

  it("navigates with arrow keys, wrapping at the ends", async () => {
    render(<Harness />);
    screen.getByRole("radio", { name: "1Y" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "1M" })).toHaveAttribute("aria-checked", "true");
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    expect(screen.getByRole("radio", { name: "MAX" })).toHaveAttribute("aria-checked", "true");
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("radio", { name: "1W" })).toHaveAttribute("aria-checked", "true");
  });

  it("accepts {value,label} option objects", () => {
    render(
      <SegmentedControl
        options={[{ value: "us", label: "United States" }]}
        value="us"
        onChange={() => {}}
        ariaLabel="Region"
      />,
    );
    expect(screen.getByRole("radio", { name: "United States" })).toBeInTheDocument();
  });
});

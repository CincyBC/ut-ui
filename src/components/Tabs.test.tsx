import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Tabs } from "./Tabs";

const TABS = [
  { value: "us", label: "US" },
  { value: "eu", label: "EU" },
] as const;

function Harness() {
  const [value, setValue] = useState<"us" | "eu">("us");
  return (
    <Tabs tabs={TABS} value={value} onChange={setValue} ariaLabel="Region">
      {value === "us" ? "US data" : "EU data"}
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders tablist with selected tab and panel wiring", () => {
    render(<Harness />);
    const tab = screen.getByRole("tab", { name: "US" });
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("US data");
    expect(screen.getByRole("tabpanel")).toHaveAttribute("aria-labelledby", tab.id);
  });

  it("switches on click and arrow keys", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("tab", { name: "EU" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("EU data");
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("US data");
  });
});

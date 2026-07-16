import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Timeline } from "./Timeline";

const ITEMS = [
  { id: "1", title: "Quarterly review call", timestamp: "2026-07-10", description: "Discussed Q3 pricing." },
  { id: "2", title: "Contract ct-3 opened", timestamp: "2026-06-20" },
];

describe("Timeline", () => {
  it("renders every item's title and timestamp", () => {
    render(<Timeline items={ITEMS} />);
    expect(screen.getByText("Quarterly review call")).toBeInTheDocument();
    expect(screen.getByText("2026-07-10")).toBeInTheDocument();
    expect(screen.getByText("Contract ct-3 opened")).toBeInTheDocument();
  });

  it("renders an optional description", () => {
    render(<Timeline items={ITEMS} />);
    expect(screen.getByText("Discussed Q3 pricing.")).toBeInTheDocument();
  });

  it("renders as an ordered list", () => {
    render(<Timeline items={ITEMS} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});

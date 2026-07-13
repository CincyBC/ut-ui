import { render, screen } from "@testing-library/react";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("renders h1 title with kicker and description", () => {
    render(<PageHeader title="Reactors" kicker="PRIS" description="Global fleet" />);
    expect(screen.getByRole("heading", { level: 1, name: "Reactors" })).toBeInTheDocument();
    expect(screen.getByText("PRIS")).toHaveClass("kicker");
    expect(screen.getByText("Global fleet")).toBeInTheDocument();
  });

  it("renders actions slot", () => {
    render(<PageHeader title="X" actions={<button>Export</button>} />);
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
  });
});

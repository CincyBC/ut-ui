import { render, screen } from "@testing-library/react";
import { Kicker } from "./Kicker";

describe("Kicker", () => {
  it("renders children with the kicker lockup class", () => {
    render(<Kicker>Analytics</Kicker>);
    expect(screen.getByText("Analytics")).toHaveClass("kicker");
  });

  it("merges custom classes", () => {
    render(<Kicker className="mb-2">X</Kicker>);
    expect(screen.getByText("X")).toHaveClass("kicker", "mb-2");
  });
});

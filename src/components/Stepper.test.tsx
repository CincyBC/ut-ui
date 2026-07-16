import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stepper } from "./Stepper";

const STEPS = [{ label: "Counterparty" }, { label: "Terms" }, { label: "Delivery" }, { label: "Review" }];

describe("Stepper", () => {
  it("renders every step label", () => {
    render(<Stepper steps={STEPS} currentIndex={1} />);
    for (const step of STEPS) {
      expect(screen.getByText(step.label)).toBeInTheDocument();
    }
  });

  it("marks the current step", () => {
    render(<Stepper steps={STEPS} currentIndex={1} />);
    expect(screen.getByText("Terms").closest('[aria-current]')).toHaveAttribute("aria-current", "step");
  });

  it("marks earlier steps as complete", () => {
    render(<Stepper steps={STEPS} currentIndex={2} />);
    expect(screen.getByText("Counterparty").closest("[data-complete]")).toHaveAttribute("data-complete", "true");
    expect(screen.getByText("Review").closest("[data-complete]")).toHaveAttribute("data-complete", "false");
  });

  it("renders as an ordered list for a11y", () => {
    render(<Stepper steps={STEPS} currentIndex={0} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});

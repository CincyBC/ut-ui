import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("associates the label with its child control via htmlFor/id", () => {
    render(
      <FormField label="Email" htmlFor="email">
        <input id="email" />
      </FormField>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders a hint when provided", () => {
    render(
      <FormField label="Quantity" htmlFor="qty" hint="In pounds U3O8">
        <input id="qty" />
      </FormField>,
    );
    expect(screen.getByText("In pounds U3O8")).toBeInTheDocument();
  });

  it("renders an error and marks the control invalid", () => {
    render(
      <FormField label="Email" htmlFor="email" error="Required">
        <input id="email" />
      </FormField>,
    );
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not render a hint when an error is present", () => {
    render(
      <FormField label="Email" htmlFor="email" hint="We'll never share it" error="Required">
        <input id="email" />
      </FormField>,
    );
    expect(screen.queryByText("We'll never share it")).not.toBeInTheDocument();
  });
});

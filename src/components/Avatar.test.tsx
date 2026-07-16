import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials from a name", () => {
    render(<Avatar name="Bryan Corder" />);
    expect(screen.getByText("BC")).toBeInTheDocument();
  });

  it("renders an image when src is given, with accessible alt text", () => {
    render(<Avatar name="Bryan Corder" src="/avatar.png" />);
    expect(screen.getByRole("img", { name: "Bryan Corder" })).toBeInTheDocument();
  });

  it("falls back to initials-only for a single-word name", () => {
    render(<Avatar name="Cher" />);
    expect(screen.getByText("C")).toBeInTheDocument();
  });
});

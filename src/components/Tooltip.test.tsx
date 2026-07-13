import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("is hidden until hover, then wires aria-describedby", async () => {
    render(
      <Tooltip content="lbs U3O8 equivalent">
        <button>?</button>
      </Tooltip>,
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    await userEvent.hover(screen.getByRole("button"));
    const tip = screen.getByRole("tooltip");
    expect(tip).toHaveTextContent("lbs U3O8 equivalent");
    expect(screen.getByRole("button")).toHaveAttribute("aria-describedby", tip.id);
    await userEvent.unhover(screen.getByRole("button"));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows on keyboard focus", async () => {
    render(
      <Tooltip content="hint">
        <button>?</button>
      </Tooltip>,
    );
    await userEvent.tab();
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });
});

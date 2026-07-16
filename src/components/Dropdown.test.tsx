import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dropdown } from "./Dropdown";

describe("Dropdown", () => {
  it("does not show the menu until the trigger is activated", () => {
    render(
      <Dropdown trigger={<button>Actions</button>} items={[{ label: "Edit", onSelect: () => {} }]} />,
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens the menu when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown trigger={<button>Actions</button>} items={[{ label: "Edit", onSelect: () => {} }]} />,
    );
    await user.click(screen.getByText("Actions"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
  });

  it("calls onSelect and closes the menu when an item is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Dropdown trigger={<button>Actions</button>} items={[{ label: "Delete", onSelect }]} />);
    await user.click(screen.getByText("Actions"));
    await user.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(onSelect).toHaveBeenCalled();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("navigates items with arrow keys", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        trigger={<button>Actions</button>}
        items={[
          { label: "Edit", onSelect: () => {} },
          { label: "Delete", onSelect: () => {} },
        ]}
      />,
    );
    await user.click(screen.getByText("Actions"));
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
  });

  it("closes the menu on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown trigger={<button>Actions</button>} items={[{ label: "Edit", onSelect: () => {} }]} />,
    );
    await user.click(screen.getByText("Actions"));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./Calendar";

// July 2026: 1st is a Wednesday, 31 days.
describe("Calendar", () => {
  it("renders a heading for the given month and year", () => {
    render(<Calendar year={2026} month={7} events={[]} onNavigate={() => {}} />);
    expect(screen.getByText(/july 2026/i)).toBeInTheDocument();
  });

  it("renders a cell for every day in the month", () => {
    render(<Calendar year={2026} month={7} events={[]} onNavigate={() => {}} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("31")).toBeInTheDocument();
  });

  it("renders an event marker on days with events", () => {
    render(
      <Calendar
        year={2026}
        month={7}
        events={[{ date: "2026-07-15", label: "U3O8 delivery" }]}
        onNavigate={() => {}}
      />,
    );
    expect(screen.getByText("U3O8 delivery")).toBeInTheDocument();
  });

  it("calls onNavigate when the next/previous buttons are clicked", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<Calendar year={2026} month={7} events={[]} onNavigate={onNavigate} />);
    await user.click(screen.getByRole("button", { name: /next month/i }));
    expect(onNavigate).toHaveBeenCalledWith("next");
    await user.click(screen.getByRole("button", { name: /previous month/i }));
    expect(onNavigate).toHaveBeenCalledWith("prev");
  });

  it("calls onDateClick with the clicked date", async () => {
    const user = userEvent.setup();
    const onDateClick = vi.fn();
    render(<Calendar year={2026} month={7} events={[]} onNavigate={() => {}} onDateClick={onDateClick} />);
    await user.click(screen.getByText("15"));
    expect(onDateClick).toHaveBeenCalledWith("2026-07-15");
  });
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToastProvider, useToast } from "./Toast";

function Trigger({ tone }: { tone?: "success" | "error" }) {
  const { showToast } = useToast();
  return (
    <button onClick={() => showToast({ message: "Contract saved", tone })}>Trigger</button>
  );
}

describe("Toast", () => {
  it("shows a toast message when showToast is called", async () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText("Trigger"));
    expect(await screen.findByText("Contract saved")).toBeInTheDocument();
  });

  it("renders toasts in a status region for screen readers", async () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText("Trigger"));
    await screen.findByText("Contract saved");
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("throws when useToast is used outside a provider", () => {
    function Bare() {
      useToast();
      return null;
    }
    const spy = () => render(<Bare />);
    expect(spy).toThrow();
  });

  it("auto-dismisses a toast after its duration", async () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText("Trigger"));
    await screen.findByText("Contract saved");
    await waitFor(
      () => {
        expect(screen.queryByText("Contract saved")).not.toBeInTheDocument();
      },
      { timeout: 6000 },
    );
  }, 7000);
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tag, TagInput } from "./Tag";

describe("Tag", () => {
  it("renders its label", () => {
    render(<Tag label="Utility" />);
    expect(screen.getByText("Utility")).toBeInTheDocument();
  });

  it("calls onRemove when the remove button is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Tag label="Utility" onRemove={onRemove} />);
    await user.click(screen.getByRole("button", { name: /remove utility/i }));
    expect(onRemove).toHaveBeenCalled();
  });

  it("has no remove button when onRemove is omitted", () => {
    render(<Tag label="Utility" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("TagInput", () => {
  it("renders each tag in the value array", () => {
    render(<TagInput value={["U3O8", "SWU"]} onChange={() => {}} />);
    expect(screen.getByText("U3O8")).toBeInTheDocument();
    expect(screen.getByText("SWU")).toBeInTheDocument();
  });

  it("adds a tag when Enter is pressed in the input", async () => {
    const user = userEvent.setup();
    let value = ["U3O8"];
    render(<TagInput value={value} onChange={(v) => (value = v)} ariaLabel="Materials" />);
    await user.type(screen.getByLabelText("Materials"), "UF6{Enter}");
    expect(value).toEqual(["U3O8", "UF6"]);
  });

  it("removes a tag when its remove button is clicked", async () => {
    const user = userEvent.setup();
    let value = ["U3O8", "SWU"];
    render(<TagInput value={value} onChange={(v) => (value = v)} ariaLabel="Materials" />);
    await user.click(screen.getByRole("button", { name: /remove u3o8/i }));
    expect(value).toEqual(["SWU"]);
  });

  it("does not add duplicate or empty tags", async () => {
    const user = userEvent.setup();
    let value = ["U3O8"];
    render(<TagInput value={value} onChange={(v) => (value = v)} ariaLabel="Materials" />);
    await user.type(screen.getByLabelText("Materials"), "U3O8{Enter}");
    expect(value).toEqual(["U3O8"]);
  });
});

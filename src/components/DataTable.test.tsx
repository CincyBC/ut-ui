import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable, type Column } from "./DataTable";

interface Row {
  id: string;
  name: string;
  mwe: number;
}

const rows: Row[] = [
  { id: "1", name: "Vogtle 3", mwe: 1117 },
  { id: "2", name: "Barakah 1", mwe: 1345 },
  { id: "3", name: "Olkiluoto 3", mwe: 1600 },
];

const columns: Column<Row>[] = [
  { key: "name", header: "Reactor", sortable: true },
  { key: "mwe", header: "MWe", numeric: true, sortable: true },
];

function bodyCells(col: number): string[] {
  const body = screen.getAllByRole("rowgroup")[1];
  return within(body)
    .getAllByRole("row")
    .map((r) => within(r).getAllByRole("cell")[col].textContent ?? "");
}

describe("DataTable", () => {
  it("renders rows and a screen-reader caption", () => {
    render(<DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} caption="Reactor list" />);
    expect(screen.getByRole("table", { name: "Reactor list" })).toBeInTheDocument();
    expect(bodyCells(0)).toEqual(["Vogtle 3", "Barakah 1", "Olkiluoto 3"]);
  });

  it("styles numeric cells right-aligned mono tabular", () => {
    render(<DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} />);
    const cell = screen.getByText("1117").closest("td")!;
    expect(cell).toHaveClass("font-mono", "tabular-nums", "text-right");
  });

  it("sorts numerically asc then desc on header click, exposing aria-sort", async () => {
    render(<DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} />);
    const mweBtn = screen.getByRole("button", { name: /MWe/ });
    await userEvent.click(mweBtn);
    expect(bodyCells(1)).toEqual(["1117", "1345", "1600"]);
    expect(mweBtn.closest("th")).toHaveAttribute("aria-sort", "ascending");
    await userEvent.click(mweBtn);
    expect(bodyCells(1)).toEqual(["1600", "1345", "1117"]);
    expect(mweBtn.closest("th")).toHaveAttribute("aria-sort", "descending");
  });

  it("applies defaultSort", () => {
    render(
      <DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} defaultSort={{ key: "mwe", dir: "desc" }} />,
    );
    expect(bodyCells(1)).toEqual(["1600", "1345", "1117"]);
  });

  it("sorts strings with locale-numeric compare", async () => {
    render(<DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} />);
    await userEvent.click(screen.getByRole("button", { name: /Reactor/ }));
    expect(bodyCells(0)).toEqual(["Barakah 1", "Olkiluoto 3", "Vogtle 3"]);
  });

  it("uses custom cell renderer and sortValue", async () => {
    const cols: Column<Row>[] = [
      {
        key: "mwe",
        header: "Capacity",
        numeric: true,
        sortable: true,
        cell: (r) => `${r.mwe.toLocaleString()} MWe`,
        sortValue: (r) => r.mwe,
      },
    ];
    render(<DataTable columns={cols} rows={rows} getRowKey={(r) => r.id} />);
    expect(screen.getByText("1,117 MWe")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Capacity/ }));
    expect(bodyCells(0)[0]).toBe("1,117 MWe");
  });

  it("renders empty state across all columns", () => {
    render(<DataTable columns={columns} rows={[]} getRowKey={(r: Row) => r.id} emptyState="Nothing here" />);
    const cell = screen.getByText("Nothing here").closest("td")!;
    expect(cell).toHaveAttribute("colspan", "2");
  });

  it("fires onRowClick with the row", async () => {
    const onClick = vi.fn();
    render(<DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} onRowClick={onClick} />);
    await userEvent.click(screen.getByText("Barakah 1"));
    expect(onClick).toHaveBeenCalledWith(rows[1]);
  });
});

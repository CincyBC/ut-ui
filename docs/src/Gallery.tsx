import React, { useState } from "react";
import { DollarSign } from "lucide-react";
import {
  Avatar,
  Badge,
  BarChart,
  Button,
  Calendar,
  Card,
  Checkbox,
  ConfirmDialog,
  DataTable,
  DatePicker,
  Dropdown,
  FormField,
  Input,
  Kicker,
  LineChart,
  Modal,
  PageHeader,
  Pagination,
  Radio,
  SegmentedControl,
  Select,
  Slider,
  StatCard,
  StatusBadge,
  Stepper,
  Switch,
  Tabs,
  Tag,
  TagInput,
  ThemeToggle,
  Timeline,
  ToastProvider,
  Tooltip,
  useToast,
  type Column,
} from "../../src";

// Fixed-seed data so Playwright screenshots are deterministic.
const PRICES = [78.5, 79.25, 81.0, 80.5, 82.75, 83.4, 82.5, 84.1, 85.0, 84.6, 86.2, 87.9];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const spotSeries = {
  id: "spot",
  label: "Spot",
  area: true,
  data: MONTHS.map((m, i) => ({ x: m, y: PRICES[i] })),
};
const forwardSeries = {
  id: "fwd",
  label: "Forward",
  color: "sage" as const,
  dashed: true,
  data: MONTHS.map((m, i) => ({ x: m, y: PRICES[i] + 3.5 })),
};
const importSeries = [
  {
    id: "ca",
    label: "Canada",
    data: [
      { category: "2022", value: 420 },
      { category: "2023", value: 460 },
      { category: "2024", value: 510 },
    ],
  },
  {
    id: "kz",
    label: "Kazakhstan",
    data: [
      { category: "2022", value: 880 },
      { category: "2023", value: 920 },
      { category: "2024", value: 890 },
    ],
  },
];

interface Reactor {
  id: string;
  name: string;
  country: string;
  mwe: number;
  status: string;
}
const REACTORS: Reactor[] = [
  { id: "1", name: "Vogtle 3", country: "USA", mwe: 1117, status: "Operational" },
  { id: "2", name: "Barakah 4", country: "UAE", mwe: 1345, status: "Operational" },
  { id: "3", name: "Flamanville 3", country: "France", mwe: 1630, status: "Startup" },
  { id: "4", name: "Kursk II-1", country: "Russia", mwe: 1175, status: "Construction" },
];
const reactorColumns: Column<Reactor>[] = [
  { key: "name", header: "Reactor", sortable: true },
  { key: "country", header: "Country", sortable: true },
  { key: "mwe", header: "MWe", numeric: true, sortable: true },
  {
    key: "status",
    header: "Status",
    cell: (r) => (
      <StatusBadge tone={r.status === "Operational" ? "green" : r.status === "Startup" ? "amber" : "neutral"}>
        {r.status}
      </StatusBadge>
    ),
  },
];

function Section({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <section className="mb-10" data-component={name}>
      <h2 className="mb-3 font-display text-lg font-semibold uppercase tracking-wide text-ut-muted">{name}</h2>
      {children}
    </section>
  );
}

function ToastDemo() {
  const { showToast } = useToast();
  return (
    <Button size="sm" onClick={() => showToast({ message: "Contract saved", tone: "success" })}>
      Show toast
    </Button>
  );
}

export function Gallery() {
  const [range, setRange] = useState<"MAX" | "5Y" | "1Y" | "1M" | "1W">("1Y");
  const [region, setRegion] = useState<"us" | "eu">("us");
  const [checked, setChecked] = useState(true);
  const [kind, setKind] = useState<"utility" | "producer">("utility");
  const [live, setLive] = useState(false);
  const [material, setMaterial] = useState<"u3o8" | "swu">("u3o8");
  const [discount, setDiscount] = useState(2.5);
  const [tags, setTags] = useState(["U3O8", "SWU"]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [page, setPage] = useState(2);
  const [stepIndex, setStepIndex] = useState(1);
  const [date, setDate] = useState("2026-07-15");
  const [calMonth, setCalMonth] = useState({ year: 2026, month: 7 });

  return (
    <ToastProvider>
    <div className="mx-auto max-w-[1280px] px-6 py-10 text-ut-text">
      <PageHeader
        title="Component Gallery"
        kicker="Uranium Technologies"
        description="Every @uraniumtech/ui component, rendered from library source."
      />

      <Section name="Kicker">
        <Kicker>Analytics</Kicker>
      </Section>

      <Section name="Button">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section name="Badge">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Neutral</Badge>
          <Badge tone="green">Green</Badge>
          <Badge tone="teal">Teal</Badge>
          <Badge tone="petrol">Petrol</Badge>
          <Badge tone="amber">Amber</Badge>
          <Badge tone="rust">Rust</Badge>
          <StatusBadge tone="green">Operational</StatusBadge>
          <StatusBadge tone="rust">Shutdown</StatusBadge>
        </div>
      </Section>

      <Section name="SegmentedControl">
        <SegmentedControl
          options={["MAX", "5Y", "1Y", "1M", "1W"] as const}
          value={range}
          onChange={setRange}
          ariaLabel="Time range"
        />
      </Section>

      <Section name="Tabs">
        <Tabs
          tabs={[
            { value: "us", label: "EIA (US)" },
            { value: "eu", label: "ESA (EU)" },
          ]}
          value={region}
          onChange={setRegion}
          ariaLabel="Region"
        >
          {region === "us" ? "US utility purchase data." : "European supply agency data."}
        </Tabs>
      </Section>

      <Section name="Tooltip">
        <Tooltip content="pounds U3O8 equivalent">
          <Button variant="ghost" size="sm">
            Hover me
          </Button>
        </Tooltip>
      </Section>

      <Section name="ThemeToggle">
        <ThemeToggle />
      </Section>

      <Section name="StatCard">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard value="$87.90" label="Spot U3O8" accent="green" delta={{ value: 1.7 }} live />
          <StatCard value="440" label="Operating reactors" accent="petrol" footer="IAEA PRIS" />
          <StatCard value="-3.2%" label="Weekly change" accent="rust" delta={{ value: -3.2 }} />
        </div>
      </Section>

      <Section name="Card">
        <Card title="Forward Curve" label="Numerco" headerContent={<Badge tone="petrol">Daily</Badge>}>
          Card body content.
        </Card>
      </Section>

      <Section name="PageHeader">
        <Card>
          <PageHeader
            title="Reactor Data"
            kicker="IAEA PRIS"
            description="Global fleet status and capacity."
            actions={<Button size="sm">Export</Button>}
            className="mb-0"
          />
        </Card>
      </Section>

      <Section name="DataTable">
        <Card>
          <DataTable
            columns={reactorColumns}
            rows={REACTORS}
            getRowKey={(r) => r.id}
            defaultSort={{ key: "mwe", dir: "desc" }}
            caption="Reactor fleet"
          />
        </Card>
      </Section>

      <Section name="LineChart">
        <Card title="U3O8 Price" label="USD/lb">
          <LineChart series={[spotSeries, forwardSeries]} ariaLabel="U3O8 price, spot and forward" height={300} />
        </Card>
      </Section>

      <Section name="BarChart">
        <Card title="Imports by Origin" label="tU">
          <BarChart series={importSeries} ariaLabel="Uranium imports by origin country" height={300} />
        </Card>
      </Section>

      <Section name="FormField">
        <div className="max-w-xs">
          <FormField label="Price" htmlFor="gallery-price" hint="USD per pound">
            <Input id="gallery-price" type="number" icon={<DollarSign size={14} />} />
          </FormField>
        </div>
      </Section>

      <Section name="Input">
        <div className="flex max-w-xs flex-col gap-3">
          <Input aria-label="Contract name" placeholder="Contract name" />
          <Input aria-label="Quantity" type="number" placeholder="0" />
        </div>
      </Section>

      <Section name="Select">
        <div className="max-w-xs">
          <Select
            aria-label="Material"
            options={[
              { value: "u3o8", label: "U3O8" },
              { value: "swu", label: "SWU" },
            ]}
            value={material}
            onChange={setMaterial}
          />
        </div>
      </Section>

      <Section name="Checkbox / Radio / Switch">
        <div className="flex flex-wrap items-center gap-6">
          <Checkbox label="Delivered" checked={checked} onChange={setChecked} />
          <Radio label="Utility" name="kind" value="utility" checked={kind === "utility"} onChange={(v) => setKind(v as typeof kind)} />
          <Radio label="Producer" name="kind" value="producer" checked={kind === "producer"} onChange={(v) => setKind(v as typeof kind)} />
          <Switch label="Live pricing" checked={live} onChange={setLive} />
        </div>
      </Section>

      <Section name="Slider">
        <div className="max-w-xs">
          <Slider ariaLabel="Discount" min={0} max={10} step={0.5} value={discount} onChange={setDiscount} showValue />
        </div>
      </Section>

      <Section name="Tag / TagInput">
        <div className="max-w-sm">
          <TagInput value={tags} onChange={setTags} ariaLabel="Materials" />
        </div>
      </Section>

      <Section name="Dropdown">
        <Dropdown
          trigger={<Button size="sm">Actions</Button>}
          items={[
            { label: "Edit", onSelect: () => {} },
            { label: "Delete", onSelect: () => {} },
          ]}
        />
      </Section>

      <Section name="Modal / ConfirmDialog">
        <div className="flex gap-3">
          <Button size="sm" onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setConfirmOpen(true)}>
            Open confirm dialog
          </Button>
        </div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Edit contract">
          <p className="text-sm text-ut-muted">Modal body content.</p>
        </Modal>
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => setConfirmOpen(false)}
          title="Delete counterparty"
          message="This cannot be undone."
        />
      </Section>

      <Section name="Toast">
        <ToastDemo />
      </Section>

      <Section name="Pagination">
        <Pagination page={page} pageCount={5} onPageChange={setPage} />
      </Section>

      <Section name="Stepper">
        <Stepper
          steps={[{ label: "Counterparty" }, { label: "Terms" }, { label: "Delivery" }, { label: "Review" }]}
          currentIndex={stepIndex}
        />
        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => setStepIndex((i) => Math.max(0, i - 1))}>
            Back
          </Button>
          <Button size="sm" onClick={() => setStepIndex((i) => Math.min(3, i + 1))}>
            Next
          </Button>
        </div>
      </Section>

      <Section name="Timeline">
        <Timeline
          items={[
            { id: "1", title: "Quarterly review call", timestamp: "2026-07-10", description: "Discussed Q3 pricing." },
            { id: "2", title: "Contract ct-3 opened", timestamp: "2026-06-20" },
          ]}
        />
      </Section>

      <Section name="Avatar">
        <div className="flex items-center gap-3">
          <Avatar name="Bryan Corder" size="sm" />
          <Avatar name="Bryan Corder" size="md" />
          <Avatar name="Bryan Corder" size="lg" />
        </div>
      </Section>

      <Section name="DatePicker">
        <div className="max-w-xs">
          <DatePicker ariaLabel="Delivery date" value={date} onChange={setDate} />
        </div>
      </Section>

      <Section name="Calendar">
        <Card>
          <Calendar
            year={calMonth.year}
            month={calMonth.month}
            events={[{ date: "2026-07-15", label: "U3O8 delivery" }]}
            onNavigate={(dir) =>
              setCalMonth(({ year, month }) => {
                const next = dir === "next" ? month + 1 : month - 1;
                return next > 12 ? { year: year + 1, month: 1 } : next < 1 ? { year: year - 1, month: 12 } : { year, month: next };
              })
            }
          />
        </Card>
      </Section>
    </div>
    </ToastProvider>
  );
}

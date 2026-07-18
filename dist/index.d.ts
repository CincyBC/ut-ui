import * as React from 'react';
import React__default from 'react';

type ButtonVariant = "primary" | "accent" | "ghost";
type ButtonSize = "sm" | "md";
interface ButtonProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}
declare function Button({ variant, size, className, type, ...rest }: ButtonProps): React__default.JSX.Element;

interface KickerProps {
    children: React__default.ReactNode;
    className?: string;
}
/** Uppercase letter-spaced section label flanked by rules — the "— ANALYTICS —" lockup. */
declare function Kicker({ children, className }: KickerProps): React__default.JSX.Element;

type BadgeTone = "neutral" | "green" | "teal" | "petrol" | "amber" | "rust";
interface BadgeProps {
    children: React__default.ReactNode;
    tone?: BadgeTone;
    className?: string;
}
declare function Badge({ children, tone, className }: BadgeProps): React__default.JSX.Element;
interface StatusBadgeProps {
    children: React__default.ReactNode;
    tone?: BadgeTone;
    className?: string;
}
/** Badge with the hexagonal status marker from the logo motif. */
declare function StatusBadge({ children, tone, className }: StatusBadgeProps): React__default.JSX.Element;

interface CardProps {
    children: React__default.ReactNode;
    className?: string;
    /** Card heading. */
    title?: React__default.ReactNode;
    /** Small uppercase label rendered above the title. */
    label?: string;
    /** Right-aligned header slot (filters, actions). */
    headerContent?: React__default.ReactNode;
    /** Adds the live-signal green glow. One per view, max. */
    live?: boolean;
}
declare function Card({ children, className, title, label, headerContent, live }: CardProps): React__default.JSX.Element;

interface PageHeaderProps {
    title: React__default.ReactNode;
    /** Kicker text rendered above the title (e.g. "Analytics"). */
    kicker?: string;
    description?: React__default.ReactNode;
    /** Right-aligned actions slot. */
    actions?: React__default.ReactNode;
    className?: string;
}
declare function PageHeader({ title, kicker, description, actions, className }: PageHeaderProps): React__default.JSX.Element;

type StatAccent = "green" | "teal" | "petrol" | "amber" | "rust";
interface StatDelta {
    value: number;
    /** Formats the delta for display; default: signed number. */
    format?: (n: number) => string;
}
interface StatCardProps {
    /** The headline number. Rendered in mono with tabular numerals. */
    value: React__default.ReactNode;
    label?: string;
    icon?: React__default.ElementType;
    accent?: StatAccent;
    /** Signed change; positive renders reactor green, negative rust. */
    delta?: StatDelta;
    footer?: React__default.ReactNode;
    /** Live-signal glow — one per view, max. */
    live?: boolean;
    className?: string;
}
declare function StatCard({ value, label, icon: Icon, accent, delta, footer, live, className, }: StatCardProps): React__default.JSX.Element;

interface SegmentedControlProps<V extends string> {
    options: readonly (V | {
        value: V;
        label: string;
    })[];
    value: V;
    onChange: (value: V) => void;
    size?: "sm" | "md";
    /** Required — rendered as the radiogroup's accessible name. */
    ariaLabel: string;
    className?: string;
}
/** Filter toolbar (e.g. MAX/5Y/1Y/1M/1W). Radiogroup semantics with arrow-key navigation. */
declare function SegmentedControl<V extends string>({ options, value, onChange, size, ariaLabel, className, }: SegmentedControlProps<V>): React__default.JSX.Element;

interface Tab<V extends string> {
    value: V;
    label: React__default.ReactNode;
}
interface TabsProps<V extends string> {
    tabs: readonly Tab<V>[];
    value: V;
    onChange: (value: V) => void;
    /** Panel content for the active tab. */
    children?: React__default.ReactNode;
    ariaLabel: string;
    className?: string;
}
/** Nav-style tabs with the brand 2px green active underline. */
declare function Tabs<V extends string>({ tabs, value, onChange, children, ariaLabel, className }: TabsProps<V>): React__default.JSX.Element;

interface TooltipProps {
    /** Tooltip text. */
    content: React__default.ReactNode;
    children: React__default.ReactElement;
    side?: "top" | "bottom";
    className?: string;
}
/**
 * Hover/focus tooltip. CSS-positioned relative to the trigger — no portal, so it
 * works inside Astro islands without layout providers.
 */
declare function Tooltip({ content, children, side, className }: TooltipProps): React__default.JSX.Element;

type ThemeMode = "light" | "dark" | "system";
declare const THEME_STORAGE_KEY = "ut-theme";
/**
 * Inline script string for a `<script is:inline>` in the document head, run
 * before hydration so the resolved theme is set pre-paint (no flash).
 */
declare const themeInitScript = "(function(){try{var k=\"ut-theme\";var m=localStorage.getItem(k)||\"system\";var d=m===\"dark\"||(m===\"system\"&&window.matchMedia(\"(prefers-color-scheme: dark)\").matches);document.documentElement.setAttribute(\"data-theme\",d?\"dark\":\"light\");}catch(e){}})();";
interface ThemeToggleProps {
    className?: string;
}
/** Light / dark / system theme switcher. Persists to localStorage and follows OS changes in system mode. */
declare function ThemeToggle({ className }: ThemeToggleProps): React__default.JSX.Element;

interface Column<T> {
    key: string;
    header: React__default.ReactNode;
    /** Cell renderer; defaults to `row[key]`. */
    cell?: (row: T) => React__default.ReactNode;
    /** Right-aligned mono tabular numerals. */
    numeric?: boolean;
    sortable?: boolean;
    /** Value used for sorting; defaults to `row[key]`. */
    sortValue?: (row: T) => string | number;
    align?: "left" | "right" | "center";
    width?: string;
}
interface DataTableProps<T> {
    columns: Column<T>[];
    rows: T[];
    getRowKey: (row: T) => string;
    defaultSort?: {
        key: string;
        dir: "asc" | "desc";
    };
    stickyHeader?: boolean;
    density?: "compact" | "normal";
    onRowClick?: (row: T) => void;
    emptyState?: React__default.ReactNode;
    /** Accessible table description. */
    caption?: string;
    className?: string;
}
declare function DataTable<T>({ columns, rows, getRowKey, defaultSort, stickyHeader, density, onRowClick, emptyState, caption, className, }: DataTableProps<T>): React__default.JSX.Element;

/**
 * Brand chart palette. Components accept these token names — never raw hex.
 * Series order per the brand guide: petrol → sage → silver → isotope → amber → rust.
 */
declare const chartPalette: {
    readonly petrol: "#3E5F73";
    readonly sage: "#83A28E";
    readonly silver: "#9AA6A4";
    readonly isotope: "#537A77";
    readonly amber: "#C9A227";
    readonly rust: "#B0533F";
    /** Highlight only: latest point, selection, forecast band. */
    readonly glow: "#A1C4A2";
    readonly reactor: "#4C7A5D";
};
type PaletteKey = keyof typeof chartPalette;
declare const seriesOrder: PaletteKey[];
declare function seriesColor(index: number, override?: PaletteKey): string;

type XValue = Date | number | string;
interface LineSeries {
    id: string;
    label?: string;
    data: {
        x: XValue;
        y: number;
    }[];
    /** Brand palette token — never a raw hex. */
    color?: PaletteKey;
    dashed?: boolean;
    area?: boolean;
}
interface LineChartProps {
    series: LineSeries[];
    height?: number;
    yFormat?: (n: number) => string;
    grid?: boolean;
    tooltip?: boolean;
    legend?: boolean;
    /** Force the y-axis to include 0 (totals/volumes). Prices should leave this off. */
    zeroBaseline?: boolean;
    /** Required — the chart is exposed as role="img". */
    ariaLabel: string;
    className?: string;
}
/** String x-values use a point scale; Date/number use time/linear. All series share one x type. */
declare function LineChart({ series, height, yFormat, grid, tooltip, legend, zeroBaseline, ariaLabel, className, }: LineChartProps): React__default.JSX.Element;

interface BarSeries {
    id: string;
    label?: string;
    /** Brand palette token — never a raw hex. */
    color?: PaletteKey;
    data: {
        category: string;
        value: number;
    }[];
}
interface BarChartProps {
    series: BarSeries[];
    height?: number;
    /** Multiple series stack by default (matches customs/inventory usage). */
    stacked?: boolean;
    yFormat?: (n: number) => string;
    legend?: boolean;
    tooltip?: boolean;
    /** Required — the chart is exposed as role="img". */
    ariaLabel: string;
    className?: string;
}
declare function BarChart({ series, height, stacked, yFormat, legend, tooltip, ariaLabel, className, }: BarChartProps): React__default.JSX.Element;

/** Observes the container's width via ResizeObserver. */
declare function useMeasure<T extends HTMLElement>(): {
    ref: React.RefObject<T | null>;
    width: number;
};

interface FormFieldProps {
    label: string;
    htmlFor: string;
    hint?: string;
    error?: string;
    children: React__default.ReactElement<{
        "aria-invalid"?: boolean;
    }>;
    className?: string;
}
/** Label + hint/error wrapper for a single form control. Pass the control (Input, Select, ...) as children. */
declare function FormField({ label, htmlFor, hint, error, children, className }: FormFieldProps): React__default.JSX.Element;

interface InputProps extends React__default.InputHTMLAttributes<HTMLInputElement> {
    icon?: React__default.ReactNode;
}
/** Text/number/email input. Numeric types get tabular mono digits. */
declare const Input: React__default.ForwardRefExoticComponent<InputProps & React__default.RefAttributes<HTMLInputElement>>;

interface SelectOption<V extends string> {
    value: V;
    label: string;
}
interface SelectProps<V extends string> extends Omit<React__default.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
    options: readonly SelectOption<V>[];
    value: V;
    onChange: (value: V) => void;
}
/** Native <select>, brand-styled. Keyboard/a11y come from the platform for free. */
declare function Select<V extends string>({ options, value, onChange, className, ...props }: SelectProps<V>): React__default.JSX.Element;

interface CheckboxProps {
    label: React__default.ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}
declare function Checkbox({ label, checked, onChange, disabled, className }: CheckboxProps): React__default.JSX.Element;
interface RadioProps {
    label: React__default.ReactNode;
    name: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
    disabled?: boolean;
    className?: string;
}
declare function Radio({ label, name, value, checked, onChange, disabled, className }: RadioProps): React__default.JSX.Element;
interface SwitchProps {
    label: React__default.ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}
declare function Switch({ label, checked, onChange, disabled, className }: SwitchProps): React__default.JSX.Element;

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React__default.ReactNode;
    className?: string;
}
/** Focus-trapped, Escape-to-close modal dialog rendered via portal. */
declare function Modal({ open, onClose, title, children, className }: ModalProps): React__default.ReactPortal | null;
interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: React__default.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
}
/** Modal preset for destructive-action confirmation. */
declare function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel, cancelLabel, }: ConfirmDialogProps): React__default.JSX.Element;

type ToastTone = "info" | "success" | "error";
interface ToastInput {
    message: string;
    tone?: ToastTone;
    durationMs?: number;
}
interface ToastContextValue {
    showToast: (toast: ToastInput) => void;
}
declare function ToastProvider({ children }: {
    children: React__default.ReactNode;
}): React__default.JSX.Element;
/** Access the toast API. Must be used within a <ToastProvider>. */
declare function useToast(): ToastContextValue;

interface DropdownItem {
    label: React__default.ReactNode;
    onSelect: () => void;
    disabled?: boolean;
}
interface DropdownProps {
    trigger: React__default.ReactElement<{
        onClick?: (e: React__default.MouseEvent) => void;
        "aria-haspopup"?: boolean;
        "aria-expanded"?: boolean;
    }>;
    items: DropdownItem[];
    align?: "start" | "end";
    className?: string;
}
/** Keyboard-navigable action menu anchored to a trigger element. */
declare function Dropdown({ trigger, items, align, className }: DropdownProps): React__default.JSX.Element;

interface TagProps {
    label: string;
    onRemove?: () => void;
    className?: string;
}
/** Pill for a single removable label. The only pill-shaped element allowed by brand rules. */
declare function Tag({ label, onRemove, className }: TagProps): React__default.JSX.Element;
interface TagInputProps {
    value: string[];
    onChange: (value: string[]) => void;
    ariaLabel?: string;
    placeholder?: string;
    className?: string;
}
/** Type-and-Enter tag editor built on Tag. */
declare function TagInput({ value, onChange, ariaLabel, placeholder, className }: TagInputProps): React__default.JSX.Element;

interface SliderProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    step?: number;
    ariaLabel: string;
    showValue?: boolean;
    className?: string;
}
/** Single-thumb range slider. Native <input type="range"> for free a11y/keyboard support. */
declare function Slider({ min, max, value, onChange, step, ariaLabel, showValue, className }: SliderProps): React.JSX.Element;

interface PaginationProps {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    className?: string;
}
/** Prev/Next pager for use below a DataTable. Slice `rows` by page in the caller. */
declare function Pagination({ page, pageCount, onPageChange, className }: PaginationProps): React.JSX.Element | null;

interface StepperStep {
    label: string;
}
interface StepperProps {
    steps: StepperStep[];
    currentIndex: number;
    className?: string;
}
/** Horizontal step indicator with hexagon markers (brand motif). */
declare function Stepper({ steps, currentIndex, className }: StepperProps): React.JSX.Element;

interface TimelineItem {
    id: string;
    title: React__default.ReactNode;
    timestamp: string;
    description?: React__default.ReactNode;
}
interface TimelineProps {
    items: TimelineItem[];
    className?: string;
}
/** Vertical activity feed with hexagon nodes on a hairline rail. */
declare function Timeline({ items, className }: TimelineProps): React__default.JSX.Element;

interface AvatarProps {
    name: string;
    src?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}
/** Hexagonal-framed avatar. Falls back to initials when no src is given. */
declare function Avatar({ name, src, size, className }: AvatarProps): React.JSX.Element;

interface DatePickerProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    ariaLabel: string;
    min?: string;
    max?: string;
    className?: string;
}
/** Styled native <input type="date">. Swap for a custom month popover if scope grows. */
declare function DatePicker({ id, value, onChange, ariaLabel, min, max, className }: DatePickerProps): React.JSX.Element;

interface CalendarEvent {
    date: string;
    label: string;
}
interface CalendarProps {
    /** Full year, e.g. 2026. */
    year: number;
    /** 1-12. */
    month: number;
    events: CalendarEvent[];
    onNavigate: (direction: "prev" | "next") => void;
    onDateClick?: (date: string) => void;
    className?: string;
}
/** Month-grid calendar. Pass events keyed by ISO date; navigation is controlled by the caller. */
declare function Calendar({ year, month, events, onNavigate, onDateClick, className }: CalendarProps): React.JSX.Element;

export { Avatar, type AvatarProps, Badge, type BadgeProps, type BadgeTone, BarChart, type BarChartProps, type BarSeries, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Calendar, type CalendarEvent, type CalendarProps, Card, type CardProps, Checkbox, type CheckboxProps, type Column, ConfirmDialog, type ConfirmDialogProps, DataTable, type DataTableProps, DatePicker, type DatePickerProps, Dropdown, type DropdownItem, type DropdownProps, FormField, type FormFieldProps, Input, type InputProps, Kicker, type KickerProps, LineChart, type LineChartProps, type LineSeries, Modal, type ModalProps, PageHeader, type PageHeaderProps, Pagination, type PaginationProps, type PaletteKey, Radio, type RadioProps, SegmentedControl, type SegmentedControlProps, Select, type SelectOption, type SelectProps, Slider, type SliderProps, type StatAccent, StatCard, type StatCardProps, type StatDelta, StatusBadge, type StatusBadgeProps, Stepper, type StepperProps, type StepperStep, Switch, type SwitchProps, THEME_STORAGE_KEY, type Tab, Tabs, type TabsProps, Tag, TagInput, type TagInputProps, type TagProps, type ThemeMode, ThemeToggle, type ThemeToggleProps, Timeline, type TimelineItem, type TimelineProps, type ToastInput, ToastProvider, type ToastTone, Tooltip, type TooltipProps, type XValue, chartPalette, seriesColor, seriesOrder, themeInitScript, useMeasure, useToast };

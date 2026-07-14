"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

type Props = {
  label: string;
  placeholder: string;
  value: Date | null;
  onChange: (date: Date) => void;
};

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function sameDay(a: Date | null, b: Date) {
  return (
    !!a &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Fully custom date field — no native date input. The ENTIRE field is
 * clickable (not just a calendar icon) and opens a glass calendar popup.
 */
export default function DatePicker({
  label,
  placeholder,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => {
    const now = value ?? new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const grid = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    // Monday-first offset
    const offset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(view.year, view.month, d));
    }
    return cells;
  }, [view]);

  const shiftMonth = (delta: number) => {
    setView((v) => {
      const next = new Date(v.year, v.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  };

  const today = new Date();

  return (
    <div ref={rootRef} className="relative flex flex-col gap-2">
      <span className="text-[10px] tracking-[0.3em] text-mist uppercase">
        {label}
      </span>

      {/* whole field opens the calendar */}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm transition-colors duration-300",
          open
            ? "border-paper/40 bg-paper/10"
            : "border-paper/15 bg-paper/5 hover:border-paper/30",
        )}
      >
        <span className={value ? "text-paper" : "text-mist"}>
          {value
            ? `${value.getDate()} ${MONTHS[value.getMonth()].slice(0, 3)} ${value.getFullYear()}`
            : placeholder}
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <rect
            x="1"
            y="2.5"
            width="12"
            height="10.5"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path d="M1 6h12" stroke="currentColor" strokeWidth="1.1" />
          <path
            d="M4.5 1v3M9.5 1v3"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* calendar popup */}
      <div
        role="dialog"
        aria-label="Choose a date"
        data-lenis-prevent
        className={clsx(
          "glass-strong absolute top-full right-0 left-0 z-30 mt-2 origin-top rounded-2xl p-4 transition-all duration-300",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0",
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="grid h-8 w-8 place-items-center rounded-full text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
            aria-label="Previous month"
          >
            ←
          </button>
          <span className="text-sm font-medium">
            {MONTHS[view.month]} {view.year}
          </span>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="grid h-8 w-8 place-items-center rounded-full text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
            aria-label="Next month"
          >
            →
          </button>
        </div>

        <div className="mb-1 grid grid-cols-7 gap-1">
          {WEEKDAYS.map((d) => (
            <span
              key={d}
              className="grid h-8 place-items-center text-[10px] tracking-wider text-mist uppercase"
            >
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {grid.map((date, i) =>
            date ? (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onChange(date);
                  setOpen(false);
                }}
                className={clsx(
                  "grid h-8 place-items-center rounded-lg text-xs transition-colors duration-150",
                  sameDay(value, date)
                    ? "bg-paper font-medium text-ink"
                    : sameDay(today, date)
                      ? "border border-paper/40 text-paper"
                      : "text-paper/75 hover:bg-paper/10",
                )}
              >
                {date.getDate()}
              </button>
            ) : (
              <span key={i} />
            ),
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";

type Props = {
  label: string;
  placeholder: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
};

/**
 * Fully custom dropdown — no native <select>. Glass popup, keyboard
 * accessible, closes on outside click / Escape. `data-lenis-prevent`
 * keeps smooth-scroll from hijacking the option list.
 */
export default function CustomSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

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

  return (
    <div ref={rootRef} className="relative flex flex-col gap-2">
      <span className="text-[10px] tracking-[0.3em] text-mist uppercase">
        {label}
      </span>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm transition-colors duration-300",
          open
            ? "border-paper/40 bg-paper/10"
            : "border-paper/15 bg-paper/5 hover:border-paper/30",
        )}
      >
        <span className={value ? "text-paper" : "text-mist"}>
          {value ?? placeholder}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={clsx(
            "transition-transform duration-300",
            open && "rotate-180",
          )}
          aria-hidden
        >
          <path
            d="M2 4l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </button>

      <div
        id={listId}
        role="listbox"
        data-lenis-prevent
        className={clsx(
          "glass-strong absolute top-full right-0 left-0 z-30 mt-2 max-h-56 origin-top overflow-auto rounded-xl p-1.5 transition-all duration-300",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0",
        )}
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="option"
            aria-selected={value === option}
            onClick={() => {
              onChange(option);
              setOpen(false);
            }}
            className={clsx(
              "flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-sm transition-colors duration-200",
              value === option
                ? "bg-paper text-ink"
                : "text-paper/80 hover:bg-paper/10",
            )}
          >
            {option}
            {value === option && <span aria-hidden>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

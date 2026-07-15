"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { markAppRevealed } from "@/lib/reveal";
import { useSmoothScroll } from "@/components/providers/LenisProvider";

const NAME = "ADITYA SOMA";
const LETTER_DELAY = 300; // ms before the name starts rising
const COUNT_START = 750; // ms before the counter starts
const COUNT_DURATION = 2000; // ms for 000 -> 100
const HOLD = 300; // ms pause at 100
const EXIT_DURATION = 1100; // must match .pl-root transition in globals.css

const STAGES = [
  { at: 0, label: "Booting" },
  { at: 30, label: "Loading assets" },
  { at: 65, label: "Composing layout" },
  { at: 92, label: "Ready" },
];

const stageLabel = (n: number) =>
  STAGES.reduce((acc, s) => (n >= s.at ? s.label : acc), STAGES[0].label);

/**
 * First-load preloader: three fixed zones (header / stage / footer) so the
 * composition stays put at any viewport. Driven by CSS animations and plain
 * timers, never an animation library, so it cannot stall half-revealed.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    stop();
    document.documentElement.style.overflow = "hidden";

    const startedAt = performance.now();
    const interval = setInterval(() => {
      const t = (performance.now() - startedAt - COUNT_START) / COUNT_DURATION;
      if (t < 0) return;
      const clamped = Math.min(1, t);
      const eased = 1 - Math.pow(1 - clamped, 3);
      setCount(Math.round(eased * 100));
      if (clamped >= 1) clearInterval(interval);
    }, 40);

    const exitAt = COUNT_START + COUNT_DURATION + HOLD;
    const exitTimer = setTimeout(() => setExiting(true), exitAt);
    const doneTimer = setTimeout(() => {
      document.documentElement.style.overflow = "";
      start();
      markAppRevealed();
      setDone(true);
    }, exitAt + EXIT_DURATION);

    const onMove = (e: MouseEvent) => {
      glowRef.current?.style.setProperty(
        "transform",
        `translate(${e.clientX - 176}px, ${e.clientY - 176}px)`,
      );
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.style.overflow = "";
    };
  }, [stop, start]);

  if (done) return null;

  return (
    <div
      className={clsx(
        "pl-root grain fixed inset-0 z-[100] flex flex-col overflow-hidden bg-ink",
        exiting && "pl-exit",
      )}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 h-88 w-88 rounded-full opacity-50 transition-transform duration-700 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.13), transparent 66%)",
          filter: "blur(12px)",
        }}
      />

      <div className="pl-inner relative z-10 flex h-full flex-col">
        {/* zone 1: header */}
        <header className="pl-meta flex shrink-0 items-center justify-between border-b border-paper/10 px-5 py-4 text-[10px] tracking-[0.35em] text-mist uppercase md:px-10 md:py-5">
          <span className="text-paper">
            AS<sup className="text-[0.7em]">©</sup>
          </span>
          <span>Portfolio 2026</span>
        </header>

        {/* zone 2: stage */}
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-5">
          <h1 className="flex justify-center text-[clamp(2.25rem,10vw,9rem)] leading-none font-medium tracking-tight">
            {NAME.split("").map((ch, i) =>
              ch === " " ? (
                <span key={i} className="w-[0.3em] shrink-0" aria-hidden />
              ) : (
                <span
                  key={i}
                  className="-my-[0.12em] shrink-0 overflow-hidden py-[0.12em]"
                >
                  <span
                    className="pl-letter text-gradient"
                    style={{ animationDelay: `${LETTER_DELAY + i * 45}ms` }}
                  >
                    {ch}
                  </span>
                </span>
              ),
            )}
          </h1>
          <p
            className="pl-meta text-center text-[10px] tracking-[0.4em] text-mist uppercase"
            style={{ animationDelay: "0.85s" }}
          >
            Bali based creative developer
          </p>
        </div>

        {/* zone 3: footer */}
        <footer className="flex shrink-0 items-end justify-between gap-4 border-t border-paper/10 px-5 py-5 md:px-10 md:py-6">
          <span
            className="pl-meta text-[10px] tracking-[0.35em] text-mist uppercase"
            style={{ animationDelay: "0.95s" }}
          >
            {stageLabel(count)}
          </span>
          <span className="flex items-baseline gap-1.5 leading-none">
            <span className="text-gradient text-5xl font-medium tabular-nums tracking-tight md:text-7xl">
              {String(count).padStart(3, "0")}
            </span>
            <span className="text-[10px] tracking-[0.3em] text-mist uppercase">
              %
            </span>
          </span>
        </footer>
      </div>

      {/* progress rail, pinned to the very bottom edge */}
      <div className="absolute bottom-0 left-0 z-10 h-px w-full bg-paper/10">
        <div
          className="h-full origin-left bg-paper transition-transform duration-150 ease-linear"
          style={{ transform: `scaleX(${count / 100})` }}
        />
      </div>
    </div>
  );
}

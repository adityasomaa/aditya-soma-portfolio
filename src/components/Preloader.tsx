"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { markAppRevealed } from "@/lib/reveal";
import { useSmoothScroll } from "@/components/providers/LenisProvider";

const NAME = "ADITYA SOMA";
const LETTER_DELAY = 250; // ms before letters start
const COUNT_START = 700; // ms before counter starts
const COUNT_DURATION = 1900; // ms for 0 -> 100
const HOLD = 250; // ms pause at 100
const EXIT_DURATION = 1100; // matches .pl-root transition in CSS

/**
 * First-load preloader driven entirely by CSS animations, transitions
 * and plain timers. No animation library involved, so it can never get
 * stuck on a frozen ticker or a killed timeline.
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

    // interactive glow chases the cursor (CSS transition does the easing)
    const onMove = (e: MouseEvent) => {
      glowRef.current?.style.setProperty(
        "transform",
        `translate(${e.clientX - 160}px, ${e.clientY - 160}px)`,
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
        "pl-root grain fixed inset-0 z-[100] overflow-hidden bg-ink",
        exiting && "pl-exit",
      )}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 h-80 w-80 rounded-full opacity-60 transition-transform duration-500 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.14), transparent 65%)",
          filter: "blur(10px)",
        }}
      />

      <div className="pl-inner relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
        <div
          className="pl-meta flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-mist"
          style={{ animationDelay: "0.5s" }}
        >
          <span>Portfolio ©2026</span>
          <span>Creative Developer</span>
        </div>

        <h1 className="flex flex-wrap text-[13vw] leading-[0.95] font-medium tracking-tighter md:text-[9vw]">
          {NAME.split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} className="w-[0.35em]" />
            ) : (
              <span key={i} className="inline-block overflow-hidden">
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

        <div className="flex items-end justify-between">
          <p
            className="pl-meta max-w-56 text-[10px] uppercase tracking-[0.35em] text-mist"
            style={{ animationDelay: "0.65s" }}
          >
            Loading the good stuff. Move your cursor around
          </p>
          <span className="text-gradient text-6xl font-medium tabular-nums tracking-tight md:text-8xl">
            {String(count).padStart(3, "0")}
          </span>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-paper/60 transition-transform duration-150 ease-linear"
        style={{ transform: `scaleX(${count / 100})` }}
      />
    </div>
  );
}

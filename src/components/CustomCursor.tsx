"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Blend-mode cursor: a crisp dot plus a lazy trailing ring.
 * The ring inflates over links/buttons and can show a label via
 * the closest `data-cursor-text` attribute. Desktop only.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-native-hidden");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const withText = target.closest<HTMLElement>("[data-cursor-text]");
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, [data-cursor]",
      );

      if (withText) {
        label.textContent = withText.dataset.cursorText ?? "";
        gsap.to(ring, { scale: 3.2, duration: 0.35, ease: "power3.out" });
        gsap.to(label, { opacity: 1, duration: 0.25 });
        gsap.to(dot, { scale: 0, duration: 0.25 });
      } else if (interactive) {
        gsap.to(ring, { scale: 1.9, duration: 0.35, ease: "power3.out" });
        gsap.to(label, { opacity: 0, duration: 0.2 });
        gsap.to(dot, { scale: 0.5, duration: 0.25 });
      } else {
        gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out" });
        gsap.to(label, { opacity: 0, duration: 0.2 });
        gsap.to(dot, { scale: 1, duration: 0.25 });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      document.documentElement.classList.remove("cursor-native-hidden");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[95] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[95] grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-paper/50 mix-blend-difference"
      >
        <span
          ref={labelRef}
          className="text-[7px] font-medium tracking-[0.2em] text-paper uppercase opacity-0"
        >
          View
        </span>
      </div>
    </>
  );
}

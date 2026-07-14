"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markAppRevealed } from "@/lib/reveal";
import { useSmoothScroll } from "@/components/providers/LenisProvider";

const NAME = "ADITYA SOMA";

/**
 * First-load preloader: staggered name reveal, 0→100 counter,
 * a glow that chases the cursor, then a full curtain lift.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (done) return;
    stop();
    document.documentElement.style.overflow = "hidden";

    const root = rootRef.current!;
    const letters = root.querySelectorAll<HTMLElement>(".pl-letter");
    const meta = root.querySelectorAll<HTMLElement>(".pl-meta");

    // interactive glow follows the cursor
    const xTo = gsap.quickTo(glowRef.current, "x", {
      duration: 0.6,
      ease: "power3",
    });
    const yTo = gsap.quickTo(glowRef.current, "y", {
      duration: 0.6,
      ease: "power3",
    });
    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", onMove);

    const progress = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        markAppRevealed();
        document.documentElement.style.overflow = "";
        start();
        setDone(true);
      },
    });

    tl.fromTo(
      letters,
      { yPercent: 120, rotate: 6 },
      {
        yPercent: 0,
        rotate: 0,
        duration: 0.9,
        stagger: 0.045,
        ease: "power4.out",
        delay: 0.25,
      },
    )
      .fromTo(
        meta,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" },
        "-=0.5",
      )
      .to(
        progress,
        {
          value: 100,
          duration: 1.9,
          ease: "power2.inOut",
          onUpdate: () => {
            const v = Math.round(progress.value);
            if (counterRef.current) {
              counterRef.current.textContent = String(v).padStart(3, "0");
            }
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${progress.value / 100})`;
            }
          },
        },
        "<",
      )
      .to(root.querySelector(".pl-content"), {
        yPercent: -18,
        opacity: 0,
        duration: 0.55,
        ease: "power2.in",
      })
      .to(
        root,
        { yPercent: -100, duration: 1.0, ease: "power4.inOut" },
        "-=0.25",
      );

    return () => {
      window.removeEventListener("mousemove", onMove);
      tl.kill();
    };
  }, [done, stop, start]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="grain grain-static fixed inset-0 z-[100] overflow-hidden bg-ink"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.14), transparent 65%)",
          filter: "blur(10px)",
        }}
      />

      <div className="pl-content relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
        <div className="pl-meta flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-mist">
          <span>Portfolio ©2026</span>
          <span>Creative Developer</span>
        </div>

        <div className="overflow-hidden">
          <h1 className="flex flex-wrap text-[13vw] leading-[0.95] font-medium tracking-tighter md:text-[9vw]">
            {NAME.split("").map((ch, i) =>
              ch === " " ? (
                <span key={i} className="w-[0.35em]" />
              ) : (
                <span key={i} className="inline-block overflow-hidden">
                  <span className="pl-letter text-gradient inline-block will-change-transform">
                    {ch}
                  </span>
                </span>
              ),
            )}
          </h1>
        </div>

        <div className="flex items-end justify-between">
          <p className="pl-meta max-w-56 text-[10px] uppercase tracking-[0.35em] text-mist">
            Loading the good stuff — move your cursor around
          </p>
          <span
            ref={counterRef}
            className="text-gradient text-6xl font-medium tabular-nums tracking-tight md:text-8xl"
          >
            000
          </span>
        </div>
      </div>

      <div
        ref={barRef}
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-paper/60"
      />
    </div>
  );
}

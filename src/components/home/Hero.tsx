"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { onAppReveal } from "@/lib/reveal";
import { stacks } from "@/lib/data";
import Marquee from "@/components/Marquee";

const LINES = ["CREATIVE", "DEVELOPER"];

/**
 * Hero reveal is CSS-driven: the `hero-ready` class flips the initial
 * state and transitions do the rest, so a stalled animation ticker can
 * never leave the headline stuck off-screen.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cancel = onAppReveal(() => setReady(true));

    // Safety net: reveal no matter what, even if the loader never signals.
    const fallback = setTimeout(() => setReady(true), 6000);

    const root = rootRef.current!;
    // The -translate-*-1/2 classes already centre the orb via the standalone
    // `translate` property, which composes with `transform`. Only the cursor
    // offset belongs here, or the orb ends up half its size off-target.
    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      orbRef.current?.style.setProperty(
        "transform",
        `translate(${e.clientX - rect.width / 2}px, ${e.clientY - rect.height / 2}px)`,
      );
    };
    root.addEventListener("mousemove", onMove);

    return () => {
      cancel();
      clearTimeout(fallback);
      root.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={clsx(
        "relative flex min-h-svh flex-col justify-between overflow-hidden pt-28",
        ready && "hero-ready",
      )}
    >
      <div className="bg-radial-glow pointer-events-none absolute inset-0" />
      <div
        ref={orbRef}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 transition-transform duration-1000 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12), transparent 62%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-10">
        <p
          className="hero-fade mb-6 text-[10px] tracking-[0.4em] text-mist uppercase"
          style={{ transitionDelay: "0.75s" }}
        >
          Aditya Soma / Portfolio ©2026
        </p>

        <h1 className="text-gradient text-[16vw] leading-[0.92] font-medium tracking-tighter md:text-[11vw]">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                className="hero-line block"
                style={{ transitionDelay: `${0.35 + i * 0.12}s` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            className="hero-fade max-w-md text-base leading-relaxed text-mist md:text-lg"
            style={{ transitionDelay: "0.85s" }}
          >
            Bali based creative developer with 3+ years of experience
            building websites, digital products, and AI automations for
            brands worldwide.
          </p>
          <div
            className="hero-fade flex items-center gap-3 text-[10px] tracking-[0.35em] text-mist uppercase"
            style={{ transitionDelay: "0.95s" }}
          >
            <span className="glass inline-block h-10 w-6 rounded-full p-1.5">
              <span className="block h-2 w-full animate-bounce rounded-full bg-paper/80" />
            </span>
            Scroll
          </div>
        </div>
      </div>

      <div
        className="hero-fade relative z-10 mt-16 border-y border-paper/10 py-5"
        style={{ transitionDelay: "1.05s" }}
      >
        <Marquee
          items={stacks}
          className="text-2xl font-medium tracking-tight text-paper/50 md:text-4xl"
          duration={32}
        />
      </div>
    </section>
  );
}

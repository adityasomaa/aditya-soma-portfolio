"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { onAppReveal } from "@/lib/reveal";
import Marquee from "@/components/Marquee";

const LINES = ["CREATIVE", "DEVELOPER"];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const ctx = gsap.context(() => {
      gsap.set(root.querySelectorAll(".hero-line"), { yPercent: 115 });
      gsap.set(root.querySelectorAll(".hero-fade"), { opacity: 0, y: 24 });
    }, root);

    const cancel = onAppReveal(() => {
      const tl = gsap.timeline({ delay: 0.35 });
      tl.to(root.querySelectorAll(".hero-line"), {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
      }).to(
        root.querySelectorAll(".hero-fade"),
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6",
      );
    });

    // mouse-follow gradient orb
    const xTo = gsap.quickTo(orbRef.current, "x", {
      duration: 1.2,
      ease: "power3",
    });
    const yTo = gsap.quickTo(orbRef.current, "y", {
      duration: 1.2,
      ease: "power3",
    });
    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      xTo(e.clientX - rect.width / 2);
      yTo(e.clientY - rect.height / 2);
    };
    root.addEventListener("mousemove", onMove);

    return () => {
      cancel();
      root.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-28"
    >
      <div className="bg-radial-glow pointer-events-none absolute inset-0" />
      <div
        ref={orbRef}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12), transparent 62%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-10">
        <p className="hero-fade mb-6 text-[10px] tracking-[0.4em] text-mist uppercase">
          Aditya Soma — Portfolio ©2026
        </p>

        <h1 className="text-gradient text-[16vw] leading-[0.92] font-medium tracking-tighter md:text-[11vw]">
          {LINES.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span className="hero-line block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-base leading-relaxed text-mist md:text-lg">
            I design and build monochrome digital experiences — smooth,
            grainy, and deliberately anti-mainstream. Based in Jakarta,
            working worldwide.
          </p>
          <div className="hero-fade flex items-center gap-3 text-[10px] tracking-[0.35em] text-mist uppercase">
            <span className="glass inline-block h-10 w-6 rounded-full p-1.5">
              <span className="block h-2 w-full animate-bounce rounded-full bg-paper/80" />
            </span>
            Scroll
          </div>
        </div>
      </div>

      <div className="hero-fade relative z-10 mt-16 border-y border-paper/10 py-5">
        <Marquee
          items={[
            "Web Experiences",
            "Interactive Design",
            "Creative Development",
            "Motion Direction",
            "Glassmorphism",
            "Monochrome",
          ]}
          className="text-2xl font-medium tracking-tight text-paper/50 md:text-4xl"
          duration={32}
        />
      </div>
    </section>
  );
}

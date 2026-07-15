"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrubWords } from "@/components/TextReveal";

import { stacks } from "@/lib/data";

/**
 * Manifesto paragraph that brightens word-by-word on scroll, plus a
 * field of skill chips that physically repel from the cursor.
 */
export default function Manifesto() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const field = fieldRef.current!;
    const chips = Array.from(field.querySelectorAll<HTMLElement>(".chip"));

    const setters = chips.map((chip) => ({
      x: gsap.quickTo(chip, "x", { duration: 0.7, ease: "power3" }),
      y: gsap.quickTo(chip, "y", { duration: 0.7, ease: "power3" }),
    }));

    const onMove = (e: MouseEvent) => {
      chips.forEach((chip, i) => {
        const rect = chip.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - e.clientX;
        const dy = cy - e.clientY;
        const dist = Math.hypot(dx, dy);
        const radius = 160;
        if (dist < radius && dist > 0) {
          const force = ((radius - dist) / radius) * 46;
          setters[i].x((dx / dist) * force);
          setters[i].y((dy / dist) * force);
        } else {
          setters[i].x(0);
          setters[i].y(0);
        }
      });
    };
    const onLeave = () => {
      setters.forEach((s) => {
        s.x(0);
        s.y(0);
      });
    };

    field.addEventListener("mousemove", onMove);
    field.addEventListener("mouseleave", onLeave);
    return () => {
      field.removeEventListener("mousemove", onMove);
      field.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="bg-radial-glow pointer-events-none absolute inset-0 rotate-180" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <p className="mb-4 text-[10px] tracking-[0.4em] text-mist uppercase">
          03 / Manifesto
        </p>
        <ScrubWords className="max-w-4xl text-3xl leading-[1.25] font-medium tracking-tight md:text-5xl">
          Websites that convert. Social presence that gives life to the
          brand. Ads that reach the right people, and AI automations that
          quietly handle the busywork. One partner for the whole digital
          side of your business.
        </ScrubWords>

        <div
          ref={fieldRef}
          className="mt-20 flex max-w-4xl flex-wrap gap-3 py-6"
        >
          {stacks.map((skill) => (
            <span
              key={skill}
              className="chip glass rounded-full px-5 py-2.5 text-sm text-paper/80 will-change-transform select-none"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[10px] tracking-[0.3em] text-mist/60 uppercase">
          Try chasing them with your cursor
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { gsap } from "@/lib/gsap";
import { works } from "@/lib/data";
import TransitionLink from "@/components/TransitionLink";
import WorkVisual from "@/components/WorkVisual";
import { SplitReveal, FadeUp } from "@/components/TextReveal";

/**
 * Work list rows with a floating gradient preview that chases the
 * cursor while hovering — desktop only.
 */
export default function SelectedWorks() {
  const rootRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = rootRef.current!;
    const preview = previewRef.current!;

    const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3" });
    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    root.addEventListener("mousemove", onMove);
    return () => root.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    gsap.to(previewRef.current, {
      scale: hovered === null ? 0 : 1,
      rotate: hovered === null ? -6 : 0,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [hovered]);

  return (
    <section ref={rootRef} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="mb-4 text-[10px] tracking-[0.4em] text-mist uppercase">
              01 — Selected works
            </p>
            <SplitReveal
              as="h2"
              className="text-gradient text-4xl font-medium tracking-tight md:text-6xl"
            >
              Things I shipped recently
            </SplitReveal>
          </div>
          <TransitionLink
            href="/works"
            className="link-line hidden shrink-0 pb-2 text-sm text-mist md:block"
          >
            All works →
          </TransitionLink>
        </div>

        <div className="border-t border-paper/10">
          {works.map((work, i) => (
            <FadeUp key={work.slug} delay={i * 0.05}>
              <TransitionLink
                href={`/works/${work.slug}`}
                data-cursor-text="View"
                className="group flex items-center justify-between gap-6 border-b border-paper/10 py-8 transition-colors duration-500 md:py-10"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-baseline gap-5 md:gap-10">
                  <span className="text-xs text-mist tabular-nums">
                    0{i + 1}
                  </span>
                  <h3
                    className={clsx(
                      "text-3xl font-medium tracking-tight transition-all duration-500 md:text-6xl",
                      hovered !== null && hovered !== i
                        ? "text-paper/25"
                        : "text-paper group-hover:translate-x-3",
                    )}
                  >
                    {work.title}
                  </h3>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1 text-right">
                  <span className="text-xs tracking-[0.2em] text-mist uppercase md:text-sm">
                    {work.category}
                  </span>
                  <span className="text-xs text-mist/60">{work.year}</span>
                </div>
              </TransitionLink>
            </FadeUp>
          ))}
        </div>

        <TransitionLink
          href="/works"
          className="link-line mt-10 inline-block text-sm text-mist md:hidden"
        >
          All works →
        </TransitionLink>
      </div>

      {/* floating preview */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed top-0 left-0 z-30 hidden h-56 w-44 origin-center -translate-x-1/2 -translate-y-1/2 scale-0 overflow-hidden rounded-2xl [container-type:inline-size] md:block"
      >
        {works.map((work, i) => (
          <div
            key={work.slug}
            className={clsx(
              "absolute inset-0 transition-opacity duration-300",
              hovered === i ? "opacity-100" : "opacity-0",
            )}
          >
            <WorkVisual work={work} className="h-full w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

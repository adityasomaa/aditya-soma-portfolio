"use client";

import { services } from "@/lib/data";
import { SplitReveal } from "@/components/TextReveal";

/** Sticky-stacked glass cards: each card pins and the next slides over it. */
export default function Services() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="mb-4 text-[10px] tracking-[0.4em] text-mist uppercase">
          02 / What I do
        </p>
        <SplitReveal
          as="h2"
          className="text-gradient mb-16 max-w-3xl text-4xl font-medium tracking-tight md:text-6xl"
        >
          Capabilities, stacked in your favor
        </SplitReveal>

        <div className="flex flex-col gap-6">
          {services.map((service, i) => (
            <div
              key={service.index}
              className="glass grain sticky overflow-hidden rounded-3xl p-7 md:p-12"
              style={{ top: `${7 + i * 2.2}rem` }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(${120 + i * 40}deg, rgba(255,255,255,${0.05 + i * 0.015}), transparent 55%)`,
                }}
              />
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex items-baseline gap-6 md:max-w-md">
                  <span className="text-outline text-5xl font-medium md:text-7xl">
                    {service.index}
                  </span>
                  <h3 className="text-2xl font-medium tracking-tight md:text-4xl">
                    {service.title}
                  </h3>
                </div>
                <div className="max-w-md">
                  <p className="mb-5 leading-relaxed text-mist">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-paper/15 px-3.5 py-1.5 text-xs text-paper/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

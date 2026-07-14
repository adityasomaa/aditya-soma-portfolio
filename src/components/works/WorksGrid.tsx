"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { works } from "@/lib/data";
import TransitionLink from "@/components/TransitionLink";
import WorkVisual from "@/components/WorkVisual";
import { FadeUp } from "@/components/TextReveal";

export default function WorksGrid() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(works.map((w) => w.category)))],
    [],
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? works : works.filter((w) => w.category === active);

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={clsx(
              "rounded-full border px-5 py-2.5 text-sm transition-all duration-300",
              active === category
                ? "border-paper bg-paper text-ink"
                : "glass border-paper/15 text-paper/70 hover:border-paper/40 hover:text-paper",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {filtered.map((work, i) => (
          <FadeUp
            key={`${active}-${work.slug}`}
            delay={i * 0.08}
            className={clsx(i % 2 === 1 && "md:mt-20")}
          >
            <TransitionLink
              href={`/works/${work.slug}`}
              data-cursor-text="View"
              className="group block"
            >
              <div className="overflow-hidden rounded-3xl [container-type:inline-size]">
                <WorkVisual
                  work={work}
                  className="aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className="text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                  {work.title}
                </h3>
                <span className="text-xs tracking-[0.2em] text-mist uppercase">
                  {work.year}
                </span>
              </div>
              <p className="mt-1 text-sm text-mist">{work.category}</p>
            </TransitionLink>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

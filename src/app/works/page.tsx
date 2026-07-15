import type { Metadata } from "next";
import WorksGrid from "@/components/works/WorksGrid";
import { SplitReveal } from "@/components/TextReveal";
import { works } from "@/lib/data";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Selected projects by Aditya Soma: web experiences, product design, and creative development.",
};

export default function WorksPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-36">
      <div className="bg-radial-glow pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <p className="mb-4 text-[10px] tracking-[0.4em] text-mist uppercase">
          Works / {works.length} projects
        </p>
        <SplitReveal
          as="h1"
          immediate
          highlight
          delay={0.5}
          className="mb-6 text-[14vw] leading-[0.95] font-medium tracking-tighter md:text-[9vw]"
        >
          Selected Works
        </SplitReveal>
        <p className="mb-16 max-w-md leading-relaxed text-mist">
          A collection of dummy case studies for now. Each one will grow into
          a full project as this portfolio evolves.
        </p>

        <WorksGrid />
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { works } from "@/lib/data";
import WorkVisual from "@/components/WorkVisual";
import TransitionLink from "@/components/TransitionLink";
import { SplitReveal, FadeUp, ScrubWords } from "@/components/TextReveal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};
  return { title: work.title, description: work.description };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const index = works.findIndex((w) => w.slug === slug);
  if (index === -1) notFound();

  const work = works[index];
  const next = works[(index + 1) % works.length];

  return (
    <article className="relative overflow-hidden pt-36 pb-24 md:pt-44">
      <div className="bg-radial-glow pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <p className="mb-4 text-[10px] tracking-[0.4em] text-mist uppercase">
          {work.category} · {work.year}
        </p>
        <SplitReveal
          as="h1"
          immediate
          highlight
          delay={0.5}
          className="mb-12 text-[13vw] leading-[0.95] font-medium tracking-tighter md:text-[8vw]"
        >
          {work.title}
        </SplitReveal>

        <FadeUp className="mb-16 grid grid-cols-2 gap-6 border-y border-paper/10 py-8 md:grid-cols-4">
          {[
            ["Client", work.client],
            ["Role", work.role],
            ["Category", work.category],
            ["Year", work.year],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.3em] text-mist uppercase">
                {label}
              </span>
              <span className="text-sm text-paper/90">{value}</span>
            </div>
          ))}
        </FadeUp>

        <FadeUp className="mb-20 overflow-hidden rounded-3xl [container-type:inline-size]">
          <WorkVisual work={work} className="aspect-[16/9] w-full" />
        </FadeUp>

        <div className="mb-24 grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            About the project
          </h2>
          <div>
            <ScrubWords className="text-xl leading-relaxed font-medium tracking-tight text-paper md:text-2xl">
              {work.description}
            </ScrubWords>
            <p className="mt-8 leading-relaxed text-mist">
              This is a placeholder case study. The real breakdown (process,
              wireframes, motion studies, and final build) will land here as
              the portfolio grows. Every project page shares this template, so
              adding a new work is a single data entry.
            </p>
          </div>
        </div>

        <FadeUp>
          <TransitionLink
            href={`/works/${next.slug}`}
            data-cursor-text="Next"
            className="group block border-t border-paper/10 pt-12"
          >
            <span className="text-[10px] tracking-[0.4em] text-mist uppercase">
              Next project
            </span>
            <span className="text-gradient mt-3 block text-5xl font-medium tracking-tighter transition-transform duration-500 group-hover:translate-x-4 md:text-8xl">
              {next.title} →
            </span>
          </TransitionLink>
        </FadeUp>
      </div>
    </article>
  );
}

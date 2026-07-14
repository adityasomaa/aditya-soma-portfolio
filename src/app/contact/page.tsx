import type { Metadata } from "next";
import ContactForm from "@/components/form/ContactForm";
import { SplitReveal, FadeUp } from "@/components/TextReveal";
import { socials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Aditya Soma — web experiences, product design, creative development.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-36">
      <div className="bg-radial-glow pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <p className="mb-4 text-[10px] tracking-[0.4em] text-mist uppercase">
          Contact — Available for projects
        </p>
        <SplitReveal
          as="h1"
          immediate
          delay={0.5}
          className="text-gradient mb-16 text-[14vw] leading-[0.95] font-medium tracking-tighter md:text-[9vw]"
        >
          Let&apos;s make something
        </SplitReveal>

        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <FadeUp className="flex flex-col gap-10">
            <div>
              <span className="mb-3 block text-[10px] tracking-[0.35em] text-mist uppercase">
                Email
              </span>
              <a
                href="mailto:somanathasastra10@gmail.com"
                className="link-line text-xl font-medium tracking-tight break-all md:text-2xl"
              >
                somanathasastra10@gmail.com
              </a>
            </div>

            <div>
              <span className="mb-3 block text-[10px] tracking-[0.35em] text-mist uppercase">
                Socials
              </span>
              <div className="flex flex-col gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-line w-fit text-paper/80"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="glass grain grain-static relative overflow-hidden rounded-2xl p-6">
              <div className="relative z-10">
                <span className="mb-2 flex items-center gap-2 text-[10px] tracking-[0.35em] text-mist uppercase">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-paper" />
                  Currently
                </span>
                <p className="text-sm leading-relaxed text-paper/85">
                  Open for freelance projects and collaborations starting
                  Q3 2026. Usually replies within 24 hours.
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <ContactForm />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

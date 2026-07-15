import type { Metadata } from "next";
import { SplitReveal, FadeUp } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "Legal Terms",
  description: "Terms of use for this portfolio website.",
};

export default function LegalTermsPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-36">
      <div className="bg-radial-glow pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-3xl px-5 md:px-10">
        <p className="mb-4 text-[10px] tracking-[0.4em] text-mist uppercase">
          Legal / Last updated July 2026
        </p>
        <SplitReveal
          as="h1"
          immediate
          highlight
          delay={0.5}
          className="mb-14 text-5xl font-medium tracking-tighter md:text-7xl"
        >
          Legal Terms
        </SplitReveal>

        <FadeUp className="prose-mono">
          <p>
            Welcome to the personal portfolio of Aditya Soma. By browsing
            this site you agree to the following straightforward terms.
          </p>

          <h2>Ownership & copyright</h2>
          <p>
            All design, code, text, and visual work presented on this site is
            the intellectual property of Aditya Soma unless stated otherwise.
            You may not reproduce, redistribute, or use any part of it
            commercially without written permission.
          </p>

          <h2>Showcased work</h2>
          <p>
            Project case studies may include work created for clients. Those
            projects remain subject to the respective client agreements, and
            client names or trademarks belong to their owners. Some projects
            shown are concept or demonstration pieces.
          </p>

          <h2>No warranties</h2>
          <p>
            This site is provided &quot;as is&quot; for informational and
            portfolio purposes. While everything here is built with care, no
            guarantee is made that the site is free of errors or always
            available.
          </p>

          <h2>External links</h2>
          <p>
            Links to external platforms (GitHub, LinkedIn, and others) lead
            to services outside my control. Their content and policies are
            their own responsibility.
          </p>

          <h2>Changes</h2>
          <p>
            These terms may be updated occasionally. The date at the top of
            this page reflects the latest revision.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a href="mailto:somanathasastra10@gmail.com" className="underline">
              somanathasastra10@gmail.com
            </a>
            .
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

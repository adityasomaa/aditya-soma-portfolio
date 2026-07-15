import type { Metadata } from "next";
import { SplitReveal, FadeUp } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How this portfolio handles your data.",
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </SplitReveal>

        <FadeUp className="prose-mono">
          <p>
            This website is the personal portfolio of Aditya Soma. Your
            privacy matters, and this page explains in plain language what
            happens to any information you share here.
          </p>

          <h2>What is collected</h2>
          <p>
            The contact form asks for your name, email address, and project
            details. That information is used for exactly one purpose:
            replying to your inquiry. Nothing else.
          </p>
          <ul>
            <li>No advertising trackers or third-party analytics cookies.</li>
            <li>No selling, renting, or sharing of your data with anyone.</li>
            <li>No profiling, no marketing lists, no spam.</li>
          </ul>

          <h2>Hosting & technical data</h2>
          <p>
            This site is hosted on Vercel. Like most hosting providers,
            Vercel may process basic technical logs (IP address, browser
            type, pages visited) to serve and secure the website. See
            Vercel&apos;s own privacy policy for details on their processing.
          </p>

          <h2>Fonts & external resources</h2>
          <p>
            Web fonts are loaded from a font CDN. When your browser requests
            those files, the CDN receives standard request metadata such as
            your IP address. No other personal data is transmitted.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask at any time what data of yours exists here, request a
            correction, or request deletion. Just send an email and it will
            be handled promptly.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Email{" "}
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

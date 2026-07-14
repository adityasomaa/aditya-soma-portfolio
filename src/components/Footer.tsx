"use client";

import { useEffect, useState } from "react";
import { navLinks, legalLinks, socials } from "@/lib/data";
import TransitionLink from "@/components/TransitionLink";
import MagneticButton from "@/components/MagneticButton";
import { useSmoothScroll } from "@/components/providers/LenisProvider";

function JakartaClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time || "--:--:--"} WIB
    </span>
  );
}

export default function Footer() {
  const { scrollTop } = useSmoothScroll();

  return (
    <footer className="grain grain-static relative overflow-hidden border-t border-paper/10 bg-coal">
      <div className="bg-radial-glow pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-20 pb-8 md:px-10">
        {/* CTA */}
        <div className="mb-20 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="text-gradient max-w-xl text-4xl leading-[1.05] font-medium tracking-tight md:text-6xl">
            Have an idea worth building?
          </h2>
          <MagneticButton>
            <TransitionLink
              href="/contact"
              data-cursor-text="Talk"
              className="glass-strong inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm tracking-wide transition-colors duration-300 hover:bg-paper hover:text-ink"
            >
              Let&apos;s talk
              <span aria-hidden>→</span>
            </TransitionLink>
          </MagneticButton>
        </div>

        {/* columns */}
        <div className="grid grid-cols-2 gap-10 border-t border-paper/10 pt-12 md:grid-cols-4">
          <div className="flex flex-col gap-3">
            <span className="mb-2 text-[10px] tracking-[0.35em] text-mist uppercase">
              Sitemap
            </span>
            {navLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="link-line w-fit text-sm text-paper/80"
              >
                {link.label}
              </TransitionLink>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="mb-2 text-[10px] tracking-[0.35em] text-mist uppercase">
              Legal
            </span>
            {legalLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="link-line w-fit text-sm text-paper/80"
              >
                {link.label}
              </TransitionLink>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="mb-2 text-[10px] tracking-[0.35em] text-mist uppercase">
              Socials
            </span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="link-line w-fit text-sm text-paper/80"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="mb-2 text-[10px] tracking-[0.35em] text-mist uppercase">
              Local time
            </span>
            <span className="text-sm text-paper/80">
              <JakartaClock />
            </span>
            <span className="text-sm text-mist">Jakarta, Indonesia</span>
            <button
              onClick={() => scrollTop(false)}
              className="link-line mt-4 w-fit text-left text-sm text-paper/80"
            >
              Back to top ↑
            </button>
          </div>
        </div>

        {/* giant name */}
        <div className="pointer-events-none mt-16 select-none">
          <span className="text-outline block text-center text-[13.5vw] leading-none font-medium tracking-tighter whitespace-nowrap">
            ADITYA SOMA
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-paper/10 pt-6 text-[10px] tracking-[0.25em] text-mist uppercase md:flex-row">
          <span>©2026 Aditya Soma — All rights reserved</span>
          <span>Designed & built with taste</span>
        </div>
      </div>
    </footer>
  );
}

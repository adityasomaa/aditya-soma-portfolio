"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { navLinks, socials } from "@/lib/data";
import TransitionLink from "@/components/TransitionLink";
import { useSmoothScroll } from "@/components/providers/LenisProvider";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { stop, start } = useSmoothScroll();

  // hide on scroll down, show on scroll up
  useEffect(() => {
    const el = headerRef.current!;
    const st = ScrollTrigger.create({
      start: "top top",
      onUpdate: (self) => {
        if (self.scroll() < 80) {
          gsap.to(el, { yPercent: 0, duration: 0.4, ease: "power3.out" });
          return;
        }
        gsap.to(el, {
          yPercent: self.direction === 1 ? -130 : 0,
          duration: 0.45,
          ease: "power3.out",
        });
      },
    });
    return () => st.kill();
  }, []);

  // fullscreen mobile menu open/close
  useEffect(() => {
    const menu = menuRef.current!;
    if (menuOpen) {
      stop();
      document.documentElement.style.overflow = "hidden";
      gsap.set(menu, { pointerEvents: "auto" });
      gsap.to(menu, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        menu.querySelectorAll(".menu-link"),
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.07,
          delay: 0.1,
          ease: "power4.out",
        },
      );
      gsap.fromTo(
        menu.querySelectorAll(".menu-meta"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.35, stagger: 0.06 },
      );
    } else {
      document.documentElement.style.overflow = "";
      start();
      gsap.to(menu, { opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.set(menu, { pointerEvents: "none", delay: 0.3 });
    }
  }, [menuOpen, stop, start]);

  // close the menu whenever the route actually changes (curtain is closed then)
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 right-0 left-0 z-[70] flex items-center justify-between px-5 py-4 md:px-10 md:py-6"
      >
        <TransitionLink
          href="/"
          className="text-lg font-medium tracking-tight"
          aria-label="Home"
        >
          AS<sup className="text-[0.6em]">©</sup>
        </TransitionLink>

        {/* desktop nav */}
        <nav className="glass hidden items-center gap-1 rounded-full p-1.5 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative rounded-full px-5 py-2 text-sm transition-colors duration-300",
                  active
                    ? "bg-paper text-ink"
                    : "text-paper/70 hover:text-paper",
                )}
              >
                {link.label}
              </TransitionLink>
            );
          })}
        </nav>

        {/* mobile burger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="glass flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={clsx(
              "block h-px w-5 bg-paper transition-transform duration-300",
              menuOpen && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={clsx(
              "block h-px w-5 bg-paper transition-transform duration-300",
              menuOpen && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </header>

      {/* fullscreen mobile menu */}
      <div
        ref={menuRef}
        className="glass-strong pointer-events-none fixed inset-0 z-[65] flex flex-col justify-between p-6 pt-28 opacity-0"
      >
        <nav className="flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <div key={link.href} className="overflow-hidden">
              <TransitionLink
                href={link.href}
                onNavigate={() => setMenuOpen(false)}
                className="menu-link flex items-baseline gap-4 text-5xl font-medium tracking-tight"
              >
                <span className="text-xs text-mist">0{i + 1}</span>
                <span
                  className={clsx(
                    pathname === link.href ? "text-paper" : "text-paper/60",
                  )}
                >
                  {link.label}
                </span>
              </TransitionLink>
            </div>
          ))}
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="menu-meta flex flex-col gap-1 text-xs text-mist">
            <span className="tracking-[0.3em] uppercase">Socials</span>
            <div className="mt-2 flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper/70"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <span className="menu-meta text-[10px] tracking-[0.3em] text-mist uppercase">
            ©2026 Aditya Soma
          </span>
        </div>
      </div>
    </>
  );
}

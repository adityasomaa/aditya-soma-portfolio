"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type LenisApi = {
  stop: () => void;
  start: () => void;
  scrollTop: (immediate?: boolean) => void;
};

const LenisContext = createContext<LenisApi>({
  stop: () => {},
  start: () => {},
  scrollTop: () => {},
});

export const useSmoothScroll = () => useContext(LenisContext);

/**
 * Lenis smooth scroll, desktop only — disabled on mobile & tablet
 * (pointer: coarse or < 1024px) where native scrolling feels better.
 * Scrollable popups opt out via the `data-lenis-prevent` attribute.
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine)");

    const create = () => {
      if (lenisRef.current) return;
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      lenis.on("scroll", ScrollTrigger.update);
      lenisRef.current = lenis;
    };

    const destroy = () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const tick = (time: number) => {
      lenisRef.current?.raf(time * 1000);
    };

    if (media.matches) create();
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) create();
      else destroy();
      ScrollTrigger.refresh();
    };
    media.addEventListener("change", onChange);

    return () => {
      media.removeEventListener("change", onChange);
      gsap.ticker.remove(tick);
      destroy();
    };
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);
  const scrollTop = useCallback((immediate = true) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate, force: true });
    }
    window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
  }, []);

  return (
    <LenisContext.Provider value={{ stop, start, scrollTop }}>
      {children}
    </LenisContext.Provider>
  );
}

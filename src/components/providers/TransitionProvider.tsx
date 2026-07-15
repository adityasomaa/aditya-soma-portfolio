"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "./LenisProvider";

const TransitionContext = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

const PANELS = 5;

/**
 * Curtain page transition:
 * click -> curtain closes over the old page (logo appears) ->
 * route swaps + scroll-to-top while fully covered ->
 * curtain reveals the new page. No visible content swap.
 */
export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollTop } = useSmoothScroll();

  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const pendingRevealRef = useRef(false);
  const pathnameRef = useRef(pathname);

  const panels = () =>
    overlayRef.current?.querySelectorAll<HTMLElement>(".curtain-panel") ?? [];

  const navigate = useCallback(
    (href: string) => {
      if (busyRef.current) return;
      if (href === pathnameRef.current) return;
      busyRef.current = true;

      const overlay = overlayRef.current!;
      overlay.style.pointerEvents = "auto";

      const tl = gsap.timeline({
        onComplete: () => {
          pendingRevealRef.current = true;
          router.push(href);
        },
      });

      tl.fromTo(
        panels(),
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.75,
          stagger: 0.065,
          ease: "power4.inOut",
        },
      ).fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.85, y: 26 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.35",
      );
    },
    [router],
  );

  useEffect(() => {
    pathnameRef.current = pathname;
    if (!pendingRevealRef.current) return;
    pendingRevealRef.current = false;

    // New page is committed but still hidden behind the curtain:
    // reset scroll, let it paint, then reveal.
    scrollTop(true);
    ScrollTrigger.refresh();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const tl = gsap.timeline({
          delay: 0.2,
          onComplete: () => {
            const overlay = overlayRef.current;
            if (overlay) overlay.style.pointerEvents = "none";
            gsap.set(panels(), { yPercent: 100 });
            busyRef.current = false;
            ScrollTrigger.refresh();
          },
        });

        tl.to(logoRef.current, {
          opacity: 0,
          y: -30,
          scale: 0.92,
          duration: 0.4,
          ease: "power2.in",
        }).to(
          panels(),
          {
            yPercent: -100,
            duration: 0.8,
            stagger: 0.06,
            ease: "power4.inOut",
          },
          "-=0.1",
        );
      });
    });
  }, [pathname, scrollTop]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[90]"
        aria-hidden
      >
        <div className="absolute inset-0 flex">
          {Array.from({ length: PANELS }).map((_, i) => (
            <div
              key={i}
              className="curtain-panel grain -mx-px flex-1 translate-y-full overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, #101010 0%, #0a0a0a 60%, #060606 100%)",
              }}
            />
          ))}
        </div>
        <div
          ref={logoRef}
          className="absolute inset-0 grid place-items-center opacity-0"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-gradient text-5xl font-medium tracking-tight md:text-7xl">
              AS<sup className="align-super text-2xl md:text-3xl">©</sup>
            </span>
            <span className="text-[10px] uppercase tracking-[0.5em] text-mist">
              Aditya Soma
            </span>
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

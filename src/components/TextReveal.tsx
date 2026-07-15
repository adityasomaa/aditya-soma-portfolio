"use client";

import { Fragment, useEffect, useRef } from "react";
import clsx from "clsx";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const NBSP = " ";
const ZWSP = "​";

type RevealProps = {
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  /** animate on mount instead of on scroll (for above-the-fold heros) */
  immediate?: boolean;
  /**
   * Paint the heading as a run of paper blocks with ink text, the way selected
   * text looks. This is also what keeps headings opaque: `.text-gradient` needs
   * `color: transparent` + `background-clip: text`, and that gradient never
   * paints onto glyphs sitting inside these masked, layer-promoted words, so a
   * gradient heading renders invisible here.
   */
  highlight?: boolean;
};

/** Word-by-word masked reveal, triggered on scroll (or on mount). */
export function SplitReveal({
  children,
  className,
  as: Tag = "p",
  delay = 0,
  immediate = false,
  highlight = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const words = el.querySelectorAll<HTMLElement>(".sr-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 115, rotate: 3 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          stagger: 0.035,
          ease: "power4.out",
          delay,
          scrollTrigger: immediate
            ? undefined
            : { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, immediate]);

  const words = children.split(" ");

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          {/* Each mask holds its word plus the following space, so neighbouring
              masks butt together into one unbroken highlight run. The space has
              to be NBSP: a plain one collapses away at the end of an
              inline-block. The right padding compensates for `tracking-*`,
              which shortens the last glyph's advance and would otherwise let
              overflow-hidden shave it off. */}
          <span
            className={clsx(
              "inline-block overflow-hidden pt-[0.16em] pr-[0.06em] pb-[0.1em] align-bottom",
              highlight && "bg-paper",
            )}
          >
            <span
              className={clsx(
                "sr-word inline-block will-change-transform",
                highlight && "text-ink",
              )}
            >
              {word}
            </span>
            {i < words.length - 1 && NBSP}
          </span>
          {/* Adjacent inline-blocks offer no wrap opportunity on their own, so
              hand the line breaker an invisible one. */}
          {i < words.length - 1 && ZWSP}
        </Fragment>
      ))}
    </Tag>
  );
}

type ScrubProps = {
  children: string;
  className?: string;
};

/** Paragraph whose words brighten one-by-one as you scroll through it. */
export function ScrubWords({ children, className }: ScrubProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const words = el.querySelectorAll<HTMLElement>(".sw-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={clsx("flex flex-wrap", className)}>
      {children.split(" ").map((word, i) => (
        <span key={i} className="sw-word mr-[0.28em] inline-block">
          {word}
        </span>
      ))}
    </p>
  );
}

/** Simple fade-up on scroll for arbitrary blocks. */
export function FadeUp({
  children,
  className,
  delay = 0,
  y = 40,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export { ScrollTrigger };

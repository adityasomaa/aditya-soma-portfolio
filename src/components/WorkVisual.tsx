import clsx from "clsx";
import type { Work } from "@/lib/data";

/** Monochrome gradient "cover art" for a work — grain, glow and initials. */
export default function WorkVisual({
  work,
  className,
}: {
  work: Work;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "grain relative flex items-center justify-center overflow-hidden",
        className,
      )}
      style={{ background: work.gradient }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 20%, rgba(255,255,255,0.22), transparent 60%)",
        }}
      />
      <span className="text-outline relative z-10 text-[22cqw] leading-none font-medium tracking-tighter select-none">
        {work.initials}
      </span>
      <span className="absolute bottom-4 left-5 z-10 text-[10px] tracking-[0.35em] text-paper/70 uppercase">
        {work.category} — {work.year}
      </span>
    </div>
  );
}

import TransitionLink from "@/components/TransitionLink";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="bg-radial-glow pointer-events-none absolute inset-0" />
      <span className="text-outline text-[30vw] leading-none font-medium tracking-tighter select-none md:text-[18vw]">
        404
      </span>
      <p className="mt-4 mb-10 max-w-sm text-mist">
        This page got lost in the grain. Let&apos;s get you back somewhere
        real.
      </p>
      <TransitionLink
        href="/"
        className="glass-strong rounded-full px-8 py-4 text-sm tracking-wide transition-colors duration-300 hover:bg-paper hover:text-ink"
      >
        Back home →
      </TransitionLink>
    </section>
  );
}

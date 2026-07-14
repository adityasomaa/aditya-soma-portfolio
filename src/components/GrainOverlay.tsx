/** Full-viewport animated film grain, sits above everything but the loaders. */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 z-[85]"
      style={{ opacity: 0.55 }}
    />
  );
}

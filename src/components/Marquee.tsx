import clsx from "clsx";

type Props = {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: string;
  duration?: number;
};

/** Infinite horizontal marquee — content duplicated once, CSS-driven. */
export default function Marquee({
  items,
  className,
  itemClassName,
  separator = "✦",
  duration = 28,
}: Props) {
  const row = [...items, ...items];
  return (
    <div
      className={clsx(
        "relative flex overflow-hidden whitespace-nowrap",
        className,
      )}
    >
      <div
        className="animate-marquee flex shrink-0 items-center"
        style={{ animationDuration: `${duration}s` }}
      >
        {row.map((item, i) => (
          <span key={i} className={clsx("flex items-center", itemClassName)}>
            <span>{item}</span>
            <span className="mx-6 text-[0.5em] opacity-40 md:mx-10">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

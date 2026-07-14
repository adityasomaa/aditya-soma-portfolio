"use client";

import Link from "next/link";
import { usePageTransition } from "@/components/providers/TransitionProvider";

type Props = React.ComponentProps<typeof Link> & {
  onNavigate?: () => void;
};

/** Link that routes through the curtain transition instead of swapping instantly. */
export default function TransitionLink({
  href,
  onNavigate,
  onClick,
  children,
  ...rest
}: Props) {
  const { navigate } = usePageTransition();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onNavigate?.();
        navigate(typeof href === "string" ? href : (href.pathname ?? "/"));
      }}
    >
      {children}
    </Link>
  );
}

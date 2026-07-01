import { ReactNode, CSSProperties, ElementType } from "react";
import { useReveal } from "@/hooks/useReveal";

type RevealAnimation =
  | "fade-up"
  | "fade-down"
  | "fade-in"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "clip-up";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  animation?: RevealAnimation;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Wraps any block of markup and reveals it with a chosen animation
 * the first time it scrolls into view. Pure CSS — no animation lib.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  animation = "fade-up",
  delay = 0,
  duration = 900,
  className = "",
  style,
  threshold,
  rootMargin,
  once,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold, rootMargin, once });

  const composed: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
    ...style,
  };

  return (
    <Tag
      ref={ref}
      data-reveal={animation}
      data-reveal-in={visible ? "true" : "false"}
      className={className}
      style={composed}
    >
      {children}
    </Tag>
  );
}
import { CSSProperties, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  speed?: "slow" | "fast";
};

// Adds a subtle one-time reveal animation when content enters the viewport.
export function RevealOnScroll({
  children,
  className = "",
  delayMs = 0,
  speed = "slow",
}: RevealOnScrollProps) {
  const { elementRef, isVisible } = useReveal();
  const style = {
    "--reveal-delay": `${delayMs}ms`,
  } as CSSProperties;

  return (
    <div
      ref={elementRef}
      style={style}
      className={`reveal-on-scroll ${speed === "fast" ? "reveal-fast" : ""} ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

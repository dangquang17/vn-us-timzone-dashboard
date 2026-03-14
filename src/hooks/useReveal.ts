import { useEffect, useRef, useState } from "react";

// Tracks when an element enters the viewport and keeps it revealed afterward.
export function useReveal() {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = elementRef.current;

    if (!target || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [isVisible]);

  return { elementRef, isVisible };
}

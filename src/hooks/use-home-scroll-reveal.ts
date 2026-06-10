"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type HomeScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  /** Reveal on mount (hero and other above-the-fold blocks). */
  instant?: boolean;
};

export function useHomeScrollReveal<T extends HTMLElement = HTMLElement>(
  options: HomeScrollRevealOptions = {},
): {
  ref: RefObject<T | null>;
  revealed: boolean;
  animateClass: string;
} {
  const { threshold = 0.12, rootMargin = "0px 0px -6% 0px", instant = false } = options;
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(instant);

  useEffect(() => {
    if (revealed) return;

    if (instant) {
      const id = window.requestAnimationFrame(() => setRevealed(true));
      return () => window.cancelAnimationFrame(id);
    }

    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      queueMicrotask(() => setRevealed(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { root: null, threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed, instant, threshold, rootMargin]);

  const animateClass = revealed ? "home-scroll-animate home-revealed" : "home-scroll-animate";

  return { ref, revealed, animateClass };
}

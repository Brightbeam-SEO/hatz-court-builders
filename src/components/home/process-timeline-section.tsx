"use client";

import { useEffect, useRef, useState } from "react";
import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import { highlightTextPhrase } from "@/lib/highlight-text";
import { processSteps as staticProcessSteps } from "./site-data";
import { useHomeContent } from "./home-content-context";

function processCellBorderClass(index: number, total: number) {
  const isLeft = index % 2 === 0;
  const isTop = index < 2;

  return [
    "p-8 sm:p-10 lg:p-12 xl:p-14",
    index < total - 1 ? "max-md:border-b border-zen-sand/80" : "",
    isTop ? "md:border-b border-zen-sand/80" : "",
    isLeft ? "md:border-r border-zen-sand/80" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function ProcessTimelineSection() {
  const { copy, processSteps: cmsProcessSteps } = useHomeContent();
  const processSteps =
    cmsProcessSteps.length >= staticProcessSteps.length ? cmsProcessSteps : staticProcessSteps;

  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lastScrollYRef = useRef(0);
  const [activatedSteps, setActivatedSteps] = useState<boolean[]>([]);
  const { ref: sectionRef, animateClass } = useHomeScrollReveal();
  const headingRest = copy.processSectionHeadingRest.trim();
  const heading =
    headingRest && !/^works$/i.test(headingRest)
      ? `${copy.processSectionHeadingLead} ${headingRest}`
      : copy.processSectionHeadingLead;

  useEffect(() => {
    const items = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (items.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setActivatedSteps(Array.from({ length: items.length }, () => true));
      return;
    }

    let raf = 0;
    let isFirstSync = true;
    lastScrollYRef.current = window.scrollY;

    const syncActivatedSteps = () => {
      const scrollY = window.scrollY;
      const scrollingDown = isFirstSync ? true : scrollY >= lastScrollYRef.current;
      isFirstSync = false;
      lastScrollYRef.current = scrollY;

      const activateLine = window.innerHeight * 0.68;

      setActivatedSteps((prev) => {
        const next =
          prev.length === items.length ? [...prev] : Array.from({ length: items.length }, () => false);
        let changed = prev.length !== items.length;

        for (let i = 0; i < items.length; i++) {
          const rect = items[i]!.getBoundingClientRect();
          const { top, bottom } = rect;

          if (scrollingDown) {
            if (top < activateLine && bottom > 0 && !next[i]) {
              next[i] = true;
              changed = true;
            }
            continue;
          }

          if ((top > activateLine || bottom < 0) && next[i]) {
            for (let j = i; j < items.length; j++) {
              if (next[j]) {
                next[j] = false;
                changed = true;
              }
            }
            break;
          }
        }

        return changed ? next : prev;
      });
    };

    const scheduleSync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncActivatedSteps);
    };

    scheduleSync();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
    };
  }, [processSteps.length]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-zen-rice py-16 text-zen-espresso md:py-24 lg:py-28 xl:py-32 ${animateClass}`}
      aria-labelledby="process-heading"
    >
      <div className="shell relative z-10">
        <div className="home-reveal home-reveal-d1 mx-auto max-w-3xl text-center">
          <p className="section-eyebrow mx-auto">{copy.processSectionEyebrow}</p>
          <h2
            id="process-heading"
            className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-zen-espresso sm:text-5xl md:text-[3.375rem]"
          >
            {highlightTextPhrase(heading, "Bring Your Project to Life")}
          </h2>
          {copy.processSectionSubtext.trim() ? (
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-zen-taupe sm:text-lg">
              {copy.processSectionSubtext}
            </p>
          ) : null}
        </div>

        <ol className="home-reveal home-reveal-d2 mx-auto mt-10 grid max-w-5xl grid-cols-1 md:mt-14 md:grid-cols-2 lg:mt-16 xl:max-w-6xl">
          {processSteps.map((step, index) => {
            const stepActive = activatedSteps[index] ?? false;

            return (
              <li
                key={step.title}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={`home-reveal home-reveal-d${Math.min(index + 3, 8)} ${processCellBorderClass(index, processSteps.length)}`}
              >
                <span
                  className={`block font-heading text-[clamp(3.5rem,11vw,6.75rem)] font-bold leading-[0.9] tracking-tighter transition-colors duration-500 ease-out ${
                    stepActive ? "text-zen-gold" : "text-zen-crimson"
                  }`}
                  aria-hidden="true"
                >
                  {step.step}
                </span>
                <h3 className="mt-4 font-heading text-xl font-bold text-zen-espresso sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-zen-taupe sm:text-base">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

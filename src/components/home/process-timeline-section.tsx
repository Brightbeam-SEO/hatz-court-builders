"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HomeActionButtons } from "@/components/home/home-action-buttons";
import { HomeSectionGridDecor } from "@/components/home/home-section-grid-decor";
import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import { additionalReviewsPageTestimonials } from "@/lib/reviews-testimonials";
import { processSteps as staticProcessSteps } from "./site-data";
import { useHomeContent } from "./home-content-context";

const processAvatars = additionalReviewsPageTestimonials.slice(0, 3);

const PROCESS_TRUST_LINE = "Trusted by homeowners, schools, and parks";

function ProcessStarRow({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex text-lg leading-none tracking-tight text-zen-crimson ${className ?? ""}`}
      aria-label="5 out of 5 stars"
    >
      ★★★★★
    </span>
  );
}

export function ProcessTimelineSection() {
  const { copy, processSteps: cmsProcessSteps } = useHomeContent();
  const processSteps =
    cmsProcessSteps.length >= staticProcessSteps.length ? cmsProcessSteps : staticProcessSteps;

  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeThroughIndex, setActiveThroughIndex] = useState(-1);
  const { ref: sectionRef, animateClass } = useHomeScrollReveal();

  useEffect(() => {
    const items = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (items.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      queueMicrotask(() => setActiveThroughIndex(items.length - 1));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setActiveThroughIndex((prev) => {
          let next = prev;
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const index = items.indexOf(entry.target as HTMLLIElement);
            if (index >= 0) next = Math.max(next, index);
          }
          return next;
        });
      },
      { root: null, threshold: 0.35, rootMargin: "-8% 0px -35% 0px" },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [processSteps.length]);

  return (
    <section
      ref={sectionRef}
      className={`home-section-viewport home-section-viewport--center relative overflow-hidden section-pad bg-zen-rice text-zen-espresso lg:py-0 ${animateClass}`}
      aria-labelledby="process-heading"
    >
      <HomeSectionGridDecor placement="bottom-right" />
      <div className="shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14 xl:gap-20">
          <div className="flex flex-col justify-between gap-10 lg:min-h-[32rem]">
            <div className="home-reveal home-reveal-d1 text-center lg:text-left">
              <p className="section-eyebrow">{copy.processSectionEyebrow}</p>
              <h2
                id="process-heading"
                className="mx-auto mt-2 max-w-xl font-heading text-3xl font-bold leading-[1.1] tracking-tight text-zen-espresso sm:text-4xl md:text-5xl lg:mx-0 lg:text-[3.25rem]"
              >
                How Our Property Management Meridian{" "}
                <span className="text-zen-crimson">Process</span> Works
              </h2>
              <HomeActionButtons centered />
            </div>

            <div className="home-reveal home-reveal-d3 flex flex-col items-center gap-4 text-center lg:flex-row lg:items-start lg:gap-5 lg:text-left">
              <div className="flex shrink-0 items-center justify-center lg:justify-start">
                {processAvatars.map((review, idx) => (
                  <div
                    key={review.id}
                    className={`relative h-10 w-10 overflow-hidden rounded-full border-2 border-zen-rice bg-zen-sand/40 sm:h-11 sm:w-11 ${
                      idx > 0 ? "-ml-3" : ""
                    }`}
                  >
                    <Image
                      src={review.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="44px"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              <div className="min-w-0">
                <ProcessStarRow className="mb-2" />
                <p className="mx-auto max-w-[16rem] text-sm font-medium leading-relaxed text-zen-espresso sm:max-w-xs sm:text-[0.95rem] lg:mx-0">
                  {PROCESS_TRUST_LINE}
                </p>
              </div>
            </div>
          </div>

          <ol className="home-reveal home-reveal-right home-reveal-d4 border-t border-zen-sand/80">
            {processSteps.map((step, index) => {
              const stepActive = index <= activeThroughIndex;
              return (
                <li
                  key={step.title}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={`grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-zen-sand/80 py-8 sm:gap-6 sm:py-10 ${
                    index < processSteps.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold tabular-nums transition-colors duration-300 ${
                      stepActive
                        ? "border-zen-crimson bg-zen-crimson text-white"
                        : "border-zen-sand bg-zen-rice text-zen-taupe"
                    }`}
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-zen-espresso sm:text-xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zen-taupe sm:text-base">{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

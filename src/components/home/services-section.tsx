"use client";

import { useEffect, useRef, useState } from "react";
import { BUSINESS } from "@/lib/business";
import { homeFooterContactFormHref } from "@/lib/home-anchors";
import { useHomeContent } from "./home-content-context";
import { ServicesAccordion } from "./services-accordion";

const servicesAltBtnClass = "btn-alt btn-alt-inverse";

export function ServicesSection({ layout = "home" }: { layout?: "home" | "about" }) {
  const { copy } = useHomeContent();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [servicesRevealed, setServicesRevealed] = useState(false);

  useEffect(() => {
    if (servicesRevealed) return;
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      queueMicrotask(() => setServicesRevealed(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setServicesRevealed(true);
        observer.disconnect();
      },
      { root: null, threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [servicesRevealed]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`${layout === "home" ? "home-section-viewport " : ""}section-pad relative z-20 bg-zen-espresso text-white services-scroll-animate ${
        layout === "home" ? "-mt-[15px]" : ""
      } ${servicesRevealed ? "services-revealed" : ""}`}
    >
      <div className="shell">
        <div className="grid gap-8 text-center lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12 lg:text-left">
          <div className="mx-auto max-w-[24rem] lg:mx-0">
            <h2 className="services-intro-reveal services-intro-reveal-title font-heading text-[1.875rem] leading-[1.1] tracking-[-0.015em] text-white sm:text-4xl md:text-[2.5rem] lg:text-[3.375rem]">
              {copy.servicesHeading}
            </h2>
          </div>
          <div className="services-intro-reveal services-intro-reveal-copy mx-auto max-w-xl lg:mx-0 lg:justify-self-end">
            <p className="text-base leading-7 text-white/88">{copy.servicesIntro}</p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:items-start lg:justify-start">
              <a className="btn-call" href={BUSINESS.phoneTel}>
                {copy.ctaCallVerb} {BUSINESS.phoneDisplay}
              </a>
              <a className={servicesAltBtnClass} href={homeFooterContactFormHref}>
                {copy.ctaBookNowLabel}
              </a>
            </div>
          </div>
        </div>

        <ServicesAccordion />
      </div>
    </section>
  );
}

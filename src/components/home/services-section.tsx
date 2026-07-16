"use client";

import { HcbImage } from "@/components/ui/hcb-image";
import { useEffect, useRef, useState } from "react";
import { BUSINESS } from "@/lib/business";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { homeFooterContactFormHref } from "@/lib/home-anchors";
import { SERVICES_SECTION_FEATURED_IMAGE } from "@/lib/home-services-accordion";
import { useHomeContent } from "./home-content-context";
import { ServicesAccordion } from "./services-accordion";

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
      setServicesRevealed(true);
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
      className={`${layout === "home" ? "home-section-viewport " : ""}relative z-20 bg-zen-espresso py-20 text-white services-scroll-animate md:py-28 lg:py-32 ${
        servicesRevealed ? "services-revealed" : ""
      }`}
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-stretch lg:gap-14 xl:gap-20">
          <div className="flex min-h-0 flex-col gap-8 lg:gap-10 lg:self-stretch">
            <div className="services-intro-reveal services-intro-reveal-title shrink-0 text-center lg:text-left">
              <p className="section-eyebrow mx-auto !text-white lg:mx-0">Our Services</p>
              <h2 className="mx-auto mt-2 max-w-xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-[3.375rem] lg:mx-0 lg:text-[3.75rem]">
                {copy.servicesHeading}
              </h2>
              <div className="services-intro-reveal services-intro-reveal-copy mt-6 flex flex-col items-center gap-6 lg:items-start">
                <p className="max-w-md text-sm leading-7 text-white/78 sm:text-base">{copy.servicesIntro}</p>
                <div className="flex w-full max-w-xs flex-col items-center gap-3 lg:items-start">
                  <a className="btn-call" href={BUSINESS.phoneTel}>
                    {copy.ctaCallVerb} {BUSINESS.phoneDisplay}
                  </a>
                  <a className="btn-alt btn-alt-inverse" href={homeFooterContactFormHref}>
                    {copy.ctaBookNowLabel}
                  </a>
                </div>
              </div>
            </div>

            <div className="services-intro-reveal relative mx-auto h-[16rem] w-full max-w-md overflow-hidden rounded-[1.75rem] bg-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 sm:h-[18rem] lg:mx-0 lg:h-auto lg:min-h-[24rem] lg:max-w-none lg:flex-1">
              <HcbImage
                src={SERVICES_SECTION_FEATURED_IMAGE}
                alt={gpmImageAlt(SERVICES_SECTION_FEATURED_IMAGE)}
                fill
                sizes="(min-width: 1280px) 32rem, (min-width: 1024px) 38vw, (min-width: 640px) 28rem, 90vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <ServicesAccordion />
        </div>
      </div>
    </section>
  );
}

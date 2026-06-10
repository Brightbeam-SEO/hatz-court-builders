"use client";

import { useEffect, useRef, useState } from "react";
import {
  BoiseContactTestimonialsDualMarquee,
  BoiseContactTestimonialsMarquee,
} from "@/components/landing/boise-contact-testimonials-marquee";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { BUSINESS } from "@/lib/business";
import type { GoogleReview } from "@/lib/home-content";

export function BoiseLandingTestimonialsSection({
  testimonials = [],
  sectionId = "landing-testimonials",
  eyebrow,
  heading = "What Our Guests Say",
  subtext = "Real reviews from guests who visit Zen Day Spa in Eagle—the same stories on our reviews page.",
  phoneHref = BUSINESS.phoneTel,
  bookNowHref = "#contact",
  reviewsDisplayMode = "grid",
  theme = "default",
}: {
  testimonials?: GoogleReview[] | null;
  sectionId?: string;
  eyebrow?: string;
  heading?: string;
  subtext?: string;
  phoneHref?: string;
  bookNowHref?: string;
  reviewsDisplayMode?: "marquee" | "grid" | "dual-marquee";
  /** Crimson band with white copy and dark review cards. */
  theme?: "default" | "crimson";
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const el = sectionRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      queueMicrotask(() => setRevealed(true));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  const useGrid = reviewsDisplayMode === "grid";
  const useDualMarquee = reviewsDisplayMode === "dual-marquee";
  const onCrimson = theme === "crimson";
  const reviewCardVariant = onCrimson ? "glass" : "crimson";
  const reviewCardLayout = onCrimson ? "default" : "centered";

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`section-pad contact-scroll-animate ${revealed ? "contact-revealed" : ""} ${
        onCrimson
          ? "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y border-zen-gold/30 bg-zen-crimson text-white shadow-[0_18px_45px_rgba(21, 21, 21,0.12)] light:bg-zen-crimson light:text-white"
          : "bg-transparent text-white light:bg-transparent light:text-zen-espresso"
      }`}
    >
      <div className="mx-auto w-full max-w-[95vw] sm:max-w-[min(80vw,100%)] px-2 sm:px-3 md:px-4">
        <div
          className={
            useGrid
              ? "flex w-full flex-col gap-8 lg:gap-10"
              : useDualMarquee
                ? "grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 xl:gap-12"
                : "grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12"
          }
        >
          <div
            className={`contact-heading-reveal text-left ${useDualMarquee ? "order-1 lg:order-2 lg:pl-2 xl:pl-4" : ""}`}
          >
            {eyebrow ? (
              <p
                className={`section-eyebrow ${onCrimson ? "!text-white/85" : ""}`.trim()}
              >
                {eyebrow}
              </p>
            ) : null}
            <h2
              className={`font-heading text-3xl font-bold leading-tight md:text-4xl ${onCrimson ? "text-white" : "text-white light:text-zen-espresso"}`}
            >
              {heading}
            </h2>
            <p
              className={`mt-4 max-w-xl text-base leading-relaxed sm:text-lg ${onCrimson ? "text-white/90" : "text-white/85 light:text-zen-taupe"}`}
            >
              {subtext}
            </p>
            <PageHeroCtaButtons
              secondaryHref={bookNowHref}
              onDark={onCrimson}
              primaryStyle={onCrimson ? "white" : "crimson"}
            />
          </div>
          <div
            className={
              useDualMarquee
                ? "order-2 relative flex min-h-[20rem] w-full min-w-0 flex-col lg:order-1 lg:min-h-[24rem] lg:max-h-[min(36rem,85vh)]"
                : useGrid
                  ? "relative w-full min-w-0"
                  : "relative flex min-h-[20rem] w-full min-w-0 flex-col lg:min-h-[24rem] lg:max-h-[min(36rem,85vh)]"
            }
          >
            {useDualMarquee ? (
              <BoiseContactTestimonialsDualMarquee
                testimonials={testimonials}
                cardVariant={reviewCardVariant}
                cardLayout={reviewCardLayout}
                fadeOn={onCrimson ? "crimson" : "default"}
              />
            ) : (
              <BoiseContactTestimonialsMarquee
                testimonials={testimonials}
                cardVariant={reviewCardVariant}
                cardLayout={reviewCardLayout}
                displayMode={reviewsDisplayMode}
                fadeOn={onCrimson ? "crimson" : "default"}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

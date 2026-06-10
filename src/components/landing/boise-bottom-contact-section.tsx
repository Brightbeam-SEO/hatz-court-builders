"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/home/contact-form";
import { BoiseContactTestimonialsMarquee } from "@/components/landing/boise-contact-testimonials-marquee";
import type { GoogleReview } from "@/lib/home-content";

/** Same gradient contact block as home `#contact`; right column is scrolling reviews from `/reviews`. */
export function BoiseBottomContactSection({
  testimonials = [],
  includeTestimonials = true,
  layout = "card",
  sectionId = "boise-contact",
  heading = "Book Your Massage at Zen Day Spa",
  subtext =
    "Call to schedule your session in Eagle—or walk in when we have openings. Our team is happy to help you choose the right massage or reflexology treatment.",
  formWrapperId = "boise-page-contact-form",
  formName = "Zen Day Spa landing contact",
}: {
  testimonials?: GoogleReview[] | null;
  /** When false, testimonials render in a separate section above (service landings). */
  includeTestimonials?: boolean;
  layout?: "card" | "blend";
  sectionId?: string;
  heading?: string;
  subtext?: string;
  formWrapperId?: string;
  formName?: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  /** Matches testimonials column height to heading + copy + form only (lg+); avoids grid row sizing from tall marquee content. */
  const [marqueeHeightPx, setMarqueeHeightPx] = useState<number | null>(null);
  const blend = layout === "blend";
  const showTestimonials = includeTestimonials && (testimonials?.length ?? 0) > 0;

  useLayoutEffect(() => {
    if (!showTestimonials) {
      setMarqueeHeightPx(null);
      return;
    }
    const leftEl = leftColRef.current;
    if (!leftEl || typeof ResizeObserver === "undefined") return;

    const mq = window.matchMedia("(min-width: 1024px)");

    const sync = () => {
      if (!mq.matches) {
        setMarqueeHeightPx(null);
        return;
      }
      setMarqueeHeightPx(Math.round(leftEl.getBoundingClientRect().height));
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(leftEl);
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      ro.disconnect();
    };
  }, [showTestimonials]);

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
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  const sectionClass = blend
    ? "section-pad bg-transparent text-white light:bg-transparent light:text-zen-espresso contact-scroll-animate"
    : "section-pad bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso contact-scroll-animate";

  const innerClass = blend
    ? "flex w-full flex-col"
    : "flex w-full flex-col rounded-[1.75rem] bg-gradient-to-br from-zen-espresso via-[#2a1518] to-zen-espresso ring-1 ring-zen-gold/25 p-6 shadow-lg sm:p-8 md:p-10 lg:p-10";

  const headingClass = blend
    ? "mx-auto max-w-2xl text-center font-heading text-3xl font-bold text-white light:text-zen-espresso md:text-4xl"
    : "mx-auto max-w-2xl text-center font-heading text-3xl font-bold text-white md:text-4xl";

  const subtextClass = blend
    ? "mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-white/85 light:text-zen-taupe sm:text-lg"
    : "mx-auto mt-4 max-w-3xl text-center leading-7 text-white";

  const formClass = blend
    ? "contact-form-reveal mt-8 w-full rounded-3xl border border-white/25 bg-zen-crimson p-6 text-left shadow-[0_24px_55px_rgba(21, 21, 21,0.35)] ring-1 ring-white/20 sm:mt-10 sm:p-8 md:max-w-xl md:mx-auto lg:mx-0 lg:max-w-none"
    : "contact-form-reveal mt-8 w-full rounded-3xl border border-white/45 bg-white/18 p-6 text-left shadow-[0_30px_70px_rgba(21, 21, 21,0.38)] ring-1 ring-white/25 backdrop-blur-xl sm:mt-10 sm:p-8";

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`${sectionClass} ${revealed ? "contact-revealed" : ""}`}
    >
      
      <div className="mx-auto w-full max-w-[95vw] text-center sm:max-w-[min(80vw,100%)] px-2 sm:px-3 md:px-4">
        <div className={innerClass}>
          <div
            className={
              showTestimonials
                ? "grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12"
                : "mx-auto max-w-xl"
            }
          >
            <div ref={leftColRef} className={`text-left lg:min-h-0 ${showTestimonials ? "" : "mx-auto w-full"}`}>
              <div className="contact-heading-reveal">
                <h2 className={headingClass}>{heading}</h2>
                <p className={subtextClass}>{subtext}</p>
              </div>

              <div id={formWrapperId} className={formClass}>
                <ContactForm variant="dark" formName={formName} />
              </div>
            </div>

            {showTestimonials ? (
            <div
              className={`relative flex w-full min-w-0 flex-col overflow-visible pb-2 max-lg:overflow-hidden lg:self-start lg:min-h-0 lg:overflow-hidden lg:pb-0 ${marqueeHeightPx == null ? "lg:max-h-[min(36rem,85vh)]" : ""}`}
              style={
                marqueeHeightPx != null
                  ? { height: `${marqueeHeightPx}px`, maxHeight: "none" }
                  : undefined
              }
            >
              {marqueeHeightPx != null ? (
                <>
                  <div
                    className="hidden min-h-0 shrink lg:flex lg:flex-1 lg:basis-0"
                    aria-hidden
                  />
                  <div className="relative flex min-h-0 w-full shrink-0 flex-col overflow-hidden lg:h-[90%] lg:max-h-[90%] lg:min-h-[11rem]">
                    <BoiseContactTestimonialsMarquee
                      testimonials={testimonials}
                      cardVariant={blend ? "crimson" : "espresso"}
                    />
                  </div>
                  <div
                    className="hidden min-h-0 shrink lg:flex lg:flex-1 lg:basis-0"
                    aria-hidden
                  />
                </>
              ) : (
                <div className="relative flex min-h-0 w-full min-w-0 max-w-none shrink-0 flex-col max-lg:overflow-hidden lg:h-full lg:min-h-0 lg:flex-1">
                  <BoiseContactTestimonialsMarquee
                    testimonials={testimonials}
                    cardVariant={blend ? "crimson" : "espresso"}
                  />
                </div>
              )}
            </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

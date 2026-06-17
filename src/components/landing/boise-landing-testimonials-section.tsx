"use client";

import { useEffect, useRef, useState } from "react";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { BUSINESS } from "@/lib/business";
import type { GoogleReview } from "@/lib/home-content";

export function BoiseLandingTestimonialsSection({
  testimonials = [],
  sectionId = "landing-testimonials",
  heading = "What Our Guests Say",
  subtext = "Real reviews from guests who visit Zen Day Spa in Eagle—the same stories on our reviews page.",
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

  const onCrimson = theme === "crimson";
  const testimonialCards = (testimonials ?? []).map((item) => ({
    name: item.name,
    quote: item.quote,
    image: item.image,
    role: "Client",
    company: BUSINESS.nameShort,
  }));

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
      <TestimonialsSection
        sectionId={sectionId}
        testimonials={testimonialCards}
        heading={heading}
        subtext={subtext}
        className="pb-12 pt-8 md:pb-16"
      />
    </section>
  );
}

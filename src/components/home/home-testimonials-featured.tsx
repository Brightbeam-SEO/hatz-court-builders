"use client";

import { useEffect, useState } from "react";
import type { GoogleReview } from "@/lib/home-content";

type VisibleAvatar = {
  review: GoogleReview;
  slot: "prev" | "active" | "next";
};

function getVisibleAvatars(testimonials: GoogleReview[], activeIndex: number): VisibleAvatar[] {
  const count = testimonials.length;
  if (count === 0) return [];
  if (count === 1) {
    return [{ review: testimonials[0]!, slot: "active" }];
  }

  const prevIndex = (activeIndex - 1 + count) % count;
  const nextIndex = (activeIndex + 1) % count;

  return [
    { review: testimonials[prevIndex]!, slot: "prev" },
    { review: testimonials[activeIndex]!, slot: "active" },
    { review: testimonials[nextIndex]!, slot: "next" },
  ];
}

function StarRow() {
  return (
    <span className="text-base leading-none tracking-tight text-amber-300" aria-label="5 out of 5 stars">
      ★★★★★
    </span>
  );
}

function NavArrowButton({
  direction,
  onClick,
  className = "",
}: {
  direction: "up" | "down";
  onClick: () => void;
  className?: string;
}) {
  const isUp = direction === "up";

  return (
    <button
      type="button"
      aria-label={isUp ? "Previous testimonial" : "Next testimonial"}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-11 sm:w-11 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isUp ? (
          <>
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </>
        ) : (
          <>
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </>
        )}
      </svg>
    </button>
  );
}

export function HomeTestimonialsFeatured({
  testimonials,
}: {
  testimonials: GoogleReview[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = testimonials.length;
  const active = testimonials[activeIndex] ?? null;

  useEffect(() => {
    if (count < 2) return;
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [count]);

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + count) % count);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % count);

  if (!active) {
    return (
      <p className="text-sm text-white/70">Reviews will appear here soon.</p>
    );
  }

  const visibleAvatars = getVisibleAvatars(testimonials, activeIndex);

  return (
    <div
      className="w-full min-w-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="flex w-full items-center gap-5 sm:gap-6 lg:gap-8 xl:gap-10">
        <div
          className="flex shrink-0 flex-col items-center gap-3 sm:gap-4"
          role="tablist"
          aria-label="Choose a reviewer"
        >
          {visibleAvatars.map(({ review, slot }) => {
            const isActive = slot === "active";
            const carouselIndex = testimonials.findIndex((item) => item.id === review.id);

            return (
              <button
                key={`${review.id}-${slot}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show review from ${review.name}`}
                onClick={() => {
                  if (carouselIndex >= 0) setActiveIndex(carouselIndex);
                }}
                className={`overflow-hidden rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isActive
                    ? "h-16 w-16 ring-2 ring-zen-gold sm:h-[4.75rem] sm:w-[4.75rem]"
                    : "h-11 w-11 opacity-55 grayscale hover:opacity-80 sm:h-12 sm:w-12"
                }`}
              >
                <img
                  src={review.image}
                  alt=""
                  width={76}
                  height={76}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>

        <article className="min-w-0 flex-1 lg:max-w-none">
          <div key={active.id} className="trust-testimonial-card-content">
            <blockquote className="font-heading text-xl font-bold leading-[1.18] tracking-tight text-white sm:text-2xl lg:text-[1.625rem] lg:leading-[1.2] xl:text-[1.875rem] xl:leading-[1.18] 2xl:text-[2rem]">
              {active.quote}
            </blockquote>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="text-sm font-medium text-white/90 sm:text-base">{active.name}</p>
              <StarRow />
            </div>
          </div>
        </article>

        {count > 1 ? (
          <div className="flex shrink-0 flex-col gap-3">
            <NavArrowButton
              direction="up"
              onClick={goPrev}
              className="bg-zen-gold text-zen-espresso hover:bg-zen-gold/90"
            />
            <NavArrowButton
              direction="down"
              onClick={goNext}
              className="border border-white/25 bg-white/10 text-white hover:bg-white/15"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

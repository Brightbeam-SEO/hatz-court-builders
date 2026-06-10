"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import type { GoogleReview } from "@/lib/home-content";

/** Omit from the floating arc (still in carousel + card). */
const HIDDEN_FLOAT_REVIEW_ID = "review-loryssa-quintero";

/**
 * Seven avatars in an arc above the card — alternating low/high and small/large.
 * Index 3 is centered on the card (50% left).
 */
const FLOAT_SLOTS = [
  { left: "10%", top: "22%", size: 48, delay: 0.08 },
  { left: "20%", top: "58%", size: 38, delay: 0.13 },
  { left: "32%", top: "8%", size: 44, delay: 0.18 },
  { left: "50%", top: "0%", size: 58, delay: 0.22 },
  { left: "68%", top: "10%", size: 44, delay: 0.27 },
  { left: "80%", top: "54%", size: 38, delay: 0.32 },
  { left: "90%", top: "20%", size: 46, delay: 0.37 },
] as const;

const CENTER_FLOAT_INDEX = 3;

function StarRow() {
  return (
    <span
      className="text-xl leading-none tracking-tight text-amber-300 sm:text-2xl"
      aria-label="5 out of 5 stars"
    >
      ★★★★★
    </span>
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

  if (!active) {
    return (
      <p className="text-center text-sm text-white/70">Reviews will appear here soon.</p>
    );
  }

  const floatReviews = testimonials
    .filter((review) => review.id !== HIDDEN_FLOAT_REVIEW_ID)
    .slice(0, FLOAT_SLOTS.length);

  return (
    <div
      className="w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="relative w-full pt-2">
        <div
          className="pointer-events-none relative mx-auto h-[8.5rem] w-full sm:h-[9.5rem] md:h-[10.5rem] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
          aria-hidden
        >
          {floatReviews.map((review, index) => {
            const slot = FLOAT_SLOTS[index];
            const carouselIndex = testimonials.findIndex((t) => t.id === review.id);
            const isActive = review.id === active.id;
            const isCenter = index === CENTER_FLOAT_INDEX;
            return (
              <button
                key={review.id}
                type="button"
                aria-label={`Show review from ${review.name}`}
                aria-current={isActive ? "true" : undefined}
                className={`trust-floating-avatar pointer-events-auto absolute rounded-full shadow-[0_8px_20px_rgba(21,21,21,0.18)] ring-2 transition-[box-shadow,opacity,z-index] duration-300 ${
                  isActive
                    ? "z-30 ring-zen-crimson"
                    : isCenter
                      ? "z-20 ring-zen-crimson/40"
                      : "z-10 ring-white opacity-95 hover:opacity-100"
                }`}
                style={
                  {
                    left: slot.left,
                    top: slot.top,
                    width: slot.size,
                    height: slot.size,
                    "--trust-avatar-delay": `${slot.delay}s`,
                  } as CSSProperties
                }
                onClick={() => {
                  if (carouselIndex >= 0) setActiveIndex(carouselIndex);
                }}
              >
                <span
                  className={`block h-full w-full overflow-hidden rounded-full transition-transform duration-300 ${
                    isActive ? "scale-110" : isCenter ? "scale-105" : "scale-100 hover:scale-105"
                  }`}
                >
                  <Image
                    src={review.image}
                    alt=""
                    width={slot.size}
                    height={slot.size}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </span>
              </button>
            );
          })}
        </div>

        <article className="trust-testimonial-card relative z-0 mx-auto w-full -mt-11 min-h-[17.5rem] rounded-[1.75rem] border border-zen-crimson/20 bg-zen-crimson px-6 py-9 text-white shadow-[0_20px_50px_rgba(18,84,155,0.28)] sm:-mt-14 sm:min-h-[19rem] sm:px-10 sm:py-11 md:max-w-3xl lg:max-w-4xl lg:min-h-[21rem] lg:px-12 lg:py-12 xl:max-w-5xl">
          <div
            key={active.id}
            className="trust-testimonial-card-content flex min-h-[inherit] flex-col items-center justify-center text-center"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/30 sm:h-[4.5rem] sm:w-[4.5rem]">
              <Image
                src={active.image}
                alt={active.name}
                width={72}
                height={72}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <p className="mt-4 font-heading text-lg font-semibold text-white sm:text-xl">
              {active.name}
            </p>
            <div className="mt-3">
              <StarRow />
            </div>
            <blockquote className="mt-5 max-w-3xl text-pretty text-sm leading-relaxed text-white/90 sm:text-base sm:leading-7">
              {active.quote}
            </blockquote>
          </div>
        </article>
      </div>

      <div
        className="mt-8 flex flex-wrap items-center justify-center gap-2 pb-2 md:pb-4 lg:pb-6"
        role="tablist"
        aria-label="Choose a testimonial"
      >
        {testimonials.map((review, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={review.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`${review.name}, testimonial ${index + 1} of ${count}`}
              className="rounded-full p-1 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => setActiveIndex(index)}
            >
              <span
                className={`block h-2 w-2 rounded-full transition-[transform,background-color] duration-200 ${
                  selected ? "scale-125 bg-zen-crimson" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

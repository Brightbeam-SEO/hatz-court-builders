"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { GoogleReview } from "@/lib/home-content";
import { useHomeContent } from "./home-content-context";

type Review = GoogleReview;

function StarRow({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex text-lg leading-none tracking-tight text-zen-gold ${className ?? ""}`}
      aria-label="5 out of 5 stars"
    >
      ★★★★★
    </span>
  );
}

function SideReviewCard({
  review,
  onSelect,
}: {
  review: Review;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group hero-glass-light flex w-full max-w-[16rem] flex-col rounded-2xl border border-white/25 bg-white/15 p-4 text-center shadow-md backdrop-blur-xl transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sol-teal sm:p-5 md:max-w-[15.5rem] lg:max-w-[17rem] light:shadow-none light:hover:bg-white/45"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white/20 ring-1 ring-white/30 light:bg-slate-200 light:ring-slate-300">
          <Image
            src={review.image}
            alt=""
            width={44}
            height={44}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm font-semibold text-white md:text-base light:text-zen-espresso">
            {review.name}
          </p>
          <div className="mt-2">
            <StarRow />
          </div>
        </div>
      </div>
      <blockquote className="mt-3 font-heading text-sm leading-relaxed text-white/80 line-clamp-6 light:text-zen-taupe md:line-clamp-5">
        {review.quote}
      </blockquote>
    </button>
  );
}

function FeaturedReviewCard({ review }: { review: Review }) {
  return (
    <article
      id="testimonial-featured-panel"
      className="testimonial-carousel-feature relative z-10 flex min-h-[18rem] w-full max-w-xl flex-col overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-zen-espresso via-[#2c1818] to-zen-gold/28 p-6 shadow-2xl ring-1 ring-zen-gold/25 md:min-h-[22rem] md:scale-[1.05] md:p-8 lg:min-h-[24rem]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 55% at 20% 15%, rgba(255,255,255,0.45) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 85% 75%, rgba(184, 155, 106,0.22) 0%, transparent 55%)",
        }}
      />
      <span
        className="pointer-events-none absolute right-5 top-4 font-serif text-6xl leading-none text-white/25 md:right-6 md:text-7xl"
        aria-hidden
      >
        &ldquo;
      </span>
      <div className="relative flex flex-col items-center gap-3 text-center">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-emerald-900 ring-2 ring-white/20 md:h-16 md:w-16">
          <Image
            src={review.image}
            alt=""
            width={64}
            height={64}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="font-heading text-base font-semibold text-white md:text-lg">
            {review.name}
          </p>
          <div className="relative mt-2">
            <StarRow className="text-xl md:text-2xl" />
          </div>
        </div>
      </div>
      <blockquote className="relative mt-5 flex-1 text-center font-heading text-sm leading-relaxed text-white/95 md:text-[15px] md:leading-relaxed">
        <p className="text-pretty">{review.quote}</p>
      </blockquote>
    </article>
  );
}

export function TestimonialsCarousel() {
  const { googleReviews } = useHomeContent();
  const [active, setActive] = useState(0);
  const count = googleReviews.length;
  const scrollRef = useRef<HTMLDivElement>(null);
  const featuredSlotRef = useRef<HTMLDivElement>(null);

  const goPrev = () => setActive((i) => (i - 1 + count) % count);
  const goNext = () => setActive((i) => (i + 1) % count);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;
    const scroller = scrollRef.current;
    const featured = featuredSlotRef.current;
    if (!scroller || !featured) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const featuredRect = featured.getBoundingClientRect();
    const featuredLeftInContent =
      scroller.scrollLeft + (featuredRect.left - scrollerRect.left);
    const featuredCenter = featuredLeftInContent + featuredRect.width / 2;
    const targetScroll = featuredCenter - scroller.clientWidth / 2;
    const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    scroller.scrollTo({
      left: Math.max(0, Math.min(targetScroll, maxScroll)),
      behavior: "instant",
    });
  }, [active]);

  useEffect(() => {
    if (count < 2) return;
    const intervalId = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [count]);

  const { left, right, current, leftIdx, rightIdx } = useMemo(() => {
    const leftIdx = (active - 1 + count) % count;
    const rightIdx = (active + 1) % count;
    return {
      left: googleReviews[leftIdx],
      right: googleReviews[rightIdx],
      current: googleReviews[active],
      leftIdx,
      rightIdx,
    };
  }, [active, count, googleReviews]);

  function onCarouselKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  }

  return (
    <div
      className="mx-auto w-full max-w-6xl outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      tabIndex={0}
      onKeyDown={onCarouselKeyDown}
    >
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory flex-row items-stretch gap-4 overflow-x-auto overflow-y-visible scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:max-w-none md:justify-center md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-[min(88vw,17.5rem)] shrink-0 snap-center justify-center first:pl-1 last:pr-1 md:w-[min(100%,17rem)] md:max-w-[28%] md:flex-1 md:snap-none md:justify-end md:pl-0 md:last:pr-0">
          <div
            key={leftIdx}
            className="testimonial-carousel-side flex w-full justify-center md:justify-end"
          >
            <SideReviewCard
              review={left}
              onSelect={() => setActive((active - 1 + count) % count)}
            />
          </div>
        </div>

        <div
          ref={featuredSlotRef}
          className="flex w-[min(92vw,24rem)] shrink-0 snap-center justify-center md:w-auto md:max-w-xl md:flex-[1.15] md:shrink md:snap-none"
        >
          <div key={active} className="flex w-full justify-center">
            <FeaturedReviewCard review={current} />
          </div>
        </div>

        <div className="flex w-[min(88vw,17.5rem)] shrink-0 snap-center justify-center md:w-[min(100%,17rem)] md:max-w-[28%] md:flex-1 md:snap-none md:justify-start">
          <div
            key={rightIdx}
            className="testimonial-carousel-side flex w-full justify-center md:justify-start"
          >
            <SideReviewCard
              review={right}
              onSelect={() => setActive((active + 1) % count)}
            />
          </div>
        </div>
      </div>

      <div
        className="mt-6 flex flex-wrap items-center justify-center gap-1.5 md:mt-8"
        role="group"
        aria-label={`${count} reviews — choose which one to show in the center`}
      >
        {googleReviews.map((r, index) => {
          const selected = index === active;
          return (
            <button
              key={r.id}
              type="button"
              aria-label={`${r.name}, review ${index + 1} of ${count}`}
              aria-controls="testimonial-featured-panel"
              aria-current={selected ? "true" : undefined}
              className="flex h-11 min-w-[2.75rem] items-center justify-center rounded-full p-3 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sol-teal"
              onClick={() => setActive(index)}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full transition-[transform,background-color] duration-200 ease-out md:h-3 md:w-3 ${
                  selected
                    ? "scale-125 bg-gradient-to-r from-zen-gold via-zen-sage to-zen-crimson"
                    : "bg-white/35 hover:scale-110 hover:bg-white/55 light:bg-slate-400 light:hover:bg-slate-500"
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

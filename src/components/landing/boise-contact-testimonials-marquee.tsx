"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { GoogleReview } from "@/lib/home-content";

/** Soft edge fades: gradual alpha ramps so cards aren’t clipped harshly mid-viewport. */
const EDGE_MASK =
  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.18) 2.5%, rgba(0,0,0,0.55) 6%, rgba(0,0,0,0.9) 9%, black 12%, black 88%, rgba(0,0,0,0.9) 91%, rgba(0,0,0,0.55) 94%, rgba(0,0,0,0.18) 97.5%, transparent 100%)";

const EDGE_MASK_CRIMSON =
  "linear-gradient(to bottom, transparent 0%, rgba(18,84,155,0.18) 2.5%, rgba(18,84,155,0.55) 6%, rgba(18,84,155,0.9) 9%, #12549B 12%, #12549B 88%, rgba(18,84,155,0.9) 91%, rgba(18,84,155,0.55) 94%, rgba(18,84,155,0.18) 97.5%, transparent 100%)";

function edgeMaskStyle(fadeOn: "default" | "crimson") {
  const mask = fadeOn === "crimson" ? EDGE_MASK_CRIMSON : EDGE_MASK;
  return {
    maskImage: mask,
    WebkitMaskImage: mask,
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
  } as const;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

const REVIEW_CARD_CLASS = {
  espresso:
    "w-full max-w-none shrink-0 rounded-2xl bg-zen-espresso p-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/15 light:bg-transparent light:shadow-[0_10px_28px_rgba(15,23,42,0.08)] light:ring-slate-200/90 sm:p-4",
  crimson:
    "w-full max-w-none shrink-0 rounded-2xl border border-white/15 bg-zen-crimson p-3 shadow-[0_12px_32px_rgba(18,84,155,0.35)] sm:p-4",
  glass:
    "group relative flex w-full max-w-none shrink-0 flex-col rounded-2xl border border-white/25 bg-white/12 p-3 backdrop-blur-md transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/40 hover:bg-white/16 motion-reduce:transition-none sm:min-h-[14.5rem] sm:p-4",
} as const;

const STAR_CLASS = "text-[11px] font-semibold leading-none tracking-[0.08em] text-zen-gold";

export function ReviewCard({
  review,
  variant = "espresso",
  layout = "default",
}: {
  review: GoogleReview;
  variant?: keyof typeof REVIEW_CARD_CLASS;
  layout?: "default" | "centered";
}) {
  const centered = layout === "centered";

  if (variant === "glass") {
    return (
      <article className={REVIEW_CARD_CLASS.glass}>
        <blockquote className="line-clamp-5 min-h-0 shrink-0 text-left text-sm font-medium leading-relaxed text-white/95">
          {review.quote}
        </blockquote>
        <div className="mt-auto shrink-0 border-t border-white/20 pt-3">
          <div className="flex items-start gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/35">
              <Image
                src={review.image}
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-sm font-bold text-white">{review.name}</p>
              <p className={`mt-1 ${STAR_CLASS}`} aria-label="5 out of 5 stars">
                ★★★★★
              </p>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`${REVIEW_CARD_CLASS[variant]} ${centered ? "flex flex-col items-center text-center" : ""}`}
    >
      <blockquote
        className={
          centered
            ? "text-sm font-medium leading-relaxed text-white"
            : "text-sm font-semibold leading-relaxed text-white light:text-zen-espresso"
        }
      >
        {review.quote}
      </blockquote>
      <div
        className={
          centered
            ? "mt-4 flex w-full flex-col items-center gap-3 border-t border-white/20 pt-4"
            : "mt-3 flex items-center gap-3 border-t border-white/10 pt-3 light:border-slate-200 sm:mt-4 sm:pt-4"
        }
      >
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30 sm:h-10 sm:w-10">
          <Image
            src={review.image}
            alt=""
            width={40}
            height={40}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
        <div className={centered ? "min-w-0" : "min-w-0 text-left"}>
          <p className="font-heading text-sm font-bold text-white">{review.name}</p>
          <p className={centered ? `mt-1 ${STAR_CLASS}` : STAR_CLASS} aria-label="5 out of 5 stars">
            ★★★★★
          </p>
        </div>
      </div>
    </article>
  );
}

function MarqueeTrack({
  reviews,
  durationSec,
  cardVariant = "espresso",
  cardLayout = "default",
  direction = "up",
}: {
  reviews: GoogleReview[];
  durationSec: number;
  cardVariant?: keyof typeof REVIEW_CARD_CLASS;
  cardLayout?: "default" | "centered";
  direction?: "up" | "down";
}) {
  if (reviews.length === 0) {
    return null;
  }

  const loop = [...reviews, ...reviews];
  const trackClass =
    direction === "down"
      ? "boise-contact-testimonials-track boise-contact-testimonials-track--down"
      : "boise-contact-testimonials-track";

  return (
    <div className="relative h-full min-h-0 w-full min-w-0 max-w-none overflow-hidden">
      <div
        className={`${trackClass} flex w-full min-w-0 flex-col gap-3 sm:gap-4`}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {loop.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} variant={cardVariant} layout={cardLayout} />
        ))}
      </div>
    </div>
  );
}

/** Static review cards — one column on small screens, two from md up. */
export function BoiseContactTestimonialsGrid({
  testimonials = [],
  cardVariant = "espresso",
  cardLayout = "centered",
}: {
  testimonials?: GoogleReview[] | null;
  cardVariant?: keyof typeof REVIEW_CARD_CLASS;
  cardLayout?: "default" | "centered";
}) {
  const list = testimonials ?? [];

  if (list.length === 0) {
    return (
      <p className="text-center text-sm text-white/85 light:text-zen-taupe">
        Reviews will appear here soon.
      </p>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-4 lg:gap-5">
      {list.map((review) => (
        <ReviewCard key={review.id} review={review} variant={cardVariant} layout={cardLayout} />
      ))}
    </div>
  );
}

/**
 * Single upward-scrolling column — same review objects as `/reviews`.
 * Edge fades via CSS mask; respects `prefers-reduced-motion`.
 */

export function BoiseContactTestimonialsMarquee({
  testimonials = [],
  cardVariant = "espresso",
  cardLayout = "default",
  displayMode = "marquee",
  fadeOn = "default",
}: {
  testimonials?: GoogleReview[] | null;
  cardVariant?: keyof typeof REVIEW_CARD_CLASS;
  cardLayout?: "default" | "centered";
  displayMode?: "marquee" | "grid";
  fadeOn?: "default" | "crimson";
}) {
  const list = testimonials ?? [];

  if (displayMode === "grid") {
    return (
      <BoiseContactTestimonialsGrid
        testimonials={list}
        cardVariant={cardVariant}
        cardLayout={cardLayout}
      />
    );
  }

  const reducedMotion = usePrefersReducedMotion();
  const durationSec = 118;

  if (list.length === 0) {
    return (
      <div className="flex min-h-[16rem] w-full max-w-none items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-6 text-center text-sm text-white/85 sm:min-h-[18rem] sm:rounded-3xl">
        Reviews will appear here soon.
      </div>
    );
  }

  if (reducedMotion) {
    return (
      <div className="contact-photo-reveal relative h-[min(22rem,55vh)] max-h-[min(22rem,55vh)] w-full min-h-0 min-w-0 max-w-none shrink-0 overflow-y-auto overflow-x-hidden rounded-2xl border border-white/15 bg-white/5 px-1 py-2 sm:h-[min(26rem,60vh)] sm:max-h-[min(26rem,60vh)] sm:rounded-3xl lg:h-full lg:max-h-none lg:min-h-0 lg:flex-1">
        <div className="flex w-full min-w-0 flex-col gap-3 sm:gap-4">
          {list.map((r) => (
            <ReviewCard key={r.id} review={r} variant={cardVariant} layout={cardLayout} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="contact-photo-reveal relative h-[min(20rem,calc(100vh-11rem))] max-h-[min(20rem,calc(100vh-11rem))] w-full min-h-0 min-w-0 max-w-none shrink-0 overflow-hidden rounded-2xl sm:h-[min(24rem,calc(100vh-12rem))] sm:max-h-[min(24rem,calc(100vh-12rem))] sm:rounded-3xl lg:h-full lg:max-h-none lg:min-h-0 lg:flex-1"
      style={edgeMaskStyle(fadeOn)}
    >
      <MarqueeTrack reviews={list} durationSec={durationSec} cardVariant={cardVariant} cardLayout={cardLayout} />
    </div>
  );
}

/** Two vertical columns — first scrolls up, second scrolls down. */
export function BoiseContactTestimonialsDualMarquee({
  testimonials = [],
  cardVariant = "espresso",
  cardLayout = "centered",
  fadeOn = "default",
}: {
  testimonials?: GoogleReview[] | null;
  cardVariant?: keyof typeof REVIEW_CARD_CLASS;
  cardLayout?: "default" | "centered";
  fadeOn?: "default" | "crimson";
}) {
  const reducedMotion = usePrefersReducedMotion();
  const list = testimonials ?? [];
  const { col1, col2 } = useMemo(() => {
    const mid = Math.ceil(list.length / 2);
    return { col1: list.slice(0, mid), col2: list.slice(mid) };
  }, [list]);

  if (list.length === 0) {
    return (
      <div className="flex min-h-[16rem] w-full max-w-none items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-6 text-center text-sm text-white/85 sm:min-h-[18rem] sm:rounded-3xl">
        Reviews will appear here soon.
      </div>
    );
  }

  if (reducedMotion) {
    return (
      <BoiseContactTestimonialsGrid
        testimonials={list}
        cardVariant={cardVariant}
        cardLayout={cardLayout}
      />
    );
  }

  const col2Reviews = col2.length > 0 ? col2 : col1;
  const marqueeShellClass =
    "contact-photo-reveal relative h-[min(22rem,calc(100vh-11rem))] max-h-[min(22rem,calc(100vh-11rem))] w-full min-h-0 min-w-0 max-w-none shrink-0 overflow-hidden rounded-2xl sm:h-[min(28rem,calc(100vh-12rem))] sm:max-h-[min(28rem,calc(100vh-12rem))] sm:rounded-3xl lg:h-full lg:max-h-none lg:min-h-0 lg:flex-1";
  return (
    <div className={marqueeShellClass} style={edgeMaskStyle(fadeOn)}>
      <div className="grid h-full min-h-0 grid-cols-2 gap-3 sm:gap-4">
        <MarqueeTrack
          reviews={col1}
          durationSec={118}
          cardVariant={cardVariant}
          cardLayout={cardLayout}
          direction="up"
        />
        <MarqueeTrack
          reviews={col2Reviews}
          durationSec={132}
          cardVariant={cardVariant}
          cardLayout={cardLayout}
          direction="down"
        />
      </div>
    </div>
  );
}

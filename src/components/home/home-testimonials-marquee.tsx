"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { GoogleReview } from "@/lib/home-content";

const SIDE_FADE =
  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)";

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

const MARQUEE_CARD_CLASS = {
  glass:
    "group relative flex min-h-[14.5rem] w-[min(88vw,17.5rem)] shrink-0 flex-col rounded-2xl border border-white/25 bg-white/12 p-4 backdrop-blur-md [backface-visibility:hidden] transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:z-10 hover:scale-[1.04] hover:border-white/40 hover:bg-white/16 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:min-h-[16.5rem] sm:w-80 sm:p-5",
  solid:
    "group relative flex min-h-[14.5rem] w-[min(88vw,17.5rem)] shrink-0 flex-col rounded-2xl border border-white/15 bg-zen-crimson p-4 shadow-[0_12px_32px_rgba(18,84,155,0.35)] [backface-visibility:hidden] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:z-10 hover:scale-[1.04] hover:shadow-[0_16px_40px_rgba(18,84,155,0.45)] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:min-h-[16.5rem] sm:w-80 sm:p-5",
} as const;

function MarqueeCard({
  review,
  variant = "glass",
}: {
  review: GoogleReview;
  variant?: keyof typeof MARQUEE_CARD_CLASS;
}) {
  return (
    <article
      className={MARQUEE_CARD_CLASS[variant]}
      style={{ transformOrigin: "center center" }}
    >
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
            <p className="mt-1 text-[11px] font-semibold leading-none tracking-[0.08em] text-zen-gold" aria-label="5 out of 5 stars">
              ★★★★★
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  reviews,
  direction,
  durationSec,
  cardVariant = "glass",
}: {
  reviews: GoogleReview[];
  direction: "ltr" | "rtl";
  durationSec: number;
  cardVariant?: keyof typeof MARQUEE_CARD_CLASS;
}) {
  if (reviews.length === 0) return null;
  const loop = [...reviews, ...reviews];
  const trackClass =
    direction === "ltr" ? "home-testimonials-marquee-track--ltr" : "home-testimonials-marquee-track--rtl";

  return (
    <div
      className="relative overflow-hidden py-2"
      style={{
        maskImage: SIDE_FADE,
        WebkitMaskImage: SIDE_FADE,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
      }}
    >
      <div className={`flex w-max gap-4 sm:gap-5 ${trackClass}`} style={{ animationDuration: `${durationSec}s` }}>
        {loop.map((r, i) => (
          <MarqueeCard key={`${r.id}-${i}`} review={r} variant={cardVariant} />
        ))}
      </div>
    </div>
  );
}

export function HomeTestimonialsMarquee({
  testimonials,
  rowCount = 2,
  cardVariant = "glass",
}: {
  testimonials: GoogleReview[];
  /** `1` = single scrolling row (service landings); default matches homepage. */
  rowCount?: 1 | 2;
  /** `solid` = crimson cards (service landings); default matches homepage glass rail. */
  cardVariant?: keyof typeof MARQUEE_CARD_CLASS;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const { row1, row2 } = useMemo(() => {
    const list = testimonials ?? [];
    if (rowCount === 1) {
      return { row1: list, row2: [] as GoogleReview[] };
    }
    const mid = Math.ceil(list.length / 2);
    return { row1: list.slice(0, mid), row2: list.slice(mid) };
  }, [testimonials, rowCount]);

  if (row1.length === 0 && row2.length === 0) {
    return <p className="text-center text-sm text-white/85">Reviews will appear here soon.</p>;
  }

  if (reducedMotion) {
    return (
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5">
        {testimonials.map((r) => (
          <MarqueeCard key={r.id} review={r} variant={cardVariant} />
        ))}
      </div>
    );
  }

  if (rowCount === 1) {
    return (
      <MarqueeRow reviews={row1} direction="ltr" durationSec={92} cardVariant={cardVariant} />
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <MarqueeRow reviews={row1} direction="ltr" durationSec={92} cardVariant={cardVariant} />
      <MarqueeRow
        reviews={row2.length > 0 ? row2 : row1}
        direction="rtl"
        durationSec={108}
        cardVariant={cardVariant}
      />
    </div>
  );
}

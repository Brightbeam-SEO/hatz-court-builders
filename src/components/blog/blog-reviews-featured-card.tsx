"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { GoogleReview } from "@/lib/home-content";
import { blogSidebarFeaturedReviews } from "@/lib/reviews-testimonials";

/**
 * Rotates through the same five reviews as selected `/reviews` masonry cards
 * (Sierra, Dawn, Randi, PM Larsen, Martha)—one card at a time.
 */
export function BlogReviewsFeaturedCard() {
  const reviews = useMemo<GoogleReview[]>(() => blogSidebarFeaturedReviews(), []);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const activeReview = reviews[activeReviewIndex] ?? null;

  useEffect(() => {
    if (reviews.length < 2) return;
    const intervalId = window.setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [reviews.length]);

  return (
    <article className="relative overflow-hidden rounded-3xl bg-zen-crimson p-8 text-white shadow-[0_20px_44px_rgba(18,84,155,0.35)] ring-1 ring-white/20 sm:p-10">
      {activeReview ? (
        <div key={activeReview.id} className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">Featured Review</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/25">
              <Image
                src={activeReview.image}
                alt={activeReview.name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="font-heading text-lg font-semibold text-white">{activeReview.name}</p>
              <p className="text-zen-gold" aria-label="5 out of 5 stars">
                ★★★★★
              </p>
            </div>
          </div>
          <blockquote className="mt-5 font-heading text-sm leading-7 text-white/95 sm:text-base">
            {activeReview.quote}
          </blockquote>
        </div>
      ) : (
        <p className="relative text-sm text-white/90">Reviews will appear here soon.</p>
      )}
    </article>
  );
}

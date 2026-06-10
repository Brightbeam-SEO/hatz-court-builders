"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GoogleReview } from "@/lib/home-content";

const reviewStarClass = "text-[#FFD54A] drop-shadow-[0_0_1px_rgba(0,0,0,0.35)]";

export function ReviewsFeaturedCarousel({ testimonials }: { testimonials: GoogleReview[] }) {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const activeReview = testimonials[activeReviewIndex] ?? null;

  useEffect(() => {
    if (testimonials.length < 2) return;
    const intervalId = window.setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <article className="relative overflow-hidden rounded-3xl bg-zen-crimson p-8 text-white shadow-[0_24px_50px_rgba(18,84,155,0.45)] ring-1 ring-white/15 sm:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 15% 10%, rgba(255,255,255,0.45) 0%, transparent 45%), radial-gradient(ellipse 70% 55% at 85% 90%, rgba(0,0,0,0.2) 0%, transparent 55%)",
        }}
      />
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
              <p className={reviewStarClass} aria-label="5 out of 5 stars">
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

"use client";

import { HcbImage } from "@/components/ui/hcb-image";
import Link from "next/link";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";
import { cn } from "@/lib/utils";
import { whyChooseUs as CLOSING_SHOWCASE_CARDS } from "@/components/home/site-data";
import type { WhyItem } from "@/lib/home-content";
import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import { HomeActionButtons } from "./home-action-buttons";
import { useHomeContent } from "./home-content-context";

const showcaseImage = gpmPick("backyard pickleball basketball dual sport court");

const CARD_LINKS = ["/about", "/contact", "/contact", "/contact"] as const;

const SHOWCASE_TRUST_SIGNALS = [
  { highlight: "24/7", title: "Available" },
  { highlight: "All", title: "Surface Types" },
  { highlight: "ID & AZ", title: "Two Locations" },
] as const;

/** First four “why choose us” items — display order matches the 2×2 card grid. */
function closingShowcaseCards(items: WhyItem[]): WhyItem[] {
  return items.slice(0, 4);
}

export function ClosingShowcaseSection() {
  const { copy } = useHomeContent();
  const cards = closingShowcaseCards(CLOSING_SHOWCASE_CARDS);
  const { ref, animateClass } = useHomeScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-transparent px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
      <div
        ref={ref}
        className={cn("relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 lg:gap-10", animateClass)}
      >
        <div className="home-reveal home-reveal-d1 flex w-full max-w-3xl flex-col items-center gap-5 text-center sm:gap-6">
          <p className="section-eyebrow">{copy.closingShowcaseEyebrow}</p>
          <h2 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-zen-espresso sm:text-5xl md:text-[2.875rem]">
            {copy.closingShowcaseHeading}
          </h2>
          {copy.closingShowcaseBragLine.trim() || copy.closingShowcaseBragSubline.trim() ? (
            <div className="space-y-1">
              {copy.closingShowcaseBragLine.trim() ? (
                <p className="text-sm leading-none text-zen-crimson">{copy.closingShowcaseBragLine}</p>
              ) : null}
              {copy.closingShowcaseBragSubline.trim() ? (
                <p className="text-sm leading-relaxed text-zen-taupe">{copy.closingShowcaseBragSubline}</p>
              ) : null}
            </div>
          ) : null}
          {copy.closingShowcaseBody.trim() ? (
            <p className="max-w-2xl text-base leading-relaxed text-zen-taupe sm:text-lg">
              {copy.closingShowcaseBody}
            </p>
          ) : null}
          <HomeActionButtons centered />
        </div>

        <ul className="home-reveal home-reveal-d2 grid w-full max-w-2xl grid-cols-3 gap-4 sm:gap-8">
          {SHOWCASE_TRUST_SIGNALS.map((signal) => (
            <li key={`${signal.highlight}-${signal.title}`} className="text-center">
              <p className="font-heading text-2xl font-bold leading-none text-zen-crimson sm:text-3xl md:text-4xl">
                {signal.highlight}
              </p>
              <p className="mt-2 text-xs leading-snug text-zen-taupe sm:text-sm">{signal.title}</p>
            </li>
          ))}
        </ul>

        <div className="home-reveal home-reveal-left home-reveal-d3 relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-3xl bg-zen-sand/40 shadow-[0_18px_48px_rgba(21,21,21,0.1)] ring-1 ring-black/5 sm:aspect-[16/10]">
          <HcbImage
            src={showcaseImage}
            alt={gpmImageAlt(showcaseImage)}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 56rem"
          />
        </div>

        <div className="grid w-full max-w-4xl gap-4 md:grid-cols-2 md:auto-rows-fr">
          {cards.map((card, index) => (
            <Link
              key={card.title}
              href={CARD_LINKS[index] ?? "/about"}
              className={cn(
                "home-reveal home-reveal-right group flex flex-col rounded-3xl p-6 no-underline transition sm:p-7",
                index === 0 ? "home-reveal-d4" : index === 1 ? "home-reveal-d5" : index === 2 ? "home-reveal-d6" : "home-reveal-d7",
                index === 0
                  ? "bg-zen-crimson text-white ring-1 ring-zen-crimson hover:bg-zen-crimson-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  : "bg-white text-zen-espresso ring-1 ring-zen-sand/70 hover:ring-zen-crimson/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-crimson",
              )}
            >
              <h3
                className={cn(
                  "font-heading text-lg font-bold sm:text-xl",
                  index === 0 ? "text-white" : "text-zen-espresso",
                )}
              >
                {card.title}
              </h3>
              <p
                className={cn(
                  "mt-3 flex-1 text-sm leading-relaxed sm:text-[0.95rem]",
                  index === 0 ? "text-white/88" : "text-zen-taupe",
                )}
              >
                {card.body}
              </p>
              <span
                className={cn(
                  "mt-5 inline-flex items-center gap-1 text-sm font-semibold transition",
                  index === 0
                    ? "text-white group-hover:text-zen-gold"
                    : "text-zen-crimson group-hover:text-zen-crimson-hover",
                )}
              >
                Read More
                <span aria-hidden="true">&gt;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

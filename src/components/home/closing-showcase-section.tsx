"use client";

import Image from "next/image";
import Link from "next/link";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";
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
      <div ref={ref} className={`relative mx-auto w-full max-w-6xl ${animateClass}`}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="home-reveal home-reveal-d1 max-w-2xl text-center lg:text-left">
            <p className="section-eyebrow">{copy.closingShowcaseEyebrow}</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.08] tracking-tight text-zen-espresso sm:text-4xl md:text-[2.5rem]">
              {copy.closingShowcaseHeading}
            </h2>
            <HomeActionButtons centered />
          </div>

          <ul className="home-reveal home-reveal-d2 grid grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
            {SHOWCASE_TRUST_SIGNALS.map((signal) => (
              <li key={`${signal.highlight}-${signal.title}`} className="text-center lg:text-left">
                <p className="font-heading text-2xl font-bold leading-none text-zen-crimson sm:text-3xl md:text-4xl">
                  {signal.highlight}
                </p>
                <p className="mt-2 text-xs leading-snug text-zen-taupe sm:text-sm">{signal.title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-5 lg:items-stretch">
          <div className="home-reveal home-reveal-left home-reveal-d3 relative min-h-[22rem] overflow-hidden rounded-3xl bg-zen-sand/40 shadow-[0_18px_48px_rgba(21,21,21,0.1)] ring-1 ring-black/5 sm:min-h-[24rem] lg:min-h-0 lg:h-full">
            <Image
              src={showcaseImage}
              alt={gpmImageAlt(showcaseImage)}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:auto-rows-fr">
            {cards.map((card, index) => (
              <Link
                key={card.title}
                href={CARD_LINKS[index] ?? "/about"}
                className={`home-reveal home-reveal-right group flex flex-col rounded-3xl p-6 no-underline transition sm:p-7 ${
                  index === 0
                    ? "home-reveal-d4"
                    : index === 1
                      ? "home-reveal-d5"
                      : index === 2
                        ? "home-reveal-d6"
                        : "home-reveal-d7"
                } ${
                  index === 0
                    ? "bg-zen-crimson text-white ring-1 ring-zen-crimson hover:bg-zen-crimson-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    : "bg-white text-zen-espresso ring-1 ring-zen-sand/70 hover:ring-zen-crimson/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-crimson"
                }`}
              >
                <h3
                  className={`font-heading text-lg font-bold sm:text-xl ${
                    index === 0 ? "text-white" : "text-zen-espresso"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-3 flex-1 text-sm leading-relaxed sm:text-[0.95rem] ${
                    index === 0 ? "text-white/88" : "text-zen-taupe"
                  }`}
                >
                  {card.body}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold transition ${
                    index === 0
                      ? "text-white group-hover:text-zen-gold"
                      : "text-zen-crimson group-hover:text-zen-crimson-hover"
                  }`}
                >
                  Read More
                  <span aria-hidden="true">&gt;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { BlogBookingStrip } from "@/components/blog/blog-article-lead-cta";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { HomeSectionGridDecor } from "@/components/home/home-section-grid-decor";
import { useEffect, useRef, useState } from "react";
import type { FaqPageContent } from "@/lib/faq-page-content";
import type { SocialLink } from "@/lib/home-content";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { SiteFooterRegion } from "@/components/layout/site-footer-region";
import { SiteHeader } from "@/components/layout/site-header";
import { BUSINESS } from "@/lib/business";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";

const FAQ_HERO_IMAGE = gpmPick("backyard gray basketball court installation");

export function FaqPage({
  socialLinks,
  content,
}: {
  socialLinks: SocialLink[];
  content: FaqPageContent;
}) {
  const firstId = content.categories[0]?.id ?? "property-owners";
  const [activeCategoryId, setActiveCategoryId] = useState(firstId);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [faqRevealed, setFaqRevealed] = useState(false);

  const activeCategory = content.categories.find((c) => c.id === activeCategoryId) ?? content.categories[0];
  const visibleFaqs = activeCategory?.faqs ?? [];

  useEffect(() => {
    setActiveIndex(null);
  }, [activeCategoryId]);

  useEffect(() => {
    if (faqRevealed) return;
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      queueMicrotask(() => setFaqRevealed(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setFaqRevealed(true);
        observer.disconnect();
      },
      { root: null, threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [faqRevealed]);

  const segmentCount = Math.max(1, content.categories.length);
  const selectedSegmentIndex = Math.max(
    0,
    content.categories.findIndex((c) => c.id === activeCategoryId),
  );

  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <header className="relative z-[200] isolate min-h-0 overflow-x-clip bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
        <SiteHeader anchorBase="/" />
      </header>

      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <SiteBreadcrumbs />
        <BlogHeroBand imageSrc={FAQ_HERO_IMAGE} imageAlt={gpmImageAlt(FAQ_HERO_IMAGE)}>
          <div className="min-w-0 w-full max-w-3xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              FAQ
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/90 md:text-base">
              {content.heroSubheading}
            </p>
            <PageHeroCtaButtons />
          </div>
        </BlogHeroBand>

        <section
          ref={sectionRef}
          className={`section-pad relative overflow-hidden bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso faq-scroll-animate ${
            faqRevealed ? "faq-revealed" : ""
          }`}
        >
          <HomeSectionGridDecor placement="faq-panel-left" />
          <div className="shell relative z-10">
            <div className="mx-auto w-full max-w-3xl space-y-5 px-3 sm:px-4">
              <div
                role="tablist"
                aria-label="FAQ categories"
                className="faq-item-reveal relative rounded-full border border-white/25 bg-white/[0.22] p-1 shadow-inner light:border-slate-100 light:bg-slate-100 light:shadow-none"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-1 top-1 rounded-full bg-zen-crimson shadow-[0_2px_10px_rgba(18,84,155,0.35)] transition-[left,width] duration-300 ease-out motion-reduce:transition-none light:shadow-[0_2px_10px_rgba(18,84,155,0.2)]"
                  style={{
                    width: `calc((100% - 8px) / ${segmentCount})`,
                    left: `calc(4px + ${selectedSegmentIndex} * (100% - 8px) / ${segmentCount})`,
                  }}
                />
                <div className="relative z-10 flex w-full">
                  {content.categories.map((cat) => {
                    const selected = cat.id === activeCategoryId;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        aria-controls={`faq-panel-${cat.id}`}
                        id={`faq-tab-${cat.id}`}
                        tabIndex={selected ? 0 : -1}
                        className={`font-heading min-h-[2.75rem] flex-1 rounded-full px-2 py-2.5 text-center text-xs font-semibold leading-snug transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-sage sm:min-h-0 sm:px-3 sm:text-sm ${
                          selected
                            ? "!text-white light:!text-white"
                            : "text-white/75 hover:text-white light:text-zen-taupe light:hover:text-zen-espresso"
                        }`}
                        onClick={() => setActiveCategoryId(cat.id)}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                id={`faq-panel-${activeCategoryId}`}
                role="tabpanel"
                aria-labelledby={`faq-tab-${activeCategoryId}`}
                className="space-y-3"
              >
                {visibleFaqs.map((faq, index) => {
                  const open = index === activeIndex;
                  const uid = `${activeCategoryId}-${index}`;
                  return (
                    <article
                      key={uid}
                      data-faq-open={open ? "true" : "false"}
                      className={`faq-item-reveal rounded-2xl border p-5 transition duration-500 ease-out motion-reduce:transition-none ${
                        open
                          ? "border-zen-crimson bg-zen-crimson ring-1 ring-white/20 light:border-zen-crimson light:bg-zen-crimson"
                          : "hero-glass-light border border-white/25 bg-white/15 backdrop-blur-xl light:shadow-none"
                      }`}
                    >
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-4 text-left"
                        onClick={() => setActiveIndex(open ? null : index)}
                        aria-expanded={open}
                        aria-controls={`faq-page-answer-${uid}`}
                        id={`faq-page-question-${uid}`}
                      >
                        <span
                          className={`min-w-0 flex-1 break-words font-heading text-base font-semibold sm:text-lg ${
                            open ? "!text-white light:!text-white" : "text-white light:text-zen-espresso"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <span
                          className={`faq-chevron shrink-0 text-2xl ${open ? "!text-white light:!text-white" : "text-white/70 light:text-zen-taupe"}`}
                          aria-hidden="true"
                        >
                          {open ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        id={`faq-page-answer-${uid}`}
                        role="region"
                        aria-labelledby={`faq-page-question-${uid}`}
                        aria-hidden={!open}
                        className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none motion-reduce:duration-0"
                        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p
                            className={`faq-answer mt-3 whitespace-pre-line text-sm leading-7 ${
                              open ? "!text-white light:!text-white" : "text-white/95 light:text-zen-taupe faq-answer-collapsed"
                            }`}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <BlogBookingStrip />
      </main>

      <SiteFooterRegion socialLinks={socialLinks} />
    </div>
  );
}

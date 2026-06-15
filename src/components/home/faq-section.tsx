"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BUSINESS } from "@/lib/business";
import type { Faq } from "@/lib/home-content";
import { HOME_FAQ_CATEGORIES } from "@/lib/home-faq-section-data";
import { highlightTextPhrase } from "@/lib/highlight-text";
import { HomeActionButtons } from "./home-action-buttons";
import { useHomeContent } from "./home-content-context";

type FaqEntry = {
  key: string;
  faq: Faq;
};

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FaqAccordionItem({
  entry,
  open,
  onToggle,
}: {
  entry: FaqEntry;
  open: boolean;
  onToggle: () => void;
}) {
  const { key, faq } = entry;

  return (
    <article
      data-faq-open={open ? "true" : "false"}
      className={`faq-item-reveal group rounded-2xl border p-4 shadow-sm transition-[background-color,border-color,box-shadow,color] duration-200 sm:p-5 ${
        open
          ? "border-zen-crimson bg-zen-crimson text-white shadow-md"
          : "border-zen-sand/90 bg-white/95 hover:border-zen-crimson hover:bg-zen-crimson hover:text-white hover:shadow-md"
      }`}
    >
      <button
        type="button"
        className="flex w-full items-start justify-between gap-4 text-left"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-answer-${key}`}
        id={`faq-question-${key}`}
      >
        <span className="min-w-0 flex-1 break-words font-heading text-base font-semibold leading-snug text-zen-espresso group-hover:text-white group-data-[faq-open=true]:text-white sm:text-lg">
          {faq.question}
        </span>
        <span
          className={`faq-chevron mt-0.5 shrink-0 text-zen-taupe transition-transform duration-200 group-hover:text-white group-data-[faq-open=true]:rotate-180 group-data-[faq-open=true]:text-white`}
          aria-hidden
        >
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>
      <div
        id={`faq-answer-${key}`}
        role="region"
        aria-labelledby={`faq-question-${key}`}
        aria-hidden={!open}
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <p
            className={`faq-answer mt-3 text-sm leading-relaxed text-zen-taupe group-hover:text-white/95 group-data-[faq-open=true]:text-white/95 sm:text-[0.95rem] sm:leading-7 ${
              open ? "" : "faq-answer-collapsed"
            }`}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </article>
  );
}

export function FaqSection() {
  const { copy } = useHomeContent();
  const [openFaqKey, setOpenFaqKey] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [faqRevealed, setFaqRevealed] = useState(false);

  const { leftFaqs, rightFaqs } = useMemo(() => {
    const allFaqs: FaqEntry[] = HOME_FAQ_CATEGORIES.flatMap((category) =>
      category.faqs.map((faq, index) => ({
        key: `${category.id}-${index}`,
        faq,
      })),
    );
    const midpoint = Math.ceil(allFaqs.length / 2);

    return {
      leftFaqs: allFaqs.slice(0, midpoint),
      rightFaqs: allFaqs.slice(midpoint),
    };
  }, []);

  const stillHaveQuestionsCta = (
    <div className="w-full rounded-2xl bg-zen-espresso px-5 py-6 text-center text-white shadow-lg ring-1 ring-black/10 sm:px-8 sm:py-8">
      <p className="font-heading text-lg font-semibold">Still have questions?</p>
      <p className="mt-2 text-sm leading-relaxed text-white/85">
        Call {BUSINESS.phoneDisplay} or contact {BUSINESS.nameShort} to talk with a court builder about your
        project.
      </p>
      <a className="btn-call mx-auto mt-5" href={BUSINESS.phoneTel}>
        {copy.ctaCallVerb} {BUSINESS.phoneDisplay}
      </a>
    </div>
  );

  useEffect(() => {
    if (faqRevealed) return;
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setFaqRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setFaqRevealed(true);
        observer.disconnect();
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [faqRevealed]);

  const renderColumn = (entries: FaqEntry[]) => (
    <div className="faq-accordion-stack min-w-0 space-y-3 sm:space-y-4">
      {entries.map((entry) => (
        <FaqAccordionItem
          key={entry.key}
          entry={entry}
          open={openFaqKey === entry.key}
          onToggle={() => setOpenFaqKey(openFaqKey === entry.key ? null : entry.key)}
        />
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className={`home-section-viewport section-pad relative overflow-hidden bg-zen-rice text-zen-espresso faq-scroll-animate lg:py-28 xl:py-32 ${
        faqRevealed ? "faq-revealed" : ""
      }`}
      aria-labelledby="faq-heading"
    >
      <div className="shell relative z-10">
        <div className="faq-intro-reveal flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-3xl text-left">
            <p className="section-eyebrow">FAQs</p>
            <h2
              id="faq-heading"
              className="mt-3 font-heading text-4xl font-bold leading-tight tracking-tight text-zen-espresso md:text-5xl lg:text-[3rem]"
            >
              {highlightTextPhrase(copy.faqHeadingLine1, "Trusted Court Builder")}
              {copy.faqHeadingLine2.trim() ? (
                <>
                  {" "}
                  <span className="text-zen-crimson">{copy.faqHeadingLine2}</span>
                </>
              ) : null}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-zen-taupe sm:mt-4 sm:text-lg max-lg:mb-0">
              {copy.faqSubtext}
            </p>
          </div>
          <HomeActionButtons centered stacked className="mt-0 shrink-0 self-start lg:self-center" />
        </div>

        <div
          id="faq-accordion-panel"
          className="mx-auto mt-12 grid max-w-6xl gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-2 lg:gap-x-6 xl:max-w-7xl"
        >
          {renderColumn(leftFaqs)}
          {renderColumn(rightFaqs)}
        </div>

        <div className="faq-sidebar-reveal mx-auto mt-10 max-w-6xl xl:max-w-7xl">{stillHaveQuestionsCta}</div>
      </div>
    </section>
  );
}

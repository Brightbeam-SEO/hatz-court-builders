"use client";

import { useEffect, useRef, useState } from "react";
import { HomeSectionGridDecor } from "@/components/home/home-section-grid-decor";
import { BUSINESS } from "@/lib/business";
import { HOME_FAQ_CATEGORIES, type HomeFaqCategory } from "@/lib/home-faq-section-data";
import { useHomeContent } from "./home-content-context";

function IconOwner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M4 21V10.5L12 4l8 6.5V21" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconResident({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20.5v-1c0-2 2.5-3.5 6.5-3.5s6.5 1.5 6.5 3.5v1" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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

function categoryIcon(cat: HomeFaqCategory) {
  if (cat.id === "owner") return IconOwner;
  return IconResident;
}

export function FaqSection() {
  const { copy } = useHomeContent();
  const [activeCategoryId, setActiveCategoryId] = useState<HomeFaqCategory["id"]>("owner");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [faqRevealed, setFaqRevealed] = useState(false);

  const activeCategory = HOME_FAQ_CATEGORIES.find((c) => c.id === activeCategoryId) ?? HOME_FAQ_CATEGORIES[0];
  const activeFaqs = activeCategory.faqs;

  const stillHaveQuestionsCta = (
    <div className="rounded-2xl bg-zen-espresso px-5 py-6 text-center text-white shadow-lg ring-1 ring-black/10 lg:text-left">
      <p className="font-heading text-lg font-semibold">Still have questions?</p>
      <p className="mt-2 text-sm leading-relaxed text-white/85">
        Call {BUSINESS.phoneDisplay} or reach out—we respond to owners and residents directly.
      </p>
      <a className="btn-call mx-auto mt-5 lg:mx-0" href={BUSINESS.phoneTel}>
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
      { root: null, threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [faqRevealed]);

  return (
    <section
      ref={sectionRef}
      className={`home-section-viewport section-pad relative overflow-hidden bg-zen-rice text-zen-espresso faq-scroll-animate ${
        faqRevealed ? "faq-revealed" : ""
      }`}
      aria-labelledby="faq-heading"
    >
      <HomeSectionGridDecor placement="top-right" />
      <div className="shell relative z-10">
        <div className="faq-intro-reveal mx-auto max-w-3xl px-2 text-center sm:px-0">
          <h2
            id="faq-heading"
            className="font-heading text-3xl font-bold leading-tight tracking-tight text-zen-espresso md:text-4xl lg:text-[2.5rem]"
          >
            {copy.faqHeadingLine1}{" "}
            <span className="text-zen-crimson">{copy.faqHeadingLine2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zen-taupe sm:text-lg">
            {copy.faqSubtext}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-10 lg:mt-16 lg:grid-cols-[minmax(0,17.5rem)_1fr] lg:items-start lg:gap-12 xl:max-w-7xl">
          <aside className="faq-sidebar-reveal space-y-6 lg:sticky lg:top-28">
            <div>
              <p className="section-eyebrow">Browse by category</p>
              <ul className="mt-4 space-y-3">
                {HOME_FAQ_CATEGORIES.map((cat) => {
                  const Icon = categoryIcon(cat);
                  const selected = cat.id === activeCategoryId;
                  const count = cat.faqs.length;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCategoryId(cat.id);
                          setOpenIndex(null);
                        }}
                        className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3.5 text-left transition ${
                          selected
                            ? "border-zen-crimson/50 bg-zen-crimson/12 shadow-sm ring-1 ring-zen-crimson/25"
                            : "border-zen-sand/90 bg-white/90 shadow-sm hover:border-zen-crimson/35 hover:bg-zen-crimson/5"
                        }`}
                        aria-pressed={selected}
                        aria-controls="faq-accordion-panel"
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            selected ? "bg-zen-crimson text-white" : "bg-zen-crimson/12 text-zen-crimson"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-heading text-sm font-bold text-zen-espresso">{cat.label}</span>
                          <span className="mt-0.5 block text-xs text-zen-taupe">
                            {count} {count === 1 ? "question" : "questions"}
                          </span>
                        </span>
                        <ChevronRight
                          className={`h-5 w-5 shrink-0 text-zen-taupe ${selected ? "text-zen-crimson" : ""}`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="hidden lg:block">{stillHaveQuestionsCta}</div>
          </aside>

          <div id="faq-accordion-panel" className="min-w-0">
            <p
              className="section-eyebrow pointer-events-none hidden select-none lg:block lg:invisible"
              aria-hidden="true"
            >
              Browse by category
            </p>
            <div className="faq-accordion-stack space-y-3 sm:space-y-4 lg:mt-4">
              {activeFaqs.map((faq, index) => {
                const open = index === openIndex;
                return (
                  <article
                    key={`${activeCategory.id}-${faq.question}`}
                    data-faq-open={open ? "true" : "false"}
                    className={`faq-item-reveal rounded-2xl border bg-white/95 p-4 shadow-sm transition-[border-color,box-shadow] duration-200 sm:p-5 ${
                      open
                        ? "border-zen-crimson shadow-md ring-2 ring-zen-crimson/30"
                        : "border-zen-sand/90 hover:border-zen-crimson/40 hover:shadow-md"
                    }`}
                  >
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-4 text-left"
                      onClick={() => setOpenIndex(open ? null : index)}
                      aria-expanded={open}
                      aria-controls={`faq-answer-${activeCategory.id}-${index}`}
                      id={`faq-question-${activeCategory.id}-${index}`}
                    >
                      <span className="min-w-0 flex-1 break-words font-heading text-base font-semibold leading-snug text-zen-espresso sm:text-lg">
                        {faq.question}
                      </span>
                      <span
                        className={`faq-chevron mt-0.5 shrink-0 text-zen-taupe transition-transform duration-200 ${
                          open ? "rotate-180 text-zen-crimson" : ""
                        }`}
                        aria-hidden
                      >
                        <ChevronDown className="h-5 w-5" />
                      </span>
                    </button>
                    <div
                      id={`faq-answer-${activeCategory.id}-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${activeCategory.id}-${index}`}
                      aria-hidden={!open}
                      className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p
                          className={`faq-answer mt-3 text-sm leading-relaxed text-zen-taupe sm:text-[0.95rem] sm:leading-7 ${
                            open ? "" : "faq-answer-collapsed"
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

            <div className="faq-sidebar-reveal mt-8 lg:hidden">{stillHaveQuestionsCta}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

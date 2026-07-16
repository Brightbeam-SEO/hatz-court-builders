"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { StructuredData } from "@/components/seo/structured-data";
import { buildFaqPageSchema } from "@/lib/local-business-schema";
import { normalizeSitePath } from "@/lib/site-url";

/** Service landing FAQs — accordion matches home `FaqSection`; intro is left-aligned, no gradient title. */
export function PressureWashingBoiseFaq({
  className = "",
  heading = "Frequently Asked Questions",
  intro = "Straight answers—call if yours isn't listed.",
  items,
  idPrefix = "landing-faq",
}: {
  className?: string;
  heading?: string;
  intro?: string;
  items?: readonly { question: string; answer: string }[];
  /** Prefix for accordion button/region ids (must be unique per page). */
  idPrefix?: string;
}) {
  const faqItems = items ?? [];
  const pathname = usePathname() ?? "/";
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const faqSchema =
    faqItems.length > 0 ? buildFaqPageSchema(normalizeSitePath(pathname), faqItems) : null;

  useEffect(() => {
    if (revealed) return;
    const el = rootRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      queueMicrotask(() => setRevealed(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { root: null, threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  if (faqItems.length === 0) return null;

  return (
    <div
      ref={rootRef}
      className={`faq-scroll-animate ${revealed ? "faq-revealed" : ""} ${className}`.trim()}
    >
      {faqSchema ? <StructuredData data={faqSchema} /> : null}
      <div className="faq-intro-reveal w-full max-w-3xl text-left">
        <h2 className="font-heading scroll-mt-28 text-2xl font-bold text-white light:text-zen-espresso md:text-3xl">
          {heading}
        </h2>
        <p className="mt-3 text-base text-white/85 light:text-zen-taupe">{intro}</p>
      </div>

      <div className="mt-8 w-full max-w-3xl space-y-3">
        {faqItems.map((faq, index) => {
          const open = index === activeIndex;
          return (
            <article
              key={faq.question}
              data-faq-open={open ? "true" : "false"}
              className={`landing-faq-item faq-item-reveal rounded-2xl border p-5 transition duration-500 ease-out motion-reduce:transition-none ${
                open
                  ? "border-zen-crimson bg-zen-crimson ring-1 ring-zen-crimson/40"
                  : "border-zen-crimson/35 bg-transparent light:border-zen-crimson/40 light:bg-white"
              }`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setActiveIndex(open ? null : index)}
                aria-expanded={open}
                aria-controls={`${idPrefix}-answer-${index}`}
                id={`${idPrefix}-question-${index}`}
              >
                <span
                  className={`min-w-0 flex-1 break-words font-heading text-base font-semibold sm:text-lg ${
                    open ? "text-white" : "text-white light:text-zen-espresso"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`faq-chevron text-2xl ${open ? "text-white" : "text-white/70 light:text-zen-taupe"}`}
                  aria-hidden
                >
                  {open ? "−" : "+"}
                </span>
              </button>
              <div
                id={`${idPrefix}-answer-${index}`}
                role="region"
                aria-labelledby={`${idPrefix}-question-${index}`}
                aria-hidden={!open}
                className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none motion-reduce:duration-0"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="min-h-0 overflow-hidden">
                  <p
                    className={`faq-answer mt-3 text-sm leading-7${open ? " text-white/95" : " text-white/85 faq-answer-collapsed light:text-zen-taupe"}`}
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
  );
}

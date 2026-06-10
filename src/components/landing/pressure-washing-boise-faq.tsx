"use client";

import { useEffect, useRef, useState } from "react";

const defaultSpaFaqItems = [
  {
    question: "Do you accept walk-ins for massage in Eagle?",
    answer:
      "Yes—walk-ins are welcome when we have availability. Calling ahead is the best way to secure your preferred time, especially on weekends and evenings.",
  },
  {
    question: "What types of massage do you offer?",
    answer:
      "We offer foot massage, reflexology, scalp treatments, Swedish and deep tissue massage, Thai massage, couples massage, pregnancy massage, and more in our Eagle studio.",
  },
  {
    question: "How long are massage sessions?",
    answer:
      "Session lengths vary by service—common options include 30, 60, and 90 minutes. See our pricing page for current rates and durations.",
  },
  {
    question: "Is reflexology different from a foot massage?",
    answer:
      "Foot massage focuses on relaxing muscles and improving circulation in the feet. Reflexology applies targeted pressure to reflex points believed to support overall wellness.",
  },
  {
    question: "Where is Zen Day Spa located?",
    answer:
      "We are at 3210 W Chinden Blvd #114, Eagle, ID 83616—serving Eagle, Boise, Meridian, and the Treasure Valley.",
  },
] as const;

/** Service landing FAQs — accordion matches home `FaqSection`; intro is left-aligned, no gradient title. */
export function PressureWashingBoiseFaq({
  className = "",
  heading = "Frequently Asked Questions About Zen Day Spa",
  intro = "Straight answers—call if yours isn't listed.",
  items,
  idPrefix = "spa-landing-faq",
}: {
  className?: string;
  heading?: string;
  intro?: string;
  items?: readonly { question: string; answer: string }[];
  /** Prefix for accordion button/region ids (must be unique per page). */
  idPrefix?: string;
}) {
  const faqItems = items ?? defaultSpaFaqItems;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

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

  return (
    <div
      ref={rootRef}
      className={`faq-scroll-animate ${revealed ? "faq-revealed" : ""} ${className}`.trim()}
    >
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

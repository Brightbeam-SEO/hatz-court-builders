from pathlib import Path

content = '''"use client";

import { useEffect, useRef, useState } from "react";
import { BoiseContactTestimonialsMarquee } from "@/components/landing/boise-contact-testimonials-marquee";
import type { GoogleReview } from "@/lib/home-content";

export function BoiseLandingTestimonialsSection({
  testimonials = [],
  sectionId = "landing-testimonials",
  heading = "What Our Guests Say",
  subtext = "Real reviews from guests who visit Zen Day Spa in Eagle—the same stories on our reviews page.",
}: {
  testimonials?: GoogleReview[] | null;
  sectionId?: string;
  heading?: string;
  subtext?: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const el = sectionRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      queueMicrotask(() => setRevealed(true));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`section-pad bg-transparent text-white light:bg-transparent light:text-zen-espresso contact-scroll-animate ${revealed ? "contact-revealed" : ""}`}
    >
      <motionless />
    </section>
  );
}
'''

inner = """      <div className=\"mx-auto w-full max-w-[95vw] sm:max-w-[min(80vw,100%)] px-2 sm:px-3 md:px-4\">
        <div className=\"grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12\">
          <div className=\"contact-heading-reveal text-left\">
            <h2 className=\"font-heading text-3xl font-bold leading-tight text-white light:text-zen-espresso md:text-4xl\">
              {heading}
            </h2>
            <p className=\"mt-4 max-w-xl text-base leading-relaxed text-white/85 light:text-zen-taupe sm:text-lg\">
              {subtext}
            </p>
          </div>
          <motionless />
            <BoiseContactTestimonialsMarquee
              testimonials={testimonials}
              cardVariant=\"crimson\"
              cardLayout=\"centered\"
            />
          </motionless>
        </motionless>
      </motionless>"""

inner = inner.replace("<motionless />", '<div className="relative flex min-h-[20rem] w-full min-w-0 flex-col lg:min-h-[24rem] lg:max-h-[min(36rem,85vh)]">')
inner = inner.replace("</motionless>", "</div>", 2)

content = content.replace("      <motionless />\n    </section>", inner + "\n    </section>")

Path(__file__).resolve().parents[1].joinpath(
    "src/components/landing/boise-landing-testimonials-section.tsx"
).write_text(content, encoding="utf-8")
print("ok")

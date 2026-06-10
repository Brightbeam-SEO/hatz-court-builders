from pathlib import Path

out = Path(__file__).resolve().parents[1] / "src/components/contact/centered-contact-section.tsx"
out.write_text(
    '''"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/home/contact-form";

export function CenteredContactSection({
  heading,
  subtext,
  formWrapperId,
  formName,
  submitLabel = "Submit",
  sectionId,
  theme = "light",
}: {
  heading: string;
  subtext: string;
  formWrapperId: string;
  formName: string;
  submitLabel?: string;
  sectionId?: string;
  theme?: "light" | "dark";
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const onDark = theme === "dark";

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
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  const headingClass = onDark
    ? "relative z-10 mx-auto max-w-2xl font-heading text-3xl font-bold text-white light:text-zen-espresso md:text-4xl"
    : "relative z-10 mx-auto max-w-2xl font-heading text-3xl font-bold text-zen-espresso md:text-4xl";

  const subtextClass = onDark
    ? "mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/85 light:text-zen-taupe sm:text-lg"
    : "mx-auto mt-4 max-w-3xl text-base leading-relaxed text-zen-taupe sm:text-lg";

  const sectionClass = onDark
    ? "section-pad bg-transparent text-white light:bg-transparent light:text-zen-espresso contact-scroll-animate"
    : "section-pad bg-transparent text-zen-espresso contact-scroll-animate";

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`${sectionClass} ${revealed ? "contact-revealed" : ""}`}
    >
      <div className="shell text-center">
        <motionless />
      </motionless>
    </section>
  );
}
'''.replace("<motionless />", '<motionless />').replace("<motionless />", '<motionless />'),
    encoding="utf-8",
)
# fix manually below
text = out.read_text(encoding="utf-8")
inner = """      <div className="shell text-center">
        <div className="mx-auto w-full max-w-5xl">
          <motionless />
        </motionless>
      </motionless>"""
inner = inner.replace("motionless", "motionless")
inner = """      <div className="shell text-center">
        <div className="mx-auto w-full max-w-5xl">
          <div className="contact-heading-reveal mx-auto max-w-2xl text-center">
            <div className="relative">
              <div
                className="pointer-events-none -mx-1 mb-[-0.35rem] flex justify-center sm:-mx-2 sm:mb-[-0.5rem]"
                aria-hidden
              >
                <Image
                  src="/images/contact/contact-us-brush-stroke.svg"
                  alt=""
                  width={938}
                  height={450}
                  sizes="(max-width: 640px) 100vw, 28rem"
                  className="h-[4.5rem] w-auto max-w-[min(100%,30rem)] object-contain object-bottom opacity-95 sm:h-[5.25rem] md:h-24"
                />
              </div>
              <h2 className={headingClass}>{heading}</h2>
            </div>
            <p className={subtextClass}>{subtext}</p>
          </div>

          <div
            id={formWrapperId}
            className="contact-form-reveal mx-auto mt-10 scroll-mt-28 w-full max-w-2xl rounded-3xl border border-white/25 bg-zen-crimson p-8 text-left shadow-[0_24px_55px_rgba(28,13,13,0.35)] ring-1 ring-white/20 backdrop-blur-sm sm:p-10 md:max-w-3xl md:p-12"
          >
            <ContactForm
              variant="dark"
              layout="compact-stack"
              formName={formName}
              submitLabel={submitLabel}
            />
          </div>
        </div>
      </div>"""
text = text.split('      <div className="shell text-center">')[0] + inner + "\n    </section>\n  );\n}\n"
out.write_text(text, encoding="utf-8")
print("ok")

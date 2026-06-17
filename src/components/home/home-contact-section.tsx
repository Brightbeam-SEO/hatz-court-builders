"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/home/contact-form";
import { useHomeContent } from "@/components/home/home-content-context";
import { HOME_FOOTER_CONTACT_FORM_ID } from "@/lib/home-anchors";
import { highlightTextPhrase } from "@/lib/highlight-text";

const ContactSportBallsGravitySection = dynamic(
  () =>
    import("@/components/home/contact-sport-balls-gravity-section").then(
      (mod) => mod.ContactSportBallsGravitySection,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-full min-h-[inherit] w-full animate-pulse bg-zen-rice" />
    ),
  },
);
type HomeContactSectionProps = {
  formName?: string;
  className?: string;
  sectionId?: string;
  formWrapperId?: string;
  /** `home` = dark form on homepage only; `landing` = green form on city/service pages. */
  variant?: "home" | "landing";
};

export function HomeContactSection({
  formName = "Homepage contact section",
  className = "",
  sectionId = "contact",
  formWrapperId = HOME_FOOTER_CONTACT_FORM_ID,
  variant = "home",
}: HomeContactSectionProps) {
  const isLandingForm = variant === "landing";
  const formWrapperClass = isLandingForm
    ? "contact-form-reveal scroll-mt-28 rounded-3xl border border-zen-crimson/30 bg-zen-crimson p-6 text-left shadow-[0_24px_55px_rgba(18,84,155,0.28)] ring-1 ring-zen-crimson/25 backdrop-blur-sm sm:p-8 lg:p-10"
    : "contact-form-reveal scroll-mt-28 rounded-3xl border border-white/15 bg-zen-espresso p-6 text-left shadow-[0_24px_55px_rgba(21,21,21,0.45)] ring-1 ring-white/10 backdrop-blur-sm sm:p-8 lg:p-10";
  const { copy } = useHomeContent();
  const contactSectionRef = useRef<HTMLElement | null>(null);
  const [contactRevealed, setContactRevealed] = useState(false);

  useEffect(() => {
    if (contactRevealed) return;
    const el = contactSectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setContactRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setContactRevealed(true);
        observer.disconnect();
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [contactRevealed]);

  return (
    <section
      ref={contactSectionRef}
      id={sectionId}
      className={`relative overflow-hidden bg-zen-rice pb-0 text-zen-espresso contact-scroll-animate ${
        contactRevealed ? "contact-revealed" : ""
      } ${className}`.trim()}
    >
      <div className="pt-24 md:pt-32">
        <div className="shell relative z-10">
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 xl:max-w-3xl">
            <div className="contact-heading-reveal text-center">
              <p className="section-eyebrow">{copy.contactEyebrow}</p>
              <h2 className="mx-auto mt-3 max-w-xl font-heading text-4xl font-bold leading-[1.08] tracking-tight text-zen-espresso sm:text-5xl lg:text-[3.25rem]">
                {highlightTextPhrase(copy.contactHeading, "Top Rated Court Builders")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zen-taupe sm:text-lg">
                {copy.contactSubtext}
              </p>
            </div>

            <div id={formWrapperId} className={`relative z-20 ${formWrapperClass}`}>
              <ContactForm
                variant="dark"
                layout="compact-stack"
                formName={formName}
                submitLabel={copy.contactFormSubmitLabel}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="contact-photo-reveal relative z-0 h-[min(20rem,56vw)] w-full sm:h-[min(24rem,48vw)] lg:-mt-[12.5rem] lg:h-[min(30rem,40vw)]">
        <ContactSportBallsGravitySection className="h-full w-full" />
      </div>
    </section>
  );
}

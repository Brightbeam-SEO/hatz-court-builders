"use client";

import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/home/contact-form";
import { HomeSectionGridDecor } from "@/components/home/home-section-grid-decor";
import { useHomeContent } from "@/components/home/home-content-context";
import { BUSINESS } from "@/lib/business";
import { HOME_FOOTER_CONTACT_FORM_ID } from "@/lib/home-anchors";

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
    ? "contact-form-reveal scroll-mt-28 rounded-3xl border border-zen-crimson/30 bg-zen-crimson p-8 text-left shadow-[0_24px_55px_rgba(18,84,155,0.28)] ring-1 ring-zen-crimson/25 backdrop-blur-sm sm:p-10"
    : "contact-form-reveal scroll-mt-28 rounded-3xl border border-white/15 bg-zen-espresso p-8 text-left shadow-[0_24px_55px_rgba(21,21,21,0.45)] ring-1 ring-white/10 backdrop-blur-sm sm:p-10";
  const { copy } = useHomeContent();
  const contactSectionRef = useRef<HTMLElement | null>(null);
  const [contactRevealed, setContactRevealed] = useState(false);

  useEffect(() => {
    if (contactRevealed) return;
    const el = contactSectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      queueMicrotask(() => setContactRevealed(true));
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
      className={`home-section-viewport relative overflow-hidden section-pad bg-zen-rice text-zen-espresso contact-scroll-animate ${
        contactRevealed ? "contact-revealed" : ""
      } ${className}`.trim()}
    >
      <HomeSectionGridDecor placement="bottom-left" />
      <div className="shell relative z-10">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,0.9fr)] lg:gap-10 xl:max-w-7xl xl:gap-14">
          <div className="contact-heading-reveal text-center lg:pt-3 lg:text-left">
            <p className="section-eyebrow">Contact us</p>
            <h2 className="mx-auto mt-3 max-w-md font-heading text-[1.875rem] leading-[1.1] tracking-[-0.015em] text-zen-espresso sm:text-4xl md:text-[2.5rem] lg:mx-0">
              Speak With a Meridian{" "}
              <span className="text-zen-crimson">Property Management Expert</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-zen-taupe sm:text-lg lg:mx-0">
              Contact {BUSINESS.nameShort} to schedule a free consultation or learn more about custom court
              construction, resurfacing, and design-build projects in Idaho and Arizona.
            </p>
          </div>

          <div id={formWrapperId} className={formWrapperClass}>
            <p className="mb-5 text-center font-heading text-xl font-semibold text-white">
              Request Your Court Estimate
            </p>
            <ContactForm
              variant="dark"
              layout="compact-stack"
              formName={formName}
              submitLabel={copy.contactFormSubmitLabel}
            />
          </div>

          <div className="contact-heading-reveal space-y-8 text-center lg:flex lg:h-full lg:flex-col lg:justify-end lg:pt-3 lg:text-left">
            <div>
              <h3 className="text-2xl text-zen-espresso">Connect</h3>
              <p className="mt-2 text-base leading-relaxed text-zen-taupe">Speak directly with our local team.</p>
              <a
                href={BUSINESS.emailMailto}
                className="mt-2 inline-block text-base leading-relaxed text-zen-taupe hover:text-zen-crimson"
              >
                {BUSINESS.email}
              </a>
            </div>

            <div>
              <h3 className="text-2xl text-zen-espresso">Office</h3>
              <p className="mt-2 text-base leading-relaxed text-zen-taupe">{BUSINESS.address}</p>
            </div>

            <div>
              <h3 className="text-2xl text-zen-espresso">Call Us</h3>
              <p className="mt-2 text-base leading-relaxed text-zen-taupe">{BUSINESS.hoursShort}</p>
              <a
                href={BUSINESS.phoneTel}
                className="mt-2 inline-block text-base leading-relaxed text-zen-taupe hover:text-zen-crimson"
              >
                {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

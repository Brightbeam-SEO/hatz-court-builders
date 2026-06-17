"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SocialLink } from "@/lib/home-content";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { ContactForm } from "@/components/home/contact-form";
import { useHomeContent } from "@/components/home/home-content-context";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { SiteFooterRegion } from "@/components/layout/site-footer-region";
import { BUSINESS } from "@/lib/business";
import { HOME_FOOTER_CONTACT_FORM_ID } from "@/lib/home-anchors";
import { zenImageAlt } from "@/lib/zen-gallery-images";
import { zenPick } from "@/lib/zen-pick-gallery";
import { PricingServiceGrid } from "./pricing-service-grid";
import { pricingPageCopy } from "./site-data";

const PRICING_HERO_IMAGE = zenPick("spa treatment beds relaxation room");

function PricingContactSection() {
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
      id="contact"
      className={`section-pad bg-transparent text-zen-espresso contact-scroll-animate ${
        contactRevealed ? "contact-revealed" : ""
      }`}
    >
      <div className="shell text-center">
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
              <h2 className="relative z-10 mx-auto max-w-2xl font-heading text-3xl font-bold text-zen-espresso md:text-4xl">
                {copy.contactHeading}
              </h2>
            </div>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-zen-taupe sm:text-lg">
              {copy.contactSubtext}
            </p>
          </div>

          <div
            id={HOME_FOOTER_CONTACT_FORM_ID}
            className="contact-form-reveal mx-auto mt-10 scroll-mt-28 w-full max-w-2xl rounded-3xl border border-white/25 bg-zen-crimson p-8 text-left shadow-[0_24px_55px_rgba(21, 21, 21,0.35)] ring-1 ring-white/20 backdrop-blur-sm sm:p-10 md:max-w-3xl md:p-12"
          >
            <ContactForm
              variant="dark"
              layout="compact-stack"
              formName="Pricing page contact"
              submitLabel={copy.contactFormSubmitLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


export function PricingPage({ socialLinks }: { socialLinks: SocialLink[] }) {
  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <BlogHeroBand imageSrc={PRICING_HERO_IMAGE} imageAlt={zenImageAlt(PRICING_HERO_IMAGE)}>
          <div className="min-w-0 w-full max-w-3xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Pricing
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/90 md:text-base">
              {pricingPageCopy.heroSubheading}
            </p>
            <PageHeroCtaButtons />
          </div>
        </BlogHeroBand>

        <section className="section-pad bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
          <div className="shell">
            <div className="mx-auto w-full max-w-6xl space-y-10 px-3 sm:px-4">
              <div className="space-y-3 text-center sm:text-left">
                <p className="zen-brush-underline text-xs font-semibold uppercase tracking-[0.16em] text-white light:text-zen-espresso">
                  {pricingPageCopy.introEyebrow}
                </p>
                <p className="font-heading text-2xl font-bold text-white light:text-zen-espresso sm:text-3xl">
                  {pricingPageCopy.introTitle}
                </p>
                <p className="text-base leading-relaxed text-white/85 light:text-zen-taupe sm:text-lg">
                  {pricingPageCopy.introBody}
                </p>
              </div>

              <PricingServiceGrid />

            </div>
          </div>
        </section>

        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-zen-rice">
          <PricingContactSection />
        </div>
      </main>

      <SiteFooterRegion socialLinks={socialLinks} />
    </div>
  );
}

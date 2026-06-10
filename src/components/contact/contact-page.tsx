"use client";

import Link from "next/link";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import type { SocialLink } from "@/lib/home-content";
import type { HomeTrustStripLogo } from "@/lib/home-page-copy";
import { BUSINESS } from "@/lib/business";
import { ContactForm } from "@/components/home/contact-form";
import { HeroTrustLogoMarquee } from "@/components/home/hero-trust-logo-marquee";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { SiteWordmarkFooter } from "@/components/layout/site-wordmark-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HomeSectionGridDecor } from "@/components/home/home-section-grid-decor";
import { SiteSocialIcon } from "@/components/layout/site-social-icon";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";

const CONTACT_HERO_IMAGE = gpmPick("modular court tile custom logo branding");
const CONTACT_HERO_ALT = gpmImageAlt(CONTACT_HERO_IMAGE);

export function ContactPage({
  socialLinks,
  heroTrustStripLogos,
}: {
  socialLinks: SocialLink[];
  heroTrustStripLogos: HomeTrustStripLogo[];
}) {
  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <header className="relative z-[200] isolate min-h-0 overflow-x-clip bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
        <SiteHeader anchorBase="/" />
      </header>

      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <SiteBreadcrumbs />
        <BlogHeroBand imageSrc={CONTACT_HERO_IMAGE} imageAlt={CONTACT_HERO_ALT}>
          <div className="min-w-0 w-full max-w-3xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Contact {BUSINESS.nameFull}
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/90 md:text-base">
              Court construction in Boise & Scottsdale • Available 24/7 • Free consultation
            </p>
            <PageHeroCtaButtons secondaryHref="#contact-form" />
          </div>
        </BlogHeroBand>

        <section className="relative left-1/2 right-1/2 z-20 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden border-y border-zen-gold/30 bg-zen-crimson text-white shadow-[0_18px_45px_rgba(21, 21, 21,0.12)]">
          <HeroTrustLogoMarquee logos={heroTrustStripLogos} showTopBorder={false} />
        </section>

        <section className="contact-page-cards-section section-pad relative overflow-x-clip">
          <HomeSectionGridDecor placement="contact-page-form-right" />
          <div className="shell relative z-10">
            <div className="grid gap-8 rounded-3xl lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
              <article className="relative z-10 rounded-3xl border border-slate-200/80 bg-white/10 p-6 backdrop-blur-xl light:border-slate-200 light:bg-white/90 sm:p-8">
                <h2 className="font-heading text-3xl font-bold leading-tight text-white light:text-zen-espresso md:text-4xl">
                  Talk With a Court Builder
                </h2>
                <p className="mt-5 text-base leading-7 text-white/85 light:text-zen-taupe">
                  Questions about pickleball, basketball, or tennis court construction, resurfacing, surface
                  options, or a commercial facility project? Reach out anytime — we serve Idaho and Arizona.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/75 light:text-zen-taupe">
                      Call Us
                    </h3>
                    <a
                      href={BUSINESS.phoneTel}
                      className="mt-2 block text-base leading-7 text-zen-sage transition hover:text-zen-gold light:text-zen-crimson light:hover:text-zen-crimson-hover"
                    >
                      {BUSINESS.phoneDisplay}
                    </a>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/75 light:text-zen-taupe">
                      Email
                    </h3>
                    <a
                      href={BUSINESS.emailMailto}
                      className="mt-2 block break-all text-base leading-7 text-zen-sage transition hover:text-zen-gold light:text-zen-crimson light:hover:text-zen-crimson-hover"
                    >
                      {BUSINESS.email}
                    </a>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/75 light:text-zen-taupe">
                      Our Location
                    </h3>
                    <a
                      href={BUSINESS.mapsGoogleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block whitespace-normal text-base leading-7 text-zen-sage transition hover:text-zen-gold light:text-zen-crimson light:hover:text-zen-crimson-hover"
                    >
                      {BUSINESS.address}
                    </a>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/75 light:text-zen-taupe">
                      Social Profiles
                    </h3>
                    <ul className="mt-3 flex flex-wrap items-center gap-2.5 text-sm">
                      {socialLinks.map((social) => (
                        <li key={social.label}>
                          <a
                            className="contact-social-link group inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/90 bg-transparent ring-1 ring-slate-300/70 transition hover:border-zen-crimson hover:bg-zen-crimson hover:ring-zen-crimson light:border-slate-300 light:ring-slate-300/80"
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            title={social.label}
                          >
                            <SiteSocialIcon
                              label={social.label}
                              className="h-5 w-5 text-zen-crimson transition-colors group-hover:!text-white"
                            />
                            <span className="sr-only">{social.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              <article
                id="contact-form"
                className="relative z-10 rounded-3xl border border-zen-crimson/40 bg-zen-crimson p-6 text-left shadow-[0_30px_70px_rgba(18,84,155,0.38)] sm:p-8"
              >
                <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                  Get In Touch
                </h2>
                <p className="mt-3 text-base leading-7 text-white/90">
                  Have questions about your court project or want a free consultation? Send us a message and
                  our team will get back to you as soon as possible.
                </p>
                <div id="hero-contact-form" className="mt-6">
                  <ContactForm variant="dark" formName="Contact page" />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[95vw] sm:max-w-[min(80vw,100%)] px-2 sm:px-3 md:px-4">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/5 light:border-slate-300 light:bg-white">
            <iframe
              src={BUSINESS.mapEmbedSrc}
              className="h-72 w-full sm:h-96"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${BUSINESS.nameShort} location map`}
            />
          </div>
        </section>
      </main>

      <SiteWordmarkFooter socialLinks={socialLinks} />
    </div>
  );
}

"use client";

import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import type { SocialLink } from "@/lib/home-content";
import type { HomeTrustStripLogo } from "@/lib/home-page-copy";
import { BUSINESS } from "@/lib/business";
import { ContactForm } from "@/components/home/contact-form";
import { HeroTrustLogoMarquee } from "@/components/home/hero-trust-logo-marquee";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { SiteWordmarkFooter } from "@/components/layout/site-wordmark-footer";
import { SiteSocialIcon } from "@/components/layout/site-social-icon";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";

const CONTACT_HERO_IMAGE = gpmPick("basketball tile court modular hoop goal");
const CONTACT_HERO_ALT = gpmImageAlt(CONTACT_HERO_IMAGE);

const CONTACT_ICON_BOX_CLASS =
  "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zen-crimson text-white transition hover:bg-zen-gold hover:text-zen-espresso";

function ContactInfoItem({
  icon,
  label,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-4 ${className}`.trim()}>
      <div className={CONTACT_ICON_BOX_CLASS}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white light:text-zen-espresso">{label}</p>
        <div className="mt-1 text-sm leading-6 text-white/85 light:text-zen-taupe">{children}</div>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function ContactPage({
  socialLinks,
  heroTrustStripLogos,
}: {
  socialLinks: SocialLink[];
  heroTrustStripLogos: HomeTrustStripLogo[];
}) {
  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <BlogHeroBand imageSrc={CONTACT_HERO_IMAGE} imageAlt={CONTACT_HERO_ALT}>
          <div className="min-w-0 w-full max-w-3xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Contact {BUSINESS.nameFull}
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/90 md:text-base">
              Court builders in Boise and Scottsdale for custom tennis, basketball, pickleball, and multi-use
              court construction.
            </p>
            <PageHeroCtaButtons secondaryHref="#contact-form" />
          </div>
        </BlogHeroBand>

        <section className="relative left-1/2 right-1/2 z-20 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden border-y border-zen-gold/30 bg-zen-crimson text-white shadow-[0_18px_45px_rgba(21, 21, 21,0.12)]">
          <HeroTrustLogoMarquee logos={heroTrustStripLogos} showTopBorder={false} />
        </section>

        <section className="contact-page-cards-section section-pad relative overflow-x-clip">
          <div className="shell relative z-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 xl:gap-20">
              <div className="min-w-0">
                <h2 className="font-heading text-3xl font-bold leading-tight text-white light:text-zen-espresso md:text-4xl">
                  Talk With a Court Builder
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/85 light:text-zen-taupe">
                  Have questions about court construction, resurfacing, or a custom court project? Hatz Court
                  Builders helps homeowners, schools, parks, and commercial properties plan high-quality courts
                  in Boise, Scottsdale, and surrounding areas.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6">
                  <ContactInfoItem icon={<PhoneIcon />} label="Call Us">
                    <a
                      href={BUSINESS.phoneTel}
                      className="transition hover:text-zen-gold light:hover:text-zen-crimson"
                    >
                      {BUSINESS.phoneDisplay}
                    </a>
                  </ContactInfoItem>
                  <ContactInfoItem icon={<MailIcon />} label="Email">
                    <a
                      href={BUSINESS.emailMailto}
                      className="break-all transition hover:text-zen-gold light:hover:text-zen-crimson"
                    >
                      {BUSINESS.email}
                    </a>
                  </ContactInfoItem>
                  <ContactInfoItem icon={<MapPinIcon />} label="Our Location">
                    <a
                      href={BUSINESS.mapsGoogleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-zen-gold light:hover:text-zen-crimson"
                    >
                      {BUSINESS.address}
                    </a>
                  </ContactInfoItem>
                  <ContactInfoItem icon={<ClockIcon />} label="Hours">
                    <span>{BUSINESS.hoursShort.replace(/^Hours:\s*/i, "")}</span>
                  </ContactInfoItem>
                </div>

                <div className="mt-8 border-t border-white/20 pt-6 light:border-slate-200">
                  <h3 className="text-sm font-semibold text-white light:text-zen-espresso">Social Profiles</h3>
                  <ul className="mt-3 flex flex-wrap items-center gap-2.5 text-sm">
                    {socialLinks.map((social) => (
                      <li key={social.label}>
                        <a
                          className={`contact-social-link group ${CONTACT_ICON_BOX_CLASS}`}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          title={social.label}
                        >
                          <SiteSocialIcon
                            label={social.label}
                            className="h-5 w-5 text-white transition-colors group-hover:text-zen-espresso"
                          />
                          <span className="sr-only">{social.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div id="contact-form" className="min-w-0 rounded-3xl bg-zen-crimson p-6 text-white sm:p-8">
                <h2 className="font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                  Get In Touch
                </h2>
                <p className="mt-3 max-w-xl text-base leading-7 text-white/90">
                  Have questions about your court project or want a free estimate? Send us a message and our
                  team will get back to you as soon as possible.
                </p>
                <div className="mt-6">
                  <ContactForm variant="dark" layout="contact-page" formName="Contact page" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[95vw] sm:max-w-[min(80vw,100%)] px-2 sm:px-3 md:px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {(
              [
                { title: "Boise", src: BUSINESS.mapEmbedSrc },
                { title: "Scottsdale", src: BUSINESS.mapEmbedSrcScottsdale },
              ] as const
            ).map(({ title, src }) => (
              <div key={title} className="overflow-hidden">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/90 light:text-zen-espresso sm:text-base">
                  {title}
                </p>
                <iframe
                  src={src}
                  className="aspect-[5/3] w-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${BUSINESS.nameShort} ${title} map`}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteWordmarkFooter socialLinks={socialLinks} />
    </div>
  );
}

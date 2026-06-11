import Image from "next/image";
import Link from "next/link";
import type { SocialLink } from "@/lib/home-content";
import { BUSINESS } from "@/lib/business";
import { FOOTER_SERVICE_LINKS } from "@/lib/footer-services";
import { FooterWordmarkShutter } from "./footer-wordmark-shutter";
import { SiteSocialIcon } from "./site-social-icon";

const footerLinkClass =
  "block -mx-2 rounded-lg px-2 py-1 text-white/82 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const footerCellClass =
  "footer-item-reveal border-b border-white/20 p-6 sm:p-8 lg:border-b-0 lg:p-8 xl:p-10";

const footerHeadingClass = "font-sans text-xl font-bold";

const footerLinkListClass =
  "mt-4 grid grid-cols-2 gap-x-3 gap-y-1 text-sm leading-tight sm:gap-x-4";

const footerDescription =
  "Hatz Court Builders designs, builds, resurfaces, and repairs pickleball, tennis, basketball, and multi-use courts across Idaho and Arizona.";

const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Service Areas", href: "/#service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
] as const;

const FOOTER_SOCIAL_LABELS = new Set(["Facebook", "Instagram"]);

function FooterSocialLinks({
  socialLinks,
  layout,
}: {
  socialLinks: SocialLink[];
  layout: "column" | "inline";
}) {
  const links = socialLinks.filter((social) => FOOTER_SOCIAL_LABELS.has(social.label));

  if (layout === "inline") {
    return (
      <div className="flex shrink-0 gap-2 sm:gap-3">
        {links.map((social) => (
          <a
            key={social.label}
            className="group flex h-12 w-12 items-center justify-center border border-white/20 transition-colors hover:bg-white/5 sm:h-14 sm:w-14"
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
          >
            <SiteSocialIcon
              label={social.label}
              className="h-6 w-6 text-white transition-colors group-hover:text-zen-gold sm:h-7 sm:w-7"
            />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="grid h-full min-h-0 w-full flex-1 grid-cols-1 grid-rows-2 divide-y divide-white/20">
      {links.map((social) => (
        <a
          key={social.label}
          className="group flex h-full min-h-0 w-full items-center justify-center transition-colors hover:bg-white/5"
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          title={social.label}
        >
          <SiteSocialIcon
            label={social.label}
            className="h-7 w-7 text-white transition-colors group-hover:text-zen-gold"
          />
        </a>
      ))}
    </div>
  );
}

function FooterMapEmbed({ title, src }: { title: string; src: string }) {
  return (
    <div className="overflow-hidden">
      <p className="border-b border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
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
  );
}

export function SiteFooter({
  socialLinks,
  className = "",
}: {
  socialLinks: SocialLink[];
  className?: string;
}) {
  return (
    <footer
      className={`relative z-20 border-t-2 border-zen-gold bg-zen-espresso text-zen-rice footer-scroll-animate footer-revealed ${className}`.trim()}
    >
      {/* Row 1 — logo + tagline */}
      <div className="border-b border-white/20">
        <div className="footer-shell">
          <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-white/20">
            <div className="footer-item-reveal flex items-center justify-center border-b border-white/20 py-8 sm:py-10 lg:justify-start lg:border-b-0 lg:py-12 lg:pr-10">
              <Link
                href="/"
                className="inline-flex max-w-full rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label={`${BUSINESS.nameShort} home`}
              >
                <Image
                  src={BUSINESS.logoSrc}
                  alt={BUSINESS.nameShort}
                  width={BUSINESS.logoWidth}
                  height={BUSINESS.logoHeight}
                  className="h-auto w-full max-w-[15rem] object-contain sm:max-w-[18rem]"
                  unoptimized
                />
              </Link>
            </div>
            <div className="footer-item-reveal py-8 text-center sm:py-10 lg:py-12 lg:pl-10 lg:text-left">
              <p className={footerHeadingClass}>Custom Courts Built for Serious Play</p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/78 lg:mx-0">{footerDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 — links, contact, social */}
      <div className="border-b border-white/20">
        <div className="grid lg:grid-cols-[30%_30%_30%_10%] lg:items-stretch lg:divide-x lg:divide-white/20">
          <section className={`${footerCellClass} lg:pl-10 xl:pl-14 2xl:pl-16`}>
            <p className={footerHeadingClass}>Quick Links</p>
            <ul className={footerLinkListClass}>
              {footerQuickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={footerLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={footerCellClass}>
            <p className={footerHeadingClass}>Services</p>
            <ul className={footerLinkListClass}>
              {FOOTER_SERVICE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={footerLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={footerCellClass}>
            <p className={footerHeadingClass}>Contact Us</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                Address:{" "}
                <a
                  className="text-zen-rice/82 underline-offset-2 hover:text-zen-gold hover:underline"
                  href={BUSINESS.mapsGoogleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {BUSINESS.address}
                </a>
              </li>
              <li>{BUSINESS.hoursShort}</li>
              <li>
                Website:{" "}
                <a
                  className="text-zen-rice/82 underline-offset-2 hover:text-zen-gold hover:underline"
                  href={BUSINESS.website}
                >
                  hatzcourtbuilders.com
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  className="text-zen-rice/82 underline-offset-2 hover:text-zen-gold hover:underline"
                  href={BUSINESS.emailMailto}
                >
                  {BUSINESS.email}
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  className="text-zen-rice/82 underline-offset-2 hover:text-zen-gold hover:underline"
                  href={BUSINESS.phoneTel}
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
            </ul>
            <div className="mt-5 lg:hidden">
              <FooterSocialLinks socialLinks={socialLinks} layout="inline" />
            </div>
          </section>

          <section className="footer-item-reveal hidden h-full min-h-0 border-b border-white/20 lg:flex lg:border-b-0">
            <FooterSocialLinks socialLinks={socialLinks} layout="column" />
          </section>
        </div>
      </div>

      {/* Row 2b — maps */}
      <div className="border-b border-white/20">
        <div className="footer-shell">
          <div className="grid grid-cols-1 divide-y divide-white/20 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="footer-item-reveal flex justify-center overflow-hidden lg:py-6">
              <div className="w-full lg:w-4/5">
                <FooterMapEmbed title="Boise" src={BUSINESS.mapEmbedSrc} />
              </div>
            </div>
            <div className="footer-item-reveal flex justify-center overflow-hidden lg:py-6">
              <div className="w-full lg:w-4/5">
                <FooterMapEmbed title="Scottsdale" src={BUSINESS.mapEmbedSrcScottsdale} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 — legal + brand wordmark */}
      <div className="border-b border-white/20 bg-zen-espresso">
        <div className="footer-shell border-b border-white/20 py-5 sm:py-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-white/88 sm:text-sm">
            <li>
              <Link className="transition hover:text-white" href="/">
                &copy; {BUSINESS.nameShort}
              </Link>
            </li>
            <li>
              <a className="transition hover:text-white" href="#">
                Terms of Use
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="#">
                Licence Agreement
              </a>
            </li>
            <li>
              <a
                className="transition hover:text-white"
                href="https://brightbeamseo.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Brightbeam SEO Boise
              </a>
            </li>
          </ul>
        </div>
        <FooterWordmarkShutter text={BUSINESS.nameShort} />
      </div>
    </footer>
  );
}

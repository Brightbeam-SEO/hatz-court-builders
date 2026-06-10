import Image from "next/image";
import Link from "next/link";
import type { SocialLink } from "@/lib/home-content";
import { BUSINESS } from "@/lib/business";
import { FOOTER_SERVICE_LINKS } from "@/lib/footer-services";
import { SiteSocialIcon } from "./site-social-icon";

const footerLinkClass =
  "block -mx-2 rounded-lg px-2 py-1 text-white/82 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const footerDescription =
  "Hatz Court Builders designs and builds custom tennis, basketball, pickleball, and multi-use courts across Idaho and Arizona.";

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
      <div className="shell grid gap-10 pb-6 pt-12 sm:pt-14 md:pb-8 md:pt-16 lg:grid-cols-3 lg:items-start lg:pb-6 lg:pt-20 xl:pt-24">
        <section className="footer-item-reveal">
          <p className="font-sans text-xl font-bold">Custom Courts Built to Last</p>
          <p className="mt-3 text-sm text-white/78">{footerDescription}</p>
          <ul className="mt-4 grid max-w-[9.5rem] grid-cols-3 gap-2.5 text-sm">
            {socialLinks
              .filter((social) => social.label !== "Nextdoor")
              .map((social) => (
                <li key={social.label}>
                  <a
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-zen-rice/92 text-zen-crimson ring-1 ring-white/25 transition-colors duration-200 hover:!bg-zen-gold hover:!text-zen-espresso hover:ring-zen-gold/60"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <SiteSocialIcon
                      label={social.label}
                      className="h-5 w-5 !text-zen-crimson transition-colors group-hover:!text-zen-espresso"
                    />
                    <span className="sr-only">{social.label}</span>
                  </a>
                </li>
              ))}
          </ul>
          <div className="mt-8 min-w-0">
            <p className="font-sans text-xl font-bold">Quick Links</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm leading-tight sm:gap-x-10">
              {footerQuickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={footerLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="footer-item-reveal">
          <div className="min-w-0">
            <p className="font-sans text-xl font-bold">Services</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm leading-tight sm:gap-x-10">
              {FOOTER_SERVICE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={footerLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="footer-item-reveal">
          <p className="font-sans text-xl font-bold">Contact Us</p>
          <ul className="mt-5 space-y-3 text-sm">
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
              <a className="text-zen-rice/82 underline-offset-2 hover:text-zen-gold hover:underline" href={BUSINESS.website}>
                hatzconstruction.com
              </a>
            </li>
            <li>
              Email:{" "}
              <a className="text-zen-rice/82 underline-offset-2 hover:text-zen-gold hover:underline" href={BUSINESS.emailMailto}>
                {BUSINESS.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a className="text-zen-rice/82 underline-offset-2 hover:text-zen-gold hover:underline" href={BUSINESS.phoneTel}>
                {BUSINESS.phoneDisplay}
              </a>
            </li>
          </ul>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/15 bg-white/5">
            <iframe
              src={BUSINESS.mapEmbedSrc}
              className="h-52 w-full sm:h-56"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${BUSINESS.nameShort} location map`}
            />
          </div>
        </section>
      </div>

      <div className="shell -mt-1 overflow-visible pb-2 pt-0 sm:-mt-2 sm:pb-3 md:-mt-3 md:pb-4 lg:-mt-4 lg:pb-5">
        <Link
          href="/"
          className="footer-item-reveal block w-full rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          aria-label={`${BUSINESS.nameShort} home`}
        >
          <Image
            src={BUSINESS.wordmarkSrc}
            alt=""
            width={BUSINESS.wordmarkWidth}
            height={BUSINESS.wordmarkHeight}
            className="mx-auto h-auto w-full max-w-[min(100%,28rem)] origin-center object-contain [image-rendering:-webkit-optimize-contrast] [image-rendering:crisp-edges] sm:max-w-[32rem]"
            unoptimized
          />
        </Link>
      </div>

      <div className="border-t border-white/18 bg-zen-espresso">
        <div className="shell py-5">
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
      </div>
    </footer>
  );
}

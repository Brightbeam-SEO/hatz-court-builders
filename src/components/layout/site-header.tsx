"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BUSINESS } from "@/lib/business";
import { pmServicePagePath } from "@/lib/pm-service-pages";
import { SERVICE_AREA_NAV_LINKS } from "@/lib/service-area-nav";
import { MobileNavMenu } from "@/components/layout/mobile-nav-menu";
import {
  headerDropdownPanelClass,
  headerNavSubLinkClass,
  headerTopLinkClass,
} from "@/lib/site-nav-styles";

const phoneHref = BUSINESS.phoneTel;

const aboutLinks = [
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQs", href: "/faq" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
] as const;

type SiteHeaderProps = {
  anchorBase?: "" | "/";
  blendWithBackground?: boolean;
};

export function SiteHeader({ blendWithBackground = true }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const wrapperClass = blendWithBackground
    ? "relative z-[220] w-full bg-transparent text-white light:bg-transparent light:text-zen-espresso"
    : "relative z-[220] w-full bg-zen-espresso text-white light:bg-zen-rice light:text-zen-espresso";
  const shellClass = blendWithBackground
    ? "overflow-visible rounded-[1.6rem] border border-transparent bg-transparent px-4 shadow-none backdrop-blur-0 sm:rounded-full sm:px-5 md:px-6"
    : "overflow-visible rounded-[1.6rem] border border-zen-sand/55 bg-zen-rice/58 px-4 shadow-[0_4px_18px_rgba(21,21,21,0.025)] backdrop-blur-sm sm:rounded-full sm:px-5 md:px-6";

  return (
    <div className={wrapperClass}>
      <div className="mx-auto w-full max-w-[95vw] px-2 pt-3 sm:max-w-[min(80vw,100%)] sm:px-3 sm:pt-4 md:px-4 md:pt-5">
        <div className={shellClass}>
          <nav className="relative z-[230] flex w-full flex-wrap items-center justify-between gap-2 py-3 sm:gap-3 md:py-4 lg:grid lg:max-w-full lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:flex-nowrap lg:items-center lg:justify-between lg:gap-3 lg:px-0 xl:gap-5">
            <Link
              href="/"
              className="order-1 shrink-0 justify-self-start rounded-sm bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-crimson"
            >
              <Image
                key={BUSINESS.logoSrc}
                src={BUSINESS.logoSrc}
                alt={BUSINESS.nameFull}
                width={BUSINESS.logoWidth}
                height={BUSINESS.logoHeight}
                sizes="(min-width: 1024px) 304px, (min-width: 768px) 280px, (min-width: 640px) 248px, 216px"
                className="h-14 w-auto max-w-[min(100%,13.5rem)] bg-transparent object-contain object-left sm:h-16 sm:max-w-[15.5rem] md:h-[4.25rem] md:max-w-[17.5rem] lg:h-[4.75rem] lg:max-w-[19rem] [mix-blend-mode:normal]"
                style={{ background: "transparent" }}
                priority
              />
            </Link>

            <ul className="order-3 hidden min-w-0 w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 font-sans text-xs font-medium tracking-[0.0125em] text-zen-espresso/80 sm:gap-x-3 lg:order-2 lg:flex lg:w-auto lg:gap-x-3 lg:gap-y-0 xl:gap-x-5 xl:text-sm">
              <li className="shrink-0 whitespace-nowrap">
                <a className={headerTopLinkClass} href={pmServicePagePath("property-management-services")}>
                  Services
                </a>
              </li>
              <li className="group relative shrink-0 whitespace-nowrap after:absolute after:left-0 after:top-full after:h-3 after:w-full after:content-['']">
                <button type="button" className={`inline-flex items-center gap-1 ${headerTopLinkClass}`}>
                  Service Areas
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M5.75 7.5L10 11.75L14.25 7.5" />
                  </svg>
                </button>
                <ul className={`${headerDropdownPanelClass} left-0 top-full mt-1 w-56 translate-y-1`}>
                  {SERVICE_AREA_NAV_LINKS.map(({ label, href }) => (
                    <li key={label}>
                      <a className={headerNavSubLinkClass} href={href}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="group relative shrink-0 whitespace-nowrap after:absolute after:left-0 after:top-full after:h-3 after:w-full after:content-['']">
                <button type="button" className={`inline-flex items-center gap-1 ${headerTopLinkClass}`}>
                  About
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M5.75 7.5L10 11.75L14.25 7.5" />
                  </svg>
                </button>
                <ul className={`${headerDropdownPanelClass} left-0 top-full mt-1 w-56 translate-y-1`}>
                  {aboutLinks.map(({ label, href }) => (
                    <li key={label}>
                      <a className={headerNavSubLinkClass} href={href}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="shrink-0 whitespace-nowrap">
                <a className={headerTopLinkClass} href="/contact">
                  Contact
                </a>
              </li>
            </ul>

            <div className="order-2 flex shrink-0 items-center gap-2 sm:gap-3 lg:order-3 lg:ml-0 lg:justify-self-end">
              <button
                type="button"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zen-gold/25 bg-white/85 text-zen-espresso backdrop-blur-sm lg:hidden"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
              <a
                href={phoneHref}
                aria-label={`Call ${BUSINESS.phoneDisplay}`}
                className="nav-call-link inline-flex min-w-0 max-w-full items-center justify-center rounded-full text-xs font-bold uppercase tracking-[0.05em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-espresso xl:text-sm xl:!text-zen-espresso"
              >
                <Image
                  src="/images/nav/call-button.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 xl:hidden"
                  aria-hidden
                />
                <span className="hidden min-w-0 truncate xl:inline">
                  Call {BUSINESS.phoneDisplay}
                </span>
              </a>
            </div>
          </nav>

          <MobileNavMenu open={menuOpen} onClose={closeMenu} />
        </div>
      </div>
    </div>
  );
}

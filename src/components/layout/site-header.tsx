"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BUSINESS } from "@/lib/business";
import { COURT_CONSTRUCTION_NAV_LINKS } from "@/lib/court-construction-nav";
import { COURT_SURFACES_NAV_LINKS } from "@/lib/court-surfaces-nav";
import { SERVICE_AREA_NAV_GROUPS } from "@/lib/service-area-nav";
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

type TopMenu = "services" | "areas" | "about";
type NestedMenu = "court" | "surfaces" | `area-${string}`;

type SiteHeaderProps = {
  anchorBase?: "" | "/";
  blendWithBackground?: boolean;
};

function useHoverCapable() {
  const [hoverCapable, setHoverCapable] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setHoverCapable(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return hoverCapable;
}

function panelOpenClass(isOpen: boolean) {
  return isOpen
    ? "!visible !translate-y-0 !opacity-100 !delay-0 !duration-200 pointer-events-auto"
    : "!invisible !opacity-0 pointer-events-none";
}

export function SiteHeader({ blendWithBackground = true }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openTop, setOpenTop] = useState<TopMenu | null>(null);
  const [openNested, setOpenNested] = useState<NestedMenu | null>(null);
  const hoverCapable = useHoverCapable();
  const desktopNavRef = useRef<HTMLUListElement>(null);
  const servicesPanelId = useId();
  const areasPanelId = useId();
  const aboutPanelId = useId();

  const closeMenu = () => setMenuOpen(false);

  const closeDesktopMenus = useCallback(() => {
    setOpenTop(null);
    setOpenNested(null);
  }, []);

  const toggleTop = (menu: TopMenu) => {
    setOpenTop((prev) => {
      const next = prev === menu ? null : menu;
      if (next !== "services" && next !== "areas") setOpenNested(null);
      return next;
    });
  };

  const toggleNested = (menu: NestedMenu) => {
    setOpenNested((prev) => (prev === menu ? null : menu));
  };

  useEffect(() => {
    if (!openTop) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && desktopNavRef.current?.contains(target)) return;
      closeDesktopMenus();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDesktopMenus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeDesktopMenus, openTop]);

  const topHoverHandlers = (menu: TopMenu) =>
    hoverCapable
      ? {
          onMouseEnter: () => {
            setOpenTop(menu);
            if (menu !== "services" && menu !== "areas") setOpenNested(null);
          },
          onMouseLeave: () => {
            setOpenTop((prev) => (prev === menu ? null : prev));
            setOpenNested(null);
          },
        }
      : {};

  const nestedHoverHandlers = (menu: NestedMenu) =>
    hoverCapable
      ? {
          onMouseEnter: () => setOpenNested(menu),
          onMouseLeave: () => setOpenNested((prev) => (prev === menu ? null : prev)),
        }
      : {};

  const wrapperClass = blendWithBackground
    ? "relative z-[220] w-full bg-transparent text-white light:bg-transparent light:text-zen-espresso"
    : "relative z-[220] w-full bg-zen-espresso text-white light:bg-zen-rice light:text-zen-espresso";
  const shellClass = blendWithBackground
    ? "overflow-visible rounded-[1.6rem] border border-zen-sand/40 bg-zen-rice/90 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] sm:rounded-full sm:px-5 md:px-6 lg:px-3 xl:px-4"
    : "overflow-visible rounded-[1.6rem] border border-zen-sand/55 bg-zen-rice/58 px-4 shadow-[0_4px_18px_rgba(21,21,21,0.025)] backdrop-blur-sm sm:rounded-full sm:px-5 md:px-6";
  const innerWrapClass = blendWithBackground
    ? "mx-auto w-full max-w-[95vw] px-2 pt-3 sm:max-w-[min(80vw,100%)] sm:px-3 sm:pt-4 md:px-4 md:pt-5 lg:max-w-none lg:w-[90%] lg:px-0"
    : "mx-auto w-full max-w-[95vw] px-2 pt-3 sm:max-w-[min(80vw,100%)] sm:px-3 sm:pt-4 md:px-4 md:pt-5";

  return (
    <div className={wrapperClass}>
      <div className={innerWrapClass}>
        <div className={shellClass}>
          <nav className="relative z-[230] grid w-full max-w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 py-3 sm:gap-3 xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-5 xl:px-0 xl:py-3">
            <Link
              href="/"
              className="min-w-0 justify-self-start rounded-sm bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-crimson xl:col-start-1 xl:row-start-1"
            >
              <Image
                key={BUSINESS.logoSrc}
                src={BUSINESS.logoSrc}
                alt={BUSINESS.nameFull}
                width={BUSINESS.logoWidth}
                height={BUSINESS.logoHeight}
                sizes="(min-width: 1280px) 248px, (min-width: 1024px) 224px, (min-width: 768px) 280px, (min-width: 640px) 248px, 216px"
                className="h-14 w-auto max-w-[min(100%,13.5rem)] bg-transparent object-contain object-left sm:h-16 sm:max-w-[15.5rem] md:h-[4.25rem] md:max-w-[17.5rem] lg:h-[3.25rem] lg:max-w-[14.5rem] xl:h-[3.5rem] xl:max-w-[15.5rem] [mix-blend-mode:normal]"
                style={{ background: "transparent" }}
                unoptimized
                priority
              />
            </Link>

            <ul
              ref={desktopNavRef}
              className="hidden min-w-0 flex-wrap items-center justify-center gap-x-2 gap-y-1 font-sans text-xs font-medium tracking-[0.0125em] text-zen-espresso/80 sm:gap-x-3 xl:col-start-2 xl:row-start-1 xl:flex xl:w-auto xl:gap-x-5 xl:gap-y-0 xl:text-sm"
            >
              <li
                className="group relative shrink-0 whitespace-nowrap after:absolute after:left-0 after:top-full after:h-3 after:w-full after:content-['']"
                {...topHoverHandlers("services")}
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 ${headerTopLinkClass}`}
                  aria-expanded={openTop === "services"}
                  aria-controls={servicesPanelId}
                  onClick={() => toggleTop("services")}
                >
                  Services
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M5.75 7.5L10 11.75L14.25 7.5" />
                  </svg>
                </button>
                <ul
                  id={servicesPanelId}
                  className={`${headerDropdownPanelClass} left-0 top-full mt-1 w-56 translate-y-1 ${panelOpenClass(openTop === "services")}`}
                >
                  <li className="group/court relative" {...nestedHoverHandlers("court")}>
                    <button
                      type="button"
                      className={`${headerNavSubLinkClass} inline-flex w-full items-center justify-between`}
                      aria-expanded={openNested === "court"}
                      onClick={() => toggleNested("court")}
                    >
                      Court Construction
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path d="M7.5 5.75L11.75 10L7.5 14.25" />
                      </svg>
                    </button>
                    <ul
                      className={`${headerDropdownPanelClass} left-full top-0 ml-1 w-72 ${panelOpenClass(openNested === "court")}`}
                    >
                      {COURT_CONSTRUCTION_NAV_LINKS.map(({ label, href }) => (
                        <li key={label}>
                          <a className={headerNavSubLinkClass} href={href} onClick={closeDesktopMenus}>
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="group/surfaces relative" {...nestedHoverHandlers("surfaces")}>
                    <button
                      type="button"
                      className={`${headerNavSubLinkClass} inline-flex w-full items-center justify-between`}
                      aria-expanded={openNested === "surfaces"}
                      onClick={() => toggleNested("surfaces")}
                    >
                      Court Surfaces & Systems
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path d="M7.5 5.75L11.75 10L7.5 14.25" />
                      </svg>
                    </button>
                    <ul
                      className={`${headerDropdownPanelClass} left-full top-0 ml-1 w-72 ${panelOpenClass(openNested === "surfaces")}`}
                    >
                      {COURT_SURFACES_NAV_LINKS.map(({ label, href }) => (
                        <li key={label}>
                          <a className={headerNavSubLinkClass} href={href} onClick={closeDesktopMenus}>
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </li>

              <li
                className="group relative shrink-0 whitespace-nowrap after:absolute after:left-0 after:top-full after:h-3 after:w-full after:content-['']"
                {...topHoverHandlers("areas")}
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 ${headerTopLinkClass}`}
                  aria-expanded={openTop === "areas"}
                  aria-controls={areasPanelId}
                  onClick={() => toggleTop("areas")}
                >
                  Service Areas
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M5.75 7.5L10 11.75L14.25 7.5" />
                  </svg>
                </button>
                <ul
                  id={areasPanelId}
                  className={`${headerDropdownPanelClass} left-0 top-full mt-1 w-56 translate-y-1 ${panelOpenClass(openTop === "areas")}`}
                >
                  {SERVICE_AREA_NAV_GROUPS.map((group) => {
                    const nestedId = `area-${group.label}` as NestedMenu;
                    return (
                      <li key={group.label} className="group/area relative" {...nestedHoverHandlers(nestedId)}>
                        <button
                          type="button"
                          className={`${headerNavSubLinkClass} inline-flex w-full items-center justify-between`}
                          aria-expanded={openNested === nestedId}
                          onClick={() => toggleNested(nestedId)}
                        >
                          {group.label}
                          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                            <path d="M7.5 5.75L11.75 10L7.5 14.25" />
                          </svg>
                        </button>
                        <ul
                          className={`${headerDropdownPanelClass} left-full top-0 ml-1 w-64 ${panelOpenClass(openNested === nestedId)}`}
                        >
                          {group.links.map(({ label, href }) => (
                            <li key={label}>
                              <a className={headerNavSubLinkClass} href={href} onClick={closeDesktopMenus}>
                                {label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </li>

              <li
                className="group relative shrink-0 whitespace-nowrap after:absolute after:left-0 after:top-full after:h-3 after:w-full after:content-['']"
                {...topHoverHandlers("about")}
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 ${headerTopLinkClass}`}
                  aria-expanded={openTop === "about"}
                  aria-controls={aboutPanelId}
                  onClick={() => toggleTop("about")}
                >
                  About
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M5.75 7.5L10 11.75L14.25 7.5" />
                  </svg>
                </button>
                <ul
                  id={aboutPanelId}
                  className={`${headerDropdownPanelClass} left-0 top-full mt-1 w-56 translate-y-1 ${panelOpenClass(openTop === "about")}`}
                >
                  {aboutLinks.map(({ label, href }) => (
                    <li key={label}>
                      <a className={headerNavSubLinkClass} href={href} onClick={closeDesktopMenus}>
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

            <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-self-end gap-2 sm:gap-3 xl:col-start-3 xl:ml-0">
              <button
                type="button"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zen-gold/25 bg-white/85 text-zen-espresso backdrop-blur-sm xl:hidden"
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

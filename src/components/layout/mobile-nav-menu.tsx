"use client";

import { useEffect, useState } from "react";
import { BUSINESS } from "@/lib/business";
import { COURT_CONSTRUCTION_NAV_LINKS } from "@/lib/court-construction-nav";
import { SERVICE_AREA_NAV_GROUPS } from "@/lib/service-area-nav";
import {
  headerMobileAccordionPanelClass,
  headerMobileAccordionSubLinkClass,
  headerMobileAccordionTriggerClass,
  headerMobileTopLinkClass,
  headerMobileSectionLabelClass,
} from "@/lib/site-nav-styles";

const phoneHref = BUSINESS.phoneTel;

const aboutLinks = [
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQs", href: "/faq" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
] as const;

type NavLink = { label: string; href: string };

type MobileNavAccordionProps = {
  label: string;
  links: NavLink[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  nestedSections?: { label: string; links: NavLink[] }[];
};

function MobileNavAccordion({
  label,
  links,
  isOpen,
  onToggle,
  onNavigate,
  nestedSections,
}: MobileNavAccordionProps) {
  const panelId = `mobile-nav-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const hasNestedSections = (nestedSections?.length ?? 0) > 0;

  return (
    <div className="overflow-hidden rounded-xl border border-zen-gold/20 bg-white">
      <button
        type="button"
        className={headerMobileAccordionTriggerClass}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{label}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-zen-espresso/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M5.75 7.5L10 11.75L14.25 7.5" />
        </svg>
      </button>
      {isOpen ? (
        <ul id={panelId} className={headerMobileAccordionPanelClass}>
          {hasNestedSections
            ? nestedSections?.map((section) => (
                <li key={section.label}>
                  <p className={headerMobileSectionLabelClass}>{section.label}</p>
                  <ul className="mt-1 space-y-1 border-l border-zen-gold/20 pl-3">
                    {section.links.map(({ label: linkLabel, href }) => (
                      <li key={href}>
                        <a href={href} className={headerMobileAccordionSubLinkClass} onClick={onNavigate}>
                          {linkLabel}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            : links.map(({ label: linkLabel, href }) => (
                <li key={href}>
                  <a href={href} className={headerMobileAccordionSubLinkClass} onClick={onNavigate}>
                    {linkLabel}
                  </a>
                </li>
              ))}
        </ul>
      ) : null}
    </div>
  );
}

type MobileNavMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavMenu({ open, onClose }: MobileNavMenuProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (!open) setOpenSections(new Set());
  }, [open]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!open) return null;

  return (
    <nav
      className="relative z-[240] mb-3 rounded-2xl border border-zen-gold/15 bg-white/92 p-4 text-sm text-zen-espresso shadow-sm backdrop-blur-md lg:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="grid gap-2">
        <li>
          <MobileNavAccordion
            label="Services"
            links={[]}
            nestedSections={[
              {
                label: "Court Construction",
                links: COURT_CONSTRUCTION_NAV_LINKS.map(({ label, href }) => ({ label, href })),
              },
            ]}
            isOpen={openSections.has("services")}
            onToggle={() => toggleSection("services")}
            onNavigate={onClose}
          />
        </li>
        <li>
          <MobileNavAccordion
            label="Service Areas"
            links={[]}
            nestedSections={SERVICE_AREA_NAV_GROUPS.map((group) => ({
              label: group.label,
              links: group.links.map(({ label, href }) => ({ label, href })),
            }))}
            isOpen={openSections.has("service-areas")}
            onToggle={() => toggleSection("service-areas")}
            onNavigate={onClose}
          />
        </li>
        <li>
          <MobileNavAccordion
            label="About"
            links={aboutLinks.map(({ label, href }) => ({ label, href }))}
            isOpen={openSections.has("about")}
            onToggle={() => toggleSection("about")}
            onNavigate={onClose}
          />
        </li>
        <li>
          <a href="/contact" className={headerMobileTopLinkClass} onClick={onClose}>
            Contact
          </a>
        </li>
        <li className="pt-1">
          <a className="btn-call block py-2.5 text-center text-sm" href={phoneHref} onClick={onClose}>
            Call {BUSINESS.phoneDisplay}
          </a>
        </li>
      </ul>
    </nav>
  );
}

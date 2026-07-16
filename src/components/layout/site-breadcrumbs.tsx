"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StructuredData } from "@/components/seo/structured-data";
import { buildCanonicalUrl, normalizeSitePath } from "@/lib/site-url";

/** Human labels for top-level routes (pathname segments). */
const SEGMENT_LABELS: Record<string, string> = {
  about: "About Us",
  contact: "Contact Us",
  faq: "FAQ",
  gallery: "Gallery",
  reviews: "Reviews",
  pricing: "Pricing",
  blog: "Blog",
  services: "Services",
  city: "Service Areas",
  "body-massage": "Body Massage",
  facials: "Facials",
  "foot-massage-reflexology": "Property Management Meridian",
  "rental-property-marketing": "Rental Property Marketing",
  "property-inspections": "Property Inspections",
  "property-maintenance-services": "Property Maintenance Services",
  "tenant-placement-services": "Tenant Placement Services",
  "specialized-property-management": "Specialized Property Management",
  "multi-family-property-management": "Multi Family Property Management",
  "hoa-community-management": "HOA Community Management",
  "long-term-rental-management": "Long Term Rental Management",
  "property-risk-mitigation": "Property Risk Mitigation",
  "real-estate-investment-consulting": "Real Estate Investment Consulting",
  "property-risk-management-meridian-id": "Property Risk Management",
  rentals: "Rentals",
  "condo-rentals-meridian-id": "Condo Rentals",
  "home-rentals-meridian-id": "Home Rentals",
  "month-to-month-rentals-meridian-id": "Month To Month Rentals",
  "long-term-rentals-meridian-id": "Long Term Rentals",
  "scalp-massage": "Scalp Massage",
  "couples-massage": "Couples Massage",
  "swedish-massage": "Swedish Massage",
  "deep-tissue-massage": "Deep Tissue Massage",
  "pregnancy-massage": "Pregnancy Massage",
  "post-pregnancy-massage-eagle-id": "Post Pregnancy Massage",
  "aromatherapy-massage": "Aromatherapy Massage Eagle ID",
  "hot-stone-massage": "Hot Stone Massage Eagle ID",
  "thai-massage": "Thai Massage",
  "medical-massage": "Medical Massage",
  "sports-massage": "Sports Massage",
  "myofascial-massage": "Myofascial Massage",
  "lymphatic-massage": "Lymphatic Massage",
  "craniosacral-therapy": "Craniosacral Therapy",
  facial: "Facials",
  microneedling: "Microneedling",
  "chronic-injury-massage-eagle-id": "Chronic Injury Massage",
  "sciatica-pain-massage-eagle-id": "Sciatica Pain Massage",
  "chronic-pain-massage-eagle-id": "Chronic Pain Massage",
  "massage-services-boise-id": "Massage Services in Boise, Idaho",
  "massage-services-nampa-id": "Massage Nampa, Idaho",
  "massage-services-eagle-id": "Massage Services in Eagle, Idaho",
  "massage-services-meridian-id": "Massage Meridian, Idaho",
  "massage-services-kuna-id": "Massage Kuna, Idaho",
  "massage-services-star-id": "Massage Star, Idaho",
  "massage-services-caldwell-id": "Massage Caldwell, Idaho",
  "massage-services-middleton-id": "Massage Middleton, Idaho",
  "scalp-massage-boise": "Scalp Massage Boise",
  "hot-stone-massage-boise-id": "Hot Stone Massage Boise, ID",
  "prenatal-massage-boise-id": "Prenatal Massage Boise, ID",
  "deep-tissue-massage-boise-id": "Deep Tissue Massage Boise, ID",
  "foot-massage-boise-id": "Foot Massage Boise, ID",
  "couples-massage-boise-id": "Couples Massage Boise, Idaho",
  "scalp-massage-nampa": "Scalp Massage Nampa",
  "pressure-washing-boise-id": "Foot Massage & Reflexology",
};

function labelForSegment(segment: string) {
  const lower = segment.toLowerCase();
  if (SEGMENT_LABELS[lower]) return SEGMENT_LABELS[lower];
  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Faint breadcrumb row — place as the first child inside `<main>`, directly above the hero
 * section (same horizontal padding as the hero). Renders nothing on `/`.
 */
export function SiteBreadcrumbs({ onHero = false }: { onHero?: boolean }) {
  const pathname = usePathname() ?? "/";
  const normalized = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  if (normalized === "" || normalized === "/") return null;

  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs: { href: string; label: string }[] = [{ href: "/", label: "Home" }];

  let pathAcc = "";
  for (const segment of segments) {
    pathAcc += `/${segment}`;
    crumbs.push({ href: normalizeSitePath(pathAcc), label: labelForSegment(segment) });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: buildCanonicalUrl(crumb.href),
    })),
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <nav
        aria-label="Breadcrumb"
        className="mx-auto w-full max-w-[95vw] sm:max-w-[min(80vw,100%)] px-2 pb-2 pt-1 sm:px-3 sm:pb-2.5 sm:pt-1.5 md:px-4"
      >
        <ol
          className={`flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[10px] font-normal leading-snug tracking-wide sm:text-[11px] ${
            onHero ? "text-white/90" : "text-white/38 light:text-zen-taupe"
          }`}
        >
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.href} className="inline-flex max-w-full items-center gap-x-1">
                {index > 0 ? (
                  <span
                    className={`shrink-0 ${onHero ? "text-white/55" : "text-white/25 light:text-slate-400/80"}`}
                    aria-hidden
                  >
                    /
                  </span>
                ) : null}
                {isLast ? (
                  <span
                    className={`min-w-0 truncate ${onHero ? "text-white" : "text-white/48 light:text-zen-taupe"}`}
                    aria-current="page"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className={`shrink-0 transition ${
                      onHero
                        ? "text-white/85 hover:text-white"
                        : "text-white/42 hover:text-white/65 light:text-zen-taupe light:hover:text-zen-taupe"
                    }`}
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

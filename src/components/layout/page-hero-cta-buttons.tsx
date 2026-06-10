import Link from "next/link";
import { BUSINESS } from "@/lib/business";

export const PAGE_HERO_CTA_SECONDARY_LABEL = "Get A Court Estimate" as const;

type PageHeroCtaButtonsProps = {
  className?: string;
  align?: "start" | "center";
  /** Defaults to `/contact`. */
  secondaryHref?: string;
  /** Use on dark hero bands (BlogHeroBand, etc.). */
  onDark?: boolean;
  /** White pill + green label (primary); white outline (secondary on dark). */
  primaryStyle?: "crimson" | "white";
  /** Extra classes on the secondary link (e.g. `blog-lead-cta-secondary`). */
  secondaryClassName?: string;
};

export function PageHeroCtaButtons({
  className = "",
  align = "start",
  secondaryHref = "/contact",
  onDark = true,
  primaryStyle = "crimson",
  secondaryClassName = "",
}: PageHeroCtaButtonsProps) {
  const alignClass =
    align === "center" ? "items-center justify-center" : "items-start justify-start";
  const useWhitePrimary = primaryStyle === "white";
  const primaryClass = useWhitePrimary ? "btn-call btn-call-inverse" : "btn-call";
  const secondaryClass = [
    "btn-alt",
    onDark || useWhitePrimary ? "btn-alt-inverse page-hero-cta-secondary" : "",
    secondaryClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`mt-6 flex w-full max-w-lg flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap ${alignClass} ${className}`.trim()}
    >
      <a className={primaryClass} href={BUSINESS.phoneTel}>
        Call {BUSINESS.phoneDisplay}
      </a>
      <Link className={secondaryClass} href={secondaryHref}>
        {PAGE_HERO_CTA_SECONDARY_LABEL}
      </Link>
    </div>
  );
}

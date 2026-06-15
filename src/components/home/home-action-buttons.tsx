"use client";

import { BUSINESS } from "@/lib/business";
import { homeFooterContactFormHref } from "@/lib/home-anchors";
import { useHomeContent } from "./home-content-context";

export function HomeActionButtons({
  centered = false,
  stacked = false,
  secondaryClassName = "",
  className = "",
}: {
  centered?: boolean;
  stacked?: boolean;
  secondaryClassName?: string;
  className?: string;
}) {
  const { copy } = useHomeContent();
  return (
    <div
      className={`mt-6 flex flex-col gap-3 ${stacked ? "" : "sm:flex-row sm:flex-wrap"} sm:gap-3${
        centered
          ? stacked
            ? " items-center justify-center"
            : " max-lg:items-center max-lg:justify-center lg:items-start lg:justify-start"
          : ""
      } ${className}`.trim()}
    >
      <a className="btn-call" href={BUSINESS.phoneTel}>
        {copy.ctaCallVerb} {BUSINESS.phoneDisplay}
      </a>
      <a className={`btn-alt ${secondaryClassName}`.trim()} href={homeFooterContactFormHref}>
        {copy.ctaBookNowLabel}
      </a>
    </div>
  );
}

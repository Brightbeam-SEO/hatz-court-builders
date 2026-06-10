"use client";

import { BUSINESS } from "@/lib/business";
import { homeFooterContactFormHref } from "@/lib/home-anchors";
import { useHomeContent } from "./home-content-context";

export function HomeActionButtons({
  centered = false,
  secondaryClassName = "",
  className = "",
}: {
  centered?: boolean;
  secondaryClassName?: string;
  className?: string;
}) {
  const { copy } = useHomeContent();
  return (
    <div
      className={`mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3${
        centered
          ? " max-lg:items-center max-lg:justify-center lg:items-start lg:justify-start"
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

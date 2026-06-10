"use client";

import { useState } from "react";
import { BUSINESS } from "@/lib/business";
import { homeFooterContactFormHref } from "@/lib/home-anchors";
import { useHomeContent } from "@/components/home/home-content-context";

/** Matches `viewBox="0 0 375 525.000007"` on `public/images/maps/idaho-service-areas.svg`. */
const VIEWBOX = { w: 375, h: 525 };

type ServiceArea = {
  id: string;
  name: string;
  x: number;
  y: number;
};

/** Meridian, ID — pin position tuned to `idaho-service-areas.svg` viewBox. */
const SERVICE_AREAS: ServiceArea[] = [{ id: "meridian", name: "Meridian", x: 157, y: 382 }];

const cityBtnClass =
  "inline-flex items-center justify-center rounded-full border-2 border-zen-espresso bg-transparent px-4 py-2 text-sm font-semibold text-zen-espresso transition hover:bg-zen-sage hover:text-zen-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-sage";

function ServiceAreaCityButtons({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="section-eyebrow">Service Areas</p>
      <ul className="mt-4 flex flex-wrap gap-2 sm:gap-3" role="list">
        {BUSINESS.serviceCities.map((city) => (
          <li key={city}>
            <span className={cityBtnClass}>{city}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const defaultArea = SERVICE_AREAS[0]!;

function MapMarker({
  area,
  isActive,
  onSelect,
  onHover,
}: {
  area: ServiceArea;
  isActive: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  const leftPct = (area.x / VIEWBOX.w) * 100;
  const topPct = (area.y / VIEWBOX.h) * 100;

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      aria-pressed={isActive}
      aria-label={`${area.name}${isActive ? ", selected" : ""}`}
      title={area.name}
      className={`pointer-events-auto absolute z-10 -translate-x-1/2 -translate-y-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-sage focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F1] ${
        isActive ? "z-20 scale-110 drop-shadow-[0_0_10px_rgba(184, 155, 106,0.65)]" : ""
      }`}
      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
    >
      <svg
        width="36"
        height="48"
        viewBox="0 0 36 48"
        className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
        aria-hidden
      >
        <path
          d="M18 2C9.8 2 3 8.5 3 16.2c0 9.8 15 29.8 15 29.8s15-20 15-29.8C33 8.5 26.2 2 18 2z"
          fill="var(--zen-sage)"
          fillOpacity={1}
          stroke="rgba(21, 21, 21, 0.28)"
          strokeWidth="1"
        />
        <circle cx="18" cy="15" r="5" fill="white" />
      </svg>
    </button>
  );
}

export type ServiceAreaSectionProps = {
  /** Anchor id — use a unique value when rendering a duplicate for design experiments. */
  sectionId?: string;
  className?: string;
};

export function ServiceAreaSection({
  sectionId = "service-areas",
  className = "",
}: ServiceAreaSectionProps = {}) {
  const { copy } = useHomeContent();
  const [activeId, setActiveId] = useState(defaultArea.id);

  return (
    <section
      id={sectionId}
      className={`home-section-viewport section-pad bg-transparent text-zen-espresso ${className}`.trim()}
    >
      <div className="shell">
        <div className="proof-showcase-reveal relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div className="order-1 flex max-w-xl flex-col lg:order-none lg:col-start-2 lg:row-start-1">
              <h2 className="font-heading text-3xl font-bold text-zen-espresso md:text-4xl">
                {copy.serviceAreaHeading}
              </h2>
              <p className="mt-4 leading-7 text-zen-taupe">{copy.serviceAreaBody}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a className="btn-call" href={BUSINESS.phoneTel}>
                  {copy.ctaCallVerb} {BUSINESS.phoneDisplay}
                </a>
                <a
                  className="btn-alt !border-zen-espresso !text-zen-espresso hover:!bg-zen-espresso hover:!text-white focus-visible:!outline-zen-espresso"
                  href={homeFooterContactFormHref}
                >
                  {copy.ctaBookNowLabel}
                </a>
              </div>
            </div>

            <div className="order-2 relative z-10 lg:order-none lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start">
              <div className="relative w-full">
                <img
                  src="/images/maps/idaho-service-areas.svg"
                  alt="Map of Idaho highlighting Meridian and the Treasure Valley."
                  width={375}
                  height={525}
                  className="h-auto w-full"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0" aria-hidden>
                  {SERVICE_AREAS.map((area) => (
                    <MapMarker
                      key={area.id}
                      area={area}
                      isActive={activeId === area.id}
                      onSelect={() => setActiveId(area.id)}
                      onHover={() => setActiveId(area.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <ServiceAreaCityButtons className="order-3 max-w-xl lg:order-none lg:col-start-2 lg:row-start-2 lg:mt-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

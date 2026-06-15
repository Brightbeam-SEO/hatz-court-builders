"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { useHomeContent } from "@/components/home/home-content-context";
import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import { highlightTextPhrase } from "@/lib/highlight-text";
import {
  DEFAULT_SERVICE_AREA_CITY_BY_REGION,
  DEFAULT_SERVICE_AREA_REGION,
  getCitiesForRegion,
  SERVICE_AREA_REGIONS,
  type ServiceAreaCity,
  type ServiceAreaRegion,
} from "@/lib/service-area-cities";

const ServiceAreaInteractiveMap = dynamic(
  () =>
    import("./service-area-interactive-map").then((mod) => mod.ServiceAreaInteractiveMap),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 animate-pulse bg-[#F7F5F0]" aria-hidden />,
  },
);

const cityButtonClass = (isActive: boolean) =>
  `shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-crimson ${
    isActive
      ? "border-zen-crimson bg-zen-crimson text-white shadow-[0_4px_14px_rgba(18,84,155,0.28)]"
      : "border-zen-espresso bg-transparent text-zen-espresso hover:border-zen-crimson hover:bg-zen-crimson hover:text-white"
  }`;

function RegionToggle({
  region,
  onRegionChange,
  className = "",
}: {
  region: ServiceAreaRegion;
  onRegionChange: (region: ServiceAreaRegion) => void;
  className?: string;
}) {
  return (
    <div
      className={`service-area-region-toggle ${className}`.trim()}
      role="group"
      aria-label="Select service area region"
    >
      {SERVICE_AREA_REGIONS.map(({ id, label }) => {
        const isActive = region === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onRegionChange(id)}
            className="service-area-region-toggle__option"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function ServiceAreaCityButtons({
  cities,
  activeCityId,
  onSelect,
  className = "",
  layout = "mobile",
}: {
  cities: ServiceAreaCity[];
  activeCityId: string;
  onSelect: (cityId: string) => void;
  className?: string;
  layout?: "mobile" | "desktop";
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 sm:gap-2.5 ${
        layout === "mobile" ? "justify-center lg:max-w-4xl lg:gap-x-3 lg:gap-y-2.5" : "justify-center gap-2"
      } ${className}`.trim()}
      role="group"
      aria-label="Select a service area city"
    >
      {cities.map((city) => {
        const isActive = city.id === activeCityId;
        return (
          <button
            key={city.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(city.id)}
            className={`${cityButtonClass(isActive)} ${
              layout === "mobile" ? "lg:basis-[calc(20%-0.6rem)] lg:max-w-[11.5rem]" : ""
            }`}
          >
            {city.label}
          </button>
        );
      })}
    </div>
  );
}

export function ServiceAreaSectionAlt() {
  const { copy } = useHomeContent();
  const [region, setRegion] = useState<ServiceAreaRegion>(DEFAULT_SERVICE_AREA_REGION);
  const [activeCityId, setActiveCityId] = useState(
    DEFAULT_SERVICE_AREA_CITY_BY_REGION[DEFAULT_SERVICE_AREA_REGION],
  );
  const { ref, animateClass } = useHomeScrollReveal({ threshold: 0.08 });

  const cities = useMemo(() => getCitiesForRegion(region), [region]);

  const regionDescription =
    region === "idaho" ? copy.serviceAreaDescriptionIdaho : copy.serviceAreaDescriptionArizona;

  const handleRegionChange = useCallback((nextRegion: ServiceAreaRegion) => {
    setRegion(nextRegion);
    setActiveCityId(DEFAULT_SERVICE_AREA_CITY_BY_REGION[nextRegion]);
  }, []);

  return (
    <section
      ref={ref}
      id="service-areas"
      className={`home-section-viewport relative w-full overflow-hidden bg-zen-rice text-zen-espresso lg:min-h-[118dvh] lg:py-12 xl:min-h-[122dvh] xl:py-16 2xl:min-h-[125dvh] 2xl:py-20 ${animateClass}`}
      aria-label="Service areas map"
    >
      <div className="absolute inset-0 z-0 min-h-[min(104dvh,56rem)] sm:min-h-[min(96dvh,58rem)] lg:min-h-[118dvh] xl:min-h-[122dvh] 2xl:min-h-[125dvh]">
        <div className="service-area-map-layer service-area-map-layer--dark absolute inset-0">
          <ServiceAreaInteractiveMap activeCityId={activeCityId} region={region} />
        </div>
      </div>

      <div
        className="service-area-top-fade pointer-events-none absolute inset-x-0 top-0 z-20 h-[min(24rem,48%)] min-h-[12rem] sm:min-h-[14rem] lg:h-[min(15rem,24%)] lg:min-h-[10rem]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[38%] min-h-[11rem] bg-gradient-to-t from-zen-rice from-40% via-zen-rice/92 via-70% to-transparent sm:min-h-[12rem] lg:h-[min(18rem,30%)] lg:min-h-[11rem]"
        aria-hidden
      />

      {/* Mobile / tablet overlays */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center px-4 pt-10 text-center sm:px-6 sm:pt-14 md:pt-16 lg:hidden">
        <div className="home-reveal home-reveal-d1 max-w-4xl px-4 py-1 sm:px-6">
          <h2 className="font-heading text-4xl font-bold leading-[1.12] tracking-tight text-zen-espresso [text-shadow:0_0_24px_#f7f5f1,0_0_10px_#f7f5f1] sm:text-5xl md:text-[2.875rem]">
            {highlightTextPhrase(copy.serviceAreaHeading, /Boise (&|and) Scottsdale/i)}
          </h2>
          <div className="home-reveal home-reveal-d2 pointer-events-auto mt-5 flex justify-center">
            <RegionToggle region={region} onRegionChange={handleRegionChange} />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-8 pt-6 text-center sm:px-6 sm:pb-10 md:pb-12 lg:hidden">
        <div className="home-reveal home-reveal-d2 pointer-events-auto mx-auto w-full max-w-3xl">
          <ServiceAreaCityButtons
            cities={cities}
            activeCityId={activeCityId}
            onSelect={setActiveCityId}
            layout="mobile"
          />
        </div>
      </div>

      <div
        className="relative z-10 min-h-[min(104dvh,56rem)] w-full sm:min-h-[min(96dvh,58rem)] lg:hidden"
        aria-hidden
      />

      {/* Laptop / desktop overlays */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden justify-center px-6 pt-10 text-center lg:flex lg:pt-16 xl:px-8 xl:pt-20 2xl:pt-24">
        <div className="home-reveal home-reveal-d1 flex max-w-4xl flex-col items-center">
          <p className="section-eyebrow">{copy.serviceAreaEyebrow}</p>
          <h2 className="mx-auto mt-2 max-w-3xl font-heading text-[2rem] font-bold leading-[1.12] tracking-tight text-zen-espresso [text-shadow:0_0_24px_#f7f5f1,0_0_10px_#f7f5f1] xl:text-4xl 2xl:text-[2.875rem]">
            {highlightTextPhrase(copy.serviceAreaHeading, /Boise (&|and) Scottsdale/i)}
          </h2>
          {copy.serviceAreaSubheading ? (
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-zen-taupe">
              {copy.serviceAreaSubheading}
            </p>
          ) : null}
          <div className="home-reveal home-reveal-d2 pointer-events-auto mt-4 flex justify-center">
            <RegionToggle region={region} onRegionChange={handleRegionChange} />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden justify-center px-6 pb-6 pt-4 text-center lg:flex lg:pb-12 xl:px-8 xl:pb-16 2xl:pb-20">
        <div className="home-reveal home-reveal-d3 pointer-events-auto mx-auto w-full max-w-4xl">
          <p className="mx-auto mb-4 max-w-2xl text-sm leading-6 text-zen-taupe sm:text-base">
            {regionDescription}
          </p>
          <ServiceAreaCityButtons
            cities={cities}
            activeCityId={activeCityId}
            onSelect={setActiveCityId}
            layout="mobile"
          />
        </div>
      </div>

      <div className="relative z-10 hidden min-h-[118dvh] w-full lg:block xl:min-h-[122dvh] 2xl:min-h-[125dvh]" aria-hidden />
    </section>
  );
}

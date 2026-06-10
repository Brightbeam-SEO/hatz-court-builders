"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import {
  DEFAULT_SERVICE_AREA_CITY_ID,
  SERVICE_AREA_CITIES,
} from "@/lib/service-area-cities";

const ServiceAreaInteractiveMap = dynamic(
  () =>
    import("./service-area-interactive-map").then((mod) => mod.ServiceAreaInteractiveMap),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 animate-pulse bg-zen-rice" aria-hidden />,
  },
);

export function ServiceAreaSectionAlt() {
  const [activeCityId, setActiveCityId] = useState(DEFAULT_SERVICE_AREA_CITY_ID);
  const { ref, animateClass } = useHomeScrollReveal({ threshold: 0.08 });

  return (
    <section
      ref={ref}
      id="service-areas"
      className={`home-section-viewport relative w-full overflow-hidden bg-zen-rice text-zen-espresso lg:min-h-[108dvh] xl:min-h-[112dvh] 2xl:min-h-[115dvh] ${animateClass}`}
      aria-label="Service areas map"
    >
      <div className="absolute inset-0 z-0 min-h-[min(100dvh,52rem)] sm:min-h-[min(92dvh,56rem)] lg:min-h-[108dvh] xl:min-h-[112dvh] 2xl:min-h-[115dvh]">
        <div className="service-area-map-layer service-area-map-layer--dark absolute inset-0">
          <ServiceAreaInteractiveMap activeCityId={activeCityId} />
        </div>
      </div>

      <div
        className="service-area-top-fade pointer-events-none absolute inset-x-0 top-0 z-20 h-[min(26rem,52%)] min-h-[14rem] sm:min-h-[16rem] lg:h-[min(28rem,46%)] lg:min-h-[18rem] xl:min-h-[20rem]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[44%] min-h-[12rem] bg-gradient-to-t from-zen-rice from-40% via-zen-rice/92 via-70% to-transparent sm:min-h-[14rem] lg:h-[32%] lg:min-h-0"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center px-4 pt-10 text-center sm:px-6 sm:pt-14 md:pt-16 lg:pt-28 xl:pt-32 2xl:pt-36">
        <div className="home-reveal home-reveal-d1 max-w-4xl px-4 py-1 sm:px-6">
          <h2 className="font-heading text-3xl font-bold leading-[1.12] tracking-tight text-zen-espresso [text-shadow:0_0_24px_#f7f5f1,0_0_10px_#f7f5f1] sm:text-4xl md:text-[2.5rem]">
            Property Management Services{" "}
            <span className="text-zen-crimson">Throughout Meridian &amp; the Treasure Valley</span>
          </h2>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-8 pt-6 text-center sm:px-6 sm:pb-10 md:pb-12 lg:pb-14">
        <div
          className="home-reveal home-reveal-d2 pointer-events-auto mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-2.5 lg:max-w-4xl lg:gap-x-3 lg:gap-y-2.5"
          role="group"
          aria-label="Select a service area city"
        >
          {SERVICE_AREA_CITIES.map((city) => {
            const isActive = city.id === activeCityId;
            return (
              <button
                key={city.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCityId(city.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-crimson lg:basis-[calc(20%-0.6rem)] lg:max-w-[11.5rem] ${
                  isActive
                    ? "border-zen-crimson bg-zen-crimson text-white shadow-[0_4px_14px_rgba(18,84,155,0.28)]"
                    : "border-zen-espresso bg-transparent text-zen-espresso hover:border-zen-crimson hover:bg-zen-crimson hover:text-white"
                }`}
              >
                {city.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="relative z-10 min-h-[min(100dvh,52rem)] w-full sm:min-h-[min(92dvh,56rem)] lg:min-h-[108dvh] xl:min-h-[112dvh] 2xl:min-h-[115dvh]"
        aria-hidden
      />
    </section>
  );
}

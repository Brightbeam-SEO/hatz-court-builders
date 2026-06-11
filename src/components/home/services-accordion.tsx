"use client";

import { HcbImage } from "@/components/ui/hcb-image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import {
  HOME_SERVICES_ACCORDION,
  type HomeServiceAccordionItem,
} from "@/lib/home-services-accordion";
import { useHomeContent } from "./home-content-context";

const PANEL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const PANEL_MS = 640;
const DEFAULT_OPEN_SERVICE_ID = HOME_SERVICES_ACCORDION[0]?.id ?? null;

function ServiceAccordionRow({
  service,
  index,
  isOpen,
  onToggle,
  exploreLabel,
}: {
  service: HomeServiceAccordionItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  exploreLabel: string;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <li className="services-card-reveal border-b border-white/30">
      <button
        type="button"
        className="flex w-full items-baseline gap-3 py-6 text-left sm:gap-4 sm:py-8 lg:pl-10 xl:pl-14"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="shrink-0 font-heading text-sm font-semibold tabular-nums tracking-wide text-white/45 sm:text-base">
          {number}
        </span>
        <span
          className={`min-w-0 font-heading text-lg font-bold leading-snug sm:text-xl md:text-2xl ${
            isOpen ? "text-white" : "text-white/90"
          }`}
        >
          {service.name}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] ${isOpen ? "grid-rows-[minmax(0,1fr)]" : "grid-rows-[0fr]"}`}
        style={{
          transitionDuration: `${PANEL_MS}ms`,
          transitionTimingFunction: PANEL_EASE,
        }}
      >
        <div className="overflow-hidden">
          <div
            className="flex flex-row items-start gap-4 pb-6 pl-7 sm:gap-6 sm:pb-8 sm:pl-9 md:gap-6 md:pb-10 md:pl-10 lg:pl-[4.75rem] xl:pl-[5.75rem]"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: `opacity ${PANEL_MS}ms ${PANEL_EASE}`,
            }}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-7 text-white/78 sm:text-base">{service.description}</p>
              <Link
                href={service.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-white underline underline-offset-4 transition hover:text-white/80 sm:mt-5"
                tabIndex={isOpen ? 0 : -1}
              >
                {exploreLabel}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10 sm:h-32 sm:w-40 lg:h-36 lg:w-48">
              <HcbImage
                src={service.image}
                alt={gpmImageAlt(service.image)}
                fill
                sizes="(min-width: 1024px) 240px, (min-width: 640px) 200px, 180px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function ServicesAccordion() {
  const { copy } = useHomeContent();
  const [openId, setOpenId] = useState<string | null>(DEFAULT_OPEN_SERVICE_ID);

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <div className="lg:border-l lg:border-white/30">
      <ol className="list-none border-t border-white/30 p-0">
        {HOME_SERVICES_ACCORDION.map((service, index) => (
          <ServiceAccordionRow
            key={service.id}
            service={service}
            index={index}
            isOpen={openId === service.id}
            onToggle={() => toggle(service.id)}
            exploreLabel={copy.servicesExploreLabel}
          />
        ))}
      </ol>
    </div>
  );
}

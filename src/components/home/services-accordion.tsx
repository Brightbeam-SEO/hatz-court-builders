"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  HOME_SERVICES_ACCORDION,
  splitServiceAccordionTitle,
  type HomeServiceAccordionItem,
} from "@/lib/home-services-accordion";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";

const PANEL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const PANEL_MS = 1080;
const TITLE_MS = 1000;

const titleTextClass =
  "font-heading text-xl font-bold leading-[1.05] tracking-tight text-white sm:text-2xl md:text-3xl lg:text-[2.35rem]";

function ServiceAccordionRow({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: HomeServiceAccordionItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [titleLead, titleTail] = splitServiceAccordionTitle(service.name);
  const number = String(index + 1).padStart(2, "0");
  const hasTail = Boolean(titleTail.trim());

  return (
    <li className="border-b border-white/12">
      <button
        type="button"
        className="services-card-reveal relative flex w-full min-h-[4.25rem] items-center justify-center px-12 py-5 sm:min-h-[4.75rem] sm:px-16 sm:py-6 md:min-h-[5.25rem] md:py-7"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="absolute left-0 top-1/2 -translate-y-1/2 font-heading text-sm font-semibold tracking-wide text-white/45 sm:text-base">
          {number}
        </span>

        {/* Mobile / tablet: full title stays together (no split-around-photo layout) */}
        <span
          className={`pointer-events-none block max-w-[min(100%,34rem)] text-balance text-center ${titleTextClass} lg:hidden`}
        >
          {service.name}
        </span>

        {/* Desktop: title splits around photo when open */}
        <span
          className={`pointer-events-none hidden max-w-[min(100%,34rem)] flex-nowrap items-center justify-center lg:flex ${titleTextClass}`}
          style={{
            gap: isOpen ? "clamp(0.65rem, 2vw, 1.25rem)" : 0,
            transition: `gap ${TITLE_MS}ms ${PANEL_EASE}`,
          }}
        >
          <span
            className="shrink-0"
            style={{
              transform: isOpen ? "translateX(-0.65rem)" : "translateX(0)",
              transition: `transform ${TITLE_MS}ms ${PANEL_EASE}`,
            }}
          >
            {titleLead}
          </span>

          <span
            className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${
              isOpen ? "border border-white/20 bg-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.35)]" : "border-0 bg-transparent shadow-none"
            }`}
            style={{
              width: isOpen ? "clamp(4.5rem, 14vw, 7rem)" : 0,
              height: isOpen ? "clamp(2.75rem, 8vw, 4rem)" : 0,
              margin: 0,
              padding: 0,
              transform: isOpen ? "scale(1)" : "scale(0.92)",
              transition: `width ${TITLE_MS}ms ${PANEL_EASE}, height ${TITLE_MS}ms ${PANEL_EASE}, transform ${TITLE_MS}ms ${PANEL_EASE}, border-color ${TITLE_MS}ms ${PANEL_EASE}`,
            }}
            aria-hidden={!isOpen}
          >
            <Image
              src={service.image}
              alt={gpmImageAlt(service.image)}
              fill
              sizes="112px"
              className="object-cover"
              style={{
                opacity: isOpen ? 1 : 0,
                transition: `opacity ${TITLE_MS}ms ${PANEL_EASE} 120ms`,
              }}
            />
          </span>

          {hasTail ? (
            <span
              className="shrink-0"
              style={{
                marginLeft: isOpen ? 0 : "0.28em",
                transform: isOpen ? "translateX(0.65rem)" : "translateX(0)",
                transition: `margin ${TITLE_MS}ms ${PANEL_EASE}, transform ${TITLE_MS}ms ${PANEL_EASE}`,
              }}
            >
              {titleTail}
            </span>
          ) : null}
        </span>

        <Link
          href={service.href}
          className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-xs font-medium tracking-wide text-white/55 transition hover:text-white sm:text-sm lg:inline"
          onClick={(event) => event.stopPropagation()}
        >
          Learn more
        </Link>
      </button>

      <div
        className={`grid transition-[grid-template-rows] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        style={{
          transitionDuration: `${PANEL_MS}ms`,
          transitionTimingFunction: PANEL_EASE,
        }}
      >
        <div className="overflow-hidden">
          <div
            className="px-2 pb-8 pt-1 text-center sm:px-4 sm:pb-10 md:pb-12"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: `opacity ${TITLE_MS}ms ${PANEL_EASE} ${isOpen ? "200ms" : "0ms"}`,
            }}
          >
            <p
              className="mx-auto max-w-xl text-pretty text-sm leading-7 text-white/78 sm:text-base"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(0.65rem)",
                transition: `opacity ${TITLE_MS}ms ${PANEL_EASE} 240ms, transform ${TITLE_MS}ms ${PANEL_EASE} 240ms`,
              }}
            >
              {service.description}
            </p>

            <Link
              className="btn-call mt-6 inline-flex sm:mt-8"
              href={service.href}
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0) scale(1)" : "translateY(0.5rem) scale(0.98)",
                transition: `opacity ${TITLE_MS}ms ${PANEL_EASE} 340ms, transform ${TITLE_MS}ms ${PANEL_EASE} 340ms`,
                pointerEvents: isOpen ? "auto" : "none",
              }}
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export function ServicesAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <div className="mt-12 border-t border-white/12 sm:mt-14 md:mt-16">
      <ul className="list-none p-0">
        {HOME_SERVICES_ACCORDION.map((service, index) => (
          <ServiceAccordionRow
            key={service.id}
            service={service}
            index={index}
            isOpen={openId === service.id}
            onToggle={() => toggle(service.id)}
          />
        ))}
      </ul>
    </div>
  );
}

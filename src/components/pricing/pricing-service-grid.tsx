"use client";

import Image from "next/image";
import { useHomeContent } from "@/components/home/home-content-context";
import {
  pricingCategories,
  type PricingCategory,
  type PricingServiceGroup,
} from "./site-data";

const PRICING_CARD_SURFACE =
  "rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md light:border-slate-200 light:bg-white/90";

const PRICING_CARD_TITLE = "font-heading font-bold text-white light:text-zen-espresso";
const PRICING_CARD_BODY = "text-white/85 light:text-zen-espresso/88";
const PRICING_CARD_MUTED = "text-white/70 light:text-zen-taupe";
const PRICING_CARD_DIVIDER = "border-white/20 light:border-slate-200";

const PRICING_PILL =
  "rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-medium text-white/90 light:border-slate-200 light:bg-zen-rice light:text-zen-espresso/88";

const PRICING_CARD_IMAGE =
  "relative h-[7.5rem] w-[7.5rem] shrink-0 overflow-hidden rounded-full ring-4 ring-zen-crimson shadow-[0_8px_24px_rgba(21, 21, 21,0.2)] sm:h-32 sm:w-32";

function useServiceImage(serviceName?: string) {
  const { servicesCarousel } = useHomeContent();
  if (!serviceName) return undefined;
  return servicesCarousel.find((s) => s.name === serviceName)?.image;
}

function PricingLineList({ items }: { items: PricingServiceGroup["items"] }) {
  return (
    <ul className={`mt-5 w-full space-y-2.5 border-t pt-4 ${PRICING_CARD_DIVIDER}`}>
      {items.map((item) => (
        <li
          key={`${item.label}-${item.price}`}
          className="flex items-baseline justify-between gap-3 text-sm leading-snug"
        >
          <span className={`text-left ${PRICING_CARD_BODY}`}>{item.label}</span>
          <span className="shrink-0 font-heading text-sm font-semibold tabular-nums text-zen-sage light:text-zen-crimson">
            {item.price}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PricingServiceCard({ group }: { group: PricingServiceGroup }) {
  const imageSrc = useServiceImage(group.imageServiceName);

  return (
    <article
      className={`flex h-full flex-col items-center px-5 pb-7 pt-9 text-center sm:px-6 sm:pb-8 sm:pt-10 ${PRICING_CARD_SURFACE}`}
    >
      {imageSrc ? (
        <div className={PRICING_CARD_IMAGE}>
          <Image
            src={imageSrc}
            alt={`${group.title} — Zen Day Spa Eagle`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 30vw, 128px"
          />
        </div>
      ) : null}
      <div className={imageSrc ? "mt-5 w-full" : "w-full"}>
        <h3 className={`text-lg leading-snug sm:text-xl ${PRICING_CARD_TITLE}`}>{group.title}</h3>
        {group.subtitle ? (
          <p className={`mt-1 text-sm font-medium ${PRICING_CARD_MUTED}`}>{group.subtitle}</p>
        ) : null}
        <PricingLineList items={group.items} />
        {group.includes?.length ? (
          <div className={`mt-5 w-full border-t pt-4 text-left ${PRICING_CARD_DIVIDER}`}>
            <p className={`text-sm font-semibold ${PRICING_CARD_TITLE}`}>Includes:</p>
            <ul className="mt-2 space-y-1.5">
              {group.includes.map((item) => (
                <li key={item} className={`text-sm leading-relaxed ${PRICING_CARD_BODY}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function SpecialPricingList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className={`text-sm leading-relaxed ${PRICING_CARD_BODY}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function SpecialPricingCard({ category }: { category: Extract<PricingCategory, { layout: "special" }> }) {
  const { special } = category;
  const imageSrc = useServiceImage(special.imageServiceName);

  return (
    <article
      className={`flex h-full flex-col items-center px-5 pb-7 pt-9 text-center sm:px-6 sm:pb-8 sm:pt-10 ${PRICING_CARD_SURFACE}`}
    >
      {imageSrc ? (
        <div className={PRICING_CARD_IMAGE}>
          <Image
            src={imageSrc}
            alt={`${special.cardTitle} — Zen Day Spa Eagle`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 30vw, 128px"
          />
        </div>
      ) : null}
      <div className={`w-full ${imageSrc ? "mt-5" : ""}`}>
        <p className="font-heading text-base font-semibold text-zen-sage light:text-zen-crimson sm:text-lg">
          {special.offerPrice}
        </p>
        <h3 className={`mt-3 text-xl sm:text-2xl ${PRICING_CARD_TITLE}`}>{special.cardTitle}</h3>
        <SpecialPricingList items={special.massageTypes} />

        <div className={`mt-8 border-t pt-6 ${PRICING_CARD_DIVIDER}`}>
          <p className={`text-base font-semibold ${PRICING_CARD_TITLE}`}>{special.freeAddOnTitle}</p>
          <SpecialPricingList items={special.freeAddOns} />
        </div>

        <div className={`mt-8 border-t pt-6 ${PRICING_CARD_DIVIDER}`}>
          <p className={`text-base font-semibold ${PRICING_CARD_TITLE}`}>{special.addOnTitle}</p>
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            {special.addOns.map((item) => (
              <li key={item} className={PRICING_PILL}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function PricingCategorySection({ category }: { category: PricingCategory }) {
  return (
    <section className="min-w-0 space-y-6">
      <h2 className="font-heading text-2xl font-bold tracking-tight text-white light:text-zen-espresso sm:text-3xl">
        {category.title}
      </h2>
      {category.layout === "special" ? (
        <SpecialPricingCard category={category} />
      ) : (
        <div
          className={
            category.groups.length === 1
              ? "grid grid-cols-1"
              : "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
          }
        >
          {category.groups.map((group) => (
            <PricingServiceCard key={group.title} group={group} />
          ))}
        </div>
      )}
    </section>
  );
}

export function PricingServiceGrid() {
  const massageCategory = pricingCategories.find((c) => c.title === "Massage Services");
  const specialCategory = pricingCategories.find((c) => c.layout === "special");
  const headSpaCategory = pricingCategories.find((c) => c.title === "The Head Spa");

  return (
    <div className="space-y-12 sm:space-y-14">
      {massageCategory ? <PricingCategorySection category={massageCategory} /> : null}

      {specialCategory && headSpaCategory ? (
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <PricingCategorySection category={specialCategory} />
          <PricingCategorySection category={headSpaCategory} />
        </div>
      ) : (
        <>
          {specialCategory ? <PricingCategorySection category={specialCategory} /> : null}
          {headSpaCategory ? <PricingCategorySection category={headSpaCategory} /> : null}
        </>
      )}
    </div>
  );
}

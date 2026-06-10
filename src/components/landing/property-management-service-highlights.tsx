import Image from "next/image";
import { SunsetCheckBullet } from "@/components/sunset-check-bullet";
import type { PropertyManagementServiceHighlight } from "@/lib/property-management-service-highlights";

const overlayClass: Record<PropertyManagementServiceHighlight["variant"], string> = {
  green: "bg-zen-crimson/80",
  dark: "bg-zen-espresso/82",
  light: "bg-white/78",
};

const textClass: Record<PropertyManagementServiceHighlight["variant"], string> = {
  green: "text-white",
  dark: "text-white",
  light: "text-zen-espresso",
};

const listTextClass: Record<PropertyManagementServiceHighlight["variant"], string> = {
  green: "text-white/92",
  dark: "text-white/90",
  light: "text-zen-taupe",
};

function ServiceHighlightCard({ card }: { card: PropertyManagementServiceHighlight }) {
  return (
    <article className="relative min-h-[17rem] overflow-hidden rounded-3xl sm:min-h-[18rem]">
      <Image
        src={card.imageSrc}
        alt={card.imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 72rem"
      />
      <div className={`absolute inset-0 ${overlayClass[card.variant]}`} aria-hidden />
      <div className={`relative z-10 flex h-full flex-col justify-center p-8 sm:p-10 md:p-12`}>
        <h3
          className={`font-heading text-2xl font-bold leading-tight sm:text-3xl md:text-[2rem] ${textClass[card.variant]}`}
        >
          {card.title}
        </h3>
        <ul className="mt-6 space-y-3 sm:mt-7">
          {card.items.map((item) => (
            <li
              key={item}
              className={`flex items-start gap-3 text-base leading-7 sm:text-lg sm:leading-8 ${listTextClass[card.variant]}`}
            >
              <SunsetCheckBullet variant="crimson" />
              <span className="min-w-0 flex-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function PropertyManagementServiceHighlights({
  cards,
  className = "",
}: {
  cards: readonly PropertyManagementServiceHighlight[];
  className?: string;
}) {
  if (cards.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 gap-6 sm:gap-8 ${className}`.trim()}>
      {cards.map((card) => (
        <ServiceHighlightCard key={card.title} card={card} />
      ))}
    </div>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import { HcbImage } from "@/components/ui/hcb-image";
import { Marquee } from "@/components/ui/marquee";
import { whyChooseUs } from "@/components/home/site-data";
import { useHomeContent } from "@/components/home/home-content-context";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";
import { cn } from "@/lib/utils";
import { highlightTextPhrase } from "@/lib/highlight-text";

const FEATURE_PHOTOS = [
  gpmPick("outdoor multi court acrylic surfacing"),
  gpmPick("pickleball post tension concrete commercial court"),
  gpmPick("indoor batting cage turf installation"),
  gpmPick("backyard modular tile sport court custom logo"),
] as const;

function splitMarqueeRows<T>(items: readonly T[]): [T[], T[], T[]] {
  const third = Math.ceil(items.length / 3);
  return [items.slice(0, third), items.slice(third, third * 2), items.slice(third * 2)];
}

export function VercepFeatureSection({ className }: { className?: string }) {
  const { copy } = useHomeContent();
  const marqueeItems = copy.closingShowcaseBullets;
  const [m1, m2, m3] = splitMarqueeRows(marqueeItems);

  return (
    <section className={cn("relative bg-transparent pt-4 text-zen-espresso sm:pt-8 md:pt-10", className)}>
      <div className="mx-auto max-w-full">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-4 px-5 text-center md:px-10">
          <p className="section-eyebrow">{copy.closingShowcaseEyebrow}</p>
          <h2 className="max-w-3xl font-heading text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {highlightTextPhrase(copy.closingShowcaseHeading, "One-Stop Court Builder")}
          </h2>
          {copy.closingShowcaseBody.trim() ? (
            <p className="max-w-xl text-base leading-relaxed text-zen-taupe md:text-lg">
              {copy.closingShowcaseBody}
            </p>
          ) : null}

          {marqueeItems.length > 0 ? (
            <div className="relative mx-auto max-w-3xl overflow-hidden">
              <div className="absolute left-0 z-10 h-full w-16 bg-linear-to-r from-zen-rice to-transparent sm:w-20" />
              <div className="absolute right-0 z-10 h-full w-16 bg-linear-to-l from-zen-rice to-transparent sm:w-20" />

              <div className="-mx-6 flex w-screen flex-col md:-mx-10 lg:-mx-16">
                <Marquee className="[--duration:45s] [--gap:0.75rem]" repeat={4}>
                  {m1.map((label) => (
                    <Badge
                      key={label}
                      className="rounded-none border-zen-sand bg-zen-sand/80 px-3 py-1 text-zen-espresso"
                      size="lg"
                      variant="outline"
                    >
                      {label}
                    </Badge>
                  ))}
                </Marquee>

                <Marquee className="[--duration:50s] [--gap:0.75rem]" repeat={4} reverse>
                  {m2.map((label) => (
                    <Badge
                      key={label}
                      className="rounded-none border-zen-sand bg-zen-sand/80 px-3 py-1 text-zen-espresso"
                      size="lg"
                      variant="outline"
                    >
                      {label}
                    </Badge>
                  ))}
                </Marquee>

                <Marquee className="[--duration:42s] [--gap:0.75rem]" repeat={4}>
                  {m3.map((label) => (
                    <Badge
                      key={label}
                      className="rounded-none border-zen-sand bg-zen-sand/80 px-3 py-1 text-zen-espresso"
                      size="lg"
                      variant="outline"
                    >
                      {label}
                    </Badge>
                  ))}
                </Marquee>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px border-t border-zen-sand bg-zen-sand sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.slice(0, 4).map((feature, index) => {
            const photo = FEATURE_PHOTOS[index] ?? FEATURE_PHOTOS[0];
            return (
              <div
                key={feature.title}
                className="flex flex-col bg-zen-rice px-5 py-8 lg:px-6 lg:py-10"
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-zen-sand/40 shadow-[0_2px_8px_rgba(21,21,21,0.06)] ring-1 ring-black/[0.04] sm:size-[5.5rem]">
                  <HcbImage
                    src={photo}
                    alt={gpmImageAlt(photo)}
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </div>

                <div className="mt-8 flex flex-col gap-2 sm:mt-10">
                  <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">{feature.title}</h3>
                  <p className="leading-relaxed text-zen-taupe">{feature.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Placeholder export from the integration template. */
export const Component = VercepFeatureSection;

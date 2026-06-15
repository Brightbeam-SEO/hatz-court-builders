"use client";

import { useEffect, useState, type ReactNode } from "react";
import { HcbImage } from "@/components/ui/hcb-image";
import { HomeActionButtons } from "@/components/home/home-action-buttons";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";

const introImageClass =
  "overflow-hidden rounded-[1.75rem] bg-zen-sand/40 shadow-[0_16px_40px_rgba(15,23,42,0.12)] ring-1 ring-black/5";

type LocalIntroSectionProps = {
  eyebrow: ReactNode;
  heading: ReactNode;
  body: ReactNode;
  actionButtonsClassName?: string;
  actionButtonsSecondaryClassName?: string;
  leftImageSrc: string;
  leftImageAlt: string;
  rightImageSrc: string;
  rightImageAlt: string;
  rightCarouselImages: readonly string[];
};

const DESKTOP_CAROUSEL_MS = 3000;

function LocalIntroDesktopImageCarousel({ images }: { images: readonly string[] }) {
  const mounted = useHasMounted();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselImages = mounted ? images : images.slice(0, 1);

  useEffect(() => {
    if (!mounted || images.length <= 1) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, DESKTOP_CAROUSEL_MS);

    return () => window.clearInterval(timer);
  }, [images, mounted]);

  return (
    <div className="flex w-full items-center gap-3 xl:gap-4">
      <div className={`relative aspect-[4/3] min-w-0 flex-1 ${introImageClass}`}>
        {carouselImages.map((src, index) => (
          <HcbImage
            key={src}
            src={src}
            alt={index === activeIndex ? gpmImageAlt(src) : ""}
            fill
            sizes="(min-width: 1280px) 42rem, (min-width: 1024px) 50vw, 100vw"
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              !mounted || index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
            aria-hidden={mounted ? index !== activeIndex : false}
          />
        ))}
      </div>

      {mounted ? (
        <div
          className="flex shrink-0 flex-col items-center justify-center gap-2.5 py-2"
          role="tablist"
          aria-label={`Court project photo ${activeIndex + 1} of ${images.length}`}
        >
          {images.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show photo ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                  isActive ? "bg-zen-crimson" : "bg-zen-sand hover:bg-zen-taupe/60"
                }`}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex shrink-0 flex-col items-center justify-center gap-2.5 py-2" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-zen-crimson" />
        </div>
      )}
    </div>
  );
}

function LocalIntroMobileImageCollage({
  leftImageSrc,
  leftImageAlt,
  rightImageSrc,
  rightImageAlt,
}: Pick<LocalIntroSectionProps, "leftImageSrc" | "leftImageAlt" | "rightImageSrc" | "rightImageAlt">) {
  return (
    <div className="home-reveal home-reveal-d2 relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] md:max-w-[34rem]">
      <div className="relative min-h-[17rem] w-full pb-6 pr-4 sm:min-h-[19rem] sm:pb-8 sm:pr-5 md:min-h-[22rem] md:pb-10 md:pr-6">
        <div
          className={`absolute left-0 top-0 z-10 w-[64%] aspect-square sm:w-[62%] md:w-[58%] ${introImageClass}`}
        >
          <HcbImage
            src={leftImageSrc}
            alt={leftImageAlt}
            fill
            sizes="(min-width: 768px) 320px, (min-width: 640px) 280px, 70vw"
            className="object-cover"
          />
        </div>
        <div
          className={`absolute bottom-0 right-0 z-20 w-[58%] aspect-square translate-x-[10%] translate-y-[12%] sm:w-[56%] sm:translate-x-[12%] sm:translate-y-[14%] md:w-[54%] md:translate-x-[14%] md:translate-y-[16%] ${introImageClass}`}
        >
          <HcbImage
            src={rightImageSrc}
            alt={rightImageAlt}
            fill
            sizes="(min-width: 768px) 300px, (min-width: 640px) 260px, 65vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export function LocalIntroSection({
  eyebrow,
  heading,
  body,
  actionButtonsClassName = "",
  actionButtonsSecondaryClassName = "",
  leftImageSrc,
  leftImageAlt,
  rightImageSrc,
  rightImageAlt,
  rightCarouselImages,
}: LocalIntroSectionProps) {
  const { ref, revealed, animateClass } = useHomeScrollReveal();

  return (
    <section
      ref={ref}
      className={`home-section-viewport relative z-10 overflow-x-clip border-0 border-transparent bg-zen-rice py-20 text-zen-espresso md:py-28 lg:py-32 [border-image:none] ${animateClass}`}
    >
      <div className="shell relative z-10">
        <div className="relative mx-auto w-full max-w-6xl pb-2 pt-2 md:pb-4 md:pt-4 lg:pb-4 lg:pt-6">
          <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-stretch lg:gap-x-8 xl:gap-x-10">
            <div className="order-1 w-full text-center max-lg:mx-auto max-lg:max-w-2xl lg:hidden">
              <div
                className={`local-intro-stack flex w-full flex-col items-center${revealed ? " local-intro-stack--in-view" : ""}`}
              >
                {eyebrow}
                {heading}
              </div>
            </div>

            <div className="hidden lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:flex lg:min-h-0 lg:flex-col lg:text-right">
              <div
                className={`local-intro-stack flex w-full flex-col items-end${revealed ? " local-intro-stack--in-view" : ""}`}
              >
                {eyebrow}
                {heading}
              </div>
              <div className="home-reveal home-reveal-right home-reveal-d4 mt-auto w-full max-w-none pt-6 xl:pt-8">
                <LocalIntroDesktopImageCarousel images={rightCarouselImages} />
              </div>
            </div>

            <div className="order-2 lg:hidden">
              <LocalIntroMobileImageCollage
                leftImageSrc={leftImageSrc}
                leftImageAlt={leftImageAlt}
                rightImageSrc={rightImageSrc}
                rightImageAlt={rightImageAlt}
              />
            </div>

            <div className="order-3 flex w-full flex-col max-lg:mx-auto max-lg:mt-6 max-lg:max-w-2xl sm:max-lg:mt-8 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:mt-0 lg:max-w-[19rem] lg:self-stretch xl:max-w-[22rem]">
              <div className="home-reveal home-reveal-left home-reveal-d1 hidden shrink-0 lg:block">
                <div className={`relative aspect-[5/4] w-full ${introImageClass}`}>
                  <HcbImage
                    src={leftImageSrc}
                    alt={leftImageAlt}
                    fill
                    sizes="(min-width: 1280px) 440px, (min-width: 1024px) 380px, 80vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="hidden min-h-0 flex-1 lg:block" aria-hidden="true" />

              <div className="shrink-0 text-center lg:mt-8 lg:text-left xl:mt-10">
                <div
                  className={`local-intro-stack flex w-full flex-col items-center lg:items-start${revealed ? " local-intro-stack--in-view" : ""}`}
                >
                  {body}
                  <HomeActionButtons
                    centered
                    className={`max-lg:items-center max-lg:justify-center lg:items-start lg:justify-start ${actionButtonsClassName}`.trim()}
                    secondaryClassName={actionButtonsSecondaryClassName}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

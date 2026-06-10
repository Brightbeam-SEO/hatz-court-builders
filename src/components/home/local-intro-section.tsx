"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { HomeSectionGridDecor } from "@/components/home/home-section-grid-decor";
import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import { LOCAL_INTRO_CAROUSEL_PATHS } from "@/lib/local-intro-carousel";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";

type ArcPhoto = {
  src: string;
  alt: string;
};

const arcPhotos: ArcPhoto[] = LOCAL_INTRO_CAROUSEL_PATHS.map((src) => ({
  src,
  alt: gpmImageAlt(src),
}));

const ARC_CARD_CLASS =
  "overflow-hidden rounded-2xl bg-zen-crimson shadow-[0_16px_40px_rgba(15,23,42,0.14)] transition-all duration-1000 ease-out";

function useArcCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % arcPhotos.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  const getPosition = (index: number) => {
    const len = arcPhotos.length;
    const rawOffset = index - activeIndex;
    if (rawOffset > len / 2) return rawOffset - len;
    if (rawOffset < -len / 2) return rawOffset + len;
    return rawOffset;
  };

  return { activeIndex, getPosition };
}

function getHorizontalPositionClass(position: number): string {
  if (position === 0) {
    return "z-40 -translate-x-1/2 -translate-y-1/2 scale-100 rotate-0 opacity-100";
  }
  if (position === -1) {
    return "z-30 -translate-x-[118%] -translate-y-1/2 scale-[0.92] rotate-[7deg] opacity-100";
  }
  if (position === 1) {
    return "z-30 translate-x-[18%] -translate-y-1/2 scale-[0.92] -rotate-[7deg] opacity-100";
  }
  if (position === -2) {
    return "z-20 -translate-x-[195%] -translate-y-1/2 scale-[0.84] rotate-[10deg] opacity-100";
  }
  if (position === 2) {
    return "z-20 translate-x-[95%] -translate-y-1/2 scale-[0.84] -rotate-[10deg] opacity-100";
  }
  if (position < -2) {
    return "z-10 -translate-x-[240%] -translate-y-1/2 scale-[0.8] rotate-[12deg] opacity-0";
  }
  return "z-10 translate-x-[140%] -translate-y-1/2 scale-[0.8] -rotate-[12deg] opacity-0";
}

/** Vertical arc (lg+): anchored left, fans right; bottom → top carousel. */
function getVerticalPositionClass(position: number): string {
  if (position === 0) {
    return "z-40 -translate-y-1/2 translate-x-0 scale-100 rotate-0 opacity-100";
  }
  if (position === -1) {
    return "z-30 translate-y-[36%] translate-x-[48%] scale-[0.9] -rotate-[8deg] opacity-100";
  }
  if (position === 1) {
    return "z-30 -translate-y-[136%] translate-x-[48%] scale-[0.9] rotate-[8deg] opacity-100";
  }
  if (position === -2) {
    return "z-20 translate-y-[70%] translate-x-[78%] scale-[0.8] -rotate-[11deg] opacity-100";
  }
  if (position === 2) {
    return "z-20 -translate-y-[170%] translate-x-[78%] scale-[0.8] rotate-[11deg] opacity-100";
  }
  if (position < -2) {
    return "z-10 translate-y-[105%] translate-x-[95%] scale-[0.75] -rotate-[12deg] opacity-0";
  }
  return "z-10 -translate-y-[205%] translate-x-[95%] scale-[0.75] rotate-[12deg] opacity-0";
}

function ArcPhotoCard({
  photo,
  positionClass,
  isVisible,
  sizes,
  cardClassName,
  anchor = "center",
}: {
  photo: ArcPhoto;
  positionClass: string;
  isVisible: boolean;
  sizes: string;
  cardClassName: string;
  anchor?: "center" | "right" | "left";
}) {
  const anchorClass =
    anchor === "right" ? "right-0 top-1/2" : anchor === "left" ? "left-0 top-1/2" : "left-1/2 top-1/2";

  return (
    <div
      className={`absolute ${anchorClass} ${ARC_CARD_CLASS} ${positionClass} ${cardClassName} ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />
      </div>
    </div>
  );
}

function LocalIntroHorizontalArcGallery({ getPosition }: { getPosition: (index: number) => number }) {
  return (
    <div
      className="relative left-1/2 h-[20rem] w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden sm:h-[24rem] lg:hidden"
      aria-label="Court construction project photos"
    >
      {arcPhotos.map((photo, index) => {
        const position = getPosition(index);
        const isVisible = Math.abs(position) <= 2;

        return (
          <ArcPhotoCard
            key={photo.src}
            photo={photo}
            isVisible={isVisible}
            sizes="(max-width: 1024px) 50vw, 10rem"
            positionClass={getHorizontalPositionClass(position)}
            cardClassName="h-[82%] w-auto min-w-[8rem] max-w-[11.5rem] aspect-[10/16] sm:h-[85%] sm:min-w-[9rem] sm:max-w-[13rem]"
          />
        );
      })}
    </div>
  );
}

function LocalIntroVerticalArcGallery({ getPosition }: { getPosition: (index: number) => number }) {
  return (
    <div
      className="relative hidden h-full min-h-[34rem] w-full overflow-visible lg:block xl:min-h-[38rem]"
      aria-label="Court construction project photos"
    >
      {arcPhotos.map((photo, index) => {
        const position = getPosition(index);
        const isVisible = Math.abs(position) <= 2;
        const heightClass =
          position === 0
            ? "h-[min(86%,28rem)] max-h-[28rem] xl:max-h-[30rem]"
            : Math.abs(position) === 1
              ? "h-[min(68%,21rem)] max-h-[21rem] xl:max-h-[22rem]"
              : "h-[min(54%,17rem)] max-h-[17rem] xl:max-h-[18rem]";

        return (
          <ArcPhotoCard
            key={photo.src}
            photo={photo}
            anchor="left"
            isVisible={isVisible}
            sizes="(min-width: 1024px) 42vw, 0px"
            positionClass={getVerticalPositionClass(position)}
            cardClassName={`aspect-[16/10] w-auto max-w-[min(100%,36rem)] ${heightClass}`}
          />
        );
      })}
    </div>
  );
}

function LocalIntroArcGallery() {
  const { getPosition } = useArcCarousel();

  return (
    <>
      <LocalIntroHorizontalArcGallery getPosition={getPosition} />
      <LocalIntroVerticalArcGallery getPosition={getPosition} />
    </>
  );
}

export function LocalIntroSection({ children }: { children: ReactNode }) {
  const { ref, revealed, animateClass } = useHomeScrollReveal();
  return (
    <section
      ref={ref}
      className={`home-section-viewport section-pad relative z-10 overflow-x-clip border-0 border-transparent bg-zen-rice pb-[15px] text-zen-espresso [border-image:none] ${animateClass}`}
    >
      <HomeSectionGridDecor placement="right" />
      <div className="shell relative z-10">
        <div className="relative mx-auto w-full max-w-6xl pb-2 pt-2 md:pb-4 md:pt-4 lg:pb-4 lg:pt-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
            <div className="relative z-20 flex w-full flex-col items-center justify-center px-1 py-6 sm:px-2 sm:py-8 lg:items-start lg:py-10">
              <div
                className={`local-intro-stack w-full text-center lg:text-left${revealed ? " local-intro-stack--in-view" : ""}`}
              >
                {children}
              </div>
            </div>

            <div className="home-reveal home-reveal-right home-reveal-d4 relative z-10 w-full min-w-0 lg:min-h-[34rem] lg:pl-2 xl:min-h-[38rem] xl:pl-4">
              <LocalIntroArcGallery />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

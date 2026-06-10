export const HOME_SECTION_GRID_BG = "/images/local-intro-grid-bg.svg";
/** Brand grid used on the property management gallery band (from GPM art file). */
export const GPM_SECTION_GRID_BG = "/images/gpm-grid-bg.svg";

type GridPlacement =
  | "left"
  | "right"
  | "top-left"
  | "top-left-cards"
  | "top-right"
  | "reviews-featured-right"
  | "gallery-highlights-right"
  | "property-management-gallery-right"
  | "contact-page-form-right"
  | "faq-panel-left"
  | "bottom-left"
  | "bottom-right";

function GridImg({ className, src = HOME_SECTION_GRID_BG }: { className: string; src?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className={className} decoding="async" />
  );
}

export function HomeSectionGridDecor({ placement }: { placement: GridPlacement }) {
  if (placement === "left") {
    return (
      <div
        className="home-section-grid-decor pointer-events-none absolute inset-y-0 left-0 z-[1] flex h-full justify-start pl-0 lg:pl-2"
        aria-hidden
      >
        <GridImg className="h-full w-auto max-w-[min(50vw,20rem)] object-contain object-left sm:max-w-[min(46vw,24rem)] lg:max-w-[min(40vw,28rem)] xl:max-w-[32rem]" />
      </div>
    );
  }

  if (placement === "right") {
    return (
      <div
        className="home-section-grid-decor pointer-events-none absolute inset-y-0 right-0 z-[1] flex h-full justify-end pr-0 sm:pr-2 lg:pr-4"
        aria-hidden
      >
        <GridImg className="h-full w-auto max-w-[min(58vw,22rem)] object-contain object-right sm:max-w-[min(52vw,26rem)] lg:max-w-[min(48vw,32rem)] xl:max-w-[36rem]" />
      </div>
    );
  }

  if (placement === "top-left") {
    return (
      <div
        className="pointer-events-none absolute left-0 top-0 z-[1] flex h-[min(34rem,72vw)] w-[min(56vw,28rem)] -translate-y-[22%] items-start justify-start sm:-translate-y-[26%] lg:h-[min(38rem,58vw)] lg:w-[min(50vw,32rem)] lg:-translate-y-[30%]"
        aria-hidden
      >
        <GridImg className="h-full w-full -translate-x-[6%] object-contain object-top-left opacity-90 lg:-translate-x-[8%]" />
      </div>
    );
  }

  /** Blog featured / archive: align grid with post cards, below section heading */
  if (placement === "top-left-cards") {
    return (
      <div
        className="pointer-events-none absolute left-0 z-[1] flex h-[min(34rem,75vw)] w-[min(58vw,30rem)] items-start justify-start top-[6.75rem] sm:top-[7.25rem] md:top-[7.75rem] lg:top-[8.5rem] lg:h-[min(36rem,62vw)] lg:w-[min(52vw,34rem)]"
        aria-hidden
      >
        <GridImg className="h-full w-full -translate-x-[6%] object-contain object-top-left opacity-90 lg:-translate-x-[8%]" />
      </div>
    );
  }

  if (placement === "top-right") {
    return (
      <div
        className="pointer-events-none absolute right-0 z-[1] flex h-[min(36rem,52%)] w-[min(52vw,26rem)] items-start justify-end top-[11.5rem] sm:top-[12.5rem] md:top-[13.5rem] lg:top-[15.5rem] lg:h-[min(32rem,48%)] lg:w-[min(44vw,30rem)] xl:top-[16.5rem] xl:h-[min(34rem,50%)]"
        aria-hidden
      >
        <GridImg className="h-full w-full translate-x-[10%] -translate-y-[4%] object-contain object-top-right lg:translate-x-[12%]" />
      </div>
    );
  }

  /** Reviews page: grid beside the featured review card, bleeding off the right edge */
  if (placement === "reviews-featured-right") {
    return (
      <div
        className="pointer-events-none absolute right-0 top-8 z-[1] flex h-[min(22rem,58vw)] w-[min(54vw,24rem)] translate-x-[14%] items-start justify-end sm:top-10 sm:h-[min(24rem,52vw)] sm:w-[min(50vw,28rem)] sm:translate-x-[18%] lg:top-12 lg:h-[min(28rem,38%)] lg:w-[min(44vw,34rem)] lg:translate-x-[24%]"
        aria-hidden
      >
        <GridImg className="h-full w-full object-contain object-top-right opacity-90" />
      </div>
    );
  }

  /** Property management service gallery: top-right grid behind heading + collage */
  if (placement === "property-management-gallery-right") {
    return (
      <div
        className="home-section-grid-decor pointer-events-none absolute right-0 top-0 z-[1] flex h-[min(40rem,90%)] w-[min(76vw,34rem)] translate-x-[8%] items-start justify-end sm:top-2 sm:h-[min(44rem,92%)] sm:w-[min(70vw,38rem)] sm:translate-x-[14%] md:top-4 lg:top-6 lg:h-[min(48rem,94%)] lg:w-[min(56vw,44rem)] lg:translate-x-[20%] xl:translate-x-[26%]"
        aria-hidden
      >
        <GridImg
          src={GPM_SECTION_GRID_BG}
          className="home-section-grid-decor__img h-full w-full object-contain object-top-right"
        />
      </div>
    );
  }

  /** Contact page: top-right grid behind the Get In Touch form card */
  if (placement === "contact-page-form-right") {
    return (
      <div
        className="home-section-grid-decor pointer-events-none absolute right-0 top-0 z-[1] hidden h-[min(32rem,68%)] w-[min(74vw,32rem)] translate-x-[8%] items-start justify-end lg:flex lg:h-[min(40rem,92%)] lg:w-[min(50vw,40rem)] lg:translate-x-[16%] xl:translate-x-[22%]"
        aria-hidden
      >
        <GridImg
          src={GPM_SECTION_GRID_BG}
          className="home-section-grid-decor__img h-full w-full object-contain object-top-right"
        />
      </div>
    );
  }

  /** Gallery page: grid beside the highlights card, bleeding off the right edge */
  if (placement === "gallery-highlights-right") {
    return (
      <div
        className="pointer-events-none absolute right-0 top-10 z-[1] flex h-[min(24rem,62vw)] w-[min(56vw,26rem)] translate-x-[14%] items-start justify-end sm:top-12 sm:h-[min(26rem,58vw)] sm:w-[min(52vw,30rem)] sm:translate-x-[18%] lg:top-14 lg:h-[min(30rem,92%)] lg:w-[min(48vw,38rem)] lg:translate-x-[26%] xl:translate-x-[30%]"
        aria-hidden
      >
        <GridImg className="h-full w-full object-contain object-top-right opacity-90" />
      </div>
    );
  }

  /** FAQ page: grid on the left between the accordion list and booking strip */
  if (placement === "faq-panel-left") {
    return (
      <div
        className="pointer-events-none absolute bottom-6 left-0 z-[1] flex h-[min(20rem,52vw)] w-[min(54vw,24rem)] -translate-x-[14%] items-end justify-start sm:bottom-8 sm:h-[min(22rem,48vw)] sm:w-[min(50vw,28rem)] sm:-translate-x-[18%] md:bottom-10 lg:bottom-12 lg:h-[min(26rem,42%)] lg:w-[min(44vw,34rem)] lg:-translate-x-[26%]"
        aria-hidden
      >
        <GridImg className="h-full w-full object-contain object-bottom-left opacity-90" />
      </div>
    );
  }

  if (placement === "bottom-left") {
    return (
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[1] flex h-[min(58%,34rem)] w-[min(54vw,26rem)] items-end justify-start lg:h-[min(62%,38rem)] lg:w-[min(48vw,30rem)] xl:h-[min(66%,42rem)]"
        aria-hidden
      >
        <GridImg className="h-full w-full -translate-x-[8%] translate-y-[12%] object-contain object-bottom-left lg:-translate-x-[10%] lg:translate-y-[14%]" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute bottom-0 right-0 z-[1] flex h-[min(62%,34rem)] w-[min(52%,26rem)] items-end justify-end lg:h-[min(68%,38rem)] lg:w-[min(48%,32rem)] xl:h-[min(72%,42rem)]"
      aria-hidden
    >
      <GridImg className="h-full w-full translate-x-[8%] translate-y-[10%] object-contain object-bottom-right lg:translate-x-[12%] lg:translate-y-[14%]" />
    </div>
  );
}

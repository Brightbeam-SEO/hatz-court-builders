import type { ReactNode } from "react";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { SiteHeader } from "@/components/layout/site-header";
import { getBlogHeroBlendStyle } from "@/lib/homepage-hero-bg";

type InnerPageHeroShellProps = {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  /** Background anchor for the cover photo. */
  imagePosition?: string;
  /** From `md` up, anchor photo at top center. */
  photoTopOnMd?: boolean;
  /**
   * `band` — title block anchored toward the bottom (blog, about, contact, etc.).
   * `landing` — centered two-column service/city hero layout.
   */
  layout?: "band" | "landing";
  className?: string;
};

/**
 * Full-bleed inner-page hero: cover image behind nav + white breadcrumbs + page hero content.
 * Use on every page except the home page.
 */
export function InnerPageHeroShell({
  imageSrc,
  imageAlt,
  children,
  imagePosition = "center center",
  photoTopOnMd = false,
  layout = "band",
  className = "",
}: InnerPageHeroShellProps) {
  const isLanding = layout === "landing";

  return (
    <section
      aria-label={imageAlt}
      className={`relative left-1/2 z-10 flex w-screen max-w-[100vw] -translate-x-1/2 flex-col bg-transparent ${
        isLanding
          ? "min-h-[34rem] justify-center md:min-h-[38rem] lg:min-h-[42rem]"
          : "min-h-[34rem] md:min-h-[36rem] lg:min-h-[40rem]"
      }${photoTopOnMd ? " blog-hero-band-photo-top-md" : ""} ${className}`.trim()}
      style={{
        ...getBlogHeroBlendStyle(imageSrc, imagePosition),
        ...(photoTopOnMd ? {} : { ["--blog-hero-photo-position" as string]: imagePosition }),
      }}
    >
      <div className="relative z-[220] shrink-0 isolate">
        <SiteHeader blendWithBackground anchorBase="/" />
      </div>

      <SiteBreadcrumbs onHero />

      {isLanding ? (
        <div className="relative z-10 mx-auto w-full max-w-[95vw] px-2 py-8 sm:max-w-[min(80vw,100%)] sm:px-3 sm:py-10 md:px-4 md:py-12 lg:py-14">
          {children}
        </div>
      ) : (
        <div className="relative z-10 flex flex-1 flex-col justify-end">
          <div className="mx-auto w-full max-w-[95vw] px-2 pb-6 sm:max-w-[min(80vw,100%)] sm:px-3 sm:pb-8 md:px-4 md:pb-10">
            {children}
          </div>
        </div>
      )}
    </section>
  );
}

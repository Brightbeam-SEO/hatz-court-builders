import type { ReactNode } from "react";
import { getBlogHeroBlendStyle } from "@/lib/homepage-hero-bg";

type BlogHeroBandProps = {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  /** Background anchor for the cover photo (default centers; use `center top` for portraits). */
  imagePosition?: string;
  /** From `md` up, anchor photo at top center (keeps heads visible in group portraits). */
  photoTopOnMd?: boolean;
};

/**
 * Full-bleed blog hero: cover image + gradient over the site texture (no rounded “card”).
 */
export function BlogHeroBand({
  imageSrc,
  imageAlt,
  children,
  imagePosition = "center center",
  photoTopOnMd = false,
}: BlogHeroBandProps) {
  return (
    <section
      aria-label={imageAlt}
      className={`relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 min-h-[28rem] overflow-hidden bg-transparent md:min-h-[28rem] lg:min-h-[32rem]${photoTopOnMd ? " blog-hero-band-photo-top-md" : ""}`}
      style={{
        ...getBlogHeroBlendStyle(imageSrc, imagePosition),
        ...(photoTopOnMd
          ? {}
          : { ["--blog-hero-photo-position" as string]: imagePosition }),
      }}
    >
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto w-full max-w-[95vw] px-2 pb-6 pt-24 sm:max-w-[min(80vw,100%)] sm:px-3 sm:pb-8 md:px-4 md:pb-10">
          {children}
        </div>
      </div>
    </section>
  );
}

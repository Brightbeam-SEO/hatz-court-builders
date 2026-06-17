import type { ReactNode } from "react";
import { InnerPageHeroShell } from "@/components/layout/inner-page-hero-shell";

type BlogHeroBandProps = {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  /** Background anchor for the cover photo (default centers; use `center top` for portraits). */
  imagePosition?: string;
  /** From `md` up, anchor photo at top center (keeps heads visible in group portraits). */
  photoTopOnMd?: boolean;
};

/** Full-bleed inner-page hero with nav + breadcrumbs over the cover image. */
export function BlogHeroBand({
  imageSrc,
  imageAlt,
  children,
  imagePosition = "center center",
  photoTopOnMd = false,
}: BlogHeroBandProps) {
  return (
    <InnerPageHeroShell
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      imagePosition={imagePosition}
      photoTopOnMd={photoTopOnMd}
      layout="band"
    >
      {children}
    </InnerPageHeroShell>
  );
}

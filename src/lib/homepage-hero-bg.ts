import type { CSSProperties } from "react";

const GPM_IVORY = "#f7f5f1";

/** Solid ivory site shell background (no texture tile). */
export const ZEN_SITE_SHELL_BACKGROUND: CSSProperties = {
  backgroundColor: GPM_IVORY,
};

export const HOMEPAGE_HERO_BACKGROUND_STYLE: CSSProperties = {
  backgroundColor: GPM_IVORY,
};

const BLOG_HERO_READABILITY_GRADIENT =
  "linear-gradient(to right, rgba(21, 21, 21, 0.82) 0%, rgba(21, 21, 21, 0.48) 42%, rgba(247, 245, 240, 0) 100%)";

/** Escape for safe use inside a CSS `url("…")` value. */
function cssUrlValue(src: string): string {
  return src.replace(/\\/g, "/").replace(/"/g, "%22").replace(/\(/g, "%28").replace(/\)/g, "%29");
}

/**
 * Blog hero band: cover photo + dark readability gradient.
 */
export function getBlogHeroBlendStyle(
  coverImageSrc: string,
  /** Photo anchor when using `background-size: cover` (e.g. `center top` keeps heads visible). */
  imagePosition = "center center",
): CSSProperties {
  const u = cssUrlValue(coverImageSrc);
  return {
    backgroundColor: "transparent",
    backgroundImage: `${BLOG_HERO_READABILITY_GRADIENT}, url("${u}")`,
    backgroundSize: "auto, cover",
    backgroundPosition: `center, var(--blog-hero-photo-position, ${imagePosition})`,
    backgroundRepeat: "no-repeat, no-repeat",
  };
}

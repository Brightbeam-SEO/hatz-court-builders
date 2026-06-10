import type { GalleryContent } from "@/lib/gallery-content";
import { BUSINESS } from "@/lib/business";
import { GPM_GALLERY_IMAGE_PATHS, gpmImageAlt } from "@/lib/gpm-gallery-images";

const paths = [...GPM_GALLERY_IMAGE_PATHS];

const HIGHLIGHT_IMAGE_PATHS = [
  paths.find((p) => p.includes("modular-court-tile-custom-logo"))!,
  paths.find((p) => p.includes("backyard-pickleball-basketball-dual-sport"))!,
  paths.find((p) => p.includes("outdoor-multi-court-acrylic"))!,
  paths.find((p) => p.includes("tennis-court-resurface-blue-and-green"))!,
].filter(Boolean);

const COLLAGE_PINNED_TOP = [
  paths.find((p) => p.includes("basketball-tile-court-custom-logo"))!,
  paths.find((p) => p.includes("pickleball-court-backyard-modular-tile"))!,
  paths.find((p) => p.includes("outdoor-multi-court-pickleball-basketball-tennis"))!,
  paths.find((p) => p.includes("indoor-hardwood-basketball-court-hoops-gym-interior"))!,
  paths.find((p) => p.includes("tennis-court-side-by-side-before-after"))!,
  paths.find((p) => p.includes("backyard-gray-basketball-court-installation"))!,
].filter(Boolean);

const COLLAGE_PINNED_SET = new Set(COLLAGE_PINNED_TOP);

function toGalleryItem(image: string) {
  return { image, alt: gpmImageAlt(image) };
}

function shuffleGalleryItems<T>(items: T[]): T[] {
  const result = [...items];
  let state = 0x9e3779b9;
  for (let i = result.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) | 0;
    const j = Math.abs(state) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const collageRest = shuffleGalleryItems(
  paths.filter((image) => !COLLAGE_PINNED_SET.has(image)).map(toGalleryItem),
);

const collageItems = [...COLLAGE_PINNED_TOP.map(toGalleryItem), ...collageRest];

const highlightItems = HIGHLIGHT_IMAGE_PATHS.map((image) => ({
  image,
  alt: gpmImageAlt(image),
}));

export function getStaticGalleryContent(): GalleryContent {
  return {
    title: "Gallery",
    slug: "gallery",
    heroSubheading:
      "Browse custom tennis, basketball, pickleball, and multi-use courts built across Idaho",
    overviewHeadline: "Court Construction Gallery • Boise, Idaho",
    overviewBody:
      "Explore residential and commercial court projects — from backyard pickleball courts to tennis resurfacing, modular tile systems, and full design-build installations.",
    overviewStats: [
      { value: "47+", label: "Court Projects" },
      { value: "All", label: "Surface Types" },
    ],
    highlightsTitle: "Gallery Highlights",
    highlightsIntro: "Pickleball, basketball, tennis, and multi-use courts throughout Idaho.",
    highlightItems: highlightItems.map((item) => ({ ...item })),
    items: collageItems.map((item) => ({ ...item })),
    seo: {
      metaTitle: `Gallery | ${BUSINESS.nameShort}`,
      metaDescription:
        "Hatz Court Builders gallery — custom tennis, basketball, pickleball, and multi-use court construction in Boise, Idaho and the Treasure Valley.",
    },
  };
}

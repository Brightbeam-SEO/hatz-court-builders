import type { GalleryContent } from "@/lib/gallery-content";
import { BUSINESS } from "@/lib/business";
import {
  buildGalleryCollageItems,
  buildGalleryHighlightItems,
  finalizeGalleryContent,
} from "@/lib/gallery-items";

export function getStaticGalleryContent(): GalleryContent {
  return finalizeGalleryContent({
    title: "Court Construction Gallery",
    slug: "gallery",
    heroSubheading:
      "Browse custom tennis, basketball, pickleball, and multi-use courts built by Hatz Court Builders in Idaho and Arizona.",
    overviewHeadline: "Custom Court Projects Built for Real Play",
    overviewBody:
      "Explore completed court construction, resurfacing, and design-build projects for homes, schools, parks, and commercial properties. Each project is built for performance, durability, and long-term use.",
    overviewStats: [
      { value: "24/7", label: "Available for Inquiries" },
      { value: "6+", label: "Surface Options" },
    ],
    highlightsTitle: "Gallery Highlights",
    highlightsIntro:
      "See examples of custom court surfaces, clean striping, multi-use layouts, and finished court details from Hatz Court Builders.",
    highlightItems: buildGalleryHighlightItems(),
    items: buildGalleryCollageItems(),
    seo: {
      metaTitle: `Gallery | ${BUSINESS.nameShort}`,
      metaDescription:
        "Hatz Court Builders gallery — custom tennis, basketball, pickleball, and multi-use court construction in Boise, Idaho and the Treasure Valley.",
    },
  });
}

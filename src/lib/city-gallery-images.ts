import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { GPM_GALLERY_IMAGE_PATHS } from "@/lib/gpm-gallery-images";
import type { PropertyGalleryImage } from "@/lib/property-management-gallery-section";

/** Deterministic gallery slice per city (six unique photos from the GPM collection). */
const CITY_GALLERY_OFFSETS: Record<string, number> = {};

function galleryImagesForCity(slug: string): PropertyGalleryImage[] {
  const offset = CITY_GALLERY_OFFSETS[slug] ?? 0;
  const paths = GPM_GALLERY_IMAGE_PATHS;
  const count = paths.length;
  return Array.from({ length: 6 }, (_, i) => {
    const src = paths[(offset + i) % count]!;
    return { src, alt: gpmImageAlt(src) };
  });
}

export function cityGallerySectionCopy(cityName: string) {
  return {
    eyebrow: "Managed Rental Homes",
    heading: `Managed Rental Properties in ${cityName}`,
    subheading: `Residential rentals we market, maintain, and manage for owners in ${cityName} and nearby Treasure Valley communities.`,
  } as const;
}

export function getCityGallerySection(slug: string, cityName: string) {
  return {
    ...cityGallerySectionCopy(cityName),
    images: galleryImagesForCity(slug),
  };
}

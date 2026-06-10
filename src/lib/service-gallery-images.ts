import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { GPM_GALLERY_IMAGE_PATHS } from "@/lib/gpm-gallery-images";
import type { PropertyGalleryImage } from "@/lib/property-management-gallery-section";

const SERVICE_GALLERY_OFFSETS: Record<string, number> = {
  "property-management-services": 2,
  "rental-property-marketing": 6,
  "property-inspections": 10,
  "property-maintenance-services": 14,
  "tenant-placement-services": 18,
  "specialized-property-management": 22,
  "multi-family-property-management": 26,
  "hoa-community-management": 30,
  "long-term-rental-management": 34,
  "property-risk-mitigation": 38,
  "real-estate-investment-consulting": 42,
  "property-risk-management-meridian-id": 46,
  rentals: 50,
  "condo-rentals-meridian-id": 58,
  "home-rentals-meridian-id": 62,
  "month-to-month-rentals-meridian-id": 66,
  "long-term-rentals-meridian-id": 70,
  "foot-massage-reflexology": 0,
};

function galleryImagesForService(slug: string): PropertyGalleryImage[] {
  const offset = SERVICE_GALLERY_OFFSETS[slug] ?? 0;
  const paths = GPM_GALLERY_IMAGE_PATHS;
  return Array.from({ length: 6 }, (_, i) => {
    const src = paths[(offset + i) % paths.length]!;
    return { src, alt: gpmImageAlt(src) };
  });
}

export function serviceGallerySectionCopy(serviceName: string) {
  return {
    eyebrow: "Court Construction Projects",
    heading: "Custom Courts Built Across Idaho",
    subheading: `Pickleball, basketball, tennis, and multi-use courts for homeowners, schools, and parks — including ${serviceName.toLowerCase()} throughout the Treasure Valley.`,
  } as const;
}

export function getServiceGallerySection(slug: string, serviceName: string) {
  return {
    ...serviceGallerySectionCopy(serviceName),
    images: galleryImagesForService(slug),
  };
}

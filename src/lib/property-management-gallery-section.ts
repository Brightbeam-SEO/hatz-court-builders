import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";

export type PropertyGalleryImage = {
  src: string;
  alt: string;
};

function img(fragment: string): PropertyGalleryImage {
  const src = gpmPick(fragment);
  return { src, alt: gpmImageAlt(src) };
}

/** Six court construction photos for the services landing gallery. */
export const PROPERTY_MANAGEMENT_GALLERY_IMAGES: PropertyGalleryImage[] = [
  img("backyard pickleball basketball dual sport court"),
  img("outdoor multi court acrylic surfacing"),
  img("indoor hardwood basketball court gym interior"),
  img("tennis court resurface blue green acrylic"),
  img("basketball tile court custom logo branding"),
  img("pickleball court backyard modular tile"),
];

export const PROPERTY_MANAGEMENT_GALLERY_COPY = {
  eyebrow: "Court Construction Projects",
  heading: "Custom Courts Built Across Idaho",
  subheading:
    "Pickleball, basketball, tennis, and multi-use courts for homeowners, schools, and parks — acrylic, modular, hardwood, and turf systems.",
} as const;

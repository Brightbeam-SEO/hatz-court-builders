import Image from "next/image";
import { HomeSectionGridDecor } from "@/components/home/home-section-grid-decor";
import type { PropertyGalleryImage } from "@/lib/property-management-gallery-section";

/** Compact masonry row spans (× 7px row height ≈ 98–119px tile height). */
const collageSpanClasses = [
  "sm:row-span-17",
  "sm:row-span-13",
  "sm:row-span-15",
  "sm:row-span-14",
  "sm:row-span-16",
  "sm:row-span-13",
] as const;

export function PropertyManagementGallerySection({
  eyebrow,
  heading,
  subheading,
  images,
  className = "",
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
  images: readonly PropertyGalleryImage[];
  className?: string;
}) {
  if (images.length === 0) return null;

  return (
    <section
      className={`property-management-gallery-section section-pad relative overflow-x-clip bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso ${className}`.trim()}
      aria-labelledby="property-management-gallery-heading"
    >
      <HomeSectionGridDecor placement="property-management-gallery-right" />
      <div className="shell relative z-10">
        <div className="mx-auto w-full max-w-6xl text-center">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2
            id="property-management-gallery-heading"
            className="font-heading text-2xl font-bold text-white light:text-zen-espresso md:text-3xl lg:text-4xl"
          >
            {heading}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-white/80 light:text-zen-taupe sm:text-lg">
            {subheading}
          </p>
          <div className="gallery-collage-grid mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:auto-rows-[7px] sm:gap-3.5 lg:max-w-5xl lg:grid-cols-3 lg:gap-4">
            {images.map((img, idx) => (
              <figure
                key={img.src}
                className={`gallery-collage-item relative min-h-[10.5rem] overflow-hidden rounded-2xl border border-white/15 ring-1 ring-white/10 sm:min-h-0 light:border-slate-200/80 light:ring-slate-200/50 ${
                  collageSpanClasses[idx % collageSpanClasses.length]
                }`}
                style={{ animationDelay: `${idx * 65}ms` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

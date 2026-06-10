"use client";

import Image from "next/image";
import { ZEN_GALLERY_IMAGE_PATHS, zenImageAlt } from "@/lib/zen-gallery-images";

type ChristmasGalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const CHRISTMAS_GALLERY_ITEMS: ChristmasGalleryItem[] = ZEN_GALLERY_IMAGE_PATHS.slice(37, 41).map(
  (src) => ({
    src,
    alt: zenImageAlt(src),
    width: 1600,
    height: 1200,
  }),
);

/** Image strip reused where markdown markers appear on legacy landing copy. */
export function ChristmasLightInstallationGallery({ className = "" }: { className?: string }) {
  return (
    <section className={className} aria-label="Zen Day Spa gallery spotlight">
      <div className="mt-2 columns-1 gap-4 sm:columns-2 sm:gap-5">
        {CHRISTMAS_GALLERY_ITEMS.map((item) => (
          <figure
            key={item.src}
            className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/5 light:border-slate-200 light:bg-slate-100/80"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              unoptimized
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

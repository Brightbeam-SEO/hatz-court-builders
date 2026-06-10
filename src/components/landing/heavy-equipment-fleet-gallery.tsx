"use client";

import Image from "next/image";
import { GPM_GALLERY_IMAGE_PATHS, gpmImageAlt } from "@/lib/gpm-gallery-images";

type FleetGalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const FLEET_GALLERY_ITEMS: FleetGalleryItem[] = GPM_GALLERY_IMAGE_PATHS.slice(0, 6).map((src) => ({
  src,
  alt: gpmImageAlt(src),
  width: 1600,
  height: 1200,
}));

/** Masonry-style gallery for service landing article sections. */
export function HeavyEquipmentFleetGallery({ className = "" }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="fleet-equipment-gallery-heading">
      <h2
        id="fleet-equipment-gallery-heading"
        className="sr-only"
      >
        Property gallery
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {FLEET_GALLERY_ITEMS.map((item) => (
          <li key={item.src} className="overflow-hidden rounded-2xl">
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="h-full w-full object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
              unoptimized
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

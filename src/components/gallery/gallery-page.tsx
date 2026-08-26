"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { BlogBookingStrip } from "@/components/blog/blog-article-lead-cta";
import type { GalleryContent } from "@/lib/gallery-content";
import type { SocialLink } from "@/lib/home-content";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { SiteFooterRegion } from "@/components/layout/site-footer-region";
import { GALLERY_HERO_IMAGE } from "@/lib/gallery-items";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { GalleryLightbox, type GalleryLightboxImage } from "./gallery-lightbox";

const galleryHeroAlt = gpmImageAlt(GALLERY_HERO_IMAGE);

const collageSpanClasses = [
  "sm:row-span-24",
  "sm:row-span-18",
  "sm:row-span-22",
  "sm:row-span-20",
  "sm:row-span-26",
  "sm:row-span-18",
  "sm:row-span-20",
  "sm:row-span-24",
];

export function GalleryPage({
  socialLinks,
  content,
}: {
  socialLinks: SocialLink[];
  content: GalleryContent;
}) {
  const galleryImages = content.items.map((item) => ({ src: item.image, alt: item.alt }));
  const projectHighlightImages = content.highlightItems.map((item) => ({
    src: item.image,
    alt: item.alt,
  }));

  const lightboxImages = useMemo<GalleryLightboxImage[]>(() => {
    const seen = new Set<string>();
    const merged: GalleryLightboxImage[] = [];
    for (const img of [...projectHighlightImages, ...galleryImages]) {
      if (seen.has(img.src)) continue;
      seen.add(img.src);
      merged.push(img);
    }
    return merged;
  }, [galleryImages, projectHighlightImages]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (src: string) => {
    const index = lightboxImages.findIndex((img) => img.src === src);
    if (index >= 0) setLightboxIndex(index);
  };

  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <BlogHeroBand imageSrc={GALLERY_HERO_IMAGE} imageAlt={galleryHeroAlt}>
          <div className="min-w-0 w-full max-w-3xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              {content.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/90 md:text-base">
              {content.heroSubheading}
            </p>
            <PageHeroCtaButtons />
          </div>
        </BlogHeroBand>

        <section className="section-pad relative overflow-hidden">
          <div className="shell relative z-10">
            <div className="grid gap-8 rounded-3xl lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
              <article className="hero-glass-light rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl light:border-slate-200 light:bg-white/90 sm:p-8">
                <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-white light:text-zen-espresso md:text-4xl">
                  <span className="text-white light:text-zen-espresso">
                    {content.overviewHeadline}
                  </span>
                </h2>
                <p className="mt-5 text-base leading-7 text-white/85 light:text-zen-taupe">
                  {content.overviewBody}
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {content.overviewStats.slice(0, 2).map((stat) => (
                    <div
                      key={`${stat.value}-${stat.label}`}
                      className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center backdrop-blur-xl light:border-slate-200 light:bg-white"
                    >
                      <p className="font-heading text-3xl font-bold text-zen-crimson light:text-zen-crimson">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-white/80 light:text-zen-taupe">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="relative z-10 overflow-hidden rounded-3xl border border-zen-gold/35 bg-zen-crimson p-6 text-left shadow-[0_30px_70px_rgba(18,84,155,0.35)] ring-1 ring-white/15 sm:p-8">
                <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                  {content.highlightsTitle}
                </h2>
                <p className="mt-3 text-base leading-7 text-white/90">
                  {content.highlightsIntro}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {projectHighlightImages.map((img) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => openLightbox(img.src)}
                      className="overflow-hidden rounded-2xl border border-white/35 bg-white/20 text-left transition hover:ring-2 hover:ring-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label={`View full size: ${img.alt}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={600}
                        height={420}
                        className="h-28 w-full object-cover sm:h-32"
                        unoptimized={img.src.startsWith("/api/")}
                      />
                    </button>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[95vw] px-2 sm:max-w-[min(80vw,100%)] sm:px-3 md:px-4">
          <div className="gallery-collage-grid grid grid-cols-1 gap-4 sm:auto-rows-[10px] sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img, idx) => (
              <button
                key={img.src + img.alt}
                type="button"
                onClick={() => openLightbox(img.src)}
                className={`gallery-collage-item hero-glass-light overflow-hidden rounded-[1.35rem] border border-white/20 bg-white/10 text-left backdrop-blur-xl transition hover:ring-2 hover:ring-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white light:border-slate-200 light:bg-white ${
                  collageSpanClasses[idx % collageSpanClasses.length]
                }`}
                style={{ animationDelay: `${idx * 65}ms` }}
                aria-label={`View full size: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={900}
                  height={700}
                  className="h-60 w-full object-cover sm:h-full"
                  unoptimized={img.src.startsWith("/api/")}
                />
              </button>
            ))}
          </div>
        </section>

        <BlogBookingStrip showLead={false} />
      </main>

      <SiteFooterRegion socialLinks={socialLinks} />

      <GalleryLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </div>
  );
}

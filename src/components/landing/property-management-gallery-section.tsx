import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import InteractiveBentoGallery, { type MediaItemType } from "@/components/ui/interactive-bento-gallery";
import type { PropertyGalleryImage } from "@/lib/property-management-gallery-section";

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
  const spans = [
    "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
    "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
    "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    "md:col-span-1 md:row-span-1 md:col-start-4 md:row-start-4",
    "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-4",
  ] as const;
  const mediaItems: MediaItemType[] = images.slice(0, spans.length).map((img, idx) => ({
    id: idx + 1,
    type: "image",
    title: `Court Project ${idx + 1}`,
    desc: img.alt,
    url: img.src,
    span: spans[idx % spans.length],
  }));

  return (
    <section
      className={`property-management-gallery-section section-pad pb-36 md:pb-48 relative overflow-x-clip bg-zen-rice text-zen-espresso light:bg-zen-rice light:text-zen-espresso ${className}`.trim()}
      aria-labelledby="property-management-gallery-heading"
    >
      <div className="shell relative z-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="text-center text-black">
            <p className="section-eyebrow !text-black">{eyebrow}</p>
            <h2
              id="property-management-gallery-heading"
              className="text-balance font-heading text-3xl font-bold tracking-wide text-black md:text-4xl lg:text-5xl xl:text-6xl xl:font-extrabold"
            >
              {heading}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-black/90 sm:text-lg">
              {subheading}
            </p>
            <PageHeroCtaButtons
              align="center"
              onDark={false}
              secondaryHref="#property-management-booking-form"
              className="mx-auto"
              secondaryClassName="!border-zen-espresso !text-zen-espresso hover:!bg-zen-espresso hover:!text-white focus-visible:!outline-zen-espresso"
            />
          </div>

          <InteractiveBentoGallery
            mediaItems={mediaItems}
            showHeader={false}
            className="w-full max-w-none px-0 py-0 [&_.grid]:auto-rows-[140px]"
          />
        </div>
      </div>
    </section>
  );
}

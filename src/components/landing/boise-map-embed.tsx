import { BUSINESS } from "@/lib/business";

/** Embedded map for service-area and city landing articles. */
export function BoiseMapEmbed({
  className = "",
  src = BUSINESS.mapEmbedSrc,
  title = `Zen Day Spa location map · ${BUSINESS.address}`,
}: {
  className?: string;
  src?: string;
  title?: string;
}) {
  return (
    <div
      className={`hero-glass-light overflow-hidden rounded-2xl border border-white/25 bg-white/15 shadow-sm ring-1 ring-white/10 backdrop-blur-xl light:border-slate-200 light:bg-white light:ring-0 light:shadow-none ${className}`.trim()}
    >
      <iframe
        title={title}
        src={src}
        className="aspect-[4/3] w-full max-h-[min(70vh,28rem)] min-h-[220px] border-0 sm:min-h-[280px] md:aspect-video md:max-h-none md:min-h-[320px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

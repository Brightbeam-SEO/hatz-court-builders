"use client";

import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";

export type TestimonialCard = {
  name: string;
  role?: string;
  image: string;
  company?: string;
  quote: string;
};

export function TestimonialsSection({
  testimonials,
  sectionId,
  heading = "Real Results, Real Voices",
  subtext = "See how clients are thriving with Hatz Court Builders.",
  className = "",
}: {
  testimonials: TestimonialCard[];
  sectionId?: string;
  heading?: string;
  subtext?: string;
  className?: string;
}) {
  return (
    <section id={sectionId} className={`relative w-full px-4 pb-20 pt-10 ${className}`.trim()}>
      <div aria-hidden className="absolute inset-0 isolate z-0 contain-strict">
        <div className="absolute left-0 top-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)]" />
        <div className="absolute left-0 top-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)]" />
        <div className="absolute left-0 top-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-balance text-3xl font-bold tracking-wide text-white md:text-4xl lg:text-5xl xl:text-6xl xl:font-extrabold">
            {heading}
          </h2>
          <p className="text-sm text-white/80 md:text-base lg:text-lg">{subtext}</p>
        </div>

        <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ name, role, company, quote, image }, index) => (
            <motion.div
              initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
              whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index + 0.1, duration: 0.8 }}
              key={`${name}-${index}`}
              className="relative grid grid-cols-[auto_1fr] gap-x-3 overflow-hidden border border-dashed border-white/25 bg-white/[0.06] p-4"
            >
              <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
                  <GridPattern
                    width={25}
                    height={25}
                    x={-12}
                    y={4}
                    strokeDasharray="3"
                    className="absolute inset-0 h-full w-full stroke-white/20 mix-blend-overlay"
                  />
                </div>
              </div>

              <img
                alt={name}
                src={image}
                loading="lazy"
                className="size-9 rounded-full object-cover"
              />

              <div>
                <div className="-mt-0.5 -space-y-0.5">
                  <p className="text-sm text-white md:text-base">{name}</p>
                  <span className="block text-[11px] font-light tracking-tight text-white/75">
                    {(role || "Client") + (company ? ` at ${company}` : "")}
                  </span>
                </div>
                <blockquote className="mt-3">
                  <p className="text-sm font-light tracking-wide text-white/90">{quote}</p>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

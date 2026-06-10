"use client";

import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import { OWNER_PORTAL_URL, RESIDENT_PORTAL_URL } from "@/lib/portal-urls";

const servicesAltBtnClass = "btn-alt btn-alt-inverse";

export function HomeRentalsSection() {
  const { ref, animateClass } = useHomeScrollReveal();

  return (
    <section
      ref={ref}
      id="rentals"
      className={`section-pad bg-zen-espresso text-white ${animateClass}`}
      aria-labelledby="home-rentals-heading"
    >
      <div className="shell">
        <div className="home-reveal home-reveal-d1 mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">Rentals</p>
          <h2
            id="home-rentals-heading"
            className="mt-2 font-heading text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl lg:text-[3.3rem]"
          >
            Available Rentals
          </h2>
          <p className="mt-4 text-base leading-7 text-white/88 sm:text-lg">
            Browse current rental listings across Meridian and the Treasure Valley. Find your next
            home or sign in to your resident or owner portal below.
          </p>
        </div>

        <div className="home-reveal home-reveal-d2 mt-10 flex flex-col items-center justify-center gap-6 lg:mt-14">
          <div className="w-full overflow-hidden rounded-2xl border border-zen-gold/20 bg-white shadow-sm ring-1 ring-zen-crimson/10">
            <iframe
              src="https://greenbeltpm.managebuilding.com/Resident/Public/Rentals?hidenav=true"
              title="Available rentals — Greenbelt Property Management"
              className="h-[600px] w-full border-0"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a className={servicesAltBtnClass} href={RESIDENT_PORTAL_URL} target="_blank" rel="noopener noreferrer">
              Resident Sign In
            </a>
            <a className={servicesAltBtnClass} href={OWNER_PORTAL_URL} target="_blank" rel="noopener noreferrer">
              Owner Sign In
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

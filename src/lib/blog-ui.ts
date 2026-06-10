/** Location tag shown on blog cards (all posts). */
export const BLOG_LOCATION_LABEL = "Meridian, ID";

/** Card shells: no border; image areas stay open, copy blocks use {@link blogPostBodySurfaceClass}. */
export const blogPanelSurfaceClass = "border-0 bg-transparent shadow-none";

export const blogPostBodySurfaceClass = "light:bg-white";

export const blogPanelSurfaceHoverClass =
  "transition hover:border-white/22 light:hover:border-slate-300/80";

export const blogPanelCardClass = `overflow-hidden rounded-2xl ${blogPanelSurfaceClass}`;

export const blogPanelCardInteractiveClass = `group ${blogPanelCardClass} ${blogPanelSurfaceHoverClass}`;

export const blogPanelLeadCtaClass =
  "relative z-10 rounded-3xl border-0 bg-transparent p-8 shadow-none sm:p-10";

export const blogLocationPillClass = `inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide border-white/25 bg-transparent text-white/80 light:border-zen-taupe/35 light:bg-transparent light:text-zen-taupe`;

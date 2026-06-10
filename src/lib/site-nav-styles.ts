/** Shared header dropdown + link hover styles (light green highlight, slower close). */

const navHoverBg = "hover:bg-zen-crimson/12";

/** Dropdown panels: quick open, delayed close when pointer leaves. */
export const headerDropdownPanelClass =
  "invisible absolute z-[260] rounded-2xl border border-zen-gold/15 bg-white p-2 opacity-0 shadow-xl transition-[opacity,visibility,transform] duration-300 delay-[400ms] ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-0 group-hover:duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:delay-0";

/** Base styles for Massage/Healing/Beauty/Pain flyouts — pair with `group-hover/{name}:` on the parent `<li>`. */
export const headerNestedDropdownPanelBase =
  "invisible absolute left-full top-0 z-[270] ml-1 rounded-2xl border border-zen-gold/15 bg-white p-2 opacity-0 shadow-xl transition-[opacity,visibility,transform] duration-300 delay-[400ms] ease-out group-hover:delay-0 group-hover:duration-200 group-focus-within:delay-0";

export const headerNavLinkClass =
  `block rounded-xl px-3 py-2 font-sans font-medium tracking-[0.0125em] text-zen-espresso/80 transition ${navHoverBg} hover:text-zen-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-crimson`;

export const headerNavSubLinkClass =
  `block rounded-xl px-3 py-2 font-sans text-sm font-medium leading-snug tracking-[0.0125em] text-zen-espresso/80 transition ${navHoverBg} hover:text-zen-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-crimson`;

export const headerNavCategoryClass =
  `flex w-full items-center justify-between rounded-xl px-3 py-2 text-zen-espresso/80 transition ${navHoverBg} hover:text-zen-espresso`;

export const headerTopLinkClass =
  `rounded-lg px-1 py-0.5 font-sans font-medium tracking-[0.0125em] transition ${navHoverBg} hover:text-zen-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-crimson`;

export const headerMobileLinkClass =
  `block rounded-lg px-2 py-1.5 text-zen-espresso/80 transition ${navHoverBg} hover:text-zen-espresso`;

/** Top-level mobile nav items (matches accordion trigger typography + card). */
export const headerMobileTopLinkClass =
  `flex w-full items-center overflow-hidden rounded-xl border border-zen-gold/20 bg-white px-3 py-2.5 text-left font-sans text-sm font-medium tracking-[0.0125em] text-zen-espresso/90 transition ${navHoverBg} hover:text-zen-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-crimson`;

export const headerMobileSectionLabelClass =
  "text-[10px] font-semibold uppercase tracking-[0.14em] text-zen-taupe";

export const headerMobileAccordionTriggerClass =
  `flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-medium text-zen-espresso/90 transition ${navHoverBg} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-crimson`;

export const headerMobileAccordionPanelClass = "grid gap-0.5 border-t border-zen-gold/15 px-2 py-2";

export const headerMobileAccordionSubLinkClass =
  `block rounded-lg px-2 py-1.5 text-sm text-zen-espresso/80 transition ${navHoverBg} hover:text-zen-espresso`;

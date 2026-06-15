import type {
  Faq,
  GoogleReview,
  HomeContent,
  ProcessItem,
  ServiceCarouselSlide,
  ServiceItem,
  SocialLink,
  WhyItem,
} from "@/lib/home-content";
import type { HomePageCopy } from "@/lib/home-page-copy";
import { isStaleZenHeroCopy, mergeHomePageCopy } from "@/lib/home-page-copy";
import { normalizeHcbImagePath } from "@/lib/hcb-image-path";
import { getStaticHomeContent } from "@/components/home/site-data";
import { getSanityClient } from "./client";
import { homePageQuery } from "./queries";

/** Sanity/API patches: `copy` fields may be partially filled unlike `Partial<HomeContent>`. */
export type RemoteHomeContentPatch = Omit<Partial<HomeContent>, "copy"> & {
  copy?: Partial<HomePageCopy>;
};

type SanityDoc = {
  navItems?: string[] | null;
  trustBarItems?: string[] | null;
  services?: Array<Partial<ServiceItem> | null> | null;
  servicesCarousel?: Array<Partial<ServiceCarouselSlide> | null> | null;
  whyChooseUs?: Array<Partial<WhyItem> | null> | null;
  processSteps?: Array<Partial<ProcessItem> | null> | null;
  googleReviews?: Array<Partial<GoogleReview> | null> | null;
  faqs?: Array<Partial<Faq> | null> | null;
  socialLinks?: Array<Partial<SocialLink> | null> | null;
  pageCopy?: Partial<HomePageCopy> | null;
};

function isNonEmpty<T>(a: T[] | null | undefined | false): a is T[] {
  return Array.isArray(a) && a.length > 0;
}

/** Ignore removed Zen/spa asset paths still stored in Sanity. */
function isStaleAssetUrl(url: string | undefined | null): boolean {
  if (!url?.trim()) return false;
  return (
    url.includes("/images/zen/") ||
    url.includes("/images/gpm/") ||
    /^\/services\/[^/]+\.webp$/i.test(url.trim())
  );
}

function takeService(s: Partial<ServiceItem> | null | undefined): ServiceItem | null {
  if (
    !s?.name ||
    !s.blurb ||
    !s.image ||
    !s.hoverImage ||
    !s.cardIcon ||
    isStaleAssetUrl(s.image) ||
    isStaleAssetUrl(s.hoverImage) ||
    isStaleAssetUrl(s.cardIcon)
  ) {
    return null;
  }
  const href = typeof s.href === "string" ? s.href.trim() : "";
  return {
    name: s.name,
    blurb: s.blurb,
    image: normalizeHcbImagePath(s.image),
    hoverImage: normalizeHcbImagePath(s.hoverImage),
    cardIcon: normalizeHcbImagePath(s.cardIcon),
    ...(href ? { href } : {}),
  };
}

function takeWhy(s: Partial<WhyItem> | null | undefined): WhyItem | null {
  if (!s?.title || !s.body || !s.icon) return null;
  if (isStaleZenHeroCopy(s.title) || isStaleZenHeroCopy(s.body)) return null;
  if (isStaleWhyChooseUsItem(s.title)) return null;
  return { title: s.title, body: s.body, icon: s.icon };
}

/** Superseded closing-showcase card titles still stored in Sanity homePage documents. */
function isStaleWhyChooseUsItem(title: string | undefined | null): boolean {
  if (!title?.trim()) return false;
  return /family owned|treasure valley focus/i.test(title);
}

function isStaleWhyChooseUsSet(items: WhyItem[]): boolean {
  return items.some((item) => isStaleWhyChooseUsItem(item.title));
}

function takeProcess(s: Partial<ProcessItem> | null | undefined): ProcessItem | null {
  if (!s?.step || !s.title || !s.body || !s.icon) return null;
  if (isStaleZenHeroCopy(s.title) || isStaleZenHeroCopy(s.body)) return null;
  return { step: s.step, title: s.title, body: s.body, icon: s.icon };
}

function takeReview(s: Partial<GoogleReview> | null | undefined): GoogleReview | null {
  if (!s?.id || !s.name || !s.quote || !s.image || isStaleAssetUrl(s.image)) return null;
  return { id: s.id, name: s.name, quote: s.quote, image: normalizeHcbImagePath(s.image) };
}

function takeFaq(s: Partial<Faq> | null | undefined): Faq | null {
  if (!s?.question || !s?.answer) return null;
  if (isStaleZenHeroCopy(s.question) || isStaleZenHeroCopy(s.answer)) return null;
  return { question: s.question, answer: s.answer };
}

function takeSocial(s: Partial<SocialLink> | null | undefined): SocialLink | null {
  if (!s?.label || !s?.href) return null;
  return { label: s.label, href: s.href };
}

function takeCarouselSlide(
  s: Partial<ServiceCarouselSlide> | null | undefined,
): ServiceCarouselSlide | null {
  if (!s?.name?.trim() || !s?.image?.trim() || isStaleAssetUrl(s.image)) return null;
  return { name: s.name.trim(), image: normalizeHcbImagePath(s.image.trim()) };
}

/** Only `/services/foot-massage-reflexology/` is the dedicated primary service landing route. */
function sanitizeServiceHrefs(services: ServiceItem[]): ServiceItem[] {
  return services.map((s) => {
    const raw = s.href?.trim();
    if (!raw) return { ...s, href: undefined };
    const pathOnly = raw.split("?")[0].replace(/\/+$/, "") || "/";
    if (
      pathOnly === "/foot-massage-reflexology" ||
      pathOnly === "/services/foot-massage-reflexology" ||
      pathOnly === "/pressure-washing-boise-id"
    ) {
      return { ...s, href: "/services/foot-massage-reflexology/" };
    }
    return { ...s, href: undefined };
  });
}

/** Fill card links from static defaults when CMS services omit `href` but names match. */
function enrichServiceHrefs(content: HomeContent, staticServices: ServiceItem[]): HomeContent {
  const hrefByName = new Map<string, string>();
  for (const s of staticServices) {
    if (s.href) hrefByName.set(s.name, s.href);
  }
  const merged = content.services.map((s) => ({
    ...s,
    href: s.href ?? hrefByName.get(s.name),
  }));
  return {
    ...content,
    services: sanitizeServiceHrefs(merged),
  };
}

function finalizeHomeContent(content: HomeContent): HomeContent {
  return { ...content, services: sanitizeServiceHrefs(content.services) };
}

export function mergeHomeContent(
  staticContent: HomeContent,
  remote: RemoteHomeContentPatch | null,
): HomeContent {
  if (!remote) return staticContent;

  const next: HomeContent = { ...staticContent };

  if (isNonEmpty(remote.navItems)) {
    next.navItems = remote.navItems;
  }
  if (isNonEmpty(remote.trustBarItems)) {
    next.trustBarItems = remote.trustBarItems;
  }

  if (isNonEmpty(remote.services)) {
    const mapped = remote.services.map(takeService).filter(Boolean) as ServiceItem[];
    if (mapped.length > 0) {
      next.services = mapped;
    }
  }

  if (isNonEmpty(remote.servicesCarousel)) {
    const mapped = remote.servicesCarousel
      .map(takeCarouselSlide)
      .filter(Boolean) as ServiceCarouselSlide[];
    if (mapped.length > 0) {
      next.servicesCarousel = mapped;
    }
  }

  if (isNonEmpty(remote.whyChooseUs)) {
    const mapped = remote.whyChooseUs.map(takeWhy).filter(Boolean) as WhyItem[];
    if (mapped.length > 0 && !isStaleWhyChooseUsSet(mapped)) {
      next.whyChooseUs = mapped;
    }
  }

  // Process steps stay canonical from code unless Sanity provides a full, non-spa set.
  if (isNonEmpty(remote.processSteps)) {
    const mapped = remote.processSteps.map(takeProcess).filter(Boolean) as ProcessItem[];
    if (mapped.length >= staticContent.processSteps.length) {
      next.processSteps = mapped;
    }
  }

  if (isNonEmpty(remote.googleReviews)) {
    const mapped = remote.googleReviews
      .map(takeReview)
      .filter(Boolean) as GoogleReview[];
    if (mapped.length > 0) {
      next.googleReviews = mapped;
    }
  }

  if (isNonEmpty(remote.faqs)) {
    const mapped = remote.faqs.map(takeFaq).filter(Boolean) as Faq[];
    if (mapped.length >= staticContent.faqs.length) {
      next.faqs = mapped;
    }
  }

  if (remote.copy && typeof remote.copy === "object") {
    next.copy = mergeHomePageCopy(staticContent.copy, remote.copy);
  }

  // Social profiles stay canonical from code (`DEFAULT_SOCIAL_LINKS`) so outdated Sanity rows
  // (e.g. X / LinkedIn from the prior brand) never replace Zen listings.

  return finalizeHomeContent(enrichServiceHrefs(next, staticContent.services));
}

function orDefined<T>(arr: T[] | undefined): T[] | undefined {
  if (!arr || arr.length === 0) return undefined;
  return arr;
}

export function sanityDocToPartial(doc: SanityDoc | null): RemoteHomeContentPatch | null {
  if (!doc) return null;
  const partial: RemoteHomeContentPatch = {
    navItems: orDefined(doc.navItems ?? []),
    trustBarItems: orDefined(doc.trustBarItems ?? []),
    services: orDefined(
      (doc.services?.map(takeService).filter(Boolean) as ServiceItem[]) ?? [],
    ),
    servicesCarousel: orDefined(
      (doc.servicesCarousel?.map(takeCarouselSlide).filter(Boolean) as ServiceCarouselSlide[]) ??
        [],
    ),
    whyChooseUs: orDefined((doc.whyChooseUs?.map(takeWhy).filter(Boolean) as WhyItem[]) ?? []),
    processSteps: orDefined(
      (doc.processSteps?.map(takeProcess).filter(Boolean) as ProcessItem[]) ?? [],
    ),
    googleReviews: orDefined(
      (doc.googleReviews?.map(takeReview).filter(Boolean) as GoogleReview[]) ?? [],
    ),
    faqs: orDefined((doc.faqs?.map(takeFaq).filter(Boolean) as Faq[]) ?? []),
    socialLinks: orDefined(
      (doc.socialLinks?.map(takeSocial).filter(Boolean) as SocialLink[]) ?? [],
    ),
  };
  if (doc.pageCopy && typeof doc.pageCopy === "object") {
    partial.copy = doc.pageCopy;
  }
  return partial;
}

export async function fetchSanityHomeContent(): Promise<RemoteHomeContentPatch | null> {
  const client = getSanityClient();
  if (!client) {
    return null;
  }
  try {
    const doc = (await client.fetch(homePageQuery)) as SanityDoc | null;
    return sanityDocToPartial(doc);
  } catch {
    return null;
  }
}

export async function getHomeContentForPage(): Promise<HomeContent> {
  const staticContent = finalizeHomeContent(getStaticHomeContent());
  const remote = await fetchSanityHomeContent();
  if (remote) {
    return mergeHomeContent(staticContent, remote);
  }
  if (process.env.SANITY_STRICT_MODE === "true") {
    throw new Error(
      "Sanity content is required. Configure env vars and publish a homePage document.",
    );
  }
  return staticContent;
}

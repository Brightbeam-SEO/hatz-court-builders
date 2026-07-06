import type { Metadata } from "next";

const SITE_ORIGIN = "https://hatzcourtbuilders.com";

/** SEO metadata for active site routes. */
export const GPM_SITEMAP_SEO: Record<
  string,
  { title: string; description: string; openGraphTitle?: string }
> = {
  "/": {
    title: "Court Builders Boise & Scottsdale | Hatz Court Builders",
    description:
      "Hatz Court Builders designs and builds custom pickleball, tennis, basketball, and multi-use courts in Boise and Scottsdale. Get started today.",
    openGraphTitle: "Hatz Court Builders",
  },
  "/about/": {
    title: "About Hatz Court Builders | Court Construction Idaho & Arizona",
    description:
      "Hatz Court Builders designs and builds custom tennis, basketball, pickleball, and multi-use courts across Idaho and Arizona.",
  },
  "/contact/": {
    title: "Contact Hatz Court Builders | Free Court Consultation",
    description:
      "Contact Hatz Court Builders for custom court construction, resurfacing, and design-build in Boise, Scottsdale, and surrounding areas. Call (208) 979-0002.",
  },
  "/gallery/": {
    title: "Court Construction Gallery | Hatz Court Builders",
    description:
      "Browse custom pickleball, basketball, tennis, and multi-use court projects built by Hatz Court Builders in Idaho.",
  },
  "/faq/": {
    title: "Court Construction FAQs | Hatz Court Builders",
    description:
      "Answers about court surfaces, construction, resurfacing, and service areas from Hatz Court Builders in Boise and Scottsdale.",
  },
  "/reviews/": {
    title: "Reviews | Hatz Court Builders",
    description: "See what clients say about Hatz Court Builders court construction and resurfacing projects.",
  },
  "/blog/": {
    title: "Court Builder Blog | Hatz Court Builders",
    description:
      "Tips and guides about court construction, surfacing options, and multi-use court design from Hatz Court Builders.",
  },
  "/basketball-court-construction/": {
    title: "Basketball Court Construction | Custom Courts | Hatz",
    description:
      "Custom basketball court construction for homes, schools, HOAs, parks, gyms, and commercial properties. Call us today!",
  },
  "/pickleball-court-construction/": {
    title: "Pickleball Court Construction | One-Stop Shop | Hatz",
    description:
      "Professional pickleball court construction for homes, schools, HOAs, parks, clubs, and commercial properties. Call us today.",
  },
  "/volleyball-court-construction/": {
    title: "Volleyball Court Construction | Custom Courts | Hatz",
    description:
      "Custom volleyball court construction for homes, schools, parks, HOAs, clubs, recreation centers, and commercial properties. Call us today!",
  },
  "/futsal-soccer-court-construction/": {
    title: "Futsal / Soccer Court Construction | Custom Courts | Hatz",
    description:
      "Custom futsal and soccer court construction for schools, parks, clubs, training facilities, HOAs, gyms, and commercial properties. Call us today!",
  },
  "/tennis-court-construction/": {
    title: "Tennis Court Construction | Custom Courts | Hatz",
    description:
      "Custom tennis court construction for homes, schools, clubs, HOAs, parks, and commercial properties. Call us today!",
  },
};

export function getGpmSitemapSeo(path: string): (typeof GPM_SITEMAP_SEO)[string] | undefined {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return GPM_SITEMAP_SEO[withSlash];
}

export const GPM_BLOG_SEO: Record<string, { title: string; description: string }> = {};

export function buildGpmBlogPageMetadata(slug: string): Metadata {
  const entry = GPM_BLOG_SEO[slug];
  if (!entry) return {};

  const canonical = `${SITE_ORIGIN}/blog/${slug}/`;

  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: canonical,
    },
  };
}

export function buildGpmPageMetadata(path: string): Metadata {
  const entry = getGpmSitemapSeo(path);
  if (!entry) return {};

  const normalized = path.endsWith("/") ? path : `${path}/`;
  const canonical = `${SITE_ORIGIN}${normalized}`;
  const ogTitle = entry.openGraphTitle ?? entry.title;

  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: entry.description,
      url: canonical,
    },
  };
}

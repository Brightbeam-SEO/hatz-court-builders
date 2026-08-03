import type { Metadata } from "next";
import { buildCanonicalUrl, normalizeSitePath } from "@/lib/site-url";

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
      "Expert basketball court construction for residential and commercial spaces. Built for performance and longevity. Contact us for a quote.",
  },
  "/pickleball-court-construction/": {
    title: "Pickleball Court Construction | Custom Courts | Hatz",
    description:
      "Professional pickleball court construction built for durability and performance. Custom layouts and surfaces available. Contact us to get started.",
  },
  "/volleyball-court-construction/": {
    title: "Volleyball Court Construction | All Court Types | Hatz",
    description:
      "Durable volleyball court construction for indoor and outdoor use. Built to match your space and needs. Contact us for details.",
  },
  "/futsal-soccer-court-construction/": {
    title: "Soccer Court Construction | All Court Types | Hatz",
    description:
      "Custom soccer court construction for training or recreation. Designed for performance and safety. Contact us to learn more.",
  },
  "/tennis-court-construction/": {
    title: "Tennis Court Construction | Custom Courts | Hatz",
    description:
      "High-quality tennis court construction with premium materials and precision builds. Designed for long-term play. Contact us today.",
  },
  "/bocce-court-construction/": {
    title: "Bocce Court Construction | Custom Courts | Hatz",
    description:
      "Precision bocce court construction with proper base and surface systems. Built for smooth, consistent play. Contact us today.",
  },
  "/multi-court-construction/": {
    title: "Multi Court Construction | All Court Types | Hatz",
    description:
      "Multi court construction for parks, schools, and facilities. Build multiple courts in one space. Contact us to plan your project.",
  },
  "/custom-court-construction/": {
    title: "Custom Court Construction | Custom Courts | Hatz",
    description:
      "Fully custom court construction tailored to your space, sport, and design preferences. Built your way. Contact us now.",
  },
  "/commercial-court-construction/": {
    title: "Commercial Court Construction | All Court Types | Hatz",
    description:
      "Commercial court construction for schools, HOAs, and facilities. Built for durability and heavy use. Contact us for more info.",
  },
  "/court-expansion/": {
    title: "Court Expansion | All Court Types | Hatz",
    description:
      "Court expansion services to upgrade or extend your existing sports court space. Seamless additions. Contact us today.",
  },
  "/custom-court-design/": {
    title: "Custom Court Design | Custom Courts | Hatz",
    description:
      "Custom court design services to plan layout, materials, and functionality for your project. Start your build right. Contact us.",
  },
  "/asphalt-court-installation/": {
    title: "Asphalt Court Installation | Durable Bases | Hatz",
    description:
      "Professional asphalt court installation for tennis, pickleball, basketball, and multi-use courts. Built for drainage and longevity. Get a free quote.",
  },
  "/concrete-court-installation/": {
    title: "Concrete Court Installation | Stable Slabs | Hatz",
    description:
      "Concrete court installation for backyard and commercial sports courts. Precision slabs built for coatings, modular systems, and heavy use. Contact us today.",
  },
  "/acrylic-court-systems/": {
    title: "Acrylic Court Systems | Color & Performance | Hatz",
    description:
      "Acrylic court systems for tennis, pickleball, and multi-use courts. Professional coatings for color, grip, and weather resistance. Request a quote.",
  },
  "/synthetic-courts/": {
    title: "Synthetic Courts | Turf & Specialty Surfaces | Hatz",
    description:
      "Synthetic court installation for training, multi-sport, and specialty play areas. Durable turf and synthetic systems for homes and facilities. Contact us.",
  },
  "/modular-court-surfaces/": {
    title: "Modular Court Surfaces | Tile Systems | Hatz",
    description:
      "Modular court surfaces and interlocking tile systems for backyard and commercial courts. Fast install, great drainage, multi-sport ready. Get a quote.",
  },
  "/cushioned-court-systems/": {
    title: "Cushioned Court Systems | Player Comfort | Hatz",
    description:
      "Cushioned court systems that reduce joint impact for tennis, pickleball, and multi-use play. Comfort-focused acrylic layers. Contact Hatz today.",
  },
  "/indoor-sports-flooring/": {
    title: "Indoor Sports Flooring | Gym & Court Floors | Hatz",
    description:
      "Indoor sports flooring for gyms, schools, and indoor courts. Durable flooring systems for basketball, multi-sport, and training spaces. Get a quote.",
  },
};

export function getGpmSitemapSeo(path: string): (typeof GPM_SITEMAP_SEO)[string] | undefined {
  return GPM_SITEMAP_SEO[normalizeSitePath(path)];
}

export const GPM_BLOG_SEO: Record<string, { title: string; description: string }> = {};

type CanonicalPageMetadataInput = {
  path: string;
  title: string;
  description: string;
  openGraphTitle?: string;
};

/** One self-referencing canonical, matching Open Graph URL, for an indexable page. */
export function buildCanonicalPageMetadata({
  path,
  title,
  description,
  openGraphTitle,
}: CanonicalPageMetadataInput): Metadata {
  const canonical = buildCanonicalUrl(path);
  const ogTitle = openGraphTitle ?? title;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
    },
  };
}

export function buildGpmBlogPageMetadata(slug: string): Metadata {
  const entry = GPM_BLOG_SEO[slug];
  if (!entry) return {};

  return buildCanonicalPageMetadata({
    path: `/blog/${slug}/`,
    title: entry.title,
    description: entry.description,
  });
}

export function buildGpmPageMetadata(path: string): Metadata {
  const entry = getGpmSitemapSeo(path);
  if (!entry) return {};

  return buildCanonicalPageMetadata({
    path,
    title: entry.title,
    description: entry.description,
    openGraphTitle: entry.openGraphTitle,
  });
}

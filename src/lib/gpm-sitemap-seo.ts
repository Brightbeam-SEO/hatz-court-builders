import type { Metadata } from "next";
import { buildCanonicalUrl, normalizeSitePath } from "@/lib/site-url";

/** Default share image when a page does not supply its own. */
const DEFAULT_OG_IMAGE =
  "/images/hcb/outdoor-multi-court-acrylic-surfacing-pickleball-basketball-tennis-hatz-court-builders.jpg";

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
    description:
      "See what clients say about Hatz Court Builders court construction, resurfacing, and repair projects across Boise, Scottsdale, and nearby communities.",
  },
  "/blog/": {
    title: "Court Builder Blog | Hatz Court Builders",
    description:
      "Tips and guides about court construction, surfacing options, and multi-use court design from Hatz Court Builders.",
  },
  "/terms-of-use/": {
    title: "Terms of Use | Hatz Court Builders",
    description:
      "Review the Terms of Use for Hatz Court Builders, covering website usage, sports court construction inquiries, estimates, and legal conditions.",
  },
  "/privacy-policy/": {
    title: "Privacy Policy | Hatz Court Builders",
    description:
      "Learn how Hatz Court Builders collects, uses, and protects personal information submitted through our sports court construction website.",
  },
  "/licence-agreement/": {
    title: "Licence Agreement | Hatz Court Builders",
    description:
      "Review the Hatz Court Builders Licence Agreement covering website content usage, court design materials, intellectual property, and restrictions.",
  },
  "/basketball-court-construction/": {
    title: "Basketball Court Construction | Indoor & Outdoor Courts",
    description:
      "Build a basketball court tailored to your space and playing needs. We construct residential and commercial courts with custom layouts and durable surfaces.",
  },
  "/pickleball-court-construction/": {
    title: "Pickleball Court Construction & Custom Court Installation",
    description:
      "Build a custom pickleball court for your backyard, school or sports facility. We handle court design, construction and surface installation. Request a quote.",
  },
  "/volleyball-court-construction/": {
    title: "Volleyball Court Construction | Indoor & Outdoor Courts",
    description:
      "Create a volleyball court suited to your property or sports facility. We offer indoor and outdoor court construction with customized layouts and surfaces.",
  },
  "/futsal-soccer-court-construction/": {
    title: "Futsal & Soccer Court Construction | Custom Court Builders",
    description:
      "Build a dedicated space for training and recreational play with futsal and soccer court construction. Explore custom layouts and surfaces for your facility.",
  },
  "/tennis-court-construction/": {
    title: "Tennis Court Construction | Custom Tennis Court Builders",
    description:
      "From private tennis courts to commercial facilities, we provide custom tennis court construction with carefully planned layouts and surfaces. Get a quote.",
  },
  "/bocce-court-construction/": {
    title: "Bocce Court Construction | Custom Bocce Ball Court Builders",
    description:
      "Enjoy consistent play with custom bocce court construction. We handle court layout, base preparation and surface installation for your property. Get a quote.",
  },
  "/multi-court-construction/": {
    title: "Multi-Court Construction | Custom Multi-Use Court Builders",
    description:
      "Make the most of your available space with multi-use court construction for homes, schools, parks and athletic facilities. Discuss your court project with us.",
  },
  "/custom-court-construction/": {
    title: "Custom Athletic Court Construction | Design & Installation",
    description:
      "Bring your athletic court vision to life with custom court construction. Choose your layout, playing surface and court features to suit your space and sport.",
  },
  "/commercial-court-construction/": {
    title: "Commercial Court Construction | Athletic Court Builders",
    description:
      "Develop durable athletic facilities with commercial court construction for schools, HOAs, parks and recreational properties. Discuss your project with us.",
  },
  "/court-expansion/": {
    title: "Athletic Court Expansion | Court Additions & Upgrades",
    description:
      "Need more playing space? Our athletic court expansion services help extend existing courts and accommodate additional recreational activities. Plan your upgrade.",
  },
  "/custom-court-design/": {
    title: "Custom Court Design | Athletic Court Layout & Planning",
    description:
      "Plan your ideal athletic court with custom court design services. Explore layouts, surface materials and playing features suited to your space and intended use.",
  },
  "/asphalt-court-installation/": {
    title: "Asphalt Court Installation | Athletic Court Construction",
    description:
      "Create a durable foundation for tennis, basketball or pickleball with asphalt court installation. We build court bases with drainage and performance in mind.",
  },
  "/concrete-court-installation/": {
    title: "Concrete Court Installation | Court Slabs & Foundations",
    description:
      "Build a stable foundation for your backyard or commercial athletic court with concrete court installation. Explore slabs suited to acrylic and modular surfaces.",
  },
  "/acrylic-court-systems/": {
    title: "Acrylic Court Surfacing | Pickleball & Tennis Court Systems",
    description:
      "Enhance court performance with acrylic court systems for tennis, pickleball and multi-use play. Explore surface coatings, color options and traction.",
  },
  "/synthetic-courts/": {
    title: "Synthetic Athletic Courts | Turf & Specialty Surfaces",
    description:
      "Explore synthetic court installation for residential properties, training spaces and athletic facilities. Discover turf and specialty playing surface options.",
  },
  "/modular-court-surfaces/": {
    title: "Modular Court Surfaces | Interlocking Athletic Court Tiles",
    description:
      "Upgrade your playing area with modular court surfaces and interlocking athletic tiles. Explore versatile flooring options for backyard and commercial courts.",
  },
  "/cushioned-court-systems/": {
    title: "Cushioned Court Surfacing | Acrylic Athletic Court Systems",
    description:
      "Improve playing comfort with cushioned court systems for tennis, pickleball and multi-use courts. Explore acrylic surface options designed to absorb impact.",
  },
  "/indoor-sports-flooring/": {
    title: "Indoor Sports Flooring | Gymnasium & Athletic Court Flooring",
    description:
      "Create a functional indoor athletic space with sports flooring for gyms, schools and training facilities. Explore basketball and multi-use flooring options.",
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
  openGraphType?: "website" | "article";
  image?: string;
};

/** One self-referencing canonical, matching Open Graph URL, for an indexable page. */
export function buildCanonicalPageMetadata({
  path,
  title,
  description,
  openGraphTitle,
  openGraphType = "website",
  image,
}: CanonicalPageMetadataInput): Metadata {
  const canonical = buildCanonicalUrl(path);
  const ogTitle = openGraphTitle ?? title;
  const imageUrl = image?.trim() || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      type: openGraphType,
      images: [{ url: imageUrl, alt: ogTitle }],
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

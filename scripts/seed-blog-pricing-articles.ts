import fs from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import { servicesCarousel } from "../src/components/home/site-data";
import {
  FOOT_MASSAGE_COST_TOC,
  HOW_MUCH_MASSAGE_SPA_COST_TOC,
  MASSAGE_THERAPIST_COST_TOC,
} from "../src/components/blog/articles/massage-pricing-guides-toc";
import type { BlogArticleTocItem } from "../src/components/blog/blog-article-types";

/** Same assets as home `#services` carousel (`ServicesSection`): card 0 and card 10. */
const SEED_IMG_SERVICE_FOOT = servicesCarousel[0]!.image;
const SEED_IMG_SERVICE_MEDICAL = servicesCarousel[10]!.image;
const ZEN_IMG_SPA_BEDS =
  "/images/gpm/modern-kitchen-interior-rental-property-marketing-meridian-idaho-greenbelt-property-management.webp";

function tocToSanity(toc: BlogArticleTocItem[]) {
  return toc.map((t, i) => ({
    _key: `toc-${String(i).padStart(2, "0")}`,
    id: t.id,
    label: t.label,
    level: t.level,
  }));
}

type SeedSpec = {
  slug: string;
  category: "body-massage" | "foot-massage-reflexology";
  mdFile: string;
  title: string;
  subtitle: string;
  excerpt: string;
  publishedAt: string;
  featured: boolean;
  featuredImage: string;
  featuredImageAlt: string;
  metaTitle: string;
  metaDescription: string;
  toc: BlogArticleTocItem[];
};

const SPECS: SeedSpec[] = [
  {
    slug: "massage-therapist-cost",
    category: "body-massage",
    mdFile: "massage-therapist-cost-body.md",
    title: "Massage Therapist Cost Guide: Pricing & Rates Explained",
    subtitle: "Understanding Massage Therapist Costs in Eagle, ID",
    excerpt:
      "If you are considering visiting a massage spa in Eagle, ID, you might wonder about the costs associated with different types of massage therapy. Pricing is typically based on session length and the type of massage selected.",
    publishedAt: "2026-05-10T15:00:00.000Z",
    featured: false,
    featuredImage: SEED_IMG_SERVICE_MEDICAL,
    featuredImageAlt: "Medical massage — Zen Day Spa Eagle",
    metaTitle: "Massage Therapist Cost Guide: Pricing & Rates Explained | Zen Day Spa",
    metaDescription:
      "Massage therapist cost in Eagle, ID: session-length pricing, types of massage, what affects rates, FAQs, and how to book at Zen Day Spa.",
    toc: MASSAGE_THERAPIST_COST_TOC,
  },
  {
    slug: "foot-massage-cost",
    category: "foot-massage-reflexology",
    mdFile: "foot-massage-cost-body.md",
    title: "Foot Massage Cost: What You'll Pay and What Affects Pricing",
    subtitle: "Understanding Foot Massage Costs in Eagle, ID",
    excerpt:
      "If you are considering a foot massage in Eagle, ID, you are probably wondering how much a foot massage costs. Here is a breakdown of reflexology, combos, session length, and pricing.",
    publishedAt: "2026-05-09T15:00:00.000Z",
    featured: false,
    featuredImage: SEED_IMG_SERVICE_FOOT,
    featuredImageAlt: "Foot Massage & Reflexology — Zen Day Spa Eagle",
    metaTitle: "Foot Massage Cost: What You'll Pay and What Affects Pricing | Zen Day Spa",
    metaDescription:
      "Foot massage cost in Eagle, ID: reflexology and combo pricing, session lengths, factors that affect price, FAQs, and booking at Zen Day Spa.",
    toc: FOOT_MASSAGE_COST_TOC,
  },
  {
    slug: "how-much-does-a-massage-spa-cost",
    category: "body-massage",
    mdFile: "how-much-does-a-massage-spa-cost-body.md",
    title: "How Much Does a Massage Spa Cost? Prices & What to Expect",
    subtitle: "What Affects Massage Spa Costs in Eagle, ID?",
    excerpt:
      "If you are looking for a massage spa in Eagle, ID, you may wonder how much a massage will cost. Pricing depends on session length and the type of massage selected.",
    publishedAt: "2026-05-08T15:00:00.000Z",
    featured: false,
    featuredImage: ZEN_IMG_SPA_BEDS,
    featuredImageAlt: "Spa treatment beds and relaxation room at Zen Day Spa Eagle Idaho",
    metaTitle: "How Much Does a Massage Spa Cost? Prices & What to Expect | Zen Day Spa",
    metaDescription:
      "Massage spa costs in Eagle, ID: typical session prices, Swedish and deep tissue specials, pregnancy massage, reflexology, FAQs, and booking.",
    toc: HOW_MUCH_MASSAGE_SPA_COST_TOC,
  },
];

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });

  for (const spec of SPECS) {
    const mdPath = path.join(process.cwd(), "content/blog", spec.mdFile);
    const bodyMarkdown = fs.readFileSync(mdPath, "utf8");

    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "blogPost" && slug.current == $slug][0]{_id}`,
      { slug: spec.slug },
    );
    const docId = existing?._id ?? `blogPost-${spec.slug}`;

    const doc = {
      _id: docId,
      _type: "blogPost" as const,
      title: spec.title,
      slug: { _type: "slug" as const, current: spec.slug },
      category: spec.category,
      subtitle: spec.subtitle,
      excerpt: spec.excerpt,
      publishedAt: spec.publishedAt,
      featured: spec.featured,
      featuredImage: spec.featuredImage,
      featuredImageAlt: spec.featuredImageAlt,
      layoutTemplate: "fullArticle",
      bodyMarkdown,
      tocItems: tocToSanity(spec.toc),
      seo: {
        metaTitle: spec.metaTitle,
        metaDescription: spec.metaDescription,
      },
    };

    await client.createOrReplace(doc);
    console.log(`Seeded Sanity blogPost: ${docId} (${spec.slug})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

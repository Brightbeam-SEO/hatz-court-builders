import { getCliClient } from "sanity/cli";
import { GPM_IMPORTED_BLOG_FALLBACK_DEFS } from "../src/lib/gpm-imported-blog-fallback";
import { readMarkdown, makeKey } from "./lib/sanity-seed-utils";

type BlogSeedDef = {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  featured: boolean;
  mdFile: string;
  tocItems: Array<{ id: string; label: string; level: number }>;
};

const COURT_PLANNING_GUIDE: BlogSeedDef = {
  slug: "what-to-consider-before-building-a-custom-court-in-boise-or-scottsdale",
  title: "What to Consider Before Building a Custom Court in Boise or Scottsdale",
  excerpt:
    "Planning a tennis, basketball, pickleball, or multi-use court? Discover the key factors to consider before starting a custom sports court construction project.",
  metaTitle: "What to Consider Before Building a Custom Court in Boise or Scottsdale",
  metaDescription:
    "Planning a tennis, basketball, pickleball, or multi-use court? Discover the key factors to consider before starting a custom sports court construction project.",
  image: "/images/hcb/multi-sport-outdoor-backyard-court-boise-id-hatz-court-builders.jpg",
  imageAlt: "Multi sport outdoor backyard court by Hatz Court Builders",
  publishedAt: "2026-05-10T15:00:00.000Z",
  featured: true,
  mdFile: "what-to-consider-before-building-a-custom-court-in-boise-or-scottsdale-body.md",
  tocItems: [
    { id: "start-with-the-main-purpose-of-the-court", label: "Start With the Main Purpose of the Court", level: 2 },
    { id: "think-about-your-available-space", label: "Think About Your Available Space", level: 2 },
    { id: "choose-the-right-court-surface", label: "Choose the Right Court Surface", level: 2 },
    {
      id: "decide-between-a-dedicated-court-and-a-multi-use-court",
      label: "Dedicated vs. Multi-Use Court",
      level: 2,
    },
    {
      id: "plan-for-site-preparation-drainage-and-base-work",
      label: "Site Prep, Drainage, and Base Work",
      level: 2,
    },
    {
      id: "consider-fencing-lighting-equipment-and-court-components",
      label: "Fencing, Lighting, and Equipment",
      level: 2,
    },
    { id: "think-about-long-term-maintenance", label: "Long-Term Maintenance", level: 2 },
    {
      id: "work-with-a-court-builder-that-understands-multiple-sports-and-surfaces",
      label: "Work With the Right Builder",
      level: 2,
    },
    {
      id: "frequently-asked-questions-about-custom-court-construction",
      label: "FAQs About Court Construction",
      level: 2,
    },
    { id: "build-the-right-court-from-the-start", label: "Build the Right Court From the Start", level: 2 },
  ],
};

const BLOG_SPECS: BlogSeedDef[] = [
  COURT_PLANNING_GUIDE,
  ...GPM_IMPORTED_BLOG_FALLBACK_DEFS.map((def) => ({
    slug: def.slug,
    title: def.title,
    excerpt: def.excerpt,
    metaTitle: def.metaTitle ?? def.title,
    metaDescription: def.metaDescription ?? def.excerpt,
    image: def.image,
    imageAlt: def.imageAlt ?? def.title,
    publishedAt: def.publishedAt,
    featured: def.featured ?? false,
    mdFile: def.mdFile,
    tocItems: def.tocItems,
  })),
];

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });

  console.log(`Seeding ${BLOG_SPECS.length} blog posts:\n`);

  for (const spec of BLOG_SPECS) {
    const bodyMarkdown = await readMarkdown(`content/blog/${spec.mdFile}`);

    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "blogPost" && slug.current == $slug][0]{_id}`,
      { slug: spec.slug },
    );
    const docId = existing?._id ?? `blogPost.${spec.slug}`;

    await client.createOrReplace({
      _id: docId,
      _type: "blogPost",
      title: spec.title,
      slug: { _type: "slug", current: spec.slug },
      category: "property-management",
      excerpt: spec.excerpt,
      publishedAt: spec.publishedAt,
      featured: spec.featured,
      featuredImage: spec.image,
      featuredImageAlt: spec.imageAlt,
      layoutTemplate: "fullArticle",
      bodyMarkdown,
      tocItems: spec.tocItems.map((t, i) => ({
        _key: makeKey("toc", i),
        id: t.id,
        label: t.label,
        level: t.level,
      })),
      seo: {
        metaTitle: spec.metaTitle,
        metaDescription: spec.metaDescription,
      },
    });

    console.log(`  ✓ ${docId} → /blog/${spec.slug}/`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

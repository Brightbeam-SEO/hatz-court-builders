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

const WHAT_IS_PROPERTY_MANAGEMENT: BlogSeedDef = {
  slug: "what-is-property-management",
  title: "What Is Property Management? A Guide for Rental Property Owners in Meridian, Idaho",
  excerpt:
    "Learn what property management is, what a property manager does, and whether hiring a company is worth it—plus how Greenbelt serves Meridian and the Treasure Valley.",
  metaTitle: "What Is Property Management? Meridian ID Guide | Greenbelt PM",
  metaDescription:
    "What is property management? Learn what property managers do, services included, FAQs, and how Greenbelt Property Management helps rental owners in Meridian, Idaho.",
  image: "/images/gpm/modern-kitchen-interior-rental-property-marketing-meridian-idaho-greenbelt-property-management.webp",
  imageAlt: "Greenbelt Property Management — Meridian, Idaho",
  publishedAt: "2026-05-10T15:00:00.000Z",
  featured: true,
  mdFile: "what-is-property-management-body.md",
  tocItems: [
    { id: "what-is-property-management", label: "What is property management?", level: 2 },
    { id: "what-does-a-pm-company-do", label: "What does a PM company do?", level: 2 },
    { id: "why-hire", label: "Why owners hire a PM company", level: 2 },
    { id: "is-it-worth-it", label: "Is property management worth it?", level: 2 },
    { id: "good-pm-company", label: "What makes a good PM company?", level: 2 },
    { id: "meridian-idaho", label: "Property management in Meridian", level: 2 },
    { id: "long-term-vs-short-term", label: "Long-term vs. short-term", level: 2 },
    { id: "faq", label: "FAQs", level: 2 },
    { id: "get-started", label: "Get started in Meridian", level: 2 },
  ],
};

const BLOG_SPECS: BlogSeedDef[] = [
  WHAT_IS_PROPERTY_MANAGEMENT,
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

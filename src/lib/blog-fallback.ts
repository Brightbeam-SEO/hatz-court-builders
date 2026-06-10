import "server-only";

import fs from "node:fs";
import path from "node:path";

import type { BlogPost } from "@/lib/blog-types";
import { GPM_IMPORTED_BLOG_FALLBACK_DEFS } from "@/lib/gpm-imported-blog-fallback";
import { gpmPick } from "@/lib/gpm-pick-gallery";

function readBlogMarkdown(filename: string): string {
  const mdPath = path.join(process.cwd(), "content/blog", filename);
  try {
    return fs.readFileSync(mdPath, "utf8");
  } catch {
    return "";
  }
}

type FallbackDef = Omit<BlogPost, "bodyMarkdown"> & {
  mdFile: string;
  tocItems: NonNullable<BlogPost["tocItems"]>;
};

const FALLBACK_DEFS: FallbackDef[] = [
  ...GPM_IMPORTED_BLOG_FALLBACK_DEFS,
  {
    id: "local-fallback-what-is-property-management",
    slug: "what-is-property-management",
    category: "property-management",
    title: "What Is Property Management? A Guide for Rental Property Owners in Meridian, Idaho",
    subtitle: "What property managers do, why owners hire them, and how to choose a local team",
    excerpt:
      "Learn what property management is, what a property manager does, and whether hiring a company is worth it—plus how Greenbelt serves Meridian and the Treasure Valley.",
    metaTitle: "What Is Property Management? Meridian ID Guide | Greenbelt PM",
    metaDescription:
      "What is property management? Learn what property managers do, services included, FAQs, and how Greenbelt Property Management helps rental owners in Meridian, Idaho.",
    image: gpmPick("pickleball court backyard modular tile"),
    imageAlt: "Greenbelt Property Management — Meridian, Idaho",
    publishedAt: "2026-05-10T15:00:00.000Z",
    featured: false,
    layoutTemplate: "fullArticle",
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
  },
];

/** Local markdown fallbacks when Sanity is off or missing documents (merged by slug in `blog.ts`). */
export function getLocalFallbackBlogPosts(): BlogPost[] {
  return FALLBACK_DEFS.map(({ mdFile, tocItems, ...rest }) => ({
    ...rest,
    bodyMarkdown: readBlogMarkdown(mdFile),
    tocItems,
  }));
}

const GPM_IMPORTED_BLOG_SLUGS = new Set(GPM_IMPORTED_BLOG_FALLBACK_DEFS.map((def) => def.slug));

export function mergeBlogPostsWithFallback(remote: BlogPost[]): BlogPost[] {
  const bySlug = new Map<string, BlogPost>();
  for (const p of remote) {
    bySlug.set(p.slug, p);
  }
  for (const f of getLocalFallbackBlogPosts()) {
    const existing = bySlug.get(f.slug);
    if (GPM_IMPORTED_BLOG_SLUGS.has(f.slug)) {
      bySlug.set(f.slug, { ...existing, ...f });
      continue;
    }
    if (!existing) {
      bySlug.set(f.slug, f);
    }
  }
  return [...bySlug.values()];
}

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
    id: "local-fallback-what-to-consider-before-building-a-custom-court-in-boise-or-scottsdale",
    slug: "what-to-consider-before-building-a-custom-court-in-boise-or-scottsdale",
    category: "property-management",
    title: "What to Consider Before Building a Custom Court in Boise or Scottsdale",
    subtitle:
      "Key planning factors for custom tennis, basketball, pickleball, and multi-use court construction",
    excerpt:
      "Planning a tennis, basketball, pickleball, or multi-use court? Discover the key factors to consider before starting a custom sports court construction project.",
    metaTitle: "What to Consider Before Building a Custom Court in Boise or Scottsdale",
    metaDescription:
      "Planning a tennis, basketball, pickleball, or multi-use court? Discover the key factors to consider before starting a custom sports court construction project.",
    image: gpmPick("multi sport outdoor backyard court"),
    imageAlt: "Multi sport outdoor backyard court by Hatz Court Builders",
    publishedAt: "2026-05-10T15:00:00.000Z",
    featured: false,
    layoutTemplate: "fullArticle",
    mdFile: "what-to-consider-before-building-a-custom-court-in-boise-or-scottsdale-body.md",
    tocItems: [
      { id: "start-with-the-main-purpose-of-the-court", label: "Start With the Main Purpose of the Court", level: 2 },
      { id: "think-about-your-available-space", label: "Think About Your Available Space", level: 2 },
      { id: "choose-the-right-court-surface", label: "Choose the Right Court Surface", level: 2 },
      { id: "decide-between-a-dedicated-court-and-a-multi-use-court", label: "Dedicated vs. Multi-Use Court", level: 2 },
      { id: "plan-for-site-preparation-drainage-and-base-work", label: "Site Prep, Drainage, and Base Work", level: 2 },
      { id: "consider-fencing-lighting-equipment-and-court-components", label: "Fencing, Lighting, and Equipment", level: 2 },
      { id: "think-about-long-term-maintenance", label: "Long-Term Maintenance", level: 2 },
      { id: "work-with-a-court-builder-that-understands-multiple-sports-and-surfaces", label: "Work With the Right Builder", level: 2 },
      { id: "frequently-asked-questions-about-custom-court-construction", label: "FAQs About Court Construction", level: 2 },
      { id: "build-the-right-court-from-the-start", label: "Build the Right Court From the Start", level: 2 },
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

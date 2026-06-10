import "server-only";

import { draftMode } from "next/headers";
import groq from "groq";
import { resolveBlogCategorySlug } from "@/lib/blog-categories";
import type { BlogPost } from "@/lib/blog-types";
import { zenPick } from "@/lib/zen-pick-gallery";
import { getSanityClient } from "@/sanity/client";

const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    featured,
    featuredImage,
    featuredImageAlt,
    subtitle,
    layoutTemplate,
    category,
    bodyMarkdown,
    tocItems[]{
      id,
      label,
      level
    },
    seo
  }
`;

const blogPostsListQuery = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    featured,
    featuredImage,
    featuredImageAlt,
    subtitle,
    layoutTemplate,
    category,
    seo
  }
`;

type SanityBlogListRow = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  featured?: boolean;
  featuredImage?: string;
  featuredImageAlt?: string;
  subtitle?: string;
  layoutTemplate?: "fullArticle" | "simple";
  category?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
};

type SanityBlogDoc = SanityBlogListRow & {
  bodyMarkdown?: string | null;
  tocItems?: Array<{ id: string; label: string; level: number }> | null;
};

async function getBlogSanityClient() {
  const client = getSanityClient();
  if (!client) return null;
  try {
    const { isEnabled } = await draftMode();
    const token = process.env.SANITY_API_READ_TOKEN;
    if (isEnabled && token) {
      return client.withConfig({
        token,
        useCdn: false,
        perspective: "previewDrafts",
      });
    }
  } catch {
    // draftMode unavailable (e.g. some static contexts)
  }
  return client;
}

function mapListRow(doc: SanityBlogListRow | null): BlogPost | null {
  if (!doc?.slug) return null;
  const layout = doc.layoutTemplate === "simple" ? "simple" : "fullArticle";
  return {
    id: doc._id,
    slug: doc.slug,
    category: resolveBlogCategorySlug(doc.slug, doc.category),
    title: doc.title,
    excerpt: doc.excerpt ?? "",
    image: doc.featuredImage ?? zenPick("private spa massage bed products"),
    imageAlt: doc.featuredImageAlt ?? doc.title,
    publishedAt: doc.publishedAt ?? new Date().toISOString(),
    featured: Boolean(doc.featured),
    subtitle: doc.subtitle,
    metaTitle: doc.seo?.metaTitle,
    metaDescription: doc.seo?.metaDescription,
    layoutTemplate: layout,
  };
}

function mapFullDoc(doc: SanityBlogDoc | null): BlogPost | null {
  const base = mapListRow(doc);
  if (!base || !doc) return base;
  return {
    ...base,
    bodyMarkdown: doc.bodyMarkdown ?? undefined,
    tocItems: doc.tocItems?.length
      ? doc.tocItems.map((t) => ({
          id: t.id,
          label: t.label,
          level: (t.level === 3 ? 3 : 2) as 2 | 3,
        }))
      : undefined,
  };
}

export async function fetchSanityBlogPosts(): Promise<BlogPost[]> {
  const client = await getBlogSanityClient();
  if (!client) return [];

  const rows = await client.fetch<SanityBlogListRow[]>(blogPostsListQuery);
  return rows.map((r) => mapListRow(r)).filter((p): p is BlogPost => p !== null);
}

export async function fetchSanityBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const client = await getBlogSanityClient();
  if (!client) return null;
  const doc = await client.fetch<SanityBlogDoc | null>(blogPostBySlugQuery, { slug });
  return mapFullDoc(doc);
}

export async function fetchSanityBlogSlugs(): Promise<string[]> {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch<string[]>(groq`*[_type == "blogPost" && defined(slug.current)].slug.current`);
}

import { getSanityClient } from "./client";
import { locationPageBySlugQuery } from "./queries";

export type LocationPageContent = {
  title?: string | null;
  layoutTemplate?: string | null;
  articleMarkdown?: string | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};

export async function getLocationPageBySlug(slug: string): Promise<LocationPageContent | null> {
  const client = getSanityClient();
  if (!client) return null;
  try {
    const doc = await client.fetch<LocationPageContent | null>(locationPageBySlugQuery, { slug });
    return doc ?? null;
  } catch {
    return null;
  }
}

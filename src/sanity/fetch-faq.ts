import type { Faq } from "@/lib/home-content";
import type { FaqCategory, FaqPageContent } from "@/lib/faq-page-content";
import { getStaticFaqPageContent } from "@/components/faq/site-data";
import { getSanityClient } from "./client";
import { faqPageQuery } from "./queries";

type SanityFaqPageDoc = {
  title?: string | null;
  slug?: { current?: string | null } | null;
  heroSubheading?: string | null;
  categories?: Array<{
    id?: string | null;
    label?: string | null;
    faqs?: Array<Partial<Faq> | null> | null;
  } | null> | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};

function isNonEmpty<T>(arr: T[] | null | undefined): arr is T[] {
  return Array.isArray(arr) && arr.length > 0;
}

function takeFaq(s: Partial<Faq> | null | undefined): Faq | null {
  if (!s?.question || !s?.answer) return null;
  return { question: s.question, answer: s.answer };
}

type SanityCategoryRow = NonNullable<NonNullable<SanityFaqPageDoc["categories"]>[number]>;

function takeCategory(raw: SanityCategoryRow): FaqCategory | null {
  if (!raw || typeof raw !== "object") return null;
  const id = raw.id?.trim();
  const label = raw.label?.trim();
  if (!id || !label) return null;
  const faqs = (raw.faqs ?? []).map(takeFaq).filter(Boolean) as Faq[];
  if (!faqs.length) return null;
  return { id, label, faqs };
}

export function mergeFaqPageContent(
  staticContent: FaqPageContent,
  remote: Partial<FaqPageContent> | null,
): FaqPageContent {
  if (!remote) return staticContent;

  const next: FaqPageContent = { ...staticContent };
  if (remote.title) next.title = remote.title;
  if (remote.slug) next.slug = remote.slug;
  if (remote.heroSubheading) next.heroSubheading = remote.heroSubheading;
  if (isNonEmpty(remote.categories)) {
    const mapped = remote.categories.filter(
      (c) => Boolean(c.id?.trim() && c.label?.trim() && isNonEmpty(c.faqs)),
    );
    if (mapped.length > 0) {
      next.categories = mapped;
    }
  }
  if (remote.seo) next.seo = remote.seo;
  return next;
}

export function sanityDocToFaqPagePartial(doc: SanityFaqPageDoc | null): Partial<FaqPageContent> | null {
  if (!doc) return null;

  const categories = (doc.categories ?? [])
    .filter((c): c is SanityCategoryRow => Boolean(c))
    .map((c) => takeCategory(c))
    .filter(Boolean) as FaqCategory[];

  return {
    title: doc.title ?? undefined,
    slug: doc.slug?.current ?? undefined,
    heroSubheading: doc.heroSubheading ?? undefined,
    categories: categories.length ? categories : undefined,
    seo: doc.seo
      ? {
          metaTitle: doc.seo.metaTitle ?? undefined,
          metaDescription: doc.seo.metaDescription ?? undefined,
        }
      : undefined,
  };
}

export async function fetchSanityFaqPageContent(): Promise<Partial<FaqPageContent> | null> {
  const client = getSanityClient();
  if (!client) return null;
  try {
    const doc = (await client.fetch(faqPageQuery, {}, { cache: "no-store" })) as SanityFaqPageDoc | null;
    return sanityDocToFaqPagePartial(doc);
  } catch {
    return null;
  }
}

export async function getFaqContentForPage(): Promise<FaqPageContent> {
  const staticContent = getStaticFaqPageContent();
  const remote = await fetchSanityFaqPageContent();
  if (remote) {
    return mergeFaqPageContent(staticContent, remote);
  }
  if (process.env.SANITY_STRICT_MODE === "true") {
    throw new Error(
      "Sanity FAQ content is required. Configure env vars and publish a faqPage document.",
    );
  }
  return staticContent;
}

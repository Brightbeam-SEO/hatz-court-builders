import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { PressureWashingBoiseLanding } from "@/components/landing/pressure-washing-boise-landing";
import {
  buildCanonicalPageMetadata,
  buildGpmPageMetadata,
  getGpmSitemapSeo,
} from "@/lib/gpm-sitemap-seo";
import { getPmServicePage, pmServicePagePath } from "@/lib/pm-service-pages";
import { additionalReviewsPageTestimonials, reviewsForRegion } from "@/lib/reviews-testimonials";
import { getHomeContentForPage } from "@/sanity/fetch-home";
import { getLocationPageBySlug } from "@/sanity/fetch-location-page";

export async function generatePmServiceMetadata(slug: string): Promise<Metadata> {
  const entry = getPmServicePage(slug);
  if (!entry) return { title: "Services | Hatz Court Builders" };

  const pagePath = pmServicePagePath(slug);
  if (getGpmSitemapSeo(pagePath)) return buildGpmPageMetadata(pagePath);

  const doc = await getLocationPageBySlug(entry.sanitySlug);
  const title = doc?.seo?.metaTitle?.trim() || entry.config.metaTitle;
  const description = doc?.seo?.metaDescription?.trim() || entry.config.metaDescription;

  return buildCanonicalPageMetadata({
    path: pagePath,
    title,
    description,
  });
}

export async function PmServicePage({ slug }: { slug: string }) {
  const entry = getPmServicePage(slug);
  if (!entry) notFound();

  const home = await getHomeContentForPage();
  const doc = await getLocationPageBySlug(entry.sanitySlug);

  let articleMarkdown = doc?.articleMarkdown?.trim() ?? "";
  if (!articleMarkdown) {
    const mdPath = path.join(process.cwd(), entry.fallbackMarkdownPath);
    articleMarkdown = await readFile(mdPath, "utf8");
  }

  const region = slug.endsWith("-az") ? "arizona" : slug.endsWith("-id") ? "idaho" : null;
  const heroTrustStripLogos =
    region === "arizona"
      ? home.copy.heroTrustStripLogos.filter((logo) => !/\/trust\/boise\./i.test(logo.src))
      : home.copy.heroTrustStripLogos;

  return (
    <PressureWashingBoiseLanding
      socialLinks={home.socialLinks}
      articleMarkdown={articleMarkdown}
      testimonials={reviewsForRegion(additionalReviewsPageTestimonials, region)}
      heroTrustStripLogos={heroTrustStripLogos}
      contactFormSubmitLabel={home.copy.contactFormSubmitLabel}
      cityPage={entry.config}
    />
  );
}

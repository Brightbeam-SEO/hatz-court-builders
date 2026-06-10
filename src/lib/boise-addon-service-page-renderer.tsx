import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PressureWashingBoiseLanding } from "@/components/landing/pressure-washing-boise-landing";
import {
  getBoiseAddonServicePageConfig,
  type BoiseAddonServiceSlug,
  isBoiseAddonServiceSlug,
} from "@/lib/boise-addon-service-page-config";
import { allReviewsPageTestimonials } from "@/lib/reviews-testimonials";
import { getHomeContentForPage } from "@/sanity/fetch-home";
import { getLocationPageBySlug } from "@/sanity/fetch-location-page";

export async function getBoiseAddonServicePageMetadata(slug: BoiseAddonServiceSlug): Promise<Metadata> {
  const cfg = getBoiseAddonServicePageConfig(slug);
  if (!cfg) return {};
  const doc = await getLocationPageBySlug(cfg.slug);
  const title = doc?.seo?.metaTitle?.trim();
  const description = doc?.seo?.metaDescription?.trim();
  return {
    title: title || cfg.metaTitle,
    description: description || cfg.metaDescription,
  };
}

export async function renderBoiseAddonServicePage(slug: string) {
  if (!isBoiseAddonServiceSlug(slug)) return null;
  const cfg = getBoiseAddonServicePageConfig(slug);
  if (!cfg) return null;

  const home = await getHomeContentForPage();
  const doc = await getLocationPageBySlug(cfg.slug);

  let articleMarkdown = doc?.articleMarkdown?.trim() ?? "";
  if (!articleMarkdown) {
    const mdPath = path.join(process.cwd(), "content/blog", `${cfg.slug}-body.md`);
    articleMarkdown = await readFile(mdPath, "utf8");
  }

  return (
    <PressureWashingBoiseLanding
      socialLinks={home.socialLinks}
      articleMarkdown={articleMarkdown}
      testimonials={allReviewsPageTestimonials(home.googleReviews)}
      cityPage={cfg}
    />
  );
}

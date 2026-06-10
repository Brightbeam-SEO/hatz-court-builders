import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PressureWashingBoiseLanding } from "@/components/landing/pressure-washing-boise-landing";
import { allReviewsPageTestimonials } from "@/lib/reviews-testimonials";
import {
  getTreasureValleyPressurePageConfig,
  type TreasureValleyPressureRouteParam,
} from "@/lib/treasure-valley-pressure-page-config";
import { getHomeContentForPage } from "@/sanity/fetch-home";
import { getLocationPageBySlug } from "@/sanity/fetch-location-page";

export async function getTreasureValleyCityMetadata(
  routeParam: TreasureValleyPressureRouteParam,
): Promise<Metadata> {
  const cfg = getTreasureValleyPressurePageConfig(routeParam);
  if (!cfg) return {};
  const doc = await getLocationPageBySlug(cfg.slug);
  const title = doc?.seo?.metaTitle?.trim();
  const description = doc?.seo?.metaDescription?.trim();
  return {
    title: title || cfg.metaTitle,
    description: description || cfg.metaDescription,
  };
}

export async function renderTreasureValleyCityPage(routeParam: TreasureValleyPressureRouteParam) {
  const cfg = getTreasureValleyPressurePageConfig(routeParam);
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

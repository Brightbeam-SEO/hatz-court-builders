import { getCliClient } from "sanity/cli";
import { isCourtConstructionSlug } from "../src/lib/court-construction-nav";
import { isCourtLocationPageSlug } from "../sanity/constants/locationPageFilters";
import { getGpmSitemapSeo } from "../src/lib/gpm-sitemap-seo";
import { PM_SERVICE_PAGES } from "../src/lib/pm-service-pages";
import { readMarkdown } from "./lib/sanity-seed-utils";

type SeedTarget = {
  slug: string;
  title: string;
  locationName: string;
  metaTitle: string;
  metaDescription: string;
  fallbackMarkdownPath: string;
  publicPath: string;
};

function seoFromPath(publicPath: string, fallback: { metaTitle: string; metaDescription: string }) {
  const live = getGpmSitemapSeo(publicPath);
  if (live) {
    return { metaTitle: live.title, metaDescription: live.description };
  }
  return fallback;
}

function buildTargets(): SeedTarget[] {
  return Object.values(PM_SERVICE_PAGES).map((entry) => {
    const publicPath = `/${entry.slug}/`;
    return {
      slug: entry.sanitySlug,
      title: entry.config.heroTitle,
      locationName: entry.config.cityName ?? "Meridian",
      ...seoFromPath(publicPath, {
        metaTitle: entry.config.metaTitle,
        metaDescription: entry.config.metaDescription,
      }),
      fallbackMarkdownPath: entry.fallbackMarkdownPath,
      publicPath,
    };
  });
}

async function upsertLocationPage(client: ReturnType<typeof getCliClient>, target: SeedTarget) {
  const articleMarkdown = await readMarkdown(target.fallbackMarkdownPath);

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "locationPage" && slug.current == $slug] | order(_updatedAt desc)[0]{_id}`,
    { slug: target.slug },
  );

  const docId = existing?._id ?? `locationPage.${target.slug}`;

  await client.createOrReplace({
    _id: docId,
    _type: "locationPage",
    layoutTemplate: "pressureWashingBoise",
    pageCategory: isCourtConstructionSlug(target.slug) ? "service" : "city",
    title: target.title,
    slug: { _type: "slug", current: target.slug },
    locationName: target.locationName,
    heroHeadline: target.title,
    articleMarkdown,
    seo: {
      metaTitle: target.metaTitle,
      metaDescription: target.metaDescription,
    },
  });

  console.log(`  ✓ ${docId} → ${target.publicPath} (${isCourtConstructionSlug(target.slug) ? "service" : "location"})`);
}

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  const targets = buildTargets();

  console.log(`Seeding ${targets.length} Hatz Court Builders locationPage documents:\n`);

  for (const target of targets) {
    await upsertLocationPage(client, target);
  }

  console.log(`\nDone: ${targets.length} location pages.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

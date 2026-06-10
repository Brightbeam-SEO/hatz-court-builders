import { getCliClient } from "sanity/cli";
import { CITY_PROPERTY_PAGES } from "../src/lib/city-property-pages";
import { getGpmSitemapSeo } from "../src/lib/gpm-sitemap-seo";
import { PM_SERVICE_PAGES } from "../src/lib/pm-service-pages";
import { readMarkdown } from "./lib/sanity-seed-utils";

type PageCategory = "city" | "service";

type SeedTarget = {
  slug: string;
  pageCategory: PageCategory;
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
  const services: SeedTarget[] = Object.values(PM_SERVICE_PAGES).map((entry) => {
    const publicPath = `/${entry.slug}/`;
    return {
      slug: entry.sanitySlug,
      pageCategory: "service" as const,
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

  const cities: SeedTarget[] = Object.values(CITY_PROPERTY_PAGES).map((entry) => {
    const publicPath = `/city/${entry.slug}/`;
    return {
      slug: entry.slug,
      pageCategory: "city" as const,
      title: entry.config.heroTitle,
      locationName: entry.config.cityName ?? "Treasure Valley",
      ...seoFromPath(publicPath, {
        metaTitle: entry.config.metaTitle,
        metaDescription: entry.config.metaDescription,
      }),
      fallbackMarkdownPath: entry.fallbackMarkdownPath,
      publicPath,
    };
  });

  return [...services, ...cities];
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
    pageCategory: target.pageCategory,
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

  console.log(`  ✓ ${docId} → ${target.publicPath} (${target.pageCategory})`);
}

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  const targets = buildTargets();

  console.log(`Seeding ${targets.length} Greenbelt locationPage documents:\n`);

  let services = 0;
  let cities = 0;

  for (const target of targets) {
    await upsertLocationPage(client, target);
    if (target.pageCategory === "service") services += 1;
    else cities += 1;
  }

  console.log(`\nDone: ${services} city service pages, ${cities} location pages.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

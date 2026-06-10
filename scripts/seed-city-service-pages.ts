import { getCliClient } from "sanity/cli";
import type { TreasureValleyPressurePageConfig } from "../src/lib/treasure-valley-pressure-page-config";
import { BOISE_ADDON_SERVICE_PAGES } from "../src/lib/boise-addon-service-page-config";
import { BOISE_NEIGHBORHOOD_PRESSURE_PAGES } from "../src/lib/boise-neighborhood-pressure-page-config";
import { BOISE_POWER_SERVICE_PAGES } from "../src/lib/boise-power-service-page-config";
import { BOISE_PRESSURE_SERVICE_PAGES } from "../src/lib/boise-pressure-service-page-config";
import { BOISE_WINDOW_SERVICE_PAGES } from "../src/lib/boise-window-service-page-config";
import { EAGLE_LOCAL_SERVICE_PAGES } from "../src/lib/eagle-local-service-page-config";
import { NAMPA_LOCAL_SERVICE_PAGES } from "../src/lib/nampa-local-service-page-config";

/**
 * Preferred Studio titles (when they differ from config.heroTitle / breadcrumbs).
 */
const STUDIO_TITLE_BY_SLUG: Record<string, string> = {
  "soft-washing-in-boise-id": "Soft Washing Boise ID",
  "high-rise-window-cleaning-boise-id": "High Rise Window Cleaning Boise ID",
  "window-cleaning-eagle-id": "Window Cleaning Eagle",
  "gutter-cleaning-eagle-id": "Gutter Cleaning Eagle",
  "power-washing-nampa-id": "Power Washing Nampa",
  "window-cleaning-nampa-id": "Window Cleaning Nampa",
  "gutter-cleaning-nampa-id": "Gutter Cleaning Nampa",
};

/** Slugs in the order requested for seeding / console output. */
const CITY_SERVICE_PAGE_SLUG_ORDER = [
  "soft-washing-in-boise-id",
  "house-pressure-washing-boise-id",
  "commercial-pressure-washing-boise-id",
  "patio-pressure-washing-company-in-boise-id",
  "driveway-pressure-washing-boise-id",
  "graffiti-removal-boise-id",
  "heavy-equipment-fleet-pressure-washing",
  "power-washing-boise-id",
  "house-power-washing-in-boise-id",
  "driveway-power-washing-in-boise-id",
  "apartment-power-washing-company-in-boise-id",
  "commercial-power-washing-company-in-boise-id",
  "patio-power-washing-company-in-boise-id",
  "window-cleaning-boise-id",
  "commercial-window-cleaning-boise-id",
  "high-rise-window-cleaning-boise-id",
  "residential-window-cleaning-boise-id",
  "solar-panel-cleaning-boise-id",
  "gutter-cleaning-boise-id",
  "christmas-light-installation-boise-id",
  "pressure-washing-north-end-boise-id",
  "pressure-washing-collister-boise-id",
  "pressure-washing-quail-ridge-boise-id",
  "pressure-washing-winstead-park-boise-id",
  "pressure-washing-west-bench-boise-id",
  "pressure-washing-morris-hill-boise-id",
  "pressure-washing-boise-bench-boise-id",
  "pressure-washing-central-bench-boise-id",
  "pressure-washing-warm-springs-mesa-boise-id",
  "power-washing-eagle-id",
  "window-cleaning-eagle-id",
  "gutter-cleaning-eagle-id",
  "power-washing-nampa-id",
  "window-cleaning-nampa-id",
  "gutter-cleaning-nampa-id",
] as const;

const CONFIG_BY_SLUG: Record<string, TreasureValleyPressurePageConfig> = {
  ...BOISE_PRESSURE_SERVICE_PAGES,
  ...BOISE_POWER_SERVICE_PAGES,
  ...BOISE_WINDOW_SERVICE_PAGES,
  ...BOISE_ADDON_SERVICE_PAGES,
  ...BOISE_NEIGHBORHOOD_PRESSURE_PAGES,
  ...EAGLE_LOCAL_SERVICE_PAGES,
  ...NAMPA_LOCAL_SERVICE_PAGES,
};

function studioTitle(slug: string, config: TreasureValleyPressurePageConfig): string {
  return STUDIO_TITLE_BY_SLUG[slug] ?? config.heroTitle;
}

function deriveServiceLabel(title: string): string {
  const trimmed = title
    .replace(/\s+Boise ID$/i, "")
    .replace(/\s+Eagle(?: ID)?$/i, "")
    .replace(/\s+Nampa(?: ID)?$/i, "")
    .trim();
  return trimmed.length > 0 ? trimmed : title;
}

async function upsertCityServicePage(client: ReturnType<typeof getCliClient>, slug: string) {
  const config = CONFIG_BY_SLUG[slug];
  if (!config) {
    console.warn(`Skipping unknown slug (no config): ${slug}`);
    return;
  }

  const title = studioTitle(slug, config);
  const service = deriveServiceLabel(title);

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "cityServicePage" && slug.current == $slug] | order(_updatedAt desc)[0]{_id}`,
    { slug },
  );

  const docId = existing?._id ?? `cityServicePage.${slug}`;

  await client.createOrReplace({
    _id: docId,
    _type: "cityServicePage",
    title,
    slug: { _type: "slug", current: slug },
    city: config.cityName,
    service,
    heroHeadline: config.heroTitle,
    intro: config.heroSubtitle,
    sections: [],
    seo: {
      metaTitle: config.metaTitle,
      metaDescription: config.metaDescription,
    },
  });

  console.log(`- ${docId} → /${slug}/ (${title})`);
}

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });

  console.log("Seeding Sanity cityServicePage documents:");
  for (const slug of CITY_SERVICE_PAGE_SLUG_ORDER) {
    await upsertCityServicePage(client, slug);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

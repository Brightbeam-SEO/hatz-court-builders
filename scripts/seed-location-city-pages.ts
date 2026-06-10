import fs from "node:fs/promises";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import {
  TREASURE_VALLEY_PRESSURE_PAGE_ORDER,
  TREASURE_VALLEY_PRESSURE_PAGES,
  type TreasureValleyPressureRouteParam,
} from "../src/lib/treasure-valley-pressure-page-config";

/**
 * Seeds all non-Boise city location pages under Sanity "Location pages"
 * from repo markdown + page config.
 */
async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  const created: string[] = [];

  for (const routeParam of TREASURE_VALLEY_PRESSURE_PAGE_ORDER) {
    const page = TREASURE_VALLEY_PRESSURE_PAGES[routeParam as TreasureValleyPressureRouteParam];
    if (!page) continue;

    const mdPath = path.join(process.cwd(), `content/blog/${page.slug}-body.md`);
    const articleMarkdown = await fs.readFile(mdPath, "utf8");

    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "locationPage" && slug.current == $slug] | order(_updatedAt desc)[0]{_id}`,
      { slug: page.slug },
    );

    const docId = existing?._id ?? `locationPage.${page.slug}`;

    await client.createOrReplace({
      _id: docId,
      _type: "locationPage",
      layoutTemplate: "pressureWashingBoise",
      title: page.heroTitle,
      slug: { _type: "slug", current: page.slug },
      locationName: page.cityName,
      articleMarkdown,
      seo: {
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
      },
    });

    created.push(`${docId} -> /${page.slug}/`);
  }

  console.log("Seeded/updated Sanity location pages:");
  for (const row of created) console.log(`- ${row}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

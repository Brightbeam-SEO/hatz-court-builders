import { getCliClient } from "sanity/cli";
import { CITY_PROPERTY_PAGE_SLUGS } from "../src/lib/city-property-pages";

const CITY_SLUGS = new Set(CITY_PROPERTY_PAGE_SLUGS);

/** Same rule as Studio **Location pages** list (sanity/constants/locationPageFilters.ts). */
function isCityLocationSlug(slug: string): boolean {
  return CITY_SLUGS.has(slug) || /^property-management-.+-id$/.test(slug);
}

/** Ensures pageCategory matches GPM registry so Studio filters stay in sync. */
async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });

  const docs = await client.fetch<
    Array<{ _id: string; slug: string; pageCategory?: string }>
  >(`*[_type == "locationPage" && defined(slug.current)]{ _id, "slug": slug.current, pageCategory }`);

  let patched = 0;

  for (const doc of docs) {
    const pageCategory = isCityLocationSlug(doc.slug) ? "city" : "service";
    if (doc.pageCategory === pageCategory) continue;

    await client.patch(doc._id).set({ pageCategory }).commit();
    console.log(`  ✓ ${doc.slug} → pageCategory: ${pageCategory}`);
    patched += 1;
  }

  console.log(`\nPatched ${patched} of ${docs.length} locationPage documents.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

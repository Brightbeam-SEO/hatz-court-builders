import { getCliClient } from "sanity/cli";
import { isCourtConstructionSlug } from "../src/lib/court-construction-nav";
import { isCourtLocationPageSlug } from "../sanity/constants/locationPageFilters";

function pageCategoryFor(slug: string): "city" | "service" {
  if (isCourtConstructionSlug(slug)) return "service";
  if (isCourtLocationPageSlug(slug)) return "city";
  return "service";
}

/** Ensures pageCategory matches court location registry so Studio filters stay in sync. */
async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });

  const docs = await client.fetch<
    Array<{ _id: string; slug: string; pageCategory?: string }>
  >(`*[_type == "locationPage" && defined(slug.current)]{ _id, "slug": slug.current, pageCategory }`);

  let patched = 0;

  for (const doc of docs) {
    const pageCategory = pageCategoryFor(doc.slug);
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

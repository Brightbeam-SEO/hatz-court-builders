import { getCliClient } from "sanity/cli";

/** Legacy Greenbelt property-management city pages removed from Hatz Court Builders. */
const REMOVED_CITY_SLUGS = [
  "property-management-boise-id",
  "property-management-eagle-id",
  "property-management-in-middleton-id",
  "property-management-in-nampa-id",
  "property-management-in-star-id",
  "property-management-in-kuna-id",
  "property-management-in-garden-city-id",
] as const;

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });

  console.log(`Deleting ${REMOVED_CITY_SLUGS.length} legacy locationPage documents:\n`);

  let deleted = 0;

  for (const slug of REMOVED_CITY_SLUGS) {
    const docs = await client.fetch<{ _id: string }[]>(
      `*[_type == "locationPage" && slug.current == $slug]{_id}`,
      { slug },
    );

    if (docs.length === 0) {
      console.log(`  · ${slug} — not found`);
      continue;
    }

    for (const doc of docs) {
      await client.delete(doc._id);
      console.log(`  ✓ deleted ${doc._id} (${slug})`);
      deleted += 1;
    }
  }

  console.log(`\nDone: deleted ${deleted} document(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

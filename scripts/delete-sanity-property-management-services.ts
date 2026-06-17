import { getCliClient } from "sanity/cli";

const SLUG = "property-management-services";

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });

  const docs = await client.fetch<{ _id: string }[]>(
    `*[_type == "locationPage" && slug.current == $slug]{_id}`,
    { slug: SLUG },
  );

  if (docs.length === 0) {
    console.log(`No locationPage found for ${SLUG}.`);
    return;
  }

  for (const doc of docs) {
    await client.delete(doc._id);
    console.log(`  ✓ deleted ${doc._id}`);
  }

  console.log(`\nDone: removed ${SLUG} from Sanity.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

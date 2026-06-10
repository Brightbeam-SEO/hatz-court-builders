import fs from "node:fs/promises";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const SLUG = "foot-massage-reflexology";

/** Seeds / syncs the Boise Location page from repo Markdown so Studio editors can publish updates that hit the live site. */
async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  const mdPath = path.join(process.cwd(), "content/blog/foot-massage-reflexology-body.md");
  const articleMarkdown = await fs.readFile(mdPath, "utf8");

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "locationPage" && slug.current == $slug] | order(_updatedAt desc)[0]{_id}`,
    { slug: SLUG },
  );

  const docId = existing?._id ?? `locationPage.${SLUG}`;

  await client.createOrReplace({
    _id: docId,
    _type: "locationPage",
    layoutTemplate: "pressureWashingBoise",
    title: "Pressure Washing Boise ID",
    slug: { _type: "slug", current: SLUG },
    locationName: "Boise",
    articleMarkdown,
    seo: {
      metaTitle: "Pressure Washing Boise ID | Free Estimate | Sol Pressure Washing Boise",
      metaDescription:
        "Residential and commercial pressure washing & soft washing in Boise and the Treasure Valley—honest quotes, insured crews, and HOA-friendly scheduling. Call (208) 514-5302.",
    },
  });

  console.log(`Seeded Sanity locationPage (“Location pages”): ${docId} → /${SLUG}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

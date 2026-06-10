/**
 * Seeds all Greenbelt Property Management CMS content from the repo.
 * Requires: sanity login + `npm run seed:sanity-all`
 */
import { execSync } from "node:child_process";

const SEEDS = [
  "seed:sanity-site-settings",
  "seed:sanity-home",
  "seed:sanity-contact",
  "seed:sanity-gallery",
  "seed:sanity-faq",
  "seed:sanity-reviews",
  "seed:sanity-location-pages",
  "patch:sanity-location-categories",
  "seed:sanity-blog",
] as const;

function run(script: (typeof SEEDS)[number]) {
  console.log(`\n▶ npm run ${script}\n`);
  execSync(`npm run ${script}`, { stdio: "inherit", cwd: process.cwd() });
}

async function main() {
  console.log("Greenbelt Property Management — full Sanity seed\n");
  for (const script of SEEDS) {
    run(script);
  }
  console.log("\n✓ All seed scripts completed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

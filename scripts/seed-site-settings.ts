import { getCliClient } from "sanity/cli";
import { BUSINESS, DEFAULT_SOCIAL_LINKS } from "../src/lib/business";

type SiteSettingsDoc = {
  _id: string;
  _type: "siteSettings";
  siteTitle: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: Array<{
    _key: string;
    label: string;
    href: string;
  }>;
  defaultSeo: {
    metaTitle: string;
    metaDescription: string;
  };
};

function makeKey(prefix: string, idx: number): string {
  return `${prefix}-${String(idx + 1).padStart(2, "0")}`;
}

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  const existing = await client.fetch<{ _id: string } | null>(
    '*[_type == "siteSettings"] | order(_updatedAt desc)[0]{_id}',
  );

  const doc: SiteSettingsDoc = {
    _id: existing?._id ?? "siteSettings",
    _type: "siteSettings",
    siteTitle: BUSINESS.nameFull,
    tagline: BUSINESS.tagline,
    phone: BUSINESS.phoneDisplay,
    email: BUSINESS.email,
    address: BUSINESS.address,
    socialLinks: DEFAULT_SOCIAL_LINKS.map((link, idx) => ({
      _key: makeKey("social", idx),
      label: link.label,
      href: link.href,
    })),
    defaultSeo: {
      metaTitle: `${BUSINESS.nameFull} | Boise & Scottsdale Court Builder`,
      metaDescription: BUSINESS.descriptionShort,
    },
  };

  await client.createOrReplace(doc);
  console.log(`Seeded Sanity siteSettings document: ${doc._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

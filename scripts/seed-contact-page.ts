import { getCliClient } from "sanity/cli";
import { BUSINESS } from "../src/lib/business";
import { getGpmSitemapSeo } from "../src/lib/gpm-sitemap-seo";

type ContactPageDoc = {
  _id: string;
  _type: "contactPage";
  title: string;
  slug: { _type: "slug"; current: string };
  heroHeadline: string;
  intro: string;
  phone: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
};

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  const contactSeo = getGpmSitemapSeo("/contact/");

  const existing = await client.fetch<{ _id: string } | null>(
    '*[_type == "contactPage" && slug.current == "contact"] | order(_updatedAt desc)[0]{_id}',
  );
  const docId = existing?._id ?? "contactPage";

  const doc: ContactPageDoc = {
    _id: docId,
    _type: "contactPage",
    title: "Contact",
    slug: { _type: "slug", current: "contact" },
    heroHeadline: "Contact Greenbelt Property Management",
    intro:
      "Request a free rental analysis or on-site consultation. Brandon and Julia respond personally—call, email, or send the form below.",
    phone: BUSINESS.phoneDisplay,
    email: BUSINESS.email,
    address: BUSINESS.address,
    mapEmbedUrl: BUSINESS.mapEmbedSrc,
    seo: {
      metaTitle:
        contactSeo?.title ?? "Contact Greenbelt Property Management | Property Rental Idaho",
      metaDescription:
        contactSeo?.description ??
        "Contact Greenbelt Property Management in Meridian for a free consultation and rental analysis.",
    },
  };

  await client.createOrReplace(doc);
  console.log(`Seeded Sanity contactPage document: ${docId}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

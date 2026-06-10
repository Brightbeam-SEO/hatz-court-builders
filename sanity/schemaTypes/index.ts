import type { SchemaTypeDefinition } from "sanity";
import { blogPost } from "./blogPost";
import { contactPage } from "./contactPage";
import { faqPage } from "./faqPage";
import { galleryPage } from "./galleryPage";
import { homePage } from "./homePage";
import { legalPage } from "./legalPage";
import { locationPage } from "./locationPage";
import { reviewsPage } from "./reviewsPage";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homePage,
  locationPage,
  blogPost,
  legalPage,
  faqPage,
  galleryPage,
  contactPage,
  reviewsPage,
];

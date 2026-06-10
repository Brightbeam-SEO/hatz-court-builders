import type { Faq } from "./home-content";

export type FaqCategory = {
  id: string;
  label: string;
  faqs: Faq[];
};

export type FaqPageContent = {
  title: string;
  slug: string;
  heroSubheading: string;
  categories: FaqCategory[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

import type { HomePageCopy } from "./home-page-copy";

/** Shape used across the home page; matches Sanity `homePage` when populated. */
export type ServiceItem = {
  name: string;
  blurb: string;
  image: string;
  hoverImage: string;
  cardIcon: string;
  /** Destination for homepage service cards (Boise hub URLs). */
  href?: string;
};

export type ProcessItem = {
  step: string;
  title: string;
  body: string;
  icon: string;
};

export type WhyItem = {
  title: string;
  body: string;
  icon: string;
};

export type GoogleReview = {
  id: string;
  name: string;
  quote: string;
  image: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ServiceCarouselSlide = {
  name: string;
  image: string;
};

export type HomeContent = {
  navItems: string[];
  trustBarItems: string[];
  services: ServiceItem[];
  /** Horizontal image carousel on the services band (`homePage.servicesCarousel`). */
  servicesCarousel: ServiceCarouselSlide[];
  whyChooseUs: WhyItem[];
  processSteps: ProcessItem[];
  googleReviews: GoogleReview[];
  faqs: Faq[];
  socialLinks: SocialLink[];
  /** Hero + section headings/body editable in Sanity (`homePage.pageCopy`). */
  copy: HomePageCopy;
};

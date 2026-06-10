export type GalleryImageItem = {
  image: string;
  caption?: string;
  alt: string;
};

export type GalleryStatItem = {
  value: string;
  label: string;
};

export type GalleryContent = {
  title: string;
  slug: string;
  heroSubheading: string;
  overviewHeadline: string;
  overviewBody: string;
  overviewStats: GalleryStatItem[];
  highlightsTitle: string;
  highlightsIntro: string;
  highlightItems: GalleryImageItem[];
  items: GalleryImageItem[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

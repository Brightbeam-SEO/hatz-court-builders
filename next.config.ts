import type { NextConfig } from "next";

const REMOVED_SERVICE_REDIRECTS = [
  "rental-property-marketing",
  "property-inspections",
  "property-maintenance-services",
  "tenant-placement-services",
  "specialized-property-management",
  "multi-family-property-management",
  "hoa-community-management",
  "long-term-rental-management",
  "property-risk-mitigation",
  "real-estate-investment-consulting",
  "property-risk-management-meridian-id",
  "rentals",
  "condo-rentals-meridian-id",
  "home-rentals-meridian-id",
  "month-to-month-rentals-meridian-id",
  "long-term-rentals-meridian-id",
  "vacation-rentals-meridian-id",
] as const;

const REMOVED_CITY_REDIRECTS = [
  "property-management-boise-id",
  "property-management-eagle-id",
  "property-management-in-middleton-id",
  "property-management-in-nampa-id",
  "property-management-in-star-id",
  "property-management-in-kuna-id",
  "property-management-in-garden-city-id",
] as const;

const REMOVED_BLOG_REDIRECTS = [
  "top-property-management-services-in-idaho-what-you-need-to-know",
  "expert-property-management-in-boise-id-your-complete-guide",
  "what-to-look-for-in-property-management-services-in-meridian-id",
] as const;

const nextConfig: NextConfig = {
  /** Hides the route dev badge; `<nextjs-portal>` may still exist for the error overlay (dev-only, not a layout bug). */
  devIndicators: false,
  trailingSlash: true,
  async redirects() {
    const serviceRedirects = REMOVED_SERVICE_REDIRECTS.flatMap((slug) => [
      {
        source: `/${slug}`,
        destination: "/property-management-services/",
        permanent: true,
      },
      {
        source: `/services/${slug}`,
        destination: "/property-management-services/",
        permanent: true,
      },
    ]);

    const cityRedirects = REMOVED_CITY_REDIRECTS.flatMap((slug) => [
      {
        source: `/city/${slug}`,
        destination: "/",
        permanent: true,
      },
    ]);

    const blogRedirects = REMOVED_BLOG_REDIRECTS.flatMap((slug) => [
      {
        source: `/${slug}`,
        destination: "/blog/",
        permanent: true,
      },
      {
        source: `/blog/${slug}`,
        destination: "/blog/",
        permanent: true,
      },
    ]);

    return [
      { source: "/about-us", destination: "/about/", permanent: true },
      { source: "/about-us/:path*", destination: "/about/:path*", permanent: true },
      { source: "/contact-us", destination: "/contact/", permanent: true },
      { source: "/contact-us/:path*", destination: "/contact/:path*", permanent: true },
      { source: "/faqs", destination: "/faq/", permanent: true },
      {
        source: "/foot-massage-reflexology",
        destination: "/services/foot-massage-reflexology/",
        permanent: true,
      },
      {
        source: "/pressure-washing-boise-id",
        destination: "/services/foot-massage-reflexology/",
        permanent: true,
      },
      {
        source: "/blog/property-management-meridian",
        destination: "/blog/what-is-property-management/",
        permanent: true,
      },
      {
        source: "/services/property-management-services",
        destination: "/property-management-services/",
        permanent: true,
      },
      ...serviceRedirects,
      ...cityRedirects,
      ...blogRedirects,
      {
        source: "/services/aromatherapy-massage-eagle-id",
        destination: "/services/aromatherapy-massage/",
        permanent: true,
      },
      {
        source: "/services/hot-stone-massage-eagle-id",
        destination: "/services/hot-stone-massage/",
        permanent: true,
      },
      {
        source: "/services/body-massage-in-west-bench-boise",
        destination: "/services/body-massage/",
        permanent: true,
      },
      {
        source: "/services/body-massage-in-settlers-park-meridian",
        destination: "/services/body-massage/",
        permanent: true,
      },
      {
        source: "/services/body-massage-in-west-cloverdale-meridian",
        destination: "/services/body-massage/",
        permanent: true,
      },
      {
        source: "/service/:slug",
        destination: "/:slug/",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/:slug/",
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [75, 90, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

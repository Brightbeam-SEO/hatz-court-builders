import {
  PM_BASKETBALL_COURT_CONSTRUCTION_CONFIG,
  PM_BASKETBALL_COURT_CONSTRUCTION_PHOENIX_AZ_CONFIG,
  PM_BOCCE_COURT_INSTALLATION_PHOENIX_AZ_CONFIG,
  PM_COURT_BUILDER_CHANDLER_AZ_CONFIG,
  PM_COURT_BUILDER_CALDWELL_CONFIG,
  PM_COURT_BUILDER_EAGLE_CONFIG,
  PM_COURT_BUILDER_GILBERT_AZ_CONFIG,
  PM_COURT_BUILDER_GLENDALE_AZ_CONFIG,
  PM_COURT_BUILDER_MESA_AZ_CONFIG,
  PM_COURT_BUILDER_MERIDIAN_CONFIG,
  PM_COURT_BUILDER_MIDDLETON_CONFIG,
  PM_COURT_BUILDER_NAMPA_CONFIG,
  PM_COURT_BUILDER_PEORIA_AZ_CONFIG,
  PM_COURT_BUILDER_PHOENIX_AZ_CONFIG,
  PM_COURT_BUILDER_SCOTTSDALE_AZ_CONFIG,
  PM_COURT_BUILDER_STAR_CONFIG,
  PM_COURT_BUILDER_TEMPE_AZ_CONFIG,
  PM_COURT_BUILDERS_BOISE_CONFIG,
  PM_FUTSAL_SOCCER_COURT_CONSTRUCTION_CONFIG,
  PM_PADEL_COURT_BUILDER_PHOENIX_AZ_CONFIG,
  PM_PICKLEBALL_COURT_BUILDER_PHOENIX_AZ_CONFIG,
  PM_PICKLEBALL_COURT_CONSTRUCTION_CONFIG,
  PM_TENNIS_COURT_BUILDERS_PHOENIX_AZ_CONFIG,
  PM_TENNIS_COURT_CONSTRUCTION_CONFIG,
  PM_TENNIS_COURT_CONTRACTOR_SCOTTSDALE_AZ_CONFIG,
  PM_VOLLEYBALL_COURT_CONSTRUCTION_CONFIG,
} from "@/lib/pm-service-page-configs";
import type { TreasureValleyPressurePageConfig } from "@/lib/treasure-valley-pressure-page-config";

export type PmServicePageEntry = {
  slug: string;
  config: TreasureValleyPressurePageConfig;
  fallbackMarkdownPath: string;
  sanitySlug: string;
};

/** Root-level court builder location landings. */
export const PM_SERVICE_PAGES: Record<string, PmServicePageEntry> = {
  "court-builders-boise-id": {
    slug: "court-builders-boise-id",
    config: PM_COURT_BUILDERS_BOISE_CONFIG,
    fallbackMarkdownPath: "content/services/court-builders-boise-id-body.md",
    sanitySlug: "court-builders-boise-id",
  },
  "court-builder-meridian-id": {
    slug: "court-builder-meridian-id",
    config: PM_COURT_BUILDER_MERIDIAN_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-meridian-id-body.md",
    sanitySlug: "court-builder-meridian-id",
  },
  "court-builder-nampa-id": {
    slug: "court-builder-nampa-id",
    config: PM_COURT_BUILDER_NAMPA_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-nampa-id-body.md",
    sanitySlug: "court-builder-nampa-id",
  },
  "court-builder-caldwell-id": {
    slug: "court-builder-caldwell-id",
    config: PM_COURT_BUILDER_CALDWELL_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-caldwell-id-body.md",
    sanitySlug: "court-builder-caldwell-id",
  },
  "court-builder-middleton-id": {
    slug: "court-builder-middleton-id",
    config: PM_COURT_BUILDER_MIDDLETON_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-middleton-id-body.md",
    sanitySlug: "court-builder-middleton-id",
  },
  "court-builder-star-id": {
    slug: "court-builder-star-id",
    config: PM_COURT_BUILDER_STAR_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-star-id-body.md",
    sanitySlug: "court-builder-star-id",
  },
  "court-builder-eagle-id": {
    slug: "court-builder-eagle-id",
    config: PM_COURT_BUILDER_EAGLE_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-eagle-id-body.md",
    sanitySlug: "court-builder-eagle-id",
  },
  "court-builder-scottsdale-az": {
    slug: "court-builder-scottsdale-az",
    config: PM_COURT_BUILDER_SCOTTSDALE_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-scottsdale-az-body.md",
    sanitySlug: "court-builder-scottsdale-az",
  },
  "tennis-court-contractor-scottsdale-az": {
    slug: "tennis-court-contractor-scottsdale-az",
    config: PM_TENNIS_COURT_CONTRACTOR_SCOTTSDALE_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/tennis-court-contractor-scottsdale-az-body.md",
    sanitySlug: "tennis-court-contractor-scottsdale-az",
  },
  "court-builder-phoenix-az": {
    slug: "court-builder-phoenix-az",
    config: PM_COURT_BUILDER_PHOENIX_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-phoenix-az-body.md",
    sanitySlug: "court-builder-phoenix-az",
  },
  "pickleball-court-builder-phoenix-az": {
    slug: "pickleball-court-builder-phoenix-az",
    config: PM_PICKLEBALL_COURT_BUILDER_PHOENIX_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/pickleball-court-builder-phoenix-az-body.md",
    sanitySlug: "pickleball-court-builder-phoenix-az",
  },
  "tennis-court-builders-phoenix-az": {
    slug: "tennis-court-builders-phoenix-az",
    config: PM_TENNIS_COURT_BUILDERS_PHOENIX_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/tennis-court-builders-phoenix-az-body.md",
    sanitySlug: "tennis-court-builders-phoenix-az",
  },
  "basketball-court-construction-phoenix-az": {
    slug: "basketball-court-construction-phoenix-az",
    config: PM_BASKETBALL_COURT_CONSTRUCTION_PHOENIX_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/basketball-court-construction-phoenix-az-body.md",
    sanitySlug: "basketball-court-construction-phoenix-az",
  },
  "bocce-court-installation-phoenix-az": {
    slug: "bocce-court-installation-phoenix-az",
    config: PM_BOCCE_COURT_INSTALLATION_PHOENIX_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/bocce-court-installation-phoenix-az-body.md",
    sanitySlug: "bocce-court-installation-phoenix-az",
  },
  "padel-court-builder-phoenix-az": {
    slug: "padel-court-builder-phoenix-az",
    config: PM_PADEL_COURT_BUILDER_PHOENIX_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/padel-court-builder-phoenix-az-body.md",
    sanitySlug: "padel-court-builder-phoenix-az",
  },
  "court-builder-mesa-az": {
    slug: "court-builder-mesa-az",
    config: PM_COURT_BUILDER_MESA_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-mesa-az-body.md",
    sanitySlug: "court-builder-mesa-az",
  },
  "court-builder-gilbert-az": {
    slug: "court-builder-gilbert-az",
    config: PM_COURT_BUILDER_GILBERT_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-gilbert-az-body.md",
    sanitySlug: "court-builder-gilbert-az",
  },
  "court-builder-chandler-az": {
    slug: "court-builder-chandler-az",
    config: PM_COURT_BUILDER_CHANDLER_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-chandler-az-body.md",
    sanitySlug: "court-builder-chandler-az",
  },
  "court-builder-glendale-az": {
    slug: "court-builder-glendale-az",
    config: PM_COURT_BUILDER_GLENDALE_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-glendale-az-body.md",
    sanitySlug: "court-builder-glendale-az",
  },
  "court-builder-peoria-az": {
    slug: "court-builder-peoria-az",
    config: PM_COURT_BUILDER_PEORIA_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-peoria-az-body.md",
    sanitySlug: "court-builder-peoria-az",
  },
  "court-builder-tempe-az": {
    slug: "court-builder-tempe-az",
    config: PM_COURT_BUILDER_TEMPE_AZ_CONFIG,
    fallbackMarkdownPath: "content/services/court-builder-tempe-az-body.md",
    sanitySlug: "court-builder-tempe-az",
  },
  "basketball-court-construction": {
    slug: "basketball-court-construction",
    config: PM_BASKETBALL_COURT_CONSTRUCTION_CONFIG,
    fallbackMarkdownPath: "content/services/basketball-court-construction-body.md",
    sanitySlug: "basketball-court-construction",
  },
  "pickleball-court-construction": {
    slug: "pickleball-court-construction",
    config: PM_PICKLEBALL_COURT_CONSTRUCTION_CONFIG,
    fallbackMarkdownPath: "content/services/pickleball-court-construction-body.md",
    sanitySlug: "pickleball-court-construction",
  },
  "volleyball-court-construction": {
    slug: "volleyball-court-construction",
    config: PM_VOLLEYBALL_COURT_CONSTRUCTION_CONFIG,
    fallbackMarkdownPath: "content/services/volleyball-court-construction-body.md",
    sanitySlug: "volleyball-court-construction",
  },
  "futsal-soccer-court-construction": {
    slug: "futsal-soccer-court-construction",
    config: PM_FUTSAL_SOCCER_COURT_CONSTRUCTION_CONFIG,
    fallbackMarkdownPath: "content/services/futsal-soccer-court-construction-body.md",
    sanitySlug: "futsal-soccer-court-construction",
  },
  "tennis-court-construction": {
    slug: "tennis-court-construction",
    config: PM_TENNIS_COURT_CONSTRUCTION_CONFIG,
    fallbackMarkdownPath: "content/services/tennis-court-construction-body.md",
    sanitySlug: "tennis-court-construction",
  },
};

/** Canonical path at site root, e.g. `/court-builders-boise-id/`. */
export function pmServicePagePath(slug: string): string {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  return `/${clean}/`;
}

export function getPmServicePage(slug: string): PmServicePageEntry | null {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  return PM_SERVICE_PAGES[clean] ?? null;
}

export const IDAHO_SERVICE_AREA_NAV_LINKS = [
  { label: "Boise", href: "/court-builders-boise-id/" },
  { label: "Meridian", href: "/court-builder-meridian-id/" },
  { label: "Nampa", href: "/court-builder-nampa-id/" },
  { label: "Caldwell", href: "/court-builder-caldwell-id/" },
  { label: "Middleton", href: "/court-builder-middleton-id/" },
  { label: "Star", href: "/court-builder-star-id/" },
  { label: "Eagle", href: "/court-builder-eagle-id/" },
] as const;

export const ARIZONA_SERVICE_AREA_NAV_LINKS = [
  { label: "Scottsdale", href: "/court-builder-scottsdale-az/" },
  { label: "Phoenix", href: "/court-builder-phoenix-az/" },
  { label: "Mesa", href: "/court-builder-mesa-az/" },
  { label: "Gilbert", href: "/court-builder-gilbert-az/" },
  { label: "Chandler", href: "/court-builder-chandler-az/" },
  { label: "Glendale", href: "/court-builder-glendale-az/" },
  { label: "Peoria", href: "/court-builder-peoria-az/" },
  { label: "Tempe", href: "/court-builder-tempe-az/" },
] as const;

type ServiceAreaNavLink = { readonly label: string; readonly href: string };

export const SERVICE_AREA_NAV_GROUPS: readonly {
  readonly label: string;
  readonly links: readonly ServiceAreaNavLink[];
}[] = [
  {
    label: "Idaho",
    links: IDAHO_SERVICE_AREA_NAV_LINKS,
  },
  {
    label: "Arizona",
    links: ARIZONA_SERVICE_AREA_NAV_LINKS,
  },
];

/** Backwards-compatible flattened links list. */
export const SERVICE_AREA_NAV_LINKS: ServiceAreaNavLink[] = [
  ...IDAHO_SERVICE_AREA_NAV_LINKS,
  ...ARIZONA_SERVICE_AREA_NAV_LINKS,
];

/** Preferred live origin — non-www, HTTPS, no trailing slash on the origin itself. */
export const SITE_ORIGIN = "https://hatzcourtbuilders.com";

/** Hostnames that should resolve to {@link SITE_ORIGIN}. */
export const SITE_CANONICAL_HOSTS = ["hatzcourtbuilders.com", "www.hatzcourtbuilders.com"] as const;

const HAS_FILE_EXTENSION = /\.[a-z0-9]+$/i;

/**
 * Normalize an internal path to the site's preferred format (leading slash, trailing slash on routes).
 * Root stays `/`. File paths such as `/sitemap.xml` keep their extension and omit a trailing slash.
 */
export function normalizeSitePath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed || trimmed === "/") return "/";

  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const withoutQuery = withLeading.split(/[?#]/)[0] ?? withLeading;

  if (withoutQuery === "/") return "/";
  if (HAS_FILE_EXTENSION.test(withoutQuery)) return withoutQuery;
  return withoutQuery.endsWith("/") ? withoutQuery : `${withoutQuery}/`;
}

/** Build the absolute canonical URL for an internal path. */
export function buildCanonicalUrl(path: string): string {
  const normalized = normalizeSitePath(path);
  return normalized === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${normalized}`;
}

/** Strip query/hash and normalize an absolute or relative URL to the preferred canonical form. */
export function toCanonicalUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return buildCanonicalUrl("/");

  if (trimmed.startsWith("/")) {
    return buildCanonicalUrl(trimmed);
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();
    if (SITE_CANONICAL_HOSTS.includes(host as (typeof SITE_CANONICAL_HOSTS)[number])) {
      return buildCanonicalUrl(parsed.pathname);
    }
    return trimmed;
  } catch {
    return buildCanonicalUrl(trimmed);
  }
}

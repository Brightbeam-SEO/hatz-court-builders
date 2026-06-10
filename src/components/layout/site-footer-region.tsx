import type { SocialLink } from "@/lib/home-content";
import { SiteFooter } from "./site-footer";

/** Sitewide footer region. */
export function SiteFooterRegion({
  socialLinks,
  className = "",
}: {
  socialLinks: SocialLink[];
  className?: string;
}) {
  return (
    <div className={`site-footer-region isolate ${className}`.trim()}>
      <SiteFooter socialLinks={socialLinks} />
    </div>
  );
}

import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";

const DEFAULT_CONTACT_FORM_HREF = "#boise-page-contact-form";

/** Primary CTAs aligned with the homepage hero (non-home pages). */
export function BoiseGetStartedCta({
  className = "",
  contactFormHref = DEFAULT_CONTACT_FORM_HREF,
}: {
  className?: string;
  /** Element id with leading `#` for the page contact form (unique per landing when needed). */
  contactFormHref?: string;
}) {
  return (
    <PageHeroCtaButtons
      className={`mt-8 ${className}`.trim()}
      secondaryHref={contactFormHref}
      onDark
    />
  );
}

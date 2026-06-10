from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Marquee single row
marquee_path = ROOT / "src/components/home/home-testimonials-marquee.tsx"
t = marquee_path.read_text(encoding="utf-8")
needle = "  return (\n    <motionless />"
if needle in t:
    pass
old = """  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <MarqueeRow reviews={row1} direction="ltr" durationSec={92} />
      <MarqueeRow reviews={row2.length > 0 ? row2 : row1} direction="rtl" durationSec={108} />
    </div>
  );
}"""
new = """  if (rowCount === 1) {
    return <MarqueeRow reviews={row1} direction="ltr" durationSec={92} />;
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <MarqueeRow reviews={row1} direction="ltr" durationSec={92} />
      <MarqueeRow reviews={row2.length > 0 ? row2 : row1} direction="rtl" durationSec={108} />
    </motionless>
  );
}"""
new = new.replace("</motionless>", "</motionless>").replace(
    "    </motionless>\n  );", "    </div>\n  );"
)
if old not in t:
    raise SystemExit("marquee old block missing")
marquee_path.write_text(t.replace(old, new), encoding="utf-8")

# Landing page full content
landing = '''"use client";

import { ContactForm } from "@/components/home/contact-form";
import { HomeTestimonialsMarquee } from "@/components/home/home-testimonials-marquee";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { SiteWordmarkFooter } from "@/components/layout/site-wordmark-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BoiseBottomContactSection } from "@/components/landing/boise-bottom-contact-section";
import { PressureWashingBoiseArticleSection } from "@/components/landing/pressure-washing-boise-article-section";
import type { GoogleReview, SocialLink } from "@/lib/home-content";
import { BUSINESS } from "@/lib/business";
import { getBlogHeroBlendStyle } from "@/lib/homepage-hero-bg";
import type { TreasureValleyPressurePageConfig } from "@/lib/treasure-valley-pressure-page-config";
import { zenPick } from "@/lib/zen-pick-gallery";

const phoneHref = BUSINESS.phoneTel;
const defaultHeroSrc = zenPick("tranquil treatment room massage bed");
const defaultHeroContactFormId = "hero-contact-form";

export function PressureWashingBoiseLanding({
  socialLinks,
  articleMarkdown,
  testimonials = [],
  cityPage,
}: {
  socialLinks: SocialLink[];
  articleMarkdown: string;
  testimonials?: GoogleReview[] | null;
  cityPage?: TreasureValleyPressurePageConfig | null;
}) {
  const heroSrc = cityPage?.heroImageSrc ?? defaultHeroSrc;
  const heroAlt =
    cityPage?.heroImageAlt ??
    "Massage, reflexology, and scalp treatments at Zen Day Spa in Eagle, Idaho";
  const heroTitle = cityPage?.heroTitle ?? `${BUSINESS.nameShort} — Eagle, Idaho`;
  const heroSubtitle =
    cityPage?.heroSubtitle ??
    "Massage, reflexology, and scalp treatments in a tranquil spa setting. Walk-ins welcome; same-day and last-minute appointments often available.";
  const heroFormId = cityPage?.heroContactFormId ?? defaultHeroContactFormId;
  const heroFormName = cityPage?.heroFormName ?? "Homepage hero";
  const reviewList = testimonials ?? [];

  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <header className="relative z-[200] isolate min-h-0 overflow-x-clip bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
        <SiteHeader anchorBase="/" />
      </header>

      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <SiteBreadcrumbs />

        <section
          aria-label={heroAlt}
          className="relative left-1/2 z-10 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-transparent min-h-[28rem] md:min-h-[32rem] lg:min-h-[36rem]"
          style={getBlogHeroBlendStyle(heroSrc)}
        >
          <div className="absolute inset-0 z-10 flex items-end">
            <motionless />
          </div>
        </section>

        {reviewList.length > 0 ? (
          <section className="relative left-1/2 z-0 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip bg-zen-crimson py-8 md:py-10">
            <div className="trust-carousel-reveal">
              <HomeTestimonialsMarquee testimonials={reviewList} rowCount={1} />
            </div>
          </section>
        ) : null}

        {articleMarkdown.trim() ? (
          <>
            <PressureWashingBoiseArticleSection markdown={articleMarkdown} cityPage={cityPage} />
            <BoiseBottomContactSection
              testimonials={reviewList}
              sectionId={cityPage?.bottomContactSectionId}
              heading={cityPage?.bottomContactHeading}
              subtext={cityPage?.bottomContactSubtext}
              formWrapperId={cityPage?.bottomContactFormId}
              formName={cityPage?.bottomFormName}
            />
          </>
        ) : null}
      </main>

      <SiteWordmarkFooter socialLinks={socialLinks} />
    </div>
  );
}
'''

inner = """            <div className="mx-auto flex w-full max-w-[95vw] flex-col gap-8 px-2 pb-8 pt-24 sm:max-w-[min(80vw,100%)] sm:px-3 sm:pb-10 md:min-h-[32rem] md:flex-row md:items-end md:justify-between md:gap-8 md:px-4 md:pb-12 lg:min-h-[36rem] lg:gap-10">
              <div className="min-w-0 w-full max-w-3xl md:flex-1">
                <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                  {heroTitle}
                </h1>
                <p className="mt-4 max-w-2xl text-sm font-medium text-white/90 md:text-base">
                  {heroSubtitle}
                </p>
                <div className="mt-8 flex w-full max-w-lg flex-col items-start justify-start gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
                  <a className="btn-call w-full min-w-[12rem] justify-center sm:w-auto" href={phoneHref}>
                    Call {BUSINESS.phoneDisplay}
                  </a>
                  <a
                    href={`#${heroFormId}`}
                    className="inline-flex w-full min-w-[12rem] items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white hover:!text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
                  >
                    Book Now
                  </a>
                </div>
              </div>

              <div className="flex w-full flex-col items-stretch md:min-h-0 md:flex-1 md:basis-0 md:items-center md:justify-end">
                <div
                  id={heroFormId}
                  className="fade-up relative z-20 w-full max-w-xl rounded-3xl border border-white/25 bg-zen-crimson p-6 text-left shadow-[0_24px_55px_rgba(28,13,13,0.35)] ring-1 ring-white/20 sm:p-8 md:mx-auto md:w-full md:max-w-sm lg:max-w-md"
                >
                  <ContactForm variant="dark" formName={heroFormName} />
                </motionless>
              </motionless>
            </motionless>"""

inner = inner.replace("</motionless>", "</motionless>")
for tag in ["div", "div", "motionless"]:
    inner = inner.replace("    </motionless>\n", "    </div>\n", 1)
inner = inner.replace(
    '              <motionless />\n              </motionless>\n            </motionless>',
    '              </div>\n            </motionless>',
)
# fix remaining motionless manually
inner = inner.replace("<motionless />", "<div>", 1)
inner = inner.replace("</motionless>", "</div>")
while "<motionless" in inner or "motionless>" in inner:
    inner = inner.replace("<motionless />", "<div>").replace("</motionless>", "</motionless>").replace("</motionless>", "</div>")

landing = landing.replace(
    '          <div className="absolute inset-0 z-10 flex items-end">\n            <motionless />\n          </div>',
    f'          <div className="absolute inset-0 z-10 flex items-end">\n{inner}\n          </div>',
)

if "motionless" in landing:
    raise SystemExit("landing still has bad tag")

(ROOT / "src/components/landing/pressure-washing-boise-landing.tsx").write_text(landing, encoding="utf-8")
print("done")

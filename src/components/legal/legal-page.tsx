import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { BlogMarkdownArticle } from "@/components/blog/blog-markdown-article";
import { SiteFooterRegion } from "@/components/layout/site-footer-region";
import type { SocialLink } from "@/lib/home-content";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";

const LEGAL_HERO_IMAGE = gpmPick("outdoor multi court acrylic surfacing");

export function LegalPage({
  title,
  markdown,
  socialLinks,
}: {
  title: string;
  markdown: string;
  socialLinks: SocialLink[];
}) {
  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <BlogHeroBand imageSrc={LEGAL_HERO_IMAGE} imageAlt={gpmImageAlt(LEGAL_HERO_IMAGE)}>
          <div className="min-w-0 w-full max-w-3xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              {title}
            </h1>
          </div>
        </BlogHeroBand>

        <section className="section-pad bg-zen-crimson text-white light:bg-transparent light:text-zen-espresso">
          <div className="shell">
            <article className="mx-auto w-full max-w-3xl">
              <BlogMarkdownArticle markdown={markdown} />
            </article>
          </div>
        </section>
      </main>

      <SiteFooterRegion socialLinks={socialLinks} />
    </div>
  );
}

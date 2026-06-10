"use client";

import { BlogArticleSidebar } from "@/components/blog/blog-article-sidebar";
import { OtherServicesNav } from "@/components/landing/other-services-nav";
import { PortalSignInButtons } from "@/components/layout/portal-sign-in-buttons";
import { BUSINESS } from "@/lib/business";
import { getOtherServicesSidebarLinks } from "@/lib/other-services-sidebar";
import { pmServicePagePath } from "@/lib/pm-service-pages";
import type { TreasureValleyPressurePageConfig } from "@/lib/treasure-valley-pressure-page-config";

type RentalsListingSectionProps = {
  cityPage: TreasureValleyPressurePageConfig;
};

/** Rentals overview — portal CTAs + ManageBuilding listings embed. */
export function RentalsListingSection({ cityPage }: RentalsListingSectionProps) {
  const sidebarPath = pmServicePagePath(cityPage.slug);
  const shareTitle = cityPage.shareTitle ?? `${BUSINESS.nameShort} · Rentals`;
  const otherServicesLinks = getOtherServicesSidebarLinks(cityPage.slug);

  return (
    <section className="section-pad bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <div className="shell">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid items-start gap-10 border-t border-white/10 pt-8 light:border-slate-200 xl:grid-cols-[minmax(0,1fr)_19rem] xl:gap-12">
            <article className="min-w-0">
              <div className="mt-10">
                <h2 className="font-heading text-2xl font-bold text-white light:text-zen-espresso md:text-3xl">
                  Available Rentals
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="col-span-full overflow-hidden rounded-2xl border border-zen-gold/20 bg-white shadow-sm ring-1 ring-zen-crimson/10">
                    <iframe
                      src="https://greenbeltpm.managebuilding.com/Resident/Public/Rentals?hidenav=true"
                      title="Available rentals — Greenbelt Property Management"
                      className="h-[600px] w-full border-0"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <PortalSignInButtons className="mt-10" align="center" variant="primary" />
            </article>

            <aside className="max-xl:hidden xl:z-10 xl:block xl:min-w-0 xl:self-start">
              <BlogArticleSidebar
                path={sidebarPath}
                shareTitle={shareTitle}
                toc={[]}
                author={null}
                showShare={false}
                showDesktopAsideFrom="xl"
                asideMenu={
                  <OtherServicesNav panelId={cityPage.sidebarPanelId} links={otherServicesLinks} />
                }
              />
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import type { ReactElement } from "react";
import { BlogArticleSidebar } from "@/components/blog/blog-article-sidebar";
import {
  BlogMarkdownArticle,
  type BlogMarkdownListBulletStyle,
} from "@/components/blog/blog-markdown-article";
import { BoiseMapEmbed } from "@/components/landing/boise-map-embed";
import { ChristmasLightInstallationGallery } from "@/components/landing/christmas-light-installation-gallery";
import { HeavyEquipmentFleetGallery } from "@/components/landing/heavy-equipment-fleet-gallery";
import { OtherServicesNav } from "@/components/landing/other-services-nav";
import { cityPagePath, isCityPropertyPageSlug } from "@/lib/city-property-pages";
import { isCourtConstructionSlug } from "@/lib/court-construction-nav";
import {
  getOtherServicesSidebarGroups,
  getOtherServicesSidebarLinks,
} from "@/lib/other-services-sidebar";
import { PressureWashingBoiseFaq } from "@/components/landing/pressure-washing-boise-faq";
import { PropertyManagementServiceHighlights } from "@/components/landing/property-management-service-highlights";
import { PressureWashingBoiseProcessTimeline } from "@/components/landing/pressure-washing-boise-process-timeline";
import { WhatWeOptimizeCard } from "@/components/landing/what-we-optimize-card";
import { BUSINESS } from "@/lib/business";
import { EAGLE_AREA_MAP } from "@/lib/maps-embed";
import { getPmServicePage, pmServicePagePath } from "@/lib/pm-service-pages";
import { servicePagePath } from "@/lib/service-pages";

function landingSidebarPath(slug: string): string {
  if (getPmServicePage(slug)) return pmServicePagePath(slug);
  return servicePagePath(slug);
}
import type { TreasureValleyPressurePageConfig } from "@/lib/treasure-valley-pressure-page-config";

const WHAT_WE_OPTIMIZE_MARKER = "<!--SOL_BOISE_WHAT_WE_OPTIMIZE-->";
const FAQ_MARKER = "<!--SOL_BOISE_FAQ-->";
const PROCESS_MARKER = "<!--SOL_BOISE_PROCESS_TIMELINE-->";
const MAP_EMBED_MARKER = "<!--SOL_BOISE_MAP_EMBED-->";
const GET_STARTED_CTA_MARKER = "<!--SOL_BOISE_GET_STARTED_CTA-->";
const HEAVY_EQUIP_GALLERY_MARKER = "<!--SOL_HEAVY_EQUIP_GALLERY-->";
const CHRISTMAS_LIGHTS_GALLERY_MARKER = "<!--SOL_CHRISTMAS_LIGHTS_GALLERY-->";

/** Map is rendered once before FAQs; strip legacy markers from markdown bodies. */
function stripMapMarkers(markdown: string): string {
  return markdown
    .replaceAll(MAP_EMBED_MARKER, "")
    .replace(/\n*---\n*\n*(?=<h2)/g, "\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * City markdown sometimes contains a written FAQ section that duplicates
 * the dedicated accordion component. Keep only the accordion on city pages.
 */
function stripCityMarkdownFaqSection(markdown: string): string {
  const faqHeadingPattern =
    /(?:^|\n)##\s+.*(?:frequently asked questions?|faqs?|questions?)(?:\s.*)?(?:\n|$)/im;
  const match = faqHeadingPattern.exec(markdown);
  if (!match || typeof match.index !== "number") return markdown;
  return markdown.slice(0, match.index).trim();
}

/** Remove inline markdown image blocks from Arizona city article bodies. */
function stripMarkdownImages(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function renderMarkdownChunkInner(
  markdown: string,
  listBulletStyle: BlogMarkdownListBulletStyle,
) {
  const trimmed = markdown.trim();
  if (!trimmed) return null;

  const heavyParts = trimmed.split(HEAVY_EQUIP_GALLERY_MARKER);
  const heavyAwareNodes =
    heavyParts.length < 2
      ? [<BlogMarkdownArticle key="md-0" markdown={trimmed} listBulletStyle={listBulletStyle} />]
      : heavyParts.flatMap((part, idx) => {
          const nodes: ReactElement[] = [];
          const partTrimmed = part.trim();
          if (partTrimmed) {
            nodes.push(
              <BlogMarkdownArticle
                key={`heavy-md-${idx}`}
                markdown={partTrimmed}
                listBulletStyle={listBulletStyle}
              />,
            );
          }
          if (idx < heavyParts.length - 1) {
            nodes.push(<HeavyEquipmentFleetGallery key={`heavy-gallery-${idx}`} className="mt-10" />);
          }
          return nodes;
        });

  const withChristmasGalleries = heavyAwareNodes.flatMap((node, nodeIdx) => {
    if (!("props" in node) || !node.props?.markdown || typeof node.props.markdown !== "string") {
      return [node];
    }

    const md = node.props.markdown as string;
    const christmasParts = md.split(CHRISTMAS_LIGHTS_GALLERY_MARKER);
    if (christmasParts.length < 2) return [node];

    return christmasParts.flatMap((part, idx) => {
      const nodes: ReactElement[] = [];
      const partTrimmed = part.trim();
      if (partTrimmed) {
        nodes.push(
          <BlogMarkdownArticle
            key={`xmas-md-${nodeIdx}-${idx}`}
            markdown={partTrimmed}
            listBulletStyle={listBulletStyle}
          />,
        );
      }
      if (idx < christmasParts.length - 1) {
        nodes.push(
          <ChristmasLightInstallationGallery key={`xmas-gallery-${nodeIdx}-${idx}`} className="mt-8" />,
        );
      }
      return nodes;
    });
  });

  return <>{withChristmasGalleries}</>;
}

function MarkdownChunkWithOptionalFleetGallery({
  markdown,
  wrapperClassName,
  listBulletStyle = "sunset-check",
}: {
  markdown: string;
  wrapperClassName?: string;
  listBulletStyle?: BlogMarkdownListBulletStyle;
}) {
  const trimmed = markdown.trim();
  if (!trimmed) return null;

  const inner = renderMarkdownChunkInner(trimmed, listBulletStyle);
  return wrapperClassName ? <div className={wrapperClassName}>{inner}</div> : inner;
}

function renderMarkdownWithGetStartedCta(
  chunk: string,
  wrapperClassName: string,
  listBulletStyle: BlogMarkdownListBulletStyle = "sunset-check",
) {
  const trimmed = chunk.trim();
  if (!trimmed) return null;
  const ctaParts = trimmed.split(GET_STARTED_CTA_MARKER);
  const beforeCta = (ctaParts[0] ?? "").trim();
  const afterCta = ctaParts.length > 1 ? ctaParts.slice(1).join(GET_STARTED_CTA_MARKER).trim() : "";

  return (
    <div className={wrapperClassName}>
      {beforeCta ? <BlogMarkdownArticle markdown={beforeCta} listBulletStyle={listBulletStyle} /> : null}
      {afterCta ? <BlogMarkdownArticle markdown={afterCta} listBulletStyle={listBulletStyle} /> : null}
    </div>
  );
}

function MarkdownAfterProcessBlock({
  markdown,
  listBulletStyle = "sunset-check",
}: {
  markdown: string;
  listBulletStyle?: BlogMarkdownListBulletStyle;
}) {
  const trimmed = markdown.trim();
  if (!trimmed) return null;
  return renderMarkdownWithGetStartedCta(trimmed, "mt-8", listBulletStyle);
}

/** Long-form service copy for Boise ID landing; sidebar uses “Other services” hub links instead of author/share/TOC. */
export function PressureWashingBoiseArticleSection({
  markdown,
  cityPage,
}: {
  markdown: string;
  cityPage?: TreasureValleyPressurePageConfig | null;
}) {
  const baseBody = stripMapMarkers(markdown.trim());
  const cityAdjustedBody = cityPage ? stripCityMarkdownFaqSection(baseBody) : baseBody;
  const body =
    cityPage?.slug.includes("-az") ? stripMarkdownImages(cityAdjustedBody) : cityAdjustedBody;
  const mapEmbedSrc = cityPage?.mapEmbedSrc ?? EAGLE_AREA_MAP.mapEmbedSrc;
  const mapIframeTitle = cityPage?.mapIframeTitle ?? EAGLE_AREA_MAP.mapIframeTitle;
  const sidebarPath = cityPage
    ? isCityPropertyPageSlug(cityPage.slug)
      ? cityPagePath(cityPage.slug)
      : landingSidebarPath(cityPage.slug)
    : pmServicePagePath("court-builders-boise-id");
  const shareTitle =
    cityPage?.shareTitle ?? `${BUSINESS.nameShort} · Massage & spa · Eagle, ID`;
  const sidebarPanelId = cityPage?.sidebarPanelId ?? "boise-other-services-desktop";
  const otherServicesGroups = cityPage ? getOtherServicesSidebarGroups(cityPage.slug) : undefined;
  const otherServicesLinks =
    cityPage && !otherServicesGroups ? getOtherServicesSidebarLinks(cityPage.slug) : undefined;
  const listBulletStyle: BlogMarkdownListBulletStyle =
    cityPage?.articleListBulletStyle ?? "sunset-check";
  const stepBadgeVariant = cityPage?.timelineStepBadgeVariant ?? "gradient";
  const faqParts = body.split(FAQ_MARKER);
  const hasFaqBlock = faqParts.length > 1;
  const hasFaqItems = (cityPage?.faqItems?.length ?? 0) > 0;
  const showFaq = hasFaqBlock || hasFaqItems;
  const articleCore = (faqParts[0] ?? "").trim();

  const whatParts = articleCore.split(WHAT_WE_OPTIMIZE_MARKER);
  const hasWhatWeOptimize = whatParts.length > 1;
  const markdownBeforeWhat = (whatParts[0] ?? "").trim();
  const afterWhatJoined = hasWhatWeOptimize ? whatParts.slice(1).join(WHAT_WE_OPTIMIZE_MARKER).trim() : "";

  const segmentAfterWhat = hasWhatWeOptimize ? afterWhatJoined : articleCore;

  const procParts = segmentAfterWhat.split(PROCESS_MARKER);
  const hasProcessTimeline = procParts.length > 1;
  const markdownBeforeProcess = (procParts[0] ?? "").trim();
  const markdownAfterProcess = hasProcessTimeline ? procParts.slice(1).join(PROCESS_MARKER).trim() : "";

  return (
    <section className="section-pad bg-zen-crimson text-white light:bg-transparent light:text-zen-espresso">
      <div className="shell">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid items-start gap-10 border-t border-white/10 pt-8 light:border-slate-200 xl:grid-cols-[minmax(0,1fr)_19rem] xl:gap-12">
            <article className="min-w-0">
              {body ? (
                <>
                  {hasWhatWeOptimize && markdownBeforeWhat ? (
                    <MarkdownChunkWithOptionalFleetGallery
                      markdown={markdownBeforeWhat}
                      listBulletStyle={listBulletStyle}
                    />
                  ) : null}
                  {hasWhatWeOptimize ? <WhatWeOptimizeCard className="mt-8" /> : null}
                  {hasProcessTimeline ? (
                    <>
                      {markdownBeforeProcess ? (
                        <MarkdownChunkWithOptionalFleetGallery
                          markdown={markdownBeforeProcess}
                          listBulletStyle={listBulletStyle}
                          wrapperClassName={
                            markdownBeforeWhat || hasWhatWeOptimize ? "mt-8" : undefined
                          }
                        />
                      ) : null}
                      <hr className="my-10 border-0 border-t border-white/15 light:border-slate-200" />
                      <PressureWashingBoiseProcessTimeline
                        heading={cityPage?.timelineHeading}
                        intro={cityPage?.timelineIntro}
                        steps={cityPage?.timelineSteps}
                        stepBadgeVariant={stepBadgeVariant}
                      />
                      {markdownAfterProcess ? (
                        <MarkdownAfterProcessBlock
                          markdown={markdownAfterProcess}
                          listBulletStyle={listBulletStyle}
                        />
                      ) : null}
                    </>
                  ) : markdownBeforeProcess ? (
                    <MarkdownChunkWithOptionalFleetGallery
                      markdown={markdownBeforeProcess}
                      listBulletStyle={listBulletStyle}
                      wrapperClassName={hasWhatWeOptimize ? "mt-8" : undefined}
                    />
                  ) : null}
                  {cityPage && !isCourtConstructionSlug(cityPage.slug) ? (
                    <BoiseMapEmbed className="mt-12" src={mapEmbedSrc} title={mapIframeTitle} />
                  ) : null}
                  {cityPage?.serviceHighlightCards?.length ? (
                    <PropertyManagementServiceHighlights
                      cards={cityPage.serviceHighlightCards}
                      className="mt-12"
                    />
                  ) : null}
                  {showFaq ? (
                    <PressureWashingBoiseFaq
                      className="mt-12 border-t border-white/10 pt-10 light:border-slate-200"
                      heading={cityPage?.faqHeading}
                      intro={cityPage?.faqIntro}
                      items={cityPage?.faqItems}
                      idPrefix={cityPage?.faqIdPrefix}
                    />
                  ) : null}
                </>
              ) : (
                <p className="text-base text-white/70 light:text-zen-taupe">
                  Article content is unavailable.
                </p>
              )}
            </article>
            <aside className="max-xl:hidden xl:z-10 xl:block xl:sticky xl:top-6 xl:max-h-[calc(100vh-1.5rem)] xl:min-w-0 xl:overflow-y-auto xl:overscroll-y-contain xl:self-start xl:pr-1 [-webkit-overflow-scrolling:touch] [scrollbar-color:rgba(148,163,184,0.55)_transparent] [scrollbar-width:thin] light:[scrollbar-color:rgba(100,116,139,0.45)_transparent]">
              <BlogArticleSidebar
                path={sidebarPath}
                shareTitle={shareTitle}
                toc={[]}
                author={null}
                showShare={false}
                showDesktopAsideFrom="xl"
                asideMenu={
                  <OtherServicesNav
                    panelId={sidebarPanelId}
                    links={otherServicesLinks}
                    groups={otherServicesGroups}
                  />
                }
              />
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

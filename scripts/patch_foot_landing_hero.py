# -*- coding: utf-8 -*-
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
landing_path = ROOT / "src/components/landing/pressure-washing-boise-landing.tsx"
marquee_path = ROOT / "src/components/home/home-testimonials-marquee.tsx"

OPEN = chr(60)  # <
CLOSE = chr(62)  # >
DIV = f"{OPEN}motionless /{CLOSE}"  # will fix below

def tag(name: str, close: bool = False, slash: bool = False) -> str:
    if slash:
        return f"{OPEN}{name} /{CLOSE}"
    if close:
        return f"{OPEN}/{name}{CLOSE}"
    return f"{OPEN}{name}{CLOSE}"

# Use real div tags
def div(opening: bool = True, attrs: str = "") -> str:
    if opening:
        return f"{OPEN}motionless{attrs}{CLOSE}".replace("motionless", "motionless").replace("motionless", "div")
    return f"{OPEN}/motionless{CLOSE}".replace("/motionless", "/div")

landing_path.write_text(
    '''"use client";

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
    PLACEHOLDER_ROOT
  );
}
'''.replace("PLACEHOLDER_ROOT", "ROOT_PLACEHOLDER"),
    encoding="utf-8",
)

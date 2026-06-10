import groq from "groq";

export const homePageQuery = groq`
  *[_type == "homePage"]|order(_updatedAt desc)[0]{
    navItems,
    trustBarItems,
    services[]{
      name,
      blurb,
      image,
      hoverImage,
      cardIcon
    },
    whyChooseUs[]{
      title,
      body,
      icon
    },
    processSteps[]{
      step,
      title,
      body,
      icon
    },
    googleReviews[]{
      id,
      name,
      quote,
      image
    },
    faqs[]{
      question,
      answer
    },
    pageCopy{
      heroEyebrow,
      heroTitle,
      heroSubtitle,
      heroTrustSignals[]{ highlight, title },
      heroStripHeading,
      heroStripSubheading,
      heroTrustStripLogos[]{ src, alt },
      ctaCallVerb,
      ctaBookNowLabel,
      contactFormSubmitLabel,
      localIntroEyebrow,
      localIntroTitleLine1,
      localIntroTitleLine2,
      localIntroBody,
      servicesHeading,
      servicesIntro,
      servicesExploreLabel,
      closingShowcaseEyebrow,
      closingShowcaseHeading,
      closingShowcaseBragLine,
      closingShowcaseBragSubline,
      closingShowcaseBody,
      closingShowcaseBullets[],
      processSectionEyebrow,
      processSectionHeadingLead,
      processSectionHeadingRest,
      processSectionSubtext,
      trustMarqueeHeading,
      trustMarqueeSubtext,
      serviceAreaHeading,
      serviceAreaBody,
      faqHeadingLine1,
      faqHeadingLine2,
      faqSubtext,
      faqIntroBeforeEmphasis,
      faqIntroEmphasis,
      faqIntroAfterEmphasis,
      faqIntroSubtext,
      contactHeading,
      contactSubtext
    },
    servicesCarousel[]{
      name,
      image
    },
    socialLinks[]{
      label,
      href
    }
  }
`;

export const galleryPageQuery = groq`
  *[_type == "galleryPage" && slug.current == "gallery"] | order(_updatedAt desc)[0]{
    title,
    slug,
    heroSubheading,
    overviewHeadline,
    overviewBody,
    overviewStats[]{
      value,
      label
    },
    highlightsTitle,
    highlightsIntro,
    highlightItems[]{
      image,
      caption,
      alt
    },
    items[]{
      image,
      caption,
      alt
    },
    seo{
      metaTitle,
      metaDescription
    }
  }
`;

export const locationPageBySlugQuery = groq`
  *[_type == "locationPage" && slug.current == $slug] | order(_updatedAt desc)[0]{
    title,
    slug,
    layoutTemplate,
    articleMarkdown,
    seo{
      metaTitle,
      metaDescription
    }
  }
`;

export const faqPageQuery = groq`
  *[_type == "faqPage" && slug.current == "faq"] | order(_updatedAt desc)[0]{
    title,
    slug,
    heroSubheading,
    categories[]{
      id,
      label,
      faqs[]{
        question,
        answer
      }
    },
    seo{
      metaTitle,
      metaDescription
    }
  }
`;

/**
 * Default scaffold for new blog posts — matches the long-form shell used by
 * `/blog/massage-therapist-cost` (hero + Markdown body + TOC). Editors replace
 * all placeholder copy, slug, images, anchors, and SEO before publishing.
 */
export const FULL_ARTICLE_BODY_STARTER = `*Replace this note and all placeholder copy before publishing.*

Opening paragraph with your primary keyword in **bold**. Keep it helpful and specific to Boise / the Treasure Valley when relevant.

Second paragraph expands on what the reader will learn and why it matters.

---

<h2 id="introduction">Introduction</h2>

Explain why this topic varies by property, materials, or scope — set expectations before pricing or steps.

<h2 id="what-includes">What’s Included</h2>

Describe the service in plain language. Link to relevant site pages when helpful, for example <a href="https://solpressurewash.com/house-pressure-washing-boise-id/" target="_blank" rel="noopener noreferrer">house pressure washing in Boise</a>.

Typical scope often includes:

- First bullet (specific deliverable)
- Second bullet
- Third bullet

---

<h2 id="average-cost">Average Cost / Typical Ranges</h2>

Share realistic ranges or how quotes are built. Use **bold** for dollar ranges.

<h2 id="factors">Factors That Affect Pricing</h2>

![Private massage suite at Zen Day Spa Eagle Idaho](/images/zen/Private-Spa-Room-With-Massage-Bed-And-Products-Eagle-Idaho-Zen-Day-Spa-Massage-Scalp-and-Reflexology.webp)

<h3 id="factor-one">1. First factor</h3>

Short explanation.

<h3 id="factor-two">2. Second factor</h3>

Short explanation.

---

<h2 id="faqs">FAQs</h2>

<h3>Sample question?</h3>

Sample answer.

---

<h2 id="conclusion">Conclusion</h2>

Wrap up with a clear takeaway. For a strong CTA, link <a href="https://hatzcourtbuilders.com/" target="_blank" rel="noopener noreferrer">Hatz Court Builders</a> and phone <a href="tel:+12089790002">(208) 979-0002</a>.
`;

/** Starter TOC — align \`id\` values with \`<h2 id="...">\` / \`<h3 id="...">\` in the body above. */
export const FULL_ARTICLE_TOC_STARTER = [
  { _type: "tocItem" as const, _key: "toc-introduction", id: "introduction", label: "Introduction", level: 2 },
  { _type: "tocItem" as const, _key: "toc-what-includes", id: "what-includes", label: "What’s Included", level: 2 },
  { _type: "tocItem" as const, _key: "toc-average-cost", id: "average-cost", label: "Average Cost / Typical Ranges", level: 2 },
  { _type: "tocItem" as const, _key: "toc-factors", id: "factors", label: "Factors That Affect Pricing", level: 2 },
  { _type: "tocItem" as const, _key: "toc-factor-one", id: "factor-one", label: "First factor", level: 3 },
  { _type: "tocItem" as const, _key: "toc-factor-two", id: "factor-two", label: "Second factor", level: 3 },
  { _type: "tocItem" as const, _key: "toc-faqs", id: "faqs", label: "FAQs", level: 2 },
  { _type: "tocItem" as const, _key: "toc-conclusion", id: "conclusion", label: "Conclusion", level: 2 },
];

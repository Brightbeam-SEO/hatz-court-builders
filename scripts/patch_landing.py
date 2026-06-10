from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
out = ROOT / "src/components/landing/pressure-washing-boise-landing.tsx"

D = "div"
O = chr(60)
C = chr(62)

def tag(name: str, attrs: str = "", self_close: bool = False, close: bool = False) -> str:
    if close:
        return f"{O}/{name}{C}"
    if self_close:
        return f"{O}{name}{attrs} /{C}"
    return f"{O}{name}{attrs}{C}"

def jsx(*parts: str) -> str:
    return "".join(parts)

hero_inner = jsx(
    tag(D, ' className="absolute inset-0 z-10 flex items-end"'),
    tag(D, ' className="mx-auto flex w-full max-w-[95vw] flex-col gap-8 px-2 pb-6 pt-24 sm:max-w-[min(80vw,100%)] sm:px-3 sm:pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:px-4 md:pb-10 lg:gap-10"'),
    tag(D, ' className="min-w-0 w-full max-w-3xl md:flex-1"'),
    tag("h1", ' className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"'),
    "                  {heroTitle}\n",
    tag("h1", close=True),
    tag("p", ' className="mt-4 max-w-2xl text-sm font-medium text-white/90 md:text-base"'),
    "                  {heroSubtitle}\n",
    tag("p", close=True),
    tag(D, ' className="mt-8 flex w-full max-w-lg flex-col items-start justify-start gap-3 sm:max-w-none sm:flex-row sm:flex-wrap"'),
    tag("a", ' className="btn-call w-full min-w-[12rem] justify-center sm:w-auto" href={phoneHref}'),
    "                    Call {BUSINESS.phoneDisplay}\n",
    tag("a", close=True),
    tag("a", ' href={`#${heroFormId}`} className="inline-flex w-full min-w-[12rem] items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white hover:!text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"'),
    "                    Book Now\n",
    tag("a", close=True),
    tag(D, close=True),
    tag(D, close=True),
    tag(D, ' className="flex w-full flex-col items-stretch md:min-h-0 md:flex-1 md:basis-0 md:items-center md:justify-end md:pb-0"'),
    tag(D, ' id={heroFormId} className="fade-up relative z-20 w-full max-w-xl scroll-mt-28 rounded-3xl border border-white/25 bg-zen-crimson p-6 text-left shadow-[0_24px_55px_rgba(28,13,13,0.35)] ring-1 ring-white/20 sm:p-8 md:mx-auto md:w-full md:max-w-sm lg:max-w-md"'),
    tag("ContactForm", ' variant="dark" formName={heroFormName}', self_close=True),
    tag(D, close=True),
    tag(D, close=True),
    tag(D, close=True),
    tag(D, close=True),
)

testimonials_section = jsx(
    tag("section", ' className="relative left-1/2 z-0 mt-0 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip bg-zen-crimson py-8 text-white sm:py-10 md:py-12"'),
    tag(D, ' className="trust-carousel-reveal px-0"'),
    tag("HomeTestimonialsMarquee", " testimonials={reviewList} rowCount={1}", self_close=True),
    tag(D, close=True),
    tag("section", close=True),
)

hero_section = (
    "        <section\n"
    "          aria-label={heroAlt}\n"
    '          className="relative left-1/2 z-10 w-screen max-w-[100vw] -translate-x-1/2 min-h-[28rem] overflow-hidden bg-transparent md:min-h-[28rem] lg:min-h-[32rem]"\n'
    "          style={getBlogHeroBlendStyle(heroSrc)}\n"
    "        >\n"
    + hero_inner.replace(tag(D), tag("div")).replace(tag(D, close=True), tag("motionless", close=True))
)
# fix - hero_inner already uses D="div"
hero_section = (
    "        <section\n"
    "          aria-label={heroAlt}\n"
    '          className="relative left-1/2 z-10 w-screen max-w-[100vw] -translate-x-1/2 min-h-[28rem] overflow-hidden bg-transparent md:min-h-[28rem] lg:min-h-[32rem]"\n'
    "          style={getBlogHeroBlendStyle(heroSrc)}\n"
    "        >\n"
    + hero_inner
    + "        </section>\n\n"
    + testimonials_section.replace("        ", "        ", 1)  # keep indent
)

# indent hero_inner lines
hero_lines = hero_inner.split("\n")
hero_inner_indented = "\n".join("          " + ln if ln.strip() else ln for ln in hero_lines)
hero_section = (
    "        <section\n"
    "          aria-label={heroAlt}\n"
    '          className="relative left-1/2 z-10 w-screen max-w-[100vw] -translate-x-1/2 min-h-[28rem] overflow-hidden bg-transparent md:min-h-[28rem] lg:min-h-[32rem]"\n'
    "          style={getBlogHeroBlendStyle(heroSrc)}\n"
    "        >\n"
    + hero_inner_indented
    + "\n        </section>\n\n"
    + "        <section className=\"relative left-1/2 z-0 mt-0 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip bg-zen-crimson py-8 text-white sm:py-10 md:py-12\">\n"
    + "          <div className=\"trust-carousel-reveal px-0\">\n"
    + "            <HomeTestimonialsMarquee testimonials={reviewList} rowCount={1} />\n"
    + "          </div>\n"
    + "        </section>\n"
)

src = p.read_text(encoding="utf-8") if (p := out).exists() else ""

# Read current file
text = out.read_text(encoding="utf-8")

# Remove trust block
if "const trustSignals" in text:
    text = text[: text.index("const trustSignals")] + text[text.index("export function PressureWashingBoiseLanding") :]

# Ensure imports
if "getBlogHeroBlendStyle" not in text:
    text = text.replace(
        'import { BUSINESS } from "@/lib/business";\n',
        'import { BUSINESS } from "@/lib/business";\nimport { getBlogHeroBlendStyle } from "@/lib/homepage-hero-bg";\n',
    )
if "HomeTestimonialsMarquee" not in text:
    text = text.replace(
        'import { ContactForm } from "@/components/home/contact-form";\n',
        'import { ContactForm } from "@/components/home/contact-form";\nimport { HomeTestimonialsMarquee } from "@/components/home/home-testimonials-marquee";\n',
    )
for bad in ("import Image from \"next/image\";\n", "import { useEffect, useState } from \"react\";\n"):
    text = text.replace(bad, "")

if "const reviewList" not in text:
    text = text.replace(
        '  const heroFormName = cityPage?.heroFormName ?? "Homepage hero";\n\n  return (',
        '  const heroFormName = cityPage?.heroFormName ?? "Homepage hero";\n  const reviewList = testimonials ?? [];\n\n  return (',
    )

# Find and replace hero + trust sections
marker_start = "        {/* Hero"
if marker_start not in text:
    marker_start = '        <section className="relative z-10 mx-auto'
marker_end = "        {articleMarkdown.trim()"

i0 = text.index(marker_start)
i1 = text.index(marker_end)
text = text[:i0] + hero_section + "\n" + text[i1:]

out.write_text(text, encoding="utf-8")
print("Patched", out)

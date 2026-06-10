from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/components/landing/pressure-washing-boise-landing.tsx"
t = p.read_text(encoding="utf-8")

# Remove corrupt tags
for bad in (chr(60) + "motionless" + chr(62), chr(60) + "motionless /" + chr(62)):
    t = t.replace(bad, "")

start = t.index('          <div className="relative z-10 mx-auto w-full max-w-[95vw]')
end = t.index("        </section>", start) + len("        </section>")

lt, gt = chr(60), chr(62)
d = "motionless"
d = "motionless"
d = "div"

hero_block = f"""          {lt}{d} className="relative z-10 mx-auto w-full max-w-[95vw] px-2 py-8 sm:max-w-[min(80vw,100%)] sm:px-3 sm:py-10 md:px-4 md:py-12 lg:py-14"{gt}
            {lt}{d} className="flex w-full flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between md:gap-8 lg:gap-10"{gt}
              {lt}{d} className="flex min-w-0 w-full max-w-3xl flex-col justify-center md:flex-1"{gt}
                {lt}h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"{gt}
                  {{heroTitle}}
                {lt}/h1{gt}
                {lt}p className="mt-4 max-w-2xl text-sm font-medium text-white/90 md:text-base"{gt}
                  {{heroSubtitle}}
                {lt}/p{gt}
                {lt}{d} className="mt-8 flex w-full max-w-lg flex-col items-start justify-start gap-3 sm:max-w-none sm:flex-row sm:flex-wrap"{gt}
                  {lt}a
                    className="btn-call w-full min-w-[12rem] justify-center sm:w-auto"
                    href={{phoneHref}}
                  {gt}
                    Call {{BUSINESS.phoneDisplay}}
                  {lt}/a{gt}
                  {lt}a
                    href={{`#${{heroFormId}}`}}
                    className="inline-flex w-full min-w-[12rem] items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white hover:!text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
                  {gt}
                    Book Now
                  {lt}/a{gt}
                {lt}/{d}{gt}
              {lt}/{d}{gt}
              {lt}{d} className="flex w-full flex-col items-stretch md:min-h-0 md:flex-1 md:basis-0 md:items-center md:justify-center md:pb-0"{gt}
                {lt}{d}
                  id={{heroFormId}}
                  className="fade-up relative z-20 w-full max-w-xl scroll-mt-28 rounded-3xl border border-white/25 bg-zen-crimson p-6 text-left shadow-[0_24px_55px_rgba(28,13,13,0.35)] ring-1 ring-white/20 sm:p-8 md:mx-auto md:w-full md:max-w-sm lg:max-w-md"
                {gt}
                  {lt}ContactForm variant="dark" formName={{heroFormName}} /{gt}
                {lt}/{d}{gt}
              {lt}/{d}{gt}
            {lt}/{d}{gt}
          {lt}/{d}{gt}
        </section>"""

hero_block = hero_block.replace("motionless", "div")

# Find first hero section only
s0 = t.index("        <section\n          aria-label={heroAlt}")
e0 = t.index("        </section>", s0) + len("        </section>")
t = t[:s0] + "        <section\n          aria-label={heroAlt}\n          className=\"relative left-1/2 z-10 flex w-screen max-w-[100vw] -translate-x-1/2 flex-col justify-center bg-transparent min-h-[28rem] md:min-h-[30rem] lg:min-h-[32rem]\"\n          style={getBlogHeroBlendStyle(heroSrc)}\n        >\n" + hero_block + t[e0:]

# Fix testimonials section
s1 = t.index('        <section className="relative left-1/2 z-0 mt-0')
e1 = t.index("        </section>", s1) + len("        </section>")
test_block = f"""        <section className="relative left-1/2 z-0 mt-0 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip bg-transparent py-8 text-white sm:py-10 md:py-12">
          {lt}div className="trust-carousel-reveal px-0"{gt}
            {lt}HomeTestimonialsMarquee
              testimonials={{reviewList}}
              rowCount={{1}}
              cardVariant="solid"
            /{gt}
          {lt}/div{gt}
        </section>"""
t = t[:s1] + test_block + t[e1:]

p.write_text(t, encoding="utf-8")
print("ok")

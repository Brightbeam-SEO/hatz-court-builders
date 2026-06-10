from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/components/landing/pressure-washing-boise-landing.tsx"
text = p.read_text(encoding="utf-8")

corrupt = chr(60) + "motionless"
text = text.replace(corrupt, chr(60) + "div")
text = text.replace(chr(60) + "/motionless" + chr(62), chr(60) + "/div" + chr(62))

start = text.index("        <section\n          aria-label={heroAlt}")
end = text.index("        </section>", start) + len("        </section>")

needle = '              <div className="min-w-0 w-full max-w-3xl md:flex-1">'
inner_start = text.index(needle, start)
inner_end = text.rindex("              </div>", start, end) + len("              </div>")
inner = text[inner_start:inner_end]

lt, gt = chr(60), chr(62)
d = "div"

hero = (
    "        <section\n"
    "          aria-label={heroAlt}\n"
    '          className="relative left-1/2 z-10 flex w-screen max-w-[100vw] -translate-x-1/2 flex-col justify-end bg-transparent min-h-[28rem] md:min-h-[30rem] lg:min-h-[32rem]"\n'
    "          style={getBlogHeroBlendStyle(heroSrc)}\n"
    "        >\n"
    f'          {lt}{d} className="relative z-10 mx-auto w-full max-w-[95vw] px-2 py-8 sm:max-w-[min(80vw,100%)] sm:px-3 sm:py-10 md:px-4 md:py-12 lg:py-14"{gt}\n'
    f'            {lt}{d} className="flex w-full flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between md:gap-8 lg:gap-10"{gt}\n'
    f"{inner}\n"
    f"            {lt}/{d}{gt}\n"
    f"          {lt}/{d}{gt}\n"
    "        </section>"
)

text = text[:start] + hero + text[end:]
p.write_text(text, encoding="utf-8")
print("patched")
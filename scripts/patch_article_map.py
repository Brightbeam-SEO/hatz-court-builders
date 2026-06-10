from pathlib import Path

p = Path("src/components/landing/pressure-washing-boise-article-section.tsx")
text = p.read_text(encoding="utf-8")

old = """  const inner = <>{withChristmasGalleries}</>;
  return wrapperClassName ? <div className={wrapperClassName}>{inner}</div> : inner;
}

function renderMarkdownWithGetStartedCta("""

new = open(Path(__file__).parent / "article_map_chunk.txt", encoding="utf-8").read()

if old not in text:
    raise SystemExit("old block not found")

text = text.replace(old, new, 1)
text = text.replace(
    'const sidebarPath = cityPage ? `/${cityPage.slug}` : "/foot-massage-reflexology";',
    'const sidebarPath = cityPage ? servicePagePath(cityPage.slug) : servicePagePath("foot-massage-reflexology");',
)

for old_call, new_call in [
    (
        """                      listBulletStyle={listBulletStyle}
                      wrapperClassName={
                        markdownBeforeWhat || hasWhatWeOptimize ? "mt-8" : undefined
                      }""",
        """                      listBulletStyle={listBulletStyle}
                      mapEmbedSrc={cityPage?.mapEmbedSrc}
                      mapIframeTitle={cityPage?.mapIframeTitle}
                      wrapperClassName={
                        markdownBeforeWhat || hasWhatWeOptimize ? "mt-8" : undefined
                      }""",
    ),
    (
        """                      listBulletStyle={listBulletStyle}
                      wrapperClassName={markdownBeforeWhat || hasWhatWeOptimize ? "mt-8" : undefined}""",
        """                      listBulletStyle={listBulletStyle}
                      mapEmbedSrc={cityPage?.mapEmbedSrc}
                      mapIframeTitle={cityPage?.mapIframeTitle}
                      wrapperClassName={markdownBeforeWhat || hasWhatWeOptimize ? "mt-8" : undefined}""",
    ),
]:
    if old_call in text:
        text = text.replace(old_call, new_call)

p.write_text(text, encoding="utf-8", newline="\n")
print("patched")

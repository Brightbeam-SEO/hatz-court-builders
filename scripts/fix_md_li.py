from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/components/blog/blog-markdown-article.tsx"
t = p.read_text(encoding="utf-8")
t = t.replace(
    "        <SunsetCheckBullet variant={checkVariant} />\n        <motionless />",
    '        <SunsetCheckBullet variant={checkVariant} />\n        <motionless />',
)
t = t.replace(
    "        <SunsetCheckBullet variant={checkVariant} />\n        <motionless />",
    "        <SunsetCheckBullet variant={checkVariant} />\n        <div className=\"min-w-0 flex-1 [&_p]:my-0\">{children}</div>",
)
t = t.replace("<motionless />", "")
p.write_text(t, encoding="utf-8")
print("ok")

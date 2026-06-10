from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/components/home/home-testimonials-marquee.tsx"
lines = p.read_text(encoding="utf-8").splitlines()
out = [ln for ln in lines if "motionless" not in ln]
p.write_text("\n".join(out) + "\n", encoding="utf-8")
print("fixed", p)

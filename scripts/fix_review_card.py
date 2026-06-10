from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/components/landing/boise-contact-testimonials-marquee.tsx"
t = p.read_text(encoding="utf-8")
t = t.replace("<motionless />", '<motionless />')
t = t.replace(
    """      <motionless />
          <p className="font-heading text-sm font-bold text-white">{review.name}</p>""",
    """        <div className={centered ? "min-w-0" : "min-w-0 text-left"}>
          <p className="font-heading text-sm font-bold text-white">{review.name}</p>""",
)
t = t.replace("<motionless />", "")
# fix footer div className
old = '      <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-3 light:border-slate-200 sm:mt-4 sm:pt-4">'
new = """      <motionless />"""
new = """      <div
        className={
          centered
            ? "mt-4 flex w-full flex-col items-center gap-3 border-t border-white/20 pt-4"
            : "mt-3 flex items-center gap-3 border-t border-white/10 pt-3 light:border-slate-200 sm:mt-4 sm:pt-4"
        }
      >"""
t = t.replace(old, new)
t = t.replace(
    'ring-1 ring-white/25 light:ring-slate-300',
    'ring-2 ring-white/30',
)
# MarqueeTrack
t = t.replace(
    """function MarqueeTrack({
  reviews,
  durationSec,
  cardVariant = "espresso",
}: {
  reviews: GoogleReview[];
  durationSec: number;
  cardVariant?: keyof typeof REVIEW_CARD_CLASS;
}) {""",
    """function MarqueeTrack({
  reviews,
  durationSec,
  cardVariant = "espresso",
  cardLayout = "default",
}: {
  reviews: GoogleReview[];
  durationSec: number;
  cardVariant?: keyof typeof REVIEW_CARD_CLASS;
  cardLayout?: "default" | "centered";
}) {""",
)
t = t.replace(
    '<ReviewCard key={`${r.id}-${i}`} review={r} variant={cardVariant} />',
    '<ReviewCard key={`${r.id}-${i}`} review={r} variant={cardVariant} layout={cardLayout} />',
)
t = t.replace(
    """export function BoiseContactTestimonialsMarquee({
  testimonials = [],
  cardVariant = "espresso",
}: {
  testimonials?: GoogleReview[] | null;
  cardVariant?: keyof typeof REVIEW_CARD_CLASS;
}) {""",
    """export function BoiseContactTestimonialsMarquee({
  testimonials = [],
  cardVariant = "espresso",
  cardLayout = "default",
}: {
  testimonials?: GoogleReview[] | null;
  cardVariant?: keyof typeof REVIEW_CARD_CLASS;
  cardLayout?: "default" | "centered";
}) {""",
)
t = t.replace(
    '<ReviewCard key={r.id} review={r} variant={cardVariant} />',
    '<ReviewCard key={r.id} review={r} variant={cardVariant} layout={cardLayout} />',
)
t = t.replace(
    '<MarqueeTrack reviews={list} durationSec={durationSec} cardVariant={cardVariant} />',
    '<MarqueeTrack reviews={list} durationSec={durationSec} cardVariant={cardVariant} cardLayout={cardLayout} />',
)
t = t.replace("motionless", "div")
p.write_text(t, encoding="utf-8")
print("ok")

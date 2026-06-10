const defaultProcessSteps = [
  {
    title: "Warm welcome",
    body: "Our team greets you in a calm spa setting and confirms your goals for the session.",
  },
  {
    title: "Personalized consultation",
    body: "We discuss pressure preferences, focus areas, and any health notes so your treatment fits your needs.",
  },
  {
    title: "Tailored treatment",
    body: "Your therapist delivers focused massage or reflexology using techniques matched to your comfort level.",
  },
  {
    title: "Post-treatment care",
    body: "We share simple after-care tips so you leave relaxed and know how to extend the benefits at home.",
  },
] as const;

/** Multi-stop accents aligned with the Zen palette (taupe · gold · sage). */
const stepBadgeGradients = [
  "bg-gradient-to-r from-zen-taupe via-zen-gold to-zen-sage",
  "bg-gradient-to-r from-zen-espresso via-zen-gold to-zen-sage",
  "bg-gradient-to-r from-zen-gold via-zen-sage to-zen-rice",
  "bg-gradient-to-r from-zen-sage via-zen-gold to-zen-taupe",
] as const;

const stepBadgeBase =
  "inline-block text-xs font-semibold uppercase tracking-[0.18em] bg-clip-text text-transparent [background-size:180%_100%]";

const stepCardClass =
  "hero-glass-light rounded-2xl border border-white/25 bg-white/15 p-5 backdrop-blur-xl light:shadow-none";

/** Process timeline in article — h2 matches `BlogMarkdownArticle`; step cards match `WhatWeOptimizeCard` glass shell. */
export function PressureWashingBoiseProcessTimeline({
  className = "",
  heading = "What to Expect During Your Visit",
  intro = "A calm, personalized experience from greeting to post-treatment care.",
  steps = defaultProcessSteps,
  stepBadgeVariant = "gradient",
}: {
  className?: string;
  heading?: string;
  intro?: string;
  steps?: readonly { title: string; body: string }[];
  stepBadgeVariant?: "gradient" | "crimson";
}) {
  return (
    <div className={className.trim()}>
      <div className="w-full text-left">
        <h2 className="font-heading scroll-mt-28 text-2xl font-bold text-white light:text-zen-espresso md:text-3xl">
          {heading}
        </h2>
        <p className="mt-3 text-base leading-7 text-white/85 light:text-zen-taupe">{intro}</p>
      </div>
      <div className="mt-6 flex max-w-2xl flex-col gap-4">
        {steps.map((step, index) => (
          <article key={step.title} className={stepCardClass}>
            <p
              className={
                stepBadgeVariant === "crimson"
                  ? "text-xs font-semibold uppercase tracking-[0.18em] text-zen-crimson light:text-zen-crimson"
                  : `${stepBadgeBase} ${stepBadgeGradients[index] ?? stepBadgeGradients[0]}`
              }
            >
              Step {index + 1}
            </p>
            <h3 className="mt-3 font-heading text-lg font-semibold text-white light:text-zen-espresso">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/80 light:text-zen-taupe">{step.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}


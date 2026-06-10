import { SunsetCheckBullet } from "@/components/sunset-check-bullet";

const items = [
  "Correct nozzle patterns on oxidized siding",
  "Controlled detergent dwell before rinses",
  "Driveway gum & tire-mark passes without etched concrete",
  "Bright-work rinse paths away from storm drains when feasible",
  "Post-job walkthrough photos when helpful",
  "Clear cancellation/reschedule policy when storms roll in",
] as const;

/** Same shell as closed Boise FAQ rows: glass card, rounded-2xl, light cream in light mode. */
export function WhatWeOptimizeCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`hero-glass-light rounded-2xl border border-white/25 bg-white/15 p-5 backdrop-blur-xl light:shadow-none ${className}`.trim()}
    >
      <h3 className="font-heading text-base font-semibold text-white light:text-zen-espresso sm:text-lg">
        What we optimize on every visit
      </h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-white/85 light:text-zen-taupe sm:text-sm sm:leading-7">
            <SunsetCheckBullet />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

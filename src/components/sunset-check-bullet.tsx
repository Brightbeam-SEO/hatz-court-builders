/** Small check bullet for service page lists (`sunset` gradient or solid `crimson`). */
export function SunsetCheckBullet({
  className = "",
  variant = "sunset",
}: {
  className?: string;
  variant?: "sunset" | "crimson";
}) {
  const circleClass =
    variant === "crimson"
      ? "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zen-crimson text-white shadow-sm ring-1 ring-white/20"
      : "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zen-crimson text-white shadow-sm ring-1 ring-zen-espresso/10 light:ring-white/30";

  return (
    <span className={`${circleClass} ${className}`.trim()} aria-hidden>
      <svg viewBox="0 0 12 10" className="h-2.5 w-3" fill="none" aria-hidden>
        <path
          d="M1 5l3 3 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

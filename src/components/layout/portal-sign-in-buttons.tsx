import { OWNER_PORTAL_URL, RESIDENT_PORTAL_URL } from "@/lib/portal-urls";

type PortalSignInButtonsProps = {
  className?: string;
  align?: "start" | "center";
  /** `inverse` — white buttons, green text (hero / homepage). `primary` — green buttons, white text. */
  variant?: "inverse" | "primary";
};

export function PortalSignInButtons({
  className = "",
  align = "start",
  variant = "inverse",
}: PortalSignInButtonsProps) {
  const alignClass =
    align === "center"
      ? "items-center justify-center"
      : "items-start justify-start";
  const btnClass = variant === "primary" ? "btn-call" : "btn-call btn-call-inverse";

  return (
    <div
      className={`flex w-full max-w-lg flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap ${align === "center" ? "mx-auto" : ""} ${alignClass} ${className}`.trim()}
    >
      <a
        className={btnClass}
        href={RESIDENT_PORTAL_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Resident Sign In
      </a>
      <a
        className={btnClass}
        href={OWNER_PORTAL_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Owner Sign In
      </a>
    </div>
  );
}

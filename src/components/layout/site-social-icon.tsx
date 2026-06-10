"use client";

function MaskedAssetIcon({
  assetPath,
  className,
}: {
  assetPath: string;
  className: string;
}) {
  return (
    <span
      className={className}
      aria-hidden
      style={{
        backgroundColor: "currentColor",
        maskImage: `url('${assetPath}')`,
        maskPosition: "center",
        maskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskImage: `url('${assetPath}')`,
        WebkitMaskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

export function SiteSocialIcon({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const cls =
    className ??
    "h-5 w-5 text-black transition-colors group-hover:text-white light:text-zen-espresso light:group-hover:text-white";
  switch (label) {
    case "Facebook":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v5h3v-5h2.3l.7-3H13V9c0-.6.4-1 1-1z"
            fill="currentColor"
          />
        </svg>
      );
    case "Instagram":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      );
    case "X (Twitter)":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 4h3.3l3.7 5.3L16.7 4H20l-6.3 7.6L20 20h-3.3l-4-5.7L7.8 20H4.5l6.5-7.8L5 4z"
            fill="currentColor"
          />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
          <path
            d="M8 10v6M8 8.2v.1M12 16v-3.2c0-1.5 2-1.6 2 0V16M12 12c0-1.8 4-2 4 .8V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Pinterest":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
          <path
            d="M10 20l1-4M11.4 14.5c.5.4 1 .5 1.8.5 2 0 3.3-1.6 3.3-3.6 0-2.2-1.8-3.9-4.4-3.9-3.2 0-4.8 2.2-4.8 4.5 0 1.1.4 2.2 1.3 2.6.1.1.2 0 .2-.1l.3-1.2c0-.2 0-.2-.1-.4-.3-.3-.5-.8-.5-1.5 0-1.9 1.4-3.5 3.7-3.5 2 0 3.1 1.2 3.1 2.8 0 2.1-.9 3.9-2.3 3.9-.8 0-1.3-.7-1.1-1.5l.4-1.8c.2-.9-.3-1.7-1.1-1.7-.9 0-1.5.9-1.5 2.1 0 .8.3 1.3.3 1.3"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "TikTok":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14 5c.8 1.2 1.9 2 3.3 2.2V10c-1.2-.1-2.3-.5-3.3-1.1v4.9c0 2.8-2.2 4.7-4.8 4.7-2.5 0-4.2-1.8-4.2-4 0-2.5 2-4.3 4.5-4.3.3 0 .6 0 .9.1V13a2 2 0 00-.8-.1c-1.3 0-2.2.9-2.2 1.9 0 .9.7 1.7 1.8 1.7 1.2 0 2-.9 2-2.1V5h2.8z"
            fill="currentColor"
          />
        </svg>
      );
    case "Yelp":
      return <MaskedAssetIcon assetPath="/images/footer/social/yelp.svg" className={cls} />;
    case "Google Business":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M21.58 12.23c0-.82-.07-1.6-.2-2.34H12v4.42h5.38a5.3 5.3 0 01-2.29 3.48v2.88h3.7c2.16-1.99 3.41-4.92 3.41-8.44z"
            fill="currentColor"
          />
          <path
            d="M12 22c2.97 0 5.46-.98 7.28-2.65l-3.51-2.72c-.97.65-2.22 1.03-3.77 1.03-2.9 0-5.35-1.96-6.23-4.59H3.34v2.8A10 10 0 0012 22z"
            fill="currentColor"
          />
          <path
            d="M5.84 13.09a6.07 6.07 0 010-2.18V8.13H3.34a10 10 0 000 7.74l2.5-1.91z"
            fill="currentColor"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.34 14.89 1 12 1 7.7 1 4.06 3.6 2.5 7.34l3.34 2.59c.87-2.63 3.33-4.55 6.16-4.55z"
            fill="currentColor"
          />
        </svg>
      );
    case "Apple Maps":
      return <MaskedAssetIcon assetPath="/images/footer/social/apple.svg" className={cls} />;
    case "Bing Maps":
      return <MaskedAssetIcon assetPath="/images/footer/social/bing.svg" className={cls} />;
    case "Nextdoor":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3.5 5 9v11h4.5v-6.5h5V20H19V9L12 3.5z"
            fill="currentColor"
          />
        </svg>
      );
    case "Copy link":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M10 13a5 5 0 007.07 0l1.41-1.41a5 5 0 00-7.07-7.07L9.88 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M14 11a5 5 0 00-7.07 0L5.52 12.41a5 5 0 007.07 7.07L14.12 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Copied":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12.5l4 4L19 6.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <span
          className={`${cls} inline-flex h-full w-full items-center justify-center text-xs font-semibold uppercase`}
        >
          {label.charAt(0)}
        </span>
      );
  }
}

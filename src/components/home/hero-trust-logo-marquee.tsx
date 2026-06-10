"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import type { HomeTrustStripLogo } from "@/lib/home-page-copy";

type HeroTrustLogoMarqueeProps = {
  logos: HomeTrustStripLogo[];
  showTopBorder?: boolean;
  className?: string;
};

function TrustLogoSegment({
  logos,
  copyIndex,
  segmentRef,
}: {
  logos: HomeTrustStripLogo[];
  copyIndex: number;
  segmentRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={segmentRef} className="trust-signal-segment" aria-hidden={copyIndex > 0}>
      {logos.map((signal) => {
        const isSvg = signal.src.toLowerCase().endsWith(".svg");
        return (
          <div key={`trust-logo-${copyIndex}-${signal.src}`} className="trust-signal-item">
            <Image
              src={signal.src}
              alt={copyIndex === 0 ? signal.alt : ""}
              width={360}
              height={140}
              unoptimized={isSvg}
              className="trust-signal-logo trust-signal-logo-on-crimson"
            />
          </div>
        );
      })}
    </div>
  );
}

export function HeroTrustLogoMarquee({
  logos,
  showTopBorder = true,
  className = "",
}: HeroTrustLogoMarqueeProps) {
  const borderClass = showTopBorder ? "mt-1 border-t border-white/14" : "";
  const containerRef = useRef<HTMLDivElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [segmentCount, setSegmentCount] = useState(2);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const segment = segmentRef.current;
    const track = trackRef.current;
    if (!container || !segment || !track || logos.length === 0) {
      setReady(false);
      return;
    }

    const sync = () => {
      const segmentWidth = segment.offsetWidth;
      const viewportWidth = container.offsetWidth;
      if (segmentWidth <= 0 || viewportWidth <= 0) return;

      const count = Math.max(2, Math.ceil(viewportWidth / segmentWidth) + 1);
      setSegmentCount(count);
      track.style.setProperty("--trust-marquee-end", `${segmentWidth}px`);
      setReady(true);
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(container);
    observer.observe(segment);
    return () => observer.disconnect();
  }, [logos]);

  return (
    <div className={`relative w-full overflow-hidden ${borderClass} ${className}`.trim()}>
      <div ref={containerRef} className="relative w-full overflow-hidden py-5">
        <div
          ref={trackRef}
          className={`trust-signal-track${ready ? " trust-signal-track--active" : ""}`}
          aria-hidden={logos.length === 0}
        >
          {Array.from({ length: segmentCount }, (_, index) => (
            <TrustLogoSegment
              key={`trust-segment-${index}`}
              logos={logos}
              copyIndex={index}
              segmentRef={index === 0 ? segmentRef : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

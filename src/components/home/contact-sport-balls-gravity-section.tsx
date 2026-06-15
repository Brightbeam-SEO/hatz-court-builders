"use client";

import Image from "next/image";
import type { IBodyDefinition } from "matter-js";
import { useEffect, useMemo, useState } from "react";
import { Gravity, MatterBody } from "@/components/ui/gravity";
import { cn } from "@/lib/utils";

type SportBallType = {
  kind: string;
  restitution: number;
  imageSrc: string;
  imageAlt: string;
};

type SportBallConfig = SportBallType & {
  id: string;
  x: string;
  y: string;
  size: number;
  matterBodyOptions: IBodyDefinition;
};

const DEFAULT_PHYSICS: IBodyDefinition = {
  friction: 0.08,
  frictionAir: 0.012,
  restitution: 0.55,
  density: 0.002,
};

/** Matches trimmed PNG artwork so physics aligns with the visible circle. */
const BALL_COLLISION_SCALE = 0.92;

const MOBILE_COPIES_PER_TYPE = 3;
const DESKTOP_COPIES_PER_TYPE = 5;
const DESKTOP_MIN_WIDTH = 1024;

const SPORT_BALL_TYPES: SportBallType[] = [
  {
    kind: "basketball",
    restitution: 0.58,
    imageSrc: "/images/contact/sport-balls/basketball.png",
    imageAlt: "Basketball",
  },
  {
    kind: "volleyball",
    restitution: 0.52,
    imageSrc: "/images/contact/sport-balls/volleyball.png",
    imageAlt: "Volleyball",
  },
  {
    kind: "tennis",
    restitution: 0.62,
    imageSrc: "/images/contact/sport-balls/tennis.png",
    imageAlt: "Tennis ball",
  },
  {
    kind: "pickleball",
    restitution: 0.55,
    imageSrc: "/images/contact/sport-balls/pickleball.png",
    imageAlt: "Pickleball",
  },
  {
    kind: "soccer",
    restitution: 0.5,
    imageSrc: "/images/contact/sport-balls/soccer.png",
    imageAlt: "Soccer ball",
  },
  {
    kind: "softball",
    restitution: 0.54,
    imageSrc: "/images/contact/sport-balls/softball.png",
    imageAlt: "Softball",
  },
];

const BALL_SIZES = {
  mobile: {
    basketball: 88,
    volleyball: 82,
    tennis: 58,
    pickleball: 54,
    soccer: 78,
    softball: 72,
  },
  desktop: {
    basketball: 102,
    volleyball: 96,
    tennis: 68,
    pickleball: 62,
    soccer: 90,
    softball: 84,
  },
} as const;

function generateSpawnPositions(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const column = index % 10;
    const row = Math.floor(index / 10);
    const x = 5 + column * 9.2 + (row % 2) * 4;
    const y = 6 + (index % 4) * 6 + row * 2;

    return {
      x: `${Math.min(x, 93).toFixed(1)}%`,
      y: `${Math.min(y, 28)}%`,
    };
  });
}

function buildSportBalls(copiesPerType: number, isDesktop: boolean): SportBallConfig[] {
  const sizeTier = isDesktop ? BALL_SIZES.desktop : BALL_SIZES.mobile;
  const totalBalls = SPORT_BALL_TYPES.length * copiesPerType;
  const positions = generateSpawnPositions(totalBalls);

  return SPORT_BALL_TYPES.flatMap((type, typeIndex) =>
    Array.from({ length: copiesPerType }, (_, copyIndex) => {
      const positionIndex = typeIndex * copiesPerType + copyIndex;
      const position = positions[positionIndex];

      return {
        ...type,
        id: `${type.kind}-${copyIndex + 1}`,
        size: sizeTier[type.kind as keyof typeof sizeTier],
        x: position.x,
        y: position.y,
        matterBodyOptions: { ...DEFAULT_PHYSICS, restitution: type.restitution },
      };
    }),
  );
}

function SportBallVisual({ ball }: { ball: SportBallConfig }) {
  return (
    <div
      className="relative overflow-hidden rounded-full"
      style={{ width: ball.size, height: ball.size }}
    >
      <Image
        src={ball.imageSrc}
        alt={ball.imageAlt}
        fill
        className="object-contain"
        sizes={`${ball.size}px`}
        unoptimized
      />
    </div>
  );
}

function StaticSportBalls({
  balls,
  className,
}: {
  balls: SportBallConfig[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[inherit] flex-wrap items-end justify-center gap-2 overflow-hidden bg-zen-rice px-3 pb-8 pt-6 sm:gap-3 sm:px-4",
        className,
      )}
      aria-hidden
    >
      {balls.map((ball) => (
        <div key={ball.id} className="translate-y-2">
          <SportBallVisual ball={ball} />
        </div>
      ))}
    </div>
  );
}

type ContactSportBallsGravitySectionProps = {
  className?: string;
};

export function ContactSportBallsGravitySection({ className = "" }: ContactSportBallsGravitySectionProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMedia = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);

    const updateMotion = () => setReduceMotion(motionMedia.matches);
    const updateDesktop = () => setIsDesktop(desktopMedia.matches);

    updateMotion();
    updateDesktop();

    motionMedia.addEventListener("change", updateMotion);
    desktopMedia.addEventListener("change", updateDesktop);

    return () => {
      motionMedia.removeEventListener("change", updateMotion);
      desktopMedia.removeEventListener("change", updateDesktop);
    };
  }, []);

  const sportBalls = useMemo(() => {
    const copiesPerType = isDesktop ? DESKTOP_COPIES_PER_TYPE : MOBILE_COPIES_PER_TYPE;
    return buildSportBalls(copiesPerType, isDesktop);
  }, [isDesktop]);

  if (!mounted || reduceMotion) {
    return <StaticSportBalls balls={sportBalls} className={className} />;
  }

  return (
    <div
      className={cn(
        "relative h-full min-h-[inherit] w-full overflow-hidden bg-zen-rice",
        className,
      )}
      aria-label="Interactive sport balls"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-[34%] z-0 border-t border-dashed border-zen-espresso/10"
        aria-hidden
      />
      <Gravity
        key={isDesktop ? "desktop" : "mobile"}
        gravity={{ x: 0, y: 1.05 }}
        addTopWall={false}
        grabCursor
        className="z-10"
      >
        {sportBalls.map((ball) => (
          <MatterBody
            key={ball.id}
            x={ball.x}
            y={ball.y}
            collisionScale={BALL_COLLISION_SCALE}
            matterBodyOptions={ball.matterBodyOptions}
          >
            <SportBallVisual ball={ball} />
          </MatterBody>
        ))}
      </Gravity>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import { cn } from "@/lib/utils";

/** Average advance width per glyph in em (Big Shoulders black uppercase). */
const WORDMARK_CHAR_WIDTH_EM = 0.62;

const CHAR_CLASS =
  "font-heading font-black uppercase leading-none tracking-[-0.04em]";

function wordmarkFontSize(charCount: number) {
  const glyphs = Math.max(charCount, 1);
  const fit = `calc(100vw / (${glyphs} * ${WORDMARK_CHAR_WIDTH_EM}))`;
  return `clamp(3rem, max(${fit}, 11vw), 14rem)`;
}

function ShutterCharacter({ char, index }: { char: string; index: number }) {
  const delay = index * 0.04;
  const glyph = char === " " ? "\u00A0" : char;

  return (
    <div className="relative shrink-0 overflow-hidden">
      <motion.span
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
        className={cn(CHAR_CLASS, "text-white/10")}
      >
        {glyph}
      </motion.span>

      <motion.span
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "100%", opacity: [0, 1, 0] }}
        transition={{ duration: 0.7, delay, ease: "easeInOut" }}
        aria-hidden
        className={cn(CHAR_CLASS, "pointer-events-none absolute inset-0 z-10 text-zen-gold")}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
      >
        {glyph}
      </motion.span>

      <motion.span
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: "-100%", opacity: [0, 1, 0] }}
        transition={{ duration: 0.7, delay: delay + 0.1, ease: "easeInOut" }}
        aria-hidden
        className={cn(CHAR_CLASS, "pointer-events-none absolute inset-0 z-10 text-white/25")}
        style={{ clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)" }}
      >
        {glyph}
      </motion.span>

      <motion.span
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "100%", opacity: [0, 1, 0] }}
        transition={{ duration: 0.7, delay: delay + 0.2, ease: "easeInOut" }}
        aria-hidden
        className={cn(CHAR_CLASS, "pointer-events-none absolute inset-0 z-10 text-zen-gold")}
        style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}
      >
        {glyph}
      </motion.span>
    </div>
  );
}

export function FooterWordmarkShutter({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const { ref, revealed } = useHomeScrollReveal<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: "0px 0px 20% 0px",
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const displayText = text.toUpperCase();
  const characters = displayText.split("");
  const showAnimation = revealed && !prefersReducedMotion;
  const fontSize = wordmarkFontSize(characters.length);

  return (
    <div
      ref={ref}
      style={{ fontSize }}
      className={cn(
        "pointer-events-none w-full select-none overflow-hidden pb-1 [margin-bottom:-0.04em]",
        className,
      )}
      aria-hidden="true"
    >
      {showAnimation ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex w-full flex-nowrap items-end justify-center gap-[0.02em] leading-none"
        >
          {characters.map((char, index) => (
            <ShutterCharacter key={`${char}-${index}`} char={char} index={index} />
          ))}
        </motion.div>
      ) : revealed ? (
        <p className={cn(CHAR_CLASS, "w-full whitespace-nowrap text-center text-white/10")}>
          {displayText}
        </p>
      ) : null}
    </div>
  );
}

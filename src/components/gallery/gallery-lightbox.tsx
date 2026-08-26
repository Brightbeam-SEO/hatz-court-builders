"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryLightboxImage = {
  src: string;
  alt: string;
};

type GalleryLightboxProps = {
  images: GalleryLightboxImage[];
  index: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

export function GalleryLightbox({
  images,
  index,
  onClose,
  onChangeIndex,
}: GalleryLightboxProps) {
  const isOpen = index !== null && index >= 0 && index < images.length;
  const current = isOpen ? images[index] : null;

  const showPrev = useCallback(() => {
    if (index === null || images.length === 0) return;
    onChangeIndex((index - 1 + images.length) % images.length);
  }, [images.length, index, onChangeIndex]);

  const showNext = useCallback(() => {
    if (index === null || images.length === 0) return;
    onChangeIndex((index + 1) % images.length);
  }, [images.length, index, onChangeIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, showNext, showPrev]);

  if (!isOpen || !current) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/90 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt || "Gallery image"}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 sm:top-5"
        aria-label="Close full view"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 z-10 rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-4"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-2 z-10 rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      ) : null}

      <div
        className="relative flex max-h-[min(92vh,56rem)] w-full max-w-[min(96vw,72rem)] flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative max-h-[min(84vh,52rem)] w-full">
          <Image
            src={current.src}
            alt={current.alt}
            width={1600}
            height={1200}
            className="mx-auto max-h-[min(84vh,52rem)] w-auto max-w-full object-contain"
            unoptimized={current.src.startsWith("/api/")}
            priority
          />
        </div>
        {current.alt ? (
          <p className="mt-3 max-w-3xl text-center text-sm text-white/80 sm:text-base">{current.alt}</p>
        ) : null}
        {images.length > 1 ? (
          <p className="mt-1 text-xs text-white/55">
            {index + 1} / {images.length}
          </p>
        ) : null}
      </div>
    </div>
  );
}

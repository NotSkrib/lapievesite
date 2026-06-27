"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react";

export type Shot = { src: string; alt: string };

export function GalleryGrid({ images }: { images: Shot[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) =>
        i === null ? i : (i + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, go]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              loading={i < 8 ? "eager" : "lazy"}
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous"
              className="absolute left-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <CaretLeft size={22} />
            </button>

            <motion.div
              key={index}
              className="relative h-[82vh] w-[92vw]"
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next"
              className="absolute right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <CaretRight size={22} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

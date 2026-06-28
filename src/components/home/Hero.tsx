"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100dvh] items-end overflow-hidden"
    >
      {/* Parallax photographic backdrop */}
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-0 -z-10 h-[116%]"
      >
        <motion.div
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease }}
          className="relative h-full w-full"
        >
          <Image
            src="/images/villas/vigna/dji_0480.jpg"
            alt="Aerial view of La Pieve villas and olive grove in Tuscany"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Scrim for text legibility over the photo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

      <Container className="pb-20 pt-28 sm:pb-28">
        <div className="max-w-3xl text-white">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-[2.7rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {t("title")}{" "}
            <em className="italic">{t("titleEm")}</em>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="/booking" size="lg">
              {tCta("primary")}
            </Button>
            <Link
              href="/villas"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/40 px-7 text-base font-medium text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/10"
            >
              {tCta("viewAll")}
              <ArrowRight size={18} weight="bold" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

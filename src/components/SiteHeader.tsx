"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useScroll, useMotionValueEvent } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { clsx } from "@/lib/clsx";

const navItems = [
  { href: "/", key: "home" },
  { href: "/villas", key: "villas" },
  { href: "/gallery", key: "gallery" },
  { href: "/location", key: "location" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 8);
  });

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-2xl leading-none tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          La Pieve
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "text-sm transition-colors hover:text-ink",
                isActive(item.href) ? "text-ink" : "text-muted",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher label={t("menu")} />
          <ThemeToggle />
          <Button href="/booking" size="md">
            {tCta("primary")}
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full text-ink hover:bg-surface-2"
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-border bg-bg lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "rounded-lg px-3 py-3 text-lg transition-colors hover:bg-surface-2",
                  isActive(item.href) ? "text-ink" : "text-muted",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between gap-4 px-3">
              <LocaleSwitcher label={t("menu")} />
            </div>
            <div className="mt-3 px-3">
              <Button
                href="/booking"
                size="lg"
                className="w-full"
              >
                {tCta("primary")}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { site } from "@/lib/site";
import { villas } from "@/lib/villas";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tVillas = await getTranslations("villas");
  const year = new Date().getFullYear();

  const explore = [
    { href: "/", key: "home" },
    { href: "/villas", key: "villas" },
    { href: "/gallery", key: "gallery" },
    { href: "/location", key: "location" },
  ] as const;

  return (
    <footer className="mt-24 border-t border-border bg-surface text-ink">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-3xl tracking-tight">La Pieve</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {t("tagline")}
          </p>
          <address className="mt-6 text-sm not-italic leading-relaxed text-muted">
            {site.address.street}
            <br />
            {site.address.city}
            <br />
            {site.address.region}
          </address>
        </div>

        <nav className="flex flex-col gap-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t("explore")}
          </p>
          {explore.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-ink"
            >
              {tNav(item.key)}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t("stay")}
          </p>
          {villas.map((v) => (
            <Link
              key={v.slug}
              href={`/villas/${v.slug}`}
              className="text-muted transition-colors hover:text-ink"
            >
              {v.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t("contact")}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="text-muted transition-colors hover:text-ink"
          >
            {site.email}
          </a>
          <a
            href={site.phoneHref}
            className="text-muted transition-colors hover:text-ink"
          >
            {site.phone}
          </a>
          <Link
            href="/booking"
            className="mt-1 font-medium text-accent transition-colors hover:text-accent-strong"
          >
            {tVillas("title")}
          </Link>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted sm:flex-row">
          <p>
            {year} La Pieve. {t("rights")}
          </p>
          <LocaleSwitcher label={t("language")} />
        </Container>
      </div>
    </footer>
  );
}

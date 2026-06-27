import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Phone, EnvelopeSimple, MapPin, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return { title: `${t("title")} | La Pieve` };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tCta = await getTranslations("cta");

  return (
    <div className="pb-8">
      <PageIntro title={t("title")} subtitle={t("subtitle")} />

      <Container className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            {t("writeTitle")}
          </h2>
          <ul className="mt-8 space-y-6 text-lg text-ink">
            <li className="flex items-start gap-4">
              <EnvelopeSimple size={24} className="mt-1 shrink-0 text-accent" />
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-4">
              <Phone size={24} className="mt-1 shrink-0 text-accent" />
              <a
                href={site.phoneHref}
                className="transition-colors hover:text-accent"
              >
                {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-4">
              <MapPin size={24} className="mt-1 shrink-0 text-accent" />
              <address className="not-italic leading-relaxed text-muted">
                {site.address.street}
                <br />
                {site.address.city}
                <br />
                {site.address.region}
              </address>
            </li>
          </ul>

          <Link
            href="/booking"
            className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-base font-medium text-brand-ink transition-transform duration-200 hover:bg-brand/90 active:translate-y-px"
          >
            {tCta("primary")}
            <ArrowRight size={18} weight="bold" />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mb-6 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            {t("findTitle")}
          </h2>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow)]">
            <iframe
              title="Map showing La Pieve near Calci, Pisa"
              src={site.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Car, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { site, distances } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("location");
  return { title: `${t("title")} | La Pieve` };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("location");

  const routes = ["fromPisa", "fromFlorence", "fromGenoa"] as const;

  return (
    <div className="pb-8">
      <PageIntro title={t("title")} subtitle={t("subtitle")} />

      <Container className="mt-12">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow)]">
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

      <Container className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            {t("reachTitle")}
          </h2>
          <div className="mt-8 grid grid-cols-3 gap-x-6 gap-y-8">
            {distances.map((d) => (
              <div key={d.place}>
                <p className="font-display text-4xl text-ink">
                  {d.km}
                  <span className="ml-1 text-base text-muted">km</span>
                </p>
                <p className="mt-1 text-sm text-muted">{d.place}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-3 border-t border-border pt-8 text-muted">
            <MapPin size={22} weight="regular" className="mt-0.5 shrink-0 text-accent" />
            <address className="not-italic leading-relaxed">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region}
            </address>
          </div>
          <a
            href={site.mapLink}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-medium text-accent transition-colors hover:text-accent-strong"
          >
            {t("openMap")}
            <ArrowUpRight size={18} weight="bold" />
          </a>
        </div>

        <div>
          <h2 className="flex items-center gap-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            <Car size={28} weight="regular" className="text-accent" />
            {t("byCarTitle")}
          </h2>
          <ul className="mt-8 space-y-5">
            {routes.map((r) => (
              <li key={r} className="leading-relaxed text-muted">
                {t(r)}
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-[var(--radius-card)] bg-surface-2 px-5 py-4 leading-relaxed text-ink">
            {t("parking")}
          </p>
        </div>
      </Container>
    </div>
  );
}

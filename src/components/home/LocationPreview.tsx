import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { site, distances } from "@/lib/site";

export async function LocationPreview() {
  const t = await getTranslations("location");

  return (
    <section className="bg-surface py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
              {t("subtitle")}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3">
              {distances.map((d) => (
                <div key={d.place}>
                  <p className="font-display text-3xl text-ink">
                    {d.km}
                    <span className="ml-1 text-base text-muted">km</span>
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{d.place}</p>
                </div>
              ))}
            </div>

            <a
              href={site.mapLink}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-base font-medium text-accent transition-colors hover:text-accent-strong"
            >
              {t("openMap")}
              <ArrowUpRight size={18} weight="bold" />
            </a>
          </Reveal>

          <Reveal delay={0.1}>
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
        </div>
      </Container>
    </section>
  );
}

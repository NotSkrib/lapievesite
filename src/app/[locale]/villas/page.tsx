import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, getLocale, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { villas, villaBlurb } from "@/lib/villas";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("villas");
  return { title: `${t("title")} | La Pieve` };
}

export default async function VillasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("villas");
  const tCta = await getTranslations("cta");
  const activeLocale = (await getLocale()) as Locale;

  return (
    <div className="pb-12">
      <PageIntro title={t("title")} subtitle={t("subtitle")} />

      <Container className="mt-14">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {villas.map((v, i) => (
            <Reveal as="article" key={v.slug} delay={(i % 2) * 0.08}>
              <Link href={`/villas/${v.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-lg)]">
                  <Image
                    src={v.card}
                    alt={`${v.name} villa at La Pieve`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-5 text-sm text-muted">
                  {t(`themes.${v.themeKey}`)}
                </p>
                <h2 className="mt-1 font-display text-3xl tracking-tight text-ink">
                  {v.name}
                </h2>
                <p className="mt-2 max-w-md leading-relaxed text-muted">
                  {villaBlurb(v, activeLocale)}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-base font-medium text-accent transition-colors group-hover:text-accent-strong">
                  {tCta("viewVilla")}
                  <ArrowRight size={18} weight="bold" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}

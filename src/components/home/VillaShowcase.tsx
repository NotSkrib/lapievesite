import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { villas } from "@/lib/villas";
import { clsx } from "@/lib/clsx";

// Bento spans (12-col): rows of 8+4, 4+8, 6+6. Exactly 6 cells, no gaps.
const spans = [
  "lg:col-span-8",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-8",
  "lg:col-span-6",
  "lg:col-span-6",
];

export async function VillaShowcase() {
  const t = await getTranslations("villas");
  const locale = await getLocale();

  return (
    <section className="bg-surface py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12">
          {villas.map((v, i) => (
            <Reveal
              key={v.slug}
              as="article"
              delay={(i % 2) * 0.08}
              className={clsx(spans[i] ?? "lg:col-span-6")}
            >
              <Link
                href={`/villas/${v.slug}`}
                lang={locale}
                className="group relative block h-[320px] overflow-hidden rounded-[var(--radius-lg)] sm:h-[380px] lg:h-[440px]"
              >
                <Image
                  src={v.card}
                  alt={`${v.name} villa at La Pieve`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div className="text-white">
                    <p className="text-sm text-white/75">
                      {t(`themes.${v.themeKey}`)}
                    </p>
                    <h3 className="font-display text-3xl leading-none tracking-tight sm:text-4xl">
                      {v.name}
                    </h3>
                  </div>
                  <span className="grid size-11 shrink-0 translate-y-2 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={20} weight="bold" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

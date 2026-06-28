import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, getLocale, setRequestLocale } from "next-intl/server";
import {
  CaretLeft,
  ArrowRight,
  Drop,
  House,
  CookingPot,
  Bathtub,
  Armchair,
  Sparkle,
  Wind,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { GalleryGrid } from "@/components/GalleryGrid";
import { villas, villaBySlug, villaBlurb } from "@/lib/villas";
import type { Locale } from "@/i18n/routing";

const amenityKeys: { key: string; Icon: Icon }[] = [
  { key: "pool", Icon: Drop },
  { key: "independent", Icon: House },
  { key: "kitchen", Icon: CookingPot },
  { key: "bathrooms", Icon: Bathtub },
  { key: "style", Icon: Armchair },
  { key: "facilities", Icon: Sparkle },
];

export function generateStaticParams() {
  return villas.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = villaBySlug(slug);
  if (!v) return {};
  return { title: `${v.name} | La Pieve` };
}

export default async function VillaPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const v = villaBySlug(slug);
  if (!v) notFound();

  const activeLocale = (await getLocale()) as Locale;
  const t = await getTranslations("villaPage");
  const tVillas = await getTranslations("villas");
  const tAmen = await getTranslations("amenities");
  const tCta = await getTranslations("cta");

  const images = v.gallery.map((src) => ({
    src,
    alt: `${v.name} villa at La Pieve`,
  }));
  const others = villas.filter((x) => x.slug !== v.slug).slice(0, 3);

  return (
    <article className="pb-8">
      {/* Header image */}
      <section className="relative isolate flex h-[62vh] min-h-[420px] items-end overflow-hidden">
        <Image
          src={v.hero}
          alt={`${v.name} villa at La Pieve`}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        <Container className="pb-12">
          <Link
            href="/villas"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
          >
            <CaretLeft size={16} weight="bold" />
            {t("back")}
          </Link>
          <p className="mt-4 text-white/75">{tVillas(`themes.${v.themeKey}`)}</p>
          <h1 className="font-display text-4xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {v.name}
          </h1>
        </Container>
      </section>

      {/* About + amenities */}
      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
              {t("aboutTitle")}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              {villaBlurb(v, activeLocale)}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {amenityKeys.map(({ key, Icon }) => (
                <li key={key} className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 text-accent">
                    <Icon size={18} weight="regular" />
                  </span>
                  <span className="text-ink">
                    {key === "bathrooms"
                      ? `${v.bathrooms} ${tAmen("bathrooms.title")}`
                      : tAmen(`${key}.title`)}
                  </span>
                </li>
              ))}
              {v.hasAirCon && (
                <li className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 text-accent">
                    <Wind size={18} weight="regular" />
                  </span>
                  <span className="text-ink">{tAmen("aircon.title")}</span>
                </li>
              )}
            </ul>
          </Reveal>
        </div>
      </Container>

      {/* Gallery */}
      <Container className="pb-20 sm:pb-24">
        <h2 className="mb-8 font-display text-3xl tracking-tight text-ink sm:text-4xl">
          {t("galleryTitle")}
        </h2>
        <GalleryGrid images={images} />
      </Container>

      {/* Floor plan */}
      {v.floorPlans.length > 0 && (
        <Container className="pb-20 sm:pb-24">
          <h2 className="mb-8 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            {t("floorPlanTitle")}
          </h2>
          <div className={`grid gap-6 ${v.floorPlans.length > 1 ? "sm:grid-cols-2" : "max-w-2xl"}`}>
            {v.floorPlans.map((src, i) => (
              <div
                key={src}
                className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface"
              >
                <Image
                  src={src}
                  alt={`${v.name} floor plan${v.floorPlans.length > 1 ? ` ${i + 1}` : ""}`}
                  width={800}
                  height={600}
                  className="h-auto w-full object-contain"
                />
              </div>
            ))}
          </div>
        </Container>
      )}

      {/* Booking band */}
      <Container>
        <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[#2c3527] px-7 py-14 text-[#f1f1e8] sm:px-14 sm:py-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              {t("bookTitle", { name: v.name })}
            </h2>
            <p className="mt-4 text-lg text-[#f1f1e8]/80">
              {t("bookBody", { name: v.name })}
            </p>
            <Link
              href={`/booking?villa=${v.slug}`}
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[#f1f1e8] px-7 text-base font-medium text-[#23271f] transition-transform duration-200 hover:bg-white active:translate-y-px"
            >
              {tCta("primary")}
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </Container>

      {/* Other villas */}
      <Container className="pt-20 sm:pt-24">
        <h2 className="mb-8 font-display text-3xl tracking-tight text-ink sm:text-4xl">
          {t("otherTitle")}
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/villas/${o.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
                <Image
                  src={o.card}
                  alt={`${o.name} villa at La Pieve`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
              <h3 className="mt-3 font-display text-2xl tracking-tight text-ink">
                {o.name}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </article>
  );
}

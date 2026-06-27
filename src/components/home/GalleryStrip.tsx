import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

// One horizontal element per page (skill Section 5). Scroll-snap, no JS needed.
const shots = [
  "/images/villas/vigna/dsc0208-medium.jpg",
  "/images/villas/limone/tt1-1946-medium.jpg",
  "/images/villas/oleandro/dsc0080medium.jpg",
  "/images/villas/fico/dsc9762medium.jpg",
  "/images/villas/frantoio/20230617-133449.jpg",
  "/images/villas/nerino/piscina1.jpg",
  "/images/villas/vigna/dsc0213-medium.jpg",
  "/images/feature/piscina-vigna.jpg",
  "/images/villas/oleandro/piscinaoleandro1medium.jpg",
];

export async function GalleryStrip() {
  const t = await getTranslations("gallery");
  const tCta = await getTranslations("cta");

  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <Container className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {t("subtitle")}
          </p>
        </div>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-base font-medium text-accent transition-colors hover:text-accent-strong"
        >
          {tCta("viewGallery")}
          <ArrowRight size={18} weight="bold" />
        </Link>
      </Container>

      <div className="mt-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max snap-x snap-mandatory gap-4 px-5 sm:px-8">
          {shots.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[4/5] w-[260px] shrink-0 snap-start overflow-hidden rounded-[var(--radius-lg)] sm:w-[320px]"
            >
              <Image
                src={src}
                alt="La Pieve, the houses and grounds"
                fill
                sizes="320px"
                className="object-cover"
                loading={i < 3 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";

export async function SenseOfPlace() {
  const t = await getTranslations("place");

  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-[var(--shadow)]">
              <Image
                src="/images/feature/s62053.jpg"
                alt="The valley and countryside around La Pieve"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {t("body1")}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {t("body2")}
            </p>

            <div className="mt-8 flex gap-10 border-t border-border pt-8">
              <div>
                <p className="font-display text-4xl text-ink">15</p>
                <p className="mt-1 text-sm text-muted">ettari / hectares</p>
              </div>
              <div>
                <p className="font-display text-4xl text-ink">6</p>
                <p className="mt-1 text-sm text-muted">ville / villas</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

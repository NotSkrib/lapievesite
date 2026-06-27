import { getTranslations } from "next-intl/server";
import {
  Drop,
  House,
  CookingPot,
  Bathtub,
  Armchair,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";

const items: { key: string; Icon: Icon }[] = [
  { key: "pool", Icon: Drop },
  { key: "independent", Icon: House },
  { key: "kitchen", Icon: CookingPot },
  { key: "bathrooms", Icon: Bathtub },
  { key: "style", Icon: Armchair },
  { key: "facilities", Icon: Sparkle },
];

export async function Amenities() {
  const t = await getTranslations("amenities");

  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {t("title")}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {items.map(({ key, Icon }, i) => (
                <Reveal key={key} delay={(i % 2) * 0.06}>
                  <div className="flex gap-4">
                    <span className="mt-1 grid size-11 shrink-0 place-items-center rounded-full bg-surface-2 text-accent">
                      <Icon size={22} weight="regular" />
                    </span>
                    <div>
                      <h3 className="text-lg font-medium text-ink">
                        {t(`${key}.title`)}
                      </h3>
                      <p className="mt-1.5 leading-relaxed text-muted">
                        {t(`${key}.body`)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

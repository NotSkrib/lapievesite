import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/PageIntro";
import { GalleryGrid } from "@/components/GalleryGrid";
import { villas } from "@/lib/villas";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("gallery");
  return { title: `${t("title")} | La Pieve` };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");

  const images = villas.flatMap((v) => [
    ...v.gallery.map((src) => ({ src, alt: `${v.name} villa at La Pieve` })),
    ...v.floorPlans.map((src) => ({ src, alt: `${v.name} floor plan` })),
  ]);

  return (
    <div className="pb-12">
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <Container className="mt-12">
        <GalleryGrid images={images} />
      </Container>
    </div>
  );
}

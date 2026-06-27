import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { SenseOfPlace } from "@/components/home/SenseOfPlace";
import { VillaShowcase } from "@/components/home/VillaShowcase";
import { Amenities } from "@/components/home/Amenities";
import { LocationPreview } from "@/components/home/LocationPreview";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { BookingBand } from "@/components/home/BookingBand";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SenseOfPlace />
      <VillaShowcase />
      <Amenities />
      <LocationPreview />
      <GalleryStrip />
      <BookingBand />
    </>
  );
}

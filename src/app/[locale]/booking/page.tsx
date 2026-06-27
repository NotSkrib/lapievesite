import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/PageIntro";
import { EnquiryForm } from "@/components/EnquiryForm";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("booking");
  return { title: `${t("title")} | La Pieve` };
}

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ villa?: string }>;
}) {
  const { locale } = await params;
  const { villa } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("booking");
  const tContact = await getTranslations("contact");

  return (
    <div className="pb-12">
      <PageIntro title={t("title")} subtitle={t("body")} />

      <Container className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <EnquiryForm defaultVilla={villa} />
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-7">
            <h2 className="font-display text-2xl tracking-tight text-ink">
              {tContact("writeTitle")}
            </h2>
            <ul className="mt-6 space-y-5 text-ink">
              <li className="flex items-start gap-3">
                <EnvelopeSimple size={20} className="mt-0.5 shrink-0 text-accent" />
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 shrink-0 text-accent" />
                <a
                  href={site.phoneHref}
                  className="transition-colors hover:text-accent"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-accent" />
                <address className="not-italic leading-relaxed text-muted">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region}
                </address>
              </li>
            </ul>
            <p className="mt-7 border-t border-border pt-6 text-sm leading-relaxed text-muted">
              {t("note")}
            </p>
          </div>
        </aside>
      </Container>
    </div>
  );
}

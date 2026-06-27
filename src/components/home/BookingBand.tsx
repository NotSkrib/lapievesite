import { getTranslations } from "next-intl/server";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

// Cypress band. Hardcoded green in both themes (not the flipping --brand token)
// so the page never visually inverts mid-scroll (skill Section 4.11).
export async function BookingBand() {
  const t = await getTranslations("booking");
  const tCta = await getTranslations("cta");

  return (
    <section className="py-10">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[#2c3527] px-7 py-16 text-[#f1f1e8] sm:px-14 sm:py-20">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#f1f1e8]/80">
                {t("body")}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="/booking"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-[#f1f1e8] px-7 text-base font-medium text-[#23271f] transition-transform duration-200 hover:bg-white active:translate-y-px"
                >
                  {tCta("primary")}
                  <ArrowRight size={18} weight="bold" />
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="text-base font-medium text-[#f1f1e8]/85 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {site.email}
                </a>
              </div>

              <p className="mt-6 text-sm text-[#f1f1e8]/60">{t("note")}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

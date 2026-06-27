"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { villas } from "@/lib/villas";
import { site } from "@/lib/site";
import type { WeekSlot } from "@/lib/availability";

const fieldCls =
  "mt-2 h-11 w-full rounded-[var(--radius-card)] border border-border bg-surface px-3.5 text-ink outline-none transition-colors focus:border-accent-strong";
const labelCls = "block text-sm font-medium text-ink";

function isoToUTCDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`);
}

export function EnquiryForm({ defaultVilla }: { defaultVilla?: string }) {
  const t = useTranslations("enquiry");
  const locale = useLocale();
  const [villa, setVilla] = useState(defaultVilla ?? "");
  const [weeks, setWeeks] = useState<WeekSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [week, setWeek] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/availability?villa=${encodeURIComponent(villa)}`)
      .then((r) => r.json())
      .then((data: { weeks: WeekSlot[] }) => {
        if (!active) return;
        setWeeks(data.weeks ?? []);
        // Drop the current selection if it is no longer bookable.
        setWeek((cur) =>
          data.weeks?.some((w) => w.start === cur && w.available) ? cur : "",
        );
      })
      .catch(() => active && setWeeks([]))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [villa]);

  const fmtStart = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  const fmtEnd = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  const weekLabel = (w: WeekSlot) =>
    `${fmtStart.format(isoToUTCDate(w.start))} - ${fmtEnd.format(isoToUTCDate(w.end))}`;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const guests = String(data.get("guests") || "");
    const message = String(data.get("message") || "");
    const villaName = villas.find((v) => v.slug === villa)?.name || t("villaAny");
    const slot = weeks.find((w) => w.start === week);
    const arrival = slot ? weekLabel(slot) : "";

    const subject = `Enquiry - ${villaName}${arrival ? ` (${arrival})` : ""}`;
    const body = [
      `${t("name")}: ${name}`,
      `${t("villa")}: ${villaName}`,
      `${t("week")}: ${arrival}`,
      `${t("guests")}: ${guests}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl">
      <p className="text-muted">{t("intro")}</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={labelCls}>
            {t("name")}
          </label>
          <input id="name" name="name" type="text" required className={fieldCls} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className={labelCls}>
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldCls}
          />
        </div>

        <div>
          <label htmlFor="villa" className={labelCls}>
            {t("villa")}
          </label>
          <select
            id="villa"
            name="villa"
            value={villa}
            onChange={(e) => setVilla(e.target.value)}
            className={fieldCls}
          >
            <option value="">{t("villaAny")}</option>
            {villas.map((v) => (
              <option key={v.slug} value={v.slug}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="guests" className={labelCls}>
            {t("guests")}
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            className={fieldCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="week" className={labelCls}>
            {t("week")}
          </label>
          <select
            id="week"
            name="week"
            required
            value={week}
            disabled={loading}
            onChange={(e) => setWeek(e.target.value)}
            className={`${fieldCls} disabled:opacity-60`}
          >
            <option value="" disabled>
              {loading ? t("weekLoading") : t("weekPlaceholder")}
            </option>
            {weeks.map((w) => (
              <option key={w.start} value={w.start} disabled={!w.available}>
                {weekLabel(w)}
                {w.available ? "" : ` (${t("weekBusy")})`}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-muted">{t("weekHelp")}</p>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>
            {t("message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-2 w-full rounded-[var(--radius-card)] border border-border bg-surface px-3.5 py-2.5 text-ink outline-none transition-colors focus:border-accent-strong"
          />
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-base font-medium text-brand-ink transition-transform duration-200 hover:bg-brand/90 active:translate-y-px"
        >
          {t("send")}
          <PaperPlaneTilt size={18} weight="fill" />
        </button>
        <span className="text-sm text-muted">
          {t("fallback")}{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-accent hover:text-accent-strong"
          >
            {site.email}
          </a>
        </span>
      </div>
    </form>
  );
}

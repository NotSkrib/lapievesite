"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Globe, CaretDown } from "@phosphor-icons/react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";

export function LocaleSwitcher({ label }: { label: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Locale;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <label className="relative inline-flex items-center gap-2 text-ink">
      <span className="sr-only">{label}</span>
      <Globe size={18} weight="regular" className="pointer-events-none" />
      <select
        value={locale}
        onChange={onChange}
        className="cursor-pointer appearance-none bg-transparent pr-5 text-sm font-medium outline-none"
      >
        {locales.map((l) => (
          <option key={l} value={l} className="bg-surface text-ink">
            {localeNames[l]}
          </option>
        ))}
      </select>
      <CaretDown
        size={12}
        weight="bold"
        className="pointer-events-none absolute right-0 text-muted"
      />
    </label>
  );
}

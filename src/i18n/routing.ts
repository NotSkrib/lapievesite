import { defineRouting } from "next-intl/routing";

export const locales = ["en", "it", "de", "fr", "es", "nl"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  nl: "Nederlands",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
});

import type { Locale } from "@/i18n/routing";

export type Villa = {
  slug: string;
  name: string;
  // Short label of what the villa is named after (translated in messages by key).
  themeKey: string;
  // Localised descriptions. en + it are authored; other locales fall back to en
  // until reviewed translations are supplied (see plan, open item 2).
  blurb: Partial<Record<Locale, string>>;
  card: string; // poster image used on the home grid + villas index
  hero: string; // wide image for the villa detail header
  gallery: string[]; // filenames inside /images/villas/<slug>/
};

const g = (slug: string, files: string[]) =>
  files.map((f) => `/images/villas/${slug}/${f}`);

export const villas: Villa[] = [
  {
    slug: "vigna",
    name: "Vigna",
    themeKey: "vineyard",
    blurb: {
      en: "Set among the rows of the old vineyard, with its own pool and a long view over the valley.",
      it: "Immersa tra i filari della vecchia vigna, con piscina privata e un lungo sguardo sulla valle.",
    },
    card: "/images/villas/vigna/piscina-vignamedium.jpg",
    hero: "/images/villas/vigna/dsc0213-medium.jpg",
    gallery: g("vigna", [
      "dsc0208-medium.jpg",
      "dsc0209-medium.jpg",
      "dsc0213-medium.jpg",
      "piscina-vignamedium.jpg",
      "dsc9851medium.jpg",
      "dsc9865medium.jpg",
      "dsc9883medium.jpg",
      "dsc9893medium.jpg",
      "dsc9905medium.jpg",
      "dsc9912medium.jpg",
      "dsc9924medium.jpg",
      "dsc9948medium.jpg",
      "dsc9963medium.jpg",
      "agriturismo-004medium.jpg",
      "agriturismo-012medium.jpg",
      "g0302055medium.jpg",
    ]),
  },
  {
    slug: "limone",
    name: "Limone",
    themeKey: "lemon",
    blurb: {
      en: "Named for the lemon trees that scent the terrace, a bright cottage with its own pool.",
      it: "Prende il nome dai limoni che profumano la terrazza: una casa luminosa con piscina privata.",
    },
    card: "/images/villas/limone/dsc0005medium.jpg",
    hero: "/images/villas/limone/dsc0022medium.jpg",
    gallery: g("limone", [
      "dsc0005medium.jpg",
      "dsc0014medium.jpg",
      "dsc0019medium.jpg",
      "dsc0022medium.jpg",
      "dsc9969medium.jpg",
      "dsc9974medium.jpg",
      "dsc9981medium.jpg",
      "dsc9982medium.jpg",
      "dsc9985medium.jpg",
      "dsc9990medium.jpg",
      "tt1-1939-medium.jpg",
      "tt1-1942-medium.jpg",
      "tt1-1946-medium.jpg",
      "tt1-1949-medium.jpg",
      "tt1-1952-medium.jpg",
      "limo05medium.jpg",
      "limo09medium.jpg",
    ]),
  },
  {
    slug: "oleandro",
    name: "Oleandro",
    themeKey: "oleander",
    blurb: {
      en: "Wrapped in flowering oleander, a quiet cottage with a private pool and shaded corners.",
      it: "Avvolta dagli oleandri in fiore, una casa tranquilla con piscina privata e angoli all'ombra.",
    },
    card: "/images/villas/oleandro/piscinaoleandro1medium.jpg",
    hero: "/images/villas/oleandro/dsc0080medium.jpg",
    gallery: g("oleandro", [
      "dsc0046medium.jpg",
      "dsc0050medium.jpg",
      "dsc0052medium.jpg",
      "dsc0058medium.jpg",
      "dsc0080medium.jpg",
      "dsc0088medium.jpg",
      "dsc0097medium.jpg",
      "dsc0099medium.jpg",
      "dsc0104medium.jpg",
      "piscinaoleandro1medium.jpg",
      "piscinaoleandro2medium.jpg",
      "tt1-1871-medium.jpg",
      "tt1-1874-medium.jpg",
      "tt1-1879-medium.jpg",
      "tt1-1883-medium.jpg",
      "tt1-1890-medium.jpg",
      "tt1-1900-medium.jpg",
      "olea05medium.jpg",
    ]),
  },
  {
    slug: "fico",
    name: "Fico",
    themeKey: "fig",
    blurb: {
      en: "Under the old fig tree, a restored stone cottage with a private pool and thick cool walls.",
      it: "Sotto il vecchio fico, una casa in pietra restaurata con piscina privata e mura spesse e fresche.",
    },
    card: "/images/villas/fico/dsc9799medium.jpg",
    hero: "/images/villas/fico/dsc9816medium.jpg",
    gallery: g("fico", [
      "dsc9762medium.jpg",
      "dsc9799medium.jpg",
      "dsc9809medium.jpg",
      "dsc9816medium.jpg",
      "dsc9822medium.jpg",
      "dsc9827medium.jpg",
      "dsc9848medium.jpg",
      "fico-201jpg.jpg",
      "fico-202jpg.jpg",
      "fico-203jpg.jpg",
      "fico-204jpg.jpg",
      "fico-207jpg.jpg",
      "fico-211jpg.jpg",
      "fico03medium.jpg",
      "fico07medium.jpg",
      "fico13medium.jpg",
    ]),
  },
  {
    slug: "frantoio",
    name: "Frantoio",
    themeKey: "oilMill",
    blurb: {
      en: "The old olive mill, reborn as a cottage where the press once worked. Private pool, deep shade.",
      it: "L'antico frantoio, rinato come casa dove un tempo lavorava il torchio. Piscina privata, ombra fitta.",
    },
    card: "/images/villas/frantoio/20230617-133310.jpg",
    hero: "/images/villas/frantoio/20230617-133322.jpg",
    gallery: g("frantoio", [
      "20230617-133310.jpg",
      "20230617-133322.jpg",
      "20230617-133449.jpg",
      "20230617-133500.jpg",
      "20230617-133515.jpg",
      "20230617-133523.jpg",
      "20230617-133534.jpg",
      "20230617-133549.jpg",
      "20171010-170948-r.jpg",
      "20171010-171112-r.jpg",
      "20171010-171155-r.jpg",
      "frant2.jpg",
      "frant9.jpg",
      "frant13.jpg",
      "frant17.jpg",
      "dscn1649.jpg",
    ]),
  },
  {
    slug: "nerino",
    name: "Nerino",
    themeKey: "house",
    blurb: {
      en: "The largest of the houses, with generous rooms, a private pool and space for a whole family.",
      it: "La piu' grande delle case, con stanze ampie, piscina privata e spazio per tutta la famiglia.",
    },
    card: "/images/villas/nerino/piscina1.jpg",
    hero: "/images/villas/nerino/piscina.jpg",
    gallery: g("nerino", [
      "piscina.jpg",
      "piscina1.jpg",
      "img-1514.jpg",
      "img-1530.jpg",
      "img-1544.jpg",
      "img-1548.jpg",
      "img-1559.jpg",
      "img-1565.jpg",
      "img-1570.jpg",
      "img-1574.jpg",
      "img-1587.jpg",
      "img-1593.jpg",
      "img-1600.jpg",
      "img-1608.jpg",
      "img-1613.jpg",
      "img-1622.jpg",
      "img-1626.jpg",
      "img-1635.jpg",
      "img-1642.jpg",
    ]),
  },
];

export const villaBySlug = (slug: string) =>
  villas.find((v) => v.slug === slug);

export const villaBlurb = (v: Villa, locale: Locale) =>
  v.blurb[locale] ?? v.blurb.en ?? "";

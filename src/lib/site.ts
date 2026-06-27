// Real business facts, taken from the original lapieve.toscana.it site.
export const site = {
  name: "La Pieve",
  legalName: "Fattoria La Pieve",
  email: "lapieve.toscana@gmail.com",
  phone: "+39 349 2604903",
  phoneHref: "tel:+393492604903",
  fax: "+39 050 938481",
  address: {
    street: "Via della Propositura, 6",
    city: "56011 Calci (PI)",
    region: "Toscana, Italia",
  },
  // Google Maps embed for Via della Propositura 6, Calci (Pisa)
  mapEmbed:
    "https://www.google.com/maps?q=Via%20della%20Propositura%206%2C%2056011%20Calci%20PI%2C%20Italy&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Via+della+Propositura+6,+56011+Calci+PI,+Italy",
} as const;

// Distances to nearby places (km) - from the original "Find us" content.
export const distances: { place: string; km: number }[] = [
  { place: "Pisa", km: 7 },
  { place: "Lucca", km: 25 },
  { place: "Viareggio", km: 25 },
  { place: "Livorno", km: 20 },
  { place: "Firenze", km: 60 },
  { place: "Siena", km: 140 },
];

export const brandConfig = {
  appTitle: "Vía 109",
  tagline: "Aprueba tu examen teórico",
  description: "Domina la teoría vial con métodos interactivos y eficaces.",
  primaryHue: 200,
  primarySaturation: 58,
  primaryLightness: 29,
  logoPath: "/icons/icon-512.png",
  version: "1.0.0",
} as const;

export type BrandConfig = typeof brandConfig;

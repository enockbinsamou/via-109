export interface HorizontalesScreen {
  id: number;
  title: string;
  bullets?: string[];
  text?: string;
  recuerda?: string;
  image: string;
}

export const HORIZONTALES_SCREENS: HorizontalesScreen[] = [
  {
    id: 1,
    title: "Línea continua",
    text: "La línea continua en el centro de la vía:",
    bullets: [
      "Prohíbe adelantar.",
      "Prohíbe cambiar de carril.",
    ],
    recuerda: "No se cruza una línea continua.",
    image: "/illustrations/horizontales/1.png",
  },
  {
    id: 2,
    title: "Línea discontinua",
    text: "La línea discontinua permite adelantar:",
    bullets: [
      "Solo si la vía está libre y es seguro hacerlo.",
    ],
    recuerda: "Adelantar siempre con precaución.",
    image: "/illustrations/horizontales/2.png",
  },
  {
    id: 3,
    title: "Doble línea continua",
    text: "La doble línea continua:",
    bullets: [
      "Prohíbe adelantar en ambos sentidos.",
    ],
    recuerda: "Es una zona de alto riesgo.",
    image: "/illustrations/horizontales/3.png",
  },
  {
    id: 4,
    title: "Paso peatonal",
    text: "Las franjas blancas transversales indican paso peatonal.",
    bullets: [
      "Debes detenerte si un peatón va a cruzar.",
    ],
    recuerda: "El peatón tiene prioridad.",
    image: "/illustrations/horizontales/4.png",
  },
  {
    id: 5,
    title: "Línea de pare",
    text: "La línea blanca transversal antes de una intersección:",
    bullets: [
      "Indica el punto exacto donde debes detenerte.",
    ],
    recuerda: "Detente antes de la línea, no encima.",
    image: "/illustrations/horizontales/5.png",
  },
  {
    id: 6,
    title: "Flechas direccionales",
    text: "Las flechas pintadas en la vía:",
    bullets: [
      "Indican la dirección obligatoria del carril.",
    ],
    recuerda: "Respeta siempre la dirección indicada.",
    image: "/illustrations/horizontales/6.png",
  },
];

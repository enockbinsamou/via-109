export interface PeatonesScreen {
  id: number;
  title: string;
  text?: string;
  bullets?: string[];
  recuerda: string;
  image: string;
}

export const PEATONES_SCREENS: PeatonesScreen[] = [
  {
    id: 1,
    title: "Prioridad del peatón",
    text: "El peatón tiene prioridad en el paso peatonal.",
    bullets: ["Debes detenerte si está cruzando o va a cruzar."],
    recuerda: "El peatón es el usuario más vulnerable.",
    image: "/illustrations/peatones/1.png",
  },
  {
    id: 2,
    title: "Peatón fuera del paso",
    text: "Si el peatón cruza fuera del paso:",
    bullets: ["Debes reducir la velocidad."],
    recuerda: "Siempre anticipa movimientos inesperados.",
    image: "/illustrations/peatones/2.png",
  },
  {
    id: 3,
    title: "Zona escolar",
    text: "En zona escolar:",
    bullets: ["Reduce la velocidad.", "Extrema la precaución."],
    recuerda: "Los niños pueden cruzar sin aviso.",
    image: "/illustrations/peatones/3.png",
  },
  {
    id: 4,
    title: "Paso a nivel sin barrera",
    text: "En un paso a nivel sin barrera:",
    bullets: ["Reduce la velocidad.", "Observa ambos lados antes de cruzar."],
    recuerda: "El tren siempre tiene prioridad.",
    image: "/illustrations/peatones/4.png",
  },
  {
    id: 5,
    title: "Paso a nivel con barrera",
    text: "Si la barrera está baja o en movimiento:",
    bullets: ["Debes detenerte."],
    recuerda: "Nunca intentes cruzar con barrera bajando.",
    image: "/illustrations/peatones/5.png",
  },
  {
    id: 6,
    title: "Peatón en carretera",
    text: "En carretera:",
    bullets: [
      "El peatón debe circular por el borde izquierdo.",
      "El conductor debe extremar precaución.",
    ],
    recuerda: "Comparte la vía con respeto.",
    image: "/illustrations/peatones/6.png",
  },
];

export interface PrioridadScreen {
  id: number;
  title: string;
  text?: string;
  bullets?: string[];
  recuerda: string;
  image: string;
}

export const PRIORIDAD_SCREENS: PrioridadScreen[] = [
  {
    id: 1,
    title: "Prioridad del agente",
    text: "En una intersección:",
    bullets: ["Si hay un agente, su señal tiene prioridad."],
    recuerda: "La señal del agente siempre prevalece.",
    image: "/illustrations/prioridad-intersecciones/1.png",
  },
  {
    id: 2,
    title: "Prioridad del semáforo",
    text: "Si no hay agente:",
    bullets: ["Debes obedecer el semáforo."],
    recuerda: "Rojo: detenerse. Verde: avanzar.",
    image: "/illustrations/prioridad-intersecciones/2.png",
  },
  {
    id: 3,
    title: "Señal de PARE",
    text: "Ante una señal de PARE:",
    bullets: ["Debes detenerte completamente."],
    recuerda: "Detenerse no es reducir velocidad.",
    image: "/illustrations/prioridad-intersecciones/3.png",
  },
  {
    id: 4,
    title: "Ceder el paso",
    text: "Si debes ceder el paso:",
    bullets: ["Deja pasar a los vehículos que ya circulan."],
    recuerda: "La prioridad es para quien ya está en la vía.",
    image: "/illustrations/prioridad-intersecciones/4.png",
  },
  {
    id: 5,
    title: "Intersección sin señales",
    text: "En una intersección sin señales:",
    bullets: ["Tiene prioridad el vehículo que viene por la derecha."],
    recuerda: "Observa siempre ambos lados.",
    image: "/illustrations/prioridad-intersecciones/5.png",
  },
  {
    id: 6,
    title: "Giro a la izquierda",
    text: "Al girar a la izquierda:",
    bullets: ["Debes ceder el paso a los vehículos que vienen de frente."],
    recuerda: "El giro a la izquierda no tiene prioridad.",
    image: "/illustrations/prioridad-intersecciones/6.png",
  },
  {
    id: 7,
    title: "Rotonda",
    text: "En una rotonda:",
    bullets: ["Tiene prioridad quien ya circula dentro."],
    recuerda: "No entres si no es seguro.",
    image: "/illustrations/prioridad-intersecciones/7.png",
  },
];

export interface AgenteScreen {
  id: number;
  title: string;
  bullets?: string[];
  text?: string;
  recuerda?: string;
  image: string;
}

export const AGENTE_SCREENS: AgenteScreen[] = [
  {
    id: 1,
    title: "Atención, Alto",
    text: "Cuando el agente levanta un brazo verticalmente, TODOS los usuarios de la vía deben detenerse inmediatamente.",
    bullets: ["No importa el semáforo ni la señal."],
    recuerda: "La señal del agente siempre tiene prioridad.",
    image: "/illustrations/agente/1.png",
  },
  {
    id: 2,
    title: "Alto (brazos extendidos)",
    text: "Si el agente extiende uno o ambos brazos horizontalmente:",
    bullets: [
      "Los que están de frente o de espalda → SE DETIENEN.",
      "Los que están en el mismo sentido del brazo → PUEDEN CONTINUAR.",
    ],
    recuerda: "Solo continúa quien esté en la dirección del brazo.",
    image: "/illustrations/agente/2.png",
  },
  {
    id: 3,
    title: "Brazo horizontal al frente",
    text: "Cuando el agente extiende un brazo hacia el frente:",
    bullets: [
      "Los vehículos a su izquierda pueden avanzar en cualquier dirección.",
      "Los peatones pueden cruzar por detrás del agente.",
    ],
    recuerda: "Siempre observa la posición del agente antes de avanzar.",
    image: "/illustrations/agente/3.png",
  },
  {
    id: 4,
    title: "Luz roja manual",
    text: "Si el agente mueve una luz roja hacia ti: DEBES DETENERTE inmediatamente.",
    bullets: ["No importa la hora ni la visibilidad."],
    image: "/illustrations/agente/4.png",
  },
  {
    id: 5,
    title: "Silbato",
    bullets: [
      "Toques cortos → DETENERSE.",
      "Toque largo → CONTINUAR.",
    ],
    recuerda: "El silbato es una orden directa.",
    image: "/illustrations/agente/5.png",
  },
  {
    id: 6,
    title: "Detener vehículo específico",
    text: "Si el agente señala un vehículo con el brazo y lo mueve hacia abajo en forma oblicua:",
    bullets: ["Ese vehículo debe detenerse en el borde derecho."],
    image: "/illustrations/agente/6.png",
  },
  {
    id: 7,
    title: "Vehículo policial con sirena",
    text: "Si escuchas sirena o ves luces intermitentes:",
    bullets: [
      "Arrímate al borde derecho.",
      "Detente.",
      "Deja pasar.",
      "Peatón: vuelve a la acera.",
    ],
    image: "/illustrations/agente/7.png",
  },
  {
    id: 8,
    title: "Orden de prioridad",
    text: "Orden de prioridad en la vía:",
    bullets: [
      "1. Señales del agente",
      "2. Señales provisionales",
      "3. Semáforos",
      "4. Señales verticales",
      "5. Señales horizontales",
    ],
    recuerda: "Siempre prevalece la señal del agente.",
    image: "/illustrations/agente/8.png",
  },
];

export interface AccidenteScreen {
  id: number;
  title: string;
  bullets: string[];
  recuerda?: string;
  image: string;
}

export const ACCIDENTE_SCREENS: AccidenteScreen[] = [
  {
    id: 1,
    title: "Avisar a la Policía",
    bullets: [
      "Debes informar inmediatamente a la Policía Nacional Revolucionaria si hay personas muertas o lesionadas.",
      "También debes informar si participa un vehículo estatal.",
      "Si se afecta propiedad estatal o un bien sin presencia del perjudicado.",
    ],
    recuerda: "Informar es obligatorio según la ley.",
    image: "/illustrations/accidente/1.png",
  },
  {
    id: 2,
    title: "No mover el vehículo",
    bullets: [
      "Si el accidente causó muerte o lesión, no debes mover el vehículo.",
      "Debes conservar la posición para preservar evidencias.",
    ],
    recuerda: "Mover el vehículo puede alterar las pruebas.",
    image: "/illustrations/accidente/2.png",
  },
  {
    id: 3,
    title: "Señalizar el lugar",
    bullets: [
      "Debes advertir a los demás usuarios mediante señales.",
      "Intenta restablecer la circulación si es posible.",
      "Sin contradecir la obligación de no mover el vehículo cuando haya lesionados.",
    ],
    recuerda: "Evita nuevos accidentes.",
    image: "/illustrations/accidente/3.png",
  },
  {
    id: 4,
    title: "Permanecer en el lugar",
    bullets: [
      "Debes permanecer en el lugar hasta la llegada de la policía.",
      "Si trasladas a un herido para asistencia médica, debes regresar inmediatamente.",
      "Si no encuentras a la policía al regresar, debes presentarte en la unidad correspondiente.",
    ],
    recuerda: "Abandonar el lugar puede generar responsabilidad legal.",
    image: "/illustrations/accidente/4.png",
  },
];

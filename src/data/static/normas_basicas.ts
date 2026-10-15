export interface NormasBasicasScreen {
  id: number;
  title: string;
  bullets?: string[];
  text?: string;
  recuerda?: string;
  image: string;
}

export const NORMAS_BASICAS_SCREENS: NormasBasicasScreen[] = [
  {
    id: 1,
    title: "Sentido único",
    text: "En una vía de un solo sentido:",
    bullets: [
      "Debes circular respetando la dirección señalizada.",
      "Nunca en sentido contrario.",
    ],
    recuerda: "Circular en contra del sentido es una infracción grave.",
    image: "/illustrations/normas-basicas/1.png",
  },
  {
    id: 2,
    title: "Circular por la derecha",
    text: "En vías de doble sentido:",
    bullets: [
      "Debes circular por el lado derecho del eje central.",
      "Nunca invadir el carril contrario.",
    ],
    recuerda: "Invadir el carril contrario puede causar accidentes frontales.",
    image: "/illustrations/normas-basicas/2.png",
  },
  {
    id: 3,
    title: "Uso del carril izquierdo",
    text: "En vías con dos o más carriles en el mismo sentido:",
    bullets: [
      "El carril izquierdo es para circular a la velocidad máxima autorizada.",
      "Excepto si vas a girar a la izquierda.",
    ],
    recuerda: "No uses el carril izquierdo si vas lento.",
    image: "/illustrations/normas-basicas/3.png",
  },
  {
    id: 4,
    title: "Límites de velocidad",
    text: "Nunca debes exceder los límites de velocidad establecidos para la vía.",
    bullets: ["Respeta siempre la señal de velocidad."],
    recuerda: "La velocidad excesiva es causa frecuente de accidentes.",
    image: "/illustrations/normas-basicas/4.png",
  },
  {
    id: 5,
    title: "Marcha lenta",
    text: "En vías de tres o más carriles en el mismo sentido:",
    bullets: ["Si circulas a marcha lenta, debes usar el carril derecho."],
    recuerda: "El carril izquierdo no es para vehículos lentos.",
    image: "/illustrations/normas-basicas/5.png",
  },
  {
    id: 6,
    title: "Carril central en doble sentido",
    text: "En vías de tres carriles con doble sentido:",
    bullets: [
      "Los carriles extremos son para circular.",
      "El carril central es solo para adelantar.",
    ],
    recuerda: "El carril central no es para circular permanentemente.",
    image: "/illustrations/normas-basicas/6.png",
  },
];

export interface Signal {
  id: string;
  title: string;
  meaning: string;
  description: string;
  category: string;
  image: string;
}

export interface Question {
  id: number;
  signalId: string;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizSession {
  mode: "category" | "random" | "focused";
  category?: string;
  signalId?: string;
  questionIds: number[];
}

export interface AnswerRecord {
  questionIndex: number;
  signalId: string;
  question: string;
  selectedIndex: number;
  correctIndex: number;
  choices: string[];
  explanation: string;
  signalImage: string;
}

export interface QuizResult {
  date: string;
  score: number;
  total: number;
  mode: string;
  category?: string;
  timeSpentSeconds?: number;
  answers: AnswerRecord[];
}

export interface ExamResult {
  date: string;
  score: number;
  total: number;
  passed: boolean;
  answers: AnswerRecord[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  signalCount?: number;
  icon?: string;
  iconColor?: string;
  iconBg?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "peligro",
    name: "Peligro / Precaución",
    description: "Señales de advertencia de peligro y precaución en la vía.",
  },
  {
    id: "prioridad",
    name: "Prioridad",
    description: "Señales que regulan la prioridad de paso en la vía.",
  },
  {
    id: "prohibicion",
    name: "Prohibición",
    description: "Señales que indican restricciones y prohibiciones en la vía.",
  },
  {
    id: "obligacion",
    name: "Obligación",
    description: "Señales que indican obligaciones para los conductores.",
  },
  {
    id: "fin",
    name: "Fin de prohibición u obligación",
    description: "Señales que indican el final de una prohibición u obligación.",
  },
  {
    id: "informacion",
    name: "Información",
    description: "Señales que proporcionan información útil al conductor.",
  },
  {
    id: "orientacion",
    name: "Orientación",
    description: "Señales que orientan sobre destinos, rutas y direcciones.",
  },
  {
    id: "elementos",
    name: "Elementos complementarios de señalización vial",
    description: "Elementos físicos y dispositivos complementarios de señalización.",
  },
];

export const NORMAS_CATEGORIES: Category[] = [
  {
    id: "agente",
    name: "Señales y órdenes del agente",
    description: "Señales manuales del agente y comunicación del conductor.",
  },
  {
    id: "prioridad-intersecciones",
    name: "Prioridad y comportamiento en intersecciones",
    description: "Reglas de prioridad y conducta en cruces e intersecciones.",
  },
  {
    id: "normas-basicas",
    name: "Normas generales de circulación",
    description: "Reglas básicas para circular correctamente en la vía.",
  },
  {
    id: "peatones",
    name: "Peatones y pasos a nivel",
    description: "Normas sobre peatones y comportamiento en pasos ferroviarios.",
  },
  {
    id: "accidente",
    name: "En caso de accidente",
    description: "Procedimientos y obligaciones ante un accidente de tránsito.",
  },
  {
    id: "horizontales",
    name: "Señales horizontales",
    description: "Marcas viales y señalización pintada en la vía.",
  },
];
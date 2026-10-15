import signalsPeligro from "./static/signals_peligro.json";
import signalsPrioridad from "./static/signals_prioridad.json";
import signalsProhibicion from "./static/signals_prohibicion.json";
import signalsObligacion from "./static/signals_obligacion.json";
import signalsInformacion from "./static/signals_informacion.json";
import signalsOrientacion from "./static/signals_orientacion.json";
import signalsElementos from "./static/signals_elementos.json";
import signalsFin from "./static/signals_fin.json";
import questionsPeligro from "./static/questions_peligro.json";
import questionsInformacion from "./static/questions_informacion.json";
import questionsPrioridad from "./static/questions_prioridad.json";
import questionsObligacion from "./static/questions_obligacion.json";
import questionsFin from "./static/questions_fin.json";
import questionsElementos from "./static/questions_elementos.json";
import questionsOrientacion from "./static/questions_orientacion.json";

const SIGNALS_MAP: Record<string, any[]> = {
  peligro: signalsPeligro,
  prioridad: signalsPrioridad,
  prohibicion: signalsProhibicion,
  obligacion: signalsObligacion,
  informacion: signalsInformacion,
  orientacion: signalsOrientacion,
  elementos: signalsElementos,
  fin: signalsFin,
};

const QUESTIONS_MAP: Record<string, any[]> = {
  peligro: questionsPeligro,
  informacion: questionsInformacion,
  prioridad: questionsPrioridad,
  obligacion: questionsObligacion,
  fin: questionsFin,
  elementos: questionsElementos,
  orientacion: questionsOrientacion,
};

export function loadSignals(category: string) {
  const raw = SIGNALS_MAP[category] || [];
  return raw.map((r: any) => ({
    id: r.id,
    title: r.title_es ?? r.title ?? "",
    meaning: r.meaning_es ?? r.meaning ?? "",
    description: r.description_es ?? r.description ?? "",
    category: r.category ?? category,
    image: r.image ?? "",
  }));
}

export function loadQuestions(category: string) {
  return QUESTIONS_MAP[category] || [];
}

export function generateQuestionsFromSignals(signals: any[]) {
  if (signals.length < 4) return [];
  return signals.map((signal, idx) => {
    const others = signals.filter((_, i) => i !== idx);
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    const distractors = shuffled.slice(0, 3).map((s) => s.meaning);
    const choices = [...distractors];
    const correctIndex = Math.floor(Math.random() * 4);
    choices.splice(correctIndex, 0, signal.meaning);
    return {
      id: 10000 + idx,
      signalId: signal.id,
      question: "¿Qué significa esta señal?",
      choices,
      correctIndex,
      explanation: signal.description || signal.meaning,
    };
  });
}

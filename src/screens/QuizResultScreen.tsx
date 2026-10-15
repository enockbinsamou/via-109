import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { ScoreSummary } from "@/components/ScoreSummary";
import { Button } from "@/components/ui/button";
import { getQuizResults } from "@/utils/storage";
import { CheckCircle, XCircle, Clock, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export default function QuizResultScreen() {
  const navigate = useNavigate();
  const results = getQuizResults();
  const last = results[results.length - 1];

  if (!last) {
    navigate("/quiz", { replace: true });
    return null;
  }

  const mistakes = last.answers.filter((a) => a.selectedIndex !== a.correctIndex);
  const correct = last.score;
  const incorrect = last.total - last.score;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Resultado" showBack />
      <main className="flex-1 p-4">
        <motion.div
          className="mx-auto flex max-w-md flex-col gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ScoreSummary score={last.score} total={last.total} label="Quiz completado" />

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center gap-1 rounded-2xl bg-card p-3 shadow-sm">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-lg font-bold">{correct}</span>
              <span className="text-xs text-muted-foreground">Correctas</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-2xl bg-card p-3 shadow-sm">
              <XCircle className="h-5 w-5 text-destructive" />
              <span className="text-lg font-bold">{incorrect}</span>
              <span className="text-xs text-muted-foreground">Incorrectas</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-2xl bg-card p-3 shadow-sm">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg font-bold">
                {last.timeSpentSeconds ? formatTime(last.timeSpentSeconds) : "—"}
              </span>
              <span className="text-xs text-muted-foreground">Tiempo</span>
            </div>
          </div>

          {mistakes.length > 0 ? (
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Preguntas falladas ({mistakes.length})
              </h3>
              {mistakes.map((m, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-sm">
                  <img src={m.signalImage} alt="" className="h-10 w-10 rounded-lg object-contain" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{m.question}</p>
                    <p className="text-destructive">Tu respuesta: {m.choices[m.selectedIndex]}</p>
                    <p className="text-success">Correcta: {m.choices[m.correctIndex]}</p>
                    <button
                      onClick={() => navigate(`/signal/${m.signalId}`)}
                      className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline press-scale"
                    >
                      <BookOpen className="h-3 w-3" />
                      Ver lección relacionada
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              ¡Sin errores! Excelente trabajo.
            </p>
          )}

          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate("/quiz")} variant="outline" className="h-12 rounded-xl press-scale">
              Rehacer
            </Button>
            <Button onClick={() => navigate("/")} variant="secondary" className="h-12 rounded-xl press-scale">
              Volver al inicio
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

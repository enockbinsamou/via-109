import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Layers, Shuffle, Play } from "lucide-react";
import { saveQuizSession, getActiveQuizProgress, clearActiveQuizProgress } from "@/utils/storage";
import { CATEGORIES } from "@/data/types";
import { loadQuestions, generateQuestionsFromSignals, loadSignals } from "@/data/loader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";

const categoriesWithQuestions = CATEGORIES.filter((cat) => {
  const dedicated = loadQuestions(cat.id);
  const signals = loadSignals(cat.id);
  return dedicated.length > 0 || signals.length >= 4;
});

export default function QuizModeScreen() {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  const activeProgress = getActiveQuizProgress();
  const hasResumable = activeProgress && activeProgress.answers.length > 0 && activeProgress.answers.length < 10;

  const resumeCategoryName = hasResumable
    ? CATEGORIES.find((c) => c.id === activeProgress.category)?.name || activeProgress.category
    : "";

  const startCategoryQuiz = (categoryId: string) => {
    clearActiveQuizProgress();
    saveQuizSession({ mode: "category", category: categoryId, questionIds: [] });
    navigate("/quiz/run");
  };

  const startRandomQuiz = () => {
    clearActiveQuizProgress();
    saveQuizSession({ mode: "random", questionIds: [] });
    navigate("/quiz/run");
  };

  const handleResume = () => {
    if (!activeProgress) return;
    saveQuizSession({ mode: "category", category: activeProgress.category, questionIds: [] });
    navigate("/quiz/run");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Quiz" showBack />
      <main className="flex-1 p-4">
        <div className="mx-auto grid max-w-md grid-cols-1 gap-3">
          {/* Resume card */}
          {hasResumable && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 shadow-sm">
              <p className="text-sm font-semibold">Reanudar último quiz</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Categoría: {resumeCategoryName}
              </p>
              <p className="text-xs text-muted-foreground">
                Pregunta actual: {activeProgress.currentQuestionIndex + 1}
              </p>
              <Button
                size="sm"
                className="mt-3 w-full gap-2"
                onClick={handleResume}
              >
                <Play className="h-4 w-4" />
                Continuar
              </Button>
            </div>
          )}

          {!showCategories ? (
            <>
              <button
                onClick={() => setShowCategories(true)}
                className="flex items-center gap-4 rounded-lg border bg-card p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Por categoría</p>
                  <p className="text-sm text-muted-foreground">Elige una categoría de señales</p>
                </div>
              </button>
              <button
                onClick={startRandomQuiz}
                className="flex items-center gap-4 rounded-lg border bg-card p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Shuffle className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Aleatorio</p>
                  <p className="text-sm text-muted-foreground">Mezcla de todas las señales</p>
                </div>
              </button>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-muted-foreground mb-1">Selecciona una categoría:</p>
              {categoriesWithQuestions.map((cat) => {
                const qCount = loadQuestions(cat.id).length;
                const sCount = loadSignals(cat.id).length;
                const total = qCount > 0 ? qCount : sCount;
                return (
                  <button
                    key={cat.id}
                    onClick={() => startCategoryQuiz(cat.id)}
                    className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="font-medium text-sm">{cat.name}</span>
                    <span className="text-xs text-muted-foreground">{total} preguntas</span>
                  </button>
                );
              })}
              <button
                onClick={() => setShowCategories(false)}
                className="text-sm text-primary underline mt-2"
              >
                ← Volver
              </button>
            </>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { QuizQuestion } from "@/components/QuizQuestion";
import { ChoiceButton } from "@/components/ChoiceButton";
import { Button } from "@/components/ui/button";
import { loadSignals, loadQuestions, generateQuestionsFromSignals } from "@/data/loader";
import { getExamTimerEnabled, saveExamResult, clearQuizSession } from "@/utils/storage";
import { shuffle } from "@/utils/shuffle";
import type { Question, AnswerRecord } from "@/data/types";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

const EXAM_SIZE = 30;
const EXAM_DURATION_SEC = 30 * 60;

function initExam() {
  const sigs = loadSignals("peligro");
  let qs: Question[] = loadQuestions("peligro");
  if (qs.length === 0) qs = generateQuestionsFromSignals(sigs);
  qs = shuffle(qs).slice(0, EXAM_SIZE);
  return { questions: qs, signals: sigs, initialSelected: new Array(qs.length).fill(null) as (number | null)[] };
}

export default function ExamRunScreen() {
  const navigate = useNavigate();
  const [{ questions, signals, initialSelected }] = useState(initExam);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<(number | null)[]>(initialSelected);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SEC);
  const timerEnabled = getExamTimerEnabled();

  useEffect(() => {
    if (!timerEnabled) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerEnabled]);

  useEffect(() => {
    if (timerEnabled && timeLeft === 0 && questions.length > 0) {
      finishExam();
    }
  }, [timeLeft]);

  const finishExam = useCallback(() => {
    const answers: AnswerRecord[] = questions.map((q, i) => {
      const sig = signals.find((s) => s.id === q.signalId);
      return {
        questionIndex: i,
        signalId: q.signalId,
        question: q.question,
        selectedIndex: selected[i] ?? -1,
        correctIndex: q.correctIndex,
        choices: q.choices,
        explanation: q.explanation,
        signalImage: sig?.image || "",
      };
    });
    const score = answers.filter((a) => a.selectedIndex === a.correctIndex).length;
    saveExamResult({
      date: new Date().toISOString(),
      score,
      total: questions.length,
      passed: score / questions.length >= 0.7,
      answers,
    });
    clearQuizSession();
    navigate("/exam/result", { replace: true });
  }, [questions, signals, selected, navigate]);

  const handleSelect = (idx: number) => {
    setSelected((prev) => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
  };

  const q = questions[current];
  const signal = signals.find((s) => s.id === q?.signalId);
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar
        title="Examen Teórico"
        showClose
        onClose={() => navigate("/exam")}
        rightContent={
          timerEnabled ? (
            <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold text-foreground">
              <Clock className="h-4 w-4" />
              {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </div>
          ) : undefined
        }
      />
      <div className="border-b bg-card px-4 py-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Pregunta {current + 1} de {questions.length}
        </p>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <main className="flex-1 p-4 pb-28">
        <div className="mx-auto max-w-md">
          <QuizQuestion
            image={signal?.image || ""}
            questionText={q.question}
          >
            {q.choices.map((choice, i) => (
              <ChoiceButton
                key={i}
                label={choice}
                index={i}
                state={selected[current] === i ? "selected" : "idle"}
                disabled={false}
                onClick={() => handleSelect(i)}
              />
            ))}
          </QuizQuestion>
        </div>
      </main>

      {/* Fixed bottom navigation */}
      <div className="sticky bottom-0 border-t bg-card/95 backdrop-blur-sm p-4">
        <div className="mx-auto max-w-md flex flex-col gap-2">
          <div className="flex gap-3">
            <Button
              variant="outline"
              disabled={current === 0}
              onClick={() => setCurrent((c) => c - 1)}
              className="flex-1 h-12 rounded-xl font-semibold press-scale"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Anterior
            </Button>
            {current + 1 >= questions.length ? (
              <Button
                onClick={finishExam}
                className="flex-1 h-12 rounded-xl bg-primary font-semibold press-scale"
              >
                Siguiente
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setCurrent((c) => c + 1)}
                className="flex-1 h-12 rounded-xl bg-primary font-semibold press-scale"
              >
                Siguiente
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
          <button
            onClick={finishExam}
            className="text-center text-sm font-semibold text-accent press-scale"
          >
            Finalizar Examen
          </button>
        </div>
      </div>
    </div>
  );
}

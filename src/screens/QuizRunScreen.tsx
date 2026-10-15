import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { QuizQuestion } from "@/components/QuizQuestion";
import { ChoiceButton } from "@/components/ChoiceButton";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { loadSignals, loadQuestions, generateQuestionsFromSignals } from "@/data/loader";
import {
  getQuizSession,
  clearQuizSession,
  saveQuizResult,
  getActiveQuizProgress,
  saveActiveQuizProgress,
  clearActiveQuizProgress,
} from "@/utils/storage";
import { shuffle } from "@/utils/shuffle";
import { CATEGORIES } from "@/data/types";
import type { Question, AnswerRecord } from "@/data/types";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QUIZ_SIZE = 10;

function initQuiz() {
  const session = getQuizSession();
  const cat = session?.category || "peligro";
  const sigs = loadSignals(cat);

  let qs: Question[] = loadQuestions(cat);
  if (qs.length === 0) {
    qs = generateQuestionsFromSignals(sigs);
  }

  if (session?.mode === "focused" && session.signalId != null) {
    let focused = qs.filter((q) => q.signalId === session.signalId);
    if (focused.length === 0) {
      focused = generateQuestionsFromSignals(sigs).filter(
        (q) => q.signalId === session.signalId
      );
    }
    if (focused.length > 0) qs = focused;
  }

  const progress = getActiveQuizProgress();
  if (progress && progress.category === cat && progress.answers.length < QUIZ_SIZE) {
    // start fresh
  }

  qs = shuffle(qs).slice(0, QUIZ_SIZE);
  return { questions: qs, signals: sigs, category: cat };
}

export default function QuizRunScreen() {
  const navigate = useNavigate();
  const [{ questions, signals, category }] = useState(initQuiz);

  const progress = getActiveQuizProgress();
  const resumeIndex = progress?.category === category ? progress.currentQuestionIndex : 0;
  const resumeAnswers = progress?.category === category ? progress.answers : [];
  const resumeStartedAt = progress?.category === category ? progress.startedAt : Date.now();

  const [current, setCurrent] = useState(resumeIndex);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>(resumeAnswers);
  const startedAt = useRef(resumeStartedAt);

  const categoryInfo = CATEGORIES.find((c) => c.id === category);

  if (!progress || progress.category !== category) {
    saveActiveQuizProgress({
      category,
      currentQuestionIndex: 0,
      answers: [],
      startedAt: startedAt.current,
    });
  }

  const q = questions[current];
  const signal = signals.find((s) => s.id === q?.signalId);

  const handleSelect = useCallback(
    (idx: number) => {
      if (selected !== null) return;
      setSelected(idx);
      const newAnswer: AnswerRecord = {
        questionIndex: current,
        signalId: q.signalId,
        question: q.question,
        selectedIndex: idx,
        correctIndex: q.correctIndex,
        choices: q.choices,
        explanation: q.explanation,
        signalImage: signal?.image || "",
      };
      const updatedAnswers = [...answers, newAnswer];
      setAnswers(updatedAnswers);
      saveActiveQuizProgress({
        category,
        currentQuestionIndex: current,
        answers: updatedAnswers,
        startedAt: startedAt.current,
      });
    },
    [selected, current, q, signal, answers, category]
  );

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      const score = answers.filter((a) => a.selectedIndex === a.correctIndex).length;
      const session = getQuizSession();
      const timeSpent = Math.round((Date.now() - startedAt.current) / 1000);
      saveQuizResult({
        date: new Date().toISOString(),
        score,
        total: questions.length,
        mode: session?.mode || "random",
        category,
        timeSpentSeconds: timeSpent,
        answers,
      });
      clearQuizSession();
      clearActiveQuizProgress();
      navigate("/quiz/result", { replace: true });
    } else {
      const nextIdx = current + 1;
      setCurrent(nextIdx);
      setSelected(null);
      saveActiveQuizProgress({
        category,
        currentQuestionIndex: nextIdx,
        answers,
        startedAt: startedAt.current,
      });
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <TopBar title="Quiz" showClose />
        <main className="flex-1 p-4"><EmptyState title="No hay preguntas disponibles" /></main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar
        title={`Pregunta ${current + 1} de ${questions.length}`}
        showClose
        showFlag
      />
      <main className="flex-1 p-4 pb-24">
        <div className="mx-auto max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <QuizQuestion
                image={signal?.image || ""}
                questionText={q.question}
                progress={{ current, total: questions.length }}
                categoryLabel={categoryInfo?.name}
              >
                {q.choices.map((choice, i) => (
                  <ChoiceButton
                    key={i}
                    label={choice}
                    index={i}
                    state={
                      selected === null
                        ? "idle"
                        : i === q.correctIndex
                        ? "correct"
                        : i === selected
                        ? "incorrect"
                        : "idle"
                    }
                    disabled={selected !== null}
                    onClick={() => handleSelect(i)}
                    explanation={
                      i === selected && selected !== q.correctIndex
                        ? q.explanation
                        : undefined
                    }
                  />
                ))}
              </QuizQuestion>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Fixed bottom button */}
      {selected !== null && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky bottom-0 border-t bg-card/95 backdrop-blur-sm p-4"
        >
          <div className="mx-auto max-w-md">
            <Button onClick={handleNext} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-base press-scale">
              {current + 1 >= questions.length ? "Ver resultados" : "Siguiente"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

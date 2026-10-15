import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import {
  getViewedSignals,
  getQuizResults,
  getExamResults,
  getQuizStats,
  getStudyStreak,
} from "@/utils/storage";
import { loadSignals } from "@/data/loader";
import { CATEGORIES } from "@/data/types";
import { Flame, Play } from "lucide-react";
import { motion } from "framer-motion";

const section = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const DAYS = ["L", "M", "M", "J", "V", "S", "D"];

function CircularProgress({
  percentage,
  size = 160,
  strokeWidth = 12,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-foreground">{percentage}%</span>
        <span className="text-sm text-muted-foreground">Listo</span>
      </div>
    </div>
  );
}

function CategoryBar({ name, percentage }: { name: string; percentage: number }) {
  const barColor =
    percentage >= 75
      ? "bg-primary"
      : percentage >= 50
      ? "bg-primary"
      : "bg-accent";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className={`text-sm font-bold ${percentage < 50 ? "text-accent" : "text-primary"}`}>
          {percentage}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function ProgressScreen() {
  const navigate = useNavigate();
  const allSignals = CATEGORIES.reduce(
    (acc, cat) => acc + loadSignals(cat.id).length,
    0
  );
  const viewed = getViewedSignals();
  const quizResults = getQuizResults();
  const examResults = getExamResults();
  const quizStats = getQuizStats();
  const streak = getStudyStreak();

  const signalPct = allSignals ? Math.round((viewed.length / allSignals) * 100) : 0;
  const quizAvgPct = quizStats.averageScore || 0;

  // Combine both into an overall readiness score
  const overallPct = Math.round((signalPct + quizAvgPct) / 2);

  const motivationalText =
    overallPct >= 80
      ? "¡Estás casi listo! Solo unos pocos temas más."
      : overallPct >= 50
      ? "¡Estás cerca! Completa los tests restantes para llegar al 100%."
      : "¡Buen comienzo! Sigue estudiando para dominar todos los temas.";

  const categoryProgress = CATEGORIES.map((cat) => {
    const best = quizStats.bestScoreByCategory[cat.id] ?? 0;
    return { id: cat.id, name: cat.name, best };
  }).filter((c) => c.best > 0);

  // Get current day of week (0=Sunday, 1=Monday, etc.), map to LMMJVSD
  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1; // Convert to Monday=0

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Mi Progreso" showBack />
      <main className="flex-1 p-4 pb-20">
        <motion.div
          className="mx-auto flex max-w-md flex-col gap-4"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Exam readiness circular */}
          <motion.div
            variants={section}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-card p-6 shadow-sm"
          >
            <h3 className="mb-4 text-center text-base font-bold">
              Preparación para el Examen
            </h3>
            <div className="flex justify-center">
              <CircularProgress percentage={overallPct} />
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {motivationalText}
            </p>
          </motion.div>

          {/* Study streak */}
          <motion.div
            variants={section}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-card p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <Flame className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-base font-bold leading-tight">Racha de Estudio</h3>
                <p className="text-sm text-muted-foreground">
                  ¡{streak.currentStreak} día{streak.currentStreak !== 1 ? "s" : ""} seguido{streak.currentStreak !== 1 ? "s" : ""}!
                </p>
              </div>
            </div>
            <div className="flex justify-between gap-1">
              {DAYS.map((day, i) => (
                <div
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                    i <= todayIdx && streak.currentStreak > todayIdx - i
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category mastery */}
          <motion.div
            variants={section}
            transition={{ duration: 0.4 }}
          >
            <h3 className="mb-3 text-lg font-bold">
              Dominio por Categorías
            </h3>
            <div className="rounded-2xl bg-card p-5 shadow-sm flex flex-col gap-4">
              {categoryProgress.length > 0 ? (
                categoryProgress.map((cat) => (
                  <CategoryBar
                    key={cat.id}
                    name={cat.name}
                    percentage={cat.best}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Completa quizzes para ver tu progreso por categoría.
                </p>
              )}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={section} transition={{ duration: 0.4 }}>
            <Button
              onClick={() => navigate("/learn")}
              className="w-full h-14 rounded-2xl bg-accent text-accent-foreground font-bold text-base shadow-md press-scale hover:bg-accent/90"
            >
              <Play className="mr-2 h-5 w-5" />
              Continuar Estudiando
            </Button>
          </motion.div>
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
}

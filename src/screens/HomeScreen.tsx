import { useNavigate } from "react-router-dom";
import { PrimaryNavCard } from "@/components/PrimaryNavCard";
import { BottomNav } from "@/components/BottomNav";
import { brandConfig } from "@/config/brandConfig";
import { BookOpen, HelpCircle, ClipboardCheck, BarChart3, Play, Clock, Settings } from "lucide-react";
import { getActiveQuizProgress, getQuizSession } from "@/utils/storage";
import { CATEGORIES } from "@/data/types";
import { motion } from "framer-motion";

export default function HomeScreen() {
  const navigate = useNavigate();
  const activeProgress = getActiveQuizProgress();
  const session = getQuizSession();

  const resumeCategory = activeProgress
    ? CATEGORIES.find((c) => c.id === activeProgress.category)
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 px-5 pb-14 pt-12 text-primary-foreground">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground text-primary font-bold text-lg">
              V
            </div>
            <span className="text-lg font-bold">{brandConfig.appTitle}</span>
          </div>
          <button
            onClick={() => navigate("/settings")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 press-scale"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold leading-tight">{brandConfig.tagline}</h1>
          <p className="mt-2 text-sm opacity-85">{brandConfig.description}</p>
        </motion.div>
      </div>

      <main className="relative z-10 flex-1 px-4 -mt-10">
        <div className="mx-auto max-w-md flex flex-col gap-4">
          {/* Continue where you left off */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => navigate(resumeCategory ? "/quiz/run" : "/learn")}
            className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-lg press-scale text-left"
          >
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wide text-accent">
                {resumeCategory ? "Continuar donde lo dejaste" : "Comienza tu primera lección"}
              </p>
              <p className="mt-1 text-base font-semibold text-card-foreground">
                {resumeCategory ? resumeCategory.name : "Explora las categorías"}
              </p>
              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>
                  {activeProgress
                    ? `${activeProgress.answers.length} de 10 preguntas`
                    : "¡Empieza ahora!"}
                </span>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Play className="h-5 w-5 ml-0.5" />
            </div>
          </motion.button>

          {/* What do you want to do today? */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="mb-3 text-lg font-bold text-foreground">
              ¿Qué deseas hacer hoy?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <PrimaryNavCard
                icon={BookOpen}
                label="Aprender"
                to="/learn"
                description="Estudia las señales"
                color="primary"
              />
              <PrimaryNavCard
                icon={HelpCircle}
                label="Quiz"
                to="/quiz"
                description="Practica preguntas"
                color="accent"
              />
              <PrimaryNavCard
                icon={ClipboardCheck}
                label="Examen"
                to="/exam"
                description="Simula el examen"
                color="warning"
              />
              <PrimaryNavCard
                icon={BarChart3}
                label="Progreso"
                to="/progress"
                description="Tu avance general"
                color="success"
              />
            </div>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

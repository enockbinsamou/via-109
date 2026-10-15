import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { brandConfig } from "@/config/brandConfig";
import { getQuizStats, getStudyStreak } from "@/utils/storage";
import { Flame, Trophy, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const section = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function ProfileScreen() {
  const navigate = useNavigate();
  const stats = getQuizStats();
  const streak = getStudyStreak();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Perfil" />
      <main className="flex-1 p-4 pb-20">
        <motion.div
          className="mx-auto flex max-w-md flex-col gap-5"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          {/* App identity */}
          <motion.div
            variants={section}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center rounded-2xl bg-card p-6 shadow-sm text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-3">
              V
            </div>
            <h2 className="text-xl font-bold">{brandConfig.appTitle}</h2>
            <p className="text-sm text-muted-foreground mt-1">{brandConfig.tagline}</p>
            <p className="text-xs text-muted-foreground/70 mt-2 max-w-xs">
              Plataforma de estudio para la licencia de conducción en Cuba.
            </p>
          </motion.div>

          {/* Progress summary */}
          <motion.div
            variants={section}
            transition={{ duration: 0.35 }}
            className="rounded-2xl bg-card p-5 shadow-sm"
          >
            <h3 className="text-base font-bold mb-4">Progreso actual</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
                <Trophy className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-lg font-bold">{stats.totalQuizzes}</p>
                  <p className="text-xs text-muted-foreground">Quizzes hechos</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
                <Flame className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-lg font-bold">{streak.currentStreak}</p>
                  <p className="text-xs text-muted-foreground">Días de racha</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => navigate("/progress")}
              className="mt-4 w-full rounded-xl"
            >
              Ver mi progreso
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
}

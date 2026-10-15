import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { getMistakes, getFavoriteQuestions, getBookmarkedLessons } from "@/utils/storage";
import { AlertTriangle, Heart, BookMarked } from "lucide-react";
import { motion } from "framer-motion";

const section = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function GuardadosScreen() {
  const navigate = useNavigate();
  const mistakes = getMistakes();
  const favorites = getFavoriteQuestions();
  const bookmarks = getBookmarkedLessons();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Guardados" />
      <main className="flex-1 p-4 pb-20">
        <motion.div
          className="mx-auto flex max-w-md flex-col gap-6"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Preguntas con error */}
          <motion.section variants={section} transition={{ duration: 0.35 }}>
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <h2 className="text-base font-bold">Preguntas con error</h2>
            </div>
            {mistakes.length === 0 ? (
              <EmptyState title="Sin errores aún" description="Tus errores en quizzes aparecerán aquí." />
            ) : (
              <div className="flex flex-col gap-2">
                {mistakes.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border bg-card p-3 shadow-sm">
                    <img src={m.signalImage} alt="" className="h-10 w-10 rounded object-contain" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{m.question}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{m.signalId}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="shrink-0 text-xs"
                      onClick={() => navigate(`/signal/${m.signalId}`)}
                    >
                      Practicar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Favoritos */}
          <motion.section variants={section} transition={{ duration: 0.35 }}>
            <div className="mb-2 flex items-center gap-2">
              <Heart className="h-4 w-4 text-destructive" />
              <h2 className="text-base font-bold">Favoritos</h2>
            </div>
            {favorites.length === 0 ? (
              <EmptyState title="Sin favoritos" description="Marca preguntas como favoritas para verlas aquí." />
            ) : (
              <div className="flex flex-col gap-2">
                {favorites.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border bg-card p-3 shadow-sm">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{f.question}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{f.category}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="shrink-0 text-xs"
                      onClick={() => navigate(`/signal/${f.signalId}`)}
                    >
                      Abrir
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Lecciones guardadas */}
          <motion.section variants={section} transition={{ duration: 0.35 }}>
            <div className="mb-2 flex items-center gap-2">
              <BookMarked className="h-4 w-4 text-primary" />
              <h2 className="text-base font-bold">Lecciones guardadas</h2>
            </div>
            {bookmarks.length === 0 ? (
              <EmptyState title="Sin lecciones guardadas" description="Guarda lecciones para revisarlas después." />
            ) : (
              <div className="flex flex-col gap-2">
                {bookmarks.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-sm">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{b.title}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="shrink-0 text-xs"
                      onClick={() => navigate(b.route)}
                    >
                      Continuar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
}

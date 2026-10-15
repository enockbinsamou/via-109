import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { PagerControls } from "@/components/PagerControls";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertTriangle } from "lucide-react";
import { NORMAS_BASICAS_SCREENS } from "@/data/static/normas_basicas";
import { BottomNav } from "@/components/BottomNav";

export default function LearnNormasBasicasScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const screen = NORMAS_BASICAS_SCREENS[currentIndex];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Normas generales de circulación" showBack />
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="mx-auto flex max-w-md flex-col gap-6">
          {/* Illustration */}
          <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <AspectRatio ratio={4 / 3}>
              <img
                src={screen.image}
                alt={screen.title}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-foreground">{screen.title}</h2>

          {/* Text */}
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground/90">
            {screen.text && <p>{screen.text}</p>}
            {screen.bullets && screen.bullets.length > 0 && (
              <ul className="flex flex-col gap-2 pl-1">
                {screen.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-0.5 text-primary">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recuerda box */}
          {screen.recuerda && (
            <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
              <div>
                <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                  Recuerda
                </p>
                <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                  {screen.recuerda}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-16 border-t bg-background p-4">
        <div className="mx-auto max-w-md">
          <PagerControls
            onPrev={() => setCurrentIndex((i) => i - 1)}
            onNext={() => setCurrentIndex((i) => i + 1)}
            hasPrev={currentIndex > 0}
            hasNext={currentIndex < NORMAS_BASICAS_SCREENS.length - 1}
            current={currentIndex}
            total={NORMAS_BASICAS_SCREENS.length}
          />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

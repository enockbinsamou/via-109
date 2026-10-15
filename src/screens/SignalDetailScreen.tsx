import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { SignalViewer } from "@/components/SignalViewer";
import { PagerControls } from "@/components/PagerControls";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { loadSignals } from "@/data/loader";
import { markSignalViewed, saveQuizSession } from "@/utils/storage";
import { CATEGORIES } from "@/data/types";
import type { Signal } from "@/data/types";
import { BottomNav } from "@/components/BottomNav";

export default function SignalDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the signal across all categories to determine its category
  const targetCategory = useMemo(() => {
    for (const cat of CATEGORIES) {
      const signals = loadSignals(cat.id);
      if (signals.some((s) => String(s.id) === id)) return cat.id;
    }
    return "";
  }, [id]);

  // Only load signals for the current category
  const categorySignals = useMemo<Signal[]>(
    () => (targetCategory ? loadSignals(targetCategory) : []),
    [targetCategory]
  );

  const initialIndex = useMemo(() => {
    const idx = categorySignals.findIndex((s) => String(s.id) === id);
    return idx >= 0 ? idx : 0;
  }, [categorySignals, id]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const idx = categorySignals.findIndex((s) => String(s.id) === id);
    if (idx >= 0) setCurrentIndex(idx);
  }, [id, categorySignals]);

  useEffect(() => {
    if (categorySignals[currentIndex]) {
      markSignalViewed(categorySignals[currentIndex].id);
    }
  }, [currentIndex, categorySignals]);

  const goTo = useCallback(
    (idx: number) => {
      setCurrentIndex(idx);
      navigate(`/signal/${categorySignals[idx].id}`, { replace: true });
    },
    [categorySignals, navigate]
  );

  const handlePracticar = () => {
    const signal = categorySignals[currentIndex];
    if (!signal) return;
    saveQuizSession({
      mode: "focused",
      signalId: signal.id,
      category: signal.category,
      questionIds: [],
    });
    navigate("/quiz/run");
  };

  const signal = categorySignals[currentIndex];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Detalle" showBack />
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md">
          {!signal ? (
            <EmptyState title="Señal no encontrada" />
          ) : (
            <div className="flex flex-col gap-6">
              <SignalViewer signal={signal} />
              <PagerControls
                onPrev={() => goTo(currentIndex - 1)}
                onNext={() => goTo(currentIndex + 1)}
                hasPrev={currentIndex > 0}
                hasNext={currentIndex < categorySignals.length - 1}
                current={currentIndex}
                total={categorySignals.length}
              />
              <Button onClick={handlePracticar} className="w-full">
                Practicar esta señal
              </Button>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

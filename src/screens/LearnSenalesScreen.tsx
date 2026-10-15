import { useMemo } from "react";
import { TopBar } from "@/components/TopBar";
import { CategoryCard } from "@/components/CategoryCard";
import { EmptyState } from "@/components/EmptyState";
import { CATEGORIES, type Category } from "@/data/types";
import { loadSignals } from "@/data/loader";
import { BottomNav } from "@/components/BottomNav";

export default function LearnSenalesScreen() {
  const signalCategories = useMemo<Category[]>(
    () =>
      CATEGORIES.map((cat) => ({
        ...cat,
        signalCount: loadSignals(cat.id).length,
      })),
    []
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Señales de tránsito" showBack />
      <main className="flex-1 p-4">
        <div className="mx-auto flex max-w-md flex-col gap-3">
          {signalCategories.length === 0 ? (
            <EmptyState title="No hay categorías disponibles" />
          ) : (
            signalCategories.map((cat) => <CategoryCard key={cat.id} category={cat} />)
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

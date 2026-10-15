import { TopBar } from "@/components/TopBar";
import { CategoryCard } from "@/components/CategoryCard";
import { NORMAS_CATEGORIES } from "@/data/types";
import { BottomNav } from "@/components/BottomNav";

export default function LearnNormasScreen() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Normas y control" showBack />
      <main className="flex-1 p-4">
        <div className="mx-auto flex max-w-md flex-col gap-3">
          {NORMAS_CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

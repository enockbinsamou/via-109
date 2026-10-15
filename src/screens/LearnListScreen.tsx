import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { SignalCard } from "@/components/SignalCard";
import { EmptyState } from "@/components/EmptyState";
import { Input } from "@/components/ui/input";
import { loadSignals } from "@/data/loader";
import { Search } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export default function LearnListScreen() {
  const { category } = useParams<{ category: string }>();
  const [search, setSearch] = useState("");

  const signals = useMemo(() => loadSignals(category || ""), [category]);

  const filtered = useMemo(() => {
    if (!search.trim()) return signals;
    const q = search.toLowerCase();
    return signals.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q)
    );
  }, [signals, search]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Señales" showBack />
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar señal..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          {filtered.length === 0 ? (
            <EmptyState title="No se encontraron señales" />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((s) => (
                <SignalCard key={s.id} signal={s} />
              ))}
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

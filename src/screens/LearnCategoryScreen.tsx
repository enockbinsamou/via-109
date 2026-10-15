import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { ChevronRight, TrafficCone, Scale } from "lucide-react";

const MAIN_CATEGORIES = [
  {
    id: "senales",
    name: "Señales de tránsito",
    description: "Estudia todas las señales oficiales según la Ley 109.",
    route: "/learn/senales",
    icon: TrafficCone,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    id: "normas",
    name: "Normas y control de circulación",
    description: "Aprende las reglas fundamentales para aprobar el examen teórico.",
    route: "/learn/normas",
    icon: Scale,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
  },
];

export default function LearnCategoryScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Aprender" showBack />
      <main className="flex-1 p-4">
        <div className="mx-auto flex max-w-md flex-col gap-3">
          {MAIN_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(cat.route)}
              className="flex w-full items-center gap-4 rounded-2xl bg-card p-5 text-left text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md press-scale"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${cat.bg}`}>
                <cat.icon className={`h-6 w-6 ${cat.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold">{cat.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

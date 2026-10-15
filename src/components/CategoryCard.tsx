import { useNavigate } from "react-router-dom";
import { ChevronRight, AlertTriangle, ShieldAlert, Ban, CheckCircle2, CircleCheckBig, Info, Compass, Shapes, UserCheck, GitFork, Route, Footprints, ShieldX, Minus } from "lucide-react";
import type { Category } from "@/data/types";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  // Señales
  peligro: { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
  prioridad: { icon: ShieldAlert, color: "text-amber-600", bg: "bg-amber-100" },
  prohibicion: { icon: Ban, color: "text-red-500", bg: "bg-red-50" },
  obligacion: { icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-100" },
  fin: { icon: CircleCheckBig, color: "text-emerald-600", bg: "bg-emerald-100" },
  informacion: { icon: Info, color: "text-blue-500", bg: "bg-blue-50" },
  orientacion: { icon: Compass, color: "text-green-600", bg: "bg-green-100" },
  elementos: { icon: Shapes, color: "text-orange-500", bg: "bg-orange-100" },
  // Normas
  agente: { icon: UserCheck, color: "text-indigo-600", bg: "bg-indigo-100" },
  "prioridad-intersecciones": { icon: GitFork, color: "text-amber-600", bg: "bg-amber-100" },
  "normas-basicas": { icon: Route, color: "text-sky-600", bg: "bg-sky-100" },
  peatones: { icon: Footprints, color: "text-teal-600", bg: "bg-teal-100" },
  accidente: { icon: ShieldX, color: "text-red-600", bg: "bg-red-100" },
  horizontales: { icon: Minus, color: "text-violet-600", bg: "bg-violet-100" },
};

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const navigate = useNavigate();
  const iconConfig = CATEGORY_ICONS[category.id];
  const Icon = iconConfig?.icon;

  return (
    <button
      onClick={() => navigate(`/learn/${category.id}`)}
      className="flex w-full items-center gap-4 rounded-2xl bg-card p-4 text-left text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md press-scale"
    >
      {Icon && (
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full", iconConfig.bg)}>
          <Icon className={cn("h-5 w-5", iconConfig.color)} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold leading-tight">{category.name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{category.description}</p>
        {category.signalCount != null && (
          <span className="mt-1.5 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground">
            {category.signalCount} señales
          </span>
        )}
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </button>
  );
}

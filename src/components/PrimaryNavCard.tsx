import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrimaryNavCardProps {
  icon: LucideIcon;
  label: string;
  to: string;
  description?: string;
  color?: "primary" | "accent" | "warning" | "success";
}

const colorMap = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
};

export function PrimaryNavCard({ icon: Icon, label, to, description, color = "primary" }: PrimaryNavCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center gap-2.5 rounded-2xl bg-card p-3 sm:p-4 text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.97] press-scale text-left"
    >
      <div className={cn("flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full", colorMap[color])}>
        <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-bold">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground leading-tight">{description}</span>
        )}
      </div>
    </button>
  );
}

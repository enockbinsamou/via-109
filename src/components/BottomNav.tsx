import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, Bookmark, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: Home, label: "Inicio", path: "/" },
  { icon: BookOpen, label: "Estudio", path: "/learn" },
  { icon: Bookmark, label: "Guardados", path: "/guardados" },
  { icon: User, label: "Perfil", path: "/profile" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="sticky bottom-0 z-30 flex h-16 items-center justify-around border-t bg-card/95 backdrop-blur-sm safe-area-bottom">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center gap-0.5 px-4 py-1.5 press-scale",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
            {isActive && <span className="h-1 w-1 rounded-full bg-primary" />}
            <span className={cn("text-[10px] font-medium", isActive && "font-semibold")}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

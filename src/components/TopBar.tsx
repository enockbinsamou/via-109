import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, X, Flag } from "lucide-react";
import { brandConfig } from "@/config/brandConfig";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  showSettings?: boolean;
  showClose?: boolean;
  showFlag?: boolean;
  rightContent?: React.ReactNode;
  onClose?: () => void;
}

export function TopBar({
  title,
  showBack = false,
  showSettings = false,
  showClose = false,
  showFlag = false,
  rightContent,
  onClose,
}: TopBarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-card/95 px-4 backdrop-blur-sm">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground press-scale"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}
      {showClose && (
        <button
          onClick={onClose || (() => navigate(-1))}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground press-scale"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      <h1 className="flex-1 truncate text-center text-base font-semibold">
        {title || brandConfig.appTitle}
      </h1>
      {rightContent}
      {showFlag && (
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground press-scale"
          aria-label="Reportar"
        >
          <Flag className="h-5 w-5" />
        </button>
      )}
      {showSettings && (
        <button
          onClick={() => navigate("/settings")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground press-scale"
          aria-label="Ajustes"
        >
          <Settings className="h-5 w-5" />
        </button>
      )}
    </header>
  );
}

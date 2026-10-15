import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { brandConfig } from "@/config/brandConfig";
import { resetAllProgress } from "@/utils/storage";
import { Globe, Bell, Moon, Info } from "lucide-react";

export default function SettingsScreen() {
  const [confirmReset, setConfirmReset] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    resetAllProgress();
    setConfirmReset(false);
  };

  const settingsItems = [
    {
      icon: Globe,
      label: "Idioma",
      value: "Español",
      type: "label" as const,
    },
    {
      icon: Bell,
      label: "Notificaciones",
      type: "switch" as const,
      enabled: false,
    },
    {
      icon: Moon,
      label: "Modo oscuro",
      type: "switch" as const,
      enabled: darkMode,
      onToggle: toggleDark,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Configuración" showBack />
      <main className="flex-1 p-4 pb-20">
        <div className="mx-auto flex max-w-md flex-col gap-4">
          {/* Settings list */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden divide-y">
            {settingsItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 px-4 py-3.5"
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {item.type === "label" && (
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                )}
                {item.type === "switch" && (
                  <Switch
                    checked={item.enabled}
                    onCheckedChange={item.onToggle}
                    disabled={!item.onToggle}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Reset */}
          <Button
            variant={confirmReset ? "destructive" : "outline"}
            onClick={handleReset}
            className="w-full rounded-xl"
          >
            {confirmReset ? "¿Confirmar borrar progreso?" : "Reiniciar progreso"}
          </Button>

          {/* Info section */}
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-muted-foreground">Información</h3>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Versión {brandConfig.version}</p>
              <p>Ley 109 – Código de Seguridad Vial de Cuba</p>
            </div>
          </div>

          {/* Footer credit */}
          <p className="text-center text-xs text-muted-foreground/60 pt-2">
            Diseñado por Enock Binsamou
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

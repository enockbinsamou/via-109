import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getExamTimerEnabled, setExamTimerEnabled, saveQuizSession } from "@/utils/storage";
import { useState } from "react";

export default function ExamSetupScreen() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(getExamTimerEnabled());

  const startExam = () => {
    setExamTimerEnabled(timer);
    saveQuizSession({ mode: "category", category: "peligro", questionIds: [] });
    navigate("/exam/run");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Examen" showBack />
      <main className="flex-1 p-4">
        <div className="mx-auto flex max-w-md flex-col gap-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Simulación de examen</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              30 preguntas sin retroalimentación inmediata. Se evalúan todas al final.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
            <Label htmlFor="timer-toggle" className="text-sm font-medium">
              Temporizador (30 min)
            </Label>
            <Switch
              id="timer-toggle"
              checked={timer}
              onCheckedChange={(v) => setTimer(v)}
            />
          </div>

          <Button onClick={startExam} size="lg" className="w-full">
            Iniciar examen
          </Button>
        </div>
      </main>
    </div>
  );
}

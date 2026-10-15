import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { ScoreSummary } from "@/components/ScoreSummary";
import { MistakeList } from "@/components/MistakeList";
import { Button } from "@/components/ui/button";
import { getExamResults } from "@/utils/storage";

export default function ExamResultScreen() {
  const navigate = useNavigate();
  const results = getExamResults();
  const last = results[results.length - 1];

  if (!last) {
    navigate("/exam", { replace: true });
    return null;
  }

  const mistakes = last.answers.filter((a) => a.selectedIndex !== a.correctIndex);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar title="Resultado del examen" showBack />
      <main className="flex-1 p-4">
        <div className="mx-auto flex max-w-md flex-col gap-6">
          <ScoreSummary score={last.score} total={last.total} passed={last.passed} label="Examen completado" />
          <MistakeList mistakes={mistakes} />
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate("/exam")} variant="outline">
              Reintentar
            </Button>
            <Button onClick={() => navigate("/")} variant="secondary">
              Volver al inicio
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

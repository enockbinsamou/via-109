import { useNavigate } from "react-router-dom";
import type { AnswerRecord } from "@/data/types";

interface MistakeListProps {
  mistakes: AnswerRecord[];
}

export function MistakeList({ mistakes }: MistakeListProps) {
  const navigate = useNavigate();

  if (mistakes.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        ¡Sin errores! Excelente trabajo.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-muted-foreground">Errores ({mistakes.length})</h3>
      {mistakes.map((m, i) => (
        <button
          key={i}
          onClick={() => navigate(`/signal/${m.signalId}`)}
          className="flex items-start gap-3 rounded-lg border bg-card p-3 text-left transition-colors hover:bg-secondary"
        >
          <img src={m.signalImage} alt="" className="h-10 w-10 rounded object-contain" />
          <div className="flex-1 text-sm">
            <p className="font-medium">{m.question}</p>
            <p className="text-destructive">Tu respuesta: {m.choices[m.selectedIndex]}</p>
            <p className="text-success">Correcta: {m.choices[m.correctIndex]}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

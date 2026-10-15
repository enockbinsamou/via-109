import { CheckCircle, XCircle } from "lucide-react";

interface ScoreSummaryProps {
  score: number;
  total: number;
  passed?: boolean;
  label?: string;
}

export function ScoreSummary({ score, total, passed, label }: ScoreSummaryProps) {
  const pct = Math.round((score / total) * 100);
  const isPass = passed ?? pct >= 70;

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border bg-card p-6 text-center shadow-sm">
      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${isPass ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
        {isPass ? <CheckCircle className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
      </div>
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
      <p className="text-3xl font-bold">{score}/{total}</p>
      <p className="text-sm text-muted-foreground">{pct}% — {isPass ? "Aprobado" : "No aprobado"}</p>
    </div>
  );
}

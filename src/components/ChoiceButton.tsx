import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface ChoiceButtonProps {
  label: string;
  index: number;
  state: "idle" | "correct" | "incorrect" | "selected";
  disabled?: boolean;
  onClick: () => void;
  explanation?: string;
}

const LETTERS = ["A", "B", "C", "D"];

export function ChoiceButton({ label, index, state, disabled, onClick, explanation }: ChoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left text-sm transition-all duration-200 press-scale",
        state === "idle" && "border-border bg-card text-card-foreground hover:border-muted-foreground/30",
        state === "selected" && "border-primary bg-primary/5 text-foreground",
        state === "correct" && "border-success bg-success/5 text-foreground",
        state === "incorrect" && "border-destructive bg-destructive/5 text-foreground",
        disabled && state === "idle" && "opacity-50"
      )}
    >
      {(state === "correct" || state === "incorrect") ? (
        <div className="mt-0.5 shrink-0">
          {state === "correct" ? (
            <CheckCircle2 className="h-6 w-6 text-success" />
          ) : (
            <XCircle className="h-6 w-6 text-destructive" />
          )}
        </div>
      ) : (
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold mt-0.5",
            state === "selected"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground"
          )}
        >
          {state === "selected" ? "●" : LETTERS[index]}
        </span>
      )}
      <div className="flex-1">
        <span className={cn("font-medium", state === "correct" && "text-foreground", state === "incorrect" && "text-foreground")}>
          {label}
        </span>
        {state === "incorrect" && explanation && (
          <p className="mt-1 text-xs text-destructive">{explanation}</p>
        )}
      </div>
    </button>
  );
}

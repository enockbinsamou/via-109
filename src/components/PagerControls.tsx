import { ChevronLeft, ChevronRight } from "lucide-react";

interface PagerControlsProps {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  current?: number;
  total?: number;
}

export function PagerControls({ onPrev, onNext, hasPrev, hasNext, current, total }: PagerControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className="flex h-10 w-10 items-center justify-center rounded-md border bg-card text-card-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:hover:bg-card"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      {current != null && total != null && (
        <span className="text-sm text-muted-foreground">
          {current + 1} / {total}
        </span>
      )}
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="flex h-10 w-10 items-center justify-center rounded-md border bg-card text-card-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:hover:bg-card"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

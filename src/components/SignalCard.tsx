import { useNavigate } from "react-router-dom";
import type { Signal } from "@/data/types";

interface SignalCardProps {
  signal: Signal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/signal/${signal.id}`)}
      className="flex flex-col overflow-hidden rounded-lg border bg-card text-left text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden bg-muted">
        <img
          src={signal.image}
          alt={signal.title}
          className="h-full w-full object-contain p-2"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold leading-tight">{signal.title}</h3>
        {signal.meaning && (
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{signal.meaning}</p>
        )}
      </div>
    </button>
  );
}

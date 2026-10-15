import type { Signal } from "@/data/types";

interface SignalViewerProps {
  signal: Signal;
}

export function SignalViewer({ signal }: SignalViewerProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-xs overflow-hidden rounded-lg border bg-muted">
        <img
          src={signal.image}
          alt={signal.title}
          className="h-auto w-full object-contain p-4"
          onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
        />
      </div>
      <div className="w-full text-center">
        <h2 className="text-xl font-bold">{signal.title}</h2>
        <p className="mt-1 text-base text-primary font-medium">{signal.meaning}</p>
        {signal.description && (
          <p className="mt-3 text-sm text-muted-foreground">{signal.description}</p>
        )}
      </div>
    </div>
  );
}

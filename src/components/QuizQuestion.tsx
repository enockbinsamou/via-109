interface QuizQuestionProps {
  image: string;
  questionText: string;
  children: React.ReactNode;
  progress?: { current: number; total: number };
  categoryLabel?: string;
}

export function QuizQuestion({ image, questionText, children, progress, categoryLabel }: QuizQuestionProps) {
  return (
    <div className="flex flex-col gap-4">
      {progress && (
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${((progress.current + 1) / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}
      {categoryLabel && (
        <span className="inline-block self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {categoryLabel}
        </span>
      )}
      <h2 className="text-lg font-bold leading-snug text-foreground">{questionText}</h2>
      <div className="mx-auto w-full overflow-hidden rounded-2xl bg-muted">
        <img src={image} alt="Señal" className="h-auto w-full object-contain p-4" />
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

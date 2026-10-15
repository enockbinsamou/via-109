interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <p className="text-base font-semibold text-muted-foreground">{title}</p>
      {description && <p className="text-sm text-muted-foreground/70">{description}</p>}
    </div>
  );
}

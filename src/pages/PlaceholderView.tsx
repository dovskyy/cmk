export function PlaceholderView({ title, description }: { title: string, description: string }) {
  return (
    <div className="w-full flex-grow flex items-center justify-center py-32 px-6">
      <div className="text-center max-w-2xl bg-surface p-12 rounded-3xl shadow-soft border border-border">
        <h1 className="font-display text-4xl font-bold text-primary mb-6">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
        <div className="mt-12 flex justify-center gap-2">
           <span className="w-2 h-2 rounded-full bg-border inline-block animate-pulse"></span>
           <span className="w-2 h-2 rounded-full bg-border inline-block animate-pulse delay-75"></span>
           <span className="w-2 h-2 rounded-full bg-border inline-block animate-pulse delay-150"></span>
        </div>
      </div>
    </div>
  );
}

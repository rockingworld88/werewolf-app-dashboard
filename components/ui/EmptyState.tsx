import { ShieldOff } from "lucide-react";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-10 text-center">
      <ShieldOff className="mx-auto mb-4 h-8 w-8 text-[var(--text-muted)]" />
      <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--text-soft)]">{body}</p>
    </div>
  );
}

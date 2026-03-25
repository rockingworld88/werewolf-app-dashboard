import { Card } from "@/components/ui/Card";

export function StatCard({
  label,
  value,
  meta,
}: {
  label: string;
  value: string | number;
  meta?: string;
}) {
  return (
    <Card className="bg-[var(--bg-soft)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</p>
      <p className="mt-3 text-3xl font-black text-[var(--text)]">{value}</p>
      {meta ? <p className="mt-2 text-sm text-[var(--text-soft)]">{meta}</p> : null}
    </Card>
  );
}

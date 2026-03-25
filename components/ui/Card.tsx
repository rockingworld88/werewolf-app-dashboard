import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6", className)}>{children}</div>;
}

import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        tone === "neutral" && "bg-white/5 text-[var(--text-soft)]",
        tone === "accent" && "bg-[var(--accent)]/15 text-[var(--text)]",
        tone === "success" && "bg-[var(--success)]/15 text-[var(--success)]",
        tone === "warning" && "bg-[var(--warning)]/15 text-[var(--warning)]",
        tone === "danger" && "bg-[var(--danger)]/15 text-[var(--danger)]",
      )}
    >
      {children}
    </span>
  );
}

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl border px-4 py-2.5 text-sm font-semibold transition",
        variant === "primary" && "border-transparent bg-[var(--accent)] text-[var(--text)] hover:bg-[var(--accent-strong)]",
        variant === "secondary" && "border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-strong)]",
        variant === "ghost" && "border-transparent bg-transparent text-[var(--text-soft)] hover:bg-white/5",
        variant === "danger" && "border-transparent bg-[var(--danger)]/90 text-[var(--text)] hover:bg-[var(--danger)]",
        className,
      )}
      {...props}
    />
  );
}

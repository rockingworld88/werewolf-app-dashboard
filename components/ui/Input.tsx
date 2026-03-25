type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className="grid gap-2">
      {label ? <span className="text-sm font-medium text-[var(--text-soft)]">{label}</span> : null}
      <input
        className={`h-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] ${className}`}
        {...props}
      />
      {error ? <span className="text-sm text-[var(--danger)]">{error}</span> : null}
    </label>
  );
}

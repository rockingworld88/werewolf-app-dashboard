type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <label className="grid gap-2">
      {label ? <span className="text-sm font-medium text-[var(--text-soft)]">{label}</span> : null}
      <textarea
        className={`min-h-32 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] ${className}`}
        {...props}
      />
      {error ? <span className="text-sm text-[var(--danger)]">{error}</span> : null}
    </label>
  );
}

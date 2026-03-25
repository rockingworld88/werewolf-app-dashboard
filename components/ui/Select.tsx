type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Array<{ label: string; value: string }>;
};

export function Select({ label, error, options, className = "", ...props }: SelectProps) {
  return (
    <label className="grid gap-2">
      {label ? <span className="text-sm font-medium text-[var(--text-soft)]">{label}</span> : null}
      <select
        className={`h-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-sm text-[var(--danger)]">{error}</span> : null}
    </label>
  );
}

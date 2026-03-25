import { formatDate } from "@/lib/utils";
import { RiderProfile } from "@/types/rider";
import { Button } from "@/components/ui/Button";

export function AdminTopbar({ profile }: { profile: RiderProfile }) {
  return (
    <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Admin Session</p>
        <h1 className="mt-1 text-xl font-bold text-[var(--text)]">{profile.full_name}</h1>
        <p className="mt-1 text-sm text-[var(--text-soft)]">
          {profile.role} access · {formatDate(new Date().toISOString())}
        </p>
      </div>
      <form action="/api/auth/logout" method="post">
        <Button type="submit" variant="secondary">
          Logout
        </Button>
      </form>
    </header>
  );
}

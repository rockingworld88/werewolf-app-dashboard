import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Restricted Access</p>
        <h1 className="mt-4 text-4xl font-black text-[var(--text)]">Admin clearance required</h1>
        <p className="mt-4 text-base leading-7 text-[var(--text-soft)]">
          This operations dashboard is reserved for WEREWOLF ALPHA leadership. Rider or public accounts cannot enter this panel.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/login">
            <Button>Return to Login</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

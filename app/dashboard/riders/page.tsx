import Link from "next/link";

import { RidersTable } from "@/components/riders/RidersTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getRiders } from "@/lib/data";

export default async function RidersPage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string; status?: string }>;
}) {
  const params = await searchParams;
  const riders = await getRiders(params?.search, params?.status);

  return (
    <div className="grid gap-6">
      <Card className="bg-[var(--bg-soft)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Rider Management</p>
            <h1 className="mt-2 text-3xl font-black text-[var(--text)]">Members roster</h1>
          </div>
          <Link href="/dashboard/riders/new">
            <Button>Add Rider</Button>
          </Link>
        </div>
        <form className="mt-6 grid gap-4 md:grid-cols-[1fr_220px_auto]" method="get">
          <input
            className="h-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
            defaultValue={params?.search ?? ""}
            name="search"
            placeholder="Search by rider name or username"
          />
          <select
            className="h-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--text)] outline-none"
            defaultValue={params?.status ?? "all"}
            name="status"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <Button type="submit" variant="secondary">
            Filter
          </Button>
        </form>
      </Card>

      {riders.length ? <RidersTable riders={riders} /> : <EmptyState body="No riders match the current search or status filter." title="No rider records found" />}
    </div>
  );
}

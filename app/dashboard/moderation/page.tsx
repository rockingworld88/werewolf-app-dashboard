import { ModerationTable } from "@/components/moderation/ModerationTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getModerationMessages } from "@/lib/data";

export default async function ModerationPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string; search?: string }>;
}) {
  const params = await searchParams;
  const messages = await getModerationMessages(params?.type, params?.search);

  return (
    <div className="grid gap-6">
      <Card className="bg-[var(--bg-soft)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Moderation</p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text)]">Community review queue</h1>
        <form className="mt-6 grid gap-4 md:grid-cols-[1fr_240px_auto]" method="get">
          <input
            className="h-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
            defaultValue={params?.search ?? ""}
            name="search"
            placeholder="Search message text"
          />
          <select
            className="h-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--text)] outline-none"
            defaultValue={params?.type ?? "all"}
            name="type"
          >
            <option value="all">All message types</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="voice">Voice</option>
          </select>
          <Button type="submit" variant="secondary">
            Filter
          </Button>
        </form>
      </Card>

      {messages.length ? (
        <ModerationTable messages={messages} />
      ) : (
        <EmptyState body="No moderation records matched the current filter." title="Nothing to review" />
      )}
    </div>
  );
}

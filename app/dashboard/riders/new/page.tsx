import { RiderForm } from "@/components/riders/RiderForm";
import { Card } from "@/components/ui/Card";

export default function NewRiderPage() {
  return (
    <div className="grid gap-6">
      <Card className="bg-[var(--bg-soft)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Create Rider</p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text)]">Add a new member account</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--text-soft)]">
          This flow creates the Supabase auth user on the server, then writes the matching rider profile so login credentials and membership data stay aligned.
        </p>
      </Card>
      <Card>
        <RiderForm action="/api/riders" includePassword submitLabel="Create Rider Account" />
      </Card>
    </div>
  );
}

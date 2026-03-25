import { notFound } from "next/navigation";

import { RiderForm } from "@/components/riders/RiderForm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getRiderById } from "@/lib/data";

export default async function RiderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const rider = await getRiderById(id);

    return (
      <div className="grid gap-6">
        <Card className="bg-[var(--bg-soft)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Rider Profile</p>
          <h1 className="mt-2 text-3xl font-black text-[var(--text)]">{rider.full_name}</h1>
          <p className="mt-2 text-sm text-[var(--text-soft)]">
            Manage membership status, profile details, and access posture for this rider account.
          </p>
        </Card>

        <Card>
          <RiderForm
            action={`/api/riders/${id}`}
            rider={{ ...rider, login_email: rider.login_email }}
            submitLabel="Save Rider Changes"
          />
        </Card>

        <Card className="grid gap-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--text)]">Password reset guidance</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
              For now, use the Supabase Auth dashboard or a secure admin flow to reset passwords. This keeps credential resets deliberate while the dashboard focuses on rider provisioning and status control.
            </p>
          </div>
          <form action={`/api/riders/${id}`} method="post">
            <input name="_method" type="hidden" value="PATCH" />
            <input name="membership_status" type="hidden" value={rider.membership_status === "active" ? "inactive" : "active"} />
            <Button type="submit" variant="secondary">
              {rider.membership_status === "active" ? "Deactivate Rider" : "Reactivate Rider"}
            </Button>
          </form>
        </Card>
      </div>
    );
  } catch {
    notFound();
  }
}

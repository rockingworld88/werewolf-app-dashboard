import Link from "next/link";
import { notFound } from "next/navigation";

import { AnnouncementForm } from "@/components/announcements/AnnouncementForm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getAnnouncementById } from "@/lib/data";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const announcement = await getAnnouncementById(id);

    return (
      <div className="grid gap-6">
        <Card className="bg-[var(--bg-soft)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Edit Announcement</p>
              <h1 className="mt-2 text-3xl font-black text-[var(--text)]">{announcement.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--text-soft)]">
                Update the message body, title, or pinned state for this official order.
              </p>
            </div>
            <Link href="/dashboard/announcements">
              <Button variant="secondary">Back to Announcements</Button>
            </Link>
          </div>
        </Card>

        <Card>
          <AnnouncementForm
            action="/api/announcements"
            announcement={announcement}
            method="PUT"
            submitLabel="Save Announcement Changes"
          />
        </Card>
      </div>
    );
  } catch {
    notFound();
  }
}

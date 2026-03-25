import { AnnouncementForm } from "@/components/announcements/AnnouncementForm";
import { AnnouncementsTable } from "@/components/announcements/AnnouncementsTable";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAnnouncements } from "@/lib/data";

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="grid gap-6">
      <Card className="bg-[var(--bg-soft)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Announcements</p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text)]">Official orders desk</h1>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-[var(--text)]">Post announcement</h2>
        <div className="mt-5">
          <AnnouncementForm action="/api/announcements" submitLabel="Publish Announcement" />
        </div>
      </Card>

      {announcements.length ? (
        <AnnouncementsTable announcements={announcements} />
      ) : (
        <EmptyState body="Announcements will appear here once leadership posts the first order." title="No announcements yet" />
      )}
    </div>
  );
}

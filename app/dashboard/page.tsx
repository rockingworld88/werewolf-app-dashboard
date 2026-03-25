import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { getDashboardOverview, getAnnouncements } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const overview = await getDashboardOverview();
  const announcements = await getAnnouncements();

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 xl:grid-cols-3 md:grid-cols-2">
        <StatCard label="Total Riders" value={overview.totalRiders} meta="All member profiles in the system" />
        <StatCard label="Active Riders" value={overview.activeRiders} meta="Members currently allowed into the rider app" />
        <StatCard label="Announcements" value={overview.announcements} meta="Current command posts and pinned notices" />
        <StatCard label="Messages Today" value={overview.messagesToday} meta="Recent private community traffic" />
        <StatCard label="Images Shared" value={overview.imagesShared} meta="Media uploads across the community feed" />
        <StatCard label="Voice Notes Shared" value={overview.voiceNotesShared} meta="Recorded voice drops posted by members" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Recent Rider Activity</p>
              <h2 className="mt-2 text-2xl font-bold text-[var(--text)]">Latest community movement</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            {overview.latestChat.map((message) => (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-4" key={message.id}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[var(--text)]">
                    {message.profiles?.full_name ?? message.profiles?.username ?? "Unknown rider"}
                  </p>
                  <span className="text-xs text-[var(--text-muted)]">{formatDate(message.created_at)}</span>
                </div>
                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  {message.text_content || `${message.message_type} message`}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Latest Orders</p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--text)]">Announcement feed</h2>
          <div className="mt-6 grid gap-4">
            {announcements.slice(0, 4).map((announcement) => (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-4" key={announcement.id}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[var(--text)]">{announcement.title}</p>
                  <span className="text-xs text-[var(--text-muted)]">{formatDate(announcement.created_at)}</span>
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--text-soft)]">{announcement.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Newest Riders</p>
          <div className="mt-5 grid gap-3">
            {overview.latestProfiles.map((rider) => (
              <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-4" key={rider.id}>
                <div>
                  <p className="font-semibold text-[var(--text)]">{rider.full_name}</p>
                  <p className="text-sm text-[var(--text-soft)]">@{rider.username}</p>
                </div>
                <p className="text-xs text-[var(--text-muted)]">{formatDate(rider.created_at)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Command Notes</p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--text)]">Ops guidance</h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-[var(--text-soft)]">
            <li className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-4">Use rider creation from this dashboard so auth and profile records stay aligned.</li>
            <li className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-4">Pinned announcements should stay concise and operational so riders can scan them quickly.</li>
            <li className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-4">When moderating media, remove both the chat record and the storage object if the file itself is inappropriate.</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}

import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Announcement } from "@/types/announcement";
import { formatDate } from "@/lib/utils";

export function AnnouncementsTable({ announcements }: { announcements: Announcement[] }) {
  return (
    <div className="grid gap-4">
      {announcements.map((announcement) => (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5" key={announcement.id}>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-[var(--text)]">{announcement.title}</h3>
                {announcement.is_pinned ? <Badge tone="warning">Pinned</Badge> : null}
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{announcement.body}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">{formatDate(announcement.created_at)}</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/dashboard/announcements/${announcement.id}`}>
                <Button variant="secondary">Edit</Button>
              </Link>
              <form action="/api/announcements" method="post">
                <input name="id" type="hidden" value={announcement.id} />
                <input name="title" type="hidden" value={announcement.title} />
                <input name="body" type="hidden" value={announcement.body} />
                <input name="is_pinned" type="hidden" value={String(!announcement.is_pinned)} />
                <input name="_method" type="hidden" value="PUT" />
                <Button type="submit" variant="secondary">
                  {announcement.is_pinned ? "Unpin" : "Pin"}
                </Button>
              </form>
              <form action="/api/announcements" method="post">
                <input name="id" type="hidden" value={announcement.id} />
                <input name="_method" type="hidden" value="DELETE" />
                <Button type="submit" variant="danger">
                  Delete
                </Button>
              </form>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

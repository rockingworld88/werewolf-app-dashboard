import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Announcement } from "@/types/announcement";

export function AnnouncementForm({
  action,
  announcement,
  submitLabel,
  method = "POST",
}: {
  action: string;
  announcement?: Partial<Announcement>;
  submitLabel: string;
  method?: "POST" | "PUT";
}) {
  return (
    <form action={action} className="grid gap-5" method="post">
      {method !== "POST" ? <input name="_method" type="hidden" value={method} /> : null}
      <Input defaultValue={announcement?.title ?? ""} label="Title" name="title" required />
      <Textarea defaultValue={announcement?.body ?? ""} label="Body" name="body" required />
      <label className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-sm text-[var(--text-soft)]">
        <input defaultChecked={announcement?.is_pinned ?? false} name="is_pinned" type="checkbox" value="true" />
        Pin this announcement
      </label>
      {announcement?.id ? <input name="id" type="hidden" value={announcement.id} /> : null}
      <div className="flex justify-end">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

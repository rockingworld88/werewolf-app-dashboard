import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ModerationMessage } from "@/types/chat";
import { formatDate } from "@/lib/utils";

export function ModerationTable({ messages }: { messages: ModerationMessage[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border)]">
      <table className="min-w-full divide-y divide-[var(--border)] text-left">
        <thead className="bg-[var(--bg-soft)]">
          <tr className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
            <th className="px-5 py-4">Sender</th>
            <th className="px-5 py-4">Type</th>
            <th className="px-5 py-4">Preview</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Created</th>
            <th className="px-5 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
          {messages.map((message) => (
            <tr key={message.id}>
              <td className="px-5 py-4">
                <p className="font-semibold text-[var(--text)]">{message.profiles?.full_name ?? message.profiles?.username ?? "Unknown rider"}</p>
              </td>
              <td className="px-5 py-4">
                <Badge tone={message.message_type === "text" ? "neutral" : "accent"}>{message.message_type}</Badge>
              </td>
              <td className="px-5 py-4 text-sm text-[var(--text-soft)]">
                {message.text_content || (message.media_url ? "Media attachment present" : "No preview")}
              </td>
              <td className="px-5 py-4">
                <Badge tone={message.is_deleted ? "danger" : "success"}>{message.is_deleted ? "Deleted" : "Visible"}</Badge>
              </td>
              <td className="px-5 py-4 text-sm text-[var(--text-soft)]">{formatDate(message.created_at)}</td>
              <td className="px-5 py-4">
                <form action="/api/moderation" className="flex gap-2" method="post">
                  <input name="messageId" type="hidden" value={message.id} />
                  {message.media_url ? <input name="mediaUrl" type="hidden" value={message.media_url} /> : null}
                  {message.media_url ? <input name="deleteMedia" type="hidden" value="true" /> : null}
                  <Button disabled={message.is_deleted} type="submit" variant="danger">
                    Soft Delete
                  </Button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

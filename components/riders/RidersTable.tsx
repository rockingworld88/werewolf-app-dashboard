import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { RiderProfile } from "@/types/rider";
import { formatDateOnly } from "@/lib/utils";

export function RidersTable({ riders }: { riders: RiderProfile[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border)]">
      <table className="min-w-full divide-y divide-[var(--border)] text-left">
        <thead className="bg-[var(--bg-soft)]">
          <tr className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
            <th className="px-5 py-4">Rider</th>
            <th className="px-5 py-4">Username</th>
            <th className="px-5 py-4">Role</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Joined</th>
            <th className="px-5 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
          {riders.map((rider) => (
            <tr key={rider.id}>
              <td className="px-5 py-4">
                <div>
                  <p className="font-semibold text-[var(--text)]">{rider.full_name}</p>
                  <p className="text-sm text-[var(--text-soft)]">{rider.login_email}</p>
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-[var(--text-soft)]">@{rider.username}</td>
              <td className="px-5 py-4">
                <Badge tone={rider.role === "admin" ? "accent" : "neutral"}>{rider.role}</Badge>
              </td>
              <td className="px-5 py-4">
                <Badge tone={rider.membership_status === "active" ? "success" : "warning"}>{rider.membership_status}</Badge>
              </td>
              <td className="px-5 py-4 text-sm text-[var(--text-soft)]">{formatDateOnly(rider.created_at)}</td>
              <td className="px-5 py-4">
                <Link className="text-sm font-semibold text-[var(--text)] underline-offset-4 hover:underline" href={`/dashboard/riders/${rider.id}`}>
                  Manage
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import Link from "next/link";
import { Bike, LayoutDashboard, Megaphone, Settings, Shield, Users } from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/riders", label: "Riders", icon: Users },
  { href: "/dashboard/announcements", label: "Announcements", icon: Megaphone },
  { href: "/dashboard/moderation", label: "Moderation", icon: Shield },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-[var(--border)] bg-black/15 px-5 py-6 lg:block">
      <div className="flex items-center gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/20 text-[var(--accent-strong)]">
          <Bike className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">WEREWOLF ALPHA</p>
          <p className="mt-1 text-lg font-bold text-[var(--text)]">Operations Desk</p>
        </div>
      </div>

      <nav className="mt-8 grid gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-[var(--accent)] text-[var(--text)]"
                  : "text-[var(--text-soft)] hover:bg-white/5 hover:text-[var(--text)]",
              )}
              href={link.href}
              key={link.href}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

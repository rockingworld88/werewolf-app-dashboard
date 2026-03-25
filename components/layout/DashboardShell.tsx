import { headers } from "next/headers";

import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminTopbar } from "@/components/layout/AdminTopbar";
import { RiderProfile } from "@/types/rider";

export async function DashboardShell({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: RiderProfile;
}) {
  const pathname = (await headers()).get("x-pathname") ?? "/dashboard";

  return (
    <div className="min-h-screen lg:flex">
      <AdminSidebar pathname={pathname} />
      <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <AdminTopbar profile={profile} />
        {children}
      </main>
    </div>
  );
}

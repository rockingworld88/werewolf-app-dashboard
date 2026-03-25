import { DashboardShell } from "@/components/layout/DashboardShell";
import { getAuthenticatedAdmin } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getAuthenticatedAdmin();
  return <DashboardShell profile={profile}>{children}</DashboardShell>;
}

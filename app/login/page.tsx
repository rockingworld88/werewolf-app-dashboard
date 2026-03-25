import { redirect } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { getCurrentProfile } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const profile = await getCurrentProfile();
  if (profile?.role === "admin" && profile.membership_status === "active") {
    redirect("/dashboard");
  }

  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <Card className="w-full max-w-md bg-[var(--bg-soft)] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">WEREWOLF ALPHA</p>
        <h1 className="mt-3 text-3xl font-black text-[var(--text)]">Admin login</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
          Restricted dashboard access for owner and staff. No rider or public sign-up is available here.
        </p>

        <form action="/api/auth/login" className="mt-8 grid gap-4" method="post">
          <Input label="Email or Username" name="identifier" placeholder="Enter admin email or username" required />
          <Input label="Password" name="password" placeholder="Enter password" required type="password" />
          {params?.error ? <p className="text-sm text-[var(--danger)]">{decodeURIComponent(params.error)}</p> : null}
          <Button className="mt-2" type="submit">
            Enter Operations Desk
          </Button>
        </form>
      </Card>
    </main>
  );
}

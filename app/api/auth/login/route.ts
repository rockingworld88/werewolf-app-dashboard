import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createServiceRoleClient } from "@/lib/service-role";
import { loginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = loginSchema.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(parsed.error.issues[0].message)}`, request.url));
  }

  const { identifier, password } = parsed.data;
  const supabase = await createSupabaseServerClient();
  let email = identifier;

  if (!identifier.includes("@")) {
    const serviceRole = createServiceRoleClient();
    const { data: profile } = await serviceRole
      .from("profiles")
      .select("login_email")
      .eq("username", identifier.toLowerCase())
      .single();

    email = profile?.login_email ?? identifier;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url));
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}

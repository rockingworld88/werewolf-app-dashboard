import { NextResponse } from "next/server";

import { createServiceRoleClient } from "@/lib/service-role";
import { riderCreateSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = riderCreateSchema.safeParse({
    full_name: formData.get("full_name"),
    username: formData.get("username"),
    email: formData.get("email"),
    temporary_password: formData.get("temporary_password"),
    bike_name: formData.get("bike_name"),
    bike_model: formData.get("bike_model"),
    role: formData.get("role") || "rider",
    membership_status: formData.get("membership_status") || "active",
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const payload = parsed.data;

  const { data: createdUser, error: authError } = await supabase.auth.admin.createUser({
    email: payload.email,
    password: payload.temporary_password,
    email_confirm: true,
    user_metadata: {
      username: payload.username.toLowerCase(),
      full_name: payload.full_name,
      role: payload.role,
      bike_name: payload.bike_name || null,
      bike_model: payload.bike_model || null,
      membership_status: payload.membership_status,
    },
  });

  if (authError || !createdUser.user) {
    return NextResponse.json({ error: { message: authError?.message ?? "Unable to create auth user." } }, { status: 500 });
  }

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: createdUser.user.id,
    username: payload.username.toLowerCase(),
    login_email: payload.email.toLowerCase(),
    full_name: payload.full_name,
    role: payload.role,
    bike_name: payload.bike_name || null,
    bike_model: payload.bike_model || null,
    membership_status: payload.membership_status,
  });

  if (profileError) {
    return NextResponse.json({ error: { message: profileError.message } }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    redirectTo: "/dashboard/riders",
  });
}

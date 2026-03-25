import { NextResponse } from "next/server";

import { createServiceRoleClient } from "@/lib/service-role";
import { riderUpdateSchema } from "@/lib/validations";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const formData = await request.formData();
  const method = String(formData.get("_method") || "PUT").toUpperCase();
  const supabase = createServiceRoleClient();

  if (method === "PATCH") {
    const membership_status = String(formData.get("membership_status") || "inactive");
    const { error } = await supabase.from("profiles").update({ membership_status }).eq("id", id);
    if (error) {
      return NextResponse.json({ error: { message: error.message } }, { status: 500 });
    }
    return NextResponse.redirect(new URL(`/dashboard/riders/${id}`, request.url));
  }

  const parsed = riderUpdateSchema.safeParse({
    full_name: formData.get("full_name"),
    username: formData.get("username"),
    login_email: formData.get("email"),
    bike_name: formData.get("bike_name"),
    bike_model: formData.get("bike_model"),
    role: formData.get("role"),
    membership_status: formData.get("membership_status"),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      username: parsed.data.username.toLowerCase(),
      login_email: parsed.data.login_email.toLowerCase(),
      full_name: parsed.data.full_name,
      bike_name: parsed.data.bike_name || null,
      bike_model: parsed.data.bike_model || null,
      role: parsed.data.role,
      membership_status: parsed.data.membership_status,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    redirectTo: `/dashboard/riders/${id}`,
  });
}

import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createServiceRoleClient } from "@/lib/service-role";
import { announcementSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const formData = await request.formData();
  const method = String(formData.get("_method") || "POST").toUpperCase();
  const supabase = createServiceRoleClient();

  if (method === "DELETE") {
    const id = String(formData.get("id"));
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.redirect(new URL("/dashboard/announcements", request.url));
  }

  const parsed = announcementSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    is_pinned: formData.get("is_pinned") === "true" || formData.get("is_pinned") === "on",
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (method === "PUT") {
    const id = String(formData.get("id"));
    const { error } = await supabase.from("announcements").update(parsed.data).eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.redirect(new URL("/dashboard/announcements", request.url));
  }

  const serverClient = await createSupabaseServerClient();
  const {
    data: { user },
  } = await serverClient.auth.getUser();

  const { error } = await supabase.from("announcements").insert({
    ...parsed.data,
    created_by: user?.id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/dashboard/announcements", request.url));
}

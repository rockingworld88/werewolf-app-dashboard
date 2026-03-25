import { NextResponse } from "next/server";

import { createServiceRoleClient } from "@/lib/service-role";
import { moderationActionSchema } from "@/lib/validations";

function getStoragePathFromUrl(url: string) {
  const marker = "/storage/v1/object/public/";
  const index = url.indexOf(marker);
  if (index === -1) {
    return null;
  }

  const remainder = url.slice(index + marker.length);
  const segments = remainder.split("/");
  const bucket = segments.shift();

  if (!bucket) {
    return null;
  }

  return {
    bucket,
    path: segments.join("/"),
  };
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = moderationActionSchema.safeParse({
    messageId: formData.get("messageId"),
    mediaUrl: formData.get("mediaUrl") || undefined,
    deleteMedia: formData.get("deleteMedia") === "true",
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("chat_messages").update({ is_deleted: true }).eq("id", parsed.data.messageId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (parsed.data.deleteMedia && parsed.data.mediaUrl) {
    const storageTarget = getStoragePathFromUrl(parsed.data.mediaUrl);
    if (storageTarget) {
      await supabase.storage.from(storageTarget.bucket).remove([storageTarget.path]);
    }
  }

  return NextResponse.redirect(new URL("/dashboard/moderation", request.url));
}

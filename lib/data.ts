import { createServiceRoleClient } from "@/lib/service-role";

type HydratedProfile = {
  full_name: string;
  username: string;
  avatar_url: string | null;
};

async function attachProfiles<T extends { user_id: string }>(rows: T[]): Promise<Array<T & { profiles: HydratedProfile | null }>> {
  const supabase = createServiceRoleClient();
  const userIds = Array.from(new Set(rows.map((row) => row.user_id)));

  if (!userIds.length) {
    return rows.map((row) => ({
      ...row,
      profiles: null,
    }));
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, username, avatar_url")
    .in("id", userIds);

  const profileMap = new Map(
    (profiles ?? []).map((profile) => [
      profile.id,
      {
        full_name: profile.full_name,
        username: profile.username,
        avatar_url: profile.avatar_url,
      },
    ]),
  );

  return rows.map((row) => ({
    ...row,
    profiles: profileMap.get(row.user_id) ?? null,
  }));
}

export async function getDashboardOverview() {
  const supabase = createServiceRoleClient();

  const [
    profilesResult,
    announcementsResult,
    chatResult,
    imagesResult,
    voiceResult,
  ] = await Promise.all([
    supabase.from("profiles").select("id, created_at, full_name, username, membership_status", { count: "exact" }),
    supabase.from("announcements").select("id", { count: "exact" }),
    supabase
      .from("chat_messages")
      .select("id, user_id, created_at, message_type, text_content, media_url")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase.from("chat_messages").select("id", { count: "exact" }).eq("message_type", "image"),
    supabase.from("chat_messages").select("id", { count: "exact" }).eq("message_type", "voice"),
  ]);

  const riders = profilesResult.data ?? [];
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const hydratedChat = await attachProfiles(chatResult.data ?? []);

  return {
    totalRiders: profilesResult.count ?? riders.length,
    activeRiders: riders.filter((rider) => rider.membership_status === "active").length,
    announcements: announcementsResult.count ?? 0,
    messagesToday:
      hydratedChat.filter((message) => new Date(message.created_at) >= todayStart).length,
    imagesShared: imagesResult.count ?? 0,
    voiceNotesShared: voiceResult.count ?? 0,
    latestProfiles: riders.slice(0, 5),
    latestChat: hydratedChat,
  };
}

export async function getRiders(search?: string, status?: string) {
  const supabase = createServiceRoleClient();
  let query = supabase.from("profiles").select("*").order("created_at", { ascending: false });

  if (search) {
    query = query.or(`full_name.ilike.%${search}%,username.ilike.%${search}%`);
  }

  if (status && status !== "all") {
    query = query.eq("membership_status", status);
  }

  const { data, error } = await query;
  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getRiderById(id: string) {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();
  if (error) {
    throw error;
  }
  return data;
}

export async function getAnnouncements() {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getAnnouncementById(id: string) {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("announcements").select("*").eq("id", id).single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getModerationMessages(type?: string, search?: string) {
  const supabase = createServiceRoleClient();
  let query = supabase
    .from("chat_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (type && type !== "all") {
    query = query.eq("message_type", type);
  }

  if (search) {
    query = query.or(`text_content.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) {
    throw error;
  }

  return attachProfiles(data ?? []);
}

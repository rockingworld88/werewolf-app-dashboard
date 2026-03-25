export type ChatMessageType = "text" | "image" | "voice";

export interface ModerationMessage {
  id: string;
  created_at: string;
  user_id: string;
  message_type: ChatMessageType;
  text_content: string | null;
  media_url: string | null;
  media_duration_seconds: number | null;
  is_deleted: boolean;
  profiles?: {
    full_name: string;
    username: string;
    avatar_url: string | null;
  } | null;
}

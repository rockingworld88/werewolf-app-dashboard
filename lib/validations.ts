import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Email or username is required."),
  password: z.string().trim().min(1, "Password is required."),
});

export const riderCreateSchema = z.object({
  full_name: z.string().trim().min(2, "Full name is required."),
  username: z.string().trim().min(3, "Username must be at least 3 characters."),
  email: z.string().trim().email("A valid email is required."),
  temporary_password: z.string().trim().min(8, "Temporary password must be at least 8 characters."),
  bike_name: z.string().trim().optional().or(z.literal("")),
  bike_model: z.string().trim().optional().or(z.literal("")),
  role: z.enum(["admin", "rider"]).default("rider"),
  membership_status: z.enum(["active", "inactive", "suspended"]).default("active"),
});

export const riderUpdateSchema = riderCreateSchema.omit({ temporary_password: true, email: true }).extend({
  login_email: z.string().trim().email("A valid email is required."),
});

export const announcementSchema = z.object({
  title: z.string().trim().min(3, "Title is required."),
  body: z.string().trim().min(8, "Announcement body is required."),
  is_pinned: z.boolean().default(false),
});

export const moderationActionSchema = z.object({
  messageId: z.string().uuid("A valid message id is required."),
  mediaUrl: z.string().url().optional(),
  deleteMedia: z.boolean().default(false),
});

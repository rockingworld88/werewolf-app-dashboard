import { RiderProfile } from "@/types/rider";

export function isAdminProfile(profile: RiderProfile | null | undefined) {
  return Boolean(profile && profile.role === "admin" && profile.membership_status === "active");
}

export type MembershipStatus = "active" | "inactive" | "suspended";
export type AppRole = "admin" | "rider";

export interface RiderProfile {
  id: string;
  created_at: string;
  username: string;
  login_email: string;
  full_name: string;
  role: AppRole;
  bike_name: string | null;
  bike_model: string | null;
  membership_status: MembershipStatus;
  avatar_url: string | null;
}

export interface RiderFormInput {
  full_name: string;
  username: string;
  email: string;
  temporary_password: string;
  bike_name?: string;
  bike_model?: string;
  role?: AppRole;
  membership_status?: MembershipStatus;
}

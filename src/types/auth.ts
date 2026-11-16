export type Role = "seeker" | "recruiter" | "admin";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: Role | string | null;
}

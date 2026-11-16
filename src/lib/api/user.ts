import { authFetch } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export {
  getUserPremiumById,
  getUserPrmiumById,
  type UserPremiumResponse,
} from "@/lib/actions/users";

/**
 * Fetch all registered users from database via REST API.
 * Protected: Only accessible by Admin.
 */
export const getUsers = async () => {
  try {
    const res = await authFetch(`${BASE_URL}/users`, { cache: "no-store" });
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
};

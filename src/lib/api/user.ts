const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface UserPremiumResponse {
  success?: boolean;
  premium: boolean;
}

/**
 * Check if a user has an active premium subscription.
 * Safe to use in both Client Components and Server Components.
 */
export const getUserPremiumById = async (
  userId?: string,
  email?: string,
): Promise<UserPremiumResponse> => {
  if (!userId && !email) return { premium: false };

  try {
    const query = email ? `?email=${encodeURIComponent(email)}` : "";
    const res = await fetch(
      `${BASE_URL}/users/${userId || "me"}/premium${query}`,
      {
        cache: "no-store",
      },
    );

    return res.ok ? await res.json() : { premium: false };
  } catch {
    return { premium: false };
  }
};

// Alias for backward compatibility
export const getUserPrmiumById = getUserPremiumById;

/**
 * Fetch all registered users from database via REST API.
 * Safe to use in both Client Components and Server Components.
 */
export const getUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/user`, { cache: "no-store" });
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface UserPremiumResponse {
  success?: boolean;
  premium: boolean;
  user?: {
    _id: string;
    premium?: boolean;
    email?: string;
    name?: string;
  } | null;
}

export const getUserPrmiumById = async (userId: string, email?: string): Promise<UserPremiumResponse> => {
  try {
    if (!userId && !email) {
      console.warn("[getUserPrmiumById] Missing userId and email");
      return { premium: false };
    }

    const queryParams = new URLSearchParams();
    if (email) queryParams.set("email", email);

    const qs = queryParams.toString();
    const url = `${BASE_URL}/users/${userId || "me"}/premium${qs ? `?${qs}` : ""}`;
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("[getUserPrmiumById] HTTP error status:", response.status);
      return { premium: false };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[getUserPrmiumById] Fetch failed:", error);
    return { premium: false };
  }
};

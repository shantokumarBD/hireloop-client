"use server";

import { authFetch } from "@/lib/core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const checkoutVerify = async (sessionId: string) => {
  try {
    const res = await authFetch(`${BASE_URL}/payment`, {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      console.error("[checkoutVerify] HTTP Error:", res.status, errData);
      return {
        success: false,
        error: errData?.message || `Verification failed with status ${res.status}`,
      };
    }

    return await res.json();
  } catch (error: any) {
    console.error("[checkoutVerify] Fetch failed:", error);
    return { success: false, error: error?.message || "Connection failed" };
  }
};

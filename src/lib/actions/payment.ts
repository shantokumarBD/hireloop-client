"use server";

import { authFetch } from "@/lib/core/server";
import { checkoutVerifyClientSchema } from "@/schemas";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const checkoutVerify = async (sessionId: string) => {
  const validation = checkoutVerifyClientSchema.safeParse({ sessionId });
  if (!validation.success) {
    const errorMsg = (validation.error.issues || []).map((i) => i.message).join(", ");
    console.warn("[Server Action] Checkout verify validation failed:", errorMsg);
    return { success: false, error: errorMsg };
  }

  try {
    const res = await authFetch(`${BASE_URL}/payment`, {
      method: "POST",
      body: JSON.stringify({ sessionId: validation.data.sessionId }),
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

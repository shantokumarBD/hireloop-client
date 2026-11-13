const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const checkoutVerify = async (sessionId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[checkoutVerify] HTTP Error:", res.status, errText);
      return { success: false, error: `Verification failed with status ${res.status}` };
    }

    return await res.json();
  } catch (error: any) {
    console.error("[checkoutVerify] Fetch failed:", error);
    return { success: false, error: error?.message || "Connection failed" };
  }
};

"use server";

export const uploadImageToImgBB = async (formData: FormData): Promise<string | null> => {
  const file = formData.get("image") as File | null;
  const apiKey = process.env.IMGBB_API_KEY;

  if (!file || !apiKey) return null;

  try {
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const body = new URLSearchParams({
      key: apiKey,
      image: base64,
    });

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body,
    });

    const result = await res.json();
    return result?.data?.url || null;
  } catch (error) {
    console.error("ImgBB upload error:", error);
    return null;
  }
};

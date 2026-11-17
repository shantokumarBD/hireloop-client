import { z } from "zod";

export const checkoutVerifyClientSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
});

export type CheckoutVerifyClientInput = z.infer<typeof checkoutVerifyClientSchema>;

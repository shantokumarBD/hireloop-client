import { z } from "zod";

export const updateUserRoleClientSchema = z.object({
  role: z.enum(["seeker", "recruiter", "admin"], {
    message: "Invalid role. Allowed roles: seeker, recruiter, admin",
  }),
});

export type UpdateUserRoleClientInput = z.infer<typeof updateUserRoleClientSchema>;

import { z } from "zod";

export const createApplicationClientSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  companyLogo: z.string().optional(),
  category: z.string().optional(),
  jobType: z.string().optional(),
  isRemote: z.boolean().optional(),
  location: z.string().optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  salaryFrequency: z.string().optional(),
  seekerName: z.string().optional(),
  seekerPhone: z.string().optional(),
  resumeUrl: z.string().optional(),
  coverLetter: z.string().optional(),
  status: z.string().optional(),
  appliedAt: z.string().optional(),
});

export const updateApplicationStatusClientSchema = z.object({
  status: z.enum(
    ["Applied", "Review", "Shortlisted", "Interview", "Offered", "Rejected"],
    {
      message:
        "Invalid status. Allowed statuses: Applied, Review, Shortlisted, Interview, Offered, Rejected",
    }
  ),
});

export type CreateApplicationClientInput = z.infer<typeof createApplicationClientSchema>;
export type UpdateApplicationStatusClientInput = z.infer<typeof updateApplicationStatusClientSchema>;

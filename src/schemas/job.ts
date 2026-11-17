import { z } from "zod";

export const createJobClientSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Job title must be at least 3 characters"),
  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters"),
  category: z.string().optional().default(""),
  jobType: z.string().optional().default("Full-Time"),
  isRemote: z.boolean().optional().default(false),
  location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters"),
  deadline: z.string().optional().default(""),
  salaryMin: z
    .number()
    .min(0, "Minimum salary cannot be negative")
    .optional()
    .default(0),
  salaryMax: z
    .number()
    .min(0, "Maximum salary cannot be negative")
    .optional()
    .default(0),
  salaryFrequency: z.string().optional().default("per hour"),
  responsibilities: z.string().optional().default(""),
  requirements: z.string().optional().default(""),
  recruiterId: z.string().optional(),
  status: z.string().optional().default("Active"),
  createdAt: z.string().optional(),
}).refine(
  (data) => {
    if (data.salaryMin && data.salaryMax && data.salaryMax > 0) {
      return data.salaryMax >= data.salaryMin;
    }
    return true;
  },
  {
    message: "Maximum salary must be greater than or equal to minimum salary",
    path: ["salaryMax"],
  }
);

export const updateJobClientSchema = z.object({
  title: z.string().trim().min(3, "Job title must be at least 3 characters").optional(),
  companyName: z.string().trim().min(2, "Company name must be at least 2 characters").optional(),
  companyLogo: z.string().optional(),
  category: z.string().optional(),
  jobType: z.string().optional(),
  type: z.string().optional(),
  isRemote: z.boolean().optional(),
  location: z.string().trim().min(2, "Location must be at least 2 characters").optional(),
  deadline: z.string().optional(),
  salaryMin: z.number().min(0, "Minimum salary cannot be negative").optional(),
  salaryMax: z.number().min(0, "Maximum salary cannot be negative").optional(),
  salaryFrequency: z.string().optional(),
  currency: z.string().optional(),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  status: z.enum(["Active", "Closed", "Draft"]).optional(),
});

export type CreateJobClientInput = z.infer<typeof createJobClientSchema>;
export type UpdateJobClientInput = z.infer<typeof updateJobClientSchema>;

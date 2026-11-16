export type ApplicationStatus =
  | "Applied"
  | "Review"
  | "Shortlisted"
  | "Interview"
  | "Rejected"
  | "Offered";

export interface Application {
  _id: string;
  jobId: string;
  userId: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  jobType?: string;
  isRemote?: boolean;
  location?: string;
  category?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryFrequency?: string;
  seekerEmail: string;
  seekerName: string;
  resumeUrl?: string;
  description?: string;
  notes?: string;
  status: ApplicationStatus | string;
  appliedAt: string | Date;
}

export type CreateApplicationInput = Omit<Application, "_id">;

export interface Job {
  _id: string;
  title: string;
  recruiterId?: string;
  companyName: string;
  companyLogo?: string;
  category: string;
  type: "Full-time" | "Part-time" | "Remote" | "Contract" | "Internship";
  salaryMin: number;
  salaryMax: number;
  currency: string;
  location: string;
  isRemote?: boolean;
  status: "Active" | "Closed" | "Draft";
  createdAt?: string | Date;
}

export interface CreateJobInput {
  _id: string;
  title: string;
  recruiterId?: string;
  recruiterEmail?: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  salaryMin: number;
  salaryMax: number;
  salaryFrequency: string;
  applicantsCount?: number;
  responsibilities?: string;
  requirements?: string;
  status: string;
  deadline: string;
  createdAt?: string;
}

export interface Company {
  _id: string;
  name: string;
  logo: string;
  industry: string;
  website?: string;
  location: string;
  employeeCount: string;
  description: string;
  recruiterEmail: string;
  status: "Pending" | "Approved" | "Rejected";
}

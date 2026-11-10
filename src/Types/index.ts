import { LucideIcon } from "lucide-react";

// 1. Navigation Item Type
export interface NavItem {
  name: string;
  href: string;
}

// 2. User Role & Session Types
export type Role = "seeker" | "recruiter" | "admin";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: Role | string | null;
}

// 3. Dashboard Sidebar Menu Type
export interface DashboardMenuItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

// 4. Job Listing Type (HireLoop Core)
export interface Job {
  _id: string;
  title: string;
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
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  salaryMin: number;
  salaryMax: number;
  salaryFrequency: string;
  applicantsCount?: number;
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


export interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  seekerEmail: string;
  seekerName: string;
  resumeUrl?: string;
  status: "Applied" | "Under Review" | "Shortlisted" | "Rejected" | "Offered";
  appliedAt?: string | Date;
}

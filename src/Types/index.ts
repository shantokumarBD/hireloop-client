import { LucideIcon } from "lucide-react";

// ১. নেভিগেশন আইটেম টাইপ
export interface NavItem {
  name: string;
  href: string;
}

// ২. ইউজার রোল ও সেশন টাইপ
export type Role = "seeker" | "recruiter" | "admin";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: Role | string | null;
}

// ৩. ড্যাশবোর্ড সাইডবার মেনু টাইপ
export interface DashboardMenuItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

// ৪. জব লিস্টিং টাইপ (HireLoop Core)
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

// ৫. কোম্পানি প্রোফাইল টাইপ
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

// ৬. জব অ্যাপ্লিকেশন টাইপ
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

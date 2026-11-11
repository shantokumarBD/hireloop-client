// Shared Job Options & Constants for HireLoop

export const JOB_TYPES = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Internship",
] as const;

export type JobType = (typeof JOB_TYPES)[number];

export const CATEGORIES = [
  "Engineering & Technology",
  "Design & Creative",
  "Product Management",
  "Marketing & Communications",
  "Sales & Business Development",
  "Finance & Operations",
  "Customer Support",
  "Human Resources",
  "Data & Analytics",
] as const;

export type JobCategory = (typeof CATEGORIES)[number];

export const SALARY_FREQUENCIES = [
  { label: "per hour", value: "per hour" },
  { label: "per month", value: "per month" },
  { label: "per year", value: "per year" },
] as const;

export type SalaryFrequency = (typeof SALARY_FREQUENCIES)[number]["value"];


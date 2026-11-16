// Centralized Route Paths for HireLoop Client

export const ROUTES = {
  // Public Routes
  HOME: "/",
  BROWSE_JOBS: "/browser-jobs",
  JOB_DETAILS: (id: string) => `/browser-jobs/${id}`,
  COMPANIES: "/companies",
  PRICING: "/pricing",
  TERMS: "/terms",
  PRIVACY: "/privacy",

  // Auth Routes
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",

  // Billing & Payment
  PAYMENT: "/payment",
  PAYMENT_SUCCESS: "/payment/success",

  // Role Dashboards
  DASHBOARD: {
    ROOT: "/dashboard",
    JOB_SEEKER: "/dashboard/job-seeker",
    JOB_SEEKER_APPLICATIONS: "/dashboard/job-seeker/applications",
    JOB_SEEKER_BILLING: "/dashboard/job-seeker/billing",
    JOB_SEEKER_SAVED: "/dashboard/job-seeker/saved",
    JOB_SEEKER_RESUME: "/dashboard/job-seeker/resume",
    JOB_SEEKER_SETTINGS: "/dashboard/job-seeker/settings",

    RECRUITER: "/dashboard/recruiter",
    RECRUITER_JOBS: "/dashboard/recruiter/jobs",
    RECRUITER_NEW_JOB: "/dashboard/recruiter/jobs/new",
    RECRUITER_JOB_APPLICATIONS: (id: string) => `/dashboard/recruiter/jobs/${id}/applications`,
    RECRUITER_SETTINGS: "/dashboard/recruiter/settings",

    ADMIN: "/dashboard/admin",
    ADMIN_USERS: "/dashboard/admin/users",
    ADMIN_COMPANIES: "/dashboard/admin/companies",
    ADMIN_JOBS: "/dashboard/admin/jobs",
    ADMIN_PAYMENTS: "/dashboard/admin/payments",
    ADMIN_SETTINGS: "/dashboard/admin/settings",
  },
} as const;

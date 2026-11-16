import { DashboardPlaceholder } from "@/components/shared/DashboardPlaceholder";
import { ROUTES } from "@/constants/routes";

export default function SeekerResumePage() {
  return (
    <DashboardPlaceholder
      title="Resume & Profile Builder"
      subtitle="Upload, optimize, and manage multiple customized CVs for specific industry roles."
      badge="Coming Soon"
      features={[
        "Drag-and-drop PDF resume parser with auto-extracted skills",
        "AI-assisted cover letter and experience bullet optimizer",
        "Public recruiter-facing profile link with view analytics",
      ]}
      backHref={ROUTES.DASHBOARD.JOB_SEEKER}
      isDark={true}
    />
  );
}

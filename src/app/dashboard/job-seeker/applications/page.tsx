import { redirect } from "next/navigation";
import { getSession } from "@/lib/core/server";
import { getApplications } from "@/lib/actions/applications";
import { JobSeekerApplicationsView } from "./components/JobSeekerApplicationsView";

export const metadata = {
  title: "My Applications - HireLoop",
  description: "Track your job applications and interview progress in real-time.",
};

export default async function ApplicationsPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/dashboard/job-seeker/applications");
  }

  const applications = await getApplications(session.user.id, session.user.email);

  return <JobSeekerApplicationsView initialApplications={applications || []} />;
}

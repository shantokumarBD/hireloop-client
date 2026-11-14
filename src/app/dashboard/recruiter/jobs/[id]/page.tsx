import { redirect } from "next/navigation";

interface JobPageProps {
  params: Promise<{ id: string }>;
}

export default async function RecruiterJobPage({ params }: JobPageProps) {
  const { id } = await params;
  redirect(`/dashboard/recruiter/jobs/${id}/applications`);
}

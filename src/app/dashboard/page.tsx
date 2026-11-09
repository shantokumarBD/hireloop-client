"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/sign-in");
      return;
    }

    const role = session.user.role;
    if (role === "recruiter") {
      router.replace("/dashboard/recruiter");
    } else if (role === "admin") {
      router.replace("/dashboard/admin");
    } else {
      router.replace("/dashboard/job-seeker");
    }
  }, [session, isPending, router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-7 h-7 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
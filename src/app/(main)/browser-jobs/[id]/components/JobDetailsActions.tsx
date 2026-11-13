"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { CreateJobInput, CreateApplicationInput } from "@/Types";
import { applyToJob } from "@/lib/actions/jobs";
import { getApplicationCount } from "@/lib/api/applications";

interface JobDetailsActionsProps {
  job: CreateJobInput;
}

export function JobDetailsActions({ job }: JobDetailsActionsProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = async () => {
    // 1. If user is not logged in, redirect to login page
    if (!session?.user) {
      router.push(`/sign-in?callbackUrl=/browser-jobs/${job._id}`);
      return;
    }

    const userRole = ((session.user as any)?.role || "seeker").toLowerCase();

    // 2. Recruiters cannot apply for jobs
    if (userRole === "recruiter") {
      toast.add({
        title: "Action Not Allowed",
        description: "Recruiters cannot apply for jobs. Please log in with a seeker account.",
      });
      return;
    }

    // 3. User is a logged-in seeker, submit application
    setIsSubmitting(true);
    try {
      // Check application limit on client before submitting
      const countRes = await getApplicationCount(session.user.id, session.user.email);
      if (countRes.limitReached || countRes.count >= 10) {
        toast.add({
          title: "Application Limit Reached (10/10)",
          description: "You have used all 10 free applications. Redirecting to payment page...",
          type: "error",
        });
        setTimeout(() => {
          router.push("/payment");
        }, 1200);
        return;
      }

      const application: CreateApplicationInput = {
        jobId: job._id,
        userId: session.user.id,
        seekerEmail: session.user.email,
        seekerName: session.user.name,
        jobTitle: job.title,
        companyName: job.companyName,
        companyLogo: (job as any).companyLogo || "",
        jobType: job.jobType || "Full-Time",
        isRemote: Boolean(job.isRemote),
        location: job.location || (job.isRemote ? "Remote" : "On-site"),
        category: job.category || "",
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryFrequency: job.salaryFrequency,
        status: "Applied",
        appliedAt: new Date().toISOString(),
      };

      const res = await applyToJob(application);

      // Check if server rejected due to 10 application limit
      if (res?.limitReached || res?.error === "APPLICATION_LIMIT_REACHED") {
        toast.add({
          title: "Application Limit Reached (10/10)",
          description: "You have used all 10 free applications. Redirecting to payment page...",
          type: "error",
        });
        setTimeout(() => {
          router.push("/payment");
        }, 1200);
        return;
      }

      // Check if user already applied to this specific job
      if (res?.alreadyApplied || res?.error === "ALREADY_APPLIED") {
        toast.add({
          title: "Already Applied",
          description: "You have already applied for this job.",
          type: "warning",
        });
        setHasApplied(true);
        return;
      }

      if (res?.insertedId) {
        setHasApplied(true);
        toast.add({
          title: "Application Submitted",
          description: "Your application has been submitted successfully!",
          type: "success",
        });
        router.refresh();
        router.push("/dashboard/job-seeker/applications");
      } else {
        toast.add({
          title: "Application Failed",
          description: res?.message || res?.error || "Could not submit application. Please try again.",
          type: "error",
        });
      }
    } catch (err) {
      toast.add({
        title: "Error",
        description: "An unexpected error occurred while applying.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-3 shrink-0">
      {/* Bookmark Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsBookmarked(!isBookmarked)}
        className="w-11 h-11 p-0 rounded-xl bg-zinc-900/80 border-zinc-800 hover:bg-zinc-800 hover:text-white text-zinc-400 transition-colors cursor-pointer"
        title={isBookmarked ? "Remove Bookmark" : "Bookmark Job"}
      >
        <Bookmark
          className={`w-5 h-5 ${isBookmarked ? "fill-white text-white" : ""}`}
        />
      </Button>

      {/* Apply Now Button */}
      <Button
        type="button"
        onClick={handleApply}
        disabled={hasApplied || isSubmitting}
        className="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-6 sm:px-8 h-11 rounded-xl text-sm transition-all shadow-sm cursor-pointer disabled:opacity-80"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-zinc-950" /> Submitting...
          </span>
        ) : hasApplied ? (
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
            <Check className="w-4 h-4 stroke-[3]" /> Applied
          </span>
        ) : (
          "Apply Now"
        )}
      </Button>
    </div>
  );
}

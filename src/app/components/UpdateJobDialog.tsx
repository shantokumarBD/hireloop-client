"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateJob } from "@/lib/actions/jobs";
import { CreateJobInput } from "@/Types";
import { toast } from "@/components/ui/toast";
import {
  JOB_TYPES,
  CATEGORIES,
  SALARY_FREQUENCIES,
} from "@/constants/jobs";

interface UpdateJobDialogProps {
  job: CreateJobInput;
}

export default function UpdateJobDialog({ job }: UpdateJobDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const updatedData = {
      title: (formData.get("title") as string)?.trim(),
      companyName: (formData.get("companyName") as string)?.trim(),
      category: (formData.get("category") as string)?.trim(),
      jobType: formData.get("jobType") as string,
      location: (formData.get("location") as string)?.trim(),
      salaryMin: Number(formData.get("salaryMin")) || 0,
      salaryMax: Number(formData.get("salaryMax")) || 0,
      salaryFrequency: formData.get("salaryFrequency") as string,
      deadline: formData.get("deadline") as string,
      status: formData.get("status") as string,
    };

    try {
      const res = await updateJob(job._id, updatedData);
      if (res.acknowledged) {
        setOpen(false);
        toast.add({
          title: "Job Updated",
          description: "Job details have been successfully updated.",
        });
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#5C53FE] hover:bg-[#4E45E8] rounded-lg transition-all shadow-sm cursor-pointer">
        <Pencil className="w-3 h-3" />
        <span>Update</span>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-zinc-900">
            Update Job Listing
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4 py-2">
          {/* Title & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Job Title
              </label>
              <Input name="title" defaultValue={job.title} required />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Company Name
              </label>
              <Input name="companyName" defaultValue={job.companyName} required />
            </div>
          </div>

          {/* Category & Job Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Category
              </label>
              <select
                name="category"
                defaultValue={job.category}
                className="w-full h-8 rounded-lg border border-zinc-200 bg-white px-2.5 text-sm text-zinc-800 outline-none focus:border-[#5C53FE]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Job Type
              </label>
              <select
                name="jobType"
                defaultValue={job.jobType || "Full-Time"}
                className="w-full h-8 rounded-lg border border-zinc-200 bg-white px-2.5 text-sm text-zinc-800 outline-none focus:border-[#5C53FE]"
              >
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Location
              </label>
              <Input name="location" defaultValue={job.location} required />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue={job.status || "Active"}
                className="w-full h-8 rounded-lg border border-zinc-200 bg-white px-2.5 text-sm text-zinc-800 outline-none focus:border-[#5C53FE]"
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Salary Min, Max, Frequency */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Min Salary (€)
              </label>
              <Input
                name="salaryMin"
                type="number"
                defaultValue={job.salaryMin}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Max Salary (€)
              </label>
              <Input
                name="salaryMax"
                type="number"
                defaultValue={job.salaryMax}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Frequency
              </label>
              <select
                name="salaryFrequency"
                defaultValue={job.salaryFrequency || "per hour"}
                className="w-full h-8 rounded-lg border border-zinc-200 bg-white px-2 text-sm text-zinc-800 outline-none focus:border-[#5C53FE]"
              >
                {SALARY_FREQUENCIES.map((freq) => (
                  <option key={freq.value} value={freq.value}>
                    {freq.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="text-xs font-medium text-zinc-700 block mb-1">
              Deadline
            </label>
            <Input name="deadline" defaultValue={job.deadline} />
          </div>

          <DialogFooter className="mt-4 pt-2 border-t border-zinc-100 flex gap-2">
            <DialogClose className="h-9 px-4 rounded-lg border border-zinc-200 bg-white text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer">
              Cancel
            </DialogClose>
            <button
              type="submit"
              disabled={loading}
              className="h-9 px-4 rounded-lg bg-[#5C53FE] hover:bg-[#4E45E8] text-white text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Save Changes</span>
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


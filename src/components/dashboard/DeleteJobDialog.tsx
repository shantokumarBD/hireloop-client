"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { deleteJobs } from "@/lib/actions/jobs";
import { Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

interface DeleteJobDialogProps {
  jobTitle: string;
  jobId: string;
}

export default function DeleteJobDialog({
  jobTitle,
  jobId,
}: DeleteJobDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteJobs(id);
      if (res.deletedCount) {
        setOpen(false)
        toast.add({
          title: "Event created",
          description: "Sunday, December 3 at 9:00 AM",
        });
        router.refresh()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-zinc-200 hover:border-red-200 transition-colors cursor-pointer"
        title="Delete job"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <DialogTitle className="text-base font-semibold text-zinc-900">
              Delete Job Post
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-zinc-500 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-medium text-zinc-800">
              &quot;{jobTitle}&quot;
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2">
          <DialogClose className="flex-1 h-9 rounded-lg border border-zinc-200 bg-white text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer">
            Cancel
          </DialogClose>
          <button
            type="button"
            className="flex-1 h-9 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors cursor-pointer"
            onClick={() => handleDelete(jobId)}
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

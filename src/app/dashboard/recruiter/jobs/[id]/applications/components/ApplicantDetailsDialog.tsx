"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Application } from "@/Types";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import {
  Mail,
  Calendar,
  Briefcase,
  MapPin,
  DollarSign,
  FileText,
  Copy,
  Check,
  User,
  ExternalLink,
} from "lucide-react";
import { toast } from "@/components/ui/toast";
import { format } from "date-fns";

interface ApplicantDetailsDialogProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (applicationId: string, newStatus: string) => void;
}

const STATUS_OPTIONS = [
  "Applied",
  "Review",
  "Shortlisted",
  "Interview",
  "Offered",
  "Rejected",
];

export function ApplicantDetailsDialog({
  application,
  isOpen,
  onClose,
  onStatusChange,
}: ApplicantDetailsDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!application) return null;

  const handleCopyEmail = () => {
    if (application.seekerEmail) {
      navigator.clipboard.writeText(application.seekerEmail);
      setCopied(true);
      toast.add({
        title: "Copied!",
        description: "Email copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedDate = application.appliedAt
    ? (() => {
        try {
          return format(new Date(application.appliedAt), "PPP 'at' p");
        } catch {
          return String(application.appliedAt);
        }
      })()
    : "Recently";

  // Initials for avatar
  const initials = application.seekerName
    ? application.seekerName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AP";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#5C53FE]/10 via-[#5C53FE]/5 to-transparent px-6 pt-6 pb-5 border-b border-zinc-100">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-[#5C53FE] text-white flex items-center justify-center text-lg font-semibold shadow-md shadow-[#5C53FE]/20 shrink-0">
                {initials}
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-zinc-900">
                  {application.seekerName}
                </DialogTitle>
                <DialogDescription className="text-sm text-zinc-500 flex items-center gap-2 mt-0.5">
                  <span>Candidate ID: {application.userId?.slice(-6) || "N/A"}</span>
                </DialogDescription>
              </div>
            </div>
            <ApplicationStatusBadge status={application.status} />
          </div>
        </div>

        {/* Dialog Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Contact Details Card */}
          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-4 space-y-3">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Contact Information
            </h4>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-zinc-800">
                <Mail className="w-4 h-4 text-[#5C53FE] shrink-0" />
                <span className="font-medium">{application.seekerEmail}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyEmail}
                  className="h-7 text-xs px-2.5 rounded-lg border-zinc-200 hover:bg-white text-zinc-700 cursor-pointer"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-zinc-500 mr-1" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <a
                  href={`mailto:${application.seekerEmail}?subject=Regarding your application for ${encodeURIComponent(application.jobTitle || "")}`}
                  className="inline-flex items-center h-7 text-xs px-2.5 rounded-lg bg-[#5C53FE] text-white hover:bg-[#4E45E8] transition-colors font-medium shadow-sm"
                >
                  <Mail className="w-3 h-3 mr-1" />
                  Send Email
                </a>
              </div>
            </div>
          </div>

          {/* Job Details Card */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Applied Position
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-100 bg-white">
                <Briefcase className="w-4 h-4 text-zinc-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-zinc-400">Position</p>
                  <p className="text-sm font-semibold text-zinc-800 truncate">
                    {application.jobTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-100 bg-white">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-zinc-400">Location</p>
                  <p className="text-sm font-semibold text-zinc-800 truncate">
                    {application.location || "Remote"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-100 bg-white">
                <DollarSign className="w-4 h-4 text-zinc-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-zinc-400">Compensation</p>
                  <p className="text-sm font-semibold text-zinc-800 truncate">
                    €{application.salaryMin || 0} - €{application.salaryMax || 0} /{" "}
                    {application.salaryFrequency || "month"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-100 bg-white">
                <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-zinc-400">Submitted On</p>
                  <p className="text-sm font-semibold text-zinc-800 truncate">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Note / Notes */}
          {application.description && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Candidate Note / Cover Letter
              </h4>
              <div className="p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 text-sm text-zinc-700 leading-relaxed">
                {application.description}
              </div>
            </div>
          )}

          {/* Quick Status Update Section */}
          <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-zinc-900">
                  Update Candidate Status
                </h4>
                <p className="text-xs text-zinc-500">
                  Change the hiring stage for this applicant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap pt-1">
              {STATUS_OPTIONS.map((status) => {
                const isCurrent =
                  (application.status || "").toLowerCase() === status.toLowerCase();

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => onStatusChange?.(application._id, status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-[#5C53FE] text-white border-[#5C53FE] shadow-sm shadow-[#5C53FE]/30"
                        : "bg-white text-zinc-700 border-zinc-200 hover:border-[#5C53FE]/50 hover:bg-zinc-50"
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 bg-zinc-50/80 border-t border-zinc-200 flex sm:justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl border-zinc-200 text-zinc-700 hover:bg-white cursor-pointer"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

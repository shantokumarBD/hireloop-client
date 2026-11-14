"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  Briefcase,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { CreateJobInput } from "@/Types";
import { createJobs } from "@/lib/actions/jobs";
import { toast } from "@/components/ui/toast";
import { JOB_TYPES, CATEGORIES, SALARY_FREQUENCIES } from "@/constants/jobs";
import { useSession } from "@/lib/auth-client";

export default function PostNewJobPage() {
  const { data: session } = useSession();

  const recruiterId = session?.user?.id;

  const router = useRouter();

  // Interactive form states
  const [jobType, setJobType] = useState<string>("Full-Time");
  const [isRemote, setIsRemote] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("per hour");

  // Loading and feedback states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (recruiterId) {
      formData.append("recruiterId", recruiterId);
    }

    console.log("[Client] Submitting form...");

    try {
      const res = await createJobs(formData);
      console.log("[Client] Response from Server Action:", res);

      if (!res.success) {
        console.error("[Client] Failed to post job:", res.error);
        setErrorMsg(res.error || "Failed to post job");
        return;
      }
      console.log("[Client] Job created successfully!");
      toast.add({
        title: "Job Published",
        description: "Job listing has been published successfully!",
      });
      setSuccessMsg("Job listing published successfully!");
      form.reset();

      setTimeout(() => {
        router.push("/dashboard/recruiter/jobs");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to post job. Please try again.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-16 space-y-6 sm:space-y-8">
      {/* Back Button & Page Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#5C53FE]">
              CREATE NEW LISTING
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-1">
              Post a New Job
            </h1>
            <p className="text-sm text-zinc-500 mt-1 max-w-xl leading-relaxed">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>

          {/* Top Publish Button */}
        </div>
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      {/* Main Form (3 Steps / Cards) */}
      <form
        id="create-job-form"
        onSubmit={handleSubmit}
        className="space-y-6 sm:space-y-8"
      >
        {/* Hidden inputs for controlled component state */}
        <input type="hidden" name="jobType" value={jobType} />
        <input type="hidden" name="isRemote" value={String(isRemote)} />
        <input type="hidden" name="salaryFrequency" value={frequency} />

        {/* ======================================================== */}
        {/* STEP 1: Basic Information                                */}
        {/* ======================================================== */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
          {/* Card Header */}
          <div className="flex items-center gap-3 pb-2 border-b border-zinc-100">
            <div className="w-7 h-7 rounded-full bg-[#5C53FE]/15 text-[#5C53FE] font-bold text-xs flex items-center justify-center shrink-0">
              1
            </div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
              Basic Information
            </h2>
          </div>

          <div className="space-y-5">
            {/* Job title */}
            <div>
              <label
                htmlFor="title"
                className="block text-xs font-semibold text-zinc-700 mb-1.5"
              >
                Job title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                required
                disabled={isLoading}
                placeholder="e.g. Senior Product Designer"
                className="w-full h-11 px-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5C53FE] focus:bg-white transition-colors disabled:opacity-50"
              />
            </div>

            {/* Company name & Job category (Grid 2 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Company name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Company name <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Building2 className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
                  <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    required
                    disabled={isLoading}
                    placeholder="Acme Inc."
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5C53FE] focus:bg-white transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Job category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Job category <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <select
                    id="category"
                    name="category"
                    required
                    disabled={isLoading}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 px-3.5 pr-10 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-[#5C53FE] focus:bg-white transition-colors appearance-none cursor-pointer disabled:opacity-50"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Job type (Pill Selectors) */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-2">
                Job type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {JOB_TYPES.map((type) => {
                  const isSelected = jobType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      disabled={isLoading}
                      onClick={() => setJobType(type)}
                      className={`h-11 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#5C53FE]/10 border-[#5C53FE] text-[#5C53FE] shadow-xs"
                          : "bg-zinc-50 border-zinc-200/90 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 2: Location, Compensation & Timeline                */}
        {/* ======================================================== */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
          {/* Card Header */}
          <div className="flex items-center gap-3 pb-2 border-b border-zinc-100">
            <div className="w-7 h-7 rounded-full bg-[#5C53FE]/15 text-[#5C53FE] font-bold text-xs flex items-center justify-center shrink-0">
              2
            </div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
              Location, Compensation & Timeline
            </h2>
          </div>

          <div className="space-y-5">
            {/* Remote work allowed sub-card */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Remote work allowed
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
              <Switch
                checked={isRemote}
                onCheckedChange={setIsRemote}
                disabled={isLoading}
                className="data-[state=checked]:bg-[#5C53FE] cursor-pointer"
              />
            </div>

            {/* Job location & Application deadline (Grid 2 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Job location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Job location <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
                  <input
                    id="location"
                    type="text"
                    name="location"
                    required
                    disabled={isLoading}
                    placeholder="e.g. New York, USA"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5C53FE] focus:bg-white transition-colors disabled:opacity-50"
                  />
                </div>
                <span className="text-[11px] text-zinc-400 mt-1 block">
                  Required
                </span>
              </div>

              {/* Application deadline */}
              <div>
                <label
                  htmlFor="deadline"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Application deadline
                </label>
                <input
                  id="deadline"
                  type="date"
                  name="deadline"
                  disabled={isLoading}
                  className="w-full h-11 px-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-[#5C53FE] focus:bg-white transition-colors cursor-pointer disabled:opacity-50"
                />
              </div>
            </div>

            {/* Salary Grid (Min, Max, Frequency - 3 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {/* Min salary */}
              <div>
                <label
                  htmlFor="salaryMin"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Min salary / rate
                </label>
                <input
                  id="salaryMin"
                  type="number"
                  name="salaryMin"
                  min="0"
                  disabled={isLoading}
                  placeholder="25"
                  className="w-full h-11 px-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5C53FE] focus:bg-white transition-colors disabled:opacity-50"
                />
              </div>

              {/* Max salary */}
              <div>
                <label
                  htmlFor="salaryMax"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Max salary / rate
                </label>
                <input
                  id="salaryMax"
                  type="number"
                  name="salaryMax"
                  min="0"
                  disabled={isLoading}
                  placeholder="40"
                  className="w-full h-11 px-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5C53FE] focus:bg-white transition-colors disabled:opacity-50"
                />
              </div>

              {/* Frequency */}
              <div>
                <label
                  htmlFor="salaryFrequency"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Frequency
                </label>
                <div className="relative flex items-center">
                  <select
                    id="salaryFrequency"
                    name="salaryFrequency"
                    disabled={isLoading}
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full h-11 px-3.5 pr-10 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-[#5C53FE] focus:bg-white transition-colors appearance-none cursor-pointer disabled:opacity-50"
                  >
                    {SALARY_FREQUENCIES.map((freq) => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 3: Responsibilities & Requirements                  */}
        {/* ======================================================== */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
          {/* Card Header */}
          <div className="flex items-center gap-3 pb-2 border-b border-zinc-100">
            <div className="w-7 h-7 rounded-full bg-[#5C53FE]/15 text-[#5C53FE] font-bold text-xs flex items-center justify-center shrink-0">
              3
            </div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
              Responsibilities & Requirements
            </h2>
          </div>

          <div className="space-y-5">
            {/* Key responsibilities */}
            <div>
              <label
                htmlFor="responsibilities"
                className="block text-xs font-semibold text-zinc-700 mb-1.5"
              >
                Key responsibilities
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                rows={4}
                disabled={isLoading}
                placeholder="Describe the key responsibilities of the role..."
                className="w-full p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5C53FE] focus:bg-white transition-colors resize-y disabled:opacity-50 leading-relaxed"
              />
            </div>

            {/* Qualifications & requirements */}
            <div>
              <label
                htmlFor="requirements"
                className="block text-xs font-semibold text-zinc-700 mb-1.5"
              >
                Qualifications & requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                disabled={isLoading}
                placeholder={
                  "• 3+ years of experience with...\n• Solid understanding of..."
                }
                className="w-full p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#5C53FE] focus:bg-white transition-colors resize-y disabled:opacity-50 leading-relaxed font-mono text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => router.back()}
            className="h-11 px-5 rounded-xl border-zinc-200 text-zinc-700 hover:bg-zinc-100 font-semibold cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 px-7 rounded-xl bg-[#5C53FE] hover:bg-[#4E44FE] text-white font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Briefcase className="w-4 h-4" />
            )}
            <span>{isLoading ? "Publishing..." : "Publish Job"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

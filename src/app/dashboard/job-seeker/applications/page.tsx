"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Mail,
  Download,
  Code2,
  PenTool,
  Database,
  Server,
  Bot,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  MapPin,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  X,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { ApplicationStatus } from "@/Types";

interface MockApplicationItem {
  id: string;
  jobTitle: string;
  companyName: string;
  jobType: string;
  isRemote: boolean;
  workArrangement: "Remote" | "Hybrid" | "On-site";
  appliedTime: string;
  status: ApplicationStatus;
  iconType: "code" | "design" | "data" | "cloud" | "ai";
  salary: string;
  location: string;
  description: string;
  notes: string;
  archived?: boolean;
}

const INITIAL_APPLICATIONS: MockApplicationItem[] = [
  {
    id: "app-1",
    jobTitle: "Senior Frontend Engineer",
    companyName: "Stark Industries",
    jobType: "Full-time",
    isRemote: true,
    workArrangement: "Remote",
    appliedTime: "2 hours ago",
    status: "Applied",
    iconType: "code",
    salary: "$140,000 - $175,000",
    location: "San Francisco, CA (Remote)",
    description:
      "Responsible for leading frontend development using Next.js, React, and TypeScript for advanced defense and aerospace dashboards.",
    notes: "Application submitted successfully. Under initial review by talent acquisition.",
  },
  {
    id: "app-2",
    jobTitle: "Product Designer",
    companyName: "Cyberdyne Systems",
    jobType: "Contract",
    isRemote: false,
    workArrangement: "Hybrid",
    appliedTime: "1 day ago",
    status: "Review",
    iconType: "design",
    salary: "$90 - $120 / hr",
    location: "Sunnyvale, CA (Hybrid)",
    description:
      "Design systems and next-generation robotics interface experiences. Close collaboration with engineering leadership.",
    notes: "Portfolio was reviewed by the design director. Awaiting technical assessment invite.",
  },
  {
    id: "app-3",
    jobTitle: "Lead Data Scientist",
    companyName: "Wayne Enterprises",
    jobType: "Full-time",
    isRemote: false,
    workArrangement: "On-site",
    appliedTime: "4 days ago",
    status: "Shortlisted",
    iconType: "data",
    salary: "$180,000 - $220,000",
    location: "Gotham City (On-site)",
    description:
      "Oversee large scale machine learning pipelines and security predictive algorithms. Management of 5 senior analysts.",
    notes: "Shortlisted for Round 1 technical interview scheduled for Thursday at 2:00 PM EST.",
  },
  {
    id: "app-4",
    jobTitle: "Cloud Architect",
    companyName: "Oscorp Tech",
    jobType: "Full-time",
    isRemote: true,
    workArrangement: "Remote",
    appliedTime: "1 week ago",
    status: "Rejected",
    iconType: "cloud",
    salary: "$160,000 - $195,000",
    location: "New York, NY (Remote)",
    description:
      "Design multi-region AWS and Kubernetes architectures supporting mission-critical biochemical research platforms.",
    notes: "Role has been filled by an internal candidate. Resume kept on talent pool for future openings.",
  },
  {
    id: "app-5",
    jobTitle: "AI Research Engineer",
    companyName: "Hooli Corp",
    jobType: "Full-time",
    isRemote: false,
    workArrangement: "Hybrid",
    appliedTime: "2 weeks ago",
    status: "Offered",
    iconType: "ai",
    salary: "$195,000 - $240,000 + Equity",
    location: "Palo Alto, CA (Hybrid)",
    description:
      "Conduct cutting-edge generative AI research, fine-tuning LLMs, and multimodal foundational models.",
    notes: "Official offer extended! Reviewing equity package and health benefits breakdown.",
  },
];

export default function ApplicationsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<MockApplicationItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return INITIAL_APPLICATIONS.filter((item) => {
      const matchesSearch =
        item.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = activeTab === "archived" ? !!item.archived : !item.archived;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  const handleExportPDF = () => {
    toast.add({
      title: "Exporting Applications",
      description: "Your applications summary is being generated as a PDF report.",
      type: "success",
    });
  };

  const getJobIcon = (type: MockApplicationItem["iconType"]) => {
    switch (type) {
      case "code":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#0c2430] border border-[#22d3ee]/20 flex items-center justify-center text-[#22d3ee] shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
        );
      case "design":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#2a1d0d] border border-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b] shrink-0">
            <PenTool className="w-5 h-5" />
          </div>
        );
      case "data":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#101e38] border border-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6] shrink-0">
            <Database className="w-5 h-5" />
          </div>
        );
      case "cloud":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#2a1417] border border-[#ef4444]/20 flex items-center justify-center text-[#ef4444] shrink-0">
            <Server className="w-5 h-5" />
          </div>
        );
      case "ai":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#0e271e] border border-[#10b981]/20 flex items-center justify-center text-[#10b981] shrink-0">
            <Bot className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700/40 flex items-center justify-center text-zinc-300 shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
        );
    }
  };

  const renderStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "Applied":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#1e2330] text-zinc-300 border border-zinc-700/60">
            Applied
          </span>
        );
      case "Review":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30">
            Review
          </span>
        );
      case "Shortlisted":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/30">
            Shortlisted
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/30">
            Rejected
          </span>
        );
      case "Offered":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30">
            Offered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Bar with Search & Quick Profile Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile Sidebar Trigger */}
          <div className="md:hidden">
            <SidebarTrigger className="text-zinc-400 hover:text-white hover:bg-zinc-800/60 p-2 rounded-lg" />
          </div>

          {/* Search Bar matching Figma */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0e121b] border border-zinc-800/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#5C53FE]/60 focus:ring-1 focus:ring-[#5C53FE]/60 transition-all"
            />
          </div>
        </div>

        {/* Right utility buttons: Notifications, Messages, User Avatar */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            aria-label="Notifications"
            className="w-10 h-10 rounded-xl bg-[#0e121b] border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2.5 right-2.5 ring-2 ring-[#0e121b]" />
          </button>

          <button
            type="button"
            aria-label="Messages"
            className="w-10 h-10 rounded-xl bg-[#0e121b] border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </button>

          <div className="w-10 h-10 rounded-xl bg-[#0e121b] border border-zinc-700/60 overflow-hidden flex items-center justify-center shrink-0">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                {session?.user?.name?.charAt(0).toUpperCase() || "S"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Page Header: Title, Description, Active/Archived Toggle & Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            My Applications
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Active / Archived Pill Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#0e121b] border border-zinc-800/80 text-xs sm:text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("active")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "active"
                  ? "bg-[#181e2e] text-white font-semibold border border-zinc-700/60 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("archived")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "archived"
                  ? "bg-[#181e2e] text-white font-semibold border border-zinc-700/60 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Archived
            </button>
          </div>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={handleExportPDF}
            className="bg-white hover:bg-zinc-100 active:bg-zinc-200 text-zinc-950 font-semibold px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4 text-zinc-950" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* 4 KPI / Stats Cards matching Figma */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Applied */}
        <div className="p-5 rounded-2xl bg-[#0e121b] border border-zinc-800/80 shadow-sm">
          <p className="text-xs sm:text-sm font-medium text-zinc-400">Total Applied</p>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-2">24</p>
        </div>

        {/* Shortlisted */}
        <div className="p-5 rounded-2xl bg-[#0e121b] border border-zinc-800/80 shadow-sm">
          <p className="text-xs sm:text-sm font-medium text-zinc-400">Shortlisted</p>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-2">8</p>
        </div>

        {/* Interviews */}
        <div className="p-5 rounded-2xl bg-[#0e121b] border border-zinc-800/80 shadow-sm">
          <p className="text-xs sm:text-sm font-medium text-zinc-400">Interviews</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#f59e0b] mt-2">3</p>
        </div>

        {/* Success Rate */}
        <div className="p-5 rounded-2xl bg-[#0e121b] border border-zinc-800/80 shadow-sm">
          <p className="text-xs sm:text-sm font-medium text-zinc-400">Success Rate</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#10b981] mt-2">12%</p>
        </div>
      </div>

      {/* Applications Table Card */}
      <div className="rounded-2xl bg-[#0e121b] border border-zinc-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/80 text-xs font-semibold text-zinc-400 tracking-wider">
                <th className="py-4 px-6 font-medium">Job Title</th>
                <th className="py-4 px-6 font-medium">Company</th>
                <th className="py-4 px-6 font-medium">Applied</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right sm:text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-sm">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-zinc-800/20 transition-colors group cursor-default"
                  >
                    {/* Job Title & Type */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        {getJobIcon(app.iconType)}
                        <div>
                          <p className="font-semibold text-white group-hover:text-zinc-100 transition-colors">
                            {app.jobTitle}
                          </p>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            {app.jobType} • {app.workArrangement}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-4 px-6 text-zinc-300 font-medium whitespace-nowrap">
                      {app.companyName}
                    </td>

                    {/* Applied Date */}
                    <td className="py-4 px-6 text-zinc-400 text-sm whitespace-nowrap">
                      {app.appliedTime}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {renderStatusBadge(app.status)}
                    </td>

                    {/* Action: Details */}
                    <td className="py-4 px-6 whitespace-nowrap text-right sm:text-left">
                      <button
                        type="button"
                        onClick={() => setSelectedApplication(app)}
                        className="text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer hover:underline"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-500">
                    No applications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination matching Figma */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-zinc-800/80 text-xs sm:text-sm text-zinc-400">
          <div>
            Showing 1-{filteredApplications.length} of 24 applications
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg border border-zinc-800 bg-[#121622] text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                currentPage === 1
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "border border-zinc-800 bg-[#121622] text-zinc-400 hover:text-white"
              }`}
            >
              1
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                currentPage === 2
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "border border-zinc-800 bg-[#121622] text-zinc-400 hover:text-white"
              }`}
            >
              2
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                currentPage === 3
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "border border-zinc-800 bg-[#121622] text-zinc-400 hover:text-white"
              }`}
            >
              3
            </button>

            <button
              type="button"
              disabled={currentPage === 3}
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              className="w-8 h-8 rounded-lg border border-zinc-800 bg-[#121622] text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#0e121b] border border-zinc-800 p-6 shadow-2xl space-y-6 text-zinc-100">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-3.5">
                {getJobIcon(selectedApplication.iconType)}
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedApplication.jobTitle}
                  </h3>
                  <p className="text-sm text-zinc-400 font-medium">
                    {selectedApplication.companyName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-zinc-500 block mb-1">Status</span>
                {renderStatusBadge(selectedApplication.status)}
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-zinc-500 block mb-1">Compensation</span>
                <span className="font-semibold text-white">
                  {selectedApplication.salary}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 col-span-2 sm:col-span-1">
                <span className="text-zinc-500 block mb-1">Work Arrangement</span>
                <span className="font-semibold text-white">
                  {selectedApplication.jobType} ({selectedApplication.workArrangement})
                </span>
              </div>
            </div>

            {/* Details Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Role Overview
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/60">
                {selectedApplication.description}
              </p>
            </div>

            {/* Status Timeline / Notes */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Application Progress & Notes
              </h4>
              <div className="p-3.5 rounded-xl bg-[#141a29]/50 border border-indigo-500/20 text-xs text-zinc-300 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-400 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>Applied {selectedApplication.appliedTime}</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  {selectedApplication.notes}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-800/80">
              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/dashboard/job-seeker/jobs"
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#5C53FE] hover:bg-[#4E45E8] text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>View More Jobs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
